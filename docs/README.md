# Class 1 Adventure — GitHub Pages

A simple, gamified learning app for **3–4 Class 1 children** (Math + English reading).

## Live app

After enabling GitHub Pages, open:

`https://<your-username>.github.io/<repo-name>/`

## Setup GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch**
4. Branch: `main` (or `master`) → folder: **`/docs`**
5. Save — site goes live in 1–2 minutes

## Features

- **4 hero profiles** (Aarav, Mia, Rohan, Zara) — progress saved per child on the device
- **Coins, stars, streaks, levels, badges, stickers**
- **Math Mountain** — counting, addition, subtraction, ordinal numbers with picture/emoji explanations
- **Reading Forest** — hear words (🔊), picture match, spell words, fill blanks (for weak readers)
- Works offline after first load (static HTML/JS)

## Local test

```bash
cd docs
python3 -m http.server 8080
```

Open `http://localhost:8080`

## Files

```
docs/
  index.html      — main app
  css/style.css   — kid-friendly UI
  js/
    data.js       — lessons & questions
    store.js      — save progress (localStorage)
    speech.js     — read-aloud (browser TTS)
    rewards.js    — confetti & celebrations
    math.js       — math games
    english.js    — reading games
    app.js        — navigation
  assets/images/  — pictures from Class 1 books
```

## Tips for parents

- Use **Chrome or Safari** for best 🔊 read-aloud
- Each child should pick their own hero so progress stays separate
- Wrong answers show **step-by-step picture help** — encourage kids to read it together
