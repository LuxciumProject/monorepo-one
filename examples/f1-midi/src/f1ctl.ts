/**
 * @fileoverview F1 controller CLI: MIDI proofs + catalog + HID scaffold
 * @description Production-ready MIDI controller for Native Instruments F1 using EasyMIDI
 * @version 1.0.0
 * @since 2025-01-04
 */

import easymidi from 'easymidi';
import HID from 'node-hid';

/**
 * @description Available commands for the F1 controller CLI
 */
type F1Command =
  | 'ports'
  | 'listen'
  | 'light'
  | 'toggle'
  | 'sweep'
  | 'hsb'
  | 'blink'
  | 'chase'
  | 'echo'
  | 'hid:list'
  | 'hid:write';

/**
 * @description MIDI device interface for F1 controller
 */
interface F1Device {
  readonly idx: number;
  readonly name: string;
}

/**
 * @description MIDI output device for F1 controller
 */
interface F1OutputDevice extends F1Device {
  readonly out: easymidi.Output;
}

/**
 * @description MIDI input device for F1 controller
 */
interface F1InputDevice extends F1Device {
  readonly inp: easymidi.Input;
}

/**
 * @description HID device information
 */
interface HIDDeviceInfo {
  readonly vendorId: number;
  readonly productId: number;
  readonly path: string;
  readonly product?: string;
  readonly manufacturer?: string;
}

/**
 * @description Sleep utility for async delays
 * @param ms - Milliseconds to sleep
 * @returns Promise that resolves after the specified time
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * @description Convert hex string to byte array
 * @param hexString - Hex string with optional separators (-, space, comma)
 * @returns Array of bytes
 */
function hexToBytes(hexString: string): number[] {
  return hexString
    .split(/[-\s,]/)
    .filter(Boolean)
    .map((x) => parseInt(x, 16) & 0xFF);
}

/**
 * @description Get list of available MIDI output ports
 * @returns Array of output port names
 */
function listOutPorts(): string[] {
  return easymidi.getOutputs();
}

/**
 * @description Get list of available MIDI input ports
 * @returns Array of input port names
 */
function listInPorts(): string[] {
  return easymidi.getInputs();
}

/**
 * @description Find port index by regex pattern
 * @param names - Array of port names
 * @param pattern - Regex pattern to match
 * @returns Index of matching port or -1 if not found
 */
function findIndexByPattern(names: string[], pattern: RegExp): number {
  return names.findIndex((name) => pattern.test(name));
}

/**
 * @description Open F1 MIDI output device
 * @returns F1 output device interface
 * @throws Error if F1 output device not found
 */
function openF1Output(): F1OutputDevice {
  const names = listOutPorts();
  const idx = findIndexByPattern(names, /F1|Kontrol\s*F1|Traktor/i);

  if (idx < 0) {
    throw new Error('F1 MIDI output not found. Run "ports" to list available devices.');
  }

  const out = new easymidi.Output(names[idx]);
  return { out, idx, name: names[idx] };
}

/**
 * @description Open F1 MIDI input device
 * @returns F1 input device interface
 * @throws Error if F1 input device not found
 */
function openF1Input(): F1InputDevice {
  const names = listInPorts();
  const idx = findIndexByPattern(names, /F1|Kontrol\s*F1|Traktor/i);

  if (idx < 0) {
    throw new Error('F1 MIDI input not found. Run "ports" to list available devices.');
  }

  const inp = new easymidi.Input(names[idx]);
  return { inp, idx, name: names[idx] };
}

/**
 * @description Send MIDI Note On message
 * @param output - EasyMIDI output device
 * @param channel - MIDI channel (1-16)
 * @param note - MIDI note number (0-127)
 * @param velocity - Note velocity (0-127)
 */
function sendNoteOn(output: easymidi.Output, channel: number, note: number, velocity: number): void {
  output.send('noteon', {
    note: note & 0x7F,
    velocity: velocity & 0x7F,
    channel: (channel - 1) & 0x0F
  });
}

