# PLAN.md — Complete all remaining subject content (book-faithful)

**Written by:** Planning/Review session (senior manager).
**Implemented by:** a separate implementer agent.
**Review protocol:** at the end of every phase the implementer STOPS, updates the
"Phase status" checkbox below, logs the change in `COORDINATION.md`, and waits for
review sign-off before starting the next phase. The reviewer checks quality against
the acceptance criteria in each phase and gives feedback here or in `COORDINATION.md`.

---

## 1. Architecture snapshot (as of 2026-07-07, commit 72948f6)

Static vanilla-JS PWA in `docs/`, no build step for JS. Single `index.html` with
screen `<section>`s toggled by `App.go()`. State in `localStorage` via `js/store.js`
(coins → bones → puppy wishes economy). TTS via `js/speech.js`, sounds via
`js/sounds.js`, rewards via `js/rewards.js`. Service worker `docs/sw.js` — **every
asset-list change requires a `CACHE` name bump.**

Two content pipelines exist today:

| Path | Engine | Data | Quality |
|---|---|---|---|
| **Book engines** (good) | `mathbook.js`, `englishbook.js`, `hindibook.js` | `math_book.json` (20 ch/191 problems), `english_book.json` (62 ch), `hindi_words.json` + embedded varnamala | Hand-authored, book-faithful, guided step-by-step, gated, coin-earning |
| **Legacy notes+quiz** (bad) | `learn.js` + `extras.js` (SubjectHub) via `catalog.json` | `maths.json`, `english_grammar.json`, `evs.json`, `hindi.json`, `sanskrit.json`, `computer.json` (built by `build_app_data.py` from `organized/`) | Notes are raw OCR dumps; **auto-generated MCQs are nonsense** (answers like "Help Box", options that are OCR line fragments). Violates the pedagogy rules in `CLAUDE.md`. |

Source of truth for all subjects: `organized/<subject>/<NN_chapter>/content.md`
(+ `pictures/`), and full OCR in `noupload/*.md`:

- `organized/evs/` — 16 chapters (All About Me → Our Universe)
- `organized/hindi/` — 25 chapters (पाठ + मात्रा lessons; folder names are OCR-mangled — read `content.md` inside each)
- `organized/sanskrit/` — 14 chapters (varnamala → avarta sanskritam)
- `organized/computer/` — 7 chapters
- `organized/english_grammar/` — 25 chapters (mostly covered by english_book already)
- `organized/maths/` — done (math_book.json)

**Gap this plan closes:** EVS, Hindi lessons, Sanskrit, and Computer must get
curated, book-faithful content on the proven "book engine" pattern, and the OCR
garbage must stop being what Advaita sees. Plus: refresh `CLAUDE.md` and add
skills so future sessions do this correctly.

**The #1 rule stays in force:** learning first, lean app, no bloat. Reuse the
existing `mb-*` visual language and `Store.completeLevel(subject, levelId, stars)`
economy. Do NOT invent new reward systems, screens, or frameworks.

---

## 2. Phase status (implementer: tick + log in COORDINATION.md; reviewer signs off)

- [x] Phase 0 — Docs & skills refresh — **sign-off: ✅ APPROVED 2026-07-07 (2 should-fixes → fold into first Phase 1 commit; see COORDINATION.md "Review — Phase 0")**
- [x] Phase 1 — Shared SubjectBook engine + content schema + validator — **sign-off: ✅ APPROVED 2026-07-07 (conditions cleared on re-review; see COORDINATION.md). Phase 2 unblocked.**
- [x] Phase 2 — EVS (16 chapters) — **sign-off: ✅ APPROVED 2026-07-07 — 1 should-fix (distractor pass: ✅ RESOLVED in full substance pass; see COORDINATION.md "EVS & Computer Distractor Substance Pass"). Phase 3 unblocked.**
- [x] Phase 3 — Hindi book lessons (पाठ) into HindiBook — **sign-off: ✅ APPROVED 2026-07-07 (both conditions cleared on re-review, verified live; see COORDINATION.md). Phase 4 unblocked.**
- [x] Phase 4 — Sanskrit (14 chapters) — **sign-off: ✅ APPROVED 2026-07-08 — 1 should-fix (speech.js empty-voice-list race) due before Phase 7 QA; see COORDINATION.md "Review — Phase 4". Phase 5 unblocked.**
- [x] Phase 5 — Computer (7 chapters) — **sign-off: ✅ APPROVED WITH CONDITIONS 2026-07-08 — speech.js fix verified ✔; EVS & Computer distractor substance pass ✅ CLEARED (verifiable deliverable logged in COORDINATION.md). Phase 6 unblocked.**
- [x] Phase 6 — English grammar audit vs organized/ (gap-fill only) — **sign-off: ✅ APPROVED 2026-07-08 — coverage table verified by sampling; 4 composition skips confirmed legitimate. Distractor-pass condition also CLEARED (verified). Next: Phase 8 → 9 → 10 → 7 (ship gate last).**
- [ ] Phase 7 — Retire legacy path, integration QA, ship — **sign-off: ❌ RETURNED 2026-07-08 — FE-TEST not run, dead-file cleanup incomplete, out of order (runs LAST, after Phases 11+12 approval); screen/script retirement itself looks good and boot is clean; see COORDINATION.md.**
- [x] Phase 8 — Mastery-gated economy (puppies eat only NEW learning) — **sign-off: ✅ FULLY APPROVED 2026-07-08 — mastery gate + locking verified live; fun-faucet daily cap verified live (10,10,10,0,0). Phase 9 in progress: ranking table conditionally approved (re-level English vocab block first) + missing log entry required; see COORDINATION.md.**
- [x] Phase 9 — Difficulty ladder + adaptive encouragement — **sign-off: ✅ FULLY APPROVED 2026-07-08 — coach A/B/C + Hindi integration verified live; final 2 items (hidden-screen launch bug fix + consolidated log entry) applied by the REVIEWER on user instruction and re-verified live (math/hindi/evs missions land on visible screens; sw v18). Phase 10 unblocked.**
- [x] Phase 10 — Daily journey log + parent insights + web-history trail — **sign-off: ✅ APPROVED 2026-07-08 — journal fields/cap/size, history stamp+restore, stale-hash boot, parent gate + all 4 sections verified live with seeded data; 1 should-fix ("Not touching" lists locked chapters) due at Phase 7 QA; see COORDINATION.md "Review — Phase 10". Phase 11 unblocked.**
- [x] Phase 11 — The Crystal Curse (princess rescue meta-game, all subjects) — **sign-off: ✅ APPROVED 2026-07-08 on re-review — melt/replay/mentor/rescue loop all verified live; 3 should-fixes at Phase 7 QA (real problem totals, unlocked+diverse melt targets, fix-batch logging) + 1 accepted deviation (easier 100% recovery); see COORDINATION.md "Re-review — Phase 11". Phase 12 next.**
- [ ] Phase 12 — Voice settings (voice picker + speed + test sound) — **sign-off: ___**
- [ ] Phase 12b — "Mummy's Voice" pre-generated clone option — **sign-off: ___**

