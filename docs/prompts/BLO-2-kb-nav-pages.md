# BLO-2 — KB Navigation Pages
# Execution Prompt v1.0
# Authored by: Claud3 (CPO)
# Status: PENDING Don approval before Codey executes

---

## Prompt Metadata

| Field | Value |
|---|---|
| Ticket | [BLO-2](https://linear.app/chickentindy/issue/BLO-2/kb-navigation-pages-foundation-clinical-evidence-product-decisions) |
| Branch | `feat/blo-2-kb-navigation-pages` |
| Type | Feature — Next.js pages |
| Agent | Codey |
| Dependencies | BLO-1 must be complete (kb-search returning results) |
| Baseline test count | N/A — pre-Flutter phase |
| Prompt version | 1.0 |
| Authored | 2026-03-23 |

---

## Context

The KB site at `bloom-garden-kb.netlify.app` has a homepage only.
The homepage has six section cards that currently link nowhere.
This ticket creates three destination pages and wires the homepage cards to them.

All pages are statically generated at build time from markdown files in the GitHub repo.
No client-side markdown fetching. No API calls at runtime.

Framework: Next.js 14 + Tailwind
Netlify site ID: `e1252695-6cca-4834-a20f-c65aeb4c3af0`

---

## Objective

Create three new pages:
- `/foundation` — renders 4 constitutional documents from `docs/04_mds/`
- `/clinical-evidence` — renders 4 CEB briefs from `docs/03_briefs/`
- `/product-decisions` — renders competitor analysis from `docs/02_product-decisions/`

Update homepage to wire existing section cards to new routes.

---

## File Ownership Boundaries

### Files Codey WILL touch
```
pages/foundation.js              CREATE
pages/clinical-evidence.js       CREATE
pages/product-decisions.js       CREATE
components/DocViewer.js          CREATE — shared sidebar + content layout component
pages/index.js                   UPDATE — wire homepage cards to new routes only
package.json                     UPDATE — add react-markdown, remark-gfm, gray-matter if not present
```

### Files Codey will NOT touch
```
public/story.html
Any file in supabase/
Any file in scripts/
CLAUDE.md
.claude/skills/*
docs/session_context/*
docs/prompts/*
Any existing styles/ files (new styles go inline or in the new page files only)
```

If Codey discovers he needs to touch a file not listed above, he STOPS, annotates BLO-2, and waits for approval.

---

## Technical Specification

### Source Documents

**`/foundation` — fetch these 4 files:**
```
docs/04_mds/MISSION.md
docs/04_mds/CLINICAL-INTEGRITY-LAYER.md
docs/04_mds/HIPAA-ARCHITECTURE-DECISIONS.md
docs/04_mds/FOUNDING-SESSION-LOG.md
```

**`/clinical-evidence` — fetch these 4 files:**
```
docs/03_briefs/CEB-001-co-regulation.md
docs/03_briefs/CEB-002-projective-play.md
docs/03_briefs/CEB-003-diaphragmatic-breathing.md
docs/03_briefs/CEB-004-proprioceptive-regulation.md
```

**`/product-decisions` — fetch this 1 file:**
```
docs/02_product-decisions/COMPETITOR-ANALYSIS.md
```

### Fetching Strategy
Fetch from GitHub raw content at build time via `getStaticProps`:
```
https://raw.githubusercontent.com/CornFedKratos/bloom-garden-kb/main/[file_path]
```

If `GITHUB_TOKEN` is set in env, include it as Bearer token in the fetch header.
If not set, attempt unauthenticated fetch (works if repo is public).
On fetch failure: render an error state in the page, do not throw — build must not fail.

### Page Layout — DocViewer Component
Each page uses a shared `DocViewer` component with:
- **Sidebar** (left, ~240px): document title list, active state highlighted in `--moss`
- **Content area** (right, flex-1): selected document rendered as HTML from markdown
- **Default**: first document in the list selected on page load
- **Mobile (< 768px)**: sidebar collapses to a `<select>` dropdown above content

### Markdown Rendering
Use `react-markdown` with `remark-gfm` plugin for:
- Tables (required — competitor analysis has many)
- Strikethrough
- Task lists

Apply Tailwind `prose` class to the content container with these overrides to match BLO design system:
```css
prose-headings:font-cormorant prose-headings:text-[#2d3b2e]
prose-p:text-[#6b4f3a] prose-p:font-light
prose-a:text-[#4a7c59]
prose-strong:text-[#2d3b2e]
prose-table:text-sm
prose-th:bg-[rgba(74,124,89,0.08)] prose-th:text-[#2d3b2e]
```

### Homepage Card Wiring
In `pages/index.js`, update the three relevant section cards to link to new routes:
- "Foundation" card → `/foundation`
- "Clinical Evidence" card → `/clinical-evidence`
- "Product Decisions" card → `/product-decisions`

Use Next.js `<Link>` component. Do not change card content, styling, or layout — routing only.

### Design System Reference
```
--moss:    #4a7c59
--dusk:    #2d3b2e
--soil:    #6b4f3a
--dawn:    #f5ede0
--border:  rgba(74,124,89,0.12)
Font display: Cormorant Garamond (serif)
Font body:    DM Sans (sans-serif)
```

---

## Acceptance Criteria

```gherkin
Given a user navigates to /foundation
When the page loads
Then they see a sidebar with 4 document titles and MISSION.md rendered by default

Given a user clicks "CLINICAL-INTEGRITY-LAYER" in the /foundation sidebar
When the selection changes
Then the CIL document content renders with correct heading hierarchy

Given a user navigates to /clinical-evidence
When the page loads
Then all 4 CEB briefs are in the sidebar and CEB-001 renders by default

Given a user navigates to /product-decisions
When the page loads
Then COMPETITOR-ANALYSIS renders with tables formatted correctly

Given the homepage Foundation card
When clicked
Then the user is routed to /foundation

Given the page is viewed at 375px width
When the layout renders
Then the sidebar becomes a dropdown and content is readable without horizontal scroll

Given a document contains a markdown table
When it renders
Then the table has correct borders and readable formatting

Given a fetch fails for a document
When the page loads
Then an error state renders in the content area and the build does not fail
```

---

## Verification Steps

After implementation, before reporting to Don:

```bash
# 1. Build locally
npm run build

# 2. Serve and manually verify each route
npm run start
# Open: localhost:3000/foundation
# Open: localhost:3000/clinical-evidence
# Open: localhost:3000/product-decisions

# 3. Verify homepage card links work
# Open: localhost:3000 — click Foundation, Clinical Evidence, Product Decisions cards

# 4. Verify mobile layout
# DevTools → 375px width — confirm sidebar becomes dropdown

# 5. Deploy to Netlify and verify production
```

---

## Definition of Done

- [ ] Annotation posted on BLO-2 and approved by Don
- [ ] `pages/foundation.js` created and live on Netlify
- [ ] `pages/clinical-evidence.js` created and live on Netlify
- [ ] `pages/product-decisions.js` created and live on Netlify
- [ ] `components/DocViewer.js` created
- [ ] Homepage cards link to correct routes
- [ ] Mobile layout verified at 375px
- [ ] Netlify build passing — no build errors
- [ ] PR opened against main with `BLO-2` in title
- [ ] `/session-close` run — context exported to `BLO_SESSION_CONTEXT_LATEST.md`

---

## Session Context Export Template

Codey fills this out at `/session-close`:

```markdown
---
## Session Export — [DATE] — Codey

**Branch:** feat/blo-2-kb-navigation-pages
**Commit hash:** [hash]

### What Changed
- pages/foundation.js — CREATED
- pages/clinical-evidence.js — CREATED
- pages/product-decisions.js — CREATED
- components/DocViewer.js — CREATED
- pages/index.js — UPDATED (card routing only)
- package.json — UPDATED (if deps added)

### Decisions Made
- [any decisions about layout, markdown rendering, mobile handling]

### Tickets Worked
- BLO-2 — KB Navigation Pages — [status]

### Test Count Delta
- N/A (pre-Flutter phase)

### KB Sections Updated
- [section_id if any KB doc was updated]

### Open Blockers
- [any blockers for subsequent tickets]

### Next Session Should Start With
- BLO-3 or BLO-4 depending on Don's direction
---
```
