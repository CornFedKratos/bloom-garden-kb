# Mini-Game Visual Specification
**Games:** Rain Painter, Stone Stacker
**Phase:** 2 — Prototype
**Author:** Carl (Sr UI/UX Engineer)
**Status:** PENDING Don approval

---

> **Updated 2026-03-23:** All Rain Painter and Stone Stacker visual assets (sky, puddles, rainbow, stones, water, shore) are produced via the Recraft AI visual pipeline (see `docs/02_product-decisions/RECRAFT-VISUAL-PIPELINE.md`). The visual descriptions and physics specs in this document remain authoritative — Recraft prompts are derived from this spec.

## Shared Mini-Game Principles

- No score. No timer. No failure state. No "game over."
- Every interaction produces beauty, never punishment.
- Moss is always present and visible during mini-games.
- Animation speed: 0.3× standard throughout.
- Transition in/out of mini-games is seamless — no loading screens, no modal transitions.
- Touch targets: minimum 44×44pt.
- If the child does nothing, the scene remains beautiful and calm. Inaction is not failure.

---

## Rain Painter

### Overview
The child paints rain in the sky. Touch and drag creates rain trails. Different areas of the sky produce different rain densities. Moss watches from below, near puddles. There is no wrong way to paint.

### Sky Canvas

| Property | Value |
|---|---|
| Background gradient top | #8fa4b8 | Soft grey-blue, overcast but warm |
| Background gradient bottom | #c4c0b6 | Warm grey, meets the ground |
| Canvas area | Full screen above ground plane (~70% of viewport) |

### Rain Brush — Touch/Drag Trail

| Property | Value |
|---|---|
| Trail color | rgba(160, 190, 210, 0.6) | Soft blue-grey |
| Trail width | 6–10pt (varies with touch pressure if available, otherwise 8pt default) |
| Trail fade | Trail segment fades from 0.6 → 0 opacity over 3000ms after drawn |
| Trail easing | Drawn segments use `Curves.easeOut` for fade |

When the child drags their finger, a soft translucent trail follows. Rain droplets fall from the trail.

### Rain Droplets

| Property | Value |
|---|---|
| Droplet color | rgba(160, 190, 210, 0.4) |
| Droplet size | 2–4pt (randomized) |
| Fall speed | 1.5pt/frame at 0.3× multiplier |
| Spawn rate | Proportional to trail length in zone — see density zones |
| Droplet shape | Elongated ellipse (1.5:1 aspect ratio) |

### Three Density Zones
The sky canvas is divided into three horizontal zones. The zone where the child draws determines rain density.

| Zone | Screen Position | Density | Droplets/second | Visual |
|---|---|---|---|---|
| Light | Top third of canvas | Gentle mist | 3–5 per trail segment | Fine, sparse drops |
| Medium | Middle third | Steady rain | 8–12 per trail segment | Regular drops, some streaks |
| Heavy | Bottom third | Downpour | 15–20 per trail segment | Thick drops, splash particles on ground |

**Zone boundaries are invisible** — no lines, no markers. The child discovers them by painting.

**Zone transition:** When the child paints across zone boundaries, density cross-fades over 500ms. No abrupt change.

### Ground and Puddles

| Property | Value |
|---|---|
| Ground color | #8b7d6b (soil palette) |
| Puddle color | rgba(160, 190, 210, 0.3) |
| Puddle shape | Organic ovals, 30–50pt wide |
| Puddle count | 2–3, appear gradually as rain accumulates |
| Puddle ripple on droplet impact | Concentric ring, 0.3 opacity → 0, 12pt radius, 600ms |

Puddles grow slowly as the child paints more rain. They never overflow or flood — the scene stays calm regardless of how much rain is painted.

### Moss During Rain Painter

| Property | Value |
|---|---|
| Position | Bottom-left, near the largest puddle |
| State | Calm Active — watching the rain |
| Head tracking | Follows falling rain droplets, not child's touch |
| Reaction to heavy rain | Moss tucks head slightly toward shell — cozy, not alarmed |
| Touch response | Standard Calm Active tap response (nod + shimmer) |

