import { awaitedMapping } from '../awaitedMapping';

/* istanbul ignore next */

export async function awaitedMapping_TEST_(counter: { a: number }) {
  console.log(`at: awaitedMapping_TEST_ from ${__filename}`);
  console.log(await awaitedMapping([{ item: 10 }]));
  counter.a++;
  return counter;
}
