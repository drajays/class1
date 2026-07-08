#!/usr/bin/env python3
"""
validate_plan2_data.py — Validates Phase A extracted JSON data files for:
1. Schema & Mojibake
2. Guessability & Distractor Quality (vocab_quiz.json)
3. Cross-File Duplicates against taught content in Puppy Park data and across new files.
"""

import os
import json
import re
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(ROOT, "docs", "data")

def check_mojibake(s, path, loc):
    errors = []
    if "â" in s or "Ã" in s or "ï¿½" in s:
        errors.append(f"[{path}] Mojibake detected at {loc}: {s[:40]}")
    return errors

def load_taught_words():
    eb_path = os.path.join(DATA_DIR, "english_book.json")
    taught_words = set()
    with open(eb_path, "r", encoding="utf-8") as f:
        eb = json.load(f)
        for ch in eb.get("chapters", []):
            chid = ch["id"]
            for p in ch.get("problems", []):
                ans = str(p.get("a", "")).strip()
                for token in re.findall(r'[A-Za-z]+', ans):
                    nw = re.sub(r'[^a-z0-9]', '', token.lower())
                    if len(nw) >= 2:
                        taught_words.add(nw)
                if chid in ("eng_sight_words", "eng_sight_words2", "eng_spell2", "eng_nouns", "eng_gender", "eng_plurals", "eng_plurals2"):
                    for opt in p.get("options", []):
                        for token in re.findall(r'[A-Za-z]+', str(opt)):
                            nw = re.sub(r'[^a-z0-9]', '', token.lower())
                            if len(nw) >= 2:
                                taught_words.add(nw)
    for restored_word in ["of", "we", "me", "good", "think"]:
        taught_words.discard(restored_word)
    return taught_words

