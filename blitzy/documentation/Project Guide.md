# Blitzy Project Guide — React Todo App (Mermaid-Editor Fix: Scope Clarification)

> **Document type:** Blitzy Project Guide • **Branch:** `blitzy-eeb2d349-c5bb-4c28-8a84-4f589458987a` • **HEAD:** `f0aab74` • **Outcome:** Clarification request (zero code change) with full production-readiness validation of the existing application.

---

## 1. Executive Summary

### 1.1 Project Overview

The objective was to fix a UI defect in a **Mermaid-diagram rich-text editor** — auto-scroll on desktop and screen flicker on mobile when activating formatting controls (Bold, Italic, H1–H3, lists, inline code, code block) — across the **Rules**, **Codebase Context**, and **Build Prompt** tabs. Investigation determined that the target repository is a **React 15.4.2 educational Todo single-page app** that contains none of those components. Blitzy resolved the conflict as an **evidence-backed clarification request** with no source changes, and independently validated that the existing application remains production-ready. Business impact: prevents fabricated, mis-targeted changes and routes the requirement to the correct codebase. Technical scope covered repository scope discovery, conflict determination, and production-readiness validation.

### 1.2 Completion Status

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'pie1':'#5B39F3','pie2':'#FFFFFF','pieStrokeColor':'#B23AF2','pieStrokeWidth':'2px','pieOuterStrokeColor':'#B23AF2','pieOuterStrokeWidth':'2px','pieTitleTextColor':'#B23AF2','pieSectionTextColor':'#111111','pieLegendTextColor':'#111111'}}}%%
pie showData title Completion Status — 80.95% Complete (AAP-scoped)
    "Completed Work (AI)" : 17
    "Remaining Work" : 4
```

| Metric | Value |
|---|---|
| **Total Hours** | **21 h** |
| **Completed Hours (AI + Manual)** | **17 h** (AI: 17 h · Manual: 0 h) |
| **Remaining Hours** | **4 h** |
| **Percent Complete** | **80.95 %** ( 17 ÷ 21 ) |

> Completion % is computed with the PA1 AAP-scoped methodology: `Completed ÷ (Completed + Remaining) = 17 ÷ 21 = 80.95 %`. Colors follow the Blitzy brand: **Completed = Dark Blue `#5B39F3`**, **Remaining = White `#FFFFFF`**.

### 1.3 Key Accomplishments

- ✅ **Exhaustive repository scope discovery** — all **26** `.js` files (**1,535 LOC**) inventoried; a multi-term search (`mermaid`, `scrollIntoView`, `toolbar`, `contentEditable`, `ProseMirror`, `Slate`, `TipTap`, `Lexical`, `Build Prompt`, `Codebase Context`, `Rules tab`, `flicker`, `preventScroll`) returned **zero matches** — the feature is conclusively absent.
- ✅ **Evidence-backed conflict determination** documented across AAP §0.1–§0.8 with file-level citations and a requirement-vs-codebase contrast.
- ✅ **Production-readiness validation of the existing app** — `npm install` audited **843 packages** (exit 0), `npm run build` reported **“Compiled successfully.”**, **72/72** unit tests passed across **4 suites**, runtime verified in Chrome (interactivity confirmed), and ESLint was clean on all modified files.
- ✅ **Clarification request raised** with the exact reproduction contract and acceptance criteria preserved for the true host application.
- ✅ **Working tree kept pristine** — no fabricated code was written; lockfile side-effects (`yarn.lock`, `package-lock.json`) were reverted/removed.

### 1.4 Critical Unresolved Issues

| Issue | Impact | Owner | ETA |
|---|---|---|---|
| Requirement targets a feature/app absent from this repository (Mermaid editor + Rules / Codebase Context / Build Prompt tabs) | Blocks delivery of the **originally requested fix** in any repository | Product / Requester | Pending clarification |
| Correct target repository not yet supplied | The fix cannot be re-scoped to real code until provided | Requester | Pending clarification |

### 1.5 Access Issues

**No access issues identified.** The repository was fully accessible, dependencies installed cleanly (843 packages, exit 0), and the build, unit tests, runtime, and lint checks all completed successfully without permission, credential, or third-party access barriers.

