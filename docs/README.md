# Class 1 Adventure — GitHub Pages

Gamified learning app with **notes, pictures, and quizzes** for Class 1.

**Live:** https://drajays.github.io/class1/

## Subjects (120 chapters)

| Subject | Chapters |
|---------|----------|
| Maths | 31 |
| English | 25 |
| EVS | 16 |
| Hindi | 27 |
| Sanskrit | 14 |
| Computer | 7 |

Each chapter has:
- **📖 Notes** — text + pictures from the textbook (tap 🔊 to hear)
- **🎯 Quiz** — multiple-choice questions from the chapter

Plus **Math Arcade** and **Reading Arcade** for quick practice.

## GitHub Pages

Settings → Pages → Branch `main` → Folder **`/docs`**

## Regenerate content (on your computer)

```bash
# 1. Organize OCR files (local only)
python3 organize_content.py --hinsan-only
python3 organize_content.py --evs-only

# 2. Build app data into docs/
python3 build_app_data.py
```

## Local test

```bash
cd docs && python3 -m http.server 8080
```

Open http://localhost:8080
