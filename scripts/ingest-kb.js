#!/usr/bin/env node

/**
 * BLO-1 — KB Vector Ingestion Pipeline
 *
 * Reads markdown files from the bloom-garden-kb GitHub repo,
 * chunks by heading structure, generates embeddings via OpenAI,
 * and upserts into the kb_documents table in Supabase.
 *
 * Usage: node scripts/ingest-kb.js
 * Required env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY, GITHUB_TOKEN
 */

const { createClient } = require('@supabase/supabase-js');
const OpenAI = require('openai');

// --- Configuration ---

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const EMBEDDING_MODEL = 'text-embedding-3-small';
const EMBEDDING_DELAY_MS = 200;
const MAX_CHUNK_TOKENS_APPROX = 500;
const FAILURE_THRESHOLD = 0.2; // exit code 1 if >20% chunks fail

const GITHUB_RAW_BASE =
  'https://raw.githubusercontent.com/CornFedKratos/bloom-garden-kb/main/';

const SOURCE_DOCUMENTS = [
  'docs/04_mds/MISSION.md',
  'docs/04_mds/CLINICAL-INTEGRITY-LAYER.md',
  'docs/04_mds/HIPAA-ARCHITECTURE-DECISIONS.md',
  'docs/04_mds/FOUNDING-SESSION-LOG.md',
  'docs/03_briefs/CEB-001-co-regulation.md',
  'docs/03_briefs/CEB-002-projective-play.md',
  'docs/03_briefs/CEB-003-diaphragmatic-breathing.md',
  'docs/03_briefs/CEB-004-proprioceptive-regulation.md',
  'docs/02_product-decisions/COMPETITOR-ANALYSIS.md',
  'docs/01_specs/PRD.md',
  'docs/01_specs/GLOSSARY.md',
  'docs/01_specs/RISKS.md',
  'docs/01_specs/ACCEPTANCE.md',
];

// --- Helpers ---

function validateEnv() {
  const required = {
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    OPENAI_API_KEY,
    GITHUB_TOKEN,
  };
  const missing = Object.entries(required)
    .filter(([, v]) => !v)
    .map(([k]) => k);
  if (missing.length > 0) {
    console.error(`Missing required env vars: ${missing.join(', ')}`);
    process.exit(1);
  }
}

/**
 * Rough token count approximation (~4 chars per token for English text).
 */
function approxTokens(text) {
  return Math.ceil(text.length / 4);
}

/**
 * Extract the document title from the first H1 heading, or fall back to filename.
 */
