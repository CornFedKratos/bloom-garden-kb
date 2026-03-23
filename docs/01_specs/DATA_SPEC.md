# Data Specification
**Project:** Bloom Garden (Codename)
**Version:** 1.0
**Date:** 2026-03-22

---

## Data Architecture Overview

All data flows through Supabase PostgreSQL. PHI is segregated into encrypted tables with RLS enforced at the row level. Three access lanes: child (no direct data access), parent (own child only), OT (linked children only).

---

## Table Inventory

### Core Identity Tables

**`profiles`** — Parent accounts
| Column | Type | PHI | Notes |
|---|---|---|---|
| id | uuid | No | Primary key |
| email | text | PII | Encrypted |
| created_at | timestamptz | No | |
| subscription_tier | text | No | free / family / connected |

**`child_profiles`** — Child records
| Column | Type | PHI | Notes |
|---|---|---|---|
| id | uuid | No | Primary key |
| parent_id | uuid | No | FK to profiles |
| display_name | text | PII | Encrypted — child's name |
| companion_id | text | No | Selected companion species |
| companion_name | text | PII | Encrypted — child-chosen name |
| created_at | timestamptz | No | |
| date_of_birth | date | PHI | Encrypted — COPPA age verification |
| sensory_profile_notes | text | PHI | Encrypted — OT-entered profile notes |

**`ot_profiles`** — OT accounts
| Column | Type | PHI | Notes |
|---|---|---|---|
| id | uuid | No | Primary key |
| email | text | PII | Encrypted — professional email |
| license_number | text | PII | Encrypted |
| verified_at | timestamptz | No | |
| practice_name | text | No | |

**`child_ot_links`** — OT-child relationship
| Column | Type | PHI | Notes |
|---|---|---|---|
| id | uuid | No | Primary key |
| child_id | uuid | No | FK to child_profiles |
| ot_id | uuid | No | FK to ot_profiles |
| linked_at | timestamptz | No | |
| revoked_at | timestamptz | No | Null = active |
| invite_code | text | No | Single-use, 72hr expiry |

---

### PHI Tables — Behavioral & Clinical

**`emotional_checkins`** — Weather Report daily check-ins
| Column | Type | PHI | Notes |
|---|---|---|---|
| id | uuid | No | |
| child_id | uuid | PHI | Encrypted FK |
| checked_at | timestamptz | PHI | Encrypted |
| weather_choice | text | PHI | sunny / cloudy / rainy / stormy |
| time_of_day | text | PHI | morning / afternoon / evening |

**`session_events`** — Mini-game behavioral signals
| Column | Type | PHI | Notes |
|---|---|---|---|
| id | uuid | No | |
| child_id | uuid | PHI | Encrypted FK |
| session_start | timestamptz | PHI | Encrypted |
| session_end | timestamptz | PHI | Encrypted |
| game_type | text | PHI | rain_painter / stone_stacker / etc |
| duration_seconds | int | PHI | Encrypted |
| signal_data | jsonb | PHI | Encrypted — touch pressure, speed, etc |

**`exercise_prescriptions`** — OT-prescribed exercises
| Column | Type | PHI | Notes |
|---|---|---|---|
| id | uuid | No | |
| child_id | uuid | PHI | Encrypted FK |
| ot_id | uuid | No | FK to ot_profiles |
| exercise_id | text | No | FK to exercise_library |
| prescribed_at | timestamptz | PHI | Encrypted |
| delivered_at | timestamptz | PHI | Null until child engages |
| engaged_at | timestamptz | PHI | Null until child engages |
| ot_outcome_rating | text | PHI | effective / partial / ineffective / contraindicated |

**`garden_mail`** — OT-to-child messages
| Column | Type | PHI | Notes |
|---|---|---|---|
| id | uuid | No | |
| child_id | uuid | PHI | Encrypted FK |
| ot_id | uuid | No | FK to ot_profiles |
| creature_messenger | text | No | Which creature delivers |
| message_text | text | PHI | Encrypted — max 300 chars |
| sent_at | timestamptz | PHI | Encrypted |
| delivered_at | timestamptz | PHI | Null until child opens |

