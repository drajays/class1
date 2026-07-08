# PLAN2.md — Absorb the `new_app_adv` apps into Puppy Park

**Written by:** Planning/Review session (senior manager — supervises every phase).
**Implemented by:** a separate implementer agent.
**Protocol:** identical to `plan.md` — implementer STOPS at each phase boundary,
logs in `COORDINATION.md`, and waits for reviewer sign-off. The reviewer re-runs
live tests and spot-checks content; false "done" claims cost a review cycle.

---

## 1. What we are absorbing (source: `/Users/dr.ajayshukla/new_app_adv/`)

| App | File | Content worth taking |
|---|---|---|
| **Reading Buddy 🐢** | `reading_buddy/index.html` (2.7k lines) | **~166 leveled micro-stories** (`{e,t,l,x}` = emoji/title/level/text, "Starter" → harder), talking-game ideas |
| **Phonics + 300 Words** | `english/kids_eng/index.html` (1.8k lines; `english-phonics-for-kids.html` is an identical duplicate — ignore it) | `commonWords` (~300 sight words), `wordFamilies`, `phonemes`, `sentenceList`, `talkSentences` |
| **Noun Ninjas 🌟** | `english/noun-ninjas/index.html` (3.2k lines) | Noun banks: `CP_DATA` (common/proper), `COLL_DATA` (collective), `ABS_DATA` (abstract), `GENDER_DATA`; arcade mechanics: **Noun Sort**, **Memory Match** |
| **Word Power Quiz** | `english/word_power_quiz (1).html` (501 lines) | `vocabulary` — **211 word entries** + `categories` |
| **Number Quest 🔢** | `mathindex.html` (128KB) | Math problem **generators** (`genSheetItems`) spanning Nursery → **Class 3** — the Class 2–3 material is stretch content we don't have |

## 2. Non-negotiable architecture rules (the reviewer WILL test these)

1. **One economy.** The source apps' coins/shops/XP/badges/penalties are NOT
   ported. All learning rewards route through `Store.awardLevel` (mastery gate:
   replay pays 0), arcade through `Store.awardFun` (3 paying wins/day). Puppy
   Mall stays the only shop. `PENALTY_MSGS` from Reading Buddy violate the
   never-punish rule — dropped entirely.
2. **One theme.** New modules wear OUR wrapper: the 4 puppies coach/celebrate,
   the Frozen Princess counts new-content learning as melt fuel, Mummy's voice
   speaks the intros/praise. No turtle mascot, no ninja world — content yes,
   competing identities no.
3. **One architecture.** Plain ES, no build step; data as JSON in `docs/data/`;
   engines follow the SubjectBook pattern (self-injected prefixed CSS, zero
   `style.css` edits); every chapter gets `level` (1–5) and joins the Coach
   pool + Curse qualifying logic; `Store.logAttempt` telemetry; journal events;
   sw.js CACHE bump every asset change; save-compatible with Advaita's device.
4. **English files ownership:** `english_book.json`/`englishbook.js` belong to
   the English session per COORDINATION.md — new English content lands in NEW
   data files consumed by existing engines, never by rewriting theirs.
5. **Lean.** If a source feature doesn't serve learning or the motivation loop
   (e.g. Reading Buddy's shop, Noun Ninjas' badge wall), it dies at extraction.
6. **ZERO DUPLICATION (user directive).** The source apps overlap each other
   AND the main app. Nothing ships twice. Known overlaps to kill at extraction:
   - `kids_eng/english-phonics-for-kids.html` is byte-identical to its
     `index.html` — use one, ignore the other.
   - Phonics letters/phonemes/word-families vs english_book's existing phonics
     chapters (letter sounds, vowels, digraphs, word families, blends) — only
     content NOT already covered may ship; overlapping items are dropped.
   - The 300 `commonWords` vs english_book's sight-word chapters — dedupe by
     lowercase word; ship only the remainder as practice sets.
   - Word Power vocabulary vs english_book's themed-vocab chapters (colours,
     days, animals, food…) — drop entries whose word already appears there.
   - Noun banks vs english_book's noun/gender/plural chapters — noun-TYPE
     content (collective/abstract) is new and ships; common/proper/gender
     items duplicated in english_book are dropped.
   - Number Quest Nursery–Class 1 generators duplicate math_book — dropped;
     ONLY Class 2–3 extensions ship (Phase D scope).
   - Reading Buddy stories vs english_book reading passages (eng_reading/2) —
     near-duplicate stories (same title or >60% shared sentences) are dropped.

## 3. Phase status (implementer ticks; reviewer signs)

