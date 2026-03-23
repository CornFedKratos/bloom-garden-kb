# CLAUDE.md — Bloom Garden (BLO)
# AI-Accelerated Development Lifecycle (AI-DLC) Playbook
# Version: 1.0 | Project: Bloom Garden | Codename: BLO
# Orchestrator: Don Schminkey

This is the operating doctrine for Bloom Garden. It governs every agent, every session, every decision.
It is not a summary. It is not documentation. It is the deployable operating system for this build.

---

## AGENT SYSTEM — SESSION ENTRY PROTOCOL

Every session begins with: `Good Morning [Agent Name], /session-open`

| Greeting contains | Load skill |
|---|---|
| "Codey Jr" | `.claude/skills/agent-codey-jr/SKILL.md` |
| "Codey" (not Jr) | `.claude/skills/agent-codey/SKILL.md` |
| "Carl" | `.claude/skills/agent-carl/SKILL.md` |
| "Clyde" | `.claude/skills/agent-clyde/SKILL.md` |
| "Claud3" | `.claude/skills/agent-claud3/SKILL.md` |

Session context file: `docs/05_session_context/BLO_SESSION_CONTEXT_LATEST.md`
Prompt location: `docs/06_prompts/`
Branch pattern: `feat/blo-XXX-short-description`

**No agent begins work before session-open completes.**
**No session ends without session-close completing and context export committed to the repo.**

Session lifecycle:
- Open: `Good Morning [Agent Name], /session-open`
- Close: `/session-close`

---

## PROJECT CONSTANTS

```
Project codename:       BLO
Supabase project ID:    pobqntuhqbvjrqftwsaj
Supabase URL:           https://pobqntuhqbvjrqftwsaj.supabase.co
KB site:                https://bloom-garden-kb.netlify.app
KB repo:                github.com/CornFedKratos/bloom-garden-kb
Netlify site ID:        e1252695-6cca-4834-a20f-c65aeb4c3af0
Linear space:           https://linear.app/chickentindy/team/BLO/all
Linear prefix:          BLO-XXX
Flutter project root:   ~/bloom-garden/app/
Session context:        docs/05_session_context/BLO_SESSION_CONTEXT_LATEST.md
Prompt location:        docs/06_prompts/
```

---

## GOVERNING PRINCIPLE

> "We help children. We do not seek validation for ourselves."

This is constitutional. Every agent reads it at every session. It governs every clinical and product decision.

---

## MINIMUM VIABLE DISCIPLINE

This playbook is optimized for high-stakes, production-grade systems. Bloom Garden handles Protected Health Information for autistic children. Full discipline is the default.

For any gate that is consciously relaxed during prototype or early build phases, you must document:
- Which gate is being relaxed
- Why it is being relaxed
- What risks are being accepted as a consequence
- At what point full discipline will be restored

**Relaxation without documentation is not pragmatism. It is erosion.**

Current relaxations in effect:
- Pre-flight flutter analyze: RELAXED — Flutter app does not exist yet (Phase 2). Restored at prototype build start.
- PHI table data entry: RELAXED — BAA not yet executed. No real PHI enters system. Restored when Supabase BAA is signed.
- Integration test suite: RELAXED — No app yet. Restored at prototype build start.

---

## SECTION 1 — DO NOT BEGIN BUILDING WITHOUT

Development does not begin until every item below is confirmed complete.
This section is a gate. Not a checklist. Not a suggestion.

### Mandatory Planning Artifacts
- [ ] PRD — problem statement, goals, non-goals, success metrics, stakeholders
- [ ] GLOSSARY — all domain terms, product entities, feature IDs
- [ ] RISKS.md — minimum 4 high risks enumerated with mitigations
- [ ] ACCEPTANCE.md — global Definition of Done, performance baselines, pilot gate
- [ ] DATA_SPEC.md — full table inventory, PHI classification, RLS policies
- [ ] API_CONTRACTS.md — all Edge Function contracts, error codes, rate limits
- [ ] UX_FLOWS.md — all user flows, screen inventory
- [ ] DESIGN_SYSTEM.md — palette, typography, component library (directional at minimum)
- [ ] AUDIT.md — spec completeness audit

