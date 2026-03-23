# Moss — Character Design Specification
**Companion:** Moss (Tortoise)
**Phase:** 2 — Prototype
**Author:** Carl (Sr UI/UX Engineer)
**Status:** PENDING Don approval

---

## Character Overview

Moss is a small tortoise — the first companion a child meets in Bloom Garden. Moss is slow, warm, grounded, and always glad to see the child. Moss never shows distress, hunger, frustration, or any negative emotion. Moss is always present, always calm, always safe.

Moss has exactly **three states**. No fourth state exists.

---

## Rendering Approach

> **Updated 2026-03-23:** Moss animations are produced via the Recraft AI visual pipeline (see `docs/02_product-decisions/RECRAFT-VISUAL-PIPELINE.md`). The pipeline is: Recraft AI Pro API → SVG → svg-to-lottie conversion → hand-authored keyframe animation. CustomPainter remains as fallback. The Lottie tooling options listed below are superseded by this decision.

**Moss is a Lottie animation asset** with Flutter widget overlays for glow and particles.

| Layer | Technology | Rationale |
|---|---|---|
| Moss body + shell + eyes | Lottie (`.json` exported from After Effects or Rive) | 3 states with smooth transitions, breathing cycle, head tracking — too complex for static SVG, too fluid for sprite sheets. Lottie handles the 0.3× speed multiplier natively via `AnimationController.duration`. |
| Shell glow | Flutter `Container` with `BoxDecoration` + `BoxShadow` | Glow is a simple radial gradient that pulses independently of the body animation. Cheaper than baking into Lottie. |
| Ambient particles | Flutter `CustomPainter` | Particle count and behavior change per state. Programmatic control is simpler than pre-rendering particle variants into each Lottie file. |
| Eye blink | Embedded in Lottie timeline | Blink is part of the character animation, not a separate layer. Randomized interval controlled by Flutter — Lottie segment playback (`frame 0-12 = blink`). |
| Head tracking | Lottie + Flutter `Transform.rotate` | Base head position is in Lottie. Flutter applies a rotation transform on the Lottie widget to track touch coordinates. Max 15deg. |

**Asset pipeline:**
1. Carl provides Lottie `.json` files: `moss_resting.json`, `moss_calm_active.json`, `moss_co_regulating.json`
2. Each file contains the idle loop for that state
3. Transitions between states: Flutter `AnimatedSwitcher` cross-fades between Lottie widgets over the specified transition duration
4. Codey does NOT need to create Moss artwork — Carl delivers the assets

**Fallback if Lottie assets are not ready for prototype:** Codey builds Moss as a `CustomPainter` using the color values and shapes in this spec. The visual will be simpler (flat color, geometric shell) but all animation timings and interaction responses remain identical. The Lottie assets replace the CustomPainter version with zero API changes — the widget interface is the same.

**File size budget:** Each Lottie file should be < 150KB. Total Moss assets < 500KB.

---

## Global Constants

```
Animation speed multiplier:   0.3
Base touch target:            44×44pt minimum (WCAG 2.1 AA)
Moss screen percentage:       18–22% of viewport height (phone), 14–18% (tablet)
Moss position:                Bottom-center of meadow, resting on ground plane
```

---

## Color Palette — Moss

| Element | Hex | Usage |
|---|---|---|
| Shell base | #5a6b4e | Primary shell color — warm olive-brown |
| Shell highlight | #7a8f6a | Light-catching edges of shell plates |
| Shell shadow | #3d4a36 | Underside and depth shadows |
| Skin | #8b7d6b | Head, legs, tail — warm taupe |
| Skin highlight | #a39585 | Light-catching skin surfaces |
| Eyes | #2d3b2e | Deep dusk green — calm, present |
| Eye glint | #f5ede0 | Dawn white — small specular highlight |
| Glow (co-regulating) | rgba(74, 124, 89, 0.25) | Soft moss-green aura around body |
| Glow pulse peak | rgba(74, 124, 89, 0.40) | Peak of breathing glow cycle |
| Ambient particles | rgba(212, 168, 67, 0.3) | Firefly-gold micro-particles near Moss |

