#!/bin/bash
# Mummy's Voice generation status — run anytime:  ./voice_status.sh
cd "$(dirname "$0")" || exit 1
echo "🎙️  MUMMY'S VOICE STATUS — $(date '+%H:%M:%S')"
echo "──────────────────────────────────────────"
CLIPS=$(ls docs/assets/voice/*.mp3 2>/dev/null | wc -l | tr -d ' ')
MAN=$(python3 -c "import json;print(len(json.load(open('docs/data/voice_manifest.json'))))" 2>/dev/null)
SIZE=$(du -sh docs/assets/voice 2>/dev/null | cut -f1)
echo "Clips on disk : $CLIPS  ($SIZE)"
echo "In manifest   : $MAN (live on the site after last push)"
echo
if pgrep -f "generate_mummy_voice.py" > /dev/null; then
  echo "⏳ A batch is RUNNING:"
  for LOG in /tmp/voice_full.log /tmp/voice_hindi.log /tmp/voice_batch3.log; do
    [ -f "$LOG" ] && P=$(grep -oE '\[[0-9]+/[0-9]+\]' "$LOG" | tail -1) && [ -n "$P" ] && echo "   $(basename $LOG): $P"
  done
else
  echo "✅ No batch running (all queued batches finished — check git log for auto-pushes)"
fi
echo
echo "Recent auto-pushes:"
git log --oneline -5 | grep -i "voice\|clip" || git log --oneline -3
echo
echo "Live commands:  tail -f /tmp/voice_hindi.log      (watch Hindi batch)"
echo "                tail -f /tmp/voice_batch3.log     (watch stories batch)"