/**
 * @description Send MIDI Note Off message
 * @param output - EasyMIDI output device
 * @param channel - MIDI channel (1-16)
 * @param note - MIDI note number (0-127)
 */
function sendNoteOff(output: easymidi.Output, channel: number, note: number): void {
  output.send('noteoff', {
    note: note & 0x7F,
    velocity: 0,
    channel: (channel - 1) & 0x0F
  });
}

/**
 * @description Display all available MIDI ports
 */
async function commandPorts(): Promise<void> {
  console.log('MIDI Output Ports:');
  listOutPorts().forEach((name, index) => {
    console.log(`  [${index}] ${name}`);
  });

  console.log('\nMIDI Input Ports:');
  listInPorts().forEach((name, index) => {
    console.log(`  [${index}] ${name}`);
  });
}

/**
 * @description MIDI Note message interface
 */
interface MidiNoteMessage {
  note: number;
  velocity: number;
  channel: number;
}

/**
 * @description Listen for MIDI messages from F1 controller
 */
async function commandListen(): Promise<void> {
  const { inp, idx, name } = openF1Input();

  console.log(`Listening on input[${idx}] ${name} — press pads to discover notes...`);
  console.log('Press Ctrl+C to quit.\n');

  inp.on('message', (message: MidiNoteMessage) => {
    console.log(`MIDI message: ${JSON.stringify(message)}`);
  });

  // Keep process alive
  process.on('SIGINT', () => {
    console.log('\nClosing MIDI input...');
    inp.close();
    process.exit(0);
  });
}
    process.exit(0);
  });
}

/**
 * @description Light up a pad with specified parameters
 * @param note - MIDI note number
 * @param velocity - Note velocity (brightness)
 * @param channel - MIDI channel
 */
async function commandLight(note: number, velocity = 127, channel = 1): Promise<void> {
  const { out } = openF1Output();

  try {
    sendNoteOn(out, channel, note, velocity);
    await sleep(1000);
    sendNoteOff(out, channel, note);
  } finally {
    out.close();
  }
}

/**
 * @description Toggle a pad light for specified duration
 * @param note - MIDI note number
 * @param channel - MIDI channel
 * @param durationMs - Duration to keep light on
 */
async function commandToggle(note: number, channel = 1, durationMs = 400): Promise<void> {
  const { out } = openF1Output();

  try {
    sendNoteOn(out, channel, note, 127);
    await sleep(durationMs);
    sendNoteOff(out, channel, note);
  } finally {
    out.close();
  }
}

/**
 * @description Sweep pad brightness over time
 * @param note - MIDI note number
 * @param channel - MIDI channel
 */
async function commandSweep(note: number, channel = 1): Promise<void> {
  const { out } = openF1Output();

  try {
    let velocity = 0;
    const endTime = Date.now() + 4000;

    while (Date.now() < endTime) {
      velocity = (velocity + 8) & 0x7F;
      sendNoteOn(out, channel, note, velocity);
      await sleep(60);
    }

    sendNoteOff(out, channel, note);
  } finally {
    out.close();
  }
}

/**
 * @description Set HSB color using three MIDI channels
 * @param note - MIDI note number
 * @param hueChannel - MIDI channel for hue component
 * @param saturationChannel - MIDI channel for saturation component
 * @param brightnessChannel - MIDI channel for brightness component
 * @param hue - Hue value (0-127)
 * @param saturation - Saturation value (0-127)
 * @param brightness - Brightness value (0-127)
 */
async function commandHSB(
  note: number,
  hueChannel = 1,
  saturationChannel = 2,
  brightnessChannel = 3,
  hue = 64,
  saturation = 127,
  brightness = 127
): Promise<void> {
  const { out } = openF1Output();

  try {
    sendNoteOn(out, hueChannel, note, hue);
    sendNoteOn(out, saturationChannel, note, saturation);
    sendNoteOn(out, brightnessChannel, note, brightness);
    await sleep(800);
  } finally {
    out.close();
  }
}

