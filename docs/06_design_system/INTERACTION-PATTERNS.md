# Interaction Patterns — Master Reference
**Scope:** All touch/tap responses in Phase 2 Prototype
**Author:** Carl (Sr UI/UX Engineer)
**Status:** PENDING Don approval

---

## Global Constants

```dart
// Every animation in the prototype uses these
static const double animationSpeedMultiplier = 0.3;
static const Duration noWallsFallbackDuration = Duration(milliseconds: 400);
static const Duration touchResponseDeadline = Duration(milliseconds: 100);
static const double minTouchTarget = 44.0; // pt, WCAG 2.1 AA
```

**Rule:** Every touch interaction produces a visible response within 100ms. No exceptions. If the interaction requires a complex animation, the first frame of response (glow onset, scale start) must begin within 100ms. The full animation may take longer.

---

## No Walls Fallback Pattern

The default response for any tappable element that does not have a specific interaction defined. This is the safety net — the child never touches something and gets silence.

### Visual Specification

| Property | Value |
|---|---|
| Glow color | Element's own primary color at 0.3 opacity, or `rgba(74, 124, 89, 0.3)` if no color defined |
| Glow radius | 120% of element bounds |
| Glow blur | 12px Gaussian |
| Glow fade | 0 → 0.3 → 0 opacity |
| Scale sequence | 0.95 → 1.05 → 1.0 |
| Total duration | 400ms |
| Easing | `Curves.easeInOut` |
| Sound | None (silent fallback) |

### Implementation Notes for Codey
```
Timeline:
  0ms     — Touch detected. Begin glow fade-in and scale-down.
  0-150ms — Scale 1.0 → 0.95, glow opacity 0 → 0.3
  150-300ms — Scale 0.95 → 1.05, glow holds at 0.3
  300-400ms — Scale 1.05 → 1.0, glow 0.3 → 0
```

Wrap any element with `NoWallsTapResponse` widget. If the element has its own tap handler, the No Walls fallback does NOT fire — the specific response takes priority.

---

## Weather Report — Emotional Check-In

### Layout

```
┌──────────────────────────────────────┐
│                                      │
│          Moss presents               │
│        (head tilted up,              │
│         eyes warm)                   │
│                                      │
│    ☀️      ⛅      🌧️      ⛈️      │
│                                      │
│     [tap any icon to respond]        │
│        (no text displayed —          │
│         child learns by doing)       │
│                                      │
└──────────────────────────────────────┘
```

**Overlay behavior:** Weather Report renders as a semi-transparent overlay on the meadow. The meadow is visible but dimmed beneath.

| Property | Value |
|---|---|
| Overlay backdrop | `rgba(245, 237, 224, 0.85)` (dawn at 85% opacity) |
| Backdrop blur | 8px |
| Icon row position | Vertically centered in overlay |
| Icon spacing | Equal distribution, ~20pt gap between icons |

### Icon Specifications

Each icon is a custom illustration — not an emoji. Warm, rounded, child-friendly. All four feel equally valid and equally warm. **The stormy icon must not feel alarming.**

#### Sunny

| Property | Value |
|---|---|
| Primary color | #d4a843 (firefly gold) |
| Secondary color | #f5ede0 (dawn) — ray tips |
| Size | 56×56pt |
| Touch target | 72×72pt |
| Ambient animation | Gentle rotation: 0 → 360deg, 20000ms continuous, `Curves.linear` |
| Glow | `rgba(212, 168, 67, 0.15)` — 8px radius beyond icon |

#### Cloudy

| Property | Value |
|---|---|
| Primary color | #b0bec5 (soft blue-grey) |
| Secondary color | rgba(255, 255, 255, 0.5) — cloud highlight |
| Size | 56×56pt |
| Touch target | 72×72pt |
| Ambient animation | Gentle horizontal drift: ±3pt, 6000ms cycle, `Curves.easeInOut` |
| Glow | `rgba(176, 190, 197, 0.12)` — soft grey aura |

#### Rainy

| Property | Value |
|---|---|
| Primary color | #7fa8c4 (soft blue) |
| Cloud element | #9ab0be (lighter blue-grey) |
| Rain drops | 3 small drops below cloud — `#7fa8c4` at 0.6 opacity |
| Size | 56×56pt |
| Touch target | 72×72pt |
| Ambient animation | Rain drops fall and regenerate: 4pt drop, 2000ms cycle, staggered 300ms apart |
| Glow | `rgba(127, 168, 196, 0.12)` — cool blue aura |

