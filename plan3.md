# plan3.md — Ground the app 100% in the Class-1 books (reading source + PDFs)

Status: PLAN ONLY. Nothing executed. Model after `~/class_8_sci` (data-module-per-chapter
+ `build-*` scripts + `pdf-export.js` for chapter/subject PDFs).

## 0. Findings (what exists today)
Sources = 4 OCR'd books in `noupload/` (PaddleOCR md+json; **original PDFs not found on disk**)
split into `organized/<subject>/<NN>/content.md + pictures/ + tables/`:

| Subject | Source chapters (organized) | App chapters (docs/data) | Words | Pics |
|---|---|---|---|---|
| Maths | 34 (00–27 + dup/timed-test/revision sheets) | 23 (+10 "challenge", NOT in book) | 16k | 493 |
| EVS | 16 (00 intro + 15) | 15 | 18k | 921 |
| English (Grammar book) | 25 (00–24) | 62 + 14 "plus" (largely authored/synthetic) | 38k | 1201 |
| Hindi | 27 (00 + 26 पाठ) | 26 lessons + 630-word list (list NOT in book) | 17k | 1074 |
| Sanskrit | 14 | 14 | 4.5k | 180 |
| Computer | 7 | 7 | 5.7k | 551 |

Gap: app content is *book-inspired*, not *book-complete*. Exercises/practice sheets/
worksheets/reading passages are partly dropped; English & Maths have invented chapters;
OCR noise (garbled Hindi folder names, "Adulto Smukla", stray headers) is unfixed.

## 1. Target
One canonical, verified **book layer** per chapter = the "100% reliable reading source".
App engines and PDFs both read from it; nothing in it is invented.

`book/<subject>/<NN>_<slug>.json`
```
{ id, subject, title, page_range,
  sections: [ {type: concept|example|activity|exercise|worksheet|reading|vocab|box,
               heading, text, items:[{q, options?, answer?, answer_src: book|derived|missing}],
               images:[{src, caption, bbox_page}] } ],
  coverage: {sections_in_source, sections_captured, items_total, items_answered},
  review: {ocr_fixed:bool, signed_off:bool} }
```
Answers: use the book's key if printed; otherwise `derived` (marked, shown differently);
never silently invented. Extra non-book material (math challenge, plus-book, 630 words)
moves to a separate `extras/` layer, excluded from "book" PDFs.

## 2. Phases (stop + review after each, as in plan.md)
0. **Locate originals** — ask user for the 4 PDFs (or the folders in "connected folder").
   Without them, page images can't be re-OCR'd for illegible pages; fall back to OCR md.
1. **Inventory & map** — script `book_inventory.py`: for every `organized/*/content.md`
   list headings, exercise markers (Practice Sheet, Worksheet, Q1…, Activity, Reading),
   image count → `book/INVENTORY.md` + the true chapter order/title per subject
   (fix Hindi names, drop duplicates e.g. maths 02/03, 05/06/08 overlaps, 'timed test').
2. **Clean extraction** — per chapter: strip headers/footers/Paddle artefacts, rejoin
   split lines, fix known OCR errors (LaTeX `$ \underline{} $` → text), keep images with
   captions, tables → real tables. Emit `book/*.json`. Hindi/Sanskrit: Unicode
   normalisation + manual spot-fix of garbled words.
3. **Coverage audit** — `validate_book.py`: every source section/exercise appears in the
   JSON; counts match inventory; images referenced exist; flags `answer_src: missing`.
   Report `book/COVERAGE.md` (target: 100% sections, ≥ all printed answers).
4. **Answer pass** — fill `missing` answers (derive + mark), spot-checked by user for
   Maths/English first (highest exercise density).
5. **Re-point app** — engines (`mathbook/englishbook/subjectbook/hindibook`) consume
   `book/*.json` for concept + exercises in book order; extras gated as "Bonus".
   Keep `why`/guided steps; add "Read the chapter" view (text+pictures, TTS).
6. **PDFs** — HTML→PDF via headless Edge (already available; Chrome absent), print CSS,
   Fredoka/Noto (Devanagari font needed). Outputs: `pdf/<subject>/<NN>_<slug>.pdf`
   per chapter + `pdf/<Subject>_Class1_full.pdf` per subject (+ optional answer-key
   version). Build script `build_pdfs.py`; `class_8_sci/pdf-export.js` as reference.
7. **Verify** — sample 3 chapters/subject side-by-side with source page images;
   FE-TEST protocol from plan.md; bump `sw.js` CACHE.

## 3. Rules
- Book text verbatim after OCR repair; any change logged in `book/CHANGES.md`.
- Gitignored `organized/`+`noupload/` stay private; commit only `book/*.json` + derived
  images the repo already publishes (confirm before committing pictures — copyright).
- Order of work: Maths → EVS → English → Hindi → Sanskrit → Computer.
- Parallelise per subject with agents only if user wants; otherwise sequential inline.

## 4. Decisions needed from user
1. Where are the original 4 PDFs (and any other class-1 books, e.g. an English reader/
   literature book — only Grammar exists in OCR)?
2. Keep "challenge"/"plus"/630-word content as clearly-labelled Bonus, or drop?
3. PDFs: include answers inline, or separate answer-key PDF? Commit PDFs to repo or local only?

## 5. Decisions (user, 2026-10-15)
- Originals lost → the 4 OCR exports are the only source. Use own knowledge to explain concepts
  better; priority = concept coverage + easy, interesting kid reading.
- Phase 1 DONE: `book_inventory.py` → `book/INVENTORY.md`; `build_dossier.py` → `book/dossier/<subject>/<chapter>.txt`
  (cleaned text, tables inlined, images as `[img_NNN]`).
- Finding: the "books" are school worksheet packs (Maths = Grade 1 Term 3&4 worksheets; English "vocabulary"
  chunk = 30k words of mixed worksheets). Chapter boundaries in `organized/` are unreliable → the book
  layer must regroup by TOPIC (e.g. Addition, Subtraction, Place value, Ordinal, Patterns, Data, Shapes,
  Measurement, Time, Tables, Word problems), each = kid-friendly concept page + every worksheet item.
- Next: author `book/<subject>/<topic>.json` from dossiers (agent per subject recommended).