/**
 * @description Blink a pad for specified duration
 * @param note - MIDI note number
 * @param channel - MIDI channel
 * @param intervalMs - Blink interval in milliseconds
 * @param durationMs - Total duration in milliseconds
 */
async function commandBlink(note: number, channel = 1, intervalMs = 150, durationMs = 2000): Promise<void> {
  const { out } = openF1Output();

  try {
    const endTime = Date.now() + durationMs;
    let isOn = false;

    while (Date.now() < endTime) {
      if (isOn) {
        sendNoteOff(out, channel, note);
      } else {
        sendNoteOn(out, channel, note, 127);
      }
      isOn = !isOn;
      await sleep(intervalMs);
    }

    sendNoteOff(out, channel, note);
  } finally {
    out.close();
  }
}

/**
 * @description Create chase effect across multiple pads
 * @param startNote - Starting MIDI note number
 * @param channel - MIDI channel
 * @param count - Number of pads in sequence
 * @param stepMs - Time per step in milliseconds
 * @param durationMs - Total duration in milliseconds
 */
async function commandChase(
  startNote: number,
  channel = 1,
  count = 16,
  stepMs = 80,
  durationMs = 2500
): Promise<void> {
  const { out } = openF1Output();

  try {
    const endTime = Date.now() + durationMs;
    let step = 0;

    while (Date.now() < endTime) {
      const previousNote = startNote + ((step + count - 1) % count);
      const currentNote = startNote + (step % count);

      sendNoteOff(out, channel, previousNote);
      sendNoteOn(out, channel, currentNote, 127);

      step++;
      await sleep(stepMs);
    }

    // Turn off all pads
    for (let i = 0; i < count; i++) {
      sendNoteOff(out, channel, startNote + i);
    }
  } finally {
    out.close();
  }
}

/**
 * @description Echo input messages to output
 * @param inputChannel - Input MIDI channel
  inp.on('noteon', (message: easymidi.Note) => {
    if (message.channel === inputChannel - 1) {
      sendNoteOn(out, outputChannel, message.note, 127);
    }
  });

  inp.on('noteoff', (message: easymidi.Note) => {
    if (message.channel === inputChannel - 1) {
      sendNoteOff(out, outputChannel, message.note);
    }
  });

  inp.on('noteoff', (message: MidiNoteMessage) => {
    if (message.channel === inputChannel - 1) {
      sendNoteOff(out, outputChannel, message.note);
    }
  });
      sendNoteOff(out, outputChannel, message.note);
    }
  });

  process.on('SIGINT', () => {
    console.log('\nClosing MIDI devices...');
    inp.close();
    out.close();
    process.exit(0);
  });
}

/**
 * @description List all HID devices
 */
function commandHidList(): void {
  const devices = HID.devices();

  console.log('Available HID Devices:\n');
  devices.forEach((device) => {
    const deviceInfo: HIDDeviceInfo = {
      vendorId: device.vendorId || 0,
      productId: device.productId || 0,
      path: device.path || '',
      product: device.product,
      manufacturer: device.manufacturer
    };
    console.log(JSON.stringify(deviceInfo, null, 2));
  });
}

/**
 * @description Write raw data to HID device
 * @param args - Command arguments: [VID, PID, hex...] or [PATH, hex...]
 */