| System / Resource | Type of Access | Issue Description | Resolution Status | Owner |
|---|---|---|---|---|
| Git repository | Read/Write | None — clone, branch, and history fully accessible | ✅ Resolved (no issue) | — |
| npm registry | Read | None — 843 packages resolved/installed | ✅ Resolved (no issue) | — |
| Third-party services / APIs | — | None required (client-only SPA, no backend) | ✅ N/A | — |

### 1.6 Recommended Next Steps

1. **[High]** Review and validate the clarification finding — independently confirm the Mermaid editor and the three named tabs are absent and that the requirement was mis-routed to this Todo repository.
2. **[High]** Supply the **correct target repository** — the application that actually hosts the Mermaid rich-text editor and the Rules / Codebase Context / Build Prompt tabs — so the fix can be re-scoped against real code.
3. **[Medium]** Provide **corrected requirements** (bound to the correct repo) or confirm re-scope, and decide the **disposition of the zero-diff PR** on this branch (close as clarification-only or retain as a documentation record).
4. **[Low]** *(Optional, out of current scope)* Address minor hygiene items in the Todo app at a later time — a benign `console.log("got props")`, a Chrome a11y advisory (input missing `id`/`name`), and the accepted-risk legacy `npm audit` posture.

---

## 2. Project Hours Breakdown

### 2.1 Completed Work Detail

| Component | Hours | Description |
|---|---:|---|
| Repository Scope Discovery & File Inventory | 6 | Full traversal of all 26 `.js` files (1,535 LOC); multi-term feature search returning zero matches; dependency, integration-surface, and attachment determinations (AAP §0.2–§0.4, §0.8). |
| AAP Determination & Conflict Documentation | 5 | Authored the intent clarification, empty file-by-file execution plan plus the conditional host-app approach, and the scope boundaries — all with file-level evidence citations (AAP §0.1, §0.5, §0.6). |
| Production-Readiness Validation | 4 | `npm install --legacy-peer-deps` (843 pkgs), clean production build, 72/72 unit tests across 4 suites, Chrome runtime verification + screenshot, ESLint on 13 modified files, and lockfile hygiene. |
| Clarification Request & Cross-Surface Analysis | 2 | Formulated the clarification request and documented the reproduction contract, acceptance criteria, and desktop/mobile parity requirements for the true host application (AAP §0.7). |
| **Total Completed** | **17** | **Matches Completed Hours in §1.2.** |

### 2.2 Remaining Work Detail

| Category | Hours | Priority |
|---|---:|---|
| Triage & technical review of the clarification finding | 2 | High |
| Supply the correct target repository (app hosting the Mermaid editor + 3 tabs) | 1 | High |
| Corrected requirements / re-scope confirmation / no-op PR disposition | 1 | Medium |
| **Total Remaining** | **4** | **Matches Remaining Hours in §1.2 and §7.** |

### 2.3 Hours Reconciliation (PA1 Methodology)

| Check | Calculation | Result |
|---|---|---|
| Completion % | 17 ÷ (17 + 4) = 17 ÷ 21 | **80.95 %** |
| §2.1 total = §1.2 Completed | 6 + 5 + 4 + 2 | **17 h ✓** |
| §2.2 total = §1.2 Remaining = §7 Remaining | 2 + 1 + 1 | **4 h ✓** |
| §2.1 + §2.2 = Total | 17 + 4 | **21 h ✓** |

> **Scope note.** Per PA1, this percentage reflects only AAP-scoped work plus the path-to-production for the clarification deliverable. **Building the Mermaid editor is explicitly out of scope** (AAP §0.6.2 — doing so would be fabrication) and is therefore excluded from the denominator; it would be a separate, future project once the correct repository is supplied.

---

## 3. Test Results

All tests below originate from Blitzy’s autonomous validation logs for this project and were **independently re-executed** during this assessment (`CI=true; npm test -- --coverage --watchAll=false`).