#### Stormy

| Property | Value |
|---|---|
| Primary color | #7a8a7a (muted sage-grey — NOT dark, NOT ominous) |
| Cloud element | #8a9a8a (slightly lighter) |
| Rain drops | Angled slightly — suggest wind, not violence. Same as Rainy but tilted 10deg |
| Lightning | **No lightning bolt.** Instead: a soft glow flicker inside the cloud |
| Glow flicker | `rgba(212, 168, 67, 0.1)` — firefly gold, very subtle, 3000ms cycle |
| Size | 56×56pt |
| Touch target | 72×72pt |
| Ambient animation | Cloud sways: ±2pt, 4000ms cycle. Rain drops fall at 10deg angle. |
| Glow | `rgba(122, 138, 122, 0.12)` — warm grey-green aura |

**Design intent for Stormy:** This is "big feelings" — not "danger." The icon should feel like a strong wind day, not a threat. A child selecting Stormy is expressing something real and valid. The visual must honor that.

### Selection Feedback — All Four Icons

When the child taps any icon:

| Phase | Animation | Duration | Easing |
|---|---|---|---|
| 1. Scale up | Icon: 1.0 → 1.2 | 200ms | `Curves.easeOut` |
| 2. Glow intensify | Icon glow opacity doubles (e.g., 0.15 → 0.30) | 200ms | `Curves.easeOut` |
| 3. Hold | Scale and glow hold | 400ms | — |
| 4. Other icons fade | Non-selected icons: opacity 1.0 → 0.3 | 300ms | `Curves.easeOut` |
| 5. Moss responds | Moss does a slow nod (head dip 5deg, return) | 600ms | `Curves.easeInOut` |
| 6. Settle | Selected icon settles: scale 1.2 → 1.1, glow returns to base | 300ms | `Curves.easeInOut` |
| 7. Overlay dismiss | Entire overlay fades out after 1500ms hold | 800ms | `Curves.easeIn` |

**After dismiss:** Meadow returns to full visibility. Moss transitions back to whatever state he was in. The selected weather is stored in local state. No confirmation screen, no "thank you" message.

**All four responses feel exactly the same.** There is no "correct" choice. No icon triggers a different animation quality. Sunny does not get a "happier" response than Stormy. They are equal.

