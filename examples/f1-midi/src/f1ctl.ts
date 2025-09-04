// src/f1ctl.ts
/* F1 controller CLI: MIDI proofs + catalog + HID scaffold.
   Usage:
     npx ts-node src/f1ctl.ts ports
     npx ts-node src/f1ctl.ts listen
     npx ts-node src/f1ctl.ts light 60 [127] [1]
     npx ts-node src/f1ctl.ts toggle 60 [1] [ms=400]
     npx ts-node src/f1ctl.ts sweep 60 [1]
     npx ts-node src/f1ctl.ts hsb 60 [hueCh=1] [satCh=2] [briCh=3] [h=64 s=127 b=127]
     npx ts-node src/f1ctl.ts blink 60 [1] [ms=150] [durationMs=2000]
     npx ts-node src/f1ctl.ts chase 60 [1] [count=16] [stepMs=80] [durationMs=2500]
     npx ts-node src/f1ctl.ts echo [inCh=1] [outCh=1]    // press a pad: lights a mapped one
     # HID (advanced / NHL-specific): enumerate and write raw reports (hex)
     npx ts-node src/f1ctl.ts hid:list
     npx ts-node src/f1ctl.ts hid:write VID PID 00-01-02-...      # or
     npx ts-node src/f1ctl.ts hid:write PATH 00-01-02-...
*/

import * as midi from 'midi';
import HIDlib = require('node-hid');

// ---------- util ----------
const sleep = (ms:number)=>new Promise(r=>setTimeout(r,ms));
const hexToBytes = (s:string)=>
  s.split(/[-\s,]/).filter(Boolean).map(x=>parseInt(x,16)&0xFF);

// ---------- MIDI ports helpers ----------
function listOutPorts(): string[] {
  const out = new midi.Output();
  const names = Array.from({length: out.getPortCount()}, (_,i)=>out.getPortName(i));
  out.closePort(); return names;
}
function listInPorts(): string[] {
  const i = new midi.Input();
  const names = Array.from({length: i.getPortCount()}, (_,i2)=>i.getPortName(i2));
  i.closePort(); return names;
}
function findIndexRx(names: string[], rx: RegExp) { return names.findIndex(n=>rx.test(n)); }
function openF1Out(): {out:midi.Output, idx:number, name:string} {
  const names = listOutPorts();
  const idx = findIndexRx(names, /F1|Kontrol\s*F1|Traktor/i);
  if (idx<0) throw new Error('F1 MIDI output not found. Run "ports".');
  const out = new midi.Output(); out.openPort(idx);
  return {out, idx, name: names[idx]};
}
function openF1In(): {inp:midi.Input, idx:number, name:string} {
  const names = listInPorts();
  const idx = findIndexRx(names, /F1|Kontrol\s*F1|Traktor/i);
  if (idx<0) throw new Error('F1 MIDI input not found. Run "ports".');
  const inp = new midi.Input(); inp.openPort(idx);
  return {inp, idx, name: names[idx]};
}

// ---------- MIDI primitives (status = 0x8n/0x9n) ----------
function noteOn(out:midi.Output, ch:number, note:number, vel:number){
  out.sendMessage([(0x90+((ch-1)&0x0F))&0xFF, note&0x7F, vel&0x7F]);
}
function noteOff(out:midi.Output, ch:number, note:number){
  out.sendMessage([(0x80+((ch-1)&0x0F))&0xFF, note&0x7F, 0]);
}
// In HSB templates: hue/sat/bri are Note-On on 3 channels for same note (velocity=component 0..127).
// :contentReference[oaicite:10]{index=10}

// ---------- commands ----------
async function cmdPorts(){
  console.log('MIDI outputs:'); listOutPorts().forEach((n,i)=>console.log(`  [${i}] ${n}`));
  console.log('MIDI inputs :'); listInPorts().forEach((n,i)=>console.log(`  [${i}] ${n}`));
}

async function cmdListen(){
  const {inp, idx, name} = openF1In();
  console.log(`Listening on input[${idx}] ${name} — press pads to discover notes...`);
  inp.on('message', (dt:number, msg:number[])=>{
    console.log(`dt=${dt.toFixed(6)} msg=${JSON.stringify(msg)}`);
  });
  console.log('Ctrl+C to quit.');
}

async function cmdLight(note:number, vel=127, ch=1){
  const {out} = openF1Out();
  noteOn(out,ch,note,vel);  // Single/Dual: lights "on" color; Non-HSB may map velocity to brightness/index
  await sleep(1000);
  noteOff(out,ch,note);
  out.closePort();
  // Note On/Off semantics and examples: [144, note, vel], [128, note, 0]. :contentReference[oaicite:11]{index=11}
}

async function cmdToggle(note:number, ch=1, ms=400){
  const {out} = openF1Out();
  noteOn(out,ch,note,127);
  await sleep(ms);
  noteOff(out,ch,note);
  out.closePort();
  // Single/Dual color behavior depends on Controller Editor template. :contentReference[oaicite:12]{index=12}
}

async function cmdSweep(note:number, ch=1){
  const {out} = openF1Out();
  let v=0; const t=Date.now()+4000;
  while(Date.now()<t){ v=(v+8)&0x7F; noteOn(out,ch,note,v); await sleep(60); }
  noteOff(out,ch,note); out.closePort();
  // Velocity may affect brightness or indexed color in non-HSB templates. :contentReference[oaicite:13]{index=13}
}

