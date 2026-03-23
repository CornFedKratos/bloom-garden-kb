# Glossary
**Project:** Bloom Garden (Codename)
**Version:** 1.0
**Date:** 2026-03-22

---

## Domain Terms

| Term | Definition |
|---|---|
| **ASD** | Autism Spectrum Disorder. The primary population Bloom Garden serves. |
| **Autistic child** | A child with an ASD diagnosis. Preferred identity-first language used throughout the product. |
| **Co-regulation** | The process by which an external agent (caregiver, companion, therapist) helps a dysregulated individual return to a regulated state through modeling, scaffolding, and presence. The foundational mechanism of the companion system. |
| **Dysregulation** | A state in which a child's emotional or sensory arousal is outside their window of tolerance — either hyperaroused (overwhelmed, anxious, agitated) or hypoaroused (shutdown, flat, disengaged). |
| **Window of tolerance** | The optimal arousal zone in which a child can engage, learn, and self-regulate. Bloom Garden's goal is to support the child's return to this zone. |
| **Regulation** | A child's ability to manage their emotional and sensory arousal state. Bloom Garden supports regulation — it does not provide therapy. |
| **Sensory profile** | A child's individual pattern of sensory processing — which systems are seeking, avoiding, sensitive, or low-registration. Informs OT exercise prescription and companion behavior configuration. |
| **Proprioception** | The sensory system that processes body position, movement, and pressure. Central to OT sensory regulation work and to several Bloom Garden mini-game mechanics. |
| **Interoception** | The sensory system that processes internal body signals (heartbeat, breath, hunger, temperature). Relevant to breathing mechanics and emotional check-in design. |
| **Vestibular** | The sensory system that processes movement and balance. Relevant to device-tilt mechanics and heavy-work exercises. |
| **Heavy work** | OT term for activities that provide deep proprioceptive input through pushing, pulling, carrying, or resistance — known to support arousal regulation. Cedar the Beaver's activities are modeled on this. |
| **Projective play** | A therapeutic technique in which a child expresses or processes emotional states through a proxy character or object rather than direct self-disclosure. The basis for the companion-as-emotional-proxy mechanic. |
| **Sensory integration (SI)** | A framework developed by A. Jean Ayres describing how the brain organizes sensory information. Ayres Sensory Integration® (ASI) is the clinical intervention protocol. Bloom Garden supports SI goals but does not provide SI therapy. |
| **Meltdown** | A state of complete emotional/sensory dysregulation in which the child loses the ability to self-regulate. Bloom Garden includes a parent-triggered calm mode for post-meltdown support. |
| **Upregulation** | Increasing arousal and alertness — appropriate for hypoaroused states. Some exercises target upregulation; companion behavior configuration should suppress these for hyperaroused children. |
| **Downregulation** | Decreasing arousal — appropriate for hyperaroused states. Most Bloom Garden mechanics are downregulation-oriented by design. |

---

## Product Entities

| Term | Definition |
|---|---|
| **Garden** | The child's primary world within the app. A magical garden that reflects the child's emotional state over time through seasonal changes, creature arrivals, and slow bloom rewards. Not a reward/punishment system — a living metaphor. |
| **Companion** | The child's chosen creature from the six available options. The emotional heart of the product. Always slightly ahead of the child on the calm curve — models regulation, never mirrors distress. |
| **Companion discovery** | The exploration-based onboarding flow in which the child finds their companion by exploring the garden. No grid of options — the companion chooses the child through sustained interaction time. |
| **Companion states** | Three states per companion: resting, calm active, co-regulating. No distress state ever. All expressions convey warmth and contentment only. |
| **Seed packet** | The OT-created exercise bundle pushed to the child's garden as a glowing seed. The child discovers and plants it naturally — no notification, no demand. |
| **Garden Mail** | Short messages from the OT delivered to the child via a garden creature. Max 2-3 sentences, read aloud by the creature. Parent has full visibility on all Garden Mail. |
| **Morning Dew** | The daily mechanic that ensures something has changed in the garden overnight — a new flower, a creature gift, a small scene — creating a "what's new today?" pull without obligation. |
| **Weather Report** | The one-tap morning emotional check-in. Child selects a weather type that matches their current feeling. No text, no words. 2-second interaction that produces a daily baseline data point. |
| **Tuck-In** | The bedtime wind-down ritual — fireflies appear, garden dims, companion yawns. Child can optionally tuck in their companion. Not a task — an invitation. |
| **Calm Mode** | Parent-triggered state that sets the garden to gentle rain, dims the interface, and surfaces the companion in a quiet co-regulating animation. Activated after meltdowns or known hard moments. |
| **No Wrong Day mechanic** | The design principle ensuring that a child who has not opened the app for a week returns to curiosity, not shame. The garden changes over time but never withers or punishes absence. |
| **Slow Bloom Reward** | A planted seed that takes real days to bloom. No reminder required — the anticipation is the engagement. Teaches delayed gratification. |

