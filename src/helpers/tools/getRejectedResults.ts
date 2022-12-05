import { FULFILLED, REJECTED } from '../../constants';
import { Settled, SettledLeft } from '../../types';
import { converToIsometricSettledResult } from './converToIsometricSettledResult';

/** @beta */

export function getRejectedResults<T>(
  collection: Array<Settled<T> | PromiseSettledResult<T>>
): SettledLeft[] {
  const result = collection.filter(
    (item): item is SettledLeft | PromiseRejectedResult =>
      item.status === REJECTED
  );
  return converToIsometricSettledResult(result);
}

/** @internal */
export async function getRejectedResults_TEST_() {
  console.log(`at: TEST from ${__filename}`);
  console.log(
    getRejectedResults([
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
    getRejectedResults([
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
    getRejectedResults([
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
// getRejectedResults_TEST_();
