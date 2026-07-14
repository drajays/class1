# UI Upgrade Plan — Best-in-Class Child UX (20 Steps)

**Status:** APPROVED PLAN — ready for implementation.
**Planner/Reviewer:** Claude (plan + review only — does NOT write the code).
**Implementer:** Gemini Pro. If a step fails or comes out suboptimal twice, escalate back
to the planner, who will dispatch a coding subagent for that step.
**Date:** 2026-07-14. Baseline commit: `cc4d56e` on `main`.

---

## 0. Verified findings (do not skip — these are confirmed in code, not guesses)

| # | Finding | Evidence |
|---|---------|----------|
| F1 | `StudyTimer.init()` calls `this.injectStyles()` / `this.injectUI()` but **neither method exists** — they were dropped in commit `cc4d56e`. `updateUI()` (line 131) also re-calls `injectUI()`. Throws on every load. | `docs/js/study_timer.js:27-28,134`. Working methods exist at `git show cc4d56e~1:docs/js/study_timer.js` (lines 48 & 153). |
| F2 | Viewport blocks zoom: `maximum-scale=1.0, user-scalable=no`. | `docs/index.html:5` |
| F3 | Brainobrain iframe loads eagerly at startup (`src="brainobrain.html"`), even if never opened; screen has double header + nested scroll; standalone page overflows ~446px on a 390px phone. | `docs/index.html:277`, `docs/brainobrain.html` |
| F4 | Mall renders a full category at once = 200 items (20 adjectives × 10 nouns), ~211 controls, ~12,000px tall page. No pagination, no wish-first sort, no filters. | `docs/js/mall.js:127-150` |
| F5 | Header has 3 stat pills + 5 icon buttons (mummy voice, pause, sound, update, parent) and level appears twice. | `docs/index.html:31-43` |
| F6 | Home order buries the core loop: header → banner → curse → mission → storytime → brainobrain promo → puppies → actions. ~1,900px tall at 390px. | `docs/index.html:46-74` |
| F7 | Play screen: 11 cards at one visual level, subjects mixed with games/promos; progress text is bare ("Lessons: 0/23"). | `docs/index.html:84-130` |
| F8 | Heavy inline styles (brainobrain banner/card/level pill), clickable `<div>`s (`onclick` on mission-card div), no `:focus-visible`, no reduced-motion support, several white-on-bright contrast failures. | `docs/index.html:36,53`, `docs/css/style.css` |
| F9 | No persistent navigation; back buttons vary ("← Park", "← Back"). | all `.game-header`s in `index.html` |

---

## GLOBAL RULES for the implementer (apply to EVERY step)