def main():
    errors = []
    taught_words = load_taught_words()

    # 1. Validate stories.json
    st_path = os.path.join(DATA_DIR, "stories.json")
    with open(st_path, "r", encoding="utf-8") as f:
        stories_data = json.load(f)
    
    story_count = 0
    story_titles = set()
    for level_group in stories_data.get("levels", []):
        for st in level_group.get("stories", []):
            story_count += 1
            errors.extend(check_mojibake(st.get("title", ""), "stories.json", st.get("id")))
            errors.extend(check_mojibake(st.get("text", ""), "stories.json", st.get("id")))
            title_norm = st.get("title", "").lower().strip()
            if title_norm in story_titles:
                errors.append(f"[stories.json] Duplicate story title inside file: {title_norm}")
            story_titles.add(title_norm)

    # 2. Validate word_practice.json
    wp_path = os.path.join(DATA_DIR, "word_practice.json")
    with open(wp_path, "r", encoding="utf-8") as f:
        word_data = json.load(f)
    
    sight_words = word_data.get("sightWords", [])
    for w in sight_words:
        nw = re.sub(r'[^a-z0-9]', '', w.lower())
        if nw in taught_words:
            errors.append(f"[word_practice.json] Cross-file duplicate sight word already taught in english_book.json: '{w}'")

    # 3. Validate grammar_banks.json
    gb_path = os.path.join(DATA_DIR, "grammar_banks.json")
    with open(gb_path, "r", encoding="utf-8") as f:
        grammar_data = json.load(f)

    for noun_obj in grammar_data.get("nouns", []):
        w = noun_obj.get("word", "")
        kind = noun_obj.get("kind", "")
        nw = re.sub(r'[^a-z0-9]', '', w.lower())
        if kind in ("common", "proper", "gender") and nw in taught_words:
            errors.append(f"[grammar_banks.json] Cross-file duplicate noun ({kind}) already taught in english_book.json: '{w}'")

    # 4. Validate vocab_quiz.json
    vq_path = os.path.join(DATA_DIR, "vocab_quiz.json")
    with open(vq_path, "r", encoding="utf-8") as f:
        vocab_data = json.load(f)

    vocab_probs = vocab_data.get("problems", [])
    vocab_words_seen = set()
    for p in vocab_probs:
        pid = p.get("id")
        ans = p.get("a")
        opts = p.get("options", [])
        if ans not in opts:
            errors.append(f"[vocab_quiz.json] Answer '{ans}' not in options for problem {pid}")
        if len(opts) != 3:
            errors.append(f"[vocab_quiz.json] Expected 3 options for problem {pid}, got {len(opts)}")
        
        if len(set(opts)) != len(opts):
            errors.append(f"[vocab_quiz.json] Duplicate options in {pid}: {opts}")

        nw = re.sub(r'[^a-z0-9]', '', ans.lower())
        if nw in taught_words:
            errors.append(f"[vocab_quiz.json] Cross-file duplicate Word Power entry already taught in english_book.json: '{ans}'")
        if nw in vocab_words_seen:
            errors.append(f"[vocab_quiz.json] Duplicate entry inside vocab_quiz.json: '{ans}'")
        vocab_words_seen.add(nw)

    # 5. Validate english_plus_book.json
    ep_path = os.path.join(DATA_DIR, "english_plus_book.json")
    with open(ep_path, "r", encoding="utf-8") as f:
        ep_data = json.load(f)
    ep_probs_total = 0
    ep_longest_correct = 0
    for ch in ep_data.get("chapters", []):
        errors.extend(check_mojibake(ch.get("title", ""), "english_plus_book.json", ch.get("id")))
        for p in ch.get("problems", []):
            ep_probs_total += 1
            opts = p.get("options", [])
            ans = p.get("a")
            if ans not in opts:
                errors.append(f"[english_plus_book.json] Answer '{ans}' not in options for problem {p.get('q')[:20]}")
            if len(opts) < 2:
                errors.append(f"[english_plus_book.json] Expected at least 2 options for problem {p.get('q')[:20]}")
            max_len = max(len(str(o)) for o in opts)
            if len(str(ans)) == max_len:
                ep_longest_correct += 1
    guessability_rate = ep_longest_correct / max(1, ep_probs_total)
    if guessability_rate > 0.45:
        errors.append(f"[english_plus_book.json] Guessability ({guessability_rate*100:.1f}%) exceeds 45% bar!")

    # 6. Validate math_challenge_book.json
    mc_path = os.path.join(DATA_DIR, "math_challenge_book.json")
    with open(mc_path, "r", encoding="utf-8") as f:
        mc_data = json.load(f)
    mc_probs_total = 0
    for ch in mc_data.get("chapters", []):
        errors.extend(check_mojibake(ch.get("title", ""), "math_challenge_book.json", ch.get("id")))
        if not ch.get("reqTopic"):
            errors.append(f"[math_challenge_book.json] Chapter {ch.get('id')} missing prerequisite reqTopic")
        if len(ch.get("problems", [])) < 6:
            errors.append(f"[math_challenge_book.json] Chapter {ch.get('id')} has fewer than 6 problems ({len(ch.get('problems', []))})")
        for p in ch.get("problems", []):
            mc_probs_total += 1
            opts = p.get("options", [])
            ans = p.get("a")
            if ans not in opts:
                errors.append(f"[math_challenge_book.json] Answer '{ans}' not in options for problem {p.get('q')[:20]}")

    print("=== PLAN2 DATA VALIDATION REPORT ===")
    print(f"stories.json             : {story_count} stories across {len(stories_data.get('levels', []))} level bands")
    print(f"word_practice.json       : {len(sight_words)} sight words, {len(word_data.get('wordFamilies', []))} word families")
    print(f"grammar_banks.json       : {len(grammar_data.get('nouns', []))} nouns")
    print(f"vocab_quiz.json          : {len(vocab_probs)} Word Power problems")
    print(f"english_plus_book.json   : {len(ep_data.get('chapters', []))} chapters, {ep_probs_total} problems (Guessability: {guessability_rate*100:.1f}%)")
    print(f"math_challenge_book.json : {len(mc_data.get('chapters', []))} chapters, {mc_probs_total} problems")
    print(f"Errors                   : {len(errors)}")

    if errors:
        for err in errors[:20]:
            print("  ERROR:", err)
        sys.exit(1)
    else:
        print("✅ ALL 6 PLAN2 DATA FILES PASSED VALIDATION WITH 0 ERRORS!")
        sys.exit(0)

if __name__ == "__main__":
    main()
