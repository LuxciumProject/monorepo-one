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