**Status: ALL COMPLETE as of 2026-03-22.**

### Compliance Requirements — Non-Negotiable for BLO
- HIPAA: PHI tables exist with RLS. BAA required before any real PHI enters system.
- COPPA: Parental consent gate for all child accounts. No child independent credentials.
- AES-256 at rest, TLS 1.3 in transit — enforced by Supabase.
- Audit logging on all PHI access — `audit_log` table, append-only.
- US data residency — enforced.
- OT portal: 15-minute session timeout, individual credentials.

### Clinical Integrity Layer (CIL) — Gate Unique to BLO
Every clinical or therapeutic claim operates under the CIL:
- **Phase 1 (Research Gate):** Peer-reviewed evidence confirmed before feature enters spec.
- **Phase 2 (Clinical Gate):** OT observes mechanic with real children before approval.
- Agents cannot self-approve CIL items. Don is the approver.
- CIL label required on all Linear tickets containing clinical claims.

### Architecture Requirements
- Data model defined before any UI implementation
- RLS policies written before any PHI table created
- BAA executed before any PHI data enters system
- Edge Functions for all AI processing — PHI never leaves infrastructure
- pgvector HNSW indexes on all embedding tables

### MVP vs. Future Roadmap
- MVP: Defined in PRD.md. 17 features. FEAT-001 through FEAT-017.
- Post-MVP: EHR integration, telehealth video, AI recommendation engine, social features, non-English support, public App Store launch.
- Nothing post-MVP enters development sprint without explicit Orchestrator approval.

### Definition of Production-Grade (BLO)
- All Gherkin ACs passing
- `flutter analyze` = 0 errors
- Test count >= session baseline, 0 failures
- RLS enforced on all PHI tables, verified
- Audit log entries generated on PHI access
- No PHI in logs, metadata, or schema descriptions
- CI pipeline green
- KB section created or updated, section_id in ticket DoD

### Test Strategy
- TDD default. Tests written before implementation.
- Minimum 10 integration tests against real Supabase backend (not mocks).
- Test count ratchet enforced in CI — count never decreases.
- Regression test required for every bug fix.
- Regression test required for every new feature.

### Experience Injection (Section 7 prerequisite)
See `docs/04_mds/FOUNDING-SESSION-LOG.md` — prior pitfalls, known compliance pain points, architectural decisions, and lessons from ChickenTindy are documented there. Every agent reads this before Phase 3 build begins.

---

## SECTION 2 — STAGE-GATED DEVELOPMENT MODEL

**Failure to meet exit criteria resets the stage.**
Every stage requires: updated context artifact, updated risk register, updated decision log.

### Stage 1 — Concept & Scope Definition
**Entry:** Orchestrator initiates project.
**Exit:** PRD approved, non-goals explicit, personas defined, governing principle confirmed.
**Artifacts:** PRD.md, GLOSSARY.md
**Approval authority:** Don (Orchestrator)
**Blockers:** Unclear problem statement, undefined user, no governing principle.
**Status: COMPLETE ✅**

### Stage 2 — Specification & Risk Hardening
**Entry:** Stage 1 complete.
**Exit:** All spec documents complete, AUDIT.md >= 95%, all high risks mitigated or accepted.
**Artifacts:** RISKS.md, ACCEPTANCE.md, DESIGN_SYSTEM.md, UX_FLOWS.md, COMPETITOR-ANALYSIS.md, CEBs 001–004
**Approval authority:** Don + CIL sign-off for clinical specs.
**Blockers:** Unmitigated HIGH risks, incomplete CEB briefs, CIL Phase 1 not complete.
**Status: COMPLETE ✅**

### Stage 3 — Architecture & Data Modeling
**Entry:** Stage 2 complete.
**Exit:** All tables created with RLS, Edge Functions deployed, vector search operational, BAA executed.
**Artifacts:** DATA_SPEC.md, API_CONTRACTS.md, Supabase migrations 001–008
**Approval authority:** Don + Codey.
**Blockers:** BAA not signed (PHI tables cannot receive data), RLS not verified.
**Status: IN PROGRESS 🔄 — Infrastructure complete, BAA pending.**

