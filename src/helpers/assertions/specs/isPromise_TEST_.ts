import { isPromise } from '../isPromise';

/** @internal */
/* istanbul ignore next */
export async function isPromise_TEST_(counter: { a: number }) {
  console.log(`at: TEST from ${__filename}`);
  console.log(isPromise((async () => 'promise')()));
  console.log(isPromise((() => 'promise')()));
  return counter.a++;
}
