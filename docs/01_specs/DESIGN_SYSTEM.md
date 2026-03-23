# Design System
**Project:** Bloom Garden (Codename)
**Version:** 0.1 — Directional (Carl owns final)
**Date:** 2026-03-22
**Note:** This is a directional foundation established before Carl's formal design system work. Carl's design system supersedes this document. All values here are placeholders pending Carl's session.

---

## Brand Direction

**Aesthetic:** Organic, warm, de-stimulating by design. The opposite of engagement-maximizing consumer apps. Feels like putting on a weighted blanket.

**Tone:** Gentle, unhurried, curious. Nothing demands attention. Everything invites.

**Anti-patterns (never):** High contrast, neon, fast animations, sudden sounds, sharp geometry, dark patterns, streaks, counters, failure states.

---

## Color Palette (Directional)

| Token | Hex | Usage |
|---|---|---|
| `garden-moss` | `#4a7c59` | Primary — CTAs, active states, companion accents |
| `garden-sage` | `#7fb08a` | Secondary — hover states, secondary elements |
| `garden-bloom` | `#c8a4a5` | Accent — emotional warmth moments |
| `garden-petal` | `#e8d5c4` | Light background variant |
| `garden-soil` | `#6b4f3a` | Dark text, deep accents |
| `garden-dusk` | `#2d3b2e` | Primary text |
| `garden-dawn` | `#f5ede0` | Primary background |
| `garden-mist` | `#e8ede9` | Card backgrounds |
| `garden-firefly` | `#d4a843` | Gold accents, special moments |
| `garden-slate` | `#4a5568` | Secondary text |

---

## Typography (Directional)

| Role | Font | Weight | Usage |
|---|---|---|---|
| Display | Cormorant Garamond | 300–600 | Titles, hero text, companion names |
| Body | DM Sans | 300–500 | UI labels, descriptions, parent dashboard |
| Mono | DM Mono | 400 | Status indicators, KB references, code |

---

## Animation Principles

| Principle | Value |
|---|---|
| Default animation speed | 0.3x standard app speed |
| Companion breathing cycle | 4 seconds in/out |
| Reduced motion mode | All animations suppressed — static states only |
| Transition type | Ease-in-out, no bounces or springs |
| Maximum animation duration | 800ms for UI transitions |

---

## Companion Design Constraints

- No sharp edges or angular geometry in any creature design
- Color palettes per creature pass sensory safety review — no high contrast, no neon
- Three states only: resting, calm active, co-regulating
- No distress state, ever
- Expressions convey warmth and contentment only
- All animations at maximum 0.3x standard speed

### Companion Color Palettes (Directional)

| Companion | Primary | Secondary |
|---|---|---|
| Moss (Tortoise) | `#4a7c59` | `#7fb08a` |
| Pip (Hedgehog) | `#8b6f5e` | `#c4a882` |
| Lumi (Firefly) | `#d4a843` | `#f0d080` |
| Cedar (Beaver) | `#6b4f3a` | `#a07855` |
| Fern (Bunny) | `#c8a4a5` | `#e8d5c4` |
| Slate (Owl) | `#4a5568` | `#718096` |

---

## Sound Design Principles

- No sudden or startling sounds anywhere in the product
- All audio fades in — never cuts in
- Background ambient audio at maximum 40% volume
- Companion sounds: soft, organic, non-verbal
- Mini-game audio: cause-and-effect only, no music loops that could become aversive
- Tuck-In / night mode: ambient only, no voices

---

## Touch & Interaction

| Element | Minimum Size |
|---|---|
| Touch target (iOS) | 44 × 44pt |
| Touch target (Android) | 48 × 48dp |
| Companion tap area | Full companion bounds + 20pt padding |
| Mini-game interactive zone | No element smaller than 60 × 60pt |

---

## Export Branding

For DOCX/XLSX document exports:

- **Primary color:** `#4a7c59`
- **Secondary color:** `#c8a4a5`
- **Font:** Cormorant Garamond (headings) / DM Sans (body)
- **Logo:** None yet — placeholder leaf symbol `❋` until Carl delivers final mark
