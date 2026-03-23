# Sensory Safety Audit — Phase 2 Prototype
**Scope:** Every visual element in the prototype evaluated against known sensory triggers
**Author:** Carl (Sr UI/UX Engineer)
**Status:** PENDING Don approval

---

## Purpose

This document provides the clinical rationale behind every animation timing, color choice, and interaction pattern in the prototype. When the OT observes a child using the prototype, this audit gives them a framework for understanding **why** design decisions were made, not just **what** they are.

Every entry follows the format: what the element is, what the sensory concern is, how the design addresses it, and what threshold it operates within.

---

## Flicker and Pulse Thresholds

**Clinical reference:** Photosensitive seizure threshold is 3 Hz (3 flashes/second). WCAG 2.3.1 requires no more than 3 flashes per second. For sensory-sensitive autistic children, the practical safe threshold is lower — **no rhythmic visual change faster than 1 Hz (1 cycle/second)**.

| Element | Cycle Duration | Frequency | Within Threshold? |
|---|---|---|---|
| Moss breathing glow | 11000ms (11s) | 0.09 Hz | Yes — 11× below threshold |
| Moss idle breathing (resting) | 6000ms | 0.17 Hz | Yes — 6× below threshold |
| Glowing seed ambient pulse | 4000ms | 0.25 Hz | Yes — 4× below threshold |
| Flower sway | 5000ms | 0.20 Hz | Yes — 5× below threshold |
| Cloud drift | Continuous linear | N/A (no oscillation) | N/A — no flicker risk |
| Grass wind sway | 7000ms | 0.14 Hz | Yes — 7× below threshold |
| Weather icon ambient anims | 2000–20000ms range | 0.05–0.5 Hz | Yes — all below threshold |
| Stormy icon internal glow | 3000ms | 0.33 Hz | Yes — 3× below threshold |
| No Walls fallback | 400ms single pulse | One-shot, not repeating | N/A — no flicker risk |

**Rationale for 0.3× speed multiplier:** At standard animation speed, many UI animations operate at 200–400ms cycles. At 0.3×, these become 600–1200ms+ cycles, placing them well below any flicker concern. The 0.3× multiplier is not just an aesthetic choice — it is a sensory safety mechanism.

---

## Motion Velocity Limits

**Clinical reference:** Rapid on-screen motion can trigger vestibular discomfort in children with sensory processing differences. The concern is not speed per se but **unexpected** speed and **large-displacement** motion.

| Element | Max Velocity | Displacement | Assessment |
|---|---|---|---|
| Moss state transitions | Scale change over 1500–2000ms | 6% body size max | Safe — slow, small |
| Cloud drift | 0.2pt/frame at 0.3× | Crosses full screen over ~60s | Safe — imperceptibly slow |
| Ambient particles | 0.3pt/frame | Random drift, 15–25pt total | Safe — very slow, no direction bias |
| Grass bend (on touch) | 12–18deg over 400ms | Local to touch zone | Safe — small, triggered by child |
| Stone fall | 0.3× gravity | 200–400pt over 2000–3000ms | Safe — explicitly designed to be slow and gentle |
| Flower petal scatter | 20–30pt over 1500ms | Small, upward drift | Safe — small displacement, slow |
| Rain droplet fall | 1.5pt/frame at 0.3× | Full canvas height over ~3s | Moderate — acceptable because child initiates the rain |
| Scene transitions | 1500ms cross-fade | No displacement — elements fade/reposition | Safe — no sliding or flying |

**Key principle:** The child controls the fastest elements. Rain falls because the child painted it. Stones fall because the child placed them. The environment never moves faster than the child's actions caused.

---

## Color Contrast and Saturation

**Clinical reference:** High-saturation colors and high-contrast boundaries can be overstimulating for sensory-sensitive children. The BLO palette is intentionally desaturated and warm.

