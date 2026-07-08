---
name: subject-content
description: Use when authoring or editing curated subject chapters (EVS, Hindi lessons, Sanskrit, Computer) for Advaita's Puppy Park. Covers source files, JSON schema, pedagogy rules, TTS locale, and verification checklist.
---

# Authoring Curated Subject Content

Read `CLAUDE.md` and `plan.md` first. This skill guides the creation of curated, book-faithful content for EVS, Hindi lessons (पाठ), Sanskrit, and Computer.

## 1. Source of Truth & Pedagogy
- **Source:** Always read from `organized/<subject>/<NN_chapter>/content.md` (and related `pictures/` or `noupload/*.md` OCR dumps).
- **Throw out OCR questions:** The auto-generated questions in legacy `docs/data/*.json` (e.g. from SubjectHub/learn.js) are often nonsense or garbled. Never copy them.
- **Keep concepts faithful:** Extract the real teaching points from the book chapter. Write simple, clear concepts and questions that a 6–8-year-old child can read and answer.
- **Reading Level:** Short words, big text, emoji visuals in options where natural (e.g., 🖐️👁️👂👅👃 or 🖥️⌨️🖱️).
- **Never Punish:** Every problem MUST include a `why` field explaining the correct answer gently.

## 2. JSON Schema (Shared SubjectBook / Hindi Lessons)
Each subject has a JSON file in `docs/data/` (e.g. `evs_book.json`, `sanskrit_book.json`, `computer_book.json`, `hindi_lessons.json`):

```json
{
  "subject": "evs",
  "title": "EVS",
  "icon": "🌿",
  "lang": "en-IN",
  "chapters": [
    {
      "id": "evs_my_body",
      "title": "My Amazing Body",
      "icon": "🖐️",
      "concept": {
        "intro": [
          "Our body has many amazing parts!",
          "Each part helps us do different things."
        ],
        "tip": "Hands are for holding, legs are for running!"
      },
      "problems": [
        {
          "skill": "pick",
          "q": "Which organ helps us see?",
          "options": ["👁️ Eyes", "👂 Ears", "👃 Nose"],
          "a": "👁️ Eyes",
          "why": "We use our eyes to see everything around us!"
        }
      ]
    }
  ]
}
```

### Supported Problem Skills
- `pick`: Visual MCQ (workhorse for most questions).
- `pickimg`: Options are emoji/visuals.
- `truefalse`: Sugar for 2-option True/False pick.
- `sort`: Group/sort items (use sparingly only if genuinely needed, e.g. living vs. non-living).

## 3. Per-Subject TTS Locale
- **`hi-IN`**: Hindi lessons (`hindi_lessons.json`) and Sanskrit (`sanskrit_book.json` — read via Devanagari TTS; if needed, fallback to transliteration).
- **`en-IN`**: EVS (`evs_book.json`), Computer (`computer_book.json`), English, Math.

## 4. Verification Checklist
Before finishing a chapter or subject:
1. **Run Validator:** Run `python3 validate_subject_book.py` (when added in Phase 1) or `python3 validate_math_book.py`. Ensure clean exit (0 errors, no duplicate IDs, every `a` is in `options`, every problem has `why`, no mojibake/OCR artifacts).
2. **Test locally:** Serve with `cd docs && python3 -m http.server 8080`.
3. **Headless Edge Screenshot:** Verify UI rendering:
   ```bash
   "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" --headless --disable-gpu --no-sandbox --window-size=430,1000 --virtual-time-budget=6000 --screenshot=/tmp/subject_test.png "http://localhost:8080/index.html"
   ```
4. **Service Worker:** Bump `CACHE` in `docs/sw.js` whenever a new JSON file is added or asset lists change.
