---
name: session-close
description: Run at the end of every Bloom Garden agent session. Triggered by "/session-close". Exports session context, writes facts to Supabase memory, confirms test ratchet, and closes the session cleanly. No session ends without session-close completing.
user_invocable: true
---

# /session-close

The required exit protocol for every Bloom Garden (BLO) agent session.
Execute all steps in order. Do not skip steps.
A session that ends without session-close did not close — it was abandoned.

---

## Step 1 — Verify the Ratchet

Before closing, confirm the test baseline has not regressed.

**Phase 2 (pre-Flutter):** Confirm KB build is clean:
```bash
cd ~/bloom-garden-web && npm run build 2>&1 | tail -5
```

**Phase 3+ (Flutter exists):**
```bash
cd ~/bloom-garden/app && flutter test --reporter=compact 2>&1 | tail -5
flutter analyze 2>&1 | tail -3
```

**If tests < session baseline:** DO NOT CLOSE. Fix the regression first. Report to Don.
**If `flutter analyze` has errors:** DO NOT CLOSE. Fix errors first.

Record the final state:
```
Final: [X] tests passing ([+Y] from baseline), 0 failures
Analyzer: 0 errors
```

---

## Step 2 — Build the Session Context Export

Fill out this template completely. No placeholder fields. No "TBD."

```markdown
---
## Session Export — [DATE] — [AGENT NAME]

**Session opened:** [time]
**Session closed:** [time]
**Branch:** [branch name or "main"]
**Commit hash:** [hash or "no commits this session"]

### Pre-Flight State
- Tests at open: [X] passing, [Y] skipped, 0 failures
- Analyzer at open: [0 errors / X warnings]
- Branch status: [clean / dirty / description]
- BAA status: [signed / pending]

### What Changed
[List every file touched, migration applied, Edge Function deployed, or document updated]
- file/path/here — what changed and why
- supabase/migrations/XXX — what it does

### Decisions Made
[Every decision made this session with rationale. If none, write "No architectural decisions made."]
- Decision: [what was decided]
  Rationale: [why]
  Alternatives considered: [what else was on the table]

### Tickets Worked
[BLO-XXX — title — status: complete / in progress / blocked]

### Test Count Delta
- Baseline at open: [X]
- Final at close: [Y]
- Delta: [+Z / 0 / ⚠️ NEGATIVE — explain]

### KB Sections Updated
[section_id — title — action: created / updated / no change]

### Open Blockers
[Any blockers discovered this session that Don needs to action]
- BLOCKER: [description] — needs: [what action]

### Unexpected Findings
[Anything discovered that wasn't in the ticket scope]

### Next Session Should Start With
[1–3 sentences: what's next, what to watch out for, what context is most important to reload]
---
```

---

## Step 3 — Append to Session Context File

Append the completed export block to:
`docs/05_session_context/BLO_SESSION_CONTEXT_LATEST.md`

This file is append-only. Do not overwrite previous session blocks.
The latest block is authoritative state. All previous blocks are institutional history.

```bash
# Verify the file exists
ls docs/05_session_context/BLO_SESSION_CONTEXT_LATEST.md

# Append (do not overwrite)
cat >> docs/05_session_context/BLO_SESSION_CONTEXT_LATEST.md << 'EOF'
[paste completed export block here]
EOF
```

---

## Step 4 — Write to Supabase Session Memory

Call the `session-memory-write` Edge Function to persist facts for future sessions:

```bash
curl -s "$SUPABASE_URL/functions/v1/session-memory-write" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent": "[agent name]",
    "session_summary": "[2–3 sentence summary of what was accomplished]",
    "decisions_made": [
      "[decision 1]",
      "[decision 2]"
    ],
    "open_questions": [
      "[anything unresolved that next session needs to pick up]"
    ],
    "metadata": {
      "tickets": ["BLO-XXX"],
      "test_delta": "+Y",
      "branch": "[branch name]",
      "commit": "[hash]"
    }
  }'
```

**Requires:** `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from environment.
**Supabase project:** `pobqntuhqbvjrqftwsaj`

If Edge Function is unreachable: note it in the session export. The file-based export is sufficient fallback.

---

## Step 5 — Commit the Context Export

```bash
git add docs/05_session_context/BLO_SESSION_CONTEXT_LATEST.md
git commit -m "chore(session): export context [BLO-XXX] [agent-name]"
git push origin [branch]
```

If working on a feature branch, push the branch. The context export does not need to be on main immediately — it will merge with the feature PR.

---

## Step 6 — Report to Don

Report in the agent's communication style:

```
[Agent name] session closed.

Worked: [BLO-XXX — title]
Final: [X] tests passing ([+Y]), 0 failures
Analyzer: 0 errors
Committed: [hash]

[1–2 lines: what was accomplished]

[If blockers]: ⚠️ BLOCKER: [description]
[If unexpected findings]: 📌 NOTE: [finding]

Context exported and committed. Session closed.
```

---

## Failure States

| Problem | Action |
|---|---|
| Tests < baseline | DO NOT CLOSE. Fix regression. Report to Don. |
| Analyzer errors | DO NOT CLOSE. Fix errors. |
| Supabase write fails | Note in export. File-based export is sufficient. |
| Uncommitted changes | Commit or stash before closing. Never leave work uncommitted. |
| No tickets worked | Still close cleanly. Note "infrastructure / maintenance session" in export. |

---

## What Session-Close Does NOT Do

- It does not decide whether a ticket is done — that requires Don's review.
- It does not merge to main — PRs require Don's approval.
- It does not skip the ratchet check even if "nothing changed."
- It does not write speculative future plans to session memory — only facts.
