# Clinical Integrity Layer (CIL)
**Status:** Constitutional — requires Orchestrator approval to modify
**Date Established:** 2026-03-22
**Authority:** Don (Orchestrator) + OT Advisor Panel (post-prototype)

---

## Purpose
The CIL is a formal governance protocol that ensures every clinical or therapeutic claim in Bloom Garden is evidence-based, scope-appropriate, and harm-assessed before it enters development. It exists because AI agents are systematically biased toward validation. In a clinical tool for vulnerable children, unchecked validation is a harm risk.

---

## The Core Problem This Solves
Three failure modes this layer protects against:

**1. Plausible-sounding but unvalidated clinical claims**
"This mechanic supports proprioceptive regulation" sounds credible. Whether there is peer-reviewed evidence for this specific interaction, with this population, at this age range, is a harder question. Agents will not ask it unless required to.

**2. Founder vision drift into therapeutic territory**
The line between "supports regulation" and "provides therapy" is legal and clinical. Without a hard check, features can quietly cross that line.

**3. Assumption stacking**
Each individually reasonable assumption builds on the last until the foundation is unexamined. The CIL requires each layer of assumption to be explicitly validated.

---

## Two-Phase Validation Protocol

### Phase 1 — Research Gate (Pre-Development)
Required before any clinical mechanic enters spec or development.
Claude performs this research. OT sign-off is NOT required at this stage.

**Three mandatory checks:**

**Check 1 — Evidence Base**
> Is there peer-reviewed research supporting this mechanism with autistic children specifically, or are we extrapolating from adjacent populations?

Adjacent populations (neurotypical children, autistic adults, non-autistic children with sensory processing differences) are sometimes acceptable — but must be explicitly named as extrapolation, not stated as fact.

**Check 2 — Scope Boundary**
> Does this feature support regulation or does it provide therapy?

- Regulation support = within scope, may proceed with research validation
- Provides therapy = requires licensed OT co-design and explicit product disclaimers, cannot be driven by product alone

**Check 3 — Harm Vector**
> Is there a plausible way this feature could worsen outcomes for a subset of this population?

Not "could this be misused" but specifically — is there a child profile, dysregulation pattern, or sensory profile where this feature makes things worse? If yes, what is the mitigation?

---

### Phase 2 — Clinical Gate (Post-Prototype)
Required before any clinically validated claim can be marked approved.
OT advisor observes the mechanic with real children before sign-off.

This produces observation-based clinical validation, not theoretical approval. OTs evaluate what they are trained to evaluate — child behavior in context, not written descriptions of interaction design.

**This phase cannot be bypassed by:**
- Time pressure
- Confidence in the research base
- Orchestrator instinct
- Agent recommendation

---

## The CIL Ticket Block
Every Linear ticket that touches a child-facing feature with a clinical or therapeutic claim must include this block. Tickets with a CIL label cannot move to In Progress without Phase 1 complete.

```
## Clinical Integrity Check
**Claim:** [Therapeutic benefit being claimed]
**Evidence:** [Citations — peer reviewed preferred / or "Extrapolated from: X"]
**Scope:** [Regulation support / Requires clinical partnership]
**Harm Vector:** [Known risks for subset populations + mitigation]
**Pre-Prototype Status:** [Research validated / Extrapolated / Flagged for investigation]
**OT Sign-off:** [Pending prototype / Approved by: Name, Date]
```

---

## Agent Instructions
All agents on the Bloom Garden project — Codey, Codey Jr, Carl, Claud3, Clyde — operate under the following standing instruction:

> Bloom Garden is a clinical support tool for autistic children. When building features, never assume clinical validity. If you are implementing a feature with a therapeutic claim and cannot find a completed CIL Phase 1 block in the ticket, stop and flag it to the Orchestrator before proceeding. Do not self-approve CIL items.

---

## Claude's Role in CIL
In product definition and spec sessions, Claude operates under the following protocol when a clinical or therapeutic claim is made:

1. Build on genuine product strengths honestly
2. Explicitly name any clinical assumption embedded in the proposal
3. Research the evidence base before affirming the clinical claim
4. State clearly if something is unvalidated, extrapolated, or potentially contraindicated
5. Distinguish between "this feels right" and "this is supported by evidence"

Claude will not affirm a clinical mechanism because the product logic is elegant. Claude will not let plausible-sounding OT terminology substitute for actual evidence.

---

## Clinical Evidence Brief
For every major mechanic entering the product, Claude produces a Clinical Evidence Brief before the mechanic enters spec. Filed in `/05-research-briefs/`.

**Brief template:**
```markdown
# Clinical Evidence Brief — [Mechanic Name]
**Date:**
**Status:** Draft / OT Reviewed / Approved

## Claimed Mechanism
[What therapeutic benefit is being claimed]

## Supporting Evidence
[Peer-reviewed citations with population specifics]

## Complicating or Contradicting Evidence
[Studies that complicate or challenge the claim]

## Extrapolations Being Made
[What is being inferred from adjacent populations and confidence level]

## Known Contraindications
[Subset populations for whom this may be harmful]

## OT Validation Questions
[Specific questions for pilot OT group to address]

## CIL Status
Phase 1: [Complete / Pending]
Phase 2: [Pending prototype / Approved by: Name, Date]
```

---

## What the CIL Does Not Do
- It does not prevent innovation or experimentation
- It does not require every feature to have published RCT evidence
- It does not give OT advisors veto power over product decisions outside clinical mechanics
- It does not replace the Orchestrator's judgment on vision and scope

It requires that clinical claims be honest about their evidence base. That is all. And that is non-negotiable.

---

*The CIL exists because we help children, not because we seek validation for ourselves.*