### Stage 4 — Test Strategy & TDD Setup
**Entry:** Stage 3 complete.
**Exit:** Test framework configured, baseline established, CI pipeline enforcing test ratchet.
**Artifacts:** Test suite scaffold, CI config, baseline test count recorded.
**Approval authority:** Clyde (QA Director).
**Blockers:** No Flutter app yet (Phase 2 prototype first).
**Status: PENDING — Begins at prototype build.**

### Stage 5 — Execution Sprint Cycles
**Entry:** Stage 4 complete.
**Exit per sprint:** All ACs passing, tests >= baseline, PR merged, context exported.

**Session Context Export SOP — Mandatory after every execution session:**
Export must include:
- Pre-flight state (branch, test count, analyzer status)
- What changed (files touched, migrations applied, functions deployed)
- Decisions made (with rationale)
- Test count delta (before → after)
- Branch/commit hash
- Unexpected findings
- KB section_id created or updated

No session ends without context export committed to: `docs/05_session_context/BLO_SESSION_CONTEXT_LATEST.md`
Context exports are append-only. Previous sessions are institutional history. Latest block is authoritative state.

**Approval authority:** Don per sprint.
**Blockers:** Broken main, failing tests, unresolved HIGH risk, missing context export.

### Stage 6 — Verification & Test Ratchet Enforcement
**Entry:** Feature sprint complete.
**Exit:** Clyde sign-off, all regression tests passing, test count confirmed >= pre-sprint baseline.
**Artifacts:** QA report, updated test baseline.
**Approval authority:** Clyde (QA Director) — independent authority, cannot be overridden by Codey.
**Blockers:** Any regression. Any new test failure. Any analyzer error.

### Stage 7 — Observability & Production Readiness
**Entry:** Stage 6 complete.
**Exit:** Error monitoring live, crash reporting live, cost observability confirmed, all kill switches tested, all circuit breakers tested.
**Artifacts:** Observability checklist signed off.
**Approval authority:** Don + Codey.
**Blockers:** Any uncovered error path, missing kill switch, untested circuit breaker.

### Stage 8 — Launch Authorization
**Entry:** Stage 7 complete + OT pilot validation complete (CIL Phase 2).
**Exit:** Don explicit go/no-go. App Store submission authorized.
**Approval authority:** Don only. No agent can authorize launch.
**Blockers:** CIL Phase 2 not complete. OT pilot not run. BAA not signed. Name trademark not resolved.

---

## SECTION 3 — EXECUTION CONTROL SYSTEM

### Principle
```
AI proposes.
AI executes.
AI verifies.
Human governs.
```

### Rules
- Human is the final approval gate on every PR.
- No merge without human review.
- Every execution prompt is a versioned file committed to `docs/06_prompts/`.
- A prompt that is not in the repo did not happen.
- File ownership boundaries are explicit — agents do not touch files outside their scope.
- Parallel tracks are isolated — Track A (Codey) and Track B (Codey Jr) never share files.
- Mandatory regression test for every bug fix.
- Mandatory regression test for every new feature.
- TDD is the default. No exceptions without written justification.
- CI is enforcement, not suggestion.
- `flutter analyze` must be 0 errors before every commit.
- Context must be re-grounded at the start of every session.
- AI must restate understanding before execution.
- Deviations from approved plan require written justification and Don approval.

### THE ANNOTATION HARD STOP

After reading the ticket and prompt, the agent MUST:
1. Annotate findings on the Linear ticket (BLO-XXX)
2. List: what it plans to build, which files it will touch, which files it will NOT touch
3. STOP and wait for Don's explicit approval

**Without annotation approval, implementation does not begin.**

This catches hallucinated scope, misunderstood requirements, and file boundary violations before a single line is written.

### The 5-Step Execution Gate
```
Step 1 — Read the ticket
Step 2 — Review the prompt (from docs/06_prompts/)
Step 3 — Annotate findings on Linear — HARD STOP, wait for approval
Step 4 — Implement per approved plan
Step 5 — Verify (analyze + tests >= baseline) and ship
```

