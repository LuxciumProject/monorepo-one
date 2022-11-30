/** @internal */
export function isPromiseLike<T>(element: any): element is PromiseLike<T> {
  if (element != null && typeof element === 'object' && 'then' in element)
    return true;
  return false;
}
