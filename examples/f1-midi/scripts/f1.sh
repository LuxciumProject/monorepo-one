#!/usr/bin/env bash
set -euo pipefail

echo "=== USB (lsusb) ==="; lsusb | grep -iE 'native|instruments|traktor|kontrol|17cc' || true
echo; echo "=== ALSA raw MIDI (amidi -l) ==="; amidi -l || true
echo; echo "=== ALSA sequencer (aconnect -l) ==="; aconnect -l || true
echo; echo "=== Guessing rawmidi hw port for F1 ==="
line=$(amidi -l | awk '/F1|Kontrol|Traktor/ {print $2; exit}' || true)
if [[ -n "${line:-}" ]]; then
  hw=$(echo "$line" | sed 's/^\(hw:[^ ]*\).*/\1/')
  echo "Found: $hw"
  echo "Try raw test (Note On/Off C3=60 on ch1):"
  echo "amidi -p $hw -S '90 3C 7F'; sleep 0.5; amidi -p $hw -S '80 3C 00'"
else
  echo "No rawmidi match; use your DAW or run the TS CLI: npx ts-node src/f1ctl.ts ports"
fi
