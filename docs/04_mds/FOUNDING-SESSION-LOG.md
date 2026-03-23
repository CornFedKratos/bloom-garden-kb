# Bloom Garden — Founding Session Log
**Date:** 2026-03-22
**Author:** Don (Orchestrator)
**Status:** Canonical — Do Not Modify Without Orchestrator Approval

---

## Purpose of This Document
This document captures the complete founding vision, decisions, principles, and open questions established in the initial Bloom Garden product definition session. It is the earliest KB entry and serves as the reference point for all subsequent decisions. Every agent, OT advisor, and collaborator should read this document before contributing to the project.

---

## Product Vision

### What Bloom Garden Is
A HIPAA-compliant pediatric emotional regulation platform that supports autistic children, their parents, and their occupational therapists as a connected care system. A mobile-first application (iOS and Android, phone and tablet) built in Flutter on Supabase infrastructure.

### What Bloom Garden Is Not
- A therapy replacement
- A diagnostic tool
- A behavioral compliance system
- An engagement-maximizing consumer app

### The Core Insight
Most children's wellness apps are stimulating by design. Bloom Garden is de-stimulating by design. The entire UX philosophy is the opposite of engagement-maximizing. It should feel like putting on a weighted blanket. That is a genuinely rare and valuable thing to build.

---

## The Governing Statement
*Bloom Garden is a HIPAA-compliant pediatric emotional regulation platform that supports autistic children, their parents, and their occupational therapists as a connected care system. Every feature serves the child's wellbeing first, the parent's understanding second, and the OT's clinical effectiveness third. No feature ships that compromises safety, privacy, or clinical integrity.*

---

## Non-Negotiables
These cannot be overridden by product decisions, timeline pressure, or agent output.

1. Every clinical claim requires evidence before it enters spec
2. HIPAA compliance is architectural, not additive — built from day one
3. No feature places emotional burden on the child
4. No failure states, ever
5. The child's data is sacred
6. We help children. We do not seek validation for ourselves.
7. The OT portal is MVP — not a post-launch addition
8. COPPA compliance is non-negotiable
9. No ads, ever
10. AI summarizes, patterns, and flags — AI never diagnoses, prescribes, or replaces clinical judgment

---

## The Orchestrator's Personal Context
Don is a stepfather to two neurodivergent children who attend occupational therapy. This product is built from lived experience, not research alone. Their mother is a primary clinical advisor and first user researcher. This personal stake shapes every product instinct and is an asset, not a liability. The corresponding responsibility: the pilot OT group and clinical advisors serve as the check on founder instinct where clinical validity is concerned.

---

## Core Product Concept — The Garden World

### The Metaphor
A child tends a magical garden that reflects their emotional world. When dysregulated, the garden is stormy and muted. As they calm, flowers bloom, creatures appear, and music becomes gentle. The garden is a visual metaphor for their internal state — not a reward/punishment system.

### Design Principles
| Principle | Implementation |
|---|---|
| Predictability | Same opening ritual every time, no surprises |
| Low cognitive load | Max 3 choices on any screen |
| Sensory-safe | No sudden sounds, no flashing, muted warm palette |
| Non-verbal first | Everything operable without reading or speaking |
| No failure states | Nothing goes wrong — the garden reflects where they are |
| De-stimulating by design | Opposite philosophy to engagement-maximizing apps |

---

## The Companion System

### Core Mechanic Decision
**The companion is always slightly ahead of the child on the calm curve.**

When the child is dysregulated, the companion is gently, quietly modeling calm — not distressed, not demanding. The implicit invitation is "come join me" not "fix me." As the child engages, the companion responds with warmth and contentment. Shared joy in calm, not relief from suffering.

**Decision rationale:** The original concept of the companion mirroring the child's dysregulation was rejected due to distress amplification risk and emotional responsibility burden. The revised mechanic preserves projective play, companionship, affirmation, and co-regulation while removing clinical risk.

### The Six Companions

| Companion | Species | Co-regulation Style | OT Alignment |
|---|---|---|---|
| Moss | Tortoise | Breathwork and slow movement | Diaphragmatic breathing, proprioceptive grounding |
| Pip | Hedgehog | Sensory grounding and tactile interaction | Sensory grounding (5-4-3-2-1), tactile awareness |
| Lumi | Firefly | Visual tracking and attention anchoring | Visual motor integration, attention regulation |
| Cedar | Beaver | Structured activity and heavy work | Heavy work, proprioceptive input, task sequencing |
| Fern | Bunny | Affirmation and nurturing interaction | Self-regulation through nurturing, emotional identification |
| Slate | Owl | Mindful observation and present-moment grounding | Mindfulness, present-moment grounding, attention shifting |