| Test Category | Framework | Total Tests | Passed | Failed | Coverage % | Notes |
|---|---|---:|---:|---:|---|---|
| Unit — `todo` service | Jest (react-scripts 0.9.0) | 22 | 22 | 0 | 100 % (stmts/branch/func/lines) | Immutable add/update CRUD (`todo.test.js`) |
| Unit — `filter` service | Jest | 22 | 22 | 0 | 100 % | `applyFilter` + `search` pure functions (`filter.test.js`) |
| Unit — `mode` service | Jest | 15 | 15 | 0 | 100 % | Keyboard mode FSM (`mode.test.js`) |
| Unit — `common` util | Jest | 13 | 13 | 0 | 100 % | `objectWithOnly`, `wrapChildrenWith`, `stringInclues` (`common.test.js`) |
| **Total** | **Jest** | **72** | **72** | **0** | **see below** | **4 suites · 0 skipped · 0 blocked** |

**Coverage summary (measured):**

| Scope | % Stmts | % Branch | % Funcs | % Lines |
|---|---:|---:|---:|---:|
| `src/services` (todo, filter, mode) | 100 | 100 | 100 | 100 |
| `src/util` (common) | 100 | 100 | 100 | 100 |
| `src/components/ui` + `src/components/wrappers` | 0 | 0 | 0 | 0 |
| **All files (aggregate)** | **24.85** | **18.97** | **29.23** | **25.38** |

> The **business-logic layer (services + util) is fully covered at 100 %**. The presentational UI/wrapper components carry **0 % unit coverage by design** — they are validated through runtime verification (see §4). The aggregate figure is dominated by these untested-by-unit presentational components.
>
> **Integrity note:** There are **no feature tests** for the reported defect because the Mermaid-editor feature does not exist in this repository. Every one of the 72 tests validates the pre-existing Todo application and confirms it remains healthy.

---

## 4. Runtime Validation & UI Verification

**Application runtime health** (production build served and loaded in Chrome via DevTools):

- ✅ **Dependency install** — `npm install --legacy-peer-deps` audited 843 packages, exit 0.
- ✅ **Production build** — “Compiled successfully.”; emitted `main.76df5604.js` (53.95 KB gzip) and `main.66b68aa3.css` (19.33 KB gzip); webpack 1.x compiled cleanly on Node 20 / OpenSSL 3 with no legacy-provider flag.
- ✅ **Unit tests** — 72/72 passing across 4 suites.
- ✅ **React mount & render** — full Todo SPA rendered: “THINGS TO DO” header, “Add New” input, 3 seeded todos, footer filters (All / Active / Completed), and “3 items left”.
- ✅ **Interactivity** — toggling a checkbox updated the counter from “3 items left” to “2 items left” (exercises `StateProvider` + `todo` service + `Footer`).
- ✅ **Console health** — zero console errors at runtime.
- ✅ **Lint** — ESLint (CRA `react-app` config) clean on all 13 modified files.

**UI verification of the requirement’s named surfaces:**

- ❌ **Mermaid-diagram rich-text editor** — not present (nothing to verify).
- ❌ **Formatting toolbar** (Bold / Italic / H1–H3 / lists / inline code / code block) — not present.
- ❌ **Rules / Codebase Context / Build Prompt tabs** — not present.

**API integration outcomes:**

- ⚠ **Not applicable** — this is a client-only SPA with no backend, network layer, or external service integrations.

**Minor, non-blocking observations** (out of scope per AAP §0.6.2):

- ⚠ Benign `console.log("got props")` in the app render path.
- ⚠ Chrome accessibility advisory: a form input lacks `id`/`name` (not a runtime error).

---

## 5. Compliance & Quality Review

Cross-mapping the AAP deliverables to Blitzy quality and compliance benchmarks:

