# UX Flows & Screen Inventory
**Project:** Bloom Garden (Codename)
**Version:** 1.0
**Date:** 2026-03-22

---

## Navigation Architecture

Three distinct app experiences with separate navigation structures:

```
App Root
├── Child Experience (post-onboarding, post-auth)
│   ├── Garden World (home)
│   ├── Mini-Games (accessed from garden)
│   ├── Companion Interaction
│   └── Emotional Check-In (Weather Report)
│
├── Parent Layer (accessible via parent PIN/biometric)
│   ├── Parent Dashboard
│   ├── Child Profile Settings
│   ├── OT Link Management
│   └── Account & Privacy Settings
│
└── OT Portal (web, separate authenticated session)
    ├── Caseload Overview
    ├── Child Profile View
    ├── Exercise Prescription
    ├── Observation Dashboard
    ├── Garden Mail Compose
    └── Parent-OT Messaging
```

---

## Screen Inventory — Child Experience

| Screen ID | Screen Name | Description | Auth Required |
|---|---|---|---|
| SCR-001 | Splash / Loading | App launch — gentle garden animation, no interaction required | No |
| SCR-002 | Onboarding — Garden Arrives | First launch: empty garden at golden hour, ambient sound, rustling begins | Parent-gated first launch |
| SCR-003 | Onboarding — Companion Discovery | Child explores garden, creatures reveal themselves | Continuation of SCR-002 |
| SCR-004 | Onboarding — Bond Moment | Companion settles, glowing thread, wordless warmth | Continuation of SCR-003 |
| SCR-005 | Onboarding — Companion Naming | Optional name entry (parent keyboard) or keep default | Continuation of SCR-004 |
| SCR-006 | Garden World — Day | Primary home screen. Meadow biome, companion present, mini-game portals visible | Child session |
| SCR-007 | Garden World — Night | Night mode post-bedtime. Fireflies, dimmed palette, night-exclusive creatures | Child session |
| SCR-008 | Garden World — Calm Mode | Parent-triggered. Gentle rain, companion in quiet co-regulation animation | Parent-triggered |
| SCR-009 | Weather Report Check-In | One-tap emotional check-in overlay. Weather icons only, no text | Child session |
| SCR-010 | Morning Dew Discovery | Notification of overnight changes — new flower, creature gift, small scene | Child session |
| SCR-011 | Tuck-In Ritual | Bedtime animation. Fireflies, garden dims, companion yawns. Optional interaction | Child session |
| SCR-012 | Mini-Game: Rain Painter | Full-screen rain painting experience | Child session |
| SCR-013 | Mini-Game: Stone Stacker | Cairn building with physics | Child session |
| SCR-014 | Mini-Game: Bubble World | Bubble mystery and breath-creation | Child session |
| SCR-015 | Mini-Game: Mood Orchestra | Garden soundscape composition | Child session |
| SCR-016 | Seed Packet Discovery | New seed arrival animation and planting interaction | Child session |
| SCR-017 | Garden Mail — Delivery | Creature delivers message, reads aloud | Child session |
| SCR-018 | Slow Bloom Reveal | Seed blooms after days — discovery animation | Child session |

---

## Screen Inventory — Parent Layer

| Screen ID | Screen Name | Description |
|---|---|---|
| SCR-101 | Parent Gate | PIN or biometric prompt to enter parent layer from child experience |
| SCR-102 | Parent Dashboard — Overview | Emotional check-in history, usage patterns, week summary |
| SCR-103 | Parent Dashboard — Emotional Timeline | Chart of weather check-ins over time |
| SCR-104 | Parent Dashboard — Activity Patterns | Mini-game usage, time of day, session duration |
| SCR-105 | Parent Dashboard — OT Brief | AI-generated plain-language weekly summary with disclosure |
| SCR-106 | OT Link Management | View linked OTs, invite new OT, revoke access |
| SCR-107 | OT Invite — Generate Code | Single-use 72-hour invite code generation |
| SCR-108 | Context Flag | Parent can flag a moment: "had a hard afternoon" — feeds OT context |
| SCR-109 | Child Profile Settings | Companion name, bedtime window, calm mode configuration, notification preferences |
| SCR-110 | Account & Privacy | COPPA consent records, data export, data deletion request |
| SCR-111 | Notification Settings | Configure which events trigger parent notifications |

---

## Screen Inventory — OT Portal (Web)

| Screen ID | Screen Name | Description |
|---|---|---|
| SCR-201 | OT Login | Professional email + password, license verification |
| SCR-202 | Caseload Overview | All linked child profiles, status indicators, flag alerts |
| SCR-203 | Child Profile — Observation Dashboard | Emotional timeline, behavioral patterns, anomaly flags |
| SCR-204 | Child Profile — Exercise History | What's been prescribed, engagement rates, OT ratings |
| SCR-205 | Exercise Library Browser | Searchable library by sensory system, regulation goal, child profile |
| SCR-206 | Seed Packet Builder | Select exercises, configure delivery, schedule or push now |
| SCR-207 | Garden Mail Compose | Short message, creature selector, delivery confirmation |
| SCR-208 | Parent-OT Messaging | Async thread, PHI-compliant, parent visible only |
| SCR-209 | Session Prep Brief | AI-generated pre-session note from behavioral data |
| SCR-210 | Account Settings | Profile, notification preferences, practice information |

---

## Auth Pattern

```
App Launch
    ↓
Child session active? (device check)
    ├── YES → Garden World (SCR-006)
    └── NO → First launch?
              ├── YES → Parent Account Creation → Parental Consent (COPPA) → 
              │         Child Profile Setup → Companion Discovery (SCR-002)
              └── NO → Parent Login → Child Profile Select → Garden World
```

**Parent layer access from child experience:**
Child experience → Tap hidden parent access point → Parent PIN/biometric (SCR-101) → Parent Dashboard (SCR-102)

**OT portal:**
Separate web URL → OT login (SCR-201) → Caseload (SCR-202)

---

## Responsive Breakpoints

| Breakpoint | Target | Adjustments |
|---|---|---|
| Phone portrait | 375px+ | Default layout |
| Phone landscape | 667px+ | Garden world widens, mini-games expand |
| Tablet portrait | 768px+ | Larger touch targets, companion larger, garden shows more |
| Tablet landscape | 1024px+ | Full biome visible, companion to one side |

**Tablet priority:** Many autistic children use tablets. Larger touch targets (minimum 60×60pt for interactive elements on tablet) and reduced need for precise fine motor interaction should be verified at every design review.
