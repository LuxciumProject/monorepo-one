import { FULFILLED, REJECTED } from '../../constants';

/** @public */
export function isPromiseSettledResult<T>(
  contender: any
): contender is PromiseSettledResult<T> {
  return (
    isPromiseFulfilledResult<T>(contender) || isPromiseRejectedResult(contender)
  );
}

/** @public */
export function isPromiseFulfilledResult<T>(
  contender: any
): contender is PromiseFulfilledResult<T> {
  return contender?.status === FULFILLED && 'value' in contender;
}

/** @public */
export function isPromiseRejectedResult(
  contender: any
): contender is PromiseRejectedResult {
  return contender?.status === REJECTED && 'reason' in contender;
}

/** @internal */
export async function isPromiseSettledResult_TEST_() {
  console.log(`at: TEST from ${__filename}`);
  console.log(isPromiseFulfilledResult({ status: FULFILLED, value: null }));
  console.log(isPromiseRejectedResult({ status: REJECTED, reason: null }));

  console.log(isPromiseSettledResult({ status: FULFILLED, value: null }));
  console.log(isPromiseSettledResult({ status: REJECTED, reason: null }));
  return void 0;
}
// isPromiseSettledResult_TEST_();
