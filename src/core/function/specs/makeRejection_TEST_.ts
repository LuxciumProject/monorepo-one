import { makeRejection } from '../../../functions/core/makeRejection';

/* istanbul ignore next */

export function makeRejection_TEST_(counter: { a: number }) {
  console.log(`at: makeRejection_TEST_ from ${__filename}`);
  console.log(
    makeRejection({
      reason: 'any',
      index: 0,
      transformStep: 0,
      currentRejection: true,
    })
  );
  counter.a++;
  return counter;
}