### Selection Experience
Discovery-based, not choice-based. The child explores the garden and creatures reveal themselves naturally. The creature that receives the most interaction time quietly follows the child — it has chosen them. No grid of options. No "pick one" prompt. The bond moment is wordless and warm.

### Companion Design Constraints
- No sharp edges or angular geometry
- All palettes pass sensory safety review — no high contrast, no neon
- All animations at maximum 0.3x standard app animation speed
- Three states only: resting, calm active, co-regulating
- No distress state ever
- Expressions convey warmth and contentment only

---

## The OT Portal — "Garden Keepers"

### Why OT Portal Is MVP
Clinical credibility at launch requires it. Without it Bloom Garden is a wellness app. With it, it is a clinical support tool. The pilot OT group cannot be meaningful co-builders without it. HIPAA retrofitting post-launch is architecturally dangerous and expensive. The data layer must be built correctly from day one.

### OT Portal MVP Scope
- OT account creation with professional email verification
- Child profile linking via parent-issued invite code
- Observation dashboard (emotional check-in history, mini-game patterns, time of day usage, anomaly flags)
- Exercise prescription via seed packet builder
- Initial exercise library (50–75 exercises at launch)
- Garden Mail (OT to child via garden creature — parent visible on all messages)
- Parent-OT async messaging (HIPAA-compliant, not real-time)

### The CIL Sign-off Protocol for OT Portal
OT sign-off on clinical mechanics happens after prototype — not on written descriptions. OTs observe the mechanic with real children before approving. This produces observation-based clinical validation rather than theoretical approval.

---

## Daily Rhythm Anchors
| Moment | Hook |
|---|---|
| Morning | Morning Dew — something always changed overnight |
| Morning check-in | Weather Report — one-tap emotional baseline |
| After school | One-tap debrief |
| Pre-hard moment | Parent pre-loads journey mode |
| Mealtime | Creature eats alongside child |
| Bedtime | Tuck-in ritual, fireflies, soft music |
| Post-meltdown | Parent taps calm mode — garden goes to gentle rain |

### The No Wrong Day Mechanic
If a child doesn't open the app for a week: no withered pet, no lost streak, no guilt notification. The garden had a quiet week. Something new moved in. The child returns to curiosity, not shame.

---

## The Mini-Game Catalog

### MVP Four
1. **Rain Painter** — finger-drawn rain, sensory satisfaction, arousal level proxy
2. **Stone Stacker** — physics-based cairn building, frustration tolerance data
3. **Bubble World** — mystery bubbles, microphone breathing, impulse control data
4. **Mood Orchestra** — garden soundscape composition, companion collaboration

### Post-MVP
5. Seed Whisperer
6. Tide Keeper
7. Cloud Sculptor
8. Night Explorer

### The Invisible Data Layer
Every mini-game passively captures behavioral signals — touch pressure, speed, duration, choices, companion proximity — feeding the parent dashboard and OT portal as behavioral patterns, never labels. Nothing is surfaced to the child.

---

## The Exercise Library

### Vision
The most extensive, clinically validated, outcome-linked exercise library for neurodivergent children in any app today. A living clinical resource that grows through OT contribution and outcome data refinement.

### Three-Layer Architecture
1. **The Exercise Library** — content layer, clinically governed
2. **The Outcome Engine** — data layer, tracks what worked for which child profile
3. **The AI Recommendation Layer** — pattern matching, post-MVP (needs outcome data first)

### MVP Library Scope
50–75 exercises at launch, built with pilot OTs. Depth over breadth. Every entry includes: clinical evidence, sensory profile tags, contraindications, parent guide, OT notes, success/failure indicators, and exercise relationships (similar, progressions, regressions).

### Library Taxonomy
- By sensory system: Proprioceptive, Vestibular, Tactile, Auditory, Visual, Interoceptive
- By regulation goal: Upregulation, Downregulation, Modulation, Transition, Meltdown recovery, Preventive
- By child profile: Sensory seeking, avoiding, sensitive, low registration, mixed
- By delivery context: In-app, home program, waiting room, bedtime, post-school, pre-event

---

## AI Integration Governance

### The Governing Principle
*AI summarizes, patterns, and flags. AI never diagnoses, prescribes, or replaces clinical judgment.*

