# @examples/f1-midi

Bidirectional tests for **Native Instruments Traktor Kontrol F1** on Linux using TypeScript.

## What you get

- `src/f1_midi_catalog.ts` — MIDI-only catalogue: logs input, lights pads, demos Single, Dual, HSB.
- `src/f1_hid_hello.ts` — Raw HID hello: logs HID input, sets pad RGB via report `0x80`.
- `tools/f1_inquiry.sh` — Probe USB + ALSA/JACK MIDI.

## Prereqs

- Node 20+ (Node 22 LTS recommended).
- Linux udev access for `hidraw` (for HID demo).
- F1 in **MIDI mode** for the MIDI demo (hold `Shift + Browse` to toggle).

## Install (standalone)

```bash
pnpm i || npm i
```

## Run

```bash
# MIDI: prove pads/CCs + LEDs (Single/Dual/HSB)
pnpm dev:midi

# HID: hello-world LED and input logging
pnpm dev:hid

# USB + MIDI discovery
bash tools/f1_inquiry.sh
```

## Rush usage in your monorepo

From your project folder `/projects/monorepo-one/examples/f1-midi`:

```bash
rush add -p easymidi@latest -p node-hid@latest -m
```

Rush `add` operates on **current working directory** and then runs `rush update`. See docs.

## HID udev rule (Linux)

`/etc/udev/rules.d/85-kontrol-f1.rules`:

```
KERNEL=="hidraw*", ATTRS{idVendor}=="17cc", MODE="0660", TAG+="uaccess"
```

Reload: `sudo udevadm control --reload && sudo udevadm trigger`, then replug.

## Notes

- `easymidi` wraps node-rtmidi for simple evented MIDI.
- `node-hid` provides cross‑platform USB HID access.
- For HSB mode, configure pads in NI Controller Editor to HSB.
