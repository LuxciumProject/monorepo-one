/** @internal */
export function isPromiseLike<T>(element: any): element is PromiseLike<T> {
  if (
    element != null &&
    typeof element === 'object' &&
    'then' in element &&
    typeof element.then === 'function'
  )
    return true;
  return false;
}

/** @internal */
/* istanbul ignore next */
export async function isPromiseLike_TEST_() {
  console.log(`at: TEST from ${__filename}`);
  console.log(isPromiseLike((async () => 'promise')()));
  console.log(isPromiseLike((() => 'promise')()));
  console.log(isPromiseLike({ then() {} }));
  return void 0;
}
// isPromiseLike_TEST_();