---

## State 1 — Resting

### Description
Moss is still, shell low to the ground, eyes half-lidded with a warm, sleepy contentment. Head slightly tucked. Legs loosely visible. The child arrives and Moss is already here — waiting, unhurried.

### Key Visual Elements
- Shell plates visible with subtle texture gradient (shell base → shell highlight on upper curves)
- Eyes at 60% open — not closed, not fully alert. Warm, present.
- Head resting on front legs, angled slightly toward the child's last touch point
- No ambient particles in resting state — the meadow is quiet
- Soft drop shadow beneath Moss: `rgba(45, 59, 46, 0.12)`, blur 8px, offset-y 4px

### Animation — Idle Loop
- **Breathing:** Subtle body rise/fall. Scale Y oscillation: 1.0 → 1.015 → 1.0
  - Duration: 6000ms per cycle
  - Easing: `Curves.easeInOut`
  - Continuous loop
- **Eye blink:** Every 8–12 seconds (randomized interval)
  - Eyes close to 10% → reopen to 60%
  - Duration: 400ms close, 200ms hold, 400ms open
  - Easing: `Curves.easeInOut`

### Transition TO Resting
- From Calm Active: Moss slowly lowers head, eyes drift from 100% to 60%
  - Duration: 2000ms
  - Easing: `Curves.easeOut`
  - Trigger: No child interaction for 30 seconds

### Touch Response (Resting)
- Moss lifts head slightly, eyes widen from 60% → 85% → settle at 100% (transition to Calm Active)
- Shell glow: brief pulse `rgba(74, 124, 89, 0.15)` → fade to 0
  - Duration: 800ms
  - Easing: `Curves.easeOut`
- Tapping Moss in Resting always transitions to Calm Active

---

## State 2 — Calm Active

### Description
Moss is awake, engaged, gently moving. Head is up, eyes fully open, body slightly elevated. Moss tracks the child's touch point with a slow head turn. Moss is curious about what the child is doing — following along, never leading.

### Key Visual Elements
- Eyes at 100% open — warm, attentive
- Head elevated above front legs, slight upward tilt
- Shell plates catch more light (shell highlight more visible)
- Ambient particles appear: 3–5 firefly-gold micro-particles drifting slowly near Moss
  - Particle color: `rgba(212, 168, 67, 0.3)`
  - Particle size: 2–4px
  - Drift speed: 0.5px/frame at 0.3× multiplier
  - Fade in over 1000ms when entering Calm Active

### Animation — Active Loop
- **Breathing:** Slightly more pronounced than Resting. Scale Y: 1.0 → 1.025 → 1.0
  - Duration: 5000ms per cycle
  - Easing: `Curves.easeInOut`
- **Head tracking:** Moss's head rotates toward the child's last touch coordinate
  - Max rotation: 15 degrees left/right from center
  - Rotation speed: 800ms to reach target angle
  - Easing: `Curves.easeOut`
  - Updates on each touch event, not continuously
- **Eye blink:** Every 6–10 seconds (randomized)
  - Same timing as Resting blink

### Transition TO Calm Active
- From Resting: described above (touch trigger)
- From Co-regulating: breathing glow fades, body scale returns to active breathing range
  - Duration: 1500ms
  - Easing: `Curves.easeInOut`
  - Trigger: Child taps Moss during co-regulating (does NOT abruptly stop — completes current breath cycle first, then transitions)

### Touch Response (Calm Active)
- Moss does a gentle nod: head dips 5 degrees down → returns
  - Duration: 600ms
  - Easing: `Curves.easeInOut`
- Shell shimmer: highlight color briefly intensifies
  - Shell highlight → `#92a87e` for 300ms → back to `#7a8f6a`
  - Easing: `Curves.easeOut`
- Eyes briefly widen to 110% (slight squish) → settle at 100%
  - Duration: 400ms
  - Playful, warm — like a happy blink