1. **Learning-first (#1 project rule).** The redesign must make the learning loop
   *more* prominent, never less. Do not add new screens, mascots, or gimmicks.
2. **Plain ES, no build step, no framework, no new dependencies.** Match existing code
   style. CSS prefixes: `mb-*` math/shared, `eb-*` english, `hb-*` hindi, `sb-*`
   subject, `cc-*` curse. New shared UI classes use a `ui-*` prefix.
3. **Every step that changes any file in `docs/` MUST bump `CACHE` in `docs/sw.js`**
   (currently `puppypark-v35` → next `puppypark-v36`, increment per released batch).
4. **Do not touch the `Store` localStorage schema** (player progress must survive).
   Do not rename `App.go()`, `data-go`/`data-back` wiring, `App.refreshStats()`,
   screen `id="screen-*"` + `.active` toggling — extend, don't rewrite.
5. **Verify every step** (FE-TEST): serve `cd docs && python3 -m http.server 8080`,
   screenshot with Edge headless at `--window-size=390,844` AND `430,1000`, check the
   console is error-free (`--dump-dom` or DevTools protocol), test tap flow of the
   changed screen. Deep screens: inject
   `App.selectPlayer('advaita',true);App.go('<screen>')` in a temp copy.
6. **Read & update `COORDINATION.md` before editing shared files**
   (`index.html`, `app.js`, `style.css`, `sw.js`).
7. Don't commit/push unless the user asks. Commit messages end with the repo's
   Co-Authored-By convention.
8. Voice/TTS behavior (`speech.js`, `en-IN`/`hi-IN`) must keep working on every
   changed screen; big text, few words, everything tappable by a 6-year-old.

---

## PHASE A — HOTFIXES (do first, ship as one batch)

### Step 1 — Fix the StudyTimer crash (F1)
- Recover the lost methods: `git show cc4d56e~1:docs/js/study_timer.js` contains
  working `injectStyles()` (line 48) and `injectUI()` (line 153).
- **Merge, don't revert:** keep ALL of `cc4d56e`'s active-study gating
  (`bindActivityListeners`, `lastActiveTimestamp`, `isStudyScreenActive`, pause logic)
  and re-add the two missing methods from the parent commit.
- Make `updateUI()` guard-and-exit instead of re-injecting:
  `const pill = document.getElementById(...); if (!pill) return;`
- Add defensive `this.injectStyles?.(); this.injectUI?.();` in `init()`.
- **Done when:** zero console errors on load and after navigating Park → Learn →
  a math chapter → back; the timer pill renders; timer only ticks on study screens
  with recent interaction (test by idling 65s — it must pause).

### Step 2 — Restore browser zoom (F2)
- `docs/index.html:5` → `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- Apply the same to `docs/brainobrain.html` if it locks zoom.
- **Done when:** pinch-zoom works; screenshots at 390px show no new layout break on
  home, play, mall, math.

### Step 3 — Brainobrain: lazy-load + overflow fix (F3)
- In `index.html`, change the iframe to `data-src="brainobrain.html"` with empty `src`.
  In `app.js` `App.go('brainobrain')`, copy `data-src` → `src` on first open.
- In `brainobrain.html`: fix the horizontal overflow at 390px (hunt fixed widths /
  un-wrapped flex rows; everything `max-width:100%`). Target: `document.documentElement.scrollWidth <= 390`.
- Remove the double-header feel: hide the iframe page's own big header when embedded
  (`window.self !== window.top` → add class `embedded` that collapses its header), or
  slim the outer `.game-header` to just Back + title + "↗ Fullscreen".
- **Done when:** initial app load makes NO request to `brainobrain.html`
  (check server log); screen opens in-app with one header and no horizontal scroll.

---

## PHASE B — DESIGN SYSTEM FOUNDATION

### Step 4 — Design tokens + core components in `style.css`
- Extend existing `:root` (keep current var names working — add, don't rename):
  `--surface`, `--surface-soft`, `--text-secondary`, `--radius-card`, `--shadow-card`,
  plus **accessible action colors** (see Step 18 for exact values).
- Create the `ui-*` component set, each defined ONCE and reused:
  `.ui-btn-primary`, `.ui-btn-secondary`, `.ui-card`, `.ui-subject-card`,
  `.ui-promo-card`, `.ui-stat-chip`, `.ui-progress` (track+fill), `.ui-bottom-nav`.
- Keep the playful identity: Fredoka, rounded corners, cheerful colors — consistency,
  not corporate gray. Reduce the *number of distinct* gradients/shadows to the token set.
- **Done when:** components render in a scratch test page; no visual change yet to
  live screens (foundation only).

### Step 5 — De-inline `index.html`, semantic controls (F8)
- Move ALL inline `style="..."` blocks (brainobrain home banner `:53-66`, play card
  `:86`, level pill `:36`, brainobrain screen wrapper `:267-277`) into `style.css`
  classes built on Step 4 tokens.
- Convert clickable `<div class="mission-card" onclick=...>` (and the Princess status
  card rendered by `curse.js`/`coach.js` if it's a div) to `<button>` with the same
  handler; style `.ui-promo-card` so buttons don't look like form buttons.
- **Done when:** `grep 'style="' docs/index.html` returns only the `hidden`-toggling
  cases or nothing; every clickable element is a `button`/`a`; screens look identical
  in before/after screenshots.

---

## PHASE C — NAVIGATION & HEADER

### Step 6 — Compact header (F5)
- Header keeps ONLY: player chip (name + level, merged — drop the separate `⭐ L1`
  pill), `🪙 coins`, `🦴 bones`, one `⚙️` settings button.
- New settings sheet (reuse `.modal-overlay` pattern): contains 🎙️ Mummy voice
  toggle, ⏸️ voice pause, 🔊 sound, 🔄 update, 👨‍👩‍👧 Parent Corner. All existing
  handlers move over unchanged (`btn-mummy-voice`, `btn-voice-pause`, `btn-sound`,
  `btn-update`, `btn-parent` ids preserved so `app.js` bindings keep working).
- Princess/Curse progress leaves the header (it moves to a compact chip — Step 10).
- **Done when:** header fits one row at 390px, ≤4 tap targets, all 5 relocated
  controls still work from the sheet.

### Step 7 — Persistent bottom navigation (F9)
- New `.ui-bottom-nav`, fixed bottom, 4 items: `🐶 Park` (home) · `📚 Learn` (play) ·
  `🛍️ Mall` · `⋯ More` (opens the settings/adventures sheet). 56–64px tall targets,
  labels ≥14px, `env(safe-area-inset-bottom)` padding, `aria-current="page"` on the
  active item, active state visually obvious for a child.
- Wire in `app.js`: render once in `index.html`, highlight from `App.go()`.
- **Hide during focused work:** when a problem/quiz is active (mathbook/englishbook/
  subjectbook game area visible, minigame running, story playing) hide the bar so the
  child can't bail mid-problem and doesn't lose the "finish what you started" flow.
  Simplest: `body.classList.toggle('in-activity', …)` set by the engines' start/end.
- Add matching `padding-bottom` to `.screen` so content never hides behind the bar.
- **Done when:** every non-activity screen shows the bar; Park↔Learn↔Mall are one tap
  from anywhere; bar is absent during an open math problem.

### Step 8 — Unify back behavior
- One back label style everywhere: `←` + destination name (e.g. `← Park`, `← Learn`).
  Fix the wrong label at `index.html:269` (brainobrain says "← Park" but goes to play).
- With the bottom nav present, back buttons become secondary (smaller, top-left,
  consistent `.ui-btn-secondary`), never the only way out.
- **Done when:** all `data-back` targets are correct and labels match destinations.

---

## PHASE D — HOME & LEARN REORGANIZATION

### Step 9 — Home above-the-fold order (F6)
New order in `#screen-home`:
1. Compact header (Step 6)
2. **Today's Mission card** (`mission-card-home`) with its single Start button
3. **Puppy yard** — 4 puppies + wish count line ("🌟 3 puppies have wishes!")
4. Primary actions: `▶️ Play & Earn` (primary), `🛍️ Puppy Mall`, `🎁 Daily Gift`
5. "More Adventures" section (Step 10)
- Park banner text merges into the puppy yard block (one line, not a separate band).
- **Done when:** at 390×844 the mission card AND at least the top of the puppy yard
  are visible without scrolling; total home height ≤ ~1,200px.

### Step 10 — "More Adventures" compact strip (F6)
- Move Crystal Curse, Story Time and Brainobrain promos into one section titled
  `✨ More Adventures` with three EQUAL compact cards (`.ui-promo-card`, ~1/3 width
  row on phones or horizontal scroll-snap row).
- **Do NOT bury the Crystal Curse mechanic:** its card keeps the live freeze % and a
  small `.ui-progress` bar (it is a core motivation timer, parent-configured). Also
  surface a tiny princess-% chip next to the mission card title if freeze < 50%.
- The big Brainobrain gradient banner (index.html:52-66) is deleted; its content
  becomes one compact promo card.
- **Done when:** the three promos together take ≤ ~180px of vertical space; curse %
  still visible on home; all three still navigate correctly.

### Step 11 — Learn screen: 3-tier hierarchy (F7)
Restructure `#screen-play` into:
1. **Continue Learning** — ONE hero card fed by `Coach` (`coach.js` already picks the
   recommendation): subject icon, chapter title, `▶️ Continue` button.
2. **📚 My Books** — consistent 2-column grid of the 6 subjects: Math, Reading
   (English), Hindi, EVS, Sanskrit, Computer. Equal-size `.ui-subject-card`s.
3. **🎮 Games & Challenges** — smaller secondary cards: Brainobrain, Math Challenge,
   Story Time, Word Power, Fun Games.
- **Done when:** at 390px the hero + full subject grid fit in ~2 viewports; card
  sizes within each tier are identical; every `data-go` still routes.

### Step 12 — Meaningful progress on subject cards (F7)
- Replace bare `Lessons: 0/23` text: each subject card shows
  `Chapter N of M` + a `.ui-progress` bar + `X% ⭐` (percent of chapters completed).
  Data already exists via `Store` level completion (`app.js` currently fills
  `#math-progress` etc. — upgrade that fill code, same element ids).
- Next unlocked chapter name shown on the card when it fits (1 line, ellipsis).
- **Done when:** completing a chapter updates the card's bar/percent immediately on
  return to the Learn screen.

---

## PHASE E — MALL REBUILD (`docs/js/mall.js` + mall CSS)

### Step 13 — Wish-first layout + compact puppy chips (F4)
- Replace the 4 large photo chips with 64–72px round photo chips + name; keep the
  `wants ⭐` hint as a small badge dot.
- Add a **⭐ Wishes** pseudo-category as the FIRST tab and default: shows every
  puppy's current wish as big cards ("Simba wishes for 🎀 Tiny Bow — 🪙 6").
- Within any category, the selected puppy's wish item always sorts to position 1
  with its existing `⭐ Wish!` flag.
- **Done when:** opening the Mall shows wishes first; granting a wish from there
  fires the existing confetti/voice flow (`buy()` unchanged).

### Step 14 — Pagination + affordable-first sort (F4)
- `renderGrid()` sorts: wish → affordable (price ≤ coins, ascending) → unaffordable
  (ascending); owned items sink to the end.
- Render only the first **24** items; append a big `⬇️ Show More Toys` button that
  reveals the next 24 (keep it simple: a `visibleCount` on `Mall`, reset per
  tab/filter change).
- **Done when:** mall DOM has ≤ ~30 product nodes initially; page height at 390px
  ≤ ~2,500px; Show More works repeatedly to the end of the category.

### Step 15 — Filters + honest "can't afford" state (F4)
- Filter chips above grid: `All` · `🪙 Can Buy` · `🆕 Not Owned` (multi-purpose combo
  with category tabs kept).
- Unaffordable card: replace the disabled `Need 🪙` button with
  `You need N more 🪙` + a small `▶️ Play to earn` button that routes to
  `App.go('play')` (this ties the shop back into the learning loop — on-message).
- **Done when:** filters work with pagination; tapping "Play to earn" lands on Learn.

### Step 16 — Mall ergonomics
- Buy buttons ≥44px tall; item name ≥14px; price ≥16px; `⭐ Wish!` flag ≥12px bold
  with accessible contrast; grid 2 columns at 390px (3 at ≥600px).
- **Done when:** tap-target audit of the mall passes (no control < 44×44 CSS px).

---

## PHASE F — ACCESSIBILITY & POLISH (app-wide)

### Step 17 — Typography floor
- Audit `style.css` (+ self-injected styles in `englishbook.js`, `hindibook.js`,
  `subjectbook.js`, `curse.js`, `study_timer.js` after Step 1): body text ≥16px,
  secondary/labels ≥14px, buttons 16–18px. Kill every ≤12px font-size except purely
  decorative flourishes.
- **Done when:** `grep -n 'font-size:\s*\(0\.[0-7]\|1[01]px\|12px\)'` style sources
  shows only justified decorative cases (list them in the PR/commit note).

### Step 18 — Contrast + focus + touch targets
- Fix white-on-bright combos found in audit (white on `#ff9f1c`/`#2ecc71`/`#3b82f6`,
  `#d97706` on white). **Do not go somber** — this is a kids' app. Use the darker
  cheerful shades and VERIFY each pairing at ≥4.5:1 (normal text) / ≥3:1 (≥18px bold
  button text): e.g. orange `#c2410c`–`#9a3412` range, green `#15803d`–`#166534`,
  blue `#1d4ed8`, warning text `#92400e`. Pick the lightest shade that passes.
- Add once, globally:
  ```css
  :focus-visible { outline: 4px solid #1d4ed8; outline-offset: 3px; border-radius: 6px; }
  ```
- Touch targets: min 44×44 on interactive controls — but **scope it**
  (`.ui-btn-primary, .ui-btn-secondary, .mall-buy, .icon-btn, .play-card, .mall-tab,
  .ui-bottom-nav button, .btn-back, .btn-fun`), NOT a blanket
  `button { min-height: 44px }` — blanket rules will distort in-widget controls
  (ten-frame cells, cross-out emoji grid, varnamala tiles), which have their own
  larger sizing.
- `aria-label` on every icon-only button (⚙️, 🔊, chips).
- **Done when:** keyboard Tab shows a visible ring on every control; contrast spot
  checks pass; math widgets (count/crossout/tenframe/clock) look unchanged.

### Step 19 — Reduced motion
- Add the standard `@media (prefers-reduced-motion: reduce)` kill-switch for
  animations/transitions/smooth-scroll.
- **Caution:** first grep `rewards.js` / engines for `animationend` /
  `transitionend` listeners — if any flow *waits* on an animation to advance
  (reward popup, confetti cleanup, curse melt), exempt those specific animations or
  guarantee the listener still fires (0.01ms duration still fires `animationend`;
  verify the confetti DOM nodes still get removed).
- **Done when:** with reduced motion emulated, a full solve→coin→reward→mall→buy loop
  completes with no stuck overlays or orphaned confetti nodes.

---

## Step 20 — Full verification sweep + release batch
1. `python3 validate_math_book.py` → exit 0 (must be untouched, but verify).
2. Console-error-free load + navigation across ALL screens (home, play, mall, puppy,
   math, english, hindi, evs, sanskrit, computer, minigames, storytime, boosters,
   brainobrain, curse, parent modal, settings sheet).
3. Edge headless screenshots of every screen at **390×844** and **768×1024**; visually
   compare against this plan's layout specs (mission+puppies above fold; mall ≤30
   nodes; bottom nav present/absent correctly).
