// main.ts
import { XmapBox } from './XmapBox';

// Simple xmap example
const numberBox: XmapBox<number> = XmapBox.of(5);
const numberResult: XmapBox<number> = numberBox.xmap(x => x * 2);
console.log(numberResult.boxedValue); // Output: 10

// Nested xmap example
const nestedBox: XmapBox<XmapBox<XmapBox<number>>> = XmapBox.of(
  XmapBox.of(XmapBox.of(3))
);
const nestedResult = nestedBox.xmap(x => XmapBox.of(XmapBox.of(x + 1)));
console.log(nestedResult.boxedValue.boxedValue.boxedValue); // Output: 4

// Unboxing example
const unboxedValue: number = nestedResult.unbox();
console.log(unboxedValue); // Output: 4

// Type checking example
console.log(XmapBox.isXmapBox(numberBox)); // Output: true
console.log(XmapBox.isXmapBox(5)); // Output: false