**`parent_ot_messages`** — Async parent-OT thread
| Column | Type | PHI | Notes |
|---|---|---|---|
| id | uuid | No | |
| child_id | uuid | PHI | Encrypted FK |
| sender_type | text | No | parent / ot |
| sender_id | uuid | No | FK to profiles or ot_profiles |
| message_text | text | PHI | Encrypted |
| sent_at | timestamptz | PHI | Encrypted |

**`ot_clinical_notes`** — OT session notes
| Column | Type | PHI | Notes |
|---|---|---|---|
| id | uuid | No | |
| child_id | uuid | PHI | Encrypted FK |
| ot_id | uuid | No | FK to ot_profiles |
| note_text | text | PHI | Encrypted — strictest controls |
| created_at | timestamptz | PHI | Encrypted |

---

### Non-PHI Tables

**`exercise_library`** — Clinical exercise catalog
| Column | Type | Notes |
|---|---|---|
| id | text | EX-NNN format |
| title | text | |
| category | text[] | sensory system categories |
| regulation_goal | text[] | upregulation / downregulation / etc |
| sensory_profiles | text[] | seeking / avoiding / sensitive / low_registration |
| delivery_context | text[] | in_app / home_program / etc |
| ot_method | text | Clinical methodology |
| evidence_base | text | Citation summary |
| contraindications | text | |
| parent_guide | text | Plain language for home use |
| ot_notes | text | Clinical considerations |
| success_indicators | text | |
| failure_indicators | text | |
| related_exercises | text[] | EX-IDs |
| progressions | text[] | EX-IDs |
| regressions | text[] | EX-IDs |

**`audit_log`** — Immutable PHI access log
| Column | Type | Notes |
|---|---|---|
| id | uuid | |
| accessed_at | timestamptz | |
| user_id | uuid | Who accessed |
| user_role | text | parent / ot / system |
| table_name | text | Which table |
| record_id | uuid | Which record |
| action | text | SELECT / INSERT / UPDATE |

---

## RLS Policies (Required Pre-Launch)

| Table | Policy | Rule |
|---|---|---|
| child_profiles | Parent read own children | `auth.uid() = parent_id` |
| child_profiles | OT read linked children | `ot_id IN (SELECT ot_id FROM child_ot_links WHERE child_id = id AND revoked_at IS NULL)` |
| emotional_checkins | Parent read own child | Via child_profiles parent_id |
| emotional_checkins | OT read linked child | Via child_ot_links |
| session_events | Parent read own child | Via child_profiles parent_id |
| session_events | OT read linked child | Via child_ot_links |
| ot_clinical_notes | OT read/write own notes | `auth.uid() = ot_id` |
| garden_mail | OT write own messages | `auth.uid() = ot_id` |
| garden_mail | Parent read own child | Via child_profiles parent_id |
| parent_ot_messages | Parent read/write own | `auth.uid() = sender_id OR child_id IN (parent's children)` |

---

## Data Freshness & Sync

| Data Type | Sync Frequency | Offline Behavior |
|---|---|---|
| Child garden state | On reconnect | Stored locally, syncs on next connection |
| Emotional check-ins | On reconnect | Queued locally |
| Mini-game signals | On reconnect | Queued locally — batch sync |
| Exercise prescriptions | Pull on app open | Cached locally for offline access |
| Garden Mail | Push notification + pull | Cached locally |
| Parent dashboard | On dashboard open | Shows cached data with staleness indicator |
| OT portal | Real-time + pull | Web-based — requires connection |

---

## AI Data Layer (Post-MVP Infrastructure — Collect Now)

The AI recommendation layer is post-MVP. However, the data infrastructure to support it must be built from day one. The `session_events.signal_data` JSONB field and `exercise_prescriptions.ot_outcome_rating` field are the primary inputs to the future recommendation engine. The regulation profile derived from these fields over time is the foundation of the outcome engine described in the product vision.

**No AI feature accesses this data in MVP.** The infrastructure exists to ensure the data is clean and complete when the AI layer is built.