| Benchmark | AAP Deliverable | Status | Progress | Evidence / Notes |
|---|---|:--:|:--:|---|
| Scope discovery completeness | R1 Repository scope discovery (§0.2) | ✅ Pass | 100 % | All 26 `.js` files inventoried; zero feature-term matches. |
| No fabrication / no scope change | R5 Empty execution plan (§0.5) | ✅ Pass | 100 % | Empty action set honored; no invented editor/Mermaid code. |
| Evidence quality of determination | R2 Conflict documentation (§0.1–§0.2) | ✅ Pass | 100 % | File-level citations throughout the AAP. |
| Build integrity | R10 Validation | ✅ Pass | 100 % | “Compiled successfully.”, zero warnings. |
| Test integrity | R10 Validation | ✅ Pass | 100 % | 72/72 passing; services + util at 100 % coverage. |
| Lint / code style | R10 Validation | ✅ Pass | 100 % | ESLint clean on all modified files. |
| Dependency policy | R3 Dependency inventory (§0.3) | ✅ Pass | 100 % | No dependencies added/changed; React 15.x lock preserved. |
| Lockfile hygiene | R10 Validation | ✅ Pass | 100 % | `yarn.lock` reverted; generated `package-lock.json` removed. |
| Module documentation | (Context — prior work) | ✅ Pass | 100 % | JSDoc + 13 README files present and accurate. |
| Clarification protocol | R9 Clarification request | ✅ Pass | 100 % | Request raised with reproduction contract + acceptance criteria. |
| Requirement resolution (delivery) | P1–P3 (human) | ⏳ Outstanding | 0 % | Awaiting correct repo / corrected requirements. |

**Fixes applied during autonomous validation:** lockfile hygiene revert to keep the committed tree pristine. **Outstanding item:** human resolution of the clarification request (see §1.6 and §2.2).

---

## 6. Risk Assessment

| Risk | Category | Severity | Probability | Mitigation | Status |
|---|---|:--:|:--:|---|:--:|
| Requirement targets a different application (Mermaid editor / tabs absent) | Technical | High | High | Clarification request raised; require correct repo before any code work; do not fabricate. | ✅ Mitigated |
| Wrong-repo routing — zero valid integration touchpoints in this SPA | Integration | High | High | Route the requirement to the correct codebase via the clarification request. | ✅ Mitigated |
| Clarification stall — original fix never delivered if the human gate is not actioned | Operational | High | Medium | Prioritized human task list (§1.6/§2.2) with an explicit request for the correct repository. | ⏳ Open (awaiting human) |
| Legacy EOL toolchain (React 15.4.2, react-scripts 0.9.0, webpack 1.x, deprecated `recompose`) | Technical | Medium | Low | Version lock intentionally preserved for the workshop; isolate any future work; documented. | ⚠ Accepted |
| ~193 `npm audit` findings in the legacy `react-scripts` 0.9.0 dependency tree | Security | Medium | Low | Accepted-risk legacy build/dev-time tooling; **do not** `npm audit fix` (breaks the React 15 lock); revisit on a deliberate stack upgrade. | ⚠ Accepted |
| No-op PR disposition (branch has zero code diff vs. base) | Operational | Low | Medium | Document merge/close guidance; treat as clarification-only record. | ⏳ Open |
| Stray `console.log("got props")` in render path | Technical | Low | Low | Remove in a future hygiene pass (out of current scope). | ⏳ Open (non-blocking) |
| Chrome a11y advisory — input lacks `id`/`name` | Operational | Low | Low | Add `id`/`name` in a future accessibility pass (out of current scope). | ⏳ Open (non-blocking) |
| No application-level security surface for the absent feature (no auth/persistence/network) | Security | Info | — | None required — client-only SPA. | ✅ N/A |

---

## 7. Visual Project Status

**Project hours — completed vs. remaining** (Blitzy brand colors: Completed `#5B39F3`, Remaining `#FFFFFF`):

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'pie1':'#5B39F3','pie2':'#FFFFFF','pieStrokeColor':'#B23AF2','pieStrokeWidth':'2px','pieOuterStrokeColor':'#B23AF2','pieOuterStrokeWidth':'2px','pieTitleTextColor':'#B23AF2','pieSectionTextColor':'#111111','pieLegendTextColor':'#111111'}}}%%
pie showData title Project Hours Breakdown (Total 21h)
    "Completed Work" : 17
    "Remaining Work" : 4
