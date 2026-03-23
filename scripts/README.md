# Scripts

## ingest-kb.js — KB Vector Ingestion Pipeline

Reads markdown files from the `bloom-garden-kb` GitHub repo, chunks by heading structure, generates embeddings via OpenAI `text-embedding-3-small`, and upserts into the `kb_documents` table in Supabase.

### Required Environment Variables

| Variable | Description |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (never expose in client code) |
| `OPENAI_API_KEY` | OpenAI API key for embedding generation |
| `GITHUB_TOKEN` | GitHub personal access token (repo is private) |

### Usage

```bash
# Set env vars (or use .env file with dotenv)
export SUPABASE_URL=https://pobqntuhqbvjrqftwsaj.supabase.co
export SUPABASE_SERVICE_ROLE_KEY=your-key
export OPENAI_API_KEY=your-key
export GITHUB_TOKEN=your-token

# Run ingestion
node scripts/ingest-kb.js
```

### Behavior

- Fetches 13 target markdown documents from the private GitHub repo
- Chunks each document by H2 headings (~500 token chunks); splits further at H3 if oversized
- Generates 1536-dimension embeddings via `text-embedding-3-small`
- Upserts into `kb_documents` using `(file_path, section)` unique key — safe to re-run
- Logs progress and errors per document/chunk
- Exit code 0 on success, exit code 1 if >20% of chunks fail

### Idempotency

The script uses `ON CONFLICT (file_path, section) DO UPDATE` — running it multiple times on unchanged documents will not create duplicate rows. Updated content will overwrite existing rows.
