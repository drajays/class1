# CLAUDE.md — Advaita's Puppy Park 🐶📚

Project context for Claude. Read this first every session.

## What this is
A learning game for **Advaita** (the user's daughter, Class 1, ~6–8 yo girl). A static
vanilla-JS PWA in `docs/`, deployed to GitHub Pages.

- **Repo:** https://github.com/drajays/class1
- **Live:** https://drajays.github.io/class1/docs/

## The #1 rule (do not break)
**Learning is the goal. The game (puppies, coins, mall) is ONLY the fun wrapper that
motivates learning.** Keep the app LEAN — no bloat, no gimmick screens. If something
doesn't serve learning or the motivation loop, don't add it.

## Subject content pedagogy (all subjects)
- **Strictly follow the book.** Problems & concepts come from the real Class-1 books.
  Per-chapter source: `organized/<subject>/<NN_topic>/content.md` (+ `pictures/`, `tables/`). Full OCR in `noupload/*.md`.
- **Ignore OCR garbage.** The auto-generated quiz questions in legacy `docs/data/*.json` are often nonsense. Throw them out. When OCR is illegible or noisy, keep the concept TYPE faithful and use clearly legible book-plausible content.
- **Go in sequence** — chapters in a real learning order; problems in order; gated.
- **Show every step & never punish.** Wrong answers are never punished — they trigger a gentle, animated/narrated worked explanation (`why`), then a retry. The app teaches itself with **minimum help** (self-correcting / auto-guide).
- **Voiced & minimal words.** Big text, big emojis, short kid-friendly wording, TTS read-aloud (`en-IN` for English/Math/EVS/Computer, `hi-IN` for Hindi/Sanskrit).

## The core game loop (already built)
Solve problems → earn 🪙 coins (every 40 coins → a 🦴 bone) → Advaita's **4 real
puppies** (cropped from her photo) wish for items every ~3h from a **1000-item Puppy
Mall** → spend coins to grant wishes → happiness + voice + confetti → return loop.
Puppies: **Simba** (boy), **Mufasa** (boy), **Golu** (girl), **Whity** (girl).

## Architecture / file map (`docs/`)
- `index.html` — all screens (single-page; screens toggled by `.active`).
- `js/config.js` — `AppConfig.url()` resolves asset paths for Pages subpaths.
- `js/data.js` — HEROES (just Advaita), MATH_LEVELS/ENGLISH_LEVELS, QUEST_BANK, minigame data.
- `js/puppies.js` — `PUPPIES` data, Park (home) + puppy-detail UI, `Pet` shim.
- `js/mall.js` — generates 1000 mall items, shopping UI.
- `js/store.js` — localStorage player state: coins, bones, puppies{happy,owned,equipped,wish,wishAt}, economy, wish system, journey journal (`p.journal`). **Privacy Note:** All player progress, attempt telemetry, journey log events (`p.journal`), and parent dashboard insights stay strictly on-device in `localStorage`. Nothing is ever transmitted or uploaded anywhere.
- `js/mathbook.js` — **Math Book** guided-solver engine + widgets (the learning-first math path).
- `js/englishbook.js` — **English Book** guided learning engine (reuses `mb-*`, self-injected `eb-*` styles).
- `js/hindibook.js` — **Hindi Book** tap-to-hear varnamala & reading practice (self-injected `hb-*` styles).
- `js/subjectbook.js` — **Subject Book** guided learning engine for EVS, Sanskrit, Computer (reuses `mb-*`, self-injected `sb-*` styles).
- `js/learn.js` — generic subject chapters (notes + quiz) for non-math subjects.
- `js/english.js`, `js/minigames.js`, `js/extras.js` (SubjectHub, QuickQuest), `js/parent.js`.
- `js/sounds.js` (WebAudio), `js/speech.js` (TTS read-aloud), `js/rewards.js` (toast/confetti/popup).
- `js/app.js` — controller: screen routing, single player, refreshStats.
- `css/style.css` — all styles (Fredoka font; theme vars at top; Puppy Park section at bottom). CSS prefix convention: `mb-*` math/shared problem UI, `eb-*` english-reserved, `hb-*` hindi self-injected.
- `data/math_book.json` — book-faithful math chapters + guided problems (self-contained, fetched by mathbook.js).
- `data/english_book.json` — book-faithful English chapters + problems.
- `data/{evs,sanskrit,computer}_book.json`, `data/hindi_lessons.json` — curated subject content files for SubjectBook.
- `data/hindi_words.json` — 630 common Hindi words for reading practice.
- `data/*.json` — generated subject content; `data/curated/*.json` — hand-fixed overrides merged by build script.
- `assets/puppies/*.jpg` — the 4 cropped puppy photos.
- `sw.js` — service worker (bump `CACHE` name when asset list changes).

## Local-only (gitignored) — `noupload/`
Heavy/private source kept out of git: OCR exports (`*.pdf_by_PaddleOCR-VL-1.6.*`,
incl. the full math book), original full-res `dogs.jpg`. Also gitignored: `organized/`,
`organize_content.py`.

## Build / run / verify
- Rebuild subject JSON from `organized/`: `python3 build_app_data.py` (honors `docs/data/curated/`).
  Math Book content (`data/math_book.json`) is authored directly, NOT via this script.
- Serve: `cd docs && python3 -m http.server 8080` → http://localhost:8080/
- Screenshot (no Chrome installed; use Edge headless):
  `"/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" --headless --disable-gpu --no-sandbox --window-size=430,1000 --virtual-time-budget=6000 --screenshot=/tmp/x.png "http://localhost:8080/index.html"`
  To screenshot a deep screen, inject `App.selectPlayer('advaita',true);App.go('<screen>')` before `</body>` in a temp copy.
- Pillow for cropping: `pip3 install Pillow --break-system-packages`.

## Conventions
- Plain ES (no build step, no framework). Match existing style. Big buttons, few words, voiced.
- Commit messages end with: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Commit/push only when the user asks.

## Multi-session note
Sometimes a second Claude session works this repo in parallel (e.g. English).
**Read & update `COORDINATION.md` before editing shared files** (`index.html`,
`app.js`, `style.css`, `sw.js`). Math owns `mathbook.js`/`math_book.json`; English owns
`englishbook.js`/`english_book.json`. English reuses `mb-*` CSS classes.

## Status / roadmap
- ✅ Puppy Park + Mall + economy + wish loop shipped (commit 2ba29b0).
- ✅ Math Book — `mathbook.js` engine + `math_book.json`, now **20 book-faithful
  chapters / 191 problems** in sequence, concept-first (fun puppy-coach intro + memory
  tip per chapter), guided step-by-step self-correcting solutions, responsive
  (phone/iPad/MacBook in Edge). Widgets: count, crossout, add, numberline, pick, **clock**
  (SVG analog clock), **tenframe** (make-10). Order: Counting → Compare → Ordinal →
  Even/Odd → Number Bonds → Addition → Subtraction → Add&Subtract → Number Names →
  Place Value → Tables → Shapes → Position → Patterns → Measurement → Data → Time →
  Word Problems → Money → Revision. Replaced old Math Arcade. Committed & pushed.
- ✅ English Book — `englishbook.js` + `english_book.json`, DONE with **62 chapters / 381 problems** across a structured 10-unit curriculum (phonics, reading, grammar, vocabulary). Reuses `mb-*` classes + `eb-*` styles.
- ✅ Hindi Book — `hindibook.js` + `hindi_words.json`, DONE with tap-to-hear varnamala (स्वर / व्यंजन / मात्रा / शब्द) + scored reading practice (630 common words). Uses self-injected `hb-*` CSS.
- 📋 Active Roadmap (`plan.md`) — Complete remaining subject content (EVS, Hindi lessons, Sanskrit, Computer) on the book-faithful engine pattern, retiring the legacy OCR notes+quiz path.

See also memory: `~/.claude/projects/-Users-dr-ajayshukla-class1/memory/puppy-park-rebuild.md`.