- [x] Phase A — Extraction pipeline + data files + validator — **sign-off: ✅ FULLY APPROVED 2026-07-09 — condition cleared (233 words incl. all 5; 79 drops itemized; validator clean).**
- [x] Phase B — 📖 Story Time (Reading Buddy stories module) — **sign-off: ✅ APPROVED 2026-07-09 — full flow verified live (words/mic/rewards/replay-0/curse/journal/quiz); 4 reviewer-applied fixes incl. dead reward path (phantom Speech.stop) and wrong-answer teaching; see COORDINATION.md. Phase C unblocked.**
- [x] Phase C — English boosters (300 words, families, nouns, vocab) — **sign-off: ✅ APPROVED 2026-07-09 — live-verified; 2 conditions (validator coverage + guessability 51.8%→<50%) due before Phase F re-review.**
- [x] Phase D — 🔢 Math Challenge Mode (Class 2–3 stretch) — **sign-off: ✅ APPROVED 2026-07-09 — reqTopic mastery-gating verified live; arithmetic machine-checked; should-fix: expand beyond 3 problems/chapter.**
- [x] Phase E — Arcade ports (Noun Sort + Memory Match → Fun Games) — **sign-off: ✅ APPROVED 2026-07-09 — both games in Fun Games hub, awardFun-routed; full play verified at FE-TEST-2.**
- [x] Phase F — Theme/voice/curse integration + FE-TEST-2 + ship — **sign-off: ✅ APPROVED 2026-07-09 (final review) — all conditions cleared, FE-TEST-2 evidence accepted + independently sampled (mummy-default clip, replay-0, journal, 0 errors). PLAN2 COMPLETE.**

---

## Phase A — Extraction pipeline + data + validator