| Color Pair | Contrast Ratio | Assessment |
|---|---|---|
| Soil text (#6b4f3a) on Dawn bg (#f5ede0) | 4.8:1 | Meets WCAG AA (4.5:1 min) without being harsh |
| Dusk heading (#2d3b2e) on Dawn bg (#f5ede0) | 9.2:1 | Meets WCAG AAA — high contrast but warm tones prevent harshness |
| Moss (#4a7c59) on Dawn bg (#f5ede0) | 3.9:1 | Meets WCAG AA for large text/graphics (3:1 min) |
| Firefly (#d4a843) on Dawn bg (#f5ede0) | 2.1:1 | Below text threshold — used only for decorative elements, never for text |
| Weather icons on overlay (dawn 85%) | 3.1–4.5:1 range | All meet large graphic minimum |

**Saturation ceiling:** No color in the prototype exceeds 60% HSL saturation. The most saturated color is moss (#4a7c59) at 25% saturation. This is intentionally muted.

**No pure black or pure white:** The darkest color is dusk (#2d3b2e). The lightest is dawn (#f5ede0). This avoids hard contrast edges.

---

## Sudden Change Assessment

**Clinical reference:** Unexpected environmental changes can trigger startle responses. Every state change in the prototype is either child-initiated or eased in gradually.

| Event | Onset Type | Duration | Rationale |
|---|---|---|---|
| Moss appears (discovery) | Gradual fade-in | 2000ms | Child's third interaction triggers it — not random |
| Weather Report appears | Gradual fade-in | 800ms | Moss initiates with visual cue first (head tilt) |
| Weather Report dismisses | Gradual fade-out | 800ms + 1000ms if ignored | Never abrupt |
| Scene transition (meadow → mini-game) | Cross-fade | 1500ms | No hard cut, no sliding |
| Stone stack falls | Slow cascade | 2000–3000ms | 0.3× gravity, explicitly gentle |
| Rain Painter rainbow appears | Gradual fade-in | 3000ms | Slowest appearance in the prototype |
| No Walls tap response | Single pulse | 400ms | Triggered by child's own touch — expected |

**No event in the prototype occurs without either the child initiating it or a visual lead-in of at least 800ms.**

---

## Sound Sensory Safety

See SOUND-DESIGN section in INTERACTION-PATTERNS.md.

**Key thresholds:**
- Maximum volume: 40% system volume
- No sudden onset sounds — all audio fades in over minimum 200ms
- No high-frequency tones (nothing above 4kHz fundamental)
- All sound is optional — prototype functions fully without audio
- `prefers-reduced-motion` also reduces sound to ambient-only (no interaction sounds)

---

## Reduced Motion Experience

See detailed spec in INTERACTION-PATTERNS.md § Reduced Motion Mode.

**Principle:** Reduced motion is not a degraded experience. It is a calmer version of the same experience. Every screen still feels intentional, warm, and alive — through color, texture, and static composition rather than movement.

---

## OT Observation Reference

When the OT evaluates the prototype, this audit provides the "why" behind each design decision:

| OT Might Ask | Carl's Answer | Reference |
|---|---|---|
| "Why does everything move so slowly?" | 0.3× speed is a sensory safety mechanism — keeps all animation well below flicker thresholds and reduces vestibular load | Flicker thresholds table above |
| "Is the breathing cycle recognizable?" | 11s cycle with 6% body scale change — designed to be visible but not attention-demanding | MOSS-CHARACTER-SPEC.md § State 3 |
| "Could the stone fall scare the child?" | Fall takes 2–3 seconds, Moss shows neutral curiosity, no sound effect, stones gently return | MINIGAME-VISUAL-SPEC.md § Stack Fall |
| "Is the stormy icon alarming?" | Muted sage-grey, no lightning bolt, internal glow instead — "big feelings" not "danger" | INTERACTION-PATTERNS.md § Weather Report |
| "What about children who need less visual stimulation?" | `prefers-reduced-motion` mode removes particles, loops, and ambient animation — all interactions still work | INTERACTION-PATTERNS.md § Reduced Motion |
| "Are the colors too stimulating?" | No color exceeds 60% saturation, no pure black/white, warmth palette throughout | Color contrast table above |
