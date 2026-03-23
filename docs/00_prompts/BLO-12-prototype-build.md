# BLO-12 — Phase 2 Prototype Build
# Execution Prompt v1.0
# Authored by: Claud3 (CPO)
# Status: PENDING Don approval before Codey executes

---

## Prompt Metadata

| Field | Value |
|---|---|
| Ticket | BLO-12 |
| Branch | `feat/blo-12-phase2-prototype` |
| Type | Feature — Flutter prototype build |
| Agent | Codey |
| Dependencies | BLO-10 (Carl design spec) ✅ + BLO-11 (repo scaffold) ✅ — BOTH must be complete |
| Blocks | OT recruitment (cannot begin until prototype exists on TestFlight) |
| Baseline test count | Established at BLO-11 session-close |
| Prompt version | 1.0 |
| Authored | 2026-03-23 |

---

## Context

BLO-10 (Carl's design spec) and BLO-11 (repo scaffold) are both complete. The prototype can now be built.

PROTOTYPE-SCOPE.md is the authoritative scope document. Carl's four design spec documents are the authoritative visual reference. This prompt is the execution brief that bridges them.

The prototype has one job: get four mechanics in front of an OT and a child. Everything else waits.

When this ticket is done, the prototype is on TestFlight and available for OT observation.

---

## Objective

Build the Phase 2 prototype in `bloom-garden-app` per PROTOTYPE-SCOPE.md and Carl's design specs. Deploy to TestFlight.

---

## File Ownership Boundaries

### Codey WILL touch (app repo only)
```
lib/
├── main.dart                               UPDATE
├── app.dart                                UPDATE
├── screens/
│   ├── meadow_screen.dart                  CREATE
│   ├── rain_painter_screen.dart            CREATE
│   ├── stone_stacker_screen.dart           CREATE
│   └── weather_report_screen.dart          CREATE
├── widgets/
│   ├── moss_companion.dart                 CREATE
│   ├── glowing_seed.dart                   CREATE
│   ├── meadow_element.dart                 CREATE
│   └── no_walls_tap_response.dart          CREATE
├── models/
│   ├── companion_state.dart                CREATE
│   └── weather_choice.dart                 CREATE
├── providers/
│   ├── companion_provider.dart             CREATE
│   └── session_provider.dart              CREATE
└── utils/
    └── blo_theme.dart                      UPDATE (expand from scaffold)
test/
├── widget_test.dart                        UPDATE
├── meadow_screen_test.dart                 CREATE
├── moss_companion_test.dart               CREATE
├── weather_report_test.dart               CREATE
└── no_walls_test.dart                     CREATE
integration_test/
└── prototype_smoke_test.dart              CREATE
```

### Codey will NOT touch
```
docs/design_system/*        (Carl owns — read only)
CLAUDE.md                   NO CHANGE
docs/06_prompts/*           NO CHANGE
Any Supabase files          NO CHANGE (prototype has no backend)
Any KB repo files           NO CHANGE (separate repo)
```

---

## Technical Specification

### Architecture
- State: Riverpod (established in BLO-11)
- Navigation: Go Router or Flutter's built-in Navigator 2.0 — Codey's call
- Animation: Flutter's built-in animation system + Lottie for companion states
- Local state: Riverpod StateNotifier — ephemeral, no persistence between launches
- No backend calls of any kind in the prototype

### Screen Flow
```
App Launch
    ↓
Meadow Screen (home base)
    ├── Tap glowing seed → glow pulse + particle (no navigation)
    ├── Tap Moss → companion response
    ├── Tap meadow elements → No Walls fallback
    ├── Tap Rain Painter trigger → Rain Painter Screen
    ├── Tap Stone Stacker trigger → Stone Stacker Screen
    └── Weather Report → appears as overlay, not separate screen
```

### Moss Companion Widget
Three states as defined in Carl's `MOSS-CHARACTER-SPEC.md`:
- `CompanionState.resting`
- `CompanionState.calmActive`
- `CompanionState.coRegulating`

Transitions between states use AnimatedSwitcher or explicit AnimationController at 0.3× speed. The co-regulating state drives a breathing animation cycle: inhale → hold → exhale. Cycle timing from Carl's spec.

State never shows distress. State never shows hunger. State never shows negative emotion.

### No Walls System
`NoWallsTapResponse` widget wraps any tappable element. On tap:
1. Glow pulse (color from element's own palette or --moss rgba)
2. Scale animation: 0.95 → 1.05 → 1.0
3. Duration: per Carl's INTERACTION-PATTERNS.md spec
4. Easing: Curves.easeInOut

Every meadow element, the glowing seed, and Moss in all states uses this wrapper or defines a specific tap response. No element is ever inert.

### Rain Painter
CustomPainter-based canvas. Touch/drag draws rain. Three density zones defined by Carl's visual spec. No score, no timer, no failure state. Child can paint the entire sky — it should still look beautiful.

### Stone Stacker
Physics simulation using Flutter's built-in or a lightweight physics package (Codey's call — document the decision). Stones have gentle wobble on settle, slow cascade on fall. Moss watches with neutral curiosity when stack falls. No negative feedback.

### Weather Report
Overlay widget — does not navigate away from the meadow. Four icons per Carl's INTERACTION-PATTERNS.md spec. Moss presents the check-in. Child taps one icon. Store the choice in Riverpod local state. No wrong answer — all four responses feel equally warm.

### Companion Discovery (Simplified Onboarding)
Shortened flow that ends with Moss appearing in the meadow. The child does not select Moss — Moss is simply there, warm, waiting. The full six-companion discovery mechanic is Phase 3.

### Animation Speed
Global animation speed multiplier: `0.3`. Apply to all AnimationController durations:
```dart
// In BloTheme or a global constant
static const double animationSpeedMultiplier = 0.3;

// Usage
AnimationController(
  duration: const Duration(milliseconds: 1000) * BloTheme.animationSpeedMultiplier,
  vsync: this,
)
```

### Test Requirements
Every new screen and widget must have:
- Widget test confirming it renders without errors
- Widget test confirming No Walls tap response fires on tap
- Widget test confirming no distress state is reachable

Minimum 10 integration tests against the running prototype covering:
- Meadow loads and Moss is visible
- Every tappable element produces a visual response
- Rain Painter canvas accepts touch input
- Stone Stacker accepts stone placement
- Weather Report overlay appears and accepts selection
- No navigation dead ends

---

## Acceptance Criteria

```gherkin
Given the prototype on TestFlight
When an OT installs and opens it
Then the meadow loads with Moss present and the glowing seed visible

Given the meadow screen
When the child taps any element
Then a visual response occurs within 100ms — no element is inert

Given Moss in any state
When the child taps him
Then Moss responds warmly — no negative expression, no alarm

Given the co-regulating state
When Moss demonstrates breathwork
Then the rise and fall is visible and followable without verbal instruction

Given Rain Painter
When the child draws rain across the entire sky
Then the result looks beautiful — no failure indication

Given Stone Stacker
When the stack falls
Then Moss's reaction is neutral curiosity — not alarm, not disappointment

Given the Weather Report
When the child selects any of the four icons
Then all four responses feel equally warm and accepted

Given any tappable element not covered by the above
When the child taps it
Then the No Walls fallback fires: glow pulse + scale 0.95→1.05→1.0

Given the prototype
When a child uses it for 60 minutes
Then flutter analyze = 0 errors and tests >= baseline throughout
```

---

## Definition of Done

- [ ] Annotation posted on BLO-12 and approved by Don
- [ ] Meadow screen live with Moss, glowing seed, interactive elements
- [ ] Moss companion in all three states with correct transitions
- [ ] Rain Painter playable end-to-end with no failure state
- [ ] Stone Stacker playable end-to-end with neutral fall response
- [ ] Weather Report overlay functional, all four icons warm
- [ ] No Walls system applied to every tappable element
- [ ] Simplified companion discovery onboarding complete
- [ ] `flutter analyze` = 0 errors
- [ ] Tests >= BLO-11 baseline + all new tests passing
- [ ] Minimum 10 integration tests passing
- [ ] Build deployed to TestFlight — install link confirmed working
- [ ] Prototype tested on physical iOS device (not just simulator)
- [ ] PR opened with `BLO-12` in title
- [ ] `/session-close` run — context exported

---

## Session Context Export Template

```markdown
---
## Session Export — [DATE] — Codey

**Branch:** feat/blo-12-phase2-prototype
**Commit hash:** [hash]

### What Changed
[List every file created or modified]

### Baseline at Session Open
- Tests: [X] passing
- Analyzer: 0 errors

### Final
- Tests: [Y] passing (+Z from baseline)
- Analyzer: 0 errors
- TestFlight build: [build number]

### Decisions Made
- Navigation approach: [what was chosen and why]
- Physics library: [what was chosen and why]
- [any other architectural decisions]

### Deviations from Prompt
- [any deviations with rationale — must be approved by Don]

### Tickets Worked
- BLO-12 — Phase 2 Prototype Build — complete

### Blocks Cleared
- OT recruitment (BLO-4) is now actionable — prototype exists on TestFlight

### TestFlight Install Link
- [link for Don to share with OT]

### Next Session Should Start With
- OT recruitment outreach — Don's action
- Any revisions requested by OT after observation
---
```