function extractDocTitle(markdown, filePath) {
  const h1Match = markdown.match(/^#\s+(.+)$/m);
  if (h1Match) return h1Match[1].trim();
  const filename = filePath.split('/').pop().replace('.md', '');
  return filename.replace(/[-_]/g, ' ');
}

/**
 * Chunk a markdown document by H2 headings.
 * If a chunk exceeds ~500 tokens, split further at H3.
 */
function chunkMarkdown(markdown, filePath) {
  const docTitle = extractDocTitle(markdown, filePath);
  const chunks = [];

  // Split by H2 headings, keeping the heading with its content
  const h2Parts = markdown.split(/^(?=## )/m).filter((p) => p.trim());

  for (const part of h2Parts) {
    const h2Match = part.match(/^## (.+)$/m);
    const sectionName = h2Match ? h2Match[1].trim() : 'Introduction';

    if (approxTokens(part) <= MAX_CHUNK_TOKENS_APPROX) {
      chunks.push({
        section: sectionName,
        title: `${docTitle} — ${sectionName}`,
        content: part.trim(),
      });
    } else {
      // Split further at H3
      const h3Parts = part.split(/^(?=### )/m).filter((p) => p.trim());

      if (h3Parts.length <= 1) {
        // No H3 subdivisions — keep as single chunk
        chunks.push({
          section: sectionName,
          title: `${docTitle} — ${sectionName}`,
          content: part.trim(),
        });
      } else {
        for (const h3Part of h3Parts) {
          const h3Match = h3Part.match(/^### (.+)$/m);
          const subSection = h3Match
            ? `${sectionName} > ${h3Match[1].trim()}`
            : sectionName;

          chunks.push({
            section: subSection,
            title: `${docTitle} — ${subSection}`,
            content: h3Part.trim(),
          });
        }
      }
    }
  }

  return chunks;
}

/**
 * Fetch a markdown file from the private GitHub repo.
 */
async function fetchDocument(filePath) {
  const url = `${GITHUB_RAW_BASE}${filePath}`;
  const res = await fetch(url, {
    headers: { Authorization: `token ${GITHUB_TOKEN}` },
  });
  if (!res.ok) {
    throw new Error(`GitHub fetch failed for ${filePath}: ${res.status} ${res.statusText}`);
  }
  return res.text();
}

/**
 * Generate an embedding for a text string.
 */
async function generateEmbedding(openai, text) {
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text,
  });
  return response.data[0].embedding;
}

/**
 * Sleep for a given number of milliseconds.
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// --- Main ---

async function main() {
  validateEnv();

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

  let totalChunks = 0;
  let insertedChunks = 0;
  let skippedChunks = 0;
  let failedDocs = 0;

  console.log(`Starting KB ingestion — ${SOURCE_DOCUMENTS.length} documents\n`);

  for (const filePath of SOURCE_DOCUMENTS) {
    console.log(`--- ${filePath}`);

    // 1. Fetch document
    let markdown;
    try {
      markdown = await fetchDocument(filePath);
      console.log(`  Fetched (${markdown.length} chars)`);
    } catch (err) {
      console.error(`  SKIP — fetch failed: ${err.message}`);
      failedDocs++;
      continue;
    }

    // 2. Chunk
    const chunks = chunkMarkdown(markdown, filePath);
    console.log(`  Chunked into ${chunks.length} sections`);
    totalChunks += chunks.length;

    // 3. Embed and upsert each chunk
    for (const chunk of chunks) {
      let embedding;
      try {
        embedding = await generateEmbedding(openai, chunk.content);
      } catch (err) {
        console.error(`  SKIP chunk "${chunk.section}" — embedding failed: ${err.message}`);
        skippedChunks++;
        await sleep(EMBEDDING_DELAY_MS);
        continue;
      }

      try {
        const { error } = await supabase.from('kb_documents').upsert(
          {
            file_path: filePath,
            section: chunk.section,
            title: chunk.title,
            content: chunk.content,
            embedding: embedding,
            metadata: {
              file_path: filePath,
              section: chunk.section,
              doc_type: filePath.split('/')[1] || 'unknown',
            },
            ingested_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'file_path,section' }
        );

        if (error) {
          console.error(`  SKIP chunk "${chunk.section}" — upsert failed: ${error.message}`);
          skippedChunks++;
        } else {
          insertedChunks++;
          process.stdout.write(`  ✓ ${chunk.section}\n`);
        }
      } catch (err) {
        console.error(`  SKIP chunk "${chunk.section}" — upsert failed: ${err.message}`);
        skippedChunks++;
      }

      await sleep(EMBEDDING_DELAY_MS);
    }
  }

  // Summary
  console.log('\n=== Ingestion Complete ===');
  console.log(`Documents processed: ${SOURCE_DOCUMENTS.length - failedDocs}/${SOURCE_DOCUMENTS.length}`);
  console.log(`Total chunks: ${totalChunks}`);
  console.log(`Inserted/updated: ${insertedChunks}`);
  console.log(`Skipped (errors): ${skippedChunks}`);
  console.log(`Failed documents: ${failedDocs}`);

  const failRate = totalChunks > 0 ? skippedChunks / totalChunks : 0;
  if (failRate > FAILURE_THRESHOLD) {
    console.error(`\nFAILED — ${(failRate * 100).toFixed(1)}% chunks failed (threshold: ${FAILURE_THRESHOLD * 100}%)`);
    process.exit(1);
  }

  console.log('\nSUCCESS');
  process.exit(0);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
