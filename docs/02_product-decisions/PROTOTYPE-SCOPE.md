# Bloom Garden — Prototype Scope
**Phase:** 2 — Prototype
**Status:** PENDING Don approval
**Purpose:** Defines exactly what is built for Phase 2 and what OTs will observe. Serves as Codey's build brief and the OT's evaluation framework.
**Authored:** 2026-03-23

---

## What Is In The Prototype

One companion. One biome. Two mini-games. One check-in. Local state only.

### Companion — Moss (Tortoise)
- Single companion — Moss only
- Three states: Resting, Calm Active, Co-regulating
- Co-regulating state demonstrates diaphragmatic breathwork (visual rise/fall, no verbal instruction)
- Animation speed: 0.3× standard throughout all states
- No distress state. No hunger state. No negative state of any kind.
- Companion is always glad to see the child. Always calm. Always present.

### Biome — Meadow (Morning State)
- Single biome — meadow only
- Morning light and ambient state only (no time-of-day transitions in prototype)
- Glowing seed present in the meadow — **interactive**: tap triggers a glow pulse and gentle particle effect. Not functional (no Seed Packet mechanic behind it), but responsive. The child must never meet a wall.
- Moss present in the meadow in Resting state on arrival

### Governing Interaction Principle — No Walls
**Every tappable or touchable element in the prototype must respond to interaction.** The child should be able to explore freely and always receive a response — a glow, a sound, a gentle movement, a particle. Nothing in the prototype is inert. If the child touches something, something happens.

This applies to: the glowing seed, the meadow environment elements (flowers, grass, water if present), Moss in all states, and all mini-game elements. No element should feel broken or ignored.

Codey: if you encounter an element that has no defined interaction response, default to: brief glow pulse + subtle scale animation (0.95 → 1.05 → 1.0) at 0.3× speed. This is the prototype-wide fallback response for any unspecified tap target.

### Companion Discovery — Simplified Onboarding
- Shortened discovery flow leading to Moss
- Child interacts with the meadow briefly, Moss appears and follows them
- No full six-companion selection mechanic — prototype establishes the emotional template only
- Discovery should feel wordless and warm — no text prompts required to complete

### Mini-Game 1 — Rain Painter
- Child paints rain in the sky using touch/drag gestures
- Three rain density zones (light, medium, heavy)
- Moss watches from puddles, responds to rain density changes
- "I wonder if I can make a rainbow today" curiosity hook
- No failure state. No score. No timer.

### Mini-Game 2 — Stone Stacker
- Child places river stones one by one using touch
- Physics are real but forgiving — stones settle naturally
- Moss watches, reacts gently when stack falls (neutral curiosity, not alarm)
- "I wonder how high I can go today" curiosity hook
- No failure state. No score. No wrong move.

### Emotional Check-In — Weather Report
- Four weather icons: sunny ☀️, cloudy ⛅, rainy 🌧️, stormy ⛈️
- Moss gently presents the check-in — no text required to respond
- Child taps one icon. That's the entire interaction.
- No judgment. No follow-up prompt. No right answer.
- Check-in is stored in local state only (not transmitted to any backend)

### Platform
- iOS only (Flutter)
- Phone and tablet layouts
- No Android in prototype — Android parity is Phase 3

### State Management
- Local state only — no Supabase backend
- No authentication or account creation
- No data persistence between app launches
- No network calls of any kind

---

## What Is NOT In The Prototype

This list is explicit and non-negotiable. None of the following are built, partially built, or scaffolded for Phase 2.

**Companions:**
- Pip (Hedgehog), Lumi (Firefly), Cedar (Beaver), Fern (Bunny), Slate (Owl) — all Phase 3

**Mini-Games:**
- Bubble World — Phase 3
- Mood Orchestra — Phase 3
- Seed Whisperer — Phase 3
- Tide Keeper — Phase 3

**Garden Features:**
- Time-of-day transitions (dusk, night, morning variants) — Phase 3
- Morning Dew discovery events — Phase 3
- Tuck-In bedtime sequence — Phase 3
- Seasonal changes — Phase 3
- Garden growth over time — Phase 3

**Mechanics:**
- Calm Mode (parent-triggered) — Phase 3
- Daily Rhythm system — Phase 3
- Full six-companion discovery mechanic — Phase 3
- Functional Seed Packets — Phase 3
- Garden Mail — Phase 3

**Infrastructure:**
- Parent Dashboard — Phase 3
- OT Portal (Garden Keepers) — Phase 3
- Authentication and account creation — Phase 3
- Supabase backend — Phase 3
- Behavioral signal capture — Phase 3
- Exercise library — Phase 3
- HIPAA compliance layer — Phase 3 (requires BAA execution first)
- Android support — Phase 3
- Notifications — Phase 3

---

## What OTs Will Observe

The OT observes one child using the prototype freely for up to 60 minutes. The OT does not direct the interaction. The child leads.

For each mechanic below, the OT watches for the specified clinical indicators:

### Companion (Moss)
- Does the child engage with Moss at all?
- Does the 0.3× animation speed feel appropriate, or does it trigger impatience/frustration?
- In the co-regulating state, is the breathwork mechanic recognizable as a breathing exercise without verbal instruction?
- Does Moss's presence feel calming or neutral — or does it produce an unexpected response?

### Rain Painter
- Does the child engage self-directedly, or do they need prompting?
- Does the interaction feel calming or stimulating?
- Is there any evidence of a "curiosity hook" — the child wondering what will happen next?
- Any confusion about how the mechanic works?
- Any frustration or distress?

### Stone Stacker
- Same self-direction and curiosity questions as Rain Painter
- When the stack falls, how does the child respond? Does Moss's neutral reaction help regulate that moment?
- Any signs of perceiving the falling stack as failure?

### Weather Report
- Does the child understand what is being asked without text or verbal instruction?
- Does the child engage honestly (selecting based on how they feel) or randomly?
- Does the 4-icon set feel sufficient, or does the child seem to want more options?
- Any confusion about the icons?

### Overall Observation
- Any moment of distress — mild or significant?
- Any element the child perceives as a failure state?
- Any design element that contradicts the de-stimulating intent?
- Any surprise positive response not anticipated by the design?
- Does the prototype feel appropriate for this child's sensory and developmental profile?

---

## CIL Phase 2 Sign-Off Criteria

For each mechanic, the OT provides a binary determination after the observation session:

| Determination | Meaning |
|---|---|
| ✅ **Approved** | Mechanic is clinically appropriate as designed — proceed to Phase 3 |
| 🔄 **Revise** | Specific revision required before Phase 3 — revision documented, second observation scheduled |
| ❌ **Remove** | Mechanic is contraindicated — escalate to Don for PRD revision before any Phase 3 work |

**All four mechanics must reach Approved status before Phase 3 begins.**

A single Revise determination does not block the entire prototype — only the revised mechanic is held. A Remove determination escalates immediately to Don and Claud3 for PRD impact assessment.

---

## Notes for Codey

This document is your authoritative Phase 2 build brief. If anything above is ambiguous, stop and ask before building.

The scope above is complete. Nothing is implied or to be inferred. If a feature is not listed under "What Is In The Prototype," it is not in scope for Phase 2 — regardless of what exists in the PRD or spec documents.

The prototype's single job is to get four mechanics in front of an OT and a child. Everything else waits.
