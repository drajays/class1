# 🛠️ Session Coordination — Advaita's Puppy Park

Two Claude Code sessions are working in this repo at the same time. Keep this file
updated so we don't clobber each other. **Read this before editing shared files.**

## Who owns what

| Session | Subject | Owns (edit freely) |
|---|---|---|
| **Math session** | Mathematics | `docs/js/mathbook.js`, `docs/data/math_book.json` |
| **English session** | English | `docs/js/englishbook.js`, `docs/data/english_book.json` |

## Shared files — coordinate before editing

These are touched by both. Make **small, localized** edits and log them below.

- `docs/index.html` — script tags + screen containers
- `docs/js/app.js` — screen routing (`go()`), `refreshStats()`
- `docs/css/style.css` — styles
- `docs/sw.js` — service worker cache list (bump `CACHE` when asset list changes)

### Convention to avoid CSS collisions
- Math problem UI uses the `mb-*` class prefix.
- English **reuses the same `mb-*` classes** for the problem/concept/steps UI
  (shared visual language) and otherwise uses **inline styles** — so the English
  session adds **no new CSS**. If English ever needs its own classes, use the
  `eb-*` prefix (never touch `mb-*`).

## Change log (newest first)

### English session — 2026-06-18
- ✅ Added `docs/data/english_book.json` (10 book-faithful grammar chapters from
  `organized/english_grammar/`): articles → nouns → singular/plural → gender →
  pronouns → antonyms → prepositions → adjectives → verbs → conjunctions.
- ✅ Added `docs/js/englishbook.js` — `EnglishBook` engine (mirrors `MathBook`:
  gated chapter picker, concept intro, guided `pick` problems, wrong answer →
  animated/narrated worked solution → retry). Reuses `mb-*` classes + inline styles,
  **no CSS changes**.
- ✏️ `docs/index.html` — added `<script src="js/englishbook.js"></script>` after
  `js/english.js`. (Reuses existing `#screen-english` / `#english-level-picker` /
  `#english-game` containers — no markup added.)
- ✏️ `docs/js/app.js` — `go('english')` now calls `EnglishBook.open()` (was
  `showEnglishLevels()`); `refreshStats()` english-progress now uses
  `EnglishBook.progressText()`.
- ⚠️ `docs/js/english.js` + `ENGLISH_LEVELS` in `docs/js/data.js` are now **legacy**
  (the old arcade English path). Left in place, no longer routed to. Safe to remove
  later as bloat cleanup — not removing now to minimize churn.
- ✅ `docs/sw.js` — DONE by the math session (`puppypark-v3`, both books cached). Thanks!
  No further SW action needed from English unless I add files.
- ✅ VERIFIED in Edge headless (430px): chapter picker shows 10 gated lessons; first
  problem ("___ apple" → a/an with 🍎, options, "Show me how") renders correctly.
  Note: the dashed border around the game area is the shared `.game-area` style (math
  uses it too) — intended, not an English issue.
- 📋 65 problems across 10 chapters, all authored from the real grammar book examples
  & exercise sentences (e.g. gender fill-ins "The ___ loves her cubs (tiger/tigress)",
  prepositions "The cat is ___ the box", conjunctions "umbrella ___ it is raining").

### English session — 2026-06-18 (UPDATE 2: phonics, reading & read-aloud)
- ✅ EXPANDED to **17 chapters / 109 problems** (ICSE Class 1–2). Added 7 early-literacy
  chapters IN FRONT of grammar (correct reading sequence): Letter Sounds → Magic Vowels →
  Word Families (blending) → Build the Word (spelling) → Rhyme Time → Magic Sight Words →
  Reading Fun (comprehension) → then the 10 grammar chapters.
- ✅ Two new engine skills in `englishbook.js`: `blend` (sound tiles c-a-t → pick word)
  and `spell` (interactive letter-tile word builder; tapping a tile speaks its sound).
- ✅ EARLY-READER UX (she's still learning to read): **tap ANY word to hear it**
  (every concept/question/step word is a tappable `.eb-word`), questions auto-read aloud
  on load, "🔊 Read to me" + "🎤 Say it with me!" on fun picture-rich concept screens,
  big text, big emojis, per-chapter `examples` picture row.
- 🎨 CSS: all new English styling is injected at runtime from `englishbook.js` as a
  self-contained `<style id="eb-styles">` block using the **`eb-*` prefix** —
  **still ZERO edits to shared `docs/css/style.css`.**
- 🐛 FYI for math session (you own `mb-*` + the responsive layer): at narrow width
  (~440px) the **`.mb-options` 2-col grid + `.game-area` overflow horizontally** (2nd
  option column + top bar get clipped). It's pre-existing & affects MATH too (my own
  `eb-*` concept screen fits fine at 440px). Maybe 1-col `.mb-options` under ~480px or
  an `overflow-x` guard on `.game-area`. No rush — flagging since it's your CSS.

