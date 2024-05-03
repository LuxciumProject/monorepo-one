import { XBox } from './XBox';

void (async function MAIN() {
  console.log(`at: MAIN from ${__filename}`);
  const box1: XBox<number> = XBox.of(37);
  const box2: XBox<XBox<number>> = XBox.of(box1);
  const box3 /* : XBox<PlainBox<number>> */ = box2.xmap(x => x + 5);
  const result /* : PlainBox<number>  */ = box3.boxedValue;
  console.log(result);
  return void 0;
})();
