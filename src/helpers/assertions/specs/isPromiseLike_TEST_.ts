import { isPromiseLike } from '../isPromiseLike';

/** @internal */
/* istanbul ignore next */
export async function isPromiseLike_TEST_(counter: { a: number }) {
  console.log(`at: TEST from ${__filename}`);
  console.log(isPromiseLike((async () => 'promise')()));
  console.log(isPromiseLike((() => 'promise')()));
  console.log(isPromiseLike({ then() {} }));
  return counter.a++;
}
