# BLO-10 — Phase 2 Design Spec
# Execution Prompt v1.0
# Authored by: Claud3 (CPO)
# Status: PENDING Don approval before Carl executes

---

## Prompt Metadata

| Field | Value |
|---|---|
| Ticket | BLO-10 |
| Branch | `docs/blo-10-phase2-design-spec` |
| Type | Design — specification documents |
| Agent | Carl |
| Dependencies | BLO-4 complete (PROTOTYPE-SCOPE.md approved) |
| Blocks | BLO-12 (Codey cannot build without this spec) |
| Baseline test count | N/A |
| Prompt version | 1.0 |
| Authored | 2026-03-23 |

---

## Context

PROTOTYPE-SCOPE.md is approved. Codey knows what to build. Carl must now define how it looks, moves, and feels — before Codey writes a single widget.

The prototype is the first thing an OT and a child will ever see. It must feel like Bloom Garden — not like a Flutter demo. Carl's design spec is the gate between approved scope and executed build.

---

## Objective

Produce four design specification documents:

1. `docs/design_system/MOSS-CHARACTER-SPEC.md` — Moss companion design, all three states
2. `docs/design_system/MEADOW-ART-DIRECTION.md` — meadow biome visual language
3. `docs/design_system/MINIGAME-VISUAL-SPEC.md` — Rain Painter + Stone Stacker visual and interaction language
4. `docs/design_system/INTERACTION-PATTERNS.md` — No Walls fallback, Weather Report, all tap/touch responses

---

## File Ownership Boundaries

### Files Carl WILL touch
```
docs/design_system/MOSS-CHARACTER-SPEC.md        CREATE
docs/design_system/MEADOW-ART-DIRECTION.md       CREATE
docs/design_system/MINIGAME-VISUAL-SPEC.md       CREATE
docs/design_system/INTERACTION-PATTERNS.md       CREATE
```

### Files Carl will NOT touch
```
Any Flutter/Dart files
Any Supabase files
Any existing docs/ files
CLAUDE.md or skill files
docs/06_prompts/*
docs/05_session_context/*
```

---

## Design Constraints — Non-Negotiable

These are architectural, not aesthetic. Codey builds from them exactly.