---

## User Roles

| Term | Definition |
|---|---|
| **Child** | The autistic child who is the primary app user. No independent credentials. Access mediated through parent account. |
| **Parent** | The caregiver who manages the child's account and accesses the parent dashboard. Can link to one or more OTs via invite code. Has full visibility on all OT-to-child communications. |
| **OT (Garden Keeper)** | The licensed occupational therapist who accesses the OT portal. Can manage up to 30 child profiles (Practice tier). Sees behavioral data, prescribes exercises, sends Garden Mail. |
| **Orchestrator** | Don. Final decision authority on all product, scope, and clinical decisions. |

---

## Technical Terms

| Term | Definition |
|---|---|
| **PHI** | Protected Health Information. Any individually identifiable health data. In Bloom Garden: emotional check-in data, behavioral signals from mini-games, OT clinical notes, exercise prescription records, Garden Mail. |
| **PII** | Personally Identifiable Information. In Bloom Garden: companion name, parent account info. Lighter compliance burden than PHI but still encrypted. |
| **BAA** | Business Associate Agreement. Required legal agreement with every vendor that touches PHI. Supabase BAA required before any PHI enters the system. |
| **RLS** | Row-Level Security. Supabase feature that restricts data access at the database row level. Required on all PHI tables from day one. |
| **CIL** | Clinical Integrity Layer. Bloom Garden's governance protocol ensuring every clinical claim has evidence validation and OT sign-off before shipping. Defined in `/docs/mds/CLINICAL-INTEGRITY-LAYER.md`. |
| **CEB** | Clinical Evidence Brief. A structured research document produced for each therapeutic mechanism claimed in the product. Filed in `/docs/briefs/`. |
| **Behavioral signal** | Passive data captured from child interactions — touch pressure, speed, session duration, game choice, companion proximity — that feeds the parent dashboard and OT portal as pattern data. Never surfaced to the child. |
| **Regulation profile** | A per-child data construct built passively over time — sensory preferences, effective modalities, ineffective modalities, time-of-day patterns, companion interaction style. Input to future AI recommendation layer. |
| **RAG+** | Retrieval-Augmented Generation — the session memory architecture used in ChickenTindy and ported to Bloom Garden's internal KB for agent session continuity. |
| **Offline-first** | Architecture pattern where the core child experience functions without internet connectivity. Data syncs when connection is restored. Required for this population (car trips, waiting rooms, rural areas). |

---

## Feature Identifiers

| ID | Feature |
|---|---|
| FEAT-001 | Companion Discovery Onboarding |
| FEAT-002 | Garden World (Meadow Biome) |
| FEAT-003 | Companion System (States + Co-regulation) |
| FEAT-004 | Emotional Check-In (Weather Report) |
| FEAT-005 | Mini-Game: Rain Painter |
| FEAT-006 | Mini-Game: Stone Stacker |
| FEAT-007 | Mini-Game: Bubble World |
| FEAT-008 | Mini-Game: Mood Orchestra |
| FEAT-009 | Daily Rhythm System (Morning Dew, Tuck-In, Calm Mode) |
| FEAT-010 | Parent Dashboard |
| FEAT-011 | OT Portal — Garden Keepers |
| FEAT-012 | Exercise Library |
| FEAT-013 | Seed Packet Delivery System |
| FEAT-014 | Garden Mail |
| FEAT-015 | HIPAA-Compliant Auth & Data Architecture |
| FEAT-016 | Behavioral Signal Capture Layer |
| FEAT-017 | Parent-OT Async Messaging |
