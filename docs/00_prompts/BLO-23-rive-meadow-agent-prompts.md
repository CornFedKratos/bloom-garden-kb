# BLO-23 — Rive AI Agent Prompts: Meadow Scene
# Authored by: Carl (Sr UI/UX)
# For: Don to paste into Rive AI Agent panel, one layer at a time
# Status: APPROVED — annotation approved 2026-03-23
# Companion to: BLO-23-rive-world-rebuild.md

---

## How to Use This File

1. Open Rive Early Access on your Mac
2. Create a new file → name it `meadow`
3. Create an artboard named "Meadow" — set to 390x844 (iPhone 14 Pro dimensions)
4. Open the AI Agent panel (left sidebar)
5. Paste each prompt below **one at a time**, in order
6. Review the output after each prompt before proceeding to the next
7. Iterate on any layer that doesn't feel right before moving on
8. When all 6 layers are complete, export as `meadow.riv`

**Build order matters.** Each layer builds on the previous one. Don't skip ahead.

---

## Layer 1 of 6 — Sky and Ground (Static Foundation)

Paste this into the Rive AI Agent:

```
Create the background for a children's therapeutic garden scene.

The artboard is 390x844 pixels (portrait phone).

Background layers from top to bottom:
- Sky: vertical gradient from #c4d8e8 (top) to #e8dfd2 (bottom, at about 60% height). Soft, warm dawn light.
- Ground: starts at about 60% from top. Rich garden green #6b8f5e with subtle darker patches #4a6b40 for depth.
- A gentle winding path across the lower portion in warm sandy color #c4b49a, about 30px tall, positioned at about 15% from the bottom. Soft rounded edges, no hard lines.

Style: illustrated storybook, soft edges, warm tones. Think watercolor picture book for young children. No harsh lines, no pure black, no pure white. Everything should feel safe and gentle.

Do not add any characters, animals, or interactive elements yet. This is just the sky, ground, and path.
```

**Review checkpoint:** Does the sky feel like early morning? Does the ground feel like soft garden earth? Is the path inviting, not geometric?

---

## Layer 2 of 6 — Ambient Environment (Grass, Clouds, Birds)

```
Add ambient environment elements to the existing meadow scene.

GRASS (foreground, bottom of scene):
- 3 clusters of soft grass blades along the bottom edge
- Each cluster is about 120px wide, 60px tall
- Colors: #6b8f5e base, #8aab78 highlights on some blades
- Animate ALL grass with a gentle continuous swaying motion
- Sway: ±2 degrees rotation from the base, over a 7 second cycle
- Easing: ease-in-out, continuous loop
- Each cluster should have slightly different timing offsets so they don't sway in perfect sync

CLOUDS (upper sky area):
- 3 soft clouds positioned in the top 15% of the scene
- Cloud colors: white at 60% opacity
- Organic rounded shapes — overlapping circles, not geometric
- One cloud should be slightly larger (140px wide), the other two smaller (100-120px)
- Animate all clouds drifting very slowly from left to right
- Drift: move about 20% of artboard width over 30 seconds, then loop seamlessly
- This is extremely slow — barely perceptible movement

BIRDS (background, small):
- 2 tiny simple bird silhouettes in the upper sky
- Very small — about 12-15px wingspan
- Dark but not black: #2d3b2e at 40% opacity
- Animate them drifting in gentle arcs across the sky
- Arc: slow lazy curves over 20 seconds, continuous loop
- They should drift independently, not in formation

All animation speeds should feel meditative. Nothing sudden. Nothing fast. A child should be able to stare at this screen and feel calm.
```

**Review checkpoint:** Is there ambient life? Does the world breathe without anyone touching it? Are the clouds barely moving? Does the grass feel like wind, not vibration?

---

## Layer 3 of 6 — Glowing Seed and Flowers

```
Add interactive garden elements to the meadow scene.

GLOWING SEED (the most important element — draws the child's eye):
- Position: right of center (about 65% from left), sitting on the ground area at about 28% from the bottom
- Shape: small teardrop, about 20px tall, pointing upward
- Color: warm gold #d4a843
- AMBIENT ANIMATION (always playing, no interaction needed):
  - Soft glow pulse around the seed
  - Glow radius expands from 16px to 22px and back
  - Glow opacity cycles between 0.15 and 0.25
  - 4 second cycle, ease-in-out, continuous loop
  - This is the one element that gently says "something is here" to the child
- Add a small inner highlight dot: #f5ede0 at the top of the teardrop, 3px

FLOWER CLUSTERS (4 clusters, positioned around the meadow):
- Cluster 1: left side, about 8% from left, 35% from bottom
- Cluster 2: about 22% from left, 30% from bottom
- Cluster 3: right side, about 15% from right, 33% from bottom
- Cluster 4: about 30% from right, 28% from bottom
- Each cluster: a simple 5-petal flower with stem
- Petal color: warm rose #c8a4a5
- Stem color: #6b8f5e (same as grass)
- Center dot: #d4a843 (firefly gold)
- Size: about 40-50px tall including stem
- AMBIENT ANIMATION: very gentle sway, ±3 degrees, 5 second cycle
- Each flower should have a different timing offset

Do not add tap interactions yet — those come in a later step. For now, just the visual elements with their ambient animations.
```

