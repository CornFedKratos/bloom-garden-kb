# BLO-24 — Rive Integration: Replace SVG/Lottie with Rive Scenes
# Integration Spec v1.0
# Authored by: Carl (Sr UI/UX) — for Codey (CTO) to execute
# Status: BLOCKED — waiting for BLO-23 meadow.riv proof of concept approval
# Dependencies: BLO-23 (Carl delivers .riv files)

---

## Prompt Metadata

| Field | Value |
|---|---|
| Ticket | BLO-24 (to be created) |
| Branch | `feat/blo-24-rive-integration` |
| Type | Refactor — rendering layer swap |
| Agent | Codey |
| Dependencies | BLO-23 (Carl's .riv files committed to assets/animations/) |
| Blocks | Emulator review — Don sees Rive world for first time |
| Prompt version | 1.0 |
| Authored | 2026-03-23 |

---

## Context

BLO-23 replaces all static SVG scenes and Lottie Moss overlay with unified Rive animated scenes. This ticket swaps the Flutter rendering layer.

**What gets removed:**
- `flutter_svg` package and all `SvgPicture.asset()` calls
- `lottie` package and all `Lottie.asset()` calls
- `MossCompanion` widget (Moss now lives inside Rive scenes)
- `_MossGlowPainter` (glow is now Rive-native)
- `_TappableSvg` helper
- `FlowerCluster`, `GrassZone`, `MeadowCloud` widgets (meadow_element.dart)
- `GlowingSeed` widget (seed is now Rive-native)
- All CustomPainter classes for weather icons, puddles, rainbow, stones

**What survives:**
- `AudioService` + all 17 audio files — intact
- `audio_provider.dart` — intact
- `CompanionState` model — intact (drives `mossState` Rive input)
- `SessionState` / `SessionProvider` — intact (interaction counting, weather choice)
- `CompanionProvider` — intact (state transitions, 45s idle timer)
- `WeatherChoice` model — intact
- `BloColors` — intact (reference, though Rive scenes embed their own colors)
- `BloTheme` — intact
- All test infrastructure (tests will be rewritten for Rive)

**What gets added:**
- `rive` package (~0.13.x)
- `RiveAnimation.asset()` per scene
- Rive state machine controllers for input/event wiring
- Rive event listeners for audio hookup

---

## Rive Scene Files

Carl delivers these to `bloom-garden-app/assets/animations/`:

| File | Artboard | State Machines |
|---|---|---|
| `meadow.riv` | "Meadow" | ambient, moss, interactions, discovery |
| `rain_painter.riv` | "RainPainter" | ambient, rain, rainbow |
| `stone_stacker.riv` | "StoneStacker" | ambient, stacking |
| `weather_icons.riv` | "WeatherIcons" | icons |

---

## Integration Architecture — Meadow Screen

### pubspec.yaml changes

```yaml
dependencies:
  # ADD
  rive: ^0.13.0

  # REMOVE
  # lottie: ^3.0.0        — Moss is now inside Rive
  # flutter_svg: ^2.0.17   — SVGs replaced by Rive

flutter:
  assets:
    - assets/animations/    # now contains .riv files alongside legacy .json
    - assets/audio/
    # REMOVE: - assets/images/   (SVGs no longer loaded at runtime)
```

### MeadowScreen rewrite pattern

```dart
import 'package:rive/rive.dart';

class MeadowScreen extends ConsumerStatefulWidget { ... }

class _MeadowScreenState extends ConsumerState<MeadowScreen> {
  // Rive controllers
  StateMachineController? _ambientController;
  StateMachineController? _mossController;
  StateMachineController? _interactionsController;
  StateMachineController? _discoveryController;

  // Rive inputs (wired in onInit callback)
  SMINumber? _mossState;        // 0=resting, 1=calmActive, 2=coRegulating
  SMINumber? _headTrackX;       // -1.0 to 1.0
  SMITrigger? _discoverMoss;
  SMITrigger? _flowerTap;
  SMITrigger? _grassTouch;
  SMITrigger? _cloudTap;
  SMITrigger? _seedTap;
  SMITrigger? _pathTap;
  SMIBool? _mossVisible;
  SMIBool? _reducedMotion;

  void _onRiveInit(Artboard artboard) {
    // Attach all 4 state machines
    _ambientController = StateMachineController.fromArtboard(artboard, 'ambient');
    _mossController = StateMachineController.fromArtboard(artboard, 'moss');
    _interactionsController = StateMachineController.fromArtboard(artboard, 'interactions');
    _discoveryController = StateMachineController.fromArtboard(artboard, 'discovery');

    if (_ambientController != null) artboard.addController(_ambientController!);
    if (_mossController != null) {
      artboard.addController(_mossController!);
      _mossState = _mossController!.findInput<double>('mossState') as SMINumber?;
      _headTrackX = _mossController!.findInput<double>('headTrackX') as SMINumber?;
      _reducedMotion = _mossController!.findInput<bool>('reducedMotion') as SMIBool?;
    }
    if (_interactionsController != null) {
      artboard.addController(_interactionsController!);
      _flowerTap = _interactionsController!.findInput<bool>('flowerTap') as SMITrigger?;
      _grassTouch = _interactionsController!.findInput<bool>('grassTouch') as SMITrigger?;
      _cloudTap = _interactionsController!.findInput<bool>('cloudTap') as SMITrigger?;
      _seedTap = _interactionsController!.findInput<bool>('seedTap') as SMITrigger?;
      _pathTap = _interactionsController!.findInput<bool>('pathTap') as SMITrigger?;
    }
    if (_discoveryController != null) {
      artboard.addController(_discoveryController!);
      _discoverMoss = _discoveryController!.findInput<bool>('discoverMoss') as SMITrigger?;
      _mossVisible = _discoveryController!.findInput<bool>('mossVisible') as SMIBool?;
    }

    // Listen for Rive events → audio
    _setupEventListeners();
  }

  void _setupEventListeners() {
    // Each state machine controller can report events
    for (final controller in [
      _ambientController, _mossController,
      _interactionsController, _discoveryController,
    ]) {
      controller?.addEventListener((event) {
        final audio = ref.read(audioServiceProvider);
        switch (event.name) {
          case 'onFlowerTap':
            audio.playInteraction(BloAudio.flowerTap);
          case 'onGrassTouch':
            audio.playInteraction(BloAudio.grassTap);
          case 'onCloudTap':
            audio.playInteraction(BloAudio.cloudTap);
          case 'onSeedTap':
            audio.playInteraction(BloAudio.glowingSeedTap);
          case 'onPathTap':
            audio.playInteraction(BloAudio.tapDefault);
          case 'onMossTap':
            _playMossTapSound();
          case 'onMossDiscovered':
            _startWeatherReportTimer();
          case 'onRainPainterEntry':
            _navigateToRainPainter();
          case 'onStoneStackerEntry':
            _navigateToStoneStacker();
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final companionState = ref.watch(companionProvider);
    // Sync companion state → Rive input
    _syncMossState(companionState);

    return Scaffold(
      backgroundColor: Colors.transparent,
      body: Stack(
        children: [
          // Single Rive scene — the entire meadow world
          Positioned.fill(
            child: RiveAnimation.asset(
              'assets/animations/meadow.riv',
              artboard: 'Meadow',
              fit: BoxFit.cover,
              onInit: _onRiveInit,
            ),
          ),

          // Weather Report overlay (still Flutter — BLO-23 Scene 4)
          if (_showWeatherOverlay && session.mossDiscovered)
            const WeatherReportOverlay(...),
        ],
      ),
    );
  }
}
```

### Companion State → Rive Sync

```dart
void _syncMossState(CompanionState state) {
  final riveValue = switch (state) {
    CompanionState.resting => 0.0,
    CompanionState.calmActive => 1.0,
    CompanionState.coRegulating => 2.0,
  };
  _mossState?.value = riveValue;
}
```

### Touch Position → Head Tracking

```dart
// In GestureDetector.onTapDown:
void _onTapDown(TapDownDetails details) {
  final screenWidth = MediaQuery.of(context).size.width;
  final normalizedX = (details.localPosition.dx / screenWidth) * 2.0 - 1.0;
  _headTrackX?.value = normalizedX.clamp(-1.0, 1.0);
}
```

### Discovery Trigger

```dart
void _recordInteraction() {
  final triggerDiscovery = ref.read(sessionProvider.notifier).recordInteraction();
  if (triggerDiscovery) {
    ref.read(companionProvider.notifier).discover();
    _discoverMoss?.fire();
    // Weather report timer starts via onMossDiscovered event from Rive
  }
}
```

---

## Integration Architecture — Rain Painter Screen

```dart
// Flutter handles: touch tracking, zone detection, drag position
// Rive handles: visual response (sky, droplets, puddles, rainbow)

class _RainPainterScreenState extends ConsumerState<RainPainterScreen> {
  SMINumber? _paintZone;     // 0=light, 1=medium, 2=heavy
  SMIBool? _paintActive;     // true while child drags
  SMITrigger? _rainbowReveal;
  SMITrigger? _returnToMeadow;
  SMIBool? _reducedMotion;

  void _onPanUpdate(DragUpdateDetails details) {
    final zone = _calculateZone(details.localPosition);
    _paintZone?.value = zone.toDouble();
    _paintActive?.value = true;
  }

  void _onPanEnd(DragEndDetails details) {
    _paintActive?.value = false;
    if (_allZonesVisited()) {
      _rainbowReveal?.fire();
    }
  }
}
```

**Note:** Rain trail rendering (the actual brush strokes the child paints) may still need a Flutter `CustomPainter` overlaid on the Rive scene via a `Stack`. The Rive scene handles ambient sky + droplets + puddles + rainbow. The child's painted trail is Flutter-side.

---

## Integration Architecture — Stone Stacker Screen

```dart
// Flutter handles: drag-to-stack, physics (balance detection, cascade threshold)
// Rive handles: visual response (river, shore, stone wobble, cascade, splash)

class _StoneStackerScreenState extends ConsumerState<StoneStackerScreen> {
  SMITrigger? _stonePick;
  SMITrigger? _stonePlace;
  SMITrigger? _stoneFall;
  SMITrigger? _returnToMeadow;
  SMIBool? _reducedMotion;

  // Stone drag is still Flutter (Draggable/GestureDetector overlaid on Rive)
  // When a stone is placed successfully:
  void _onStonePlace() {
    _stonePlace?.fire(); // Rive plays wobble animation
    ref.read(audioServiceProvider).playInteraction(BloAudio.stonePlace);
  }

  // When cascade triggers:
  void _onCascade() {
    _stoneFall?.fire(); // Rive plays cascade fall
    ref.read(audioServiceProvider).playInteraction(BloAudio.stoneFall);
  }
}
```

**Note:** Stone drag widgets are Flutter-side (Draggable), overlaid on the Rive scene. Rive handles the ambient river, stone lineup idle rocking, wobble/fall animations.

---

## Integration Architecture — Weather Report

Weather Report overlay transitions from Flutter SVG icons to a Rive animation:

```dart
// Replace WeatherReportOverlay internals:
// Instead of 4 SvgPicture.asset() icons → single RiveAnimation.asset()

RiveAnimation.asset(
  'assets/animations/weather_icons.riv',
  artboard: 'WeatherIcons',
  onInit: (artboard) {
    _iconsController = StateMachineController.fromArtboard(artboard, 'icons');
    artboard.addController(_iconsController!);
    _selectedIcon = _iconsController!.findInput<double>('selectedIcon') as SMINumber?;
    _dismiss = _iconsController!.findInput<bool>('dismiss') as SMITrigger?;
    _reducedMotion = _iconsController!.findInput<bool>('reducedMotion') as SMIBool?;
  },
)

// On selection:
_selectedIcon?.value = choice.index + 1; // 1=sunny, 2=cloudy, 3=rainy, 4=stormy
```

The BackdropFilter overlay wrapper stays in Flutter. The icons inside become Rive.

---

## Files Codey WILL Touch

```
pubspec.yaml                                    UPDATE — add rive, remove lottie + flutter_svg
lib/screens/meadow_screen.dart                  REWRITE — Rive scene replaces Stack of SVGs
lib/screens/rain_painter_screen.dart            REWRITE — Rive scene + Flutter drag overlay
lib/screens/stone_stacker_screen.dart           REWRITE — Rive scene + Flutter drag overlay
lib/widgets/moss_companion.dart                 DELETE — Moss is inside Rive meadow scene
lib/widgets/glowing_seed.dart                   DELETE — seed is inside Rive meadow scene
lib/widgets/meadow_element.dart                 DELETE — elements are inside Rive meadow scene
lib/widgets/weather_report_overlay.dart         UPDATE — SVG icons → Rive icons
lib/widgets/no_walls_tap_response.dart          KEEP — still used for Flutter-side elements
test/widget/moss_companion_test.dart            REWRITE — test Rive Moss state sync
test/widget/moss_companion_lottie_test.dart     DELETE — Lottie tests no longer applicable
test/widget/svg_rendering_test.dart             REWRITE → rive_rendering_test.dart
test/widget/meadow_screen_test.dart             REWRITE — test Rive scene loading
test_baseline.txt                               UPDATE
```

## Files Codey Will NOT Touch

```
lib/services/audio_service.dart     NO CHANGE
lib/providers/audio_provider.dart   NO CHANGE
lib/providers/companion_provider.dart NO CHANGE
lib/providers/session_provider.dart NO CHANGE
lib/models/companion_state.dart     NO CHANGE
lib/models/weather_choice.dart      NO CHANGE
lib/utils/blo_colors.dart           NO CHANGE
lib/utils/blo_theme.dart            NO CHANGE
assets/audio/*                      NO CHANGE
CLAUDE.md                           NO CHANGE
```

---

## Test Strategy

New tests for Rive integration:

```
test/widget/rive_scene_test.dart          — .riv files exist, valid, artboard names correct
test/widget/meadow_rive_test.dart         — MeadowScreen loads Rive, state machines found
test/widget/moss_state_sync_test.dart     — CompanionState maps to correct Rive input values
test/widget/weather_rive_test.dart        — Weather icons Rive loads, selection input works
test/services/audio_service_test.dart     — NO CHANGE (audio is rendering-independent)
test/unit/companion_state_test.dart       — NO CHANGE (model is rendering-independent)
test/unit/weather_choice_test.dart        — NO CHANGE (model is rendering-independent)
```

Target: maintain 74+ test count after rewrite.

---

## Acceptance Criteria

```gherkin
Given the meadow screen
When loaded
Then a single RiveAnimation.asset() renders the entire scene
Then grass sways, clouds drift, seed pulses without interaction

Given Moss discovery
When the 3rd interaction fires
Then discoverMoss trigger fires in Rive
Then Moss fades in within the Rive scene (not a Flutter overlay)

Given companion state changes
When CompanionProvider transitions to coRegulating
Then mossState Rive input updates to 2.0
Then Moss shows 4s/1s/6s breathing with synced glow

Given any element tap
When the Rive event fires
Then AudioService plays the corresponding sound

Given flutter analyze
When run
Then 0 errors, tests >= 74, all passing
```

---

## Definition of Done

- [ ] `rive` package added, `lottie` + `flutter_svg` removed
- [ ] MeadowScreen renders single Rive scene
- [ ] All 4 state machines wired (ambient, moss, interactions, discovery)
- [ ] All Rive events → AudioService mapped
- [ ] CompanionState → mossState sync working
- [ ] RainPainterScreen renders Rive scene + Flutter drag overlay
- [ ] StoneStackerScreen renders Rive scene + Flutter drag overlay
- [ ] WeatherReportOverlay uses Rive icons
- [ ] reducedMotion input wired to platform accessibility setting
- [ ] flutter analyze = 0 errors
- [ ] Tests >= 74, 0 failures
- [ ] test_baseline.txt updated
- [ ] PR opened with BLO-24 in title

---

*Carl — Sr UI/UX, Bloom Garden*
*Codey: the manifest names are exact. Match them character-for-character.*
