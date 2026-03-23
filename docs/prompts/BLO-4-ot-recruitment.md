# BLO-4 — OT Recruitment Refinement
# Execution Prompt v1.0
# Authored by: Claud3 (CPO)
# Status: PENDING Don approval before execution

---

## Prompt Metadata

| Field | Value |
|---|---|
| Ticket | [BLO-4](https://linear.app/chickentindy/issue/BLO-4/ot-recruitment-refinement-prototype-scope-cil-phase-2-protocol) |
| Branch | `docs/blo-4-ot-recruitment-docs` |
| Type | Documentation — markdown + .docx |
| Agent | Claud3 (authored with Don) |
| Dependencies | None — can run parallel to BLO-1/BLO-2 |
| Baseline test count | N/A |
| Prompt version | 1.0 |
| Authored | 2026-03-23 |

---

## Context

Before any OT contact is made, three documents must exist, be committed, and be explicitly approved by Don. This prompt produces those three documents. Nothing else.

No OT is contacted until Don gives explicit go-ahead after all three documents are approved. This is a hard gate — it appears twice in the ticket and once in the DoD.

---

## Objective

Produce three documents:

1. `docs/02_product-decisions/PROTOTYPE-SCOPE.md` — Markdown
2. `docs/04_mds/CIL-PHASE2-PROTOCOL.md` — Markdown
3. `docs/02_product-decisions/OT-PARTNER-ASK.docx` — **Word document (.docx)** — professional, print-ready, direct handoff to clinician
4. `docs/02_product-decisions/OT-PARTNER-ASK.md` — Markdown companion for KB ingestion

---

## File Ownership Boundaries

### Files This Task WILL touch
```
docs/02_product-decisions/PROTOTYPE-SCOPE.md      CREATE
docs/04_mds/CIL-PHASE2-PROTOCOL.md               CREATE
docs/02_product-decisions/OT-PARTNER-ASK.docx    CREATE — Word document, two pages max
docs/02_product-decisions/OT-PARTNER-ASK.md      CREATE — KB companion markdown
```

### Files This Task will NOT touch
```
Any existing docs/ files
Any implementation files
Any Supabase files
CLAUDE.md or skill files
docs/session_context/*
docs/prompts/*
```

---

## Document 1 — PROTOTYPE-SCOPE.md

**Purpose:** Defines exactly what Phase 2 builds and what OTs will observe. Serves as Codey's build brief and OT's evaluation framework.

**Required sections:**

### What Is In The Prototype
Exact feature list — no ambiguity:
- One companion: Moss (tortoise)
- One biome: Meadow (morning state only)
- Two mini-games: Rain Painter, Stone Stacker
- One check-in mechanic: Weather Report (four weather icons, no text)
- Companion discovery: simplified onboarding flow leading to Moss
- Local state only — no Supabase backend, no auth, no data persistence
- iOS only (Flutter) — Android parity is Phase 3

### What Is NOT In The Prototype
Explicit exclusions:
- No parent dashboard
- No OT portal
- No backend or data persistence
- No other companions (Pip, Lumi, Cedar, Fern, Slate)
- No Bubble World, Mood Orchestra mini-games
- No Garden Mail, Seed Packets
- No Daily Rhythm (Morning Dew, Tuck-In)
- No authentication or account creation
- No exercise library
- No analytics or behavioral signals

### What OTs Will Observe
Per mechanic — what clinical behavior to watch for:
- **Companion (Moss):** Does the child engage? Does the 0.3× animation speed feel appropriate or too slow? Does Moss's co-regulating state demonstrate breathwork recognizably?
- **Rain Painter:** Does the interaction feel calming or stimulating? Does the child self-direct? Does the "I wonder if..." curiosity hook emerge naturally?
- **Stone Stacker:** Same questions. Does physics feedback feel rewarding without being frustrating?
- **Weather Report:** Is the four-icon check-in understood without verbal instruction? Does the child engage honestly or randomly?
- **Overall:** Any moments of distress? Any failure-state perception? Any design element that contradicts the de-stimulating intent?

### CIL Phase 2 Sign-Off Criteria
For each mechanic, the OT provides a binary determination:
- ✅ **Approved** — mechanic is clinically appropriate as designed
- 🔄 **Revise** — specific revision required before Phase 3 (revision documented)
- ❌ **Remove** — mechanic is contraindicated for this population (rationale required)

All four mechanics must reach Approved status before Phase 3 begins.

---

## Document 2 — CIL-PHASE2-PROTOCOL.md

**Purpose:** Governs the OT observation session. Must be specific enough that any licensed pediatric OT with autism caseload can follow it without additional briefing.

**Required sections:**

### What We Are Asking
- One observation session with one child (from their existing caseload)
- Child profile: autistic, ages 4–12, able to engage with a touchscreen independently
- Session duration: 45–60 minutes (child-led — not timed)
- OT role: observe and note, do not direct child's interaction
- Setting: wherever the child is most regulated (home, clinic — OT's call)

### Before The Session
- OT reads MISSION.md and CIL document (provided)
- OT reads the four CEB briefs relevant to prototype mechanics (provided)
- OT and Don align on the evaluation criteria in this document
- Child's parent consents to the observation

### During The Session
- Child uses the prototype freely — no instructions, no prompts
- OT observes using the observation framework below
- OT takes brief notes (paper fine — structured form provided)
- Session ends when child disengages (no prompting to continue)

### Observation Framework
For each mechanic (companion, Rain Painter, Stone Stacker, Weather Report), OT notes:
- Did the child engage? (Yes / No / Brief)
- Engagement quality: self-directed, curious, regulated, dysregulated
- Any distress indicators: none / mild / significant
- Any confusion indicators: none / mild / significant
- Regulation mechanic recognizable: Yes / No / Unclear
- OT clinical impression: Approved / Revise / Remove
- If Revise/Remove: specific rationale

### After The Session
- OT completes the observation form
- Don and OT debrief (30 minutes, scheduled same day or next day)
- OT submits signed observation notes
- Don documents CIL Phase 2 outcome in `docs/04_mds/CIL-PHASE2-PROTOCOL.md`
- Linear RISK-003 updated with outcome

### What Constitutes Sign-Off
All four mechanics rated Approved by the OT.
If any mechanic is Revise: revision is documented, implemented, and a second observation scheduled.
If any mechanic is Remove: Claud3 escalates to Don for PRD revision before any Phase 3 work.

### What We Will NOT Ask the OT To Do
- Endorse the product publicly
- Provide a testimonial
- Approve without observing
- Sign off on mechanics not covered in the session
- Make clinical decisions for families outside their existing caseload

---

## Document 3 — OT-PARTNER-ASK.docx + OT-PARTNER-ASK.md

**Purpose:** The document handed directly to a prospective OT partner. Must be readable by a clinician who has never heard of Bloom Garden. Tone: peer collaboration, not pitch. Length: two pages maximum.

**Format:** Word document (`.docx`) — professionally formatted, print-ready, BLO design aesthetic (moss green accents, clean typography). A companion `.md` file is also produced for KB ingestion — same content, no formatting.

**Required sections:**

### What We Are Building
Three sentences maximum. Lead with the governing principle, not the features.

### Why We Are Coming To You First
Explain the CIL. Explain that we refuse to build for children without clinical validation. Explain that founding OT partners are the reason the product will be clinically credible — not an afterthought.

### What We Are Asking
Be specific and honest about the time commitment:
- Read four clinical evidence briefs before the observation (~30 minutes)
- One observation session with one child from your existing caseload (~60 minutes)
- One debrief conversation with Don (~30 minutes)
- If you choose to continue: bi-weekly feedback during pilot (optional)
- If you choose to continue: co-authorship of the exercise library (optional, credited)

Total minimum ask: ~2 hours.

### What You Receive
- Permanent free access to Bloom Garden for your practice (all tiers)
- Named clinical credit in the product and KB documentation
- Co-authorship credit on any published exercise library materials
- First visibility into the product before any public launch
- The ability to shape the tool your patients will use

### What We Will NOT Ask
- No endorsement or public promotion
- No validation of claims we have not earned
- No time beyond what is described above (unless you choose to continue)
- No compromise of your clinical judgment

### The Clinical Evidence Basis
Link to all four CEB briefs in the KB. One sentence summary per brief. This section demonstrates we have done the homework before asking for their time.

### Next Step
One sentence: "If this resonates, the next step is a 20-minute conversation with Don."
Don's contact information.

---

## Acceptance Criteria

```gherkin
Given PROTOTYPE-SCOPE.md
When Codey reads it
Then he has an unambiguous list of what to build with no interpretation required

Given CIL-PHASE2-PROTOCOL.md
When an OT reads it
Then they understand the ask, the time commitment, and what sign-off means

Given OT-PARTNER-ASK.md
When Don reviews it
Then it is ready to hand to a prospective OT without modification

Given all three documents
When committed and approved
Then no outreach occurs until Don gives explicit go-ahead
```

---

## Definition of Done

- [ ] Annotation posted on BLO-4 and approved by Don
- [ ] `PROTOTYPE-SCOPE.md` drafted, reviewed with Don, committed
- [ ] `CIL-PHASE2-PROTOCOL.md` drafted, reviewed with Don, committed
- [ ] `OT-PARTNER-ASK.md` drafted, reviewed with Don, committed
- [ ] All three documents Don-approved (noted in session context)
- [ ] **No OT contacted until Don gives explicit go-ahead**
- [ ] PR opened with `BLO-4` in title
- [ ] `/session-close` run — context exported

---

## Session Context Export Template

```markdown
---
## Session Export — [DATE] — Claud3

**Branch:** docs/blo-4-ot-recruitment-docs
**Commit hash:** [hash]

### What Changed
- docs/02_product-decisions/PROTOTYPE-SCOPE.md — CREATED
- docs/04_mds/CIL-PHASE2-PROTOCOL.md — CREATED
- docs/02_product-decisions/OT-PARTNER-ASK.md — CREATED

### Decisions Made
- [any scope decisions, protocol decisions, tone decisions]
- Don approval status: [approved / pending revision on X]

### Tickets Worked
- BLO-4 — OT Recruitment Refinement — [status]

### Open Blockers
- [OT outreach gate: waiting for Don go-ahead]

### Next Session Should Start With
- OT outreach — after Don confirms go-ahead
---
```
