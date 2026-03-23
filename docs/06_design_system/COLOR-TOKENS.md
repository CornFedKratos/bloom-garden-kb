# Color Token Map — Single Source of Truth
**Scope:** Every color used in the Phase 2 prototype
**Author:** Carl (Sr UI/UX Engineer)
**Status:** PENDING Don approval

---

## Purpose

This file is the only place Codey should pull color values from. All four design spec documents reference these tokens by name. If a hex value in another doc conflicts with this file, **this file wins**.

Codey: implement these as a `BloColors` constants class in Dart.

---

## Brand Tokens — Core Palette

These are the BLO identity colors. They appear in the KB site, the design system, and the app.

```dart
class BloColors {
  // ── Brand Core ──────────────────────────────────────────────
  static const Color moss        = Color(0xFF4a7c59);  // Primary green
  static const Color mossDark    = Color(0xFF3a6347);  // Darker moss for depth
  static const Color sage        = Color(0xFF7fb08a);  // Light green accent
  static const Color bloom       = Color(0xFFc8a4a5);  // Warm rose
  static const Color petal       = Color(0xFFe8d5c4);  // Light rose
  static const Color soil        = Color(0xFF6b4f3a);  // Body text
  static const Color dusk        = Color(0xFF2d3b2e);  // Headings, deep green-black
  static const Color dawn        = Color(0xFFf5ede0);  // Background, warm cream
  static const Color mist        = Color(0xFFe8ede9);  // Light grey-green
  static const Color firefly     = Color(0xFFd4a843);  // Accent gold
```

---

## Companion Tokens — Moss

```dart
  // ── Moss Character ──────────────────────────────────────────
  static const Color mossShell         = Color(0xFF5a6b4e);  // Shell base
  static const Color mossShellHighlight = Color(0xFF7a8f6a); // Shell light edges
  static const Color mossShellShadow   = Color(0xFF3d4a36);  // Shell depth
  static const Color mossShellShimmer  = Color(0xFF92a87e);  // Brief highlight on tap
  static const Color mossSkin          = Color(0xFF8b7d6b);  // Head, legs, tail
  static const Color mossSkinHighlight = Color(0xFFa39585);  // Skin light
  static const Color mossEyes         = Color(0xFF2d3b2e);  // Same as dusk
  static const Color mossEyeGlint     = Color(0xFFf5ede0);  // Same as dawn
```

### Moss Glow (opacity-based — use `.withOpacity()`)
```dart
  // Base glow: moss.withOpacity(0.25)
  // Peak glow (co-regulating inhale): moss.withOpacity(0.40)
  // Tap glow (resting): moss.withOpacity(0.15)
  // Ground radial min: moss.withOpacity(0.08)
  // Ground radial max: moss.withOpacity(0.18)
```

---

## Environment Tokens — Meadow

```dart
  // ── Sky ─────────────────────────────────────────────────────
  static const Color skyTop            = Color(0xFFc4d8e8);  // Soft blue-grey
  static const Color skyBottom         = Color(0xFFe8dfd2);  // Warm cream horizon
  static const Color cloudWhite        = Color(0xFFFFFFFF);  // At 0.6 opacity

  // ── Ground ──────────────────────────────────────────────────
  static const Color grassBase         = Color(0xFF6b8f5e);  // Warm green
  static const Color grassHighlight    = Color(0xFF8aab78);  // Blade tips
  static const Color grassShadow      = Color(0xFF4a6b40);  // Between tufts
  static const Color groundPath       = Color(0xFFc4b49a);  // Sandy path

  // ── Ambient ─────────────────────────────────────────────────
  static const Color ambientLight      = Color(0xFFd4a843);  // At 0.06 opacity multiply
  static const Color ambientParticle   = Color(0xFFd4a843);  // At 0.15 opacity
  static const Color lightShimmer      = Color(0xFFFFF8E6);  // At 0.06 opacity
```

---

## Mini-Game Tokens — Rain Painter

```dart
  // ── Rain Painter ────────────────────────────────────────────
  static const Color rainSkyTop        = Color(0xFF8fa4b8);  // Overcast blue-grey
  static const Color rainSkyBottom     = Color(0xFFc4c0b6);  // Warm grey ground
  static const Color rainTrail         = Color(0xFFa0bed2);  // At 0.6 opacity
  static const Color rainDroplet       = Color(0xFFa0bed2);  // At 0.4 opacity
  static const Color rainGround        = Color(0xFF8b7d6b);  // Same as mossSkin
  static const Color rainPuddle        = Color(0xFFa0bed2);  // At 0.3 opacity

  // ── Rainbow (desaturated, warm) ─────────────────────────────
  static const Color rainbowRed        = Color(0xFFd4a0a0);
  static const Color rainbowYellow     = Color(0xFFd4c4a0);
  static const Color rainbowGreen      = Color(0xFFa0c4a0);
  static const Color rainbowBlue       = Color(0xFFa0b4c4);
  static const Color rainbowPurple     = Color(0xFFb0a0c4);
  // All at 0.35 opacity
```

---

## Mini-Game Tokens — Stone Stacker

```dart
  // ── Stone Stacker ───────────────────────────────────────────
  static const Color waterBase         = Color(0xFFc4c0b6);  // River base
  static const Color waterOverlay      = Color(0xFF789baf);  // At 0.4 opacity
  static const Color waterRipple       = Color(0xFF789baf);  // At 0.3 opacity
  static const Color stoneBankShore    = Color(0xFFc4b49a);  // Same as groundPath

  // Stone palette (randomized per stone)
  static const List<Color> stonePalette = [
    Color(0xFF8b8178),
    Color(0xFF9a9084),
    Color(0xFF7a7268),
    Color(0xFFa39890),
  ];
```

---

## Weather Report Tokens

```dart
  // ── Weather Icons ───────────────────────────────────────────
  static const Color weatherSunny      = Color(0xFFd4a843);  // Same as firefly
  static const Color weatherSunnyRays  = Color(0xFFf5ede0);  // Same as dawn
  static const Color weatherCloudy     = Color(0xFFb0bec5);  // Soft blue-grey
  static const Color weatherRainy      = Color(0xFF7fa8c4);  // Soft blue
  static const Color weatherRainyCloud = Color(0xFF9ab0be);  // Lighter blue-grey
  static const Color weatherStormy     = Color(0xFF7a8a7a);  // Muted sage-grey
  static const Color weatherStormyCloud = Color(0xFF8a9a8a); // Slightly lighter
  static const Color weatherStormyGlow = Color(0xFFd4a843);  // Firefly — subtle internal glow

  // ── Overlay ─────────────────────────────────────────────────
  static const Color weatherOverlayBg  = Color(0xFFf5ede0);  // dawn at 0.85 opacity
```

---

## Shadow Tokens

```dart
  // ── Shadows ─────────────────────────────────────────────────
  static const Color mossShadow        = Color(0xFF2d3b2e);  // At 0.12 opacity
  static const Color cloudShadow       = Color(0xFF2d3b2e);  // At 0.04 opacity
  static const Color stoneDragShadow   = Color(0xFF2d3b2e);  // At 0.15 opacity
  static const Color stoneRestShadow   = Color(0xFF2d3b2e);  // At 0.10 opacity
}
```

---

## Token Naming Convention

All tokens follow: `[context][Element][Variant]`
- `moss` + `Shell` + `Highlight` → `mossShellHighlight`
- `weather` + `Stormy` + `Cloud` → `weatherStormyCloud`
- `rain` + `Droplet` → `rainDroplet`

If Codey encounters a color in any design doc that does not appear in this file, **stop and ask Carl**. Do not invent tokens.
