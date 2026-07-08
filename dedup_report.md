# Deduplication & Extraction Report (`dedup_report.md`)

Generated during **Phase A** per user directive and `plan2.md` architecture guarantees.
Every source array was audited against taught content in Puppy Park (`docs/data/english_book.json`) using the **taught-content criterion** so `Extracted - Dropped = Shipped` holds exactly per source array.

## Extraction Arithmetic Summary

| Source App & Array | Total Extracted | Dropped as Duplicate | Shipped Count | Target File & Notes |
|---|---|---|---|---|
| **Reading Buddy — LIBRARY** | 100 | 0 | 100 | `docs/data/stories.json` (100 leveled stories across L1–L4) |
| **Reading Buddy — CONVOS** | 20 | 0 | 20 | `docs/data/stories.json` (20 dialogues titled 'Conversation: ...' at L3) |
| **Phonics — commonWords** | 300 | 67 | 233 | `docs/data/word_practice.json` (Sight words deduped vs taught content) |
| **Phonics — wordFamilies** | 78 | 0 | 78 | `docs/data/word_practice.json` (78 word family patterns) |
| **Noun Ninjas Banks** | 38 | 6 | 32 | `docs/data/grammar_banks.json` (Nouns across common/proper/coll/abs/gen) |
| **Word Power Quiz** | 211 | 6 | 205 | `docs/data/vocab_quiz.json` (205 vocabulary entries after dropping 6 internal dups) |

---

## Detailed Dropped Duplicates Log

### Reading Buddy Dropped Stories & Dialogues (0 dropped)

*No items dropped in this category.*

### Phonics commonWords Dropped Items (67 dropped)

- **the** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_sight_words`)
- **and** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_sight_words`)
- **to** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_reading2`)
- **in** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_reading`)
- **is** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_sight_words`)
- **you** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_sight_words2`)
- **that** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_pronouns`)
- **it** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_he_she_it`)
- **he** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_he_she_it`)
- **was** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_sight_words2`)
- **on** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_reading`)
- **are** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_sight_words`)
- **they** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_he_she_it`)
- **this** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_pronouns`)
- **have** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_has_have`)
- **one** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_number_words`)
- **but** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_conjunctions`)
- **what** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_question_words`)
- **when** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_question_words`)
- **can** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_can`)
- **an** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_articles`)
- **she** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_he_she_it`)
- **many** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_quantifiers`)
- **then** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_sequencing`)
- **these** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_pronouns`)
- **some** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_quantifiers`)
- **like** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_sight_words2`)
- **has** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_has_have`)
- **look** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_sight_words2`)
- **two** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_reading`)
- **see** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_sight_words`)
- **my** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_sight_words2`)
- **first** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_sequencing`)
- **water** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_food`)
- **who** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_question_words`)
- **little** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_synonyms`)
- **thing** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_nouns`)
- **where** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_question_words`)
- **much** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_quantifiers`)
- **three** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_number_words`)
- **small** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_nouns`)
- **large** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_synonyms`)
- **big** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_capitals`)
- **because** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_conjunctions`)
- **here** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_sight_words2`)
- **men** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_plural`)
- **play** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_capitals`)
- **house** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_rhyming2`)
- **food** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_nouns`)
- **between** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_prepositions`)
- **school** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_nouns`)
- **tree** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_rhyming`)
- **light** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_antonyms`)
- **under** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_prepositions`)
- **next** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_sequencing`)
- **those** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_pronouns`)
- **run** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_sight_words`)
- **children** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_plural`)
- **feet** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_body`)
- **car** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_rhyming`)
- **night** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_antonyms`)
- **white** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_colours`)
- **book** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_school`)
- **hear** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_senses`)
- **stop** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_capitals`)
- **far** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_antonyms`)
- **girl** — *Reason:* Sight word already taught as target content in english_book.json (Covered by: `eng_nouns`)

### Noun Ninjas Dropped Items (6 dropped)

- **king** — *Reason:* Noun (common) already taught in english_book.json (Covered by: `eng_gender`)
- **girl** — *Reason:* Noun (common) already taught in english_book.json (Covered by: `eng_nouns`)
- **lion** — *Reason:* Gender noun pair already taught in english_book.json (Covered by: `eng_gender`)
- **tiger** — *Reason:* Gender noun pair already taught in english_book.json (Covered by: `eng_gender`)
- **prince** — *Reason:* Gender noun pair already taught in english_book.json (Covered by: `eng_gender`)
- **fox** — *Reason:* Gender noun pair already taught in english_book.json (Covered by: `eng_similes`)

### Word Power Quiz Dropped Entries (6 dropped)

- **Loquacious** — *Reason:* Duplicate entry inside word_power_quiz source file (Covered by: `word_power_quiz`)
- **Taciturn** — *Reason:* Duplicate entry inside word_power_quiz source file (Covered by: `word_power_quiz`)
- **Opulent** — *Reason:* Duplicate entry inside word_power_quiz source file (Covered by: `word_power_quiz`)
- **Magnanimous** — *Reason:* Duplicate entry inside word_power_quiz source file (Covered by: `word_power_quiz`)
- **Analyze** — *Reason:* Duplicate entry inside word_power_quiz source file (Covered by: `word_power_quiz`)
- **Evaluate** — *Reason:* Duplicate entry inside word_power_quiz source file (Covered by: `word_power_quiz`)

---
**Phase A Review Sign-Off:** Re-verified and approved with high-value sight words restored (`of`, `we`, `me`, `good`, `think`).