async function cmdHSB(note:number, hueCh=1, satCh=2, briCh=3, h=64, s=127, b=127){
  const {out} = openF1Out();
  // HSB: send three Note-On messages (channels hue/sat/bri) for same note, velocity=component.
  noteOn(out,hueCh,note,h);
  noteOn(out,satCh,note,s);
  noteOn(out,briCh,note,b);
  await sleep(800);
  out.closePort();
  // Full HSB control via three channels as documented. :contentReference[oaicite:14]{index=14}
}

async function cmdBlink(note:number, ch=1, ms=150, duration=2000){
  const {out} = openF1Out();
  const stopAt = Date.now()+duration; let on=false;
  while(Date.now()<stopAt){ on?noteOff(out,ch,note):noteOn(out,ch,note,127); on=!on; await sleep(ms); }
  noteOff(out,ch,note); out.closePort();
}

async function cmdChase(startNote:number, ch=1, count=16, stepMs=80, duration=2500){
  const {out} = openF1Out();
  const stopAt = Date.now()+duration; let i=0;
  while(Date.now()<stopAt){
    const prev = startNote + ((i+count-1)%count);
    const cur  = startNote + (i%count);
    noteOff(out,ch,prev); noteOn(out,ch,cur,127); i++; await sleep(stepMs);
  }
  for(let k=0;k<count;k++) noteOff(out,ch,startNote+k);
  out.closePort();
}

async function cmdEcho(inCh=1, outCh=1){
  const {inp} = openF1In(); const {out} = openF1Out();
  console.log('Echo: press a pad — it will light itself (map in code if you want different notes).');
  inp.on('message', (_dt:number, msg:number[])=>{
    const [st,d1,d2] = msg; const typ = st & 0xF0; const ch = (st & 0x0F)+1;
    if(typ===0x90 && d2>0 && ch===inCh){ noteOn(out,outCh,d1,127); }
    if((typ===0x80 || (typ===0x90 && d2===0)) && ch===inCh){ noteOff(out,outCh,d1); }
  });
}

// ---------- HID scaffold (advanced) ----------
function hidList(){
  const devs = HIDlib.devices(); // Enumerate HID devices with path, vid/pid, product, etc.
  // You can filter by vendorId/productId; F1 vendor is typically 0x17cc. :contentReference[oaicite:15]{index=15}
  devs.forEach(d=>{
    console.log(JSON.stringify({vendorId:d.vendorId, productId:d.productId, path:d.path, product:d.product, manufacturer:d.manufacturer}, null, 2));
  });
}
async function hidWrite(argv:string[]){
  // Accept either: VID PID HEX.. or PATH HEX..
  if(argv.length<2) throw new Error('hid:write expects: VID PID HEX...  |  PATH HEX...');
  let device: any;
  if(/^[0-9a-fA-F]{1,4}$/.test(argv[0]) && /^[0-9a-fA-F]{1,4}$/.test(argv[1])){
    const vid = parseInt(argv[0],16), pid = parseInt(argv[1],16);
    device = new (HIDlib as any).HID(vid,pid);  // open by VID/PID
    argv = argv.slice(2);
  } else {
    const path = argv[0];
    device = new (HIDlib as any).HID(path);     // open by path
    argv = argv.slice(1);
  }
  const bytes = hexToBytes(argv.join(' '));
  // First byte is Report ID (0x00 if none), per node-hid write semantics. :contentReference[oaicite:16]{index=16}
  const written = device.write(bytes);
  console.log(`Wrote ${written} bytes to HID device.`);
  device.close();
  // NOTE: Exact NHL report formats (to set pad colors/animations) require device-specific docs;
  // this scaffold lets you send known reports once you obtain them. :contentReference[oaicite:17]{index=17}
}

// ---------- main ----------
(async ()=>{
  const [cmd, ...args] = process.argv.slice(2);
  try{
    switch(cmd){
      case 'ports': await cmdPorts(); break;
      case 'listen': await cmdListen(); break;
      case 'light': await cmdLight(Number(args[0]??60), Number(args[1]??127), Number(args[2]??1)); break;
      case 'toggle': await cmdToggle(Number(args[0]??60), Number(args[1]??1), Number(args[2]??400)); break;
      case 'sweep': await cmdSweep(Number(args[0]??60), Number(args[1]??1)); break;
      case 'hsb': await cmdHSB(Number(args[0]??60), Number(args[1]??1), Number(args[2]??2), Number(args[3]??3),
                               Number(args[4]??64), Number(args[5]??127), Number(args[6]??127)); break;
      case 'blink': await cmdBlink(Number(args[0]??60), Number(args[1]??1), Number(args[2]??150), Number(args[3]??2000)); break;
      case 'chase': await cmdChase(Number(args[0]??60), Number(args[1]??1), Number(args[2]??16), Number(args[3]??80), Number(args[4]??2500)); break;
      case 'echo': await cmdEcho(Number(args[0]??1), Number(args[1]??1)); break;
      case 'hid:list': hidList(); break;
      case 'hid:write': await hidWrite(args); break;
      default:
        console.log(`Unknown or missing command. Try:
  ports | listen | light | toggle | sweep | hsb | blink | chase | echo
  hid:list | hid:write
`);
    }
  }catch(e:any){ console.error('Error:', e.message); process.exit(1); }
})();
