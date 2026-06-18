---
name: puppy-park
description: Use when working on Advaita's Puppy Park — the Class-1 learning game in this repo (docs/ PWA, puppy economy, book-faithful Math Book). Covers where things live, how to add math chapters, run, and screenshot.
---

# Puppy Park — working guide

Read `CLAUDE.md` at the repo root first; it has the full context. This skill is the
quick how-to for common tasks.

## Golden rules
1. **Learning first** — the puppy game is only the motivation wrapper. No bloat.
2. **Math = strictly the book** — source: `organized/maths/<chapter>/content.md` and the
   full OCR `noupload/mathxy.pdf_by_PaddleOCR-VL-1.6.md`. Ignore OCR garbage questions and
   noisy `tables/*.html`; keep concept/type faithful with clearly-legible book numbers.
3. **Sequence + step-by-step** — chapters in learning order, gated; every wrong answer
   shows a full animated/narrated worked solution then a retry. Minimum help; app guides.

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

## Run & verify
- Serve: `cd docs && python3 -m http.server 8080` → http://localhost:8080/
- Rebuild non-math subject JSON (if you touched `organized/` or `docs/data/curated/`):
  `python3 build_app_data.py`
- Screenshot (no Chrome; Edge headless works):
  `"/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" --headless --disable-gpu --no-sandbox --window-size=430,1000 --virtual-time-budget=6000 --screenshot=/tmp/x.png URL`
  For a deep screen, copy index.html and inject before `</body>`:
  `<script>addEventListener('load',()=>setTimeout(()=>{App.selectPlayer('advaita',true);App.go('math')},900))</script>`
- After changing the cached asset list, bump `CACHE` in `docs/sw.js`.

## Don't
- Don't re-add removed bloat (Space Journey, 20 Features, Trophy Room, old Sticker Shop,
  Companion Lounge).
- Don't upload `noupload/` (gitignored). Don't commit/push unless asked.
