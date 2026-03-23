# Acceptance Criteria Framework
**Project:** Bloom Garden (Codename)
**Version:** 1.0
**Date:** 2026-03-22

---

## Global Definition of Done

Every feature must satisfy ALL of the following before it can be marked complete and merged to main:

### Clinical Gate
- [ ] CIL Phase 1 (research validation) complete for any feature making a therapeutic claim
- [ ] CIL ticket block present and filled in the Linear ticket
- [ ] No clinical language that overstates the evidence base

### Code Quality
- [ ] Flutter analyzer passes with 0 errors
- [ ] Test count is equal to or greater than at session start (one-way ratchet)
- [ ] No hardcoded credentials, keys, or PHI in any file
- [ ] Code reviewed by at least one other agent before merge

### Compliance
- [ ] PHI fields use encrypted columns
- [ ] RLS policy verified for any new Supabase table containing PHI
- [ ] COPPA parental gate respected — no child action bypasses parental consent
- [ ] No third-party analytics SDK receives PHI

### Accessibility
- [ ] VoiceOver / TalkBack labels on all interactive elements
- [ ] Reduced motion mode respected — animations suppressed when enabled
- [ ] Dynamic text sizing does not break layout
- [ ] Minimum touch target size: 44x44pt (iOS) / 48x48dp (Android)
- [ ] No auto-playing audio without explicit user action

### Design
- [ ] Sensory safety review: no sudden sounds, no high-contrast flash, no fast animations in default mode
- [ ] Child-facing copy is text-free or passes plain-language review
- [ ] No failure states introduced for the child
- [ ] Companion expressions reviewed — warmth and contentment only, no distress states

### Behavioral Signal Layer
- [ ] Any new child interaction that captures behavioral data is logged to the correct PHI-compliant table
- [ ] No behavioral signal is surfaced to the child in any form
- [ ] Signal data is correctly attributed to the child profile, not the device

---

## Feature-Level AC Format

All feature specs use this format for acceptance criteria:

```
**AC-[FEAT-NNN]-[N]:** [Given / When / Then format]

Given [precondition]
When [action]
Then [expected outcome]
And [additional assertion if needed]
```

---

## Performance Baselines

These are measurable targets that all child-facing features must meet:

| Metric | Target |
|---|---|
| Cold start to interactive (app launch) | < 3 seconds |
| Companion animation frame rate | 60fps on iPhone 12 / Pixel 6 minimum spec |
| Mini-game interaction latency | < 100ms touch-to-visual-response |
| Offline mode activation | Seamless — child never sees an error state |
| Data sync on reconnect | Background, non-blocking, silent |

---

## Pilot Acceptance Gate

Before any feature is presented to OT pilot group, it must additionally satisfy:

- [ ] CIL Phase 2 observation session scheduled with at least one pilot OT
- [ ] Parent visibility confirmed on all OT-to-child communications
- [ ] Child data accessible only to linked parent and linked OT
- [ ] Adverse event reporting mechanism in place
- [ ] Pilot feedback capture mechanism active (Slack channel + structured session template)