**Review checkpoint:** Does the seed draw your eye without being aggressive? Do the flowers feel like they belong in the grass? Is everything swaying at different rhythms — organic, not mechanical?

---

## Layer 4 of 6 — Moss the Companion

```
Add the main character "Moss" to the meadow scene. Moss is a small tortoise. He is the heart of this app.

IMPORTANT: Moss must feel warm, safe, and gentle. He is designed for autistic children aged 4-12. Nothing about him should feel alarming, demanding, or distressed.

MOSS DESIGN:
- Position: centered horizontally, about 15% from the bottom of the screen
- Size: about 70px wide, 55px tall (the body/shell)
- He is a small, simple, rounded tortoise viewed from a 3/4 front angle

Body parts:
- SHELL: rounded oval, color #5a6b4e (moss green). Subtle lighter arc on top #7a8f6a. Subtle shadow on underside #3d4a36.
- HEAD: extends from the left side of shell. Color #8b7d6b (warm brown). Small, rounded, gentle. Highlight on top #a39585.
- EYES: two small ovals on the head. Color #2d3b2e (deep green-black). Each eye has a tiny glint dot #f5ede0 in the upper corner. Eyes should be 60% open (half-lidded, sleepy, at peace).
- LEGS: two small rounded stubs visible — front-left and back-right. Color matches head #8b7d6b.
- TAIL: tiny rounded nub on the right side of shell. Same color as legs.

MOSS DEFAULT STATE — "RESTING":
- Eyes 60% open — sleepy, content, not asleep
- Breathing animation: the entire body gently scales up and down on the Y axis
  - Scale: 1.0 to 1.015 (barely perceptible — 1.5% expansion)
  - Cycle: 6000ms (6 seconds), ease-in-out, continuous loop
- Blink animation: eyes close to 10% and reopen
  - Close: 400ms, hold: 200ms, open: 400ms = 1000ms total
  - Trigger randomly every 8-12 seconds
- Head is slightly tucked toward the shell
- No glow, no particles

Moss should start HIDDEN (fully transparent, opacity 0). He will be revealed later through a discovery animation. For now, set him up but make him invisible by default.

Create a state machine called "moss" with a state called "mossResting" containing these animations.
```

**Review checkpoint:** Does Moss look like a creature you'd trust to sit with a scared child? Is the breathing barely visible — a living thing, not a bouncing object? Do the eyes feel peaceful, not vacant?

---

## Layer 5 of 6 — Moss States (Calm Active + Co-Regulating)

```
Add two more states to the "moss" state machine for the Moss character.

Create a number input called "mossState" on the moss state machine:
- Value 0 = mossResting (already built)
- Value 1 = mossCalmActive
- Value 2 = mossCoRegulating

STATE: mossCalmActive (Moss is awake and gently engaged)
- Eyes: open to 100% (fully open, alert but calm)
- Breathing: scale Y 1.0 to 1.025, cycle 5000ms (slightly faster than resting)
- Shell highlight #7a8f6a becomes slightly brighter — shifts to #92a87e (shimmer)
- Head: slightly elevated, no longer tucked
- Add a number input called "headTrackX" (range -1.0 to 1.0)
  - This controls head rotation: -1.0 = 15 degrees left, 0 = center, 1.0 = 15 degrees right
  - Head rotation should animate smoothly over 800ms when the value changes
  - This lets Flutter point Moss's head toward where the child is touching
- Blink interval: slightly faster, every 6-10 seconds (more alert)

STATE: mossCoRegulating (Moss demonstrates slow breathing — this is the clinical mechanic)
- Eyes: 80% open (meditative, not sleepy)
- BREATHING CYCLE — THIS TIMING IS EXACT AND NON-NEGOTIABLE:
  - INHALE: 4000ms — scale Y from 1.0 to 1.06, ease-in-out
  - HOLD: 1000ms — scale stays at 1.06
  - EXHALE: 6000ms — scale Y from 1.06 to 1.0, ease-in-out
  - Total cycle: 11000ms (11 seconds), continuous loop
- GLOW: add a soft radial glow behind Moss
  - Color: #4a7c59 (moss green)
  - Glow opacity synced to breathing:
    - Inhale: 0.25 to 0.40
    - Hold: stays at 0.40
    - Exhale: 0.40 to 0.25
  - Blur radius: about 20px
- The glow expanding and contracting with the breath is what makes this feel like a living breathing exercise

TRANSITIONS between states:
- Resting → Calm Active: 800ms crossfade, head lifts, eyes widen
- Calm Active → Co-Regulating: 2000ms, head lowers slightly, eyes narrow to 80%, glow fades in from 0 to 0.25
- Co-Regulating → Calm Active: completes current breath cycle first (up to 11s), then transitions over 1500ms
- Any state → Resting: 2000ms settle, head tucks, eyes narrow to 60%

Create a boolean input called "reducedMotion". When true:
- Moss shows as static (no breathing oscillation)
- Eyes stay at the openness for the current state
- Glow stays at midpoint 0.32 opacity (if in co-regulating)
- No particles, no shimmer
```

