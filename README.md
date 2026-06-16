# Class 1 Adventure

Gamified Class 1 learning app for GitHub Pages.

**Live site:** https://drajays.github.io/class1/

## What's in the app

- **6 subjects** — Maths, English, EVS, Hindi, Sanskrit, Computer
- **120 chapters** with notes + quiz questions
- **4 child profiles**, coins, stars, badges
- **Read-aloud** (browser TTS) on notes

## GitHub Pages

Settings → Pages → Branch `main` → Folder **`/docs`**

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
