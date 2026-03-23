# BLO-3 — Linear Project Structure
# Execution Prompt v1.0
# Authored by: Claud3 (CPO)
# Status: PENDING Don approval before execution

---

## Prompt Metadata

| Field | Value |
|---|---|
| Ticket | [BLO-3](https://linear.app/chickentindy/issue/BLO-3/linear-project-structure-milestones-labels-risk-tickets-workflow) |
| Branch | N/A — no code changes |
| Type | Project ops — Linear configuration |
| Agent | Claud3 (with Don approval at each step) |
| Dependencies | None |
| Baseline test count | N/A |
| Prompt version | 1.0 |
| Authored | 2026-03-23 |

---

## Context

The BLO Linear space has 4 tickets (BLO-1 through BLO-4) and basic labels.
It has no milestones, no workflow automation, no risk tracking tickets, and an incomplete surface label taxonomy.
This ticket completes the operating structure before Phase 3 sprint work begins.

No code is written. No files are modified. All output is Linear configuration.

---

## Objective

Complete the BLO Linear space with:
1. Five phase milestones
2. Full BLO surface label taxonomy (8 remaining labels)
3. Four risk tracking tickets
4. Workflow automation (PR merge → ticket state transition)

---

## Step-by-Step Work

### Step 1 — Create Phase Milestones
Create these milestones in Linear BLO team:

| Milestone | Status |
|---|---|
| Phase 1 — Foundation | Complete |
| Phase 2 — Prototype | Active (current) |
| Phase 3 — MVP Build | Upcoming |
| Phase 4 — Pilot | Upcoming |
| Phase 5 — Public Launch | Upcoming |

### Step 2 — Create Remaining Surface Labels
These labels are confirmed missing. Create all 8:

| Label | Color | Description |
|---|---|---|
| Surface: Child UI | #6B7280 | Child-facing garden, companion, mini-game screens |
| Surface: Parent Dashboard | #6B7280 | Parent insight, emotional timeline, anomaly alerts |
| Surface: OT Portal | #6B7280 | Garden Keepers portal, seed packets, garden mail, session prep |
| Surface: Auth | #6B7280 | Authentication, COPPA consent, account management |
| Surface: Data Layer | #6B7280 | Supabase tables, RLS policies, migrations, Edge Functions |
| Surface: Exercise Library | #6B7280 | Clinical exercise catalog, CIL Phase 1 validation, outcome tracking |
| Surface: Notifications | #6B7280 | Calm mode trigger, garden mail delivery, anomaly alert delivery |
| Surface: Infra | #6B7280 | CI/CD, deployment, environment config, Netlify |

### Step 3 — Create Risk Tracking Tickets

**RISK-001 — Name Trademark Review**
- Title: `RISK-001 — Name "Bloom Garden" conflicts with existing App Store app`
- Priority: High
- Label: Launch Blocker
- Description: The name "Bloom Garden" is occupied in the App Store by PIXON PTE. LTD. casual puzzle game. Trademark review required before any App Store submission. "Bloom Garden" is codename only until this is resolved. Final name decided with OT pilot group.
- DoD: Legal review complete, name decision documented in `docs/02_product-decisions/`

**RISK-002 — Supabase BAA Execution**
- Title: `RISK-002 — Supabase BAA not signed — PHI tables cannot receive real data`
- Priority: Urgent
- Label: Launch Blocker, Surface: Data Layer
- Description: Supabase BAA requires Team plan ($599/mo). Currently on Pro. No real PHI may enter system until BAA is executed. PHI tables exist with RLS but are empty. Prototype runs on local state — this is acceptable for Phase 2. Must be resolved before Phase 3 pilot families onboard.
- DoD: Supabase Team plan active, BAA executed, confirmed in session context

**RISK-003 — OT Pilot Recruitment**
- Title: `RISK-003 — OT pilot group not yet recruited`
- Priority: High
- Label: Surface: Clinical & OT, CIL
- Description: 1–2 OTs required to validate prototype before any feature is built. Recruitment begins during Phase 2 after BLO-4 documents are approved. Target: pediatric OT with autism caseload. Primary source: family's existing OT relationships.
- DoD: Minimum 1 OT confirmed for prototype observation, CIL Phase 2 protocol agreed

**OQ-005 — HIPAA BA Status Legal Review**
- Title: `OQ-005 — HIPAA Business Associate vs Covered Entity status — legal review required`
- Priority: High
- Label: Surface: Docs & Compliance, Launch Blocker
- Description: Open question from AUDIT.md. Must determine whether Bloom Garden operates as a Business Associate or Covered Entity under HIPAA before Phase 3. Affects BAA structure, breach notification obligations, and compliance documentation requirements.
- DoD: Legal review complete, determination documented, BAA structure confirmed

### Step 4 — Workflow Automation
Configure Linear automation for BLO team:
- When PR is opened → move ticket to "In Review"
- When PR is merged → move ticket to "Done"
- When PR is closed without merge → move ticket back to "In Progress"

---

## Files This Task Will Touch
```
Linear configuration only — no files in the repo
```

## Files This Task Will NOT Touch
```
Everything in the repo — this is Linear-only work
```

---

## Acceptance Criteria

```gherkin
Given the BLO Linear space
When I view milestones
Then I see 5 phases with Phase 1 complete and Phase 2 active

Given a new BLO ticket
When I apply surface labels
Then all 9 surface labels are available (3 existing + 8 new)

Given the risk tickets
When I view BLO issues
Then RISK-001, RISK-002, RISK-003, OQ-005 each exist with correct priority and labels

Given a PR is merged for a BLO ticket
When the merge happens
Then the ticket automatically moves to Done

Given the CIL label
When applied to a ticket
Then it is clearly distinct (moss green) from surface labels (grey)
```

---

## Definition of Done

- [ ] Annotation posted on BLO-3 and approved by Don
- [ ] All 5 milestones created in Linear
- [ ] All 8 remaining surface labels created
- [ ] RISK-001, RISK-002, RISK-003, OQ-005 tickets created with correct priority and labels
- [ ] Workflow automation configured
- [ ] Session context export appended to `BLO_SESSION_CONTEXT_LATEST.md`

---

## Session Context Export Template

```markdown
---
## Session Export — [DATE] — Claud3

**Branch:** N/A
**Commit hash:** N/A

### What Changed
- Linear: 5 milestones created
- Linear: 8 surface labels created
- Linear: 4 risk tickets created (RISK-001, RISK-002, RISK-003, OQ-005)
- Linear: workflow automation configured

### Decisions Made
- [any label naming decisions, milestone date decisions]

### Tickets Worked
- BLO-3 — Linear Project Structure — complete

### Open Blockers
- [anything that needs Don's input]

### Next Session Should Start With
- BLO-4 OT documents — or await Codey BLO-1/BLO-2 completion
---
```