**Execution-order note:** Phases 8–10 are app-mechanics phases, independent of the
content phases. Recommended order: run **Phase 8 right after Phase 1** (it changes the
reward API every engine must call — cheaper before 4 subjects are wired than after),
Phase 9 alongside content authoring (each new chapter gets its `level` field as it's
written; retrofit math/english), Phase 10 any time after Phase 8, **Phase 11 (Crystal
Curse) after Phases 9 & 10** (it consumes their telemetry/recommender). Phase 7
(retire legacy + full QA + ship) remains the FINAL gate and its QA sweep must
re-verify Phases 8–11 behaviors end-to-end (FE-TEST incl. T5b).

---

## Phase 0 — Docs & skills refresh

Small, no app code. Goal: future sessions (including the implementer of phases 1–7)
have accurate instructions.

1. **Update `CLAUDE.md`:**
   - Status/roadmap section: English Book is DONE (62 chapters), Hindi varnamala +
     reading module is DONE; add this plan (`plan.md`) as the active roadmap.
   - File map: add `js/hindibook.js`, `js/englishbook.js`, `data/english_book.json`,
     `data/hindi_words.json`; note CSS prefix convention (`mb-*` math/shared,
     `eb-*` english-reserved, `hb-*` hindi self-injected).
   - Add a "Subject content pedagogy" section generalizing the math rules to ALL
     subjects: strictly the book, ignore OCR garbage, sequence + gating, wrong
     answer → gentle worked explanation → retry, voiced, minimal words.
2. **Update `.claude/skills/puppy-park/SKILL.md`:** add the Hindi/English engines,
   the `hb-*`/`eb-*` conventions, and the sw.js cache-bump rule.
3. **New skill `.claude/skills/subject-content/SKILL.md`:** how to author a curated
   subject chapter — where the source is (`organized/<subject>/<ch>/content.md`),
   the JSON schema (defined in Phase 1 — update the skill then), the "throw out OCR
   questions, keep concept faithful" rule, per-subject TTS locale
   (`hi-IN` Hindi, Sanskrit read via `hi-IN`, `en-IN` others), and the verification
   checklist (validator script + headless-Edge screenshot recipe from CLAUDE.md).
4. **New skill `.claude/skills/verify-app/SKILL.md`:** the run/verify recipe —
   serve `docs/` on :8080, headless Edge screenshot command, how to deep-link a
   screen (`App.selectPlayer('advaita',true);App.go('<screen>')` injection), and
   the JSON validators (`validate_math_book.py` + the Phase-1 validator).

**Acceptance criteria (reviewer checks):**
- CLAUDE.md matches reality (spot-check every file it names exists).
- Skills are short, imperative, no duplication of whole CLAUDE.md.
- Nothing in `docs/` changed; no commit yet (commit at phase end only if user asked —
  default: ask the user before pushing).

---

## Phase 1 — Shared SubjectBook engine + schema + validator [COMPLETED]