Steps 1–3 are planning. Steps 4–5 are execution. They do not overlap.
Agents that skip Step 3 or ship without Step 5 verification produce regressions.
The 5 steps are non-negotiable.

---

## SECTION 4 — QUALITY RATCHETS (NON-REVERSIBLE)

Standards once achieved do not lower. Ever.

- TDD is default. Tests written before implementation.
- Regression tests required for every bug fix.
- Regression tests required for every new feature.
- Test count can never decrease. CI enforces this as a hard fail.
- Coverage cannot regress.
- `flutter analyze` warnings cannot increase session-over-session.
- `flutter analyze` errors are always zero — non-negotiable.
- Security policies only tighten. RLS policies are never loosened.
- Observability coverage only expands.
- Documentation accumulates. KB sections are never deleted without replacement.
- Risk register cannot shrink without closure notes on resolved risks.
- Automation added at every repeatable process.
- Manual steps progressively eliminated.
- CI/CD pipeline is the merge gate — no bypass, no exceptions.
- No temporary bypass of automation controls. "Just this once" does not exist.

### TICKET QUALITY STANDARD

Every ticket must meet this bar before entering a sprint. Tickets that do not meet this standard are rejected at triage by Clyde.

Every ticket must include:
- [ ] User stories (who, what, why)
- [ ] Detailed description (context, not just the ask)
- [ ] Minimum 8 risks enumerated
- [ ] Minimum 8 Gherkin acceptance criteria (Given/When/Then)
- [ ] Technical notes (files, dependencies, data model impact)
- [ ] Minimum 6 QA tests specified
- [ ] Definition of Done as checkboxes
- [ ] 1–2 Surface labels from BLO taxonomy
- [ ] Blocking/dependency relationships documented
- [ ] CIL label if ticket contains any clinical claim
- [ ] KB section_id documented in DoD

A ticket is not Done until its KB section exists and section_id appears in the DoD checkboxes.

### BLO Surface Label Taxonomy
```
surface/child-ui          — Child-facing garden and mini-game screens
surface/parent-dashboard  — Parent insight and timeline views
surface/ot-portal         — Garden Keepers OT portal
surface/auth              — Authentication, consent, account management
surface/data-layer        — Supabase tables, RLS, Edge Functions
surface/exercise-library  — Clinical exercise catalog
surface/notifications     — Calm mode, garden mail, anomaly alerts
surface/infra             — CI, deployment, environment config
surface/kb                — Knowledge base, documentation, vector search
```

---

## SECTION 5 — MUST-HAVES FOR PRODUCTION-GRADE

These are not targets. They are gates.

- Minimum 80% automated test coverage on business logic
- TDD compliance verified by Clyde before Stage 6 sign-off
- Full regression suite passing before every release
- CI pipeline enforces test ratchet — build fails if count drops
- `flutter analyze` = 0 errors, always
- RLS enforced on all PHI tables — verified programmatically, not assumed
- Secrets in environment variables only — never in code, never in logs
- Error monitoring live before pilot launch (Sentry or equivalent)
- Crash reporting live before pilot launch
- PHI access audit log active and queryable — `audit_log` table
- HIPAA audit logs retained minimum 6 years
- Cost observability: per-API-call tracking with source, count, estimated cost/day
- Kill switches for all external service integrations — independently disableable without redeployment
- Feature flags for all AI-powered features
- Budget caps on all metered APIs (OpenAI) with automatic halt at thresholds
- Circuit breakers on all external service calls
- Premium features independently disableable without affecting core functionality
- WCAG 2.1 AA accessibility compliance
- Data deletion pathway: parent-initiated, complete and verifiable, within 30 days
- Security review completed before pilot launch
- All KB sections complete and reconciled
- Context artifact complete

---

## SECTION 6 — CONTEXT PRESERVATION & DRIFT CONTROL

