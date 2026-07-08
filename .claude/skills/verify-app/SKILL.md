---
name: verify-app
description: Use when running, verifying, testing, or taking headless screenshots of Advaita's Puppy Park PWA. Covers local server, deep-linking screen injection, Edge headless screenshots, and running JSON validators.
---

# Verify App — Run & Screenshot Guide

Read `CLAUDE.md` first. Use these instructions to test changes, validate data files, and capture headless Edge screenshots to verify your work.

## 1. Local Server
To serve the static PWA locally without caching issues:
```bash
cd docs && python3 -m http.server 8080
```
The app will be accessible at `http://localhost:8080/`.

## 2. Running JSON Validators
Whenever you edit or add chapter JSON files, run the appropriate validator from the repo root before committing:

- **Math Book:**
  ```bash
  python3 validate_math_book.py
  ```
- **Subject Books (EVS, Sanskrit, Computer, Hindi Lessons - Phase 1+):**
  ```bash
  python3 validate_subject_book.py
  ```
Ensure the validator exits cleanly with return code 0 (no missing answers, no duplicate IDs, no mojibake, all problems have `why`).

## 3. Headless Edge Screenshots
Since Chrome is not installed, use Microsoft Edge headless to capture verification screenshots.

### Standard Screenshot (Home / Play Screen)
```bash
"/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" --headless --disable-gpu --no-sandbox --window-size=430,1000 --virtual-time-budget=6000 --screenshot=/tmp/home.png "http://localhost:8080/index.html"
```
For iPad layout: `--window-size=1024,1366`.

### Deep-Linking & Screen Injection
To screenshot a specific screen (e.g. `math`, `evs`, `hindi`, `sanskrit`, `computer`) directly without manual clicking, create a temporary copy of `index.html` or use an inline script injection:

**Method:** Inject `App.selectPlayer('advaita',true);App.go('<screen>')` after load.
For example, to test Math Book directly in headless Edge:
```bash
python3 -c "
with open('docs/index.html') as f: html = f.read()
inj = \"<script>addEventListener('load',()=>setTimeout(()=>{App.selectPlayer('advaita',true);App.go('math')},900))</script></body>\"
with open('docs/index_test.html','w') as f: f.write(html.replace('</body>', inj))
"
"/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" --headless --disable-gpu --no-sandbox --window-size=430,1000 --virtual-time-budget=6000 --screenshot=/tmp/math_screen.png "http://localhost:8080/index_test.html"
rm docs/index_test.html
```

## 4. Service Worker Cache Check
When verifying asset changes, ensure `CACHE` name in `docs/sw.js` was bumped so the updated files load properly in production.