### Weather Report Trigger
- **Prerequisite:** Moss must be visible (companion discovery complete — child's third interaction). Weather Report never appears before Moss does.
- Moss initiates the check-in after the child has been in the meadow for **2 minutes after Moss appears**, without navigating to a mini-game
- If the child has fewer than 3 interactions in the first 2 minutes (Moss not yet discovered), the Weather Report timer does not start until Moss appears. There is no fallback — Moss is always the presenter.
- Moss tilts head up slightly, eyes widen to 110%
- The four icons fade in above Moss over 800ms
- If the child ignores the check-in (no tap for 30 seconds), icons gently fade out over 1000ms and Moss returns to Calm Active. **No penalty. No re-prompt for 5 minutes.**

---

## Companion Tap Responses — Per State Summary

| State | Response | Duration | Notes |
|---|---|---|---|
| Resting | Head lifts, eyes widen 60%→100%, shell glow pulse, transitions to Calm Active | 800ms | Always transitions to Calm Active |
| Calm Active | Gentle nod (5deg dip), shell shimmer, eyes squish to 110% | 600ms | Stays in Calm Active |
| Co-regulating | Eyes briefly widen to 90%, current breath cycle completes, then transitions to Calm Active | Up to 11000ms | Never interrupts mid-breath |

Full details in MOSS-CHARACTER-SPEC.md.

---

## Mini-Game Entry Points — Meadow Triggers

| Trigger | Location in Meadow | Visual Cue | Touch Target |
|---|---|---|---|
| Rain Painter | Top 20% of screen (sky area) | Sky has a subtle shimmer at the trigger zone: `rgba(160, 190, 210, 0.08)` oscillating to 0.15, 6000ms cycle | Full width × 44pt minimum height |
| Stone Stacker | Bottom path area, stones visible | 2–3 small stones visible along the path edge, color `#8b8178`, gentle wobble animation (±1deg, 5000ms) | 120pt × 60pt zone around stones |

Both trigger zones respond to the No Walls fallback if tapped but not held. A deliberate tap (>200ms hold) initiates the transition.

---

## Transition Timing — Universal

All scene transitions (meadow → mini-game, mini-game → meadow) use:

| Property | Value |
|---|---|
| Duration | 1500ms |
| Easing | `Curves.easeInOut` |
| Method | Cross-fade with element repositioning (not a hard cut, not a slide) |
| Moss movement | Moss slides to new position during transition at same 1500ms timing |

---

## Sound Design

**Documented decision: the Phase 2 prototype ships with minimal ambient audio and optional interaction sounds.** Sound is present but never required. Every interaction is comprehensible in silence.

### Sound Principles
- Maximum volume: **40% system volume** — app audio output is capped
- No sudden onset: all sounds fade in over minimum **200ms**
- No high-frequency tones: nothing above **4kHz** fundamental frequency
- All sound is optional: `prefers-reduced-motion` reduces to ambient-only
- Audio duck: if the child is in co-regulating state, interaction sounds reduce to 20% volume

### Sound Map

| Element | Sound | Duration | Onset | Notes |
|---|---|---|---|---|
| **Meadow ambient** | Soft wind + distant birdsong loop | Continuous | Fades in over 2000ms on meadow load | Volume: 25% max. Warm, low-frequency. No sudden bird calls. |
| **Moss tap (any state)** | Soft organic chirp — low-pitched, rounded | 300ms | 200ms fade-in | Think: wooden chime, not digital beep |
| **Glowing seed tap** | Gentle shimmer tone — rising, breathy | 500ms | 200ms fade-in | Harmonic of the ambient wind |
| **Flower tap** | Soft brush sound — like petal falling on fabric | 400ms | 200ms fade-in | Very quiet — 15% volume |
| **Grass touch** | Whisper rustle | 300ms | Immediate (natural onset) | Follows touch gesture — longer swipe = longer rustle |
| **Cloud tap** | Soft puff — like a gentle exhale | 400ms | 200ms fade-in | |
| **Path tap** | Muffled tap — soft dirt | 200ms | Immediate | Barely audible — 10% volume |
| **Rain Painter — rain falling** | Rain ambience, density-matched | Continuous while rain active | Cross-fades with density zone | Light: distant patter. Medium: steady. Heavy: rich, not harsh. |
| **Rain Painter — puddle ripple** | Single water drop | 200ms | On droplet impact | Very subtle, low volume |
| **Stone Stacker — stone pickup** | Soft scrape | 200ms | On touch-down | |
| **Stone Stacker — stone place** | Soft clack | 300ms | On release | Stone-on-stone: muted, not sharp |
| **Stone Stacker — stack fall** | **No sound** | — | — | Silence reinforces "this is not failure" |
| **Stone Stacker — water splash** | Gentle plop | 400ms | On stone entering water | |
| **Weather Report — icon tap** | Soft chime — same pitch for all four | 300ms | 200ms fade-in | All four icons produce the same sound. No hierarchy. |
| **Co-regulating ambient** | Slow drone tone, rises/falls with breath | Matches 11s cycle | Fades in with co-regulating transition | Harmonic, warm. Not a guided meditation voice. |

### Sound Asset Format
- Format: `.ogg` (Android) and `.m4a` (iOS) — dual format per asset
- Sample rate: 44.1kHz
- Total sound asset budget: < 2MB
- Carl provides sound design briefs; audio production is a separate deliverable (Phase 2 stretch — if not ready, prototype ships silent and that is acceptable)

---

## Performance Budget

**Target device floor:** iPhone SE (3rd gen) — A15 chip, 4GB RAM, 4.7" display at 750×1334.

| Metric | Target | Hard Limit |
|---|---|---|
| Frame rate | 60fps | Never below 30fps |
| Particle count (per scene) | 15 max | 25 max (all particles across all layers) |
| Simultaneous animations | 8 max | 12 max |
| Lottie render cost | < 4ms per frame | < 8ms per frame |
| Total app size (installed) | < 50MB | < 80MB |
| Memory (runtime) | < 150MB | < 250MB |

### Particle Budget Per Scene

| Scene | Moss Particles | Ambient Particles | Interaction Particles | Total Max |
|---|---|---|---|---|
| Meadow (idle) | 0–5 (state-dependent) | 4–6 | 0 | 11 |
| Meadow (interaction burst) | 0–5 | 4–6 | 4–6 (flower petals or grass motes) | 17 — recycle oldest ambient to stay under 15 |
| Rain Painter (light) | 0 | 0 | 3–5 droplets | 5 |
| Rain Painter (heavy) | 0 | 0 | 15–20 droplets + ripples | 25 — at hard limit, recycle fastest |
| Stone Stacker | 0 | 0 | 0 (physics objects, not particles) | 0 |
| Co-regulating | 6–8 | 0 (replaced by Moss particles) | 0 | 8 |

**Rule:** If particle count approaches 25, oldest/farthest particles are recycled (fade out early) before spawning new ones. Never drop frames to maintain particle count.

### Animation Priority (if frame budget is exceeded)
1. **Never drop:** Moss body animation, touch response feedback, scene transitions
2. **Reduce first:** Ambient particles (reduce count by 50%)
3. **Reduce second:** Light shimmer overlay (disable entirely)
4. **Reduce third:** Cloud drift (freeze in place)
5. **Never reduce:** Interaction response latency (100ms deadline is absolute)

---

## Reduced Motion Mode

**Trigger:** `MediaQuery.of(context).disableAnimations` (Flutter) or platform `prefers-reduced-motion`.

Reduced motion is **not a degraded experience**. It is a calmer version of the same experience. Every screen still feels intentional and warm.

### What Changes in Reduced Motion

| Element | Standard Mode | Reduced Motion Mode |
|---|---|---|
| **Moss idle breathing** | Scale oscillation 1.0→1.015/1.025→1.0 | Static at 1.0 — no oscillation. Moss is still, calm. |
| **Moss eye blink** | Periodic blink animation | Single slow blink every 15s (slower, less frequent) |
| **Moss co-regulating** | Full breathing cycle with glow pulse | Glow is static at 0.30 opacity (midpoint). Scale holds at 1.03. No oscillation. Moss appears to be in a calm meditative state — still recognizable as breathing through the glow. |
| **Moss state transitions** | Animated cross-fade over 1500–2000ms | Instant state swap with 500ms opacity cross-fade (simpler, but not jarring) |
| **Ambient particles** | 4–8 drifting particles | Disabled entirely. Meadow relies on color and texture. |
| **Flower sway** | Continuous ±3deg oscillation | Static. Flowers are still. |
| **Grass wind** | Continuous 2deg sway | Static. |
| **Cloud drift** | Continuous horizontal movement | Static. Clouds are frozen in place — they become part of the sky composition. |
| **Light shimmer** | Moving overlay | Disabled. Grass has static lighting. |
| **Glowing seed pulse** | 4000ms opacity oscillation | Static glow at 0.20 opacity (midpoint). Seed is still visually distinct. |
| **No Walls tap response** | Glow + scale 0.95→1.05→1.0 | Scale only: 1.0→1.05→1.0 over 300ms. No glow animation. Still responds — never silent. |
| **Weather icon ambient** | Per-icon animations (rotation, drift, rain drops) | Static icons. No animation. Selection feedback still works (scale up + fade others). |
| **Rain Painter droplets** | Animated falling drops | Drops appear as static streaks (paint-stroke aesthetic). No falling animation. |
| **Stone Stacker fall** | Slow cascade over 2000–3000ms | Stones teleport to scattered positions with 500ms opacity transition. No physics animation. |
| **Scene transitions** | 1500ms cross-fade | 800ms opacity cross-fade. Faster, simpler. |
| **Sound** | Full sound map | Ambient-only. No interaction sounds. |

### Reduced Motion — What DOES NOT Change
- Touch targets remain the same
- Every tappable element still responds (No Walls is never disabled)
- Weather Report still appears and functions
- Moss still transitions between states
- All interaction logic is identical
- Color palette is identical

### Design Intent
A child in reduced motion mode sees a warm, still, textured world. Moss is present. The meadow is calm. Things respond when touched. The experience is quieter, not emptier.

---

## Tablet Layout Specifications

Phone specs (375pt width) are the default throughout the design docs. This section defines tablet adaptations.

**Reference device:** iPad (10th gen) — 768×1024pt.

### General Tablet Rules
- All touch targets increase by 30% (44pt → 57pt minimum)
- Padding and spacing scale 1.5× from phone values
- Element sizes scale per the table below — not linearly with screen size

### Meadow — Tablet Adaptations

| Element | Phone (375pt) | Tablet (768pt) |
|---|---|---|
| Flower cluster count | 3–5 | 5–7 (additional clusters fill wider space) |
| Flower cluster spread | 200pt total horizontal | 500pt total horizontal |
| Grass interactive zones | 3 zones × 120pt | 4 zones × 160pt |
| Cloud count | 2–3 | 3–4 |
| Cloud size range | 80–140pt wide | 120–200pt wide |
| Glowing seed touch target | 56×56pt | 72×72pt |
| Glowing seed position | Right of center | Right of center, ~60% from left edge |
| Path width | ~60pt | ~90pt |
| Ambient particle count | 4–6 | 6–8 |
| Composition | Bottom-heavy, Moss at ~20% from bottom | Same proportions, Moss at ~22% from bottom |

### Rain Painter — Tablet Adaptations

| Element | Phone (375pt) | Tablet (768pt) |
|---|---|---|
| Rain trail width | 8pt default | 10pt default |
| Density zone boundaries | Thirds of canvas height | Same thirds — zones scale with canvas |
| Puddle count | 2–3 | 3–4 |
| Puddle size | 30–50pt | 45–70pt |
| Moss position | Bottom-left | Bottom-left, 15% from left edge |
| Return-to-meadow zone | Bottom 60pt | Bottom 72pt |

### Stone Stacker — Tablet Adaptations

| Element | Phone (375pt) | Tablet (768pt) |
|---|---|---|
| Stone count in lineup | 8–12 | 10–14 |
| Stone size range | 30–50pt wide | 40–65pt wide |
| Stone touch target | bounding box + 8pt | bounding box + 12pt |
| Stacking area width | Center 200pt | Center 300pt |
| Water area | Full width behind stack | Full width, more visible on wider screen |
| Moss position | Right side | Right side, ~80% from left edge |
| Return-to-meadow zone | Bottom 60pt | Bottom 72pt |

### Weather Report — Tablet Adaptations

| Element | Phone (375pt) | Tablet (768pt) |
|---|---|---|
| Icon size | 56×56pt | 72×72pt |
| Icon touch target | 72×72pt | 96×96pt |
| Icon spacing | ~20pt gap | ~32pt gap |
| Icon row width | ~300pt total | ~420pt total |
| Overlay backdrop blur | 8px | 12px |

---

## Accessibility Checklist

| Requirement | Specification |
|---|---|
| Touch targets | Minimum 44×44pt phone, 57×57pt tablet |
| Color contrast | All text-equivalent elements meet 3:1 minimum — see SENSORY-SAFETY-AUDIT.md |
| Motion sensitivity | Full reduced motion spec above — not a degraded experience |
| Sensory safety | All animations below 1 Hz flicker threshold — see SENSORY-SAFETY-AUDIT.md |
| No text dependency | Every interaction operable without reading. No instructional text anywhere in child-facing UI. |
| No audio dependency | All interactions visual-first. Sound optional. Prototype functions in silence. |
| Performance | 60fps target, 30fps floor on iPhone SE — see Performance Budget above |

---

## Complete Element Cross-Reference

Every element in PROTOTYPE-SCOPE.md mapped to its interaction spec:

| PROTOTYPE-SCOPE Element | Interaction Document | Specific Section |
|---|---|---|
| Moss (Resting) | MOSS-CHARACTER-SPEC.md | State 1 — Resting |
| Moss (Calm Active) | MOSS-CHARACTER-SPEC.md | State 2 — Calm Active |
| Moss (Co-regulating) | MOSS-CHARACTER-SPEC.md | State 3 — Co-regulating |
| Companion Discovery | MOSS-CHARACTER-SPEC.md | Companion Discovery |
| Meadow Biome | MEADOW-ART-DIRECTION.md | Full document |
| Glowing Seed | MEADOW-ART-DIRECTION.md | Element 1 |
| Flowers | MEADOW-ART-DIRECTION.md | Element 2 |
| Grass | MEADOW-ART-DIRECTION.md | Element 3 |
| Clouds | MEADOW-ART-DIRECTION.md | Element 4 |
| Ground Path | MEADOW-ART-DIRECTION.md | Element 5 |
| Rain Painter | MINIGAME-VISUAL-SPEC.md | Rain Painter |
| Stone Stacker | MINIGAME-VISUAL-SPEC.md | Stone Stacker |
| Weather Report | INTERACTION-PATTERNS.md | Weather Report |
| No Walls fallback | INTERACTION-PATTERNS.md | No Walls Fallback Pattern |

**Zero elements in PROTOTYPE-SCOPE.md are left visually undefined.**
