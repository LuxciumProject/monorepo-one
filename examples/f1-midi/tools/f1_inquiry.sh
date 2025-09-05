#!/usr/bin/env bash
set -euo pipefail
echo "=== USB: Native Instruments Traktor Kontrol F1 ==="
if command -v lsusb >/dev/null; then
  lsusb | grep -iE "native|kontrol|17cc" || echo "No NI device seen via lsusb."
  VIDPID=$(lsusb | grep -i "kontrol f1" | awk '{print $6}' | head -n1 || true)
  if [[ -n "${VIDPID:-}" ]]; then
    echo -e "\n--- lsusb -v -d $VIDPID (descriptor excerpt) ---"
    lsusb -v -d "$VIDPID" 2>/dev/null | sed -n '1,120p'
  fi
else
  echo "lsusb not found."
fi

echo -e "\n=== ALSA/JACK MIDI ports ==="
if command -v amidi >/dev/null; then
  amidi -l | grep -i "f1" || echo "No ALSA raw MIDI port named F1."
fi
if command -v aconnect >/dev/null; then
  aconnect -l | sed -n '1,200p'
fi

echo -e "\nHints:"
echo " - Toggle F1 MIDI mode: hold Shift + Browse."
echo " - If HID hello fails with EACCES, add a udev rule for hidraw (VID 17cc) and replug."
