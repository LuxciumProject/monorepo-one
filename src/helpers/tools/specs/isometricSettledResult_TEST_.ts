import { FULFILLED, REJECTED } from '../../../constants';
import { isometricSettledResult } from '../isometricSettledResult';

/** @internal */
/* istanbul ignore next */
export async function isometricSettledResult_TEST_(counter: { a: number }) {
  console.log(`at: TEST from ${__filename}`);
  console.log(
    [
      {
        status: FULFILLED,
        value: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: null,
        transformStep: 0,
        index: 0,
      },
    ].map(isometricSettledResult)
  );
  console.log(
    [
      {
        status: REJECTED,
        reason: null,
        [FULFILLED]: null,
        [REJECTED]: null,
        currentRejection: true,
        transformStep: 0,
        index: 0,
      },
    ].map(isometricSettledResult)
  );

  console.log(
    [
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
    ].map(isometricSettledResult)
  );
  return void counter.a++;
}
