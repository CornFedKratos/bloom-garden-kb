---
name: session-open
description: Load this skill at the start of every Bloom Garden agent session. Triggered by "Good Morning [Agent Name], /session-open". Loads agent identity, project context, and runs pre-flight to establish the session baseline. No work begins before session-open completes.
user_invocable: true
---

# /session-open

The required entry point for every Bloom Garden (BLO) agent session.
Execute all steps in order. Do not skip steps.

---

## Step 0 — Identify Agent & Load Personality

Parse the greeting to identify which agent is opening the session.

| Greeting contains | Load skill |
|---|---|
| "Codey Jr" | `.claude/skills/agent-codey-jr/SKILL.md` |
| "Codey" (not Jr) | `.claude/skills/agent-codey/SKILL.md` |
| "Carl" | `.claude/skills/agent-carl/SKILL.md` |
| "Clyde" | `.claude/skills/agent-clyde/SKILL.md` |
| "Claud3" | `.claude/skills/agent-claud3/SKILL.md` |

Read the agent skill file. Internalize identity, hard rules, communication style, and project constants before proceeding. You are now that agent for the duration of this session.

> ⚠️ If no agent name is detected, ask: "Which agent is this session? (Codey / Codey Jr / Carl / Clyde / Claud3)"

---

## Step 1 — Load Session Context

Read the latest session context file:
`docs/05_session_context/BLO_SESSION_CONTEXT_LATEST.md`

If the file does not exist, fall back to:
`docs/05_session_context/SESSION-CONTEXT-2026-03-23.md`

Then attempt to pull additional context from Supabase session memory:

```bash
curl -s "$SUPABASE_URL/functions/v1/session-memory-read" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent": "[agent name from Step 0]",
    "query": "current session state project status recent tickets"
  }'
```

**Requires:** `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from environment.
**Supabase project:** `pobqntuhqbvjrqftwsaj`

If Edge Function is unreachable, continue with the file-based context. Note in session report.

---

## Step 2 — Read CLAUDE.md

Read `CLAUDE.md` in the project root. Confirm:
- [ ] Governing principle internalized
- [ ] Project constants loaded
- [ ] Current stage identified
- [ ] Active relaxations noted
- [ ] BLO non-negotiables confirmed

---

## Step 3 — Run Pre-Flight

**Phase 2 (pre-Flutter):** Flutter app does not exist yet. Run this reduced pre-flight:

```bash
# 1. Confirm git status
git status
git pull origin main

# 2. Check KB site build
cd ~/bloom-garden-web && npm run build 2>&1 | tail -5
```

**Phase 3+ (Flutter exists):** Full pre-flight:

```bash
# 1. Confirm on main and clean
git status
git pull origin main

# 2. Run analyzer
cd ~/bloom-garden/app && flutter analyze

# 3. Run tests — record the count
flutter test --reporter=compact 2>&1 | tail -5
```

Record the baseline:
```
Session baseline: [X] tests passing, [Y] skipped, 0 failures
```

This number is a one-way ratchet. It can go up. It cannot go down.
If it goes down, do not ship. Fix it first.

**If main is broken:** STOP. Report to Don. Do not begin work.

---

## Step 4 — Report Status

Report in the agent's communication style:

```
[Agent name] online. BLO session open.
Stage: [current stage from CLAUDE.md]
Baseline: [X tests / KB build status]
Branch: main (clean / [status])
BAA status: [signed / pending]

[1–2 lines of relevant context from session memory or context file]

Ready. What's next?
```

---

## Failure States

| Problem | Action |
|---|---|
| Supabase Edge Function unreachable | Fall back to context file. Note in report. |
| Main is broken | STOP. Report to Don. Do not begin work. |
| Tests failing on main | STOP. Report to Don. Identify which tests and why. |
| No agent identified | Ask before proceeding. |
| SUPABASE_SERVICE_ROLE_KEY missing | Alert Don. Required for memory read/write. |
| CLAUDE.md not found | STOP. The operating doctrine is missing. Alert Don immediately. |

---

## What Session-Open Does NOT Do

- It does not choose which ticket to work on — Don decides that.
- It does not start any implementation — wait for the prompt.
- It does not skip pre-flight even if "it was fine yesterday."
- It does not proceed with broken main.
- It does not self-approve CIL items.
