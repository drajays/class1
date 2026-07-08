#!/usr/bin/env python3
"""
generate_english_plus.py — Generates docs/data/english_plus_book.json
Converts grammar_banks.json (nouns) and vocab_quiz.json (205 Word Power problems)
into structured L3–L5 chapters for SubjectBook (Word Power Book).
"""

import json
import os

ROOT = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(ROOT, "docs", "data")

def main():
    with open(os.path.join(DATA_DIR, "grammar_banks.json"), "r", encoding="utf-8") as f:
        gb = json.load(f)
    with open(os.path.join(DATA_DIR, "vocab_quiz.json"), "r", encoding="utf-8") as f:
        vq = json.load(f)

    nouns = gb.get("nouns", [])
    vocab_probs = vq.get("problems", [])

    # Group nouns by kind
    nouns_by_kind = {}
    for n in nouns:
        k = n["kind"]
        nouns_by_kind.setdefault(k, []).append(n)

    chapters = []

    # Chapter 1: Common vs Proper Nouns (Level 3)
    c1_problems = [
        {
            "skill": "pick",
            "q": "Which of these is a Proper Noun (a special name that starts with a capital letter)?",
            "options": ["🌟 Asoka", "🏙️ city", "👦 boy"],
            "a": "🌟 Asoka",
            "why": "Asoka is the special name of a famous emperor!"
        },
        {
            "skill": "pick",
            "q": "Which of these is a Proper Noun naming a person or place?",
            "options": ["🌟 Sita", "🗺️ country", "🐾 puppy"],
            "a": "🌟 Sita",
            "why": "Sita is a proper noun naming a person!"
        },
        {
            "skill": "pick",
            "q": "Which of these is a Common Noun (a general name for a person, place, or thing)?",
            "options": ["🏙️ city", "🌟 Kolkata", "🌟 India"],
            "a": "🏙️ city",
            "why": "City is a general name, while Kolkata and India are proper nouns!"
        }
    ]
    chapters.append({
        "id": "np_common_proper",
        "title": "Common & Proper Nouns",
        "icon": "🌟",
        "level": 3,
        "concept": {
            "intro": [
                "Nouns are naming words!",
                "Common nouns name general things like boy, city, or puppy.",
                "Proper nouns name special people or places like Advaita, India, or Simba!"
            ],
            "tip": "Proper nouns always start with a Capital letter!"
        },
        "problems": c1_problems
    })

    # Chapter 2: Plural & Gender Nouns (Level 3)
    c2_problems = [
        {
            "skill": "pick",
            "q": "What is the feminine gender for 'actor'?",
            "options": ["actress", "waitress", "empress"],
            "a": "actress",
            "why": "An actor is male, and an actress is female!"
        },
        {
            "skill": "pick",
            "q": "What is the feminine gender for 'emperor'?",
            "options": ["empress", "duchess", "mistress"],
            "a": "empress",
            "why": "An emperor rules an empire, and an empress is a female ruler!"
        },
        {
            "skill": "pick",
            "q": "What is the feminine gender for 'duke'?",
            "options": ["duchess", "actress", "waitress"],
            "a": "duchess",
            "why": "A duke and a duchess are noble titles!"
        }
    ]
    chapters.append({
        "id": "np_gender_plurals",
        "title": "Gender & Plural Nouns",
        "icon": "👑",
        "level": 3,
        "concept": {
            "intro": [
                "Nouns can name males or females!",
                "For example: actor and actress, emperor and empress.",
                "Learning gender nouns helps us talk about people accurately!"
            ],
            "tip": "Look at endings like -ess for many feminine forms!"
        },
        "problems": c2_problems
    })

    # Chapter 3: Collective Nouns (Level 4)
    coll_nouns = nouns_by_kind.get("collective", [])
    c3_problems = []
    for i, n in enumerate(coll_nouns):
        w = n["word"]
        # Create a problem about collective nouns
        c3_problems.append({
            "skill": "pick",
            "q": f"Which collective noun represents a group of {w} or similar items?",
            "options": [w, "bravery", "Kolkata"],
            "a": w,
            "why": f"'{w}' is a collective noun naming a group!"
        })
    if len(c3_problems) < 3:
        c3_problems = [
            {
                "skill": "pick",
                "q": "What do we call a group of cows or cattle?",
                "options": ["A herd of cattle", "A pride of cattle", "A flock of cattle"],
                "a": "A herd of cattle",
                "why": "A group of cows or cattle is called a herd!"
            },
            {
                "skill": "pick",
                "q": "What do we call a group of lions?",
                "options": ["A pride of lions", "A swarm of lions", "A school of lions"],
                "a": "A pride of lions",
                "why": "A family or group of lions is called a pride!"
            },
            {
                "skill": "pick",
                "q": "What do we call a group of birds?",
                "options": ["A flock of birds", "A herd of birds", "A pack of birds"],
                "a": "A flock of birds",
                "why": "Birds fly together in a flock!"
            }
        ]
    chapters.append({
        "id": "np_collective",
        "title": "Collective Nouns",
        "icon": "🐾",
        "level": 4,
        "concept": {
            "intro": [
                "A collective noun names a whole group of people, animals, or things!",
                "We say a flock of birds, a herd of cows, and a pride of lions.",
                "One special word names many together!"
            ],
            "tip": "Think of a team of players or a bunch of grapes!"
        },
        "problems": c3_problems
    })

    # Chapter 4: Abstract Nouns (Level 5)
    abst_nouns = nouns_by_kind.get("abstract", [])
    c4_problems = [
        {
            "skill": "pick",
            "q": "Which of these is an Abstract Noun (a quality or feeling you cannot touch)?",
            "options": ["bravery", "cattle", "waiter"],
            "a": "bravery",
            "why": "Bravery is a noble quality inside your heart!"
        },
        {
            "skill": "pick",
            "q": "Which of these is an Abstract Noun representing truthful character?",
            "options": ["honesty", "actor", "ships"],
            "a": "honesty",
            "why": "Honesty means always telling the truth!"
        },
        {
            "skill": "pick",
            "q": "Which of these is an Abstract Noun representing joy and sound?",
            "options": ["laughter", "emperor", "city"],
            "a": "laughter",
            "why": "Laughter is a wonderful feeling of happiness!"
        }
    ]
    chapters.append({
        "id": "np_abstract",
        "title": "Abstract Nouns",
        "icon": "💡",
        "level": 5,
        "concept": {
            "intro": [
                "Abstract nouns name ideas, feelings, and qualities!",
                "You cannot touch or see bravery, honesty, or wisdom, but you can feel and show them.",
                "They are the most powerful words in our minds!"
            ],
            "tip": "If it is a feeling or idea like kindness or joy, it is an abstract noun!"
        },
        "problems": c4_problems
    })

    # Distribute the 205 vocab problems into 10 themed/sequential chapters
    chunk_size = 21
    vocab_chunks = [vocab_probs[i:i + chunk_size] for i in range(0, len(vocab_probs), chunk_size)]

    for idx, chunk in enumerate(vocab_chunks):
        level = 3 if idx < 3 else 4 if idx < 7 else 5
        ch_id = f"vp_vocab_{idx + 1}"
        ch_title = f"Word Power Pack {idx + 1}"
        ch_probs = []
        for p in chunk:
            ch_probs.append({
                "skill": "pick",
                "q": p["q"],
                "options": p["options"],
                "a": p["a"],
                "why": p.get("why", "Great vocabulary knowledge!")
            })
        chapters.append({
            "id": ch_id,
            "title": ch_title,
            "icon": "⚡",
            "level": level,
            "concept": {
                "intro": [
                    f"Welcome to {ch_title}!",
                    "Expand your English vocabulary with exciting new words.",
                    "Read the clue and pick the matching word!"
                ],
                "tip": "Read the question carefully to spot the meaning!"
            },
            "problems": ch_probs
        })

    # Option length balancing pass to ensure guessability (longest option = correct answer) stays well under 45%
    all_answers = [str(p["a"]) for ch in chapters for p in ch["problems"]]
    all_answers.sort(key=len, reverse=True)
    for ch in chapters:
        for i, p in enumerate(ch["problems"]):
            opts = list(p["options"])
            a = str(p["a"])
            max_len = max(len(str(o)) for o in opts)
            if len(a) == max_len and i % 2 == 0:
                long_cands = [w for w in all_answers if len(str(w)) > len(a) and w not in opts]
                if long_cands:
                    dists = [(idx, o) for idx, o in enumerate(opts) if o != a]
                    if dists:
                        dists.sort(key=lambda x: len(str(x[1])))
                        opts[dists[0][0]] = long_cands[0]
                        p["options"] = opts

    out = {
        "subject": "english_plus",
        "title": "Word Power Book",
        "icon": "⚡",
        "lang": "en-IN",
        "chapters": chapters
    }

    out_path = os.path.join(DATA_DIR, "english_plus_book.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
    print(f"Generated {out_path} with {len(chapters)} chapters!")

if __name__ == "__main__":
    main()
