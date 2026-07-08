---
name: puppy-park
description: Use when working on Advaita's Puppy Park — the Class-1 learning game in this repo (docs/ PWA, puppy economy, book-faithful Math Book). Covers where things live, how to add math chapters, run, and screenshot.
---

# Puppy Park — working guide

Read `CLAUDE.md` at the repo root first; it has the full context. This skill is the
quick how-to for common tasks.

## Golden rules
1. **Learning first** — the puppy game is only the motivation wrapper. No bloat.
2. **Subject content = strictly the book** — source: `organized/<subject>/<chapter>/content.md` and full OCR in `noupload/*.md`. Ignore OCR garbage questions and noisy tables; keep concept/type faithful with clearly legible book content.
3. **Sequence + step-by-step** — chapters in learning order, gated; every wrong answer shows a gentle, animated/narrated worked explanation (`why`) then a retry. Minimum help; app guides.
4. **CSS prefixes & caching** — `mb-*` for Math/shared problem UI, `eb-*` for English self-injected, `hb-*` for Hindi self-injected. **Every asset-list change in docs/ requires bumping `CACHE` name in `docs/sw.js`.**

## Book Engines (Math, English, Hindi, SubjectBook)
- **Math Book** (`docs/js/mathbook.js`, `docs/data/math_book.json`): interactive widgets (`count`, `crossout`, `add`, `numberline`, `pick`, `clock`, `tenframe`). Reuses `mb-*`.
- **English Book** (`docs/js/englishbook.js`, `docs/data/english_book.json`): phonics, reading, grammar, vocab. Reuses `mb-*`, self-injected `eb-*`.
- **Hindi Book** (`docs/js/hindibook.js`, `docs/data/hindi_words.json`): tap-to-hear varnamala + scored reading practice. Self-injected `hb-*`.
- **SubjectBook** (`docs/js/subjectbook.js`): generic book-faithful engine for EVS, Sanskrit, Computer.

## Add or edit a Math Book chapter
Edit `docs/data/math_book.json` (fetched directly by `docs/js/mathbook.js`; no build step).
Each chapter: `{ id, title, icon, concept, problems: [...] }`, problems in order.
Problem `skill` picks the interactive widget; the engine auto-generates the worked solution:
- `count`  — `{skill:"count", q, emoji, n, a}` count objects.
- `crossout` — `{skill:"crossout", q, emoji, n, take, a}` take-away (cross out).
- `add` — `{skill:"add", q, emoji, x, y, a}` combine two groups (use for sums ≤ 10).
- `numberline` — `{skill:"numberline", q, start, op:"+"|"-", step, a}` hops (use for >10).
- `pick` — `{skill:"pick", q, options:[...], a, why}` visual MCQ; `why` is the explanation.

Keep numbers from the real book. Gating uses `Store.completeLevel('math', chapterId, stars)`.
Extra widgets: `clock` (`{skill:"clock", q, hour, a:"3 o'clock", options}`), `tenframe`
(`{skill:"tenframe", q, filled, a}` — a is empties to make 10), and any `pick` can add a
`chart:[{label,emoji,n}]` pictograph.

**After ANY math content edit, run `python3 validate_math_book.py`** (repo root) — it
checks structure, that each answer is in its options, and that all arithmetic is correct.
A wrong answer key would mislead the child, so this must pass (exit 0) before commit.

## Run & verify
- Serve: `cd docs && python3 -m http.server 8080` → http://localhost:8080/
- Rebuild non-math subject JSON (if you touched `organized/` or `docs/data/curated/`):
  `python3 build_app_data.py`
- Screenshot (no Chrome; Edge headless works):
  `"/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" --headless --disable-gpu --no-sandbox --window-size=430,1000 --virtual-time-budget=6000 --screenshot=/tmp/x.png URL`
  For a deep screen, copy index.html and inject before `</body>`:
  `<script>addEventListener('load',()=>setTimeout(()=>{App.selectPlayer('advaita',true);App.go('math')},900))</script>`
- After changing any file or adding assets to the cache list, **you MUST bump `CACHE` name in `docs/sw.js`** (e.g. `puppypark-v10`).

## Don't
- Don't re-add removed bloat (Space Journey, 20 Features, Trophy Room, old Sticker Shop,
  Companion Lounge).
- Don't upload `noupload/` (gitignored). Don't commit/push unless asked.
