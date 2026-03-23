# Bloom Garden — Session Context
**Session Date:** 2026-03-23
**Session:** 3 — Infrastructure Build
**Orchestrator:** Don
**Status:** Supabase infrastructure complete. Handing to Codey for KB vector layer + ingestion pipeline.

---

## Critical Context — Read Before Anything

### The Governing Principle
"We help children. We do not seek validation for ourselves."
This is in MISSION.md. It governs every decision.

### The BAA Situation
Supabase BAA requires Team plan ($599/mo). Don is on Pro ($25/mo). **Decision made: stay on Supabase Pro, build now, resolve BAA when pilot revenue justifies Team plan.** No PHI enters the system until BAA is executed. PHI tables exist and are RLS-locked — they just receive no data yet. Prototype (Phase 2) runs on local state only — this was already the plan.

### What This Means For Codey
- Build everything as designed
- Do NOT write any code or scripts that insert real child/parent/OT data into PHI tables
- Session memory, KB documents, exercise library — all fine, not PHI
- The PHI table schema is correct and ready — it just waits for the BAA

---

## Supabase Instance
- **Project ID:** `pobqntuhqbvjrqftwsaj`
- **URL:** `https://pobqntuhqbvjrqftwsaj.supabase.co`
- **Plan:** Pro
- **pgvector:** ✅ Enabled (v0.8.0)
- **OpenAI API key:** ✅ Set as Edge Function secret (`OPENAI_API_KEY`)

---

## Infrastructure Completed This Session

### Migrations Applied (8 total)
| Migration | Status |
|---|---|
| `001_enable_extensions` | ✅ |
| `002_audit_log` | ✅ |
| `003_identity_tables` | ✅ |
| `004_session_memory` | ✅ |
| `005_phi_tables` | ✅ |
| `006_exercise_library` | ✅ |
| `007_rls_policies` | ✅ |
| `008_vector_search_functions` | ✅ |

### Tables (15) — All RLS Enabled
**Non-PHI (safe to use now):**
- `session_memory` — RAG+ agent context, vector(1536), HNSW indexed
- `kb_documents` — vectorized KB markdown, HNSW indexed
- `exercise_library` — clinical catalog, public read
- `anomaly_flags` — behavioral flags, PHI-adjacent

**Identity/PII:**
- `profiles` — parent accounts
- `ot_profiles` — OT professional accounts
- `child_profiles` — child records (contains PHI fields)
- `child_ot_links` — OT↔child relationships

**PHI — Awaiting BAA before any real data:**
- `emotional_checkins`
- `session_events`
- `exercise_prescriptions`
- `garden_mail`
- `parent_ot_messages`
- `ot_clinical_notes`

**Compliance:**
- `audit_log` — append-only, no UPDATE/DELETE rules enforced

### Edge Functions (3) — All ACTIVE
- `session-memory-write` — RAG+ write, JWT required
- `session-memory-read` — RAG+ read with semantic search, JWT required
- `kb-search` — public KB semantic search, no JWT (powers search bar)

### RPC Functions (2)
- `match_session_memory(query_embedding, match_agent, match_count)` — agent-scoped vector similarity
- `match_kb_documents(query_embedding, match_count)` — KB vector similarity

---

## Codey's Work Queue — Priority Order

### Priority 2 — KB Vector Ingestion Pipeline 🔴 START HERE
The `kb_documents` table exists with HNSW vector index. It's empty.
The KB site search bar calls `kb-search` Edge Function — but returns zero results until documents are ingested.

**What needs building:**
- Node.js ingestion script that:
  1. Reads all markdown files from `github.com/CornFedKratos/bloom-garden-kb`
  2. Chunks each document into meaningful sections (heading-based, ~500 token chunks)
  3. Generates embeddings via OpenAI `text-embedding-3-small` (1536 dimensions)
  4. Upserts into `kb_documents` table with: `file_path`, `section`, `title`, `content`, `embedding`, `metadata`
- Script should be runnable as a one-shot and also as a CI/CD step on repo push
- Target docs (all in `docs/` folder):
  - `04_mds/MISSION.md`
  - `04_mds/CLINICAL-INTEGRITY-LAYER.md`
  - `04_mds/HIPAA-ARCHITECTURE-DECISIONS.md`
  - `04_mds/FOUNDING-SESSION-LOG.md`
  - `03_briefs/CEB-001-co-regulation.md`
  - `03_briefs/CEB-002-projective-play.md`
  - `03_briefs/CEB-003-diaphragmatic-breathing.md`
  - `03_briefs/CEB-004-proprioceptive-regulation.md`
  - `02_product-decisions/COMPETITOR-ANALYSIS.md`
  - `01_specs/PRD.md`
  - `01_specs/GLOSSARY.md`
  - `01_specs/RISKS.md`
  - `01_specs/ACCEPTANCE.md`

**Supabase service role key needed** — Codey has direct access, set as env var `SUPABASE_SERVICE_ROLE_KEY`.

### Priority 3 — KB Navigation Pages
On the Next.js KB site (`bloom-garden-kb.netlify.app`):
- `/foundation` — renders the 4 constitutional docs from `04_mds/`
- `/clinical-evidence` — renders the 4 CEB briefs from `03_briefs/`
- `/product-decisions` — renders competitor analysis + decision records from `02_product-decisions/`
- Pages pull markdown from GitHub repo at build time (static generation)
- Match the existing KB site design — `--moss` green, Cormorant Garamond / DM Sans, card-based layout
- Netlify site ID: `e1252695-6cca-4834-a20f-c65aeb4c3af0`

### Priority 4 — Linear Ticket Structure
- Space: BLO (`https://linear.app/chickentindy/team/BLO/all`)
- Create project structure in Linear
- First tickets:
  - RISK-002: Sign Supabase BAA — blocked until Team plan, track for when pilot revenue justifies
  - RISK-001: Name trademark review — before any App Store submission
  - RISK-003: OT pilot recruitment — begin during Phase 2
  - OQ-005: HIPAA BA status legal review — before Phase 3
- Create `CIL` label — applies to all tickets containing clinical claims
- Create milestone: `Phase 2 — Prototype`

### Priority 5 — OT Recruitment (Don leads, Codey supports doc only)
- Finalize prototype scope document
- Draft CIL Phase 2 observation protocol
- Draft founding OT partner ask document
- These are markdown documents for the KB, not code

---

## KB Website
- **Live:** `https://bloom-garden-kb.netlify.app`
- **Repo:** `github.com/CornFedKratos/bloom-garden-kb`
- **Framework:** Next.js 14 + Tailwind
- **Netlify site ID:** `e1252695-6cca-4834-a20f-c65aeb4c3af0`
- **Env vars set:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `OPENAI_API_KEY`
- **story.html** — 19-slide pitch deck, TV-optimized, live at `/story.html`

---

## Non-Negotiables Codey Must Know

1. No failure states — ever — in child-facing UI
2. HIPAA architecture is locked — RLS on every PHI table, enforced from day one
3. BAA before any PHI data — no exceptions, no workarounds
4. CIL governs all clinical claims — agents cannot self-approve
5. Proprioceptive mechanics = "awareness support" — NEVER "sensory integration therapy"
6. AI summarizes/patterns/flags — never diagnoses, prescribes, replaces clinical judgment
7. "Bloom Garden" is codename — name TBD with OT pilot group
8. Companion never mirrors distress — no distress states in any animation or mechanic
9. OT portal is MVP — not post-launch
10. We help children. We do not seek validation for ourselves.

---

## Agent Team
| Agent | Role | Current Status |
|---|---|---|
| Don | Orchestrator | Active |
| Claud3 | CPO | Handing off to Codey — resuming for Linear + OT docs |
| **Codey** | CTO | **Active — owns Priority 2 + 3** |
| Codey Jr | Engineer | Standing by |
| Carl | Sr UI/UX | Design system v1.0 pending |
| Clyde | QA Director | Standing by |

---

## Session Memory Note
Load this document at session open. The KB at `bloom-garden-kb.netlify.app` is the living reference.
MISSION.md governs every decision. CIL governs every clinical claim.
Supabase project ID: `pobqntuhqbvjrqftwsaj` — Codey has direct MCP access.

---
## Decision Log — 2026-03-23 — Recraft Visual Pipeline

**Decision:** All Phase 2 prototype visual assets will be produced via Recraft AI Pro instead of CustomPainter geometric primitives.

**Trigger:** During BLO-16 (Carl — Lottie Moss production), Carl determined that hand-authored Lottie JSON of geometric primitives cannot produce the emotional warmth required for OT observation. Recraft AI Pro generates true illustrated SVG characters. Don approved the $20/month cost.

**Assets affected:** Moss (3 states), meadow environment, Rain Painter, Stone Stacker, Weather Report icons.

**Pipeline:** Recraft API → SVG → svg-to-lottie (for Lottie assets) → keyframe animation → Flutter integration.

**Tickets created:** BLO-16 (Moss Lottie, updated), BLO-18 (visual asset sweep, new).

**ADR:** `docs/02_product-decisions/RECRAFT-VISUAL-PIPELINE.md`

**What does NOT change:** COLOR-TOKENS.md, INTERACTION-PATTERNS.md, SENSORY-SAFETY-AUDIT.md, Flutter code architecture.

**⚠️ Security note:** Recraft API key was exposed in conversation 2026-03-23. Key must be regenerated at recraft.ai before use. Store as env var RECRAFT_API_KEY — never commit to repo.
---
