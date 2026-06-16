# Class 1 Adventure

Gamified Class 1 learning app for GitHub Pages.

**Live site:** https://drajays.github.io/class1/

If you see this README instead of the app, use **https://drajays.github.io/class1/docs/** or fix Pages settings below.

## GitHub Pages setup

**Option A (recommended):** Settings → Pages → **Source: GitHub Actions**

**Option B:** Settings → Pages → Branch `main` → Folder **`/docs`**

**Option C:** Root deploy — `index.html` redirects to `/class1/docs/`

## What's in the app

- **6 subjects** — Maths, English, EVS, Hindi, Sanskrit, Computer
- **120 chapters** with notes + quiz questions
- **4 child profiles**, coins, stars, badges
- **Read-aloud** (browser TTS) on notes

## Local content (not in git)

| Local only | Purpose |
|------------|---------|
| `*.pdf_by_PaddleOCR-VL-1.6.*` | OCR source files |
| `organized/` | Chapter folders from OCR |
| `organize_content.py` | Split OCR into subjects |

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
