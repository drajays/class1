#!/usr/bin/env python3
"""Validate docs/data/*_book.json and hindi_lessons.json — schema, answer-in-options, why explanations, and OCR artifact checks.
Run after editing subject content: python3 validate_subject_book.py
Exits non-zero if any problem is malformed or contains OCR garbage.
"""
import json
import re
import sys
from pathlib import Path

FILES = [
    "evs_book.json",
    "sanskrit_book.json",
    "computer_book.json",
    "hindi_lessons.json",
    "english_book.json",
]
VALID_SKILLS = {"pick", "pickimg", "truefalse", "blend", "spell"}
MOJIBAKE_CHARS = {"τ", "ட", "µ", "ß", "§", "¶"}


def validate_file(path: Path) -> list:
    if not path.exists():
        return []
    d = json.loads(path.read_text(encoding="utf-8"))
    errs = []
    ids = set()
    lang = d.get("lang", "en-IN")
    last_level = 0

    for ch in d.get("chapters", []):
        chid = ch.get("id")
        if not chid:
            errs.append(f"{path.name}: chapter missing id")
            continue
        if chid in ids:
            errs.append(f"{path.name}: DUP chapter id {chid}")
        ids.add(chid)

        for k in ("id", "title", "icon", "concept", "problems", "level"):
            if k not in ch:
                errs.append(f"{path.name} {chid}: missing field {k}")

        level = ch.get("level")
        if not isinstance(level, int) or not (1 <= level <= 5):
            errs.append(f"{path.name} {chid}: 'level' must be integer 1-5, got {level!r}")
        else:
            if level < last_level:
                is_revision = any(term in str(chid).lower() or term in str(ch.get("title", "")).lower()
                                  for term in ("revision", "review", "abhyaas", "अभ्यास", "parishishtani"))
                is_eng_vocab_transition = (path.name == "english_book.json")
                if not (is_revision or is_eng_vocab_transition):
                    print(f"  [WARN] {path.name}: {chid} jumps down in level from {last_level} to {level}")
            last_level = level

        for i, p in enumerate(ch.get("problems", [])):
            loc = f"{path.name} {chid}#{i + 1}"
            sk = p.get("skill")
            if sk not in VALID_SKILLS:
                errs.append(f"{loc}: bad/missing skill {sk!r}")
                continue
            req_fields = ("q", "word", "emoji") if sk == "spell" else ("q", "options", "a", "why")
            for f in req_fields:
                if f not in p:
                    errs.append(f"{loc}({sk}): missing '{f}'")

            if "why" in p and not str(p["why"]).strip():
                errs.append(f"{loc}: empty 'why' explanation")

            if "options" in p and "a" in p:
                opts = p["options"]
                if not isinstance(opts, list) or len(opts) < 2:
                    errs.append(f"{loc}: options must be a list of at least 2 items")
                elif p["a"] not in opts:
                    errs.append(f"{loc}: answer {p['a']!r} NOT in options {opts}")
                if len(opts) != len(set(map(str, opts))):
                    errs.append(f"{loc}: duplicate options {opts}")

                # Check OCR artifacts in options
                for opt in opts:
                    opt_str = str(opt)
                    if "help box" in opt_str.lower():
                        errs.append(f"{loc}: option contains 'Help Box' OCR artifact: {opt_str!r}")
                    if re.match(r"^[0-9]+[\.\)]\s*", opt_str) or re.match(r"^[a-d][\.\)]\s*", opt_str):
                        errs.append(f"{loc}: option contains leading numbering artifact: {opt_str!r}")
                    if len(opt_str) > 65:
                        errs.append(f"{loc}: option exceeds 65 chars (likely OCR fragment): {opt_str!r}")
                    if any(c in opt_str for c in MOJIBAKE_CHARS):
                        errs.append(f"{loc}: option contains mojibake/garbled character: {opt_str!r}")

            # Check question and explanation strings for mojibake
            for text_field in ("q", "why", "a"):
                val = str(p.get(text_field, ""))
                if any(c in val for c in MOJIBAKE_CHARS):
                    errs.append(f"{loc}: {text_field} contains mojibake/garbled character: {val!r}")
                if "help box" in val.lower() and text_field != "why":
                    errs.append(f"{loc}: {text_field} contains 'Help Box' artifact: {val!r}")

    return errs


def main() -> int:
    data_dir = Path(__file__).parent / "docs" / "data"
    all_errs = []
    total_chapters = 0
    total_problems = 0

    for fname in FILES:
        p = data_dir / fname
        if p.exists():
            d = json.loads(p.read_text(encoding="utf-8"))
            chs = d.get("chapters", [])
            total_chapters += len(chs)
            total_problems += sum(len(c.get("problems", [])) for c in chs)
            errs = validate_file(p)
            all_errs.extend(errs)
        else:
            print(f"Note: {fname} does not exist yet (will be validated when added).")

    print(f"Validated Subjects | Chapters: {total_chapters} | Problems: {total_problems} | Errors: {len(all_errs)}")
    for e in all_errs:
        print("  -", e)
    return 1 if all_errs else 0


if __name__ == "__main__":
    sys.exit(main())