4. Offline check: bump `sw.js` CACHE (final bump), load once online, reload offline.
5. Measure: home height ≤ ~1,200px, learn ≤ ~1,400px, mall initial ≤ ~2,500px at 390px.
6. Update `COORDINATION.md` + `plan.md` status; then ask the user before commit/push.

---

## Review notes on the external UX review (planner's assessment)

The submitted review is **accurate** — F1–F9 all verified in code. Adjustments made
in this plan:

1. **Contrast palette:** the suggested `#9a3412`/`#166534` are safe but drab as
   defaults; plan says "lightest cheerful shade that passes the ratio" (Step 18).
2. **Blanket `button { min-height: 44px }` rejected** — it would deform math-widget
   internals (ten-frame cells, cross-out grids, varnamala tiles). Scoped list instead.
3. **Reduced-motion blanket rule needs an `animationend` audit first** (Step 19) —
   rewards/confetti flows may depend on animation events.
4. **Crystal Curse must not be demoted to a hidden promo** — it's a live motivation
   timer; it keeps a visible % on home (Step 10).
5. **Brainobrain:** keep the in-app route (kids shouldn't be bounced to new tabs),
   but lazy-load + embedded-mode header collapse (Step 3) rather than full route
   integration (too invasive for this pass).
6. **StudyTimer fix must MERGE, not revert:** `cc4d56e`'s activity-gating is a
   deliberate, user-requested behavior; only the two UI methods were lost.

## Escalation protocol
- Gemini implements phases in order (A → F), one phase per batch, verifying each step.
- If a step fails verification twice, STOP that step, note the failure in
  `COORDINATION.md`, and hand back to the planner (Claude) — the planner will review
  and, if needed, dispatch a coding subagent for that step only.