**Review checkpoint:** Watch the co-regulating state for 30 seconds. Does it make YOU want to breathe slower? That's the test. If the glow and scale feel mechanical, iterate until they feel organic. The 4/1/6 timing is non-negotiable but the easing can be adjusted.

---

## Layer 6 of 6 — Interactions and Discovery

```
Add tap interactions and the Moss discovery sequence.

INTERACTION STATE MACHINE — create a state machine called "interactions":

Add these trigger inputs:
- flowerTap (trigger) — when fired, the nearest flower plays a petal scatter animation:
  - 3-5 small petal shapes (#c8a4a5 at 60% opacity) drift outward and down
  - Distance: about 30-40px from the flower center
  - Duration: 500ms, ease-out
  - Petals fade to 0% opacity as they drift

- grassTouch (trigger) — when fired, the nearest grass cluster bends:
  - Bend: 15 degrees in one direction over 400ms
  - Return: back to neutral over 800ms
  - Easing: ease-out for bend, ease-in-out for return

- cloudTap (trigger) — when fired, the tapped cloud gently puffs:
  - Scale: 1.0 to 1.08 over 400ms, then back to 1.0 over 400ms
  - Opacity: brightens from 0.6 to 0.8, then returns
  - Total: 800ms

- seedTap (trigger) — when fired, the glowing seed bursts:
  - Glow flares from 0.25 to 0.6 opacity over 200ms
  - 8-12 tiny gold particles (#d4a843 at 50% opacity) burst outward
  - Particles travel 30-40px over 600ms, fading out
  - Seed scale: 1.0 to 1.15, back to 1.0 over 600ms

- pathTap (trigger) — when fired, a subtle shimmer pulse at the path:
  - Brief highlight sweep: #f5ede0 at 15% opacity, 400ms

RIVE EVENTS — fire these events so Flutter can play sounds:
- When flowerTap fires → emit event "onFlowerTap"
- When grassTouch fires → emit event "onGrassTouch"
- When cloudTap fires → emit event "onCloudTap"
- When seedTap fires → emit event "onSeedTap"
- When pathTap fires → emit event "onPathTap"

DISCOVERY STATE MACHINE — create a state machine called "discovery":
- Add a boolean input "mossVisible" (default false)
- Add a trigger input "discoverMoss"
- Default state: mossHidden — Moss is at 0% opacity
- When discoverMoss fires:
  1. Small grass rustle animation at Moss's position (1200ms)
  2. 3-5 tiny particles (#d4a843 at 30% opacity) rise from the grass
  3. Moss fades in: opacity 0% to 100%, scale 0.8 to 1.0, over 2000ms
  4. Easing: ease-out
  5. After fade-in completes: set mossVisible to true, emit event "onMossDiscovered"
  6. Moss begins in Resting state

TRIGGER ZONES — add hit areas for navigation:
- Top 20% of artboard: when tapped with a long press, emit event "onRainPainterEntry"
- Bottom path area near the decorative stones: when tapped with long press, emit event "onStoneStackerEntry"

Add the reducedMotion boolean input to the "interactions" state machine as well.
When reducedMotion is true:
- Tap responses use scale only (no glow, no particles)
- Seed shows static glow at 0.20 opacity midpoint
```

**Review checkpoint:** Tap every element. Does every single thing respond? That's the No Walls principle — a child never touches silence. Then trigger the discovery sequence. Does Moss's appearance feel quiet, personal, magical? Not a fanfare — a small, warm moment.

---

## Final Export Checklist

Before exporting `meadow.riv`:

- [ ] Grass sways without touching anything
- [ ] Birds drift across the sky
- [ ] Clouds move almost imperceptibly
- [ ] Seed pulses with warm glow
- [ ] Every tappable element responds (flowers, grass, clouds, seed, path)
- [ ] Moss discovery plays: rustle → particles → fade in
- [ ] Moss Resting: barely-visible breathing, sleepy eyes, occasional blink
- [ ] Moss Calm Active: alert eyes, head tracking works, faster breathing
- [ ] Moss Co-Regulating: 4s/1s/6s breath cycle, glow synced, meditative eyes
- [ ] reducedMotion input disables ambient motion cleanly
- [ ] No animation feels fast, sudden, or alarming
- [ ] File size < 1.5MB (flag if approaching 2MB)
- [ ] Artboard name is "Meadow"
- [ ] State machines named exactly: "ambient", "moss", "interactions", "discovery"

Export as `meadow.riv` → save to `bloom-garden-app/assets/animations/meadow.riv`

---

*Carl — Sr UI/UX, Bloom Garden*
*The world should breathe before the child touches anything.*
