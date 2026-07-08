#!/usr/bin/env python3
"""Generate 'Mummy's Voice' clips (Phase 12b) with the local Qwen3-TTS clone.

Corpus: chapter concept intros + tips from all 6 books, plus core UI/praise
lines. English batch is generated fully; Hindi/Devanagari strings produce only
3 SAMPLES (user must approve quality by ear before the full Hindi batch —
rerun with --hindi-full after approval).

Output: docs/assets/voice/<sha1[:8]>.mp3 + docs/data/voice_manifest.json
Re-runnable: existing hashes are skipped.
"""
import hashlib, json, re, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).parent
VOICE_DIR = ROOT / 'docs/assets/voice'
MANIFEST = ROOT / 'docs/data/voice_manifest.json'
REF = '/Users/dr.ajayshukla/voice_clone/gargi1_converted_ref.wav'
PY = '/Users/dr.ajayshukla/voice_clone/qwen_env/bin/python'

BOOKS = ['math_book', 'english_book', 'evs_book', 'sanskrit_book',
         'computer_book', 'hindi_lessons']

UI_LINES = [
    "Hello Advaita! Let's learn something new!",
    "Great job! You did it!",
    "Almost! Let me show you.",
    "Now tap the correct answer!",
    "Practice superstar! The puppies are full — feed them with something new!",
    "Wow, you're a superstar! Ready for a bigger challenge?",
    "Let's warm up with a puppy favourite! You can do it!",
    "Ready for today's adventure? Let's go!",
    "Even the greatest champions don't fight alone. Call upon the Royal Mentors, Mom and Dad. Asking for help when you are stuck is the secret spell for the hardest levels!",
    "Hooray! You rescued the princess! She grants you a Royal Blessing!",
    "Welcome back Advaita! Pick something to play and earn coins!",
    "Lesson complete! Wonderful work!",
    "You finished the whole chapter! The puppies are so proud of you!",
]

def is_devanagari(t):
    return bool(re.search(r'[ऀ-ॿ]', t))

def h8(t):
    return hashlib.sha1(t.encode()).hexdigest()[:8]

def collect():
    corpus = []  # (hash, text, lang)
    for b in BOOKS:
        d = json.loads((ROOT / f'docs/data/{b}.json').read_text())
        for c in d.get('chapters', []):
            concept = c.get('concept', {})
            if isinstance(concept, str):
                intro, tip = concept, ''
            else:
                intro = concept.get('intro', [])
                if isinstance(intro, list):
                    intro = ' '.join(intro)
                tip = concept.get('tip', '')
            for t in (intro, tip):
                t = (t or '').strip()
                if len(t) > 3:
                    corpus.append((h8(t), t, 'hi' if is_devanagari(t) else 'en'))
    for t in UI_LINES:
        corpus.append((h8(t), t, 'en'))
    seen, out = set(), []
    for item in corpus:
        if item[0] not in seen:
            seen.add(item[0]); out.append(item)
    return out

def main():
    hindi_full = '--hindi-full' in sys.argv
    VOICE_DIR.mkdir(parents=True, exist_ok=True)
    manifest = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {}
    corpus = collect()
    en = [c for c in corpus if c[2] == 'en']
    hi = [c for c in corpus if c[2] == 'hi']
    if '--ui-only' in sys.argv:
        en = [c for c in en if c[1] in UI_LINES]
    todo = en + ([] if '--ui-only' in sys.argv else (hi if hindi_full else hi[:3]))
    todo = [c for c in todo if c[0] not in manifest or not (VOICE_DIR / f'{c[0]}.mp3').exists()]
    print(f'corpus en={len(en)} hi={len(hi)} | to synthesize now: {len(todo)}', flush=True)
    if not todo:
        print('nothing to do'); return

    # Worker runs inside qwen_env; we feed it jobs via a temp JSON.
    jobs = ROOT / '.voice_jobs.json'
    jobs.write_text(json.dumps([{'h': h, 't': t, 'lang': l} for h, t, l in todo], ensure_ascii=False))
    worker = f'''
import json, subprocess, sys, torch, soundfile as sf
from pathlib import Path
from qwen_tts import Qwen3TTSModel
jobs = json.loads(Path("{jobs}").read_text())
print("loading model...", flush=True)
model = Qwen3TTSModel.from_pretrained("Qwen/Qwen3-TTS-12Hz-0.6B-Base", device_map="mps", dtype=torch.float32)
out_dir = Path("{VOICE_DIR}")
ok = []
for i, j in enumerate(jobs):
    lang = "English"
    try:
        wavs, sr = model.generate_voice_clone(text=j["t"], language=lang, ref_audio="{REF}", x_vector_only_mode=True)
        wav_path = out_dir / (j["h"] + ".wav")
        sf.write(str(wav_path), wavs[0], sr)
        mp3_path = out_dir / (j["h"] + ".mp3")
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(wav_path), "-ac", "1", "-b:a", "56k", str(mp3_path)], check=True)
        wav_path.unlink()
        ok.append(j["h"])
        print(f"[{{i+1}}/{{len(jobs)}}] {{j['h']}} ok", flush=True)
    except Exception as e:
        print(f"[{{i+1}}/{{len(jobs)}}] {{j['h']}} FAIL {{e}}", flush=True)
Path("{ROOT / '.voice_done.json'}").write_text(json.dumps(ok))
'''
    r = subprocess.run([PY, '-c', worker])
    done = json.loads((ROOT / '.voice_done.json').read_text()) if (ROOT / '.voice_done.json').exists() else []
    texts = {h: t for h, t, _ in corpus}
    for h in done:
        manifest[h] = f'assets/voice/{h}.mp3'
    MANIFEST.write_text(json.dumps(manifest, indent=1))
    total_kb = sum(f.stat().st_size for f in VOICE_DIR.glob('*.mp3')) // 1024
    print(f'manifest: {len(manifest)} clips, {total_kb} KB total', flush=True)

if __name__ == '__main__':
    main()
