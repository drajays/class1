# 🐶 Advaita's Puppy Park

A math-first Class 1 learning game for GitHub Pages. Advaita solves problems to
earn 🪙 coins (and rare 🦴 bones), and her four real puppies — **Simba, Mufasa,
Golu & Whity** — keep wishing for things from a 1000-item **Puppy Mall**. Grant
their wishes to keep them happy! Built to be light, big-buttoned, voiced, and
offline-friendly.

**Live site:** https://drajays.github.io/class1/

If you see this README instead of the app, use **https://drajays.github.io/class1/docs/** or fix Pages settings below.

## GitHub Pages setup

**Option A (recommended):** Settings → Pages → **Source: GitHub Actions**

**Option B:** Settings → Pages → Branch `main` → Folder **`/docs`**

**Option C:** Root deploy — `index.html` redirects to `/class1/docs/`

## What's in the app

- **Puppy Park (home)** — 4 real puppies with happiness bars and live "wish" bubbles
- **Play & Earn** — Math Arcade (front and centre), Reading Arcade, mini-games, plus
  6 school subjects (Maths, English, EVS, Hindi, Sanskrit, Computer) with notes + quizzes
- **Puppy Mall** — 1000 generated items across Clothes / Food / Toys / Home / Other;
  buy treats, grant wishes, dress up the puppies
- **Wish loop** — each puppy asks for a new item every ~3 hours (`WISH_INTERVAL_MS`
  in `docs/js/puppies.js`); happiness gently decays so they "miss" Advaita
- **Economy** — correct answers → 🪙 coins; every 40 coins → 🦴 bone; granting a wish → bonus bones
- **Read-aloud + sounds** (browser TTS / WebAudio), parent corner behind a math gate

## Local content (not in git)

| Local only | Purpose |
|------------|---------|
| `noupload/` | Heavy / private source files (OCR exports, full-res `dogs.jpg`) — never uploaded |
| `*.pdf_by_PaddleOCR-VL-1.6.*` | OCR source files (now inside `noupload/`) |
| `organized/` | Chapter folders from OCR |
| `organize_content.py` | Split OCR into subjects |

The four puppy portraits in `docs/assets/puppies/` were cropped from the original
photo (kept in `noupload/dogs.jpg`).

## Rebuild app data

After updating `organized/` locally:

```bash
python3 build_app_data.py
```

This writes `docs/data/*.json` and `docs/assets/content/` for the app.

## Local test

```bash
cd docs && python3 -m http.server 8080
```