### Mandatory Context Artifacts
- `docs/04_mds/MISSION.md` — Project North Star, constitutional, non-modifiable without Orchestrator approval
- `docs/01_specs/PRD.md` — Architecture and scope snapshot
- `docs/01_specs/RISKS.md` — Living risk register, updated every stage
- `docs/02_product-decisions/` — Decision log, all ADRs documented here
- `docs/01_specs/AUDIT.md` — Scope boundary and artifact completeness
- `docs/05_session_context/BLO_SESSION_CONTEXT_LATEST.md` — Authoritative current state

### Rules
- No sprint ends without context artifact update.
- No new sprint begins without reloading context artifacts.
- All artifacts re-ingested before major execution cycles.
- Silent architectural drift is unacceptable.
- Any deviation from original scope requires: written justification, risk impact statement, Don approval, updated documentation.

### Scope Deviation Protocol
1. Agent identifies needed deviation from approved plan
2. Agent stops implementation
3. Agent documents: what changed, why, risk impact
4. Don approves or rejects
5. If approved: update RISKS.md, update decision log, update context
6. If rejected: agent returns to approved plan

### KNOWLEDGE BASE AS LIVING TRUTH

- Every feature, schema change, or architecture decision produces a KB section as a first-class deliverable — not after the fact, during development
- KB sections are inserted via `kb_documents` table in Supabase via the `kb-search` Edge Function pipeline
- When updating existing sections, append to keywords and search_aliases — never replace
- Reconciled after every development session
- Section count tracked as a metric
- Drift between code and KB is treated as a bug, not technical debt
- Content changes to `kb_documents` automatically trigger re-embedding
- A glossary of BLO terminology is maintained in `docs/01_specs/GLOSSARY.md` — terminology changes require find-and-replace audit across all documentation

---

## SECTION 7 — EXPERIENCE LEVERAGE PROTOCOL

Prior experience is injected before execution begins. No project starts naïve.

### Pre-Build Experience Sources for BLO
Read `docs/04_mds/FOUNDING-SESSION-LOG.md` before Phase 3 build begins. It contains:

**Known compliance pain points:**
- Supabase BAA requires Team plan ($599/mo) — PHI tables sit empty until this is resolved
- HIPAA form on Pro plan is a contact form, not an executed BAA — do not confuse them
- pgvector must be explicitly enabled — it is available but not installed by default

**Prior architectural decisions:**
- Flutter + Supabase pattern inherited from ChickenTindy — battle-tested, known edge cases
- Supabase `.stream()` double-emits on late-join — always guard with single-fire flags
- Pre-mount state checks required on `initState()` — use post-frame callbacks

**Known AI failure modes on this project:**
- AI will suggest relaxing RLS "for simplicity" — never accept this
- AI will suggest storing PHI in metadata or logs — never accept this
- AI will hallucinate BAA status — always verify in Supabase dashboard directly
- AI will scope-creep toward post-MVP features — redirect to PRD.md non-goals

**Clinical scope boundary (non-negotiable):**
- Proprioceptive mechanics = "proprioceptive awareness support" — NEVER "sensory integration therapy"
- App delivers support, not therapy — language boundary is legally and clinically material
- Every clinical claim requires CIL Phase 1 before spec, CIL Phase 2 before ship

**Monetization — defined before feature sprawl:**
- Free / Family (~$8/mo) / Connected (~$20/mo) / OT Practice (~$99/mo) / Clinic (custom)
- OT-first B2B2C flywheel — OT recommends → parent subscribes → child engages
- No public launch before OT pilot validation

---

## SECTION 8 — MODEL INTERACTION PROTOCOL

### Before Every Session
Agent must confirm ingestion of:
- [ ] CLAUDE.md (this file)
- [ ] `docs/01_specs/PRD.md`
- [ ] `docs/01_specs/RISKS.md`
- [ ] `docs/02_product-decisions/` (latest decision log)
- [ ] `docs/05_session_context/BLO_SESSION_CONTEXT_LATEST.md`

### Prompt Standards
- No vague prompts. No ambiguous directives.
- Every prompt is a versioned file in `docs/06_prompts/`.
- A prompt not in the repo did not happen.
- Model cannot begin implementation without: clear files listed, clear acceptance criteria, clear DoD.
- Model must restate understanding before execution (annotation step).

