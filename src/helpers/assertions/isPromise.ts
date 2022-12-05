import { isPromiseLike } from './isPromiseLike';

/** @internal */
export function isPromise<T>(element: unknown): element is Promise<T> {
  if (isPromiseLike<T>(element) && element instanceof Promise<T>) return true;
  return false;
}

/** @internal */
export async function isPromise_TEST_() {
  console.log(`at: TEST from ${__filename}`);
  console.log(isPromise((async () => 'promise')()));
  console.log(isPromise((() => 'promise')()));
  return void 0;
}
// isPromise_TEST_();
