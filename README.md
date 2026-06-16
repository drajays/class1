# Class 1 Adventure

Gamified Class 1 learning app (Math + English) for GitHub Pages.

**Live site:** https://drajays.github.io/class1/

## GitHub Pages setup

Settings → Pages → Branch `main` → Folder **`/docs`** → Save

## Local test

```bash
cd docs && python3 -m http.server 8080
```

Open http://localhost:8080

## Local content (not in git)

PaddleOCR exports (`*.pdf_by_PaddleOCR-VL-1.6.json/md`) and `organized/` chapter folders stay on your machine only. Use `organize_content.py` locally if you need to regenerate them.