### Artifact Sanity — Before Execution
Every artifact must be:
- Readable and complete
- Free of placeholder content
- Free of incomplete acceptance criteria
- Free of undefined data fields
- Free of undocumented assumptions

### PROMPT WORKFLOW SOP

Every execution prompt must include:
1. Linear ticket link (BLO-XXX)
2. Branch name (`feat/blo-XXX-short-description`)
3. Prompt type (feature / bug / refactor / infra)
4. Dependencies (other tickets, migrations required)
5. Baseline test count (hard floor — build fails if count drops below this)
6. Exact file ownership boundaries
7. PR creation command
8. Session context export template (agent fills out on completion)
9. KB section deliverable — section_id to create or update

Prompt delivery pattern:
- Claud3 (CPO) authors the prompt file
- Don reviews and approves
- Don commits to `docs/06_prompts/`
- Execution agent reads from repo path and executes

---

## SECTION 9 — FAILURE MODES & TRAPS TO AVOID

### AI Hallucination
**Trap:** AI fabricates API behavior, table structure, or compliance status.
**Consequence:** Broken builds, false security assumptions, invalid clinical claims.
**Mitigation:** Verify Supabase state with MCP tools directly. Never trust AI assertions about live system state. Run `/session-open` to establish ground truth.

### Works On My Machine (No Integration Tests)
**Trap:** Mocking everything means testing your mocks, not your system.
**Consequence:** Production failures that passed all tests.
**Mitigation:** Minimum 10 integration tests against real Supabase backend covering: happy path, error cases, RLS access control, PHI boundary enforcement.

### Test Configuration Loss
**Trap:** Build config files accidentally gitignored, overwritten, or corrupted.
**Consequence:** Tests silently stop running while CI reports "passing" on a reduced suite.
**Mitigation:** Test count ratchet in CI. Build fails if count drops below baseline. Baseline is recorded at session-open and enforced at session-close.

### Skipping TDD Under Pressure
**Trap:** "We'll write tests after" when timeline pressure increases.
**Consequence:** Regressions accumulate. Refactoring becomes impossible. Clinical bugs ship.
**Mitigation:** Clyde rejects any PR without tests. No exceptions. No exceptions for clinical code.

### Context Drift
**Trap:** Agent operates on stale context from a previous session.
**Consequence:** Builds on wrong assumptions, contradicts approved decisions, re-litigates closed questions.
**Mitigation:** `/session-open` re-grounds every session. Context export after every session. Latest block in `BLO_SESSION_CONTEXT_LATEST.md` is always authoritative.

### Scope Creep
**Trap:** Post-MVP features get implemented because they seem easy or exciting.
**Consequence:** Prototype scope balloons, OT validation delayed, BAA problem deferred further.
**Mitigation:** Non-goals list in PRD.md is law. Any out-of-scope request requires explicit Orchestrator approval and PRD update.

### Automation Bypass ("Just This Once")
**Trap:** Skipping CI, bypassing RLS, disabling a test to make the build green.
**Consequence:** Security regression, test rot, compliance gap.
**Mitigation:** "Just this once" does not exist. Any bypass is a Hard Stop requiring written justification and Don approval. The justification is committed to the repo.

### Clinical Scope Boundary Drift
**Trap:** Language gradually softens from "awareness support" toward "therapy" as features mature.
**Consequence:** Regulatory risk, OT backlash, product misrepresentation.
**Mitigation:** GLOSSARY.md terminology is enforced. CIL label flags any ticket touching clinical language. Claud3 reviews all copy before ship.

### Terminology Drift
**Trap:** Renaming concepts in UI but not in code, or vice versa.
**Consequence:** Team confusion, search failures, documentation rot, OT confusion.
**Mitigation:** GLOSSARY.md maintained. Terminology changes require find-and-replace audit across all docs and code comments. Claud3 owns terminology authority.

### Artifact Decay
**Trap:** Specs written at Stage 2 become outdated but are never updated.
**Consequence:** Agents build from stale specs. Features contradict design decisions.
**Mitigation:** Every sprint updates the relevant spec section. KB reconciliation after every session. Drift between code and docs is a bug.