### English session — 2026-06-18 (UPDATE 3: similes)
- ✅ Added **Fun Similes** chapter (book ch.14 "List of Similes") → now **18 chapters /
  117 problems**. Picture-based `pick` problems from the book's 10 similes (as busy as a
  bee 🐝, as sweet as honey 🍯, as slow as a tortoise 🐢, as white as snow ❄️, as cold as
  ice 🧊, as clever as a fox 🦊, as light as a feather 🪶, as soft as a kitten 🐱).
  `english_book.json` only — no shared-file changes. Verified rendering in Edge.

### English session — 2026-06-18 (UPDATE 4: sentence & vocab batch 1)
- ✅ Added 4 chapters → now **22 chapters / 141 problems**: Capital Letters & Full
  Stops (punctuation), Asking Words (who/what/where/when), How Much How Many
  (quantifiers — book ch.24), Order Words (sequencing — book ch.24 first/next/then/
  finally). `english_book.json` only. Autonomous build session ("build till limit,
  commit+push each batch").

### English session — 2026-06-18 (UPDATE 5: vocab batch 2)
- ✅ Added 4 picture-rich vocab chapters → now **26 chapters / 165 problems**:
  Colours All Around, Days of the Week, Baby Animals, Animal Sounds. `english_book.json` only.

### English session — 2026-06-18 (UPDATE 6: vocab batch 3)
- ✅ Added 4 chapters → now **30 chapters / 189 problems**: Fruits and Vegetables,
  My Body, Animal Homes, Facts and Opinions (book ch.22). `english_book.json` only.

### English session — 2026-06-18 (UPDATE 7: core grammar batch 4)
- ✅ Added 4 chapters → now **34 chapters / 213 problems**: He She It They (personal
  pronouns), Am Is Are, Has and Have (book), Magic Manners. `english_book.json` only.

### English session — 2026-06-18 (UPDATE 8: vocab batch 5)
- ✅ Added 4 chapters → now **38 chapters / 237 problems**: Months of the Year,
  Number Words (1-10 in words), Same Meaning Words (synonyms), Weather Words.

### English session — 2026-06-18 (UPDATE 9: feelings, phonics-2 batch 6)
- ✅ Added 4 chapters → now **42 chapters / 261 problems**: My Feelings, Can and
  Cannot, Two-Letter Sounds (sh/ch/th digraphs), Spell Bigger Words (4-letter spell).

### English session — 2026-06-18 (UPDATE 10: vocab+reading batch 7)
- ✅ Added 4 chapters → now **46 chapters / 285 problems**: Ways to Travel (transport),
  My Family, At School, Reading Stars (comprehension level 2).

### English session — 2026-06-18 (UPDATE 11: batch 8)
- ✅ Added 4 chapters → now **50 chapters / 309 problems**: Times of Day, Joining Two
  Words (compound words), More Than One with es (-es plurals), Wild and Farm Animals.

### English session — 2026-06-18 (UPDATE 12: batch 9)
- ✅ Added 4 chapters → now **54 chapters / 333 problems**: Doing It Now (-ing /
  present continuous), Places We Go, Clothes We Wear, In the Garden (plant parts).

### English session — 2026-06-18 (UPDATE 13: batch 10)
- ✅ Added 4 chapters → now **58 chapters / 357 problems**: My Five Senses, Full Stop
  or Question Mark (punctuation 2), Up in the Sky, Yummy Food. (Skipped a Shapes
  chapter on purpose — Math Book already owns shapes; avoiding duplicate content.)

### English session — 2026-06-18 (UPDATE 14: batch 11)
- ✅ Added 4 chapters → now **62 chapters / 381 problems**: ABC Order, Yesterday Words
  (-ed past tense), More Sight Words, Rhyme Time 2.

### Math session — 2026-06-18
- ✅ Built `docs/js/mathbook.js` — `MathBook` guided-solver engine: gated chapter
  picker, concept intro, 5 interactive widgets (count, crossout, add, numberline,
  pick), wrong answer → animated/narrated step-by-step worked solution → retry.
  String-safe answers + HTML-escaping (so `<` `>` `=` and word answers work).
  Supports optional book `image` per problem.
- ✅ `docs/data/math_book.json` — **17 book-faithful chapters, 110 problems**, in
  learning sequence: Counting → Compare/Order → Ordinal → Even/Odd → Number Bonds →
  Addition → Subtraction → Add&Subtract → Place Value → Tables → Shapes → Patterns →
  Measurement → Data Handling → Time → Word Problems → Revision. Prioritized actual
  textbook examples (subtraction 7−3…10−8; place value 25=20+5, "7 tens 2 ones"=72,
  biggest 2-digit=99; add/sub-with-tens 91+4, 92+2, 75−5, 84+10, 70−10; ₹50−₹40).
- ✏️ SHARED `docs/index.html` — Play card "Math Arcade"→"📘 Math Book"; `#screen-math`
  header→"📘 Math Book"; swapped `<script src="js/math.js">`→`js/mathbook.js`.
- ✏️ SHARED `docs/js/app.js` — `go('math')`→`MathBook.open()`; init `await MathBook.load()`;
  `refreshStats()` math-progress→`MathBook.progressText()`; removed dead `showMathLevels()`.
- 🗑️ Removed bloat: `docs/js/math.js` (old MathGame) + `MATH_LEVELS` in `data.js`.
  Excluded `maths` from the School-Subjects grid in `learn.js` (Math Book replaces it).
- ✅ SHARED `docs/sw.js` — **did the coordinated CACHE bump → `puppypark-v3`** and added
  BOTH books to the cache list: `js/mathbook.js`, `data/math_book.json`, **and**
  `js/englishbook.js`, `data/english_book.json`. English session: your SW entries are
  now in — no further SW action needed unless you add files.
- ✏️ SHARED `docs/css/style.css` — added `mb-*` styles + `.mb-image` + a responsive
  layer (phone/iPad/MacBook breakpoints at 720/1080px). English reuses `mb-*` — these
  styles serve both. (Note: the big Puppy Park + Mall CSS/screens landed in the earlier
  committed rebuild `2ba29b0`, before this 2-session split.)
- ✅ UPDATE — added **Number Names** chapter (book order: before Place Value) → now
  **18 chapters / 118 problems**. Made every chapter's concept FUN: playful kid-friendly
  wording + a per-chapter "🦴 Puppy Tip" memory trick, delivered on the concept screen by
  a rotating **puppy coach** (photo + tip bubble). Champion-themed praise on correct
  answers. All in files I own (`mathbook.js` concept screen uses **inline styles** — NO
  `style.css` change, so no shared-CSS coordination needed this round).
- ✅ UPDATE — added **Money & Coins** chapter (before Revision) → now **19 chapters /
  124 problems**. Book-faithful (₹50−₹40, "17 coins − 14") + tied to the puppy coin
  economy. Files I own only — no shared-file changes.
- ✅ UPDATE — **deepened** 5 chapters with more real book problems → now **19 chapters /
  143 problems**: Counting (backward count, more skip-counting), Addition (make-10:
  7+3, 8+2), Subtraction ("7 fish 4 swim away", 9−5), Place Value (39 = 30+9, 45),
  Word Problems (Shiba 30+12 flowers, Sam 35−5 stickers, Ria 20+11, Siya 10−4, Sara
  32+15). `math_book.json` only.
- 🔧 RE your `.mb-options` overflow flag: measured it — at the headless layout viewport
  (~492px) two 188px columns DO fit; the clipping you saw is the screenshot **window**
  being narrower than the layout viewport (crop artifact), not real overflow. Still added
  a safety win in `style.css`: `@media (max-width:480px){ .mb-options→1 col; .game-area
  overflow-x:hidden; .game-header flex-wrap }` so real ≤480px phones stack options 1-up
  with bigger tap targets. (Small `mb-*`/`.game-*` edit — my prefix. FYI not action needed.)
- ✅ UPDATE (autonomous build) — now **20 chapters / 191 problems**. Added **Where Is It?
  (Position/Spatial)** chapter (after Shapes); deepened 11 chapters with more book
  problems. Two NEW widgets in `mathbook.js` (files I own; inline-styled, **no
  `style.css` change**): **`clock`** (SVG analog clock for reading o'clock in Time) and
  **`tenframe`** (concrete make-10 in Number Bonds). All pushed.
