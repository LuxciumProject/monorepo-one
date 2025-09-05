import easymidi from "easymidi";

const NAME = /kontrol f1/i;
const inputs = easymidi.getInputs();
const outputs = easymidi.getOutputs();
const inName = inputs.find(n => NAME.test(n));
const outName = outputs.find(n => NAME.test(n));

if (!inName || !outName) {
  console.error("F1 MIDI ports not found.");
  console.error("Inputs:", inputs);
  console.error("Outputs:", outputs);
  process.exit(1);
}

const input = new easymidi.Input(inName);
const output = new easymidi.Output(outName);

console.log(`Using MIDI in="${inName}" out="${outName}"`);
console.log("Press pads or move controls. Ctrl+C to quit.");

// Channel mapping (0-based for easymidi -> ch1)
const CH1 = 0;

// Many templates map pads to notes 0..15 on channel 1.
const PAD_NOTES = Array.from({ length: 16 }, (_, i) => i);
const toggle = new Map<number, boolean>();

function padOn(note: number, vel = 127, ch = CH1) {
  output.send("noteon", { note, velocity: vel, channel: ch });
}
function padOff(note: number, ch = CH1) {
  output.send("noteon", { note, velocity: 0, channel: ch });
}

// Log everything we might receive
input.on("noteon", m => {
  console.log(`noteon  ch${m.channel + 1} note=${m.note} vel=${m.velocity}`);

  // Momentary feedback for pads
  if (m.channel === CH1 && PAD_NOTES.includes(m.note) && m.velocity > 0) {
    if (m.note === 0) {
      // Dual-color toggle demo on Pad 1
      const next = !toggle.get(0);
      toggle.set(0, next);
      next ? padOn(0, 127) : padOff(0);
      console.log(`→ pad1 toggle ${next ? "ON" : "OFF"}`);
    } else {
      padOn(m.note, 127);
    }
  }
});

input.on("noteoff", m => {
  console.log(`noteoff ch${m.channel + 1} note=${m.note} vel=${m.velocity}`);
  if (m.channel === CH1 && PAD_NOTES.includes(m.note) && m.note !== 0) {
    padOff(m.note);
  }
});

input.on("cc", m => {
  console.log(`cc      ch${m.channel + 1} cc=${m.controller} val=${m.value}`);
});

input.on("program", m => {
  console.log(`program ch${m.channel + 1} num=${m.number}`);
});

// ---- HSB demo (requires HSB LED mode in Controller Editor) ----
// Hue on ch1, Saturation on ch2, Brightness on ch3 for the same note.
function hsb(note: number, hue: number, sat = 127, bri = 127) {
  output.send("noteon", { note, velocity: hue & 127, channel: 0 }); // Hue
  output.send("noteon", { note, velocity: sat & 127, channel: 1 }); // Sat
  output.send("noteon", { note, velocity: bri & 127, channel: 2 }); // Bri
}

async function runHSB() {
  console.log("HSB demo in 2s on Pad 2 (note 1). Ensure HSB is configured.");
  await new Promise(r => setTimeout(r, 2000));
  const note = 1;
  const hues = [0, 42, 85]; // red, green, blue-ish
  for (const h of hues) {
    hsb(note, h, 127, 127);
    console.log(`→ HSB hue=${h}`);
    await new Promise(r => setTimeout(r, 900));
  }
  console.log("HSB demo done.");
}
runHSB().catch(console.error);

process.on("SIGINT", () => {
  console.log("Closing MIDI...");
  try { input.close(); } catch {}
  try { output.close(); } catch {}
  process.exit(0);
});
