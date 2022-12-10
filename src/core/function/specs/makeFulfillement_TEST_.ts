import { makeFulfillement } from '../../../functions/core/makeFulfillement';

/* istanbul ignore next */
export function makeFulfillement_TEST_(counter: { a: number }) {
  console.log(`at: makeFulfillement_TEST_ from ${__filename}`);
  console.log(makeFulfillement({ value: 10, index: 0, transformStep: 0 }));
  counter.a++;
  return counter;
}
