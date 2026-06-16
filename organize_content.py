#!/usr/bin/env python3
"""Organize PaddleOCR md/json files into subject/chapter folders."""

from __future__ import annotations

import json
import re
import unicodedata
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen

BASE = Path(__file__).resolve().parent
OUTPUT = BASE / "organized"

TABLE_RE = re.compile(r"<table\b[^>]*>.*?</table>", re.DOTALL | re.IGNORECASE)
IMG_DIV_RE = re.compile(
    r'<div[^>]*>\s*<img[^>]+src="([^"]+)"[^>]*/>\s*</div>',
    re.DOTALL | re.IGNORECASE,
)
IMG_TAG_RE = re.compile(r'<img[^>]+src="([^"]+)"[^>]*/?>', re.IGNORECASE)
HEADER_TOPIC_RE = re.compile(
    r"Subject:\s*([^<|]+?).*?(?:Topic|Title):\s*([^<|]+)",
    re.IGNORECASE | re.DOTALL,
)

SUBJECT_MAP = {
    "mathxy": "maths",
    "evseng": "english_grammar",
    "hinsan": "hindi_sanskrit",
    "computer": "computer",
}

COMPUTER_CHAPTERS = [
    (r"COMPUTER\s*-\s*MY\s*FRIEND", "01_computer_my_friend"),
    (r"COMPUTER\s*-\s*A\s*SMART\s*MACHINE", "02_computer_a_smart_machine"),
    (r"COMPUTER\s*-\s*A\s*HANDY\s*MACHINE", "03_computer_a_handy_machine"),
    (r"KNOW\s*MY\s*FRIEND", "04_know_my_friend"),
    (r"CONNECT\s*WITH\s*COMPUTER", "05_connect_with_computer"),
    (r"DO'?S\s*(?:AND\s*DON'?TS\s*)?OF\s*A\s*COMPUTER", "06_dos_and_donts_of_computer"),
]


def slugify(name: str, max_len: int = 60) -> str:
    name = unicodedata.normalize("NFKC", name.strip())
    name = re.sub(r"\s+", "_", name)
    name = re.sub(r"[^\w\-]+", "", name, flags=re.UNICODE)
    name = re.sub(r"_+", "_", name).strip("_")
    return (name or "untitled")[:max_len].lower()


def image_ext(url: str) -> str:
    ext = Path(urlparse(url).path).suffix.lower()
    return ext if ext in {".jpg", ".jpeg", ".png", ".gif", ".webp"} else ".jpg"


def download_image(url: str, dest: Path) -> bool:
    if dest.exists() and dest.stat().st_size > 0:
        return True
    try:
        req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urlopen(req, timeout=20) as resp:
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(resp.read())
        return True
    except Exception:
        return False


def batch_download(downloads: list[tuple[str, Path]]) -> int:
    if not downloads:
        return 0
    ok = 0
    with ThreadPoolExecutor(max_workers=24) as pool:
        futures = {pool.submit(download_image, url, path): (url, path) for url, path in downloads}
        for future in as_completed(futures):
            if future.result():
                ok += 1
    return ok