### Rainbow

| Property | Value |
|---|---|
| Trigger | Child has painted in all three density zones at least once |
| Appearance | Fades in over 3000ms after trigger condition met |
| Position | Upper-right arc of sky canvas |
| Colors | Desaturated, warm: `#d4a0a0`, `#d4c4a0`, `#a0c4a0`, `#a0b4c4`, `#b0a0c4` |
| Opacity | 0.35 — subtle, not vivid |
| Easing | `Curves.easeIn` for fade-in |
| Persistence | Stays for the remainder of the session |

The rainbow is a discovery, not a reward. It appears quietly. No announcement, no fanfare. The child may or may not notice it.

### Edge Cases
- **Child paints the entire sky solid:** Still looks beautiful. Rain falls everywhere evenly. Puddles are full. Rainbow appears. Moss is cozy.
- **Child does not paint at all:** The sky stays calm and grey-blue. Moss watches. Nothing happens. This is fine.
- **Child only paints in one zone:** Rain falls at that density only. No indication they "should" try other zones.

### Transition In
- From meadow: child taps a trigger area in the upper sky of the meadow
  - Trigger area: top 20% of meadow screen, 44pt minimum height
  - Sky darkens subtly over 1500ms to Rain Painter palette
  - Ground transitions from grass to rain-ground over 1500ms
  - Moss walks (slides) to puddle position over 1000ms
  - Easing: `Curves.easeInOut`

### Transition Out
- Child-led: a "return to meadow" area at the bottom edge of screen
  - Area: bottom 60pt, full width
  - Visual: faint meadow grass peeks up from bottom edge
  - Tap: reverse of transition in — sky lightens, ground returns to grass
  - Duration: 1500ms
  - Moss walks back to meadow center position

---

## Stone Stacker

### Overview
The child stacks river stones one by one. Physics are real but forgiving. When the stack falls, it falls slowly and softly. Moss watches with gentle curiosity — never alarm. There is no target height, no score, no failure.

### Background

| Property | Value |
|---|---|
| Background | River scene — soft flowing water behind the stacking area |
| Water color | rgba(120, 155, 175, 0.4) over `#c4c0b6` base |
| Water animation | Slow horizontal drift, 0.15pt/frame at 0.3× multiplier |
| Water ripple | Subtle sine-wave distortion, 2px amplitude, 8000ms period |
| Bank/shore | #c4b49a (same as meadow path) — stones rest on this |

### River Stones

| Property | Value |
|---|---|
| Stone count available | 8–12 stones lined up along the bottom |
| Stone colors | `#8b8178`, `#9a9084`, `#7a7268`, `#a39890` — warm grey-brown range |
| Stone size | 30–50pt wide, 20–35pt tall (varied, organic shapes) |
| Stone shape | Rounded rectangles with asymmetric corners — no two identical |
| Stone texture | Subtle noise overlay at 5% opacity |
| Touch target | Stone bounding box + 8pt padding (minimum 44×44pt) |

### Pick Up Interaction

| Phase | Animation | Duration | Easing |
|---|---|---|---|
| Touch down | Stone lifts from lineup: translate-y -8pt, scale 1.0 → 1.05 | 300ms | `Curves.easeOut` |
| Drag | Stone follows touch point with 60ms lag (smooth follow, not snappy) | Continuous | Lerp 0.15 |
| Shadow | Drop shadow appears beneath stone: `rgba(45, 59, 46, 0.15)`, blur 12px | 300ms fade-in | `Curves.easeOut` |

### Place Interaction

| Phase | Animation | Duration | Easing |
|---|---|---|---|
| Release | Stone drops to nearest valid position (top of stack or ground) | 400ms | `Curves.decelerate` |
| Settle | Gentle wobble: rotation -2deg → +1.5deg → -0.5deg → 0 | 800ms | `Curves.easeOut` |
| Shadow | Shadow shrinks to resting size: blur 6px, opacity 0.1 | 400ms | `Curves.easeOut` |
| Sound cue | Soft stone-on-stone tap (optional — Carl recommends, Don decides) | — | — |