async function commandHidWrite(args: string[]): Promise<void> {
  if (args.length < 2) {
    throw new Error('hid:write expects: VID PID HEX... or PATH HEX...');
  }

  let device: HID.HID;
  let hexArgs: string[];

  // Check if first two args are hex numbers (VID/PID)
  if (/^[0-9a-fA-F]{1,4}$/.test(args[0]) && /^[0-9a-fA-F]{1,4}$/.test(args[1])) {
    const vendorId = parseInt(args[0], 16);
    const productId = parseInt(args[1], 16);
    device = new HID.HID(vendorId, productId);
    hexArgs = args.slice(2);
  } else {
    // First arg is device path
    const devicePath = args[0];
    device = new HID.HID(devicePath);
    hexArgs = args.slice(1);
  }

  try {
    const bytes = hexToBytes(hexArgs.join(' '));
    const bytesWritten = device.write(bytes);
    console.log(`Successfully wrote ${bytesWritten} bytes to HID device.`);
  } finally {
    device.close();
  }
}

/**
 * @description Display usage information
 */
function displayUsage(): void {
  console.log(`F1 Controller CLI - MIDI and HID Interface

Usage:
  npx ts-node src/f1ctl.ts <command> [options]

MIDI Commands:
  ports                                    - List available MIDI ports
  listen                                   - Listen for MIDI messages
  light <note> [velocity] [channel]        - Light up a pad
  toggle <note> [channel] [duration]       - Toggle pad for duration
  sweep <note> [channel]                   - Sweep brightness over time
  hsb <note> [hueCh] [satCh] [briCh] [h] [s] [b] - Set HSB color
  blink <note> [channel] [interval] [duration] - Blink pad
  chase <startNote> [channel] [count] [step] [duration] - Chase effect
  echo [inputCh] [outputCh]               - Echo input to output

HID Commands:
  hid:list                                 - List HID devices
  hid:write <VID> <PID> <hex...>          - Write to HID by VID/PID
  hid:write <path> <hex...>               - Write to HID by path

Examples:
  npx ts-node src/f1ctl.ts ports
  npx ts-node src/f1ctl.ts light 60 127 1
  npx ts-node src/f1ctl.ts hsb 60 1 2 3 64 127 127
`);
}

/**
 * @description Main CLI entry point
 */
async function main(): Promise<void> {
  const [command, ...args] = process.argv.slice(2);

  if (!command) {
    displayUsage();
    return;
  }

  try {
    const cmd = command as F1Command;

    switch (cmd) {
      case 'ports':
        await commandPorts();
        break;

      case 'listen':
        await commandListen();
        break;

      case 'light':
        await commandLight(
          Number(args[0] ?? 60),
          Number(args[1] ?? 127),
          Number(args[2] ?? 1)
        );
        break;

      case 'toggle':
        await commandToggle(
          Number(args[0] ?? 60),
          Number(args[1] ?? 1),
          Number(args[2] ?? 400)
        );
        break;

      case 'sweep':
        await commandSweep(
          Number(args[0] ?? 60),
          Number(args[1] ?? 1)
        );
        break;

      case 'hsb':
        await commandHSB(
          Number(args[0] ?? 60),
          Number(args[1] ?? 1),
          Number(args[2] ?? 2),
          Number(args[3] ?? 3),
          Number(args[4] ?? 64),
          Number(args[5] ?? 127),
          Number(args[6] ?? 127)
        );
        break;

      case 'blink':
        await commandBlink(
          Number(args[0] ?? 60),
          Number(args[1] ?? 1),
          Number(args[2] ?? 150),
          Number(args[3] ?? 2000)
        );
        break;

      case 'chase':
        await commandChase(
          Number(args[0] ?? 60),
          Number(args[1] ?? 1),
          Number(args[2] ?? 16),
          Number(args[3] ?? 80),
          Number(args[4] ?? 2500)
        );
        break;

      case 'echo':
        await commandEcho(
          Number(args[0] ?? 1),
          Number(args[1] ?? 1)
        );
        break;

      case 'hid:list':
        commandHidList();
        break;

      case 'hid:write':
        await commandHidWrite(args);
        break;

      default:
        console.error(`Unknown command: ${command}`);
        displayUsage();
        process.exit(1);
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error:', errorMessage);
    process.exit(1);
  }
}

// Execute main function if this file is run directly
if (require.main === module) {
  void main();
}
