/** @internal */
export function isPromiseLike<U>(
  element: U | PromiseLike<U>
): element is PromiseLike<U> {
  if (
    element != null &&
    typeof element === 'object' &&
    'then' in element &&
    typeof element.then === 'function'
  )
    return true;
  return false;
}