### Stack Physics

| Property | Value |
|---|---|
| Gravity | 0.3× standard — everything falls slowly |
| Balance threshold | Generous — stone must be >60% off-center of stone below to fall |
| Wobble on placement | Each new stone causes the stack to wobble: ±1deg, 600ms settle |
| Maximum practical height | ~6–7 stones before balance becomes difficult (not enforced, just physics) |

### Stack Fall

**This is the most critical moment in Stone Stacker. The fall must NOT feel like failure.**

| Property | Value |
|---|---|
| Fall trigger | Stone placed >60% off-center, or cumulative wobble exceeds threshold |
| Fall speed | 0.3× standard gravity — slow, gentle cascade |
| Fall direction | Stones tumble outward from stack center, not straight down |
| Stone rotation during fall | Slow tumble: max 45deg/second |
| Landing | Stones settle on the ground plane with gentle bounce (1 bounce, 30% height) |
| Landing position | Random scatter within 80pt radius of stack base |
| Duration | 2000–3000ms from first stone dislodge to all stones settled |

**Moss's reaction to the fall:**
- Head tilts 8 degrees to one side (curiosity)
- Eyes track the falling stones (head tracking follows the topmost falling stone)
- Expression: unchanged — warm, curious. Not alarmed. Not sympathetic. Just interested.
- After stones settle: Moss returns to forward-facing over 800ms
- No sound effect on fall (silence reinforces "this is not a failure event")

**After the fall:**
- Fallen stones remain where they landed for 2000ms
- Then slowly slide back to the stone lineup along the bottom over 1500ms
  - Easing: `Curves.easeInOut`
- The child can immediately pick up and start stacking again
- No "restart" prompt, no "try again" text, no state change

### Moss During Stone Stacker

| Property | Value |
|---|---|
| Position | Right side of screen, at water's edge |
| State | Calm Active |
| Head tracking | Follows the stone being dragged (slow tracking, 800ms to target) |
| Touch response | Standard Calm Active tap response |

### Edge Cases
- **Child stacks one stone and walks away:** One stone sits on the shore. Moss watches the water. Scene stays calm.
- **Child throws stones into the water:** Stones that land off the shore/stacking area splash into the water. Splash: concentric ripple ring, 800ms, `rgba(120, 155, 175, 0.3)`. Stone sinks and returns to lineup after 2000ms.
- **Child builds an impossibly tall stack:** Physics will naturally cause it to fall. This is fine. Moss is curious either way.

### Transition In
- From meadow: child taps a trigger area near the meadow path
  - Trigger area: stones visible along the bottom of the meadow path, 60pt zone
  - Ground transitions from grass to river shore over 1500ms
  - Water fades in from behind
  - Stones slide into lineup from off-screen right over 1000ms (staggered, 100ms apart)
  - Moss walks to river-edge position
  - Easing: `Curves.easeInOut`

### Transition Out
- Same pattern as Rain Painter: bottom 60pt zone, meadow grass peeks up
- Tap: reverse transition, 1500ms
- Any stacked stones gently fall and slide off-screen before meadow returns

---

## Tablet Adaptations

Phone (375pt) values are the default throughout this document. Tablet adaptations (768pt reference) are defined in **INTERACTION-PATTERNS.md § Tablet Layout Specifications**. Key changes: larger stones, wider stacking area, more stones in lineup, larger rain trail width, more puddles. Same visual language — the mini-games scale gracefully.

## Sound Reference

Sound for both mini-games is defined in **INTERACTION-PATTERNS.md § Sound Design**. Key decisions: Rain Painter has density-matched rain ambience, Stone Stacker fall is explicitly silent (reinforces "not failure"), stone-on-stone placement is a soft clack.

## Color Token Reference

All hex values in this document map to tokens in **COLOR-TOKENS.md**. If Codey encounters a color that does not appear in COLOR-TOKENS.md, stop and ask Carl.
