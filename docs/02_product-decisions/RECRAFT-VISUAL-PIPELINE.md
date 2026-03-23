# ADR — Recraft AI Visual Asset Pipeline
**Date:** 2026-03-23
**Status:** Accepted
**Decision maker:** Don Schminkey
**Session:** BLO-16 (Carl) — Lottie Moss production

---

## Decision

All visual assets in the Phase 2 prototype will be produced using Recraft AI Pro ($20/month) instead of hand-authored CustomPainter geometric primitives or hand-authored Lottie JSON.

**Assets covered:**
- Moss companion (3 states: Resting, Calm Active, Co-regulating) — SVG → Lottie conversion
- Meadow environment (background, flowers, grass, clouds, path, glowing seed)
- Rain Painter elements (sky, puddles, rainbow)
- Stone Stacker elements (stones, water, shore)
- Weather Report icons (4 states)

## Rationale

The OT observation (CIL Phase 2) evaluates whether the prototype feels intentional and calm. Geometric primitives produced by CustomPainter feel like a tech demo. A child connects with a companion differently when the character is illustrated versus when it is constructed from ovals and circles.

Recraft AI Pro generates true illustrated SVG characters and environments from text prompts, with consistent style across generations. The $20/month cost ($240/year) is justified by:
1. OT observation quality — evaluating the real product, not a placeholder
2. Unified illustration style — same artistic hand across the entire experience
3. Emotional warmth — children connect with illustrated characters

## Pipeline

```
Recraft AI Pro API (text prompt + BLO color palette + style reference)
→ SVG with illustrated bezier paths (commercial license, private generation)
→ SVG review (sensory safety, color verification against COLOR-TOKENS.md)
→ SVG-to-Lottie conversion (for animated assets: Moss states)
→ Hand-authored keyframe animation (breathing cycle, blinking, timing)
→ Commit to bloom-garden-app/assets/
→ Codey integrates into Flutter widgets
```

## What This Replaces

| Previous approach | Replaced by |
|---|---|
| CustomPainter geometric primitives for all elements | Recraft SVG illustrated assets |
| Hand-authored Lottie JSON (proposed, rejected) | Recraft SVG → Lottie conversion |
| Rive (evaluated, rejected — requires visual editor) | Recraft + svg-to-lottie CLI |

## What Does NOT Change

- COLOR-TOKENS.md — colors are unchanged; Recraft prompts specify BLO hex values
- INTERACTION-PATTERNS.md — timing, easing, No Walls all unchanged
- SENSORY-SAFETY-AUDIT.md — thresholds unchanged; all Recraft assets reviewed against them
- Flutter code architecture — Codey swaps rendering only, widget interfaces unchanged
- CustomPainter code — remains as fallback until Recraft assets are integrated

## Cost

- Recraft AI Pro: $20/month
- Estimated credits for full prototype asset set: ~1,500-2,000 (out of 4,760 available)
- Remaining credits available for Phase 3 assets

## Risks

1. Recraft API key must be stored securely — never committed to repo
2. Style consistency across sessions — use Recraft style reference feature
3. SVG complexity may affect Flutter rendering performance — simplify if needed
4. Commercial license confirmed for Pro tier — verify terms if plan changes

## Tickets

- BLO-16 — Moss Lottie (Carl) — 3 animated Lottie files
- BLO-18 — Visual Asset Sweep (Carl) — all environment and game assets