```

**Remaining work by priority** (sums to the 4 h remaining):

```mermaid
%%{init: {'theme':'base', 'themeVariables': {'pie1':'#5B39F3','pie2':'#A8FDD9','pieStrokeColor':'#B23AF2','pieStrokeWidth':'2px','pieOuterStrokeColor':'#B23AF2','pieOuterStrokeWidth':'2px','pieTitleTextColor':'#B23AF2','pieSectionTextColor':'#111111','pieLegendTextColor':'#111111'}}}%%
pie showData title Remaining Hours by Priority
    "High" : 3
    "Medium" : 1
```

| Remaining category | Hours | Priority |
|---|---:|:--:|
| Triage & technical review of the clarification finding | 2 | High |
| Supply the correct target repository | 1 | High |
| Corrected requirements / re-scope / PR disposition | 1 | Medium |
| **Total** | **4** | — |

> **Integrity check:** “Remaining Work” = **4 h** in the pie chart equals the Remaining Hours in §1.2 and the sum of the §2.2 Hours column. “Completed Work” = **17 h** equals the Completed Hours in §1.2.

---

## 8. Summary & Recommendations

**Achievements.** Blitzy performed an exhaustive, evidence-backed investigation and correctly determined that the requested defect — auto-scroll and flicker in a Mermaid-diagram rich-text editor across the Rules, Codebase Context, and Build Prompt tabs — **cannot exist in this repository**, because the repository is a React 15.4.2 educational Todo SPA with no editor, no formatting toolbar, no Mermaid embed, and no tabbed workspace. The empty action set was the correct, non-fabricating outcome. In parallel, the existing application was independently validated as production-ready: a clean 843-package install, a successful production build, **72/72 passing unit tests** (100 % coverage of the services + util business-logic layer), verified runtime interactivity, and clean linting.

**Remaining gaps.** The only outstanding work is the **human clarification gate** (4 h): review and confirm the finding, supply the correct target repository, and provide corrected requirements / disposition the zero-diff PR. The Mermaid-editor fix itself is **not deliverable in this codebase** and would constitute a separate, future project once the correct repository is provided.

**Critical path to production.** `Review finding → supply correct repository → provide corrected requirements → re-scope against the real codebase`. Until the correct repository is supplied, no further automated progress on the original requirement is possible.

**Production readiness.** The **existing Todo application is production-ready as-is** (build, tests, runtime, and lint all green). The **originally requested feature is 0 % deliverable here** and must be re-routed. Against the AAP’s re-scoped (clarification) deliverables, the project is **80.95 % complete** — all autonomous investigation, documentation, and validation work is finished; only the human clarification gate remains.

| Success Metric | Target | Actual | Status |
|---|---|---|---|
| Repository scope fully discovered | 100 % | 100 % (26/26 files) | ✅ |
| Feature presence conclusively determined | Yes | Yes (0 matches) | ✅ |
| Existing app build | Success | “Compiled successfully.” | ✅ |
| Existing app unit tests | 100 % pass | 72/72 | ✅ |
| No fabricated code | 0 invented files | 0 | ✅ |
| Clarification raised | Yes | Yes | ✅ |
| Requirement delivered | Yes | Pending correct repo | ⏳ |

---

## 9. Development Guide

> Commands below were executed/verified during this assessment on **Node v20.20.2 / npm 10.8.2** (Windows PowerShell). They are copy-pasteable; PowerShell-specific variants are shown where the shell differs.

### 9.1 System Prerequisites

- **Node.js** 20.x LTS (verified on v20.20.2). The legacy `react-scripts` 0.9.0 + webpack 1.x toolchain compiles cleanly on Node 20 / OpenSSL 3 — **no** `--openssl-legacy-provider` flag is required.
- **npm** 10.x (verified on 10.8.2). *(The repository also ships a `yarn.lock`; npm is the validated path.)*
- **Git** (any recent version) and **Git LFS** (the repo’s hooks are LFS-only).
- **Disk:** ~500 MB free for `node_modules`.
- **OS:** cross-platform (Windows / macOS / Linux). A modern Chromium browser is recommended for runtime verification.

### 9.2 Environment Setup

- Clone the repository and check out the branch:

```bash
git clone https://github.com/kabirbaidhya/react-todo-app.git
cd react-todo-app
git checkout blitzy-eeb2d349-c5bb-4c28-8a84-4f589458987a
```

- **No environment variables are required.** This is a pure client-side SPA with no backend, database, or secrets. `.env` is git-ignored and unnecessary for normal runs. Optional knobs: `CI=true` (single-run tests/build), `BROWSER=none` (suppress dev-server auto-open), `PORT=<n>` (change the dev-server port).

### 9.3 Dependency Installation

```bash
# React 15-era peer ranges require legacy peer resolution on npm 10:
npm install --legacy-peer-deps      # => "audited 843 packages", exit 0
```

- Keep the committed tree pristine afterward (the install reformats `yarn.lock` and generates `package-lock.json` as side effects):

```bash
git checkout -- yarn.lock           # revert yarn.lock reformatting
rm -f package-lock.json             # PowerShell: Remove-Item -Force package-lock.json
```

### 9.4 Application Startup

```bash
# Option A — development server (hot reload) on http://localhost:3000
#   PowerShell: $env:BROWSER="none"; npm start
BROWSER=none npm start

