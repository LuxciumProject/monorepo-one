import { isPromiseLike } from './isPromiseLike';

/** @internal */
export function isPromise<T>(element: any): element is Promise<T> {
  if (isPromiseLike<T>(element) && element instanceof Promise) return true;
  return false;
}
