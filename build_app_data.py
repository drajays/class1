#!/usr/bin/env python3
"""Build docs/data and docs/assets/content from organized/ for the learning app."""

from __future__ import annotations

import json
import re
import shutil
import unicodedata
from pathlib import Path

BASE = Path(__file__).resolve().parent
ORG = BASE / "organized"
DOCS = BASE / "docs"
DATA = DOCS / "data"
ASSETS = DOCS / "assets" / "content"

MAX_IMAGES_PER_CHAPTER = 6
MAX_NOTE_PARAS = 24
MAX_QUESTIONS = 12

SUBJECTS = [
    ("maths", "Maths", "🔢", "#ff6b6b"),
    ("english_grammar", "English", "📖", "#4ecdc4"),
    ("evs", "EVS", "🌿", "#6bcb77"),
    ("hindi", "Hindi", "🇮🇳", "#fd79a8"),
    ("sanskrit", "Sanskrit", "🕉️", "#e17055"),
    ("computer", "Computer", "💻", "#74b9ff"),
]

FILL_BLANK = re.compile(r"_{2,}")
MCQ_MARKER = re.compile(r"[○◯⭕]|^\s*[a-dA-D][\.\)]\s", re.MULTILINE)
QUESTION_LINE = re.compile(r"^(?:#{1,4}\s*)?(?:\d+[\.\)]\s*)?(.+\?)\s*$")
HEADING = re.compile(r"^#{1,4}\s+(.+)$")
IMG_MD = re.compile(r"!\[([^\]]*)\]\(([^)]+)\)")
TABLE_LINK = re.compile(r"\[Table \d+\]\(tables/[^)]+\)")


def clean_title(folder: str) -> str:
    name = re.sub(r"^\d+_", "", folder)
    name = name.replace("_", " ")
    if re.search(r"[\u0900-\u097F]", name):
        return name.title() if name.isascii() else name
    return name.replace("-", " ").title()


def slug_id(subject: str, folder: str) -> str:
    return f"{subject}_{folder}"


