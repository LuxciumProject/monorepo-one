import { FULFILLED, REJECTED } from '../../../constants';
import { settledLengts } from '../settledLengts';

// void (async function MAIN() {
//   console.log(`at: MAIN from ${__filename}`);
//   await converToIsometricSettledResult_TEST_();
//   await getFulfilledResults_TEST_();
//   await getRejectedResults_TEST_();
//   await isometricSettledResult_TEST_();
//   await listFulfilledResults_TEST_();
//   await settledLengts_TEST_();
//   return void 0;
// })();

/** @internal */
/* istanbul ignore next */
export async function settledLengts_TEST_(counter: { a: number }) {
  console.log(`at: TEST from ${__filename}`);
  console.log(
    settledLengts([
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
    settledLengts([
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
    settledLengts([
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