**Decision (made now, don't relitigate):** do NOT write four new engines and do NOT
try to salvage `learn.js` auto-quizzes. Build ONE small generic engine,
`docs/js/subjectbook.js` (`SubjectBook`), modeled on `englishbook.js` (~400 lines),
that renders any curated subject file. Hindi lessons are the exception — they extend
the existing `HindiBook` (Phase 3) because it already owns the Hindi screen, TTS
fallback, and `hb-*` styles.

1. **Curated content schema** — one file per subject:
   `docs/data/evs_book.json`, `sanskrit_book.json`, `computer_book.json`
   (and later `hindi_lessons.json`). Shape (mirror english_book):

   ```json
   { "subject": "evs", "title": "EVS", "icon": "🌿", "lang": "en-IN",
     "chapters": [ {
       "id": "evs_my_body", "title": "My Amazing Body", "icon": "🖐️",
       "concept": { "intro": ["1–4 short voiced lines, puppy-coach tone"],
                    "tip": "one memory tip" },
       "problems": [ { "skill": "pick", "q": "...", "options": ["..."],
                       "a": "...", "why": "one-line kid explanation" } ]
     } ] }
   ```

   Skills: `pick` (visual MCQ) is the workhorse; also support `pickimg`
   (options are emoji), `truefalse` (sugar for 2-option pick), and `sort`
   ONLY if a chapter genuinely needs it (e.g. EVS living/non-living) — otherwise
   skip; lean beats clever. Every problem MUST have `why`.
2. **Engine `docs/js/subjectbook.js`:** gated chapter picker → concept intro
   (voiced) → problems in order → wrong answer = show `why`, speak it, retry
   (never punish) → stars via `Store.completeLevel(subject, chapterId, stars)`
   → coins flow into the existing economy. Reuse `mb-*` classes + inline styles,
   **zero new CSS in style.css.** Read TTS in the file's `lang`.
3. **Wiring (shared files — log in COORDINATION.md):** `index.html` gets ONE
   reusable `#screen-subjectbook` section + play-cards for EVS/Sanskrit/Computer;
   `app.js` `go()` routes `evs|sanskrit|computer → SubjectBook.open(subject)`;
   `refreshStats()` shows per-subject progress; `sw.js` add files + bump `CACHE`.
   Keep the legacy SubjectHub cards for these subjects hidden/removed only in
   Phase 7 (so nothing breaks mid-plan).
4. **Validator `validate_subject_book.py`:** schema check + every `a` present in
   `options` + no duplicate chapter/problem ids + `why` present + no OCR artifacts
   (heuristics: options containing "Help Box", leading "1." numbering, length > 60
   chars, non-Devanagari mojibake like `τ`/`ட` in Hindi/Sanskrit strings).
5. **Prove it end-to-end** with a 2-chapter stub of `evs_book.json`, verified in
   headless Edge (screenshots of picker, a problem, the wrong-answer explanation).

**Acceptance criteria:**
- Validator passes; screenshots show the three states; coins actually increment
  (check localStorage or the header counter in a scripted run).
- `subjectbook.js` ≲ 450 lines, no framework, matches existing code style.
- No `style.css` edits; `sw.js` CACHE bumped once; COORDINATION.md updated.

---

## Phase 2 — EVS: 16 curated chapters

For each of `organized/evs/00…15`, read `content.md`, extract the real teaching
points, and author a chapter in `evs_book.json`:

- Order: exactly the book order (All About Me → My Amazing Body → Family → Home →
  School → Plants → Animals → Food → Clothes → Air & Water → Neighbourhood →
  Helpers → My Country Bharat → World Around Us → Our Universe). Fold
  `00_evs_introduction` into the first chapter's intro if it's thin.
- Per chapter: 3–4 line concept intro + 1 memory tip + **6–10 problems**, every
  question answerable FROM THE BOOK content (e.g. sense organs ↔ what they do,
  living vs non-living, helpers ↔ their jobs). Use emoji visuals in options where
  natural (🖐️👁️👂👅👃). Discard every auto-generated question in `evs.json`.
- Reading level: a 6–8-year-old reads it herself. Short words. TTS `en-IN`.

**Acceptance criteria (reviewer will spot-check 4 random chapters against
`organized/evs/*/content.md`):** faithful to book concepts, no OCR echoes, every
wrong answer explanation actually teaches, validator clean, chapter gating works,
full-run screenshot per 4 sampled chapters.

---

## Phase 3 — Hindi book lessons (पाठ) inside HindiBook

Hindi already has varnamala + matra + reading practice. Missing: the actual book
lessons (`organized/hindi/01…24` — stories like शेर और चूहा, मछली रानी, and मात्रा
chapters aligned to them).

1. New `docs/data/hindi_lessons.json` (curated, same schema, `lang: "hi-IN"`).
   Folder names are OCR-mangled — derive real titles from each `content.md`.
   The मात्रा chapters overlap the existing matra tab: for those, author
   **practice problems** (words from that lesson) rather than re-teaching letters.
   Story chapters: 2–3 line retell in simple Hindi (voiced) + 5–8 comprehension/
   vocabulary `pick` problems drawn from the story.
2. Add a **"📕 पाठ" tab** to `HindiBook` (stays `hb-*`, self-injected CSS), gated
   lesson list, coins via `Store.completeLevel('hindi','paath-N', stars)`.
3. Keep the transliteration TTS fallback working for all new strings.
4. `sw.js`: add `hindi_lessons.json`, bump CACHE. Log in COORDINATION.md.

**Acceptance criteria:** 20+ lessons in book order; Devanagari is clean (no `τ`,
`ட`, `१` mojibake — validator's mojibake check must cover this file); reviewer
spot-checks 3 lessons against `content.md`; tab renders and speaks in headless
Edge; existing 4 tabs unbroken.

---

## Phase 4 — Sanskrit: 14 curated chapters

`organized/sanskrit/00…13` → `sanskrit_book.json` via SubjectBook (`lang: "hi-IN"`
— Devanagari TTS; if pronunciation is poor, reuse HindiBook's transliteration
fallback by exporting it as a shared helper — small, no duplication).

- Class-1 Sanskrit is recognition + recitation: varnamala, बालगीतानि (rhymes),
  simple शब्द (मम शरीरम् body words, animal words), devata names. Problems are
  match/recognize `pick`s (e.g. "hasta का अर्थ?" → 🖐️), NOT grammar drills.
- Rhyme/geet chapters: show the verse, voice it line-by-line on tap, then 3–4
  simple word-meaning questions. Keep it light — this subject is the easiest to
  bloat; if a chapter has no quizzable content, 3 problems is fine.

**Acceptance criteria:** book order, clean Devanagari, tap-to-hear works, reviewer
spot-checks 3 chapters, validator clean.

---

## Phase 5 — Computer: 7 curated chapters

`organized/computer/00…06` → `computer_book.json` (`lang: "en-IN"`). Straightforward
factual content (what a computer is, parts — monitor/keyboard/mouse/CPU, what it
can do, do's & don'ts). 5–8 problems per chapter, emoji-visual options (🖥️⌨️🖱️).
Fold the introduction chapter into chapter 1 if thin. Smallest phase — also use it
to fix any engine papercuts found in Phases 2–4 before final QA.

**Acceptance criteria:** same bar as EVS; reviewer spot-checks 2 chapters.

---

## Phase 6 — English grammar audit (gap-fill only, coordinate!)

`english_book.json` already has 62 chapters. Do NOT rewrite it.
Diff `organized/english_grammar/00…24` topics against english_book coverage;
likely gaps: comprehension (17), composition (18–20), similes list (14),
stretching-out-actions (21). For each true gap EITHER add a chapter in the same
english_book style OR record in COORDINATION.md why it's intentionally skipped
(e.g. composition = free writing, not quizzable on this engine — acceptable).
**English is owned by the English session per COORDINATION.md — if that session is
active, hand this phase to it; otherwise log clearly what was touched.**

**Acceptance criteria:** a written coverage table (organized chapter → english_book
chapter(s) or "skipped: reason") in COORDINATION.md; any added chapters meet the
existing english_book quality bar.

---

## Phase 7 — Retire legacy path, integration QA, ship

1. Remove EVS/Hindi/Sanskrit/Computer/English/Maths from the legacy SubjectHub
   flow (`catalog.json` / play-screen cards) so **no OCR-garbage quiz is reachable
   anywhere**. If every subject now has a book engine, delete dead code:
   `learn.js` quiz path, stale `data/{evs,hindi,sanskrit,computer,maths,english_grammar}.json`
   from `sw.js` list (keep files in repo only if something still reads them —
   verify with grep, then delete unreferenced ones). Lean is the rule.
2. Home/play screen: one clear card per subject (Math, English, Hindi, EVS,
   Sanskrit, Computer) with live progress text. No new screens.
3. Full QA sweep = **run the FE-TEST protocol** (dedicated section below): every
   subject opens, first chapter playable, wrong-answer flow speaks and retries,
   coins/bones/wish loop still works, service worker updates cleanly (final CACHE
   bump), no console errors — every step logged with PASS/FAIL evidence in
   COORDINATION.md before requesting final review.
4. Run all validators. Update CLAUDE.md status section + puppy-park skill to the
   new reality. Then ask the user before commit/push (their standing rule).

**Acceptance criteria:** zero reachable OCR-generated questions; grep shows no
orphan references; both screenshot sizes attached; validators clean; CLAUDE.md
current.

---

## Phase 8 — Mastery-gated economy ("puppies eat only NEW learning")

**Problem:** Advaita re-solves chapters she already knows to farm coins. Coins (=
puppy food) must come ONLY from new or improved learning. Replaying is still welcome
— it's practice — but it feeds pride, not puppies.

1. **Central gate in `store.js`** (single choke point, engines don't decide):
   - New API `Store.awardLevel(id, subject, levelId, stars, coins)`:
     reads `getLevelStars` BEFORE recording; pays full `coins` on first completion;
     pays a proportional **delta** when stars improve (1⭐→3⭐ pays the difference);
     pays **0** on a replay with no improvement. Returns `{coins, firstTime,
     improved}` so the engine can pick the right celebration.
   - Per-problem coin drips (math "+2 🪙", hindi "+5 🪙" toasts) pay only while the
     enclosing level/chapter is not yet completed (`getLevelStars === 0`). No new
     per-problem bookkeeping — level granularity is enough and keeps state lean.
2. **Audit every reward call site:** `grep -n "addReward\|completeLevel" docs/js/*.js`
   — route mathbook, englishbook, hindibook (incl. reading practice + listen-&-find),
   subjectbook, and any minigame/quest path through the gate. Legacy paths being
   retired in Phase 7 can be skipped ONLY if unreachable from the home screen.
3. **Kind replay UX (never punish):** replaying a done chapter still gets praise +
   confetti, plus a gentle voiced banner: "Practice superstar! The puppies are full —
   feed them with something NEW! 🦴" and a **"Next mission ➜"** button that jumps to
   the easiest unsolved chapter (recommender from Phase 9; until then, first unsolved
   in-subject). Never a red X, never "no coins for you".
4. **Daily-challenge / streak-chest coin sources** (`store.js` +8/+25 paths): leave
   them — they're time-gated, not farmable. Document this decision in COORDINATION.md.
5. **Sequential chapter gating (added after Phase-1 review):** no engine actually
   locks chapters today — `.level-card.locked` CSS exists unused; "gated" was
   aspirational. Implement it here, once, consistently: chapter N+1 unlocks when
   chapter N has ≥1⭐; apply to MathBook, EnglishBook, and SubjectBook pickers
   (HindiBook set-gating already works). Locked cards show 🔒, stay tappable only
   to say "Finish the one before first! 🐾" — informative, never a dead button.

**Acceptance criteria:** scripted headless run proves: first completion pays; replay
pays 0 and shows the banner + next-mission button; star-improvement pays only the
delta; per-problem drips stop after a chapter is complete; grep shows zero engine
paths that bypass `awardLevel`. Store schema change is backward-compatible with
existing localStorage saves (no reset of Advaita's real progress!).

---

## Phase 9 — Difficulty ladder + adaptive encouragement

**Goal:** every topic ranked from base to higher concept; the app pulls her upward
when she's strong and cushions her when she struggles.

1. **`level` field (1=base … 5=higher concept) on every chapter** in ALL `*_book.json`
   (retrofit math_book + english_book; new subjects author it from day one).
   Ranking must follow concept dependencies, e.g. Math: Counting/Compare L1 →
   Bonds/Add/Sub L2 → Place Value/Tables L3 → Time/Measurement/Data L4 → Word
   Problems/Money L5. Produce the full per-subject ranking table in COORDINATION.md
   for reviewer sign-off BEFORE wiring UI. `validate_subject_book.py` (+ math
   validator) require the field and warn when in-file order jumps down in level
   (revision chapters exempt).
2. **Attempt telemetry (also feeds Phase 10):** engines report
   `Store.logAttempt(subject, levelId, {wrong, timeSec})` per problem — wrong-answer
   count and rough time. Tiny, capped, localStorage.
3. **Recommender + "Today's Mission" card** on the home/play screen:
   - Default pick: easiest (lowest-level) unsolved chapter across subjects, biased
     to the subject she touched least recently.
   - **Level-up nudge:** two consecutive 3⭐ completions in a subject → auto-suggest
     the next-higher-level chapter with big voiced encouragement ("Wow, you're a
     Maths star! Ready for a BIGGER challenge? 🚀") — suggestion, not force; gating
     rules unchanged.
   - **Struggle cushion:** high wrong-count on a chapter (e.g. ≥6 wrong before
     finishing, or opened-but-abandoned twice) → next mission proposes a lower-level
     chapter in the same topic area, phrased as fun ("Let's warm up with a puppy
     favourite!") — never "too hard for you".
4. **Keep it lean:** recommender is one pure function in `store.js` or a small
   `js/coach.js` (~100 lines max), no new screens — one card + one voiced line.

**Acceptance criteria:** ranking table reviewed & signed off; validators enforce
`level`; scripted runs demonstrate all three behaviors (default pick, level-up nudge
after two 3⭐, cushion after struggles); mission card screenshot on phone + iPad;
no existing gating broken.

---

## Phase 10 — Daily journey log + parent insights + web-history trail

**Goal:** a durable daily record of Advaita's learning on her iPad, and a parent
view showing what she's good at, what she's avoiding, and where she struggles.

1. **Journey journal in `store.js`:** append one event per chapter completion/attempt:
   `{ts, subject, chapterId, title, level, stars, wrong, timeSec, coins, firstTime}`.
   Cap: newest ~500 events / 90 days (trim on write). This is the source of truth.
2. **iPad web-history trail (best-effort, clever but honest):** on each chapter
   completion, stamp the browser history so the iPad's Edge/Safari history reads as
   a daily journey log: `history.replaceState`/`pushState` a readable hash URL
   (`#journey/2026-07-07/maths/subtraction/3star`) and briefly set `document.title`
   to e.g. `✅ Maths — Subtraction ⭐⭐⭐ · Puppy Park` (restore after ~4s). App must
   ignore unknown hashes on load (no routing breakage, incl. GH-Pages subpath).
   Limit to ~1 stamp per chapter completion (no history spam). **Caveat to document:**
   browser history retention is the browser's business — the in-app journal is
   canonical; the history trail is a bonus view. Verify actual behavior in real
   iPad Safari/Edge if available; headless check = hash + title assertions.
3. **Parent dashboard** (extend existing gated `js/parent.js` — no new screen):
   - **💪 Good at:** topics with 3⭐ and low wrong-rate, grouped by subject.
   - **🤔 Struggling:** high wrong-rate or repeated non-completion (from
     `logAttempt` + journal), with the specific chapter names.
   - **🙈 Not touching:** chapters unlocked >7 days and never attempted, and
     subjects untouched recently — the avoidance signal the user asked for.
   - **📅 Daily journey:** last 14 days, per-day list of what she did (from journal).
   - Plain lists + simple CSS bars, kid-proof behind the existing parent gate,
     no chart libraries, no network.
4. **Privacy note in CLAUDE.md:** all of this stays in localStorage on her device;
   nothing is uploaded anywhere.

**Acceptance criteria:** scripted run generates journal entries and the four parent
sections render with real data (screenshot); journal cap enforced; history stamps
verified (hash + title change and restore); reload with a stale `#journey/…` hash
boots cleanly; parent gate still blocks the child; localStorage stays under a sane
size (< ~200KB total for journal+attempts).

---

## Phase 11 — The Crystal Curse 👸🧊 (princess rescue meta-game, all subjects)

**Runs AFTER Phases 9 & 10** (it consumes the difficulty ladder, weak/neglected
detection, and the journal). Phase 7 (ship gate) moves after this. **Additive to
the puppy loop, never replacing it** — puppies stay the coin economy; the Princess
is the daily *mission* layer that steers Advaita toward new, weak, and neglected
topics across EVERY subject.

### The story (canonical text — use this narrative and tone verbatim where UI text is needed)
A stubborn Princess offended a powerful Saint and was struck by the **Crystal
Curse**: her toes turned to sparkling ice. She apologized; the Saint softened the
curse — the ice creeps up over **7 days** until she becomes a beautiful crystal
statue (never hurt, never dying, just waiting). The Saint chose a champion:
**Advaita**. "Your mind holds the fire of learning. Every time you study something
new — especially things that are tricky or hard for you — the heat of your
knowledge melts the ice. But if you shy away from the hard topics, the ice keeps
growing." Free her and she grants a **Royal Blessing** from her kingdom.

### Mechanics → concrete implementation

1. **Freeze Meter (`js/curse.js` + `Store.curse` state, lazy day-tick — no timers):**
   `{ freezePct, lastMeltTs, cycleStartTs, princessName, blessingsGranted }`.
   On app open compute elapsed calendar days since `lastMeltTs`; each idle day
   adds ~15% (7 idle days ≈ 100%). Stages voiced + drawn: 20% knees → 50% waist →
   80% shoulders → 100% full crystal ("paused, not lost — she's waiting for a big
   burst of learning!"). Visual: CSS/emoji princess (👸 over a gradient "ice"
   overlay that rises with freezePct) — NO new image assets, self-injected `cc-*`
   styles, zero style.css edits.
2. **Melting — ONLY challenge-learning melts ice.** A problem counts as "melt
   fuel" only if its chapter qualifies: **(a) NEW** (0⭐), **(b) WEAK** (≤1⭐ or
   high wrong-rate from `logAttempt`), or **(c) NEGLECTED** (unlocked, last
   attempt ≥7 days ago — revision of left-behind areas). Mastered-chapter replays
   melt NOTHING (consistent with Phase 8). Meter: ~12 first-try-correct qualifying
   problems (≈15–20 min of real study) melts **one day of ice (~15%)**. At 100%
   frozen, a "massive burst" (double fuel, ~24 problems that day) shatters the
   crystal and resumes the cycle. `js/curse.js` exposes one hook
   `Curse.onProblemSolved(subject, levelId, firstTry)` called from the same spot
   engines already call `Store.logAttempt` — one line per engine, no new coupling.
3. **Daily mission steering:** the Princess card (home screen) shows freeze % +
   today's 2–3 recommended melt targets, pulled from the Phase-9 recommender but
   filtered to qualifying (new/weak/neglected) chapters across ALL subjects —
   biased toward the weakest subject. Tapping jumps straight into that chapter.
4. **Summon the Royal Mentors (parent-help spell):** when `logAttempt` shows ≥3
   wrongs on a single problem, show the Saint's lifeline (voiced): "Even the
   greatest champions don't fight alone… call upon the Royal Mentors (Mom and
   Dad) — asking for help when you are stuck is the secret spell for the hardest
   levels!" Non-blocking, kind, never shaming; log the event to the journal so
   parents see where help was summoned.
5. **Royal Blessings (parent-set rewards):** in the parent dashboard (behind the
   existing gate) parents maintain a small blessing list (weekend movie pick,
   special treat, extra playtime, new book/toy — free-text, stored locally).
   At 0% frozen: rescue celebration (confetti + voiced thank-you + blessing
   certificate screen showing the parent-chosen blessing); parent marks it
   granted from the dashboard. Then a **new cycle** starts ("a princess from a
   neighboring kingdom got cursed!") with a fresh name/color — names rotate from
   a small built-in list.
6. **Tone guardrails:** the Princess is never hurt and never blames Advaita;
   100% frozen is sparkly and calm, framed as "waiting for your big learning
   burst" — no fear, no guilt, no countdown anxiety (show ice stages, not a
   ticking clock). All text voiced, minimal words, en-IN.
7. **Lean integration:** one home card + one `#screen-curse` section + `js/curse.js`
   (~250 lines) + `Store.curse` state + parent-dashboard blessing list. Reuse
   Rewards/Speech/Sounds. sw.js bump. Log every shared-file edit.

**Acceptance criteria:** scripted live runs prove — idle days raise freezePct
(seed `lastMeltTs` in the past); solving qualifying problems melts (~15%/12
first-try problems) while mastered-replay problems melt 0; the mission card lists
only new/weak/neglected chapters (seed all three cases and assert); mentor prompt
fires at 3 wrongs and is logged; full rescue → blessing certificate → parent
grant → new cycle with new princess name; 100% state renders the calm
"waiting" message and double-fuel shatter works; saves backward-compatible;
screenshots of the 4 freeze stages + rescue at both viewports.

---

## Phase 12 — Voice & reading settings 🔊 (voice picker, speed, test, Read All, colors)

Small, independent phase (any time after Phase 10; before Phase 7 ship gate).
Reference UI (user's screenshot + control list): **🔊 Voice** dropdown
("Google US English (en-US)"-style entries), **⏱️ Speed** dropdown ("🙂 Normal"),
**🎧 Test sound** button, **▶️ Read All** button, **🌈 Colors: On/Off** toggle.

1. **Prefs in `store.js`:** `Store.voicePrefs = { enVoice: <voice name>,
   hiVoice: <voice name>, rate: 0.7 | 0.85 | 1.0 }` (persisted in localStorage;
   single player, so global is fine). Defaults: null voice (current auto-pick),
   rate 0.85.
2. **`speech.js` honors prefs:** in `Speech.speak`, if a saved voice name for the
   utterance's language (en-*/hi-*) exists in `speechSynthesis.getVoices()`, use
   it and multiply the rate by the pref. Keep ALL existing fallback logic intact
   (auto lang-prefix match, Devanagari→roman only when the voice list is
   non-empty and has no hi voice). A stale saved name (voice uninstalled) must
   silently fall back to auto — never break speech.
3. **UI — one section in the Parent Dashboard** (keeps home lean; parents tune it
   once with Advaita): TWO voice rows since the app speaks two languages —
   "🗣️ English voice" (dropdown filtered to `en-*` voices) and "🗣️ हिंदी voice"
   (filtered to `hi-*`; if none installed show "No Hindi voice on this device —
   roman fallback will be used"). One shared **Speed** dropdown
   (🐢 Slow 0.7 / 🙂 Normal 0.85 / 🐇 Fast 1.0). Each row has **🔊 Test sound**
   which speaks a sample line with the currently SELECTED (not yet saved) combo:
   EN "Hello Advaita! Let's learn something new!", HI "नमस्ते! चलो कुछ नया सीखें!".
   Selecting immediately saves (no Save button — fewer taps).
4. **Async voices:** populate dropdowns on open AND re-populate on the
   `voiceschanged` event (voice lists load late on iPad Safari/Edge). Mark the
   currently-saved voice as selected.
5. **▶️ Read All (on learning screens, for the child):** one consistent button on
   every problem screen across the four book engines that reads the FULL screen
   aloud — question, then all options ("Is it …, …, or …?"), reusing each
   engine's existing readAloud pieces (mathbook/englishbook/subjectbook already
   have partial versions — unify the label to "▶️ Read All", keep per-word taps).
   On concept screens it reads intro + tip (the existing "🔊 Read to me" can
   simply be relabeled). No new speech logic — orchestration only.
6. **🌈 Colors toggle (`Store.voicePrefs.colors`, default ON):** controls the
   reading-help colorization — Hindi varnamala/matra color-coding (`hb-*` tab
   colors) and any colored letter/word highlights in reading practice. OFF
   renders the same content in plain ink for kids who find colors distracting.
   Toggle lives next to the voice settings; engines read the pref at render
   time (a simple `Store.voicePrefs.colors ? colored : plain` branch — no
   re-architecture).
7. **Lean:** reuse existing parent-dashboard styles + `sb-saybtn`-style button;
   no new screens, no new files (extend `parent.js`/`speech.js`/`store.js` +
   small engine touches); sw.js bump; log in COORDINATION.md.

**Acceptance criteria (reviewer live-tests):** picking a voice + speed persists
across reload and is used by `Speech.speak` (spy asserts voice name + rate on a
math and a hindi utterance); Test buttons speak with the selected combo before
saving; stale saved voice name falls back to auto without errors; headless run
(where voice list may be empty) never crashes; dropdowns repopulate on
`voiceschanged`; **Read All** on a problem screen speaks question + every option
(spy assert) in all four engines; **Colors OFF** visibly de-colorizes the Hindi
matra tab (screenshot pair On/Off) and persists across reload; screenshot of the
settings section at both viewports.

---

## Phase 12b — "Mummy's Voice" 🎙️ (pre-generated cloned-voice option)

**Extends Phase 12's voice picker.** Source: the working Qwen3-TTS 0.6B zero-shot
clone at `/Users/dr.ajayshukla/voice_clone/` (gargi reference WAVs + `clone.py`,
runs offline on the Mac / MPS). **Decision (do not relitigate): NO live TTS** —
the PWA cannot run the model in-browser and must stay offline/static. Instead,
pre-generate clips for a curated string corpus and play them from disk.

1. **Build script `generate_mummy_voice.py` (repo root, gitignored env):**
   - Collect the HIGH-VALUE corpus only (~400–500 strings, target ≤ 25MB):
     every chapter `concept.intro` + `tip` across all 6 books, the praise /
     retry / replay lines, Crystal Curse story + stage lines, nav prompts
     (grep Speech.navSay/showToast literals), and the Phase-12 test lines.
     NOT per-problem q/options/why (corpus too large — browser voice covers).
   - Synthesize each with the existing qwen_env clone (ref: gargi1), English
     AND Hindi strings (Qwen3-TTS is multilingual — validate 2–3 Hindi clips by
     ear with the user before batch-generating; if Hindi quality is poor, ship
     English-only and say so in the log).
   - Output `docs/assets/voice/<sha1(text)-8>.mp3` (mono, 24k, ~48–64kbps) +
     `docs/data/voice_manifest.json` mapping hash→file. Re-runnable: skips
     existing hashes; deleting a book string orphans its clip (script prints
     orphans for cleanup).
2. **`speech.js`:** if `Store.voicePrefs.enVoice === '🎙️ Mummy'` (a synthetic
   entry added to BOTH Phase-12 voice dropdowns), `Speech.speak` first hashes
   the exact text; on manifest hit play the clip via `new Audio(AppConfig.url(...))`
   (respect the speed pref via `audio.playbackRate`), on miss fall back to the
   normal browser-voice path silently. Cancel any playing clip when a new
   speak starts (mirror speechSynthesis.cancel behavior).
3. **Service worker:** precache ONLY `voice_manifest.json`; add a runtime
   cache-on-first-play route for `assets/voice/*` (so the 25MB downloads
   lazily, then works offline). CACHE bump.
4. **Privacy: ✅ USER APPROVED (2026-07-08)** publishing the mother's cloned
   voice clips as static assets in the public repo / GH Pages site. Record the
   approval in CLAUDE.md's privacy note; no gitignore alternative needed.

**Acceptance criteria:** manifest + clips generated and playable; picker shows
"🎙️ Mummy" and Test-sound plays a real clip; spy-verify manifest-hit plays
Audio (not speechSynthesis) and manifest-miss falls back seamlessly; speed pref
affects playbackRate; offline replay of an already-heard clip works; total
assets size reported and ≤ 25MB; publishing approval already granted by the
user (2026-07-08) — recorded here and in COORDINATION.md.

---

## FE-TEST — Final front-end test protocol (run after ALL phases, before final review)

**When:** after the last phase is implemented (including Phase 7's legacy retirement),
BEFORE requesting the final review. **Who:** the implementer runs every step and
records results in COORDINATION.md under `### FE-TEST results` as a checklist with
PASS/FAIL + evidence (screenshot path or asserted `document.title` string). The
reviewer will re-run a random subset; any FAIL or missing evidence returns the whole
suite. **How:** serve `cd docs && python3 -m http.server 8080`; drive flows with the
injection recipe from `.claude/skills/verify-app/SKILL.md` (temp `index_test.html`,
assert via `document.title`, delete temp file after). Test at BOTH viewports:
**430×1000 (phone)** and **1024×1366 (iPad)** unless a step says otherwise.

### T1. Boot & console hygiene
- [ ] Fresh profile (clear localStorage first via injected `localStorage.clear()`):
      app boots to hero select → `App.selectPlayer('advaita',true)` lands on Park.
      No JS errors: run Edge headless with `--enable-logging --v=0` (or assert
      `window.onerror` hook injected before load captures nothing).
- [ ] **Upgrade path:** seed a pre-plan localStorage save (coins>0, some math stars),
      reload → progress intact, nothing reset. (Protects Advaita's real save.)
- [ ] Home/play screen shows exactly one card per subject (Math, English, Hindi,
      EVS, Sanskrit, Computer) with live progress text; NO legacy SubjectHub cards
      for retired subjects; screenshot both viewports.

### T2. Per-subject smoke (repeat for EACH of the 6 subjects)
- [ ] Card opens the subject; chapter/lesson picker renders every chapter with
      icon + title + star state.
- [ ] Sequential gating: chapter N+1 locked (🔒) until N has ≥1⭐; tapping a locked
      card speaks the gentle "finish the one before" line and does NOT open it.
- [ ] First chapter: concept screen renders, intro auto-voices (assert
      `speechSynthesis.speaking` or Speech.speak called via injected spy),
      "Let's Play ▶️" starts problem 1.
- [ ] Solve one problem CORRECTLY first try → correct animation + coin toast;
      assert coins increased by the first-try amount.
- [ ] Answer one problem WRONG → `why` explanation appears AND is spoken, correct
      option glows, retry tip shows, wrong option disabled; then tapping the correct
      answer advances. Assert reduced (not zero-progress) coin award. Screenshot one
      wrong-answer state per subject.
- [ ] Complete a full chapter → completion popup with stars; `Store.getLevelStars`
      returns the stars; picker shows ⭐ on return.
- [ ] Devanagari subjects (Hindi, Sanskrit): text renders (no tofu/mojibake in
      screenshot), TTS uses `hi-IN` (spy on Speech.speak lang arg).

### T3. Economy & mastery gate (Phase 8 behaviors)
- [ ] Replay an already-3⭐ chapter → 0 coins, "puppies are full" banner + working
      "Next mission ➜" button; praise/confetti still fire.
- [ ] Improve a seeded 1⭐ chapter to 3⭐ → exactly the star-delta coins pay out.
- [ ] Per-problem drips stop once the chapter is complete (assert coins unchanged
      while re-answering inside a completed chapter).
- [ ] 40-coin → 🦴 bone conversion and puppy wish-granting still work end-to-end
      (earn ≥40, grant one wish in the Mall, happiness rises).

### T4. Coach & mission card (Phase 9 behaviors)
- [ ] Fresh save: "Today's Mission" recommends the lowest-level unsolved chapter.
- [ ] Seed two consecutive 3⭐ completions in one subject → next recommendation is a
      HIGHER-level chapter and the encouragement line is voiced.
- [ ] Seed a struggle profile (≥6 wrongs on one chapter) → recommendation drops to a
      lower-level chapter with the warm-up phrasing. Screenshot each state.

### T5. Journal, parent dashboard & history trail (Phase 10 behaviors)
- [ ] Completing a chapter appends a journal event (assert via
      `JSON.parse(localStorage...)`: ts/subject/chapter/stars/wrong/coins present).
- [ ] Parent gate still blocks (wrong answer to the gate → no dashboard). Inside:
      all four sections render — Good at / Struggling / Not touching / Daily journey
      — with seeded data visible. Screenshot both viewports.
- [ ] History stamp: after a completion, `location.hash` matches
      `#journey/<date>/<subject>/<chapter>/<stars>star` and `document.title`
      temporarily shows the ✅ line, then restores. Reload the app WITH that stale
      hash → boots normally to hero/park (no broken routing).
- [ ] Journal cap: seed >500 events, complete one more → oldest trimmed, size sane.

### T5b. Crystal Curse (Phase 11 behaviors)
- [ ] Seed `lastMeltTs` 3 days back → app open shows ~50% frozen (waist stage),
      correct visual + voiced line; 7 days back → 100% calm "waiting" state.
- [ ] Solve 12 first-try problems in a QUALIFYING chapter (new/weak/neglected)
      → freezePct drops one stage; solve problems in a mastered chapter → 0 melt.
- [ ] Princess mission card lists only qualifying chapters (seed one new, one
      weak ≤1⭐, one neglected >7d; assert all three appear, mastered ones don't).
- [ ] 3 wrong attempts on one problem → Royal Mentors prompt appears, is voiced,
      and lands in the journal.
- [ ] Full rescue at 0%: certificate shows a parent-set blessing; granting it from
      the parent dashboard starts a new cycle with a different princess name.
- [ ] Screenshots: 20/50/80/100% stages + rescue celebration, both viewports.

### T6. PWA / offline / deploy
- [ ] `sw.js` `CACHE` name differs from the last shipped release; ASSET list contains
      every new js/json file and NO deleted legacy file (grep-diff vs `docs/` tree).
- [ ] Offline smoke: load once, kill the server, reload → app still boots from SW
      cache and a cached subject opens (headless: second run with server stopped).
- [ ] `AppConfig.url()` paths still resolve under a subpath — no absolute `/` asset
      URLs introduced (grep for `src="/` and `fetch('/`).

### T7. Content validators & data integrity (CLI, not browser)
- [ ] `python3 validate_math_book.py` → exit 0.
- [ ] `python3 validate_subject_book.py` → exit 0, chapter/problem counts match the
      counts claimed in COORDINATION.md phase logs.
- [ ] Guessability stats (from the Phase-2 review): for EACH subject file, correct-
      answer-is-longest-option share < 50%; report the number per subject.

**Exit bar:** every box checked PASS with evidence, temp test files deleted, results
logged. Then request final review — the reviewer re-runs a sample, does the final
content spot-checks, and only after that sign-off does the commit/push conversation
with the user happen.

---

## Cross-cutting rules for the implementer (non-negotiable)

1. **Read `CLAUDE.md` + `COORDINATION.md` before every session; log every shared-file
   edit** (`index.html`, `app.js`, `style.css`, `sw.js`) in COORDINATION.md.
2. **Book-faithful, OCR-skeptical:** content comes from `organized/…/content.md`;
   auto-generated questions and noisy tables are never trusted. When OCR is
   illegible, keep the concept TYPE and use clearly legible book-plausible content.
3. **Never punish a wrong answer** — explain (`why`), speak it, retry.
4. **Lean:** no new deps, no build step, no new reward mechanics, reuse `mb-*`.
5. **Verify every phase in headless Edge before marking it done** — screenshots or
   it didn't happen. Bump `sw.js` CACHE on every asset-list change.
6. **Stop at each phase boundary for review.** Don't commit or push without the
   user's go-ahead.
7. **Once Phase 8 lands:** every engine awards coins/stars ONLY via
   `Store.awardLevel` (mastery gate) and reports `Store.logAttempt` — no direct
   `addReward` from learning paths. New chapters always carry a `level` field
   (Phase 9) — keep the `subject-content` skill's schema in sync.

## Review protocol (what the reviewer/senior manager does)

At each sign-off request the reviewer will: run the validators; spot-check curated
chapters against `organized/` sources; take independent screenshots; check
COORDINATION.md hygiene, sw.js cache bump, and code style/size; then write
feedback in COORDINATION.md under `### Review — Phase N` as **Blockers / Should-fix /
Nits**, and either sign off the checkbox above or return the phase.