1. `extract_new_apps.py` (repo root): parses the source HTML files and emits:
   - `docs/data/stories.json` — `{levels:[{id,name,stories:[{e,t,x,level}]}]}`
     from Reading Buddy's `LIBRARY` (~166 stories, keep source level bands,
     map Starter→L1 … hardest→L5).
   - `docs/data/word_practice.json` — phonics `commonWords` (300 sight words,
     deduped against english_book's existing sight-word chapters),
     `wordFamilies`, `sentenceList` (talk-aloud sentences).
   - `docs/data/grammar_banks.json` — noun banks (common/proper, collective,
     abstract, gender) normalized to `{word, kind, emoji?, meaning?}`.
   - `docs/data/vocab_quiz.json` — the 211 Word Power entries + categories,
     each as a `pick` problem with 3 options (validator rules apply: answer in
     options, ≥1 plausible same-category distractor, longest-share <50%, `why`).
   - Math generators are NOT extracted as data — Phase D ports the generator
     FUNCTIONS (they're procedural).
2. **Overlap audit (MANDATORY deliverable):** the extractor builds an index of
   ALL existing app content (english_book problems/options/words, math_book
   topics, hindi_words, story/passage texts) and emits `dedup_report.md`:
   every dropped item with the reason + which existing chapter already covers
   it, and per-file counts (extracted / dropped-as-duplicate / shipped). The
   reviewer signs off on this report BEFORE any UI work starts.
3. Extend `validate_subject_book.py` (or add `validate_plan2_data.py`): schema
   + mojibake + guessability checks for the four new files, PLUS a cross-file
   duplicate check (same word/story/question must not exist in two shipped
   data files — including the pre-existing ones).
4. Nothing wired into the app yet. **Deliverable for review:** the JSON files +
   validator output + a count table (stories per level, words, nouns, vocab).

**Acceptance:** counts match sources with dedup arithmetic shown (extracted −
duplicates = shipped, per file); `dedup_report.md` complete and spot-checked
(reviewer independently greps 10 dropped items to confirm they truly exist in
the main app, and 10 shipped items to confirm they don't); validator 0 errors
including the cross-file duplicate check.

## Phase B — 📖 Story Time (the crown jewel)

1. `docs/js/storybook.js` (`StoryBook`, `st-*` self-injected CSS, ≤450 lines):
   - Level-banded story picker (L1 gated → L5, same locking rule as chapters).
   - Story screen: BIG text, **every word tap-to-hear** (reuse the tappable
     pattern), ▶️ Read All, auto-read on open (Mummy's clip if present, else
     TTS), then **"🎤 Your turn — read it aloud!"** using `Speech.listen`
     (exists) for a light say-it-back moment — praise regardless of result
     (never punish; listening failure = praise anyway).
   - Finish → 2–3 comprehension `pick` questions generated at EXTRACTION time
     into stories.json (not runtime AI) for L2+ stories; L1 = read-only + praise.
   - `Store.awardLevel('reading','story-<id>',stars,coins,{total,title,level})`
     → coins, journal, curse fuel, coach telemetry — all free.
2. Home gets ONE "📖 Story Time" play-card (puppy-coach framed: "Read with
   Simba!"). Coach pool includes reading stories (subject `reading`); Curse
   counts unread stories as NEW fuel.
3. sw.js: add storybook.js + stories.json, bump CACHE. Log in COORDINATION.md.

**Acceptance (reviewer live-tests):** picker gating; word-tap speaks; Read All;
say-it-back flow never blocks or shames; stars/coins via mastery gate (replay
pays 0); story appears in journal + parent dashboard; coach can recommend a
story; validator clean; screenshots phone + iPad.

## Phase C — English boosters

1. **Sight-word practice** — mirror Hindi's proven reading-practice pattern:
   gated sets of 25 from the 300 `commonWords`, tap-to-hear, scored
   `awardLevel('english','sight-N')`. UI lives as a tab/section reachable from
   the English card WITHOUT touching `englishbook.js` internals (own small
   module or an agreed hook — coordinate via COORDINATION.md with the English
   session; if no response in-session, use a separate module file).
2. **Word-family blender** — families from `wordFamilies` as `pick`/blend
   problems (reuse english engine's existing blend-style presentation ONLY via
   new data if the English session agrees; otherwise present as pick problems
   in the new module).
3. **Noun & vocab chapters** — `grammar_banks.json` + `vocab_quiz.json` become
   L3–L5 chapters in a NEW `docs/data/english_plus.json` rendered by
   **SubjectBook** (it's generic — register subject `english_plus`, title
   "Word Power", own play-card or folded under English hub card — pick the
   LEANER option and justify). Collective/abstract nouns are genuinely L4–5.
4. Guessability bar enforced by validator on every generated problem.

**Acceptance:** all new problems pass validator incl. <50% longest-share;
reviewer plays one set of each type; mastery gate + coach + curse integration
verified; no edits to English-session-owned files without a logged agreement.

## Phase D — 🔢 Math Challenge Mode (Class 2–3 stretch)

1. Port the needed generator functions from `mathindex.html` into
   `docs/js/mathchallenge.js` (or a `generated:` chapter type in mathbook IF
   the Math session agrees — same ownership rule as English; default: separate
   module + `math_challenge.json` chapter shells with `level: 5`).
2. Scope: Class 2–3 topics only where they EXTEND our book (bigger numbers,
   carrying/borrowing, ×÷ intro, money ops). Class 1 duplicates are dropped.
3. **Unlock rule:** Challenge chapters unlock only when the corresponding
   math_book topic is ≥2⭐ — this is the coach's level-up nudge destination and
   premium Curse fuel (they always qualify as NEW until mastered).
4. Same widgets/visual language (`mb-*`), worked solutions on wrong answers
   (generator must produce the step-by-step explanation, not just the answer).

**Acceptance:** generated problems are correct (reviewer scripts 200 random
generations and machine-checks the arithmetic + solution steps); gating from
math_book mastery verified; never-punish flow intact.

## Phase E — Arcade ports (Fun Games)

1. Port TWO mechanics into `minigames.js`: **Noun Sort** (drag/tap words into
   noun-type buckets — reskin: puppies hold the buckets) and **Memory Match**
   (pairs from noun/vocab banks — card backs are paw prints 🐾).
2. Rewards via `Store.awardFun` ONLY (daily cap already enforced). Track
   answers via `Store.trackAnswer('english', …)` so the parent dashboard sees
   accuracy, but arcade never touches `awardLevel`/stars.
3. Everything else in Noun Ninjas' arcade (Duel, Catcher) is dropped — lean.

**Acceptance:** both games playable and themed; fun-cap verified live
(10,10,10,0,0-style run); no stars/level records from arcade; sw bump.

## Phase F — Theme, voice, curse & ship

1. **Mummy's voice:** add new corpus strings (story titles + L1 story texts?
   NO — too many; take story TITLES + the module intros + new praise lines) to
   `generate_mummy_voice.py` UI/corpus lists; regenerate incrementally.
2. **Curse integration audit:** stories/boosters/challenge all count as
   qualifying melt fuel via the standard awardLevel path — verify with the
   seeded adversarial runs from plan.md's T5b.
3. **Coach pool audit:** new subjects (`reading`, `english_plus`,
   `math_challenge`) appear in `Coach.getAllChapters` with sane levels; assert
   pool counts > 0 per subject (the HindiBook.load() lesson).
4. **FE-TEST-2:** run plan.md's FE-TEST T1–T7 on the final tree PLUS a new T8:
   per new module — open, play, mastery-gate replay, coach recommendation,
   curse melt, journal entry, parent-dashboard visibility. Results logged with
   evidence in COORDINATION.md.
5. CLAUDE.md file-map/status update; final review by the supervisor; commit
   and push ONLY after sign-off.

**Acceptance:** FE-TEST-2 all green with evidence; zero console errors; save
compatibility (seeded old save keeps everything); total added payload stated
(target: ≤ 300KB JS+JSON excluding voice clips).

---

## Supervision protocol (what the reviewer does at every gate)

Re-runs the live adversarial tests (replay-farming, gate bypass, guessability
stats, coach pool counts, curse melt); spot-checks extracted content against
the source HTML; verifies COORDINATION.md logging and sw bumps; writes
Blockers / Should-fix / Nits and signs the checkbox above. Lessons already
paid for in plan.md apply from day one: capture state BEFORE recording it,
no silent try/catch integrations without pool-count assertions, no
duplicated content (the validator's cross-file check runs at every gate), report
MEASURED numbers only, and never self-certify the sign-off column.