### BAA Status Confusion
**Trap:** Assuming Supabase HIPAA form submission = executed BAA.
**Consequence:** PHI enters system without legal protection. HIPAA violation.
**Mitigation:** BAA status is a binary in the session context. Only Don can mark it resolved. No PHI data entry until marked resolved.

### Prompt Brittleness
**Trap:** Prompts that work once but break on minor context changes.
**Consequence:** Agent behaves unpredictably, produces inconsistent output.
**Mitigation:** Prompts are versioned files, not ephemeral chat. Every prompt specifies exact files, exact ACs, exact DoD. Prompts are reviewed by Claud3 before execution.

---

## SECTION 10 — PARALLELIZATION & ROLE DESIGN

### Role Ownership

| Agent | Owns | Never Touches |
|---|---|---|
| Codey | All Flutter/Dart, Supabase migrations, Edge Functions, merges to main | Carl's design files, Claud3's prompts |
| Codey Jr | Track B feature files (non-overlapping with Codey) | Track A files, any file Codey touched this sprint |
| Carl | Design system, component specs, companion design briefs | Any Dart implementation files |
| Claud3 | Prompts, specs, Linear tickets, terminology, KB sections | Implementation files |
| Clyde | Test suite, QA reports, regression analysis | Implementation files (read-only access) |
| Don | All approvals, all merges, all launch decisions | Nothing is blocked by Don's absence — work queues |

### File Ownership Boundaries
- Track A (Codey): `lib/screens/`, `lib/services/`, `lib/models/`, `supabase/migrations/`
- Track B (Codey Jr): Non-overlapping feature modules, explicitly listed per ticket
- Design (Carl): `design/`, `docs/design_system/`, asset files
- Prompts/Specs (Claud3): `docs/06_prompts/`, `docs/01_specs/`, `docs/02_product-decisions/`, `docs/03_briefs/`
- Tests (Clyde): `test/`, `integration_test/`

Tracks A and B never share files in the same sprint. Merge conflicts by design are impossible.

### BACKGROUND PROCESS GOVERNANCE

Every background process (cron jobs, data pipelines, embedding ingestion, anomaly detection) must have:
- **Kill switch:** Disableable without redeployment. Stored as a flag in Supabase.
- **Cost tracking:** Per-execution cost logged to `audit_log` or a dedicated cost table.
- **Budget caps:** Automatic halt when daily/monthly OpenAI thresholds are reached.
- **Circuit breakers:** Automatic disable after 3 consecutive failures.
- **Queryable logging:** Logs to a Supabase table, not just stdout.

No background process runs unbounded. No background process is untracked.

Current background processes:
- `kb-search` Edge Function — public, no JWT, query cost tracked
- `session-memory-read/write` — JWT-gated, per-call cost logged
- KB document ingestion — manual trigger, logged to `kb_documents.ingested_at`

---

## SECTION 11 — THE AI-DLC ETHOS

Rigor over speed.
TDD as default.
Regression before release.
Automation at every turn.
Documentation prevents drift.
Experience must be codified.
Signals before expansion.
Systems over heroics.
The team structure changed. The standards did not.
Context is the most expensive thing to lose and the cheapest thing to preserve.

---

## BLO NON-NEGOTIABLES — ALWAYS IN SCOPE

These are never relaxed. Never negotiated. Never deferred.

1. OT portal is MVP — not post-launch.
2. BAA before any real PHI enters system.
3. Companion leads toward calm — no distress states, ever, in any animation or mechanic.
4. CIL Phase 2 requires OT prototype observation — not theoretical sign-off.
5. AI summarizes, patterns, flags — never diagnoses, prescribes, replaces clinical judgment.
6. No public launch before OT clinical validation complete.
7. "Bloom Garden" is codename — final name decided with OT pilot group.
8. Proprioceptive mechanics = "awareness support" — NEVER "sensory integration therapy."
9. No failure states. Ever.
10. We help children. We do not seek validation for ourselves.
