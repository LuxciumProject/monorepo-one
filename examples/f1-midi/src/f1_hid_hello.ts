import HID from "node-hid";

const NAME = /kontrol f1/i;
const NI_VID = 0x17cc;

const devInfo = HID.devices().find(d =>
  (d.product && NAME.test(d.product)) || d.vendorId === NI_VID
);

if (!devInfo || !devInfo.path) {
  console.error("F1 HID interface not found. Check permissions (hidraw) and lsusb.");
  process.exit(1);
}

const dev = new HID.HID(devInfo.path);
console.log(`Opened HID: ${devInfo.product ?? "unknown"} ${devInfo.vendorId?.toString(16)}:${devInfo.productId?.toString(16)}`);

dev.on("data", (buf: Buffer) => {
  console.log("IN:", [...buf].map(b => b.toString(16).padStart(2, "0")).join(" "));
});
dev.on("error", (e: any) => {
  console.error("HID error:", e);
  process.exit(1);
});

// Output report 0x80 with 80-byte payload controls LEDs.
const REPORT_ID = 0x80;
const payload = Buffer.alloc(80, 0x00);

function setPadRGB(pad1to16: number, r: number, g: number, b: number) {
  const idx = pad1to16 - 1;
  if (idx < 0 || idx > 15) return;
  const base = 24 + idx * 3; // bytes 25..72 are pads 1..16 [R,G,B]
  payload[base + 0] = r & 0x7f;
  payload[base + 1] = g & 0x7f;
  payload[base + 2] = b & 0x7f;
}

function flush() {
  dev.write([REPORT_ID, ...payload]);
}

// Hello-world: Pad 1 green for 1s, then off
setPadRGB(1, 0, 127, 0);
flush();

setTimeout(() => {
  payload.fill(0);
  flush();
  console.log("HID LED hello done. Interact with the device to see raw input above.");
}, 1000);

process.on("SIGINT", () => {
  try { dev.close(); } catch {}
  process.exit(0);
});
