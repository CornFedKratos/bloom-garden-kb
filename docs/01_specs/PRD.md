# Product Requirements Document
**Project:** Bloom Garden (Codename)
**Version:** 1.0 — MVP
**Date:** 2026-03-22
**Owner:** Don (Orchestrator)
**Status:** Draft — Pending Engineering Handoff

---

## 1. Problem Statement

Autistic children require consistent, calibrated emotional regulation support — but the current care model breaks down between clinical sessions. OT sessions occur weekly or bi-weekly at best. The average family waits 6–12 months for a pediatric OT appointment. Between sessions, parents lack clinical guidance, children lack regulation tools appropriate for their sensory and developmental profile, and OTs lack visibility into how their patients are functioning at home.

Existing apps in this space fall into two failure modes:

**Too clinical, not engaging** — Functional tools like Choiceworks that OTs recommend but children don't want to use independently.

**Engaging, not clinical** — Wellness apps like Finch built for neurotypical teenagers, using obligation mechanics (streaks, pet hunger, daily tasks) that are actively contraindicated for the autistic pediatric population.

No tool currently connects the child, the parent, and the OT in a continuous care system. That gap is what Bloom Garden fills.

---

## 2. Product Vision

Bloom Garden is a HIPAA-compliant pediatric emotional regulation platform that supports autistic children through joyful, non-coercive play — connecting them with their parents and occupational therapists as a continuous care system between clinical sessions.

The child tends a magical garden that reflects their emotional world. A chosen companion creature models calm and invites co-regulation. Mini-games provide passive behavioral signal capture without the child knowing they are being observed clinically. The OT prescribes exercises from a validated library. The parent sees patterns. Everyone is connected.

**The governing principle:** We help children. We do not seek validation for ourselves.

---

## 3. Goals

### Primary Goals — MVP
- Deliver a child-facing regulation experience that autistic children aged 4–12 return to daily without prompting
- Provide OTs with a clinical tool to extend their care between sessions through exercise prescription and behavioral observation
- Give parents meaningful, plain-language insight into their child's regulation patterns over time
- Establish HIPAA-compliant PHI infrastructure that supports all future features without architectural rework

### Secondary Goals — MVP
- Build and validate a clinically credible exercise library of 50–75 evidence-based regulation exercises with pilot OT input
- Establish the OT pilot program with 3–5 licensed pediatric OTs and 6–15 families
- Validate core therapeutic mechanics (companion co-regulation, projective play, breathing, proprioceptive awareness) through OT observation of prototype

---

## 4. Non-Goals (Out of Scope — MVP)

The following are explicitly not in scope for MVP and must not be designed for or built toward without explicit Orchestrator approval:

- EHR / EMR integration
- Telehealth video session launching
- AI exercise recommendation engine (infrastructure collects data; AI layer is post-MVP)
- Social or sharing features of any kind
- Non-English language support
- Adult user profiles (not autistic children)
- Diagnostic assessment tools
- Insurance billing or reimbursement workflows
- Web app version (mobile-only at MVP)
- Public App Store launch (pilot-only until OT clinical validation complete)

---

## 5. Success Metrics — 6 Months Post-Pilot Launch

| Metric | Target | Measurement Method |
|---|---|---|
| Active OT pilot users prescribing exercises | 50+ | OT portal activity logs |
| Parent-reported improved understanding of child's patterns | Positive | Pilot survey (qualitative) |
| Child daily active usage (opens app without prompting) | >3x per week per active child | App session analytics |
| OT-rated exercise library clinical validity | >80% rated clinically appropriate | OT pilot feedback survey |
| HIPAA audit readiness | Pass | Internal compliance review |
| Zero serious adverse events | 0 | Incident log |

---

## 6. Stakeholders

| Role | Name | Responsibility |
|---|---|---|
| Orchestrator / Product Owner | Don | Vision, scope, all final decisions |
| Clinical Advisor (Primary) | Their mother | Real-world child + parent perspective, first clinical reviewer |
| OT Pilot Group | TBD (3–5 OTs) | Clinical validation, exercise library co-build, CIL Phase 2 sign-off |
| UI/UX Lead | Carl (Agent) | Design system, companion design, all child-facing UI |
| CTO / Lead Engineer | Codey (Agent) | Flutter architecture, Supabase, HIPAA infrastructure |
| Track B Engineer | Codey Jr (Agent) | Non-conflicting parallel tracks |
| CPO / Spec Author | Claud3 (Agent) | Linear tickets, prompt standards, knowledge management |
| QA Director | Clyde (Agent) | Test coverage, quality gates, regression |

---

## 7. Users & Personas

