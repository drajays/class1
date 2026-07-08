#!/usr/bin/env python3
"""Validate docs/data/math_book.json — structure, answer-in-options, and arithmetic.
Run after editing Math Book content:  python3 validate_math_book.py
Exits non-zero if any problem is malformed or has a wrong answer key.
"""
import json
import sys
from pathlib import Path

DATA = Path(__file__).parent / "docs" / "data" / "math_book.json"

REQ = {
    "count": ["emoji", "n", "a"],
    "crossout": ["emoji", "n", "take", "a"],
    "add": ["emoji", "x", "y", "a"],
    "numberline": ["start", "op", "step", "a"],
    "clock": ["hour", "a", "options"],
    "tenframe": ["filled", "a"],
    "column": ["top", "op", "bot", "a"],
    "pick": ["a", "options"],
}


def main() -> int:
    d = json.loads(DATA.read_text(encoding="utf-8"))
    errs = []
    ids = set()
    last_level = 0
    for ch in d["chapters"]:
        if ch["id"] in ids:
            errs.append(f"DUP chapter id {ch['id']}")
        ids.add(ch["id"])
        for k in ("id", "title", "icon", "concept", "problems", "level"):
            if k not in ch:
                errs.append(f"{ch['id']}: missing chapter field {k}")

        level = ch.get("level")
        if not isinstance(level, int) or not (1 <= level <= 5):
            errs.append(f"{ch['id']}: 'level' must be integer 1-5, got {level!r}")
        else:
            if level < last_level:
                is_revision = any(term in str(ch['id']).lower() or term in str(ch.get("title", "")).lower()
                                  for term in ("revision", "review", "abhyaas", "अभ्यास"))
                if not is_revision:
                    print(f"  [WARN] math_book.json: {ch['id']} jumps down in level from {last_level} to {level}")
            last_level = level

        for i, p in enumerate(ch["problems"]):
            loc = f"{ch['id']}#{i + 1}"
            sk = p.get("skill")
            if sk not in REQ:
                errs.append(f"{loc}: bad/missing skill {sk!r}")
                continue
            for f in REQ[sk] + ["q"]:
                if f not in p:
                    errs.append(f"{loc}({sk}): missing '{f}'")
            if "options" in p and "a" in p:
                if p["a"] not in p["options"]:
                    errs.append(f"{loc}: answer {p['a']!r} NOT in options {p['options']}")
                if len(p["options"]) != len(set(map(str, p["options"]))):
                    errs.append(f"{loc}: duplicate options {p['options']}")
            if sk == "add" and p["x"] + p["y"] != p["a"]:
                errs.append(f"{loc}: {p['x']}+{p['y']} != {p['a']}")
            if sk == "crossout" and p["n"] - p["take"] != p["a"]:
                errs.append(f"{loc}: {p['n']}-{p['take']} != {p['a']}")
            if sk == "numberline":
                exp = p["start"] + p["step"] if p["op"] == "+" else p["start"] - p["step"]
                if exp != p["a"]:
                    errs.append(f"{loc}: {p['start']}{p['op']}{p['step']} != {p['a']}")
            if sk == "tenframe" and 10 - p["filled"] != p["a"]:
                errs.append(f"{loc}: 10-{p['filled']} != {p['a']}")
            if sk == "column":
                exp = p["top"] + p["bot"] if p["op"] == "+" else p["top"] - p["bot"]
                if exp != p["a"]:
                    errs.append(f"{loc}: {p['top']}{p['op']}{p['bot']} != {p['a']}")
    total = sum(len(c["problems"]) for c in d["chapters"])
    print(f"Chapters: {len(d['chapters'])}  Problems: {total}  Errors: {len(errs)}")
    for e in errs:
        print("  -", e)
    return 1 if errs else 0


if __name__ == "__main__":
    sys.exit(main())
