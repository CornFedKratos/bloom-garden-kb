# API Contracts
**Project:** Bloom Garden (Codename)
**Version:** 1.0
**Date:** 2026-03-22

---

## Auth Method
All API calls use Supabase JWT authentication. Child experience uses anon key with RLS enforcement. Parent and OT use user-scoped JWTs. Service role key used only in Edge Functions — never in client code.

---

## Supabase Edge Functions

### `session-memory-read`
**Method:** POST
**Auth:** Service role (agent sessions only)
**Purpose:** Retrieve RAG+ session context for agent session-open

**Request:**
```json
{
  "agent": "string",
  "query": "string"
}
```
**Response:**
```json
{
  "context": "string",
  "retrieved_at": "ISO timestamp"
}
```

---

### `session-memory-write`
**Method:** POST
**Auth:** Service role (agent sessions only)
**Purpose:** Store session summary after agent session completes

**Request:**
```json
{
  "agent": "string",
  "session_summary": "string",
  "decisions_made": ["string"],
  "open_questions": ["string"]
}
```
**Response:**
```json
{
  "stored": true,
  "memory_id": "uuid"
}
```

---

### `generate-parent-summary`
**Method:** POST
**Auth:** User JWT (parent role)
**Purpose:** Generate AI weekly summary for parent dashboard

**Request:**
```json
{
  "child_id": "uuid",
  "days": 7
}
```
**Response:**
```json
{
  "summary": "string (max 3 sentences)",
  "generated_at": "ISO timestamp",
  "disclosure": "string (mandatory)"
}
```
**Security:** PHI processed inside Edge Function only — never leaves Supabase infrastructure

---

### `generate-ot-session-brief`
**Method:** POST
**Auth:** User JWT (OT role)
**Purpose:** Generate pre-session prep note for OT

**Request:**
```json
{
  "child_id": "uuid",
  "days_since_last_session": "int"
}
```
**Response:**
```json
{
  "brief": "string",
  "patterns_flagged": ["string"],
  "generated_at": "ISO timestamp"
}
```

---

### `check-anomaly`
**Method:** POST (called by cron job, not user-initiated)
**Auth:** Service role
**Purpose:** Run behavioral pattern change detection for all active child profiles

**Request:**
```json
{
  "run_date": "ISO date"
}
```
**Response:**
```json
{
  "anomalies_flagged": "int",
  "child_ids_flagged": ["uuid"]
}
```

---

## Supabase Realtime (Post-MVP)
Garden Mail delivery and parent anomaly notifications will use Supabase Realtime channels. Architecture is defined here for post-MVP implementation:

**Channel:** `child:[child_id]`
**Events:** `garden_mail_arrived`, `seed_packet_arrived`

**Channel:** `parent:[parent_id]`
**Events:** `anomaly_flagged`, `ot_message_received`, `garden_mail_delivered`

---

## Error Codes

| Code | Meaning | Client Action |
|---|---|---|
| 401 | Unauthenticated | Redirect to login |
| 403 | Insufficient permission (RLS block) | Show generic error — do not reveal record existence |
| 404 | Record not found | Show empty state — not an error message |
| 422 | Validation error | Surface specific field error to user |
| 429 | Rate limited | Retry with exponential backoff — silent for child experience |
| 500 | Server error | Show gentle error state — log to monitoring |

---

## Rate Limits

| Endpoint | Limit | Window |
|---|---|---|
| `generate-parent-summary` | 10 requests | per user per hour |
| `generate-ot-session-brief` | 20 requests | per OT per hour |
| `check-anomaly` | 1 run | per day (cron) |
| Standard Supabase read/write | Supabase plan limits | Per Supabase pricing |

---

## Versioning Strategy
Edge Functions versioned by function name suffix where breaking changes occur: `generate-parent-summary-v2`. Flutter app specifies function name in call — old clients continue to work on old function until migration is complete.
