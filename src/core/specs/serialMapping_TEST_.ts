import { serialMapping } from '../serialMapping';

/* istanbul ignore next */

export async function serialMapping_TEST_(counter: { a: number }) {
  console.log(`at: serialMapping_TEST_ from ${__filename}`);
  console.log(await serialMapping([{ item: 10 }]));
  counter.a++;
  return counter;
}
