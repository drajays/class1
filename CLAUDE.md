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

## Math pedagogy rules (the user's explicit requirements)
- **Strictly follow the book.** Problems & concepts come from the real Class-1 book.
  Full OCR of the math book: `noupload/mathxy.pdf_by_PaddleOCR-VL-1.6.md`. Per-chapter
  source: `organized/maths/<NN_topic>/content.md` (+ `pictures/`, `tables/`).
- **Ignore OCR garbage.** The auto-generated quiz questions in `docs/data/*.json` are
  often nonsense (e.g. "Yes/No/Maybe" options). Throw them out. The OCR `tables/*.html`
  are noisy place-value grids — don't trust exact numbers from them; keep the
  concept/problem TYPE faithful and use clearly legible numbers from the book
  (e.g. subtraction exercise = 7−3, 8−4, 6−2, 9−4, 10−3, 10−8).
- **Go in sequence** — chapters in a real learning order; problems in order; gated.
- **Show every step.** Wrong answers are never punished — they trigger a full,
  animated, narrated step-by-step worked solution, then a retry. The app teaches
  itself with **minimum help** (self-correcting / auto-guide).

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
- `js/store.js` — localStorage player state: coins, bones, puppies{happy,owned,equipped,wish,wishAt}, economy, wish system.
- `js/mathbook.js` — **Math Book** guided-solver engine + widgets (the learning-first math path).
- `js/learn.js` — generic subject chapters (notes + quiz) for non-math subjects.
- `js/math.js` / MATH_LEVELS — legacy "Math Arcade" (being replaced by Math Book).
- `js/english.js`, `js/minigames.js`, `js/extras.js` (SubjectHub, QuickQuest), `js/parent.js`.
- `js/sounds.js` (WebAudio), `js/speech.js` (TTS read-aloud), `js/rewards.js` (toast/confetti/popup).
- `js/app.js` — controller: screen routing, single player, refreshStats.
- `css/style.css` — all styles (Fredoka font; theme vars at top; Puppy Park section at bottom).
- `data/math_book.json` — book-faithful math chapters + guided problems (self-contained, fetched by mathbook.js).
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
- 🚧 English Book — built in parallel by the English session (englishbook.js +
  english_book.json, 10 grammar chapters).
- ⏭️ Later: more puppy life / sounds; other subjects (EVS, Hindi, Sanskrit, Computer)
  still use the legacy notes+quiz path.

See also memory: `~/.claude/projects/-Users-dr-ajayshukla-class1/memory/puppy-park-rebuild.md`.
