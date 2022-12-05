import { FULFILLED, REJECTED } from '../../constants';
import { Settled } from '../../types';
import { getFulfilledResults } from './getFulfilledResults';

/** @beta */
export function listFulfilledResults<T>(
  collection: Array<Settled<T> | PromiseSettledResult<T>>
) {
  return getFulfilledResults(collection).flatMap(item => item.value);
}

/** @internal */
export async function listFulfilledResults_TEST_() {
  console.log(`at: TEST from ${__filename}`);
  console.log(
    listFulfilledResults([
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
    listFulfilledResults([
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
    listFulfilledResults([
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
  return void 0;
}
// listFulfilledResults_TEST_();