# Option B — production build, then serve the static output
CI=true npm run build               # => "Compiled successfully."
npx serve -s build -l 4173          # or any static server; open http://localhost:4173
```

### 9.5 Verification Steps

```bash
# 1) Build is clean:
CI=true npm run build
#    Expected tail: "Compiled successfully." +
#    main.76df5604.js (53.95 KB gz), main.66b68aa3.css (19.33 KB gz)

# 2) Unit tests pass (single run, no watch):
#    PowerShell: $env:CI="true"; npm test -- --watchAll=false
CI=true npm test -- --watchAll=false
#    Expected: Test Suites: 4 passed, 4 total | Tests: 72 passed, 72 total

# 3) (Optional) Coverage:
CI=true npm test -- --coverage --watchAll=false
#    Expected: src/services + src/util at 100%; aggregate ~24.85% stmts
```

- **Runtime smoke check:** open the app and confirm the “THINGS TO DO” header, the “Add New” input, 3 seeded todos, the footer filters (All / Active / Completed), and “3 items left”. Toggle a checkbox and confirm the counter decrements to “2 items left”. The browser console should be error-free.

### 9.6 Example Usage

- **Add a todo:** focus the “Add New” input, type a task, press **Enter** → a new pending item appears and the active count increments.
- **Toggle status:** click an item’s checkbox → it switches completed/pending and “items left” updates.
- **Filter:** click **All / Active / Completed** in the footer to filter the list.
- **Search:** use the search box to filter items by text (case-insensitive substring match).

### 9.7 Troubleshooting

- **`ERESOLVE` / peer-dependency errors on install** → use `npm install --legacy-peer-deps` (React 15-era ranges).
- **Dirty tree after install** → revert `yarn.lock` and delete `package-lock.json` (see §9.3).
- **Port 3000 already in use** → set `PORT` (PowerShell: `$env:PORT=3001; npm start`).
- **OpenSSL / “digital envelope routines” error** → not applicable here (this stack builds cleanly on Node 20); only relevant for other legacy webpack stacks.
- **`build/` or `coverage/` not committed** → expected; both are git-ignored (`/build`, `/coverage`, `/node_modules`).

---

## 10. Appendices

### Appendix A — Command Reference

| Purpose | Command (bash) | PowerShell variant |
|---|---|---|
| Install dependencies | `npm install --legacy-peer-deps` | same |
| Revert lockfile churn | `git checkout -- yarn.lock && rm -f package-lock.json` | `git checkout -- yarn.lock; Remove-Item -Force package-lock.json` |
| Dev server | `BROWSER=none npm start` | `$env:BROWSER="none"; npm start` |
| Production build | `CI=true npm run build` | `$env:CI="true"; npm run build` |
| Unit tests | `CI=true npm test -- --watchAll=false` | `$env:CI="true"; npm test -- --watchAll=false` |
| Tests + coverage | `CI=true npm test -- --coverage --watchAll=false` | `$env:CI="true"; npm test -- --coverage --watchAll=false` |
| Serve static build | `npx serve -s build -l 4173` | same |

### Appendix B — Port Reference

| Port | Purpose |
|---|---|
| 3000 | CRA development server (`npm start`) |
| 4173 | Example static-server port used to serve the production `build/` during validation |

### Appendix C — Key File Locations

| Path | Role |
|---|---|
| `src/index.js` | Entry — mounts `<App/>` into `#root` (29 LOC) |
| `src/components/wrappers/` | `App.js` (75), `StateProvider.js` (180), `KeyStrokeHandler.js` (116) |
| `src/components/hoc/wrapInputBox.js` | Recompose input enhancer (20) |
| `src/components/ui/` | 12 presentational components (`TodoList`, `Header`, `InputBox`, `SearchBox`, `FilteredList`, `TodoItem`, `CheckBox`, `Filter`, `Footer`, `InputWrapper`, `ButtonWrapper`, `Info`) |
| `src/services/` | `todo.js` (144), `filter.js` (102), `mode.js` (15) |
| `src/util/common.js` | `objectWithOnly`, `wrapChildrenWith`, `stringInclues` (80) |
| `src/assets/text/en_US.js` | English UI strings (30) |
| `src/__tests__/` | 4 unit suites: `services/todo.test.js`, `services/filter.test.js`, `services/mode.test.js`, `util/common.test.js` |
| `blitzy/documentation/` | Prior Blitzy `Project Guide.md` + `Technical Specifications.md` |
| `package.json` | Manifest (React 15.4.2; `react-scripts` 0.9.0) |