- **Animation speed: 0.3× standard throughout** — every animation, every transition, every response
- **No distress states** — Moss has exactly three states: Resting, Calm Active, Co-regulating. No fourth state exists.
- **No failure feedback** — no red, no shake, no alarm sound, no negative visual response of any kind
- **No Walls** — every tappable element responds. Nothing is inert. Fallback: glow pulse + scale 0.95→1.05→1.0 at 0.3× speed
- **Warmth palette** — dawn (#f5ede0) background, moss (#4a7c59) primary, soil (#6b4f3a) text. No harsh contrast.
- **Non-verbal first** — no instructional text in child-facing UI. Every interaction operable without reading.
- **Touch targets** — minimum 44×44pt per WCAG 2.1 AA

---

## Document 1 — MOSS-CHARACTER-SPEC.md

Carl defines Moss as a character — not just an asset. Codey needs enough detail to implement each state without artistic interpretation.

**Required for each of the three states (Resting / Calm Active / Co-regulating):**

- **Description** — what Moss is doing, what emotion it conveys, what the child sees
- **Key visual elements** — shell texture, eye expression, body posture, any ambient particles or glow
- **Animation description** — what moves, how it moves, timing at 0.3× speed
- **Transition** — how Moss moves from this state to the next (ease-in-out, duration)
- **Color palette** — specific hex values for shell, skin, eyes, glow elements
- **Size guidance** — approximate screen percentage at phone and tablet breakpoints
- **Touch response** — what happens when the child taps Moss in this state

**Co-regulating state specifics:**
- Must demonstrate diaphragmatic breathwork visually
- Shell or body rises and falls gently — the child can follow along without instruction
- Cycle timing: inhale ~4 seconds, hold ~1 second, exhale ~6 seconds (all at 0.3× feel, not clock speed)
- Moss's expression: calm, warm, present — not instructional

---

## Document 2 — MEADOW-ART-DIRECTION.md

**Required sections:**

### Overall Palette and Mood
- Color values for sky, grass, ground, ambient light
- Time of day: morning — soft warm light, no harsh shadows
- Emotional target: safe, curious, quiet, alive

### Environment Elements
List every tappable/interactive element in the meadow with:
- Visual description
- Interaction response (or confirm it uses the No Walls fallback)
- Animation behavior at 0.3× speed

Minimum elements to define:
- Glowing seed — tap response: glow pulse + particle burst (defined in PROTOTYPE-SCOPE.md)
- Flowers — tap response
- Grass — swipe/touch response
- Sky/clouds — tap response
- Ground/path — tap response
- Moss's position in the meadow (where does he rest?)

### Ambient Animation
What moves passively in the meadow without interaction:
- Grass sway
- Cloud drift
- Firefly presence (if any)
- Ambient particle system

### Composition
- Where does Moss sit in the frame?
- Where is the glowing seed?
- Visual hierarchy: what draws the eye first?

---

## Document 3 — MINIGAME-VISUAL-SPEC.md

### Rain Painter

**Visual language:**
- Sky background — color, texture, gradient
- Rain brush — what does the child's touch draw? Color, opacity, particle behavior
- Three density zones — visual differentiation (light/medium/heavy rain appearance)
- Rainbow possibility — when does it appear? What triggers it? What does it look like?
- Moss placement — where is Moss during this mini-game? What are his puddles like?

**Interaction feedback:**
- Touch/drag trail appearance
- What happens at the boundary of density zones?
- No failure state — what happens if the child paints the entire sky solid? (Should still look beautiful)

**Transition in/out:**
- How does Rain Painter begin? (fade in, Moss leads the child there?)
- How does it end? (child-led — they simply stop)

### Stone Stacker

**Visual language:**
- River stones — color palette, texture, size variation
- Water/river background
- Stack success feeling — what does a growing stack look like?
- Stack fall — what does the fall look like? (Must feel neutral, not like failure)
- Moss placement and reaction — where is Moss? What is his neutral reaction when the stack falls?

**Physics feel:**
- Stones settle with gentle wobble
- Fall is slow and soft — not jarring
- All at 0.3× speed

**Interaction feedback:**
- Pick up stone: gentle lift animation
- Place stone: soft settle
- Stack falls: slow cascade, Moss tilts head with curiosity (not alarm)

---

## Document 4 — INTERACTION-PATTERNS.md

The master interaction reference for Codey. Defines every touch/tap response pattern used in the prototype.

**Required sections:**

### No Walls Fallback Pattern
The default response for any tappable element without a defined specific response:
- Visual: glow pulse (color: rgba of --moss or element's own color)
- Scale: 0.95 → 1.05 → 1.0
- Duration: 400ms total at 0.3× feel
- Easing: ease-in-out
- Sound: optional soft chime (Carl specifies if applicable)

### Weather Report Check-In
Four icons — visual design for each:
- ☀️ Sunny — color, glow, feel
- ⛅ Cloudy — color, feel
- 🌧️ Rainy — color, animation
- ⛈️ Stormy — color, feel (must not feel alarming — this is a valid mood, not a warning)

Selection feedback:
- Tap: icon scales up gently, soft glow, Moss responds with a nod or blink
- No wrong choice — all four responses feel equally warm

### Companion Tap Response (per state)
What happens when the child taps Moss in each of his three states:
- Resting: [Carl defines]
- Calm Active: [Carl defines]
- Co-regulating: [Carl defines — must not interrupt the breathing cycle abruptly]

### General Principles
- Every interaction has a response within 100ms of touch
- No loading states in the prototype — everything is immediate
- No pop-ups, no modals, no overlays
- No text in any child-facing interaction

---

## Acceptance Criteria

```gherkin
Given MOSS-CHARACTER-SPEC.md
When Codey reads it
Then he can implement all three Moss states without asking Carl a single question

Given MEADOW-ART-DIRECTION.md
When Codey reads it
Then every tappable element has a defined interaction response

Given MINIGAME-VISUAL-SPEC.md
When Codey reads it
Then Rain Painter and Stone Stacker have defined visual language and physics feel

Given INTERACTION-PATTERNS.md
When Codey reads it
Then the No Walls fallback is precisely defined with timing, easing, and scale values

Given all four documents
When read together
Then no element in PROTOTYPE-SCOPE.md is visually undefined
```

---

## Definition of Done

- [ ] Annotation posted on BLO-10 and approved by Don
- [ ] `docs/design_system/MOSS-CHARACTER-SPEC.md` committed and Don-approved
- [ ] `docs/design_system/MEADOW-ART-DIRECTION.md` committed and Don-approved
- [ ] `docs/design_system/MINIGAME-VISUAL-SPEC.md` committed and Don-approved
- [ ] `docs/design_system/INTERACTION-PATTERNS.md` committed and Don-approved
- [ ] No element in PROTOTYPE-SCOPE.md left visually undefined
- [ ] PR opened with `BLO-10` in title
- [ ] `/session-close` run — context exported to `docs/05_session_context/BLO_SESSION_CONTEXT_LATEST.md`

---

## Session Context Export Template

```markdown
---
## Session Export — [DATE] — Carl

**Branch:** docs/blo-10-phase2-design-spec
**Commit hash:** [hash]

### What Changed
- docs/design_system/MOSS-CHARACTER-SPEC.md — CREATED
- docs/design_system/MEADOW-ART-DIRECTION.md — CREATED
- docs/design_system/MINIGAME-VISUAL-SPEC.md — CREATED
- docs/design_system/INTERACTION-PATTERNS.md — CREATED

### Decisions Made
- [any palette decisions, animation timing decisions, element placement decisions]

### Design Questions Escalated to Don
- [anything that required Don's input]

### Tickets Worked
- BLO-10 — Phase 2 Design Spec — complete

### Blocks Cleared
- BLO-12 (Codey prototype build) is now unblocked

### Next Session Should Start With
- Carl available for asset production once Codey begins BLO-12
---
```