def strip_md_noise(text: str) -> str:
    text = IMG_MD.sub("", text)
    text = TABLE_LINK.sub("", text)
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"\$\$.*?\$\$", "", text, flags=re.DOTALL)
    text = re.sub(r"\$[^$]+\$", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def parse_notes(md: str, chapter_key: str, pic_dir: Path, asset_dir: Path) -> list[dict]:
    blocks: list[dict] = []
    img_count = 0

    for raw in md.splitlines():
        line = raw.strip()
        if not line or line.startswith("<table") or "border=1" in line:
            continue

        hm = HEADING.match(line)
        if hm:
            t = strip_md_noise(hm.group(1))
            if t and len(t) < 120:
                blocks.append({"type": "heading", "text": t})
            continue

        for alt, rel in IMG_MD.findall(raw):
            if img_count >= MAX_IMAGES_PER_CHAPTER:
                break
            src_path = pic_dir / rel
            if not src_path.exists():
                src_path = pic_dir / "pictures" / Path(rel).name
            dest_dir = asset_dir / chapter_key
            dest_dir.mkdir(parents=True, exist_ok=True)
            dest = dest_dir / src_path.name
            if not dest.exists():
                shutil.copy2(src_path, dest)
            blocks.append({
                "type": "image",
                "src": f"assets/content/{chapter_key}/{src_path.name}",
                "alt": alt or "Picture",
            })
            img_count += 1

        if IMG_MD.search(raw):
            continue

        text = strip_md_noise(line)
        if len(text) < 12 or len(text) > 500:
            continue
        if re.match(r"^[\d\s\W]+$", text):
            continue
        if text.lower().startswith(("subject:", "grade:", "topic:", "title:")):
            continue
        blocks.append({"type": "text", "text": text})

    # merge consecutive text dedupe
    merged: list[dict] = []
    for b in blocks:
        if merged and b["type"] == "text" and merged[-1]["type"] == "text":
            if b["text"] != merged[-1]["text"]:
                merged.append(b)
        else:
            merged.append(b)
    return merged[:MAX_NOTE_PARAS]


def parse_questions(md: str) -> list[dict]:
    questions: list[dict] = []
    lines = [ln.strip() for ln in md.splitlines()]

    for i, line in enumerate(lines):
        clean = strip_md_noise(line)
        if not clean:
            continue

        if FILL_BLANK.search(clean) and len(clean) > 15:
            blank = FILL_BLANK.sub("___", clean)
            opts = _nearby_options(lines, i)
            if len(opts) >= 2:
                questions.append({
                    "type": "mcq",
                    "q": blank,
                    "options": opts[:4],
                    "answer": opts[0],
                    "hint": "Read the notes above carefully!",
                })
            continue

        qm = QUESTION_LINE.match(clean)
        if qm and len(clean) > 20:
            opts = _nearby_options(lines, i) or _generic_options(clean)
            questions.append({
                "type": "mcq",
                "q": qm.group(1) if qm.lastindex else clean,
                "options": opts[:4],
                "answer": opts[0],
                "hint": "Think about what you learned in this chapter.",
            })

        if re.search(r"(?i)choose the correct|tick the correct|circle the", clean):
            opts = _nearby_options(lines, i + 1, span=8)
            if len(opts) >= 2:
                questions.append({
                    "type": "mcq",
                    "q": clean,
                    "options": opts[:4],
                    "answer": opts[0],
                    "hint": "Pick the best answer!",
                })

    # dedupe by question text
    seen: set[str] = set()
    unique: list[dict] = []
    for q in questions:
        key = q["q"][:80]
        if key not in seen:
            seen.add(key)
            unique.append(q)
    return unique[:MAX_QUESTIONS]


def _nearby_options(lines: list[str], start: int, span: int = 6) -> list[str]:
    opts: list[str] = []
    for line in lines[start + 1 : start + 1 + span]:
        t = strip_md_noise(line)
        if not t:
            continue
        if t.startswith("○") or t.startswith("◯"):
            t = t.lstrip("○◯ ").strip()
        if re.match(r"^[a-dA-D][\.\)]\s", t):
            t = re.sub(r"^[a-dA-D][\.\)]\s*", "", t)
        if 1 < len(t) < 80 and not t.endswith("?"):
            if t not in opts:
                opts.append(t)
    return opts


def _generic_options(q: str) -> list[str]:
    if re.search(r"[\u0900-\u097F]", q):
        return ["हाँ", "नहीं", "शायद", "पता नहीं"]
    return ["Yes", "No", "Maybe", "I will check"]


def build_chapter(subject: str, folder: str, ch_path: Path) -> dict | None:
    md_path = ch_path / "content.md"
    if not md_path.exists():
        return None
    md = md_path.read_text(encoding="utf-8")
    chapter_key = slug_id(subject, folder)
    notes = parse_notes(md, chapter_key, ch_path, ASSETS)
    questions = parse_questions(md)
    if not notes and not questions:
        return None
    if not questions and notes:
        questions = [{
            "type": "mcq",
            "q": f"What did you learn in {clean_title(folder)}?",
            "options": ["I read the notes!", "I need to read again", "I will ask a grown-up", "Let me try more"],
            "answer": "I read the notes!",
            "hint": "Read the notes first, then answer.",
        }]
    return {
        "id": chapter_key,
        "folder": folder,
        "title": clean_title(folder),
        "notes": notes,
        "questions": questions,
    }


def main() -> None:
    if not ORG.exists():
        raise SystemExit(f"Missing {ORG} — run organize_content.py first.")

    if ASSETS.exists():
        shutil.rmtree(ASSETS)
    DATA.mkdir(parents=True, exist_ok=True)

    catalog = {"subjects": []}
    total_chapters = 0
    total_questions = 0

    for sid, name, emoji, color in SUBJECTS:
        subj_dir = ORG / sid
        if not subj_dir.exists():
            continue
        folders = sorted(p.name for p in subj_dir.iterdir() if p.is_dir())
        chapters: list[dict] = []
        for folder in folders:
            ch = build_chapter(sid, folder, subj_dir / folder)
            if ch:
                chapters.append(ch)
                total_questions += len(ch["questions"])

        if not chapters:
            continue

        out = DATA / f"{sid}.json"
        out.write_text(json.dumps({"chapters": chapters}, ensure_ascii=False, indent=2), encoding="utf-8")
        catalog["subjects"].append({
            "id": sid,
            "name": name,
            "emoji": emoji,
            "color": color,
            "chapterCount": len(chapters),
            "file": f"data/{sid}.json",
        })
        total_chapters += len(chapters)
        print(f"  {sid}: {len(chapters)} chapters")

    (DATA / "catalog.json").write_text(json.dumps(catalog, ensure_ascii=False, indent=2), encoding="utf-8")
    asset_mb = sum(f.stat().st_size for f in ASSETS.rglob("*") if f.is_file()) / 1_048_576
    data_mb = sum(f.stat().st_size for f in DATA.rglob("*.json")) / 1_048_576
    print(f"\nDone: {total_chapters} chapters, {total_questions} questions")
    print(f"  data/: {data_mb:.1f} MB  assets/content/: {asset_mb:.1f} MB")


if __name__ == "__main__":
    print("Building app data from organized/...\n")
    main()
