# BLO-11 — Flutter App Repo Scaffold
# Execution Prompt v1.0
# Authored by: Claud3 (CPO)
# Status: PENDING Don approval before Codey executes

---

## Prompt Metadata

| Field | Value |
|---|---|
| Ticket | BLO-11 |
| Branch | `main` (initial repo setup) |
| Type | Infrastructure — Flutter project initialization |
| Agent | Codey |
| Dependencies | None — runs parallel to BLO-10 |
| Blocks | BLO-12 (prototype build) |
| Baseline test count | 0 (new project) |
| Prompt version | 1.0 |
| Authored | 2026-03-23 |

---

## Context

The `bloom-garden-app` Flutter repo does not exist. This ticket initializes it with the correct project structure, bundle ID, CI skeleton, and TestFlight pipeline. No feature code. No UI. No game mechanics. Scaffold only.

BLO-10 (Carl's design spec) runs in parallel — Codey does not need the design spec to scaffold the repo.

---

## Objective

Initialize `github.com/CornFedKratos/bloom-garden-app` with a production-grade Flutter scaffold ready for Phase 2 prototype feature development.

---

## File Ownership Boundaries

### Codey initializes this entire repo — it does not exist yet
```
bloom-garden-app/
├── lib/
│   ├── main.dart
│   ├── app.dart
│   └── screens/
│       └── placeholder_screen.dart
├── test/
│   └── widget_test.dart
├── ios/
├── android/         (scaffold only — not target platform for Phase 2)
├── pubspec.yaml
├── analysis_options.yaml
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── testflight.yml
├── docs/
│   └── session_context/
│       └── BLO_SESSION_CONTEXT_LATEST.md
├── CLAUDE.md        (copy from bloom-garden-kb, BLO-specific)
├── .gitignore
└── README.md
```

---

## Technical Specification

### Flutter Project Initialization
```bash
flutter create bloom-garden-app \
  --org com.s3technology \
  --project-name bloom_garden \
  --platforms ios,android
```

### Bundle ID
```
iOS:     com.s3technology.bloomgarden
Android: com.s3technology.bloomgarden
```

### pubspec.yaml — Initial Dependencies
```yaml
name: bloom_garden
description: Bloom Garden — emotional regulation platform for autistic children
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'
  flutter: '>=3.10.0'

dependencies:
  flutter:
    sdk: flutter
  # State management — simple for prototype
  flutter_riverpod: ^2.4.0
  # Animation
  lottie: ^2.7.0
  # Local state persistence (prototype only — no backend)
  shared_preferences: ^2.2.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0
  integration_test:
    sdk: flutter
```

### analysis_options.yaml
Strict lint rules — Codey enforces zero analyzer errors:
```yaml
include: package:flutter_lints/flutter.yaml
analyzer:
  errors:
    missing_required_param: error
    missing_return: error
linter:
  rules:
    - prefer_const_constructors
    - prefer_final_fields
    - avoid_print
```

### App Structure
`lib/main.dart` — entry point, ProviderScope wrapper
`lib/app.dart` — MaterialApp, theme (BLO design tokens), routing skeleton
`lib/screens/placeholder_screen.dart` — single placeholder screen confirming app runs

BLO design tokens in theme:
```dart
// Colors
static const Color moss = Color(0xFF4a7c59);
static const Color mossLight = Color(0xFF7fb08a);
static const Color bloom = Color(0xFFc8a4a5);
static const Color petal = Color(0xFFe8d5c4);
static const Color soil = Color(0xFF6b4f3a);
static const Color dusk = Color(0xFF2d3b2e);
static const Color dawn = Color(0xFFf5ede0);
static const Color mist = Color(0xFFe8ede9);
static const Color firefly = Color(0xFFd4a843);
```

### CI Pipeline — `.github/workflows/ci.yml`
Runs on every PR to main:
- `flutter analyze` — must be 0 errors (build fails on any error)
- `flutter test` — must pass, test count recorded
- Test count ratchet — build fails if test count drops below recorded baseline

### TestFlight Pipeline — `.github/workflows/testflight.yml`
Runs on merge to main:
- Build iOS release
- Upload to TestFlight via Fastlane or `upload-testflight-build` action
- Requires secrets: `APP_STORE_CONNECT_API_KEY_ID`, `APP_STORE_CONNECT_ISSUER_ID`, `APP_STORE_CONNECT_API_KEY`
- Apple Team ID: `BAYYR68ZQB`

Note: TestFlight secrets are set in GitHub repo secrets by Don. Codey configures the workflow to read them — he does not set the values.

### CLAUDE.md
Copy `CLAUDE.md` from `bloom-garden-kb` repo into the app repo root. This ensures session-open works in both repos.

### README.md
```markdown
# Bloom Garden — Flutter App

Codename: BLO | Publisher: S3 Technology | Bundle ID: com.s3technology.bloomgarden

## Setup
flutter pub get
flutter run

## Architecture
State: Riverpod
Platform: iOS (Phase 2), Android (Phase 3)
Backend: None (Phase 2 — local state only)

## Session Protocol
Good Morning [Agent], /session-open
```

---

## Acceptance Criteria

```gherkin
Given the bloom-garden-app repo
When Codey runs flutter create
Then bundle ID is com.s3technology.bloomgarden on iOS

Given the app scaffold
When flutter run is executed on an iOS simulator
Then the placeholder screen launches without errors

Given analysis_options.yaml
When flutter analyze runs
Then 0 errors are reported

Given the CI workflow
When a PR is opened
Then flutter analyze and flutter test run automatically

Given the TestFlight workflow
When a merge to main occurs
Then the workflow is configured to build and upload to TestFlight

Given the CLAUDE.md file
When an agent opens a session in this repo
Then session-open fires correctly
```

---

## Definition of Done

- [ ] Annotation posted on BLO-11 and approved by Don
- [ ] `bloom-garden-app` repo created at `github.com/CornFedKratos/bloom-garden-app`
- [ ] Bundle ID `com.s3technology.bloomgarden` confirmed in Xcode project
- [ ] `flutter analyze` = 0 errors on initial scaffold
- [ ] Placeholder screen launches on iOS simulator
- [ ] CI workflow configured and running on first PR
- [ ] TestFlight workflow configured (secrets placeholder — Don adds values)
- [ ] `CLAUDE.md` present in repo root
- [ ] Session context file initialized at `docs/session_context/BLO_SESSION_CONTEXT_LATEST.md`
- [ ] PR opened and merged — repo is clean on main
- [ ] `/session-close` run — context exported

---

## Session Context Export Template

```markdown
---
## Session Export — [DATE] — Codey

**Repo:** github.com/CornFedKratos/bloom-garden-app (NEW)
**Branch:** main
**Commit hash:** [hash]

### What Was Created
- Flutter project initialized — com.s3technology.bloomgarden
- CI pipeline: flutter analyze + flutter test on PR
- TestFlight pipeline: build + upload on merge to main (secrets pending Don)
- CLAUDE.md copied from KB repo
- BLO_SESSION_CONTEXT_LATEST.md initialized

### Baseline
- Tests at first commit: [X] (flutter default widget test)
- Analyzer: 0 errors

### Decisions Made
- [any dependency version decisions, architecture decisions]

### Blockers for Don
- TestFlight secrets needed: APP_STORE_CONNECT_API_KEY_ID, APP_STORE_CONNECT_ISSUER_ID, APP_STORE_CONNECT_API_KEY
- Set these in GitHub repo Settings → Secrets → Actions before first TestFlight build

### Tickets Worked
- BLO-11 — Flutter Repo Scaffold — complete

### Blocks Cleared
- BLO-12 (prototype build) is unblocked once BLO-10 (Carl design spec) is also complete

### Next Session Should Start With
- BLO-12 — awaiting BLO-10 completion
---
```