### Approved AI Features
1. **Session Summary for Parents** — plain language usage summary, no clinical interpretation
2. **Weekly Pattern Brief for OT Portal** — aggregated behavioral signals for session prep
3. **Anomaly Detection / Escalation Triggers** — pattern change flags to parent and OT for human review
4. **OT Session Prep Assistant** — structured pre-session note from behavioral data
5. **Exercise Recommendation Assist** — suggests library exercises based on child profile, OT approves

### AI Prohibited Actions
- Direct interaction with the child
- Diagnostic language in any output
- Autonomous clinical action of any kind
- Risk assessment language toward parents
- Replacing OT clinical judgment

### Required AI Disclosure
Every AI-generated output visible to parents or OTs must carry: *"This summary was generated automatically from usage patterns. It is not a clinical assessment. Please discuss any concerns with your occupational therapist."*

---

## Business Model

| Tier | Who | What | Price |
|---|---|---|---|
| Free | Child + Parent | Core garden, basic activities | $0 |
| Family | Child + Parent | Full emotional tracking, parent dashboard | ~$8/mo |
| Connected | + 1 OT linked | OT portal access, exercise pushing, garden mail | ~$20/mo |
| OT Practice | Licensed OT | Manages up to 30 child profiles | ~$99/mo |
| Clinic | Practice/clinic | Unlimited profiles, EHR export, team accounts | Custom |

### The Growth Flywheel
OT recommends app → Parent subscribes → Child engages → OT gets better data → OT gets better outcomes → OT recommends to more families → repeat

---

## Compliance Architecture — Non-Negotiables

### HIPAA
- PHI encrypted at rest and in transit
- Audit logging on all PHI access
- Role-based access control — parent, child, OT lanes strictly separated
- Business Associate Agreements with all vendors touching PHI
- Data residency — US only
- Breach notification process defined before launch
- Minimum necessary standard — every data point requires justified clinical purpose

### COPPA
- Children under 13 — parental consent gates all account creation
- Parental gate on all settings
- No child independent credentials
- No social features that expose child data externally

### Supabase Configuration
- Row-level security from day one
- Paid plan required for BAA
- All RLS policies reviewed before any PHI enters the database

---

## Pilot Structure

### Pilot OT Group
- 3–5 OTs, varied pediatric OT specialties
- Each brings 2–3 willing families
- Bi-weekly feedback sessions during pilot
- Free access permanently as founding OT partners
- Clinical input credited in documentation and App Store listing
- Direct feedback channel (Slack or equivalent) — not a form
- Genuine influence over exercise library — they build it with us

### What Pilot OTs Are Asked to Do
Not evaluate a finished product — co-build the right one. Specifically: observe children using prototypes and provide observation-based CIL sign-off on clinical mechanics.

### IRB Consideration
If outcome data will be used for publication or grant applications, IRB-approved pilot protocols should be established before pilot launch.

---

## Competitor Analysis — Planned
Full KB document to be produced covering:
- Pediatric emotional regulation apps
- Autism-specific support tools
- OT clinical support platforms
- Tangential references (Finch, Moshi, Smiling Mind, Rootd)

Analysis framework per competitor: strengths, weaknesses, autism suitability, lessons for Bloom Garden, pitfalls to avoid.

---

## Name Status
**Working title: Bloom Garden**
Decision: Name is not locked. To be tested in OT pilot conversations — specifically "have you tried [name]?" in clinical context. Final name decision deferred until pilot OT engagement begins.

Alternative territories identified: companion-forward (Grove, Tend), relationship-forward (Beside, Steady), world-forward (Verdant, Canopy), invented names.

---

## Open Questions
1. Name — final decision deferred to OT pilot testing
2. IRB protocol — should be established before pilot launch
3. Exercise library — exact launch set to be built with pilot OTs
4. AI recommendation layer — post-MVP, needs outcome data volume first
5. Telehealth integration — flagged for post-MVP OT portal
6. EHR integration — post-MVP, clinic tier
7. Non-English language support — not scoped, needs community input

---

## Technology Stack
- **Mobile:** Flutter (iOS and Android, phone and tablet)
- **Backend:** Supabase (HIPAA-compliant configuration, paid plan, BAA required)
- **Infrastructure:** Existing ChickenTindy agent team and Linear/Supabase workflow
- **Project Management:** Linear (Space: BLO)
- **AI Agents:** Codey (CTO), Codey Jr (Track B), Carl (UI/UX), Claud3 (CPO), Clyde (QA)

---

*This document is the founding record of Bloom Garden. It was established on 2026-03-22 and represents the complete product definition session preceding all spec work. Subsequent decisions that modify anything in this document must be logged in the relevant KB section with date, reasoning, and orchestrator approval.*