### Persona 1 — The Child (Primary)
- Age: 4–12, autistic, varied communication and literacy profiles
- Technical level: No literacy assumed; non-verbal operable by design
- Motivation: Play, curiosity, connection with companion
- Pain point: Existing tools feel clinical, demand compliance, or aren't designed for their sensory profile
- Design constraint: No failure states, no obligation, no text dependency, sensory-safe throughout

### Persona 2 — The Parent (Secondary)
- Age: 25–50, varied technical literacy
- Motivation: Understanding their child, supporting between sessions, feeling less helpless
- Pain point: Lack of clinical insight between sessions; tools that require too much parent effort to be useful
- Design constraint: Dashboard must be passive (data accumulates without parent logging), plain language throughout, no clinical jargon

### Persona 3 — The OT (Tertiary — Clinical Authority)
- Age: 25–55, licensed OT, pediatric specialization
- Technical level: Moderate; comfortable with clinical software
- Motivation: Better patient outcomes, clinical efficiency, extending care beyond the session
- Pain point: No visibility into home behavior; home programs that families don't use; manual session prep
- Design constraint: OT portal must feel professional, not consumer; CIL compliance required for all features touching clinical prescription

---

## 8. Technical Requirements

### Platform
- Flutter — iOS and Android, phone and tablet
- Minimum iOS: 15.0 | Minimum Android: API 26 (Android 8.0)
- Tablet-optimized layouts required — larger touch targets, adjusted spacing
- Offline-first architecture — core child experience functions without internet connection; sync on reconnect

### Backend
- Supabase (PostgreSQL + pgvector + Edge Functions)
- Row-level security on all PHI tables — enforced from day one
- Paid plan with signed BAA before any PHI enters the system
- Service role key in secure secrets management only — never in client code

### Compliance
- HIPAA: PHI encrypted at rest (AES-256) and in transit (TLS 1.3), audit logging on all PHI access, US data residency, breach notification protocol defined pre-launch
- COPPA: Parental consent gate for all child account creation, parental gate on all settings, no child independent credentials
- WCAG 2.1 AA: Dynamic text sizing, reduced motion mode, no auto-playing audio, full VoiceOver/TalkBack support

### Authentication
- Parent: Email + password + optional device biometric, 30-minute session timeout
- Child: Mediated through parent account, device PIN or biometric, no independent credentials
- OT: Professional email verification, 15-minute session timeout, individual credentials required (no shared accounts)
- OT-to-child linking: Parent-generated invite code, single-use, 72-hour expiry, parent can revoke at any time

---

## 9. Phase Plan

### Phase 1 — Foundation (Now)
- KB complete ✅
- Clinical Evidence Briefs complete ✅
- Competitor analysis complete ✅
- AIDLC specs complete (this document)
- Design system defined by Carl

### Phase 2 — Prototype
- Companion system: discovery onboarding + one companion (Moss) fully animated
- Garden world: single meadow biome, day/night cycle, morning dew mechanic
- Two mini-games: Rain Painter + Stone Stacker
- Basic emotional check-in (weather report)
- No backend — local state only for prototype
- Goal: OT clinical observation and CIL Phase 2 sign-off

### Phase 3 — MVP Build
- All 6 companions
- All 4 MVP mini-games
- Full garden world (meadow biome)
- Parent dashboard
- OT portal with exercise prescription
- Exercise library (50–75 exercises, OT-built)
- HIPAA-compliant Supabase backend
- COPPA-compliant auth flows
- Cross-platform (iOS + Android, phone + tablet)

### Phase 4 — Pilot
- Closed pilot: 3–5 OTs, 6–15 families
- No public App Store listing
- Bi-weekly feedback sessions
- CIL Phase 2 completion for all MVP mechanics
- Exercise library expansion based on OT input

### Phase 5 — Public Launch (Post-Validation)
- App Store submission (iOS + Android)
- Public pricing activated
- OT Practice tier enabled
- Name finalized (pending pilot OT feedback)

---

## 10. Constraints & Dependencies

- Name "Bloom Garden" is a codename only — trademark/naming decision required before App Store submission
- OT pilot group not yet recruited — pilot recruitment is a Phase 2 dependency
- Exercise library content requires OT co-authorship — cannot be built by product team alone
- BAA with Supabase required before any PHI enters the system
- CIL Phase 2 sign-off required before any clinically-claimed mechanic ships to production
- Their mother's involvement as clinical advisor is a personal dependency — availability may vary

---

## 11. Clinical Integrity Statement

Every feature in this product that makes a therapeutic or clinical claim operates under the Clinical Integrity Layer (CIL) defined in `/docs/04_mds/CLINICAL-INTEGRITY-LAYER.md`. No clinically-claimed mechanic ships without:

1. CIL Phase 1 (research validation) complete
2. CIL Phase 2 (OT prototype observation) complete
3. Orchestrator sign-off

Agents building this product do not self-approve CIL items. Ever.