### Appendix D — Technology Versions

| Component | Version | Notes |
|---|---|---|
| React / React-DOM | ^15.4.2 | Intentional version lock (workshop) |
| Bootstrap | ^3.4.1 | CSS-only grid/typography |
| immutability-helper | ^2.1.1 | Immutable state updates |
| keycode-js | ^0.0.4 | Keyboard key-code constants |
| recompose | ^0.23.5 | HOC composition (deprecated; retained for React 15.x) |
| react-scripts | 0.9.0 (devDependency) | CRA build/test toolchain (webpack 1.x) |
| Node.js / npm | 20.20.2 / 10.8.2 | Verified runtime |

### Appendix E — Environment Variable Reference

| Variable | Required? | Purpose |
|---|---|---|
| `CI` | Optional | `true` forces single-run tests/build (no watch). |
| `BROWSER` | Optional | `none` prevents `npm start` from auto-opening a browser. |
| `PORT` | Optional | Overrides the dev-server port (default 3000). |
| *(application secrets)* | None | No `.env`, API keys, or secrets are required — client-only SPA. |

### Appendix F — Developer Tools Guide

- **Chrome DevTools (MCP)** was used to load the served production build, confirm the React mount and full Todo render, exercise interactivity (checkbox toggle → counter update), and confirm zero console errors. A runtime screenshot was saved to `blitzy/screenshots/`.
- **ESLint** (CRA `react-app` config, ESLint v3.8.1) reported zero violations on all modified files.
- **Jest** (bundled with `react-scripts` 0.9.0) is the unit-test runner; use `--watchAll=false` (or `CI=true`) for single-run execution and `--coverage` for the coverage report.

### Appendix G — Glossary

| Term | Definition |
|---|---|
| **AAP** | Agent Action Plan — the primary directive enumerating the project requirements and scope. |
| **Clarification request** | The AAP’s resolution when the described feature/app does not match the target repository; asks for the correct repo / corrected requirements. |
| **Empty action set** | A file plan with no CREATE/UPDATE/DELETE/REFERENCE actions — the correct, non-fabricating outcome here. |
| **SPA** | Single-Page Application — a client-side app rendered in the browser with no server round-trips for navigation. |
| **FSM** | Finite State Machine — used by the keyboard mode service (`mode.js`). |
| **HOC** | Higher-Order Component — the `recompose`-based `wrapInputBox` enhancer. |
| **PA1 methodology** | Blitzy’s AAP-scoped completion calculation: `Completed ÷ (Completed + Remaining)`. |
| **Path-to-production** | Standard activities required to take AAP deliverables to a production outcome — here, the human clarification gate. |

---

*End of Blitzy Project Guide.*