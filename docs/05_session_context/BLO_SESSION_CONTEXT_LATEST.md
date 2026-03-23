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

---

## Session Export — 2026-03-23 — Codey (CTO) + Carl (Sr UI/UX) + Clyde (QA)

**Session:** 4 — Phase 2 Prototype Build + Asset Production
**Orchestrator:** Don
**Status:** Phase 2 prototype built, all assets produced, integration pending (BLO-17)

### Pre-Flight State
- KB repo: clean on main
- App repo: did not exist at session start
- BAA status: pending

### Tickets Completed This Session

| Ticket | Title | Repo | Agent |
|---|---|---|---|
| BLO-1 | KB Vector Ingestion Pipeline | bloom-garden-kb | Codey |
| BLO-2 | KB Navigation Pages | bloom-garden-kb | Codey |
| BLO-3 | Linear Project Structure | Linear config | Codey |
| BLO-4 | OT Recruitment Docs | bloom-garden-kb | Codey (review) |
| BLO-10 | Phase 2 Design Specs (6 docs) | bloom-garden-kb | Carl |
| BLO-11 | Flutter App Scaffold | bloom-garden-app | Codey |
| BLO-13 | Sound Assets (17 files) | bloom-garden-app | Carl |
| BLO-15 | TDD Foundation | bloom-garden-app | Clyde |
| BLO-16 | Lottie Moss (3 states) | bloom-garden-app | Carl |
| BLO-18 | Recraft Visual Assets (24 SVGs) | bloom-garden-app | Carl |
| BLO-12 | Phase 2 Prototype Build | bloom-garden-app | Codey |

### Tickets Created This Session
| Ticket | Title | Status |
|---|---|---|
| BLO-5 | RISK-001: Name trademark | Backlog |
| BLO-6 | RISK-002: Supabase BAA | Backlog |
| BLO-7 | RISK-003: OT pilot recruitment | Backlog |
| BLO-8 | OQ-005: HIPAA BA/CE status | Backlog |
| BLO-13 | Sound Asset Production | Done |

### Ticket Pending — Next Session
| Ticket | Title | Status |
|---|---|---|
| BLO-17 | Full Asset Integration (Lottie + Audio + SVG) | Ready — annotate and execute |

### Architecture Decisions Made
1. **Physics:** Manual AnimationController for Stone Stacker (no flame dependency)
2. **Navigation:** Navigator.push/pop with PageRouteBuilder 1500ms cross-fade
3. **Moss rendering:** CustomPainter fallback built, Lottie assets produced via Recraft AI
4. **Sound in prototype:** Confirmed in-scope. ElevenLabs AI for all 17 assets.
5. **Visual asset pipeline:** Recraft AI Pro ($20/mo) for all illustrated SVGs
6. **Sound placeholders:** Silent in BLO-12, real audio in BLO-13, wired in BLO-17

### Asset Inventory — All on main in bloom-garden-app

**Lottie (assets/animations/):**
- moss_resting.json — 70KB, 10s loop, 60fps
- moss_calm_active.json — 122KB, 8s loop, 60fps
- moss_co_regulating.json — 133KB, 11s loop (4s/1s/6s), 60fps
- Source SVGs in assets/animations/source/

**Audio (assets/audio/) — 17 files, 836KB total:**
- Ambient: meadow_ambient, rain_painter_ambient, stone_stacker_ambient, co_regulating_drone
- Moss: moss_tap_resting, moss_tap_calm_active, moss_tap_co_regulating
- Elements: tap_default, glowing_seed_tap, flower_tap, grass_tap, cloud_tap
- Mini-games: rain_stroke, stone_pick, stone_place, stone_fall
- Weather: weather_chime

**SVG (assets/images/) — 24 files + 4 app icon concepts:**
- Meadow: meadow_bg, glowing_seed, flower_cluster, grass_zone, ground_path, cloud_1/2/3
- Rain Painter: rain_sky_bg, rainbow, puddle_sm/md/lg
- Stone Stacker: river_bg, shore, stone_1/2/3/4/5
- Weather: weather_sunny, weather_cloudy, weather_rainy, weather_stormy
- App icons: concept_1_moss_garden, concept_2_seed_leaf, concept_3_moss_face, concept_4_bloom

### Test Count Delta
- App repo baseline at open: 0 (repo didn't exist)
- App repo final at close: 56 tests, 0 failures
- KB repo: build green

### Repos
- **bloom-garden-kb:** github.com/CornFedKratos/bloom-garden-kb (public)
- **bloom-garden-app:** github.com/CornFedKratos/bloom-garden-app (private)

### API Keys — MUST ROTATE
- **GitHub PAT:** exposed in conversation — REGENERATE
- **Recraft API key:** exposed in conversation — REGENERATE
- **ElevenLabs API key:** exposed in conversation — REGENERATE
- Recraft credits remaining: ~1,640 (started at ~5,000)

### Linear State
- Project "Bloom Garden" created with 5 milestones
- 8 surface labels + existing labels
- 4 risk tickets (BLO-5 through BLO-8)
- Workflow automation configured

### Open Blockers
- BLOCKER: API keys exposed in conversation — Don must regenerate all 3 before next session
- BLOCKER: After regeneration, update remote URLs for both repos

### Don Review Items
- App icon: concepts 1 (Moss in Garden) and 3 (Moss Close-up) recommended for OT review
- Visual asset issues flagged by Don (palette, trees, faces) — fixed but some SVGs may need emulator-level iteration
- 1,640 Recraft credits available for targeted regeneration

### Next Session Should Start With
- **BLO-17 — Full Asset Integration** — Codey annotates and executes
- Three tasks: Lottie swap, AudioService + 17 sounds, SVG replacement for all screens
- 7 break points defined in prompt
- After BLO-17 merges: Don reviews on iOS simulator for the first time
- Rotate all 3 API keys before starting
