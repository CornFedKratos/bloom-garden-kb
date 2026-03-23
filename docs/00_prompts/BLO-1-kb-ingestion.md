# BLO-1 — KB Vector Ingestion Pipeline
# Execution Prompt v1.0
# Authored by: Claud3 (CPO)
# Status: PENDING Don approval before Codey executes

---

## Prompt Metadata

| Field | Value |
|---|---|
| Ticket | [BLO-1](https://linear.app/chickentindy/issue/BLO-1/kb-vector-ingestion-pipeline) |
| Branch | `feat/blo-1-kb-vector-ingestion-pipeline` |
| Type | Feature — infrastructure script |
| Agent | Codey |
| Dependencies | None — first ticket in sequence |
| Baseline test count | N/A — pre-Flutter, no test suite yet |
| Prompt version | 1.0 |
| Authored | 2026-03-23 |

---

## Context

The Supabase `kb_documents` table exists with an HNSW vector index but is empty.
The `kb-search` Edge Function is deployed and live at:
`https://pobqntuhqbvjrqftwsaj.supabase.co/functions/v1/kb-search`

It returns zero results because no documents have been ingested.

The KB site search bar at `bloom-garden-kb.netlify.app` calls this Edge Function.
Until documents are ingested, search returns nothing.

This prompt delivers the ingestion pipeline that populates the table.

---

## Objective

Build a Node.js script at `scripts/ingest-kb.js` that:
1. Reads 13 target markdown files from the GitHub repo
2. Chunks each file by heading structure (~500 token chunks)
3. Generates embeddings via OpenAI `text-embedding-3-small` (1536 dimensions)
4. Upserts records into `kb_documents` table in Supabase
5. Is runnable as a one-shot script and as a CI/CD step on repo push

---

## File Ownership Boundaries

### Files Codey WILL touch
```
scripts/ingest-kb.js          CREATE — the ingestion script
scripts/README.md              CREATE — documents env vars and usage
.env.example                   UPDATE — add required env vars
package.json                   UPDATE — add dependencies if not present
```

### Files Codey will NOT touch
```
Any file in supabase/
Any file in pages/ or components/
Any file in public/
CLAUDE.md
.claude/skills/*
docs/session_context/*
docs/prompts/*  (except reading this file)
Any existing Edge Functions
```

If Codey discovers he needs to touch a file not listed above, he STOPS, annotates the finding on BLO-1, and waits for approval.

---

## Technical Specification

### Target Table Schema
```sql
kb_documents (
  id           uuid PRIMARY KEY,
  file_path    text NOT NULL,        -- e.g. "docs/04_mds/MISSION.md"
  section      text NOT NULL,        -- e.g. "Governing Principle"
  title        text NOT NULL,        -- document title + section heading
  content      text NOT NULL,        -- chunk content (~500 tokens)
  embedding    vector(1536),         -- OpenAI text-embedding-3-small
  metadata     jsonb DEFAULT '{}',   -- file_path, section, doc_type
  ingested_at  timestamptz,
  updated_at   timestamptz
)
```

### Upsert Strategy
Use `ON CONFLICT (file_path, section) DO UPDATE` to prevent duplicates.
Note: a unique constraint on `(file_path, section)` must exist. If it does not, Codey must create it via migration before the script runs. Check first.

### Chunking Strategy
- Split each document by H2 (`##`) headings
- Each H2 section = one chunk
- If a section exceeds ~500 tokens, split further at H3 (`###`)
- Chunk title = `[Document Title] — [Section Heading]`
- Include the heading itself in the chunk content

### Embedding Model
```
model: text-embedding-3-small
dimensions: 1536
```
Batch calls with a 200ms delay between requests to avoid rate limiting.

### Source Documents (13 files)
All fetched from: `https://raw.githubusercontent.com/CornFedKratos/bloom-garden-kb/main/`

```
docs/04_mds/MISSION.md
docs/04_mds/CLINICAL-INTEGRITY-LAYER.md
docs/04_mds/HIPAA-ARCHITECTURE-DECISIONS.md
docs/04_mds/FOUNDING-SESSION-LOG.md
docs/03_briefs/CEB-001-co-regulation.md
docs/03_briefs/CEB-002-projective-play.md
docs/03_briefs/CEB-003-diaphragmatic-breathing.md
docs/03_briefs/CEB-004-proprioceptive-regulation.md
docs/02_product-decisions/COMPETITOR-ANALYSIS.md
docs/01_specs/PRD.md
docs/01_specs/GLOSSARY.md
docs/01_specs/RISKS.md
docs/01_specs/ACCEPTANCE.md
```

### Required Environment Variables
```
SUPABASE_URL=https://pobqntuhqbvjrqftwsaj.supabase.co
SUPABASE_SERVICE_ROLE_KEY=[from .env.development]
OPENAI_API_KEY=[from .env.development]
GITHUB_TOKEN=[required only if repo is private]
```

### Dependencies to add if not present
```json
"@supabase/supabase-js": "^2.0.0",
"openai": "^4.0.0"
```
No other dependencies. Use native Node.js `fetch` for GitHub raw content requests.

### Error Handling
- If a document fails to fetch: log the error, skip it, continue
- If an embedding call fails: log the error, skip that chunk, continue
- If upsert fails: log the error, skip that chunk, continue
- At end of script: report total chunks processed, total inserted, total skipped

### Script Usage
```bash
node scripts/ingest-kb.js
```

Script must exit with code 0 on success, code 1 if more than 20% of chunks failed.

---

## Acceptance Criteria

```gherkin
Given the ingestion script runs against the live Supabase instance
When it completes without errors
Then all 13 target documents are represented in kb_documents with non-null embeddings

Given a user types "co-regulation" in the KB search bar
When the search executes
Then at least one result from CEB-001 appears in the top 3 results

Given a user types "HIPAA" in the KB search bar
When the search executes
Then at least one result from HIPAA-ARCHITECTURE-DECISIONS.md appears

Given a user types "companion" in the KB search bar
When the search executes
Then results from PRD.md or GLOSSARY.md appear

Given the ingestion script runs a second time on unchanged documents
When it completes
Then row count in kb_documents does not increase (upsert, not insert)

Given the script encounters a document that fails to embed
When the error occurs
Then the script logs the failure, skips that document, and continues
```

---

## Verification Steps

After implementation, before reporting to Don:

```bash
# 1. Run the script
node scripts/ingest-kb.js

# 2. Verify row count in Supabase
# Expected: > 0 rows with non-null embeddings

# 3. Test the search endpoint manually
curl -X POST \
  https://pobqntuhqbvjrqftwsaj.supabase.co/functions/v1/kb-search \
  -H "Content-Type: application/json" \
  -d '{"query": "co-regulation companion"}'
# Expected: results array with at least 1 item

# 4. Run script a second time — verify row count unchanged
```

---

## Definition of Done

- [ ] Annotation posted on BLO-1 and approved by Don
- [ ] `scripts/ingest-kb.js` committed to `feat/blo-1-kb-vector-ingestion-pipeline`
- [ ] `scripts/README.md` committed with env var docs
- [ ] `.env.example` updated with required keys
- [ ] All 13 documents ingested with non-null embeddings (verified via Supabase)
- [ ] `kb-search` Edge Function returning results for test queries (verified via curl)
- [ ] Upsert behaviour confirmed — second run does not increase row count
- [ ] PR opened against main with `BLO-1` in title
- [ ] `/session-close` run — context exported to `BLO_SESSION_CONTEXT_LATEST.md`

---

## Session Context Export Template

Codey fills this out at `/session-close`:

```markdown
---
## Session Export — [DATE] — Codey

**Branch:** feat/blo-1-kb-vector-ingestion-pipeline
**Commit hash:** [hash]

### What Changed
- scripts/ingest-kb.js — CREATED
- scripts/README.md — CREATED
- .env.example — UPDATED
- package.json — UPDATED (if deps added)

### Decisions Made
- [any decisions about chunking strategy, error handling, etc.]

### Tickets Worked
- BLO-1 — KB Vector Ingestion Pipeline — [status]

### Test Count Delta
- N/A (pre-Flutter phase)

### KB Sections Updated
- kb_documents table populated — [N] chunks ingested

### Open Blockers
- [any blockers for BLO-2]

### Next Session Should Start With
- BLO-2 — KB Navigation Pages (blocked by BLO-1, now unblocked)
---
```
