# Meadow — Art Direction Specification
**Biome:** Meadow (Morning State)
**Phase:** 2 — Prototype
**Author:** Carl (Sr UI/UX Engineer)
**Status:** PENDING Don approval

---

## Overall Palette and Mood

The meadow is the child's home base. It should feel like the first warm morning of spring — safe, quiet, alive with small wonders. The light is soft and golden. Nothing is harsh. The child wants to stay here.

### Sky
| Element | Hex / Value |
|---|---|
| Sky gradient top | #c4d8e8 | Soft blue-grey, not bright |
| Sky gradient bottom | #e8dfd2 | Warm cream, blending into horizon |
| Cloud color | rgba(255, 255, 255, 0.6) | Soft white, semi-transparent |
| Cloud shadow | rgba(45, 59, 46, 0.04) | Barely visible depth |

### Ground
| Element | Hex / Value |
|---|---|
| Grass base | #6b8f5e | Warm green, not saturated |
| Grass highlight | #8aab78 | Tips of grass blades catching light |
| Grass shadow | #4a6b40 | Between grass tufts |
| Ground/path | #c4b49a | Warm sandy-brown, gentle curve |
| Path edge blend | rgba(107, 143, 94, 0.3) | Soft transition from path to grass |

### Ambient Light
- Direction: upper-left (10 o'clock position)
- Quality: diffuse, warm — no hard shadows
- Color temperature: warm golden — multiply layer of `rgba(212, 168, 67, 0.06)` over entire scene
- No dynamic lighting changes in prototype (morning state only)

### Emotional Target
Safe. Curious. Quiet. Alive. A place you want to explore, not a place that demands attention.

---

## Environment Elements — Complete Inventory

Every element below is tappable. Every element has a defined response. Nothing in the meadow is inert.

---

### 1. Glowing Seed

**Visual:** A small, luminous seed shape nestled in the grass. Soft golden glow. Teardrop form, ~24pt tall.

| Property | Value |
|---|---|
| Seed color | #d4a843 (firefly gold) |
| Inner glow | rgba(212, 168, 67, 0.5) |
| Outer glow radius | 16px |
| Outer glow color | rgba(212, 168, 67, 0.2) |
| Touch target | 56×56pt |
| Position | Right of center, near Moss's resting spot |

**Ambient animation (no interaction):**
- Gentle pulse: outer glow opacity 0.15 → 0.25 → 0.15
- Duration: 4000ms per cycle
- Easing: `Curves.easeInOut`
- Continuous loop

**Tap response:**
- Glow pulse: outer glow opacity spikes to 0.6 → fades to 0.2
- Particle burst: 8–12 particles radiate outward from seed center
  - Particle color: `rgba(212, 168, 67, 0.5)`
  - Particle size: 2–4px
  - Burst radius: 40–60pt from center
  - Duration: 1200ms (particles fade out over last 400ms)
  - Easing: `Curves.easeOut`
- Seed scale: 1.0 → 1.15 → 1.0
  - Duration: 600ms
  - Easing: `Curves.easeOut`

---

### 2. Flowers (3–5 clusters)

**Visual:** Small wildflower clusters scattered across the meadow. Soft petal colors from bloom palette. Each cluster is 2–4 flowers of varying heights.

| Property | Value |
|---|---|
| Petal colors | #c8a4a5 (bloom), #e8d5c4 (petal), #d4a843 (firefly) — one color per cluster |
| Stem color | #6b8f5e (grass base) |
| Flower head size | 8–14pt diameter |
| Touch target | 56×56pt per cluster |
| Positions | Distributed: 2 left of center, 1–2 right, 1 near path edge |

**Ambient animation:**
- Gentle sway: rotation -3deg → +3deg → -3deg
- Duration: 5000ms per cycle (stagger start by 500–1000ms per cluster)
- Easing: `Curves.easeInOut`

**Tap response:**
- Petals scatter outward gently: 3–5 petal-shaped particles drift from flower
  - Particle color: matches cluster petal color at 0.6 opacity
  - Drift: upward and outward, 20–30pt travel
  - Duration: 1500ms (fade over last 500ms)
  - Easing: `Curves.easeOut`
- Flower head bobs: scale 1.0 → 0.9 → 1.1 → 1.0
  - Duration: 500ms
  - Easing: `Curves.easeOut`
- Petals regenerate after 3000ms (flower never looks broken or empty)

---

### 3. Grass (interactive zones)

**Visual:** The grass is rendered as layered tufts across the bottom 40% of the screen. Three interactive grass zones (left, center, right) respond to touch and swipe.

| Property | Value |
|---|---|
| Grass blade color range | #6b8f5e → #8aab78 (random per blade) |
| Interactive zone count | 3 zones, each ~120pt wide |
| Touch target | Full zone width × 60pt height |
| Positions | Left-third, center, right-third of ground plane |

**Ambient animation:**
- Wind sway: all grass tilts in the same direction, 2deg oscillation
- Duration: 7000ms per cycle
- Easing: `Curves.easeInOut`

**Touch/swipe response:**
- Grass blades in touched zone bend away from touch point
  - Bend angle: 12–18deg from vertical, toward nearest edge
  - Duration: 400ms to bend, 800ms to return
  - Easing: bend `Curves.easeOut`, return `Curves.easeInOut`
- Micro-particles rise from disturbed grass: 4–6 particles
  - Color: `rgba(74, 124, 89, 0.15)`
  - Size: 1–3px
  - Rise: 15–25pt upward
  - Duration: 1000ms
  - Easing: `Curves.easeOut`

---

### 4. Sky / Clouds (2–3 clouds)

**Visual:** Soft, rounded cloud shapes drifting slowly across the upper portion of the screen. Not cartoon clouds — organic, blurred-edge shapes.

| Property | Value |
|---|---|
| Cloud color | rgba(255, 255, 255, 0.6) |
| Cloud edge | Gaussian blur 12px — no hard edges |
| Cloud count | 2–3 |
| Cloud size | 80–140pt wide, 30–50pt tall |
| Position | Upper 30% of screen |

**Ambient animation:**
- Drift: left to right, 0.2pt/frame at 0.3× multiplier
- Clouds wrap around (exit right, re-enter left) seamlessly
- Slight vertical bob: ±3pt over 12000ms cycle

**Tap response:**
- Cloud briefly brightens: opacity 0.6 → 0.8 → 0.6
  - Duration: 600ms
  - Easing: `Curves.easeOut`
- Cloud gently puffs: scale 1.0 → 1.08 → 1.0
  - Duration: 800ms
  - Easing: `Curves.easeInOut`
- 2–3 tiny white particles drift downward from cloud
  - Color: rgba(255, 255, 255, 0.4)
  - Drift: 15pt downward
  - Duration: 1200ms

---

### 5. Ground Path

**Visual:** A gentle, curved sandy path running through the meadow. Not straight — organic, worn-in feeling. The path is where Moss rests.

| Property | Value |
|---|---|
| Path color | #c4b49a |
| Path width | ~60pt at widest, tapering at edges |
| Path texture | Subtle noise/grain overlay at 4% opacity |
| Touch target | Full path area |

**Tap response (No Walls fallback):**
- Brief glow pulse: `rgba(196, 180, 154, 0.3)` → fade to 0
  - Duration: 500ms
  - Easing: `Curves.easeOut`
- Scale: 0.95 → 1.05 → 1.0 (applied to a subtle radial highlight at tap point)
  - Duration: 400ms
  - Easing: `Curves.easeInOut`
- Tiny dust motes rise from tap point: 3–4 particles
  - Color: `rgba(196, 180, 154, 0.3)`
  - Size: 1–2px
  - Rise: 10–15pt
  - Duration: 800ms

---

## Ambient Animation — Passive Elements

These elements move continuously without interaction. They make the meadow feel alive.

### Wind
- Global wind direction: left to right, gentle
- Affects: grass sway, flower sway, cloud drift, ambient particles
- All wind-affected elements share the same timing phase (feels unified)

### Ambient Particles
- 4–6 floating particles always present in the scene
- Color: `rgba(212, 168, 67, 0.15)` (firefly gold, very subtle)
- Size: 1–3px
- Drift: random slow paths, 0.3pt/frame
- Fade in/out over 3000ms each (particles never pop in or out)

### Light Shimmer
- Very subtle moving light pattern on the grass surface
- Implemented as a slow-moving multiply overlay: `rgba(255, 248, 230, 0.06)`
- Movement: 0.1pt/frame, diagonal upper-left to lower-right
- Creates a sense of dappled morning light through unseen trees

---

## Composition — Layout Reference

```
┌──────────────────────────────────┐
│          Sky gradient            │  Top 30%
│      ☁         ☁                 │
│                    ☁             │
│──────────────────────────────────│
│                                  │
│    🌸      ✦seed    🌸          │  Middle 30%
│         🌸                       │
│   ═══════════════════════        │  Path
│    ~~grass~~  🐢Moss  ~~grass~~ │  Bottom 20%
│   ~~grass~~~~grass~~~~grass~~    │
└──────────────────────────────────┘
```

### Visual Hierarchy (what draws the eye first)
1. **Moss** — largest element, centered on path, warm tones contrast with green
2. **Glowing seed** — golden glow is the brightest point in the scene
3. **Flowers** — color accents (bloom pink, firefly gold) draw peripheral attention
4. **Clouds and grass** — ambient, felt more than focused on

### Depth Layers (back to front)
1. Sky gradient (furthest back)
2. Clouds
3. Far grass (small, lighter color)
4. Flowers
5. Ground path
6. Near grass (larger, darker)
7. Glowing seed
8. Moss
9. Ambient particles (foreground)

---

## Tablet Adaptations

Phone (375pt) values are the default throughout this document. Tablet adaptations (768pt reference) are defined in **INTERACTION-PATTERNS.md § Tablet Layout Specifications**. Key changes: more flower clusters, wider grass zones, larger clouds, larger touch targets. Same proportions and composition — the meadow scales gracefully, it does not rearrange.

## Color Token Reference

All hex values in this document map to tokens in **COLOR-TOKENS.md**. If Codey encounters a color that does not appear in COLOR-TOKENS.md, stop and ask Carl.
