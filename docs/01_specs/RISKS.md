# Risks, Assumptions & Open Questions
**Project:** Bloom Garden (Codename)
**Version:** 1.0
**Date:** 2026-03-22
**Owner:** Don (Orchestrator)

---

## Risk Registry

### 🔴 High Priority — Blocking or Near-Blocking

| ID | Risk | Type | Impact | Owner | Status | Mitigation |
|---|---|---|---|---|---|---|
| RISK-001 | "Bloom Garden" name occupied in App Store by casual game (PIXON PTE. LTD.) | Naming / Legal | High | Don | Open | Codename only until pilot. Final name decision deferred to OT pilot conversations. Trademark review required before App Store submission. |
| RISK-002 | Supabase BAA not yet signed | Compliance | High | Don | Open | No PHI to enter Supabase until BAA is executed. Prototype phase uses local state only. |
| RISK-003 | OT pilot group not yet recruited | Dependency | High | Don | Open | CIL Phase 2 cannot complete without OT observation. Pilot recruitment is a Phase 2 dependency — must begin before prototype is complete. |
| RISK-004 | Clinical validation gap — app-delivered proprioceptive mechanics are not equivalent to clinical SI therapy | Clinical | High | CIL | Documented | CEB-004 documents this explicitly. Language constraint in place: product must say "proprioceptive awareness support" not "sensory integration therapy." OT sign-off required post-prototype. |

---

### 🟡 Medium Priority — Monitor and Manage

| ID | Risk | Type | Impact | Owner | Status | Mitigation |
|---|---|---|---|---|---|---|
| RISK-005 | Interoceptive differences in autism may reduce effectiveness of breathing mechanics for some children | Clinical | Medium | CIL | Documented | CEB-003 documents this. Design mitigation: visual companion-led breathing, not interoception-dependent. OT can configure companion behavior away from breathing for affected profiles. |
| RISK-006 | Companion attachment — loss of device/data could be distressing for some autistic children | Product | Medium | Codey | Open | Companion identity is sacred data. Full cloud backup required. Recovery flow must be seamless and prioritized in architecture. |
| RISK-007 | Exercise library requires OT co-authorship — cannot be product-team authored alone | Dependency | Medium | Don + OT Pilot | Open | 50–75 exercises at launch. Launch set built with pilot OTs. Quality gate: every exercise clears CIL Phase 1 before entering library. |
| RISK-008 | Flutter animation performance on low-end Android devices | Technical | Medium | Codey | Open | Companion animations at 0.3x speed may perform differently on low-spec devices. Performance testing on minimum-spec Android required in Phase 2. |
| RISK-009 | Parent over-reliance on app insights replacing clinical relationship | Clinical / Ethical | Medium | Design | Open | All AI-generated summaries carry mandatory disclosure. Parent dashboard does not use clinical language. OT is always the clinical authority — product must not position itself as a replacement. |
| RISK-010 | Sensory profile variability — touch-heavy mini-game mechanics may be aversive for tactile-defensive children | Clinical | Medium | CIL | Documented | OT portal must allow touch-intensity mechanic configuration per child. Sensory profile configuration is a Phase 3 requirement, not a post-MVP enhancement. |

---

### 🟢 Low Priority — Acknowledge and Monitor

| ID | Risk | Type | Impact | Owner | Status | Mitigation |
|---|---|---|---|---|---|---|
| RISK-011 | Sesame Workshop could update Breathe Think Do with a major content expansion | Competitive | Low | Don | Monitor | Bloom Garden's moat is OT portal + HIPAA data layer + clinical exercise library — not the child-facing mechanic alone. |
| RISK-012 | Symbolic play limitations in autism may reduce projective play mechanic effectiveness for some children | Clinical | Low | CIL | Documented | CEB-002 documents this. Design mitigation: companion is object-relationship based, not purely symbolic. OT assesses projective play capacity at intake. |
| RISK-013 | IRB protocol not established for pilot | Compliance | Low | Don | Open | If pilot outcome data will be used for publication or grant applications, IRB-approved protocols should be established before pilot launch. Recommended but not blocking. |
| RISK-014 | Their mother's availability as primary clinical advisor | Personal Dependency | Low | Don | Monitor | No mitigation required — acknowledge the dependency and maintain communication. |

---

## Assumptions

| ID | Assumption | Confidence | If Wrong |
|---|---|---|---|
| ASS-001 | Flutter provides sufficient animation quality for companion expressiveness | High | Would require investigation of alternative rendering approaches; architecturally costly |
| ASS-002 | Supabase pgvector is sufficient for the RAG+ session memory and future AI recommendation layer | High | Alternative vector infrastructure would need evaluation |
| ASS-003 | OTs will engage with a web-based portal rather than requiring a native mobile OT app | Medium | A native OT mobile app could become a Phase 5 requirement |
| ASS-004 | Children aged 4–12 can engage meaningfully with touch-based companion interaction without reading | High | Non-verbal-first design is specifically architected for this assumption |
| ASS-005 | 50–75 exercises is a sufficient exercise library for MVP pilot | Medium | Pilot OT feedback will validate or challenge this assumption |
| ASS-006 | Parents will check the dashboard weekly without requiring push notifications | Medium | Notification strategy may need to evolve based on pilot usage patterns |

---

## Open Questions

| ID | Question | Priority | Owner | Target Resolution |
|---|---|---|---|---|
| OQ-001 | What is the final product name? | High | Don + OT Pilot | Phase 4 (pilot engagement) |
| OQ-002 | What is the exact Supabase subscription tier required for BAA? | High | Don | Before Phase 3 (MVP build) |
| OQ-003 | Should the exercise library entries be publicly searchable on the KB, or OT-authenticated only? | Medium | Don | Phase 3 |
| OQ-004 | What is the App Store category — Health & Fitness, Education, or Medical? | Medium | Don | Phase 4 |
| OQ-005 | Will the product seek HIPAA Business Associate status or operate as a covered entity? | High | Don + Legal | Before Phase 3 |
| OQ-006 | What license number verification will be required for OT account creation? | Medium | Don + OT Pilot | Phase 3 |
| OQ-007 | Should the OT portal be web-only or also have a native mobile experience? | Low | Don | Phase 3 (assumption: web-only for MVP) |
| OQ-008 | What is the pricing for the Connected tier (child + one OT linked)? | Medium | Don | Phase 4 (pre-launch) |