---

## State 3 — Co-regulating

### Description
Moss demonstrates diaphragmatic breathwork. The child can follow along without instruction. Moss's entire body visually expands and contracts in a slow, rhythmic breathing cycle. A soft green glow pulses in time with the breath. This is the clinical mechanic — it must be recognizable as breathing.

### Key Visual Elements
- Eyes at 80% open — calm, steady, almost meditative
- Head slightly lowered from Calm Active — settled, not sleepy
- Shell glow: continuous rhythmic pulse (see timing below)
- Ambient particles increase: 6–8 particles, drifting in sync with breath rhythm
  - Particles drift outward on exhale, inward on inhale
- Soft radial gradient beneath Moss expands/contracts with breath
  - Color: `rgba(74, 124, 89, 0.08)` → `rgba(74, 124, 89, 0.18)` on inhale peak

### Breathing Cycle — Exact Timing

| Phase | Duration | Moss Body Scale Y | Glow Opacity | Easing |
|---|---|---|---|---|
| Inhale | 4000ms | 1.0 → 1.06 | 0.25 → 0.40 | `Curves.easeInOut` |
| Hold | 1000ms | 1.06 (hold) | 0.40 (hold) | — |
| Exhale | 6000ms | 1.06 → 1.0 | 0.40 → 0.25 | `Curves.easeInOut` |

**Total cycle: 11000ms.** Continuous loop.

- Shell glow color during cycle: `rgba(74, 124, 89, [opacity per table])`
- Glow radius: 120% of Moss's body bounds, soft edge (Gaussian blur 20px)

### Transition TO Co-regulating
- Trigger: Moss has been in Calm Active for 45 seconds without child touching Moss directly (child may be interacting with other elements)
- Transition: head lowers slightly, eyes ease from 100% to 80%, glow fades in from 0 → 0.25
  - Duration: 2000ms
  - Easing: `Curves.easeInOut`
- First breath cycle begins immediately after transition completes

### Touch Response (Co-regulating)
- **Critical: tapping Moss does NOT abruptly stop the breathing cycle.**
- Current breath cycle completes (up to 11000ms remaining)
- On the next cycle boundary, Moss transitions to Calm Active
- During the remaining cycle after tap: Moss's eyes briefly widen to 90% (acknowledging the touch) then return to 80%
  - Duration: 500ms
  - Easing: `Curves.easeOut`

---

## Companion Discovery — Moss's Entrance

### Sequence
1. Child arrives at meadow. Moss is not yet visible.
2. Child taps or touches any meadow element (No Walls response fires).
3. After the child's **third interaction** with the meadow:
   - A gentle rustle animation plays at Moss's spawn point (bottom-center)
   - Duration: 1200ms
   - Small particles rise from the grass: `rgba(74, 124, 89, 0.2)`, 4–6 particles
4. Moss emerges slowly:
   - Fade in from 0% → 100% opacity
   - Simultaneous scale: 0.8 → 1.0
   - Duration: 2000ms
   - Easing: `Curves.easeOut`
5. Moss begins in Resting state.
6. If the child taps Moss → transitions to Calm Active (standard touch response).

### Design Intent
The child discovers Moss — Moss doesn't announce himself. The moment feels quiet and personal. No fanfare, no celebration animation, no text. Moss is simply here now.

---

## Size and Positioning

### Phone (375pt width reference)
- Moss body: ~70pt wide × ~55pt tall (shell included)
- Touch target: 88×88pt (2× minimum — Moss is the primary interaction)
- Position: horizontally centered, bottom 20% of screen
- Moss sits on the ground plane — never floats

### Tablet (768pt width reference)
- Moss body: ~100pt wide × ~78pt tall
- Touch target: 120×120pt
- Position: horizontally centered, bottom 22% of screen

### Z-Index
- Moss renders above all meadow elements
- Moss renders below mini-game UI overlays (Weather Report)
- Moss casts shadow onto the ground plane (shadow renders below Moss, above grass)
