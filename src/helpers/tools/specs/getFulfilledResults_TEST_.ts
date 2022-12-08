import { FULFILLED, REJECTED } from '../../../constants';
import { getFulfilledResults } from '../getFulfilledResults';

/** @internal */
/* istanbul ignore next */
export async function getFulfilledResults_TEST_(counter: { a: number }) {
  console.log(`at: TEST from ${__filename}`);
  console.log(
    getFulfilledResults([
      {
        status: FULFILLED,
        value: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: null,
        transformStep: 0,
        index: 0,
      },
    ])
  );
  console.log(
    getFulfilledResults([
      {
        status: REJECTED,
        reason: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: true,
        transformStep: 0,
        index: 0,
      },
    ])
  );

  console.log(
    getFulfilledResults([
      {
        status: REJECTED,
        reason: null,
      },
      {
        status: FULFILLED,
        value: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: null,
        transformStep: 0,
        index: 0,
      },
      {
        status: FULFILLED,
        value: null,
      },
      {
        status: REJECTED,
        reason: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: true,
        transformStep: 0,
        index: 0,
      },
    ])
  );
  return void counter.a++;
}