def extract_assets(content: str, chapter_dir: Path) -> str:
    pictures_dir = chapter_dir / "pictures"
    tables_dir = chapter_dir / "tables"
    pictures_dir.mkdir(parents=True, exist_ok=True)
    tables_dir.mkdir(parents=True, exist_ok=True)

    img_counter = 1
    table_counter = 1
    downloads: list[tuple[str, Path]] = []
    url_map: dict[str, str] = {}

    def replace_table(match: re.Match) -> str:
        nonlocal table_counter
        fname = f"table_{table_counter:03d}.html"
        (tables_dir / fname).write_text(match.group(0), encoding="utf-8")
        table_counter += 1
        return f"\n\n[Table {table_counter - 1}](tables/{fname})\n\n"

    def register_img(url: str) -> str:
        nonlocal img_counter
        if url in url_map:
            return url_map[url]
        ext = image_ext(url)
        fname = f"img_{img_counter:03d}{ext}"
        local = pictures_dir / fname
        downloads.append((url, local))
        ref = f"![Image {img_counter}](pictures/{fname})"
        url_map[url] = ref
        img_counter += 1
        return ref

    content = TABLE_RE.sub(replace_table, content)
    content = IMG_DIV_RE.sub(lambda m: f'\n\n<div style="text-align: center;">{register_img(m.group(1))}</div>\n\n', content)
    content = IMG_TAG_RE.sub(lambda m: register_img(m.group(1)), content)

    failed = len(downloads) - batch_download(downloads)
    if failed:
        manifest = [{"file": p.name, "url": u} for u, p in downloads if not p.exists() or p.stat().st_size == 0]
        if manifest:
            (pictures_dir / "failed_downloads.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    return content


def split_by_header_topics(text: str, subject_name: str) -> list[tuple[str, str]]:
    markers: list[tuple[int, str]] = []
    for match in HEADER_TOPIC_RE.finditer(text):
        topic = re.sub(r"</?[^>]+>", "", match.group(2)).strip()
        markers.append((match.start(), topic))

    if not markers:
        return [(f"00_{slugify(subject_name)}", text)]

    chapters: list[tuple[str, str]] = []
    intro = text[: markers[0][0]].strip()
    if intro:
        chapters.append((f"00_{slugify(subject_name)}_introduction", intro))

    merged: dict[str, str] = {}
    order: list[str] = []
    for i, (pos, topic) in enumerate(markers):
        end = markers[i + 1][0] if i + 1 < len(markers) else len(text)
        chunk = text[pos:end].strip()
        if not chunk:
            continue
        key = slugify(topic)
        if key in merged:
            merged[key] += "\n\n" + chunk
        else:
            merged[key] = chunk
            order.append(key)

    for idx, key in enumerate(order):
        chapters.append((f"{idx + 1:02d}_{key}", merged[key]))
    return chapters


def split_computer(text: str) -> list[tuple[str, str]]:
    positions: list[tuple[int, str]] = []
    seen_folders: set[str] = set()
    for pattern, folder in COMPUTER_CHAPTERS:
        if folder in seen_folders:
            continue
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            positions.append((match.start(), folder))
            seen_folders.add(folder)
    positions = sorted(positions, key=lambda x: x[0])
    if not positions:
        return [("00_computer", text)]

    chapters: list[tuple[str, str]] = []
    intro = text[: positions[0][0]].strip()
    if intro:
        chapters.append(("00_computer_introduction", intro))
    for i, (pos, folder) in enumerate(positions):
        end = positions[i + 1][0] if i + 1 < len(positions) else len(text)
        chunk = text[pos:end].strip()
        if chunk:
            chapters.append((folder, chunk))
    return chapters


def split_hindi(text: str) -> list[tuple[str, str]]:
    lines = text.splitlines(keepends=True)
    hits: list[tuple[int, str]] = []
    offset = 0
    sanskrit_start = len(text)
    for marker in (r"# अभ्यास:\s*\n\n##### चित्र", r"##### अद्वारतं संस्कृतम्", r"# मातृभूमि"):
        m = re.search(marker, text)
        if m:
            sanskrit_start = min(sanskrit_start, m.start())
            break
    if sanskrit_start == len(text):
        sanskrit_start = int(len(text) * 0.78)

    offset = 0
    seen_slugs: set[str] = set()
    for line in lines:
        stripped = line.strip()
        if offset >= sanskrit_start:
            break
        if offset < 68:
            offset += len(line)
            continue

        matched = False
        if re.match(r"^#### .+की मात्रा", stripped) or re.match(r"^## \d+ .+की मात्रा", stripped):
            title = stripped.lstrip("#").strip()
            matched = True
        elif re.match(r"^# [^\n#]{2,80}$", stripped):
            title = stripped.lstrip("#").strip()
            if any(x in title for x in ("निर्देश", "अभ्यास", "हिंदी पाठ्य", "ओशेन", "1 4 6 8")):
                matched = False
            elif re.search(r"[\u0900-\u097F]", title):
                matched = True

        if matched:
            slug = slugify(title)
            if slug not in seen_slugs:
                seen_slugs.add(slug)
                hits.append((offset, slug))
        offset += len(line)

    if sanskrit_start < len(text):
        hits.append((sanskrit_start, "sanskrit"))

    hits = sorted(set(hits), key=lambda x: x[0])
    if not hits:
        return [("00_hindi_sanskrit", text)]

    chapters: list[tuple[str, str]] = []
    intro = text[: hits[0][0]].strip()
    if intro:
        chapters.append(("00_introduction", intro))

    for i, (pos, folder) in enumerate(hits):
        end = hits[i + 1][0] if i + 1 < len(hits) else len(text)
        chunk = text[pos:end].strip()
        if chunk:
            chapters.append((f"{i + 1:02d}_{folder}", chunk))
    return chapters


def assign_json_pages(json_data: list, chapter_chunks: list[tuple[str, str]]) -> dict[str, list]:
    if not json_data or not chapter_chunks:
        return {}
    total_text = sum(len(c) for _, c in chapter_chunks)
    if total_text == 0:
        return {folder: [] for folder, _ in chapter_chunks}

    result: dict[str, list] = {folder: [] for folder, _ in chapter_chunks}
    page_idx = 0
    consumed = 0
    for folder, chunk in chapter_chunks:
        target = consumed + len(chunk)
        while page_idx < len(json_data) and consumed < target:
            result[folder].append(json_data[page_idx])
            md = json_data[page_idx].get("markdown", {})
            consumed += len(md.get("text", "") if isinstance(md, dict) else str(md))
            page_idx += 1
        if page_idx >= len(json_data):
            break

    while page_idx < len(json_data):
        result[chapter_chunks[-1][0]].append(json_data[page_idx])
        page_idx += 1
    return result


def process_file(stem: str) -> None:
    subject = SUBJECT_MAP[stem]
    md_path = BASE / f"{stem}.pdf_by_PaddleOCR-VL-1.6.md"
    json_path = BASE / f"{stem}.pdf_by_PaddleOCR-VL-1.6.json"
    text = md_path.read_text(encoding="utf-8")
    json_data = json.loads(json_path.read_text(encoding="utf-8"))

    if stem in {"mathxy", "evseng"}:
        chapters = split_by_header_topics(text, subject)
    elif stem == "computer":
        chapters = split_computer(text)
    else:
        chapters = split_hindi(text)

    subject_dir = OUTPUT / subject
    if stem == "hinsan" and subject_dir.exists():
        import shutil
        shutil.rmtree(subject_dir)
    subject_dir.mkdir(parents=True, exist_ok=True)
    json_by_chapter = assign_json_pages(json_data, chapters)

    print(f"\n{subject}: {len(chapters)} chapters")
    for folder, chunk in chapters:
        chapter_dir = subject_dir / folder
        if (chapter_dir / "content.md").exists() and stem != "hinsan":
            print(f"  skip {folder} (exists)")
            continue
        if chapter_dir.exists() and stem == "hinsan":
            import shutil
            shutil.rmtree(chapter_dir)
        chapter_dir.mkdir(parents=True, exist_ok=True)
        clean_md = extract_assets(chunk, chapter_dir)
        (chapter_dir / "content.md").write_text(clean_md, encoding="utf-8")
        chapter_json = json_by_chapter.get(folder, [])
        (chapter_dir / "content.json").write_text(
            json.dumps(chapter_json, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        pics = len(list((chapter_dir / "pictures").glob("img_*")))
        tables = len(list((chapter_dir / "tables").glob("*.html")))
        print(f"  {folder}: {pics} pictures, {tables} tables, {len(chapter_json)} json pages")


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for stem in SUBJECT_MAP:
        print(f"Processing {stem}...")
        process_file(stem)
    print(f"\nDone. Output: {OUTPUT}")


if __name__ == "__main__":
    main()
