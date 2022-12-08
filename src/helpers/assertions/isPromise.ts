import { isPromiseLike } from './isPromiseLike';

/** @internal */
export function isPromise<T>(element: unknown): element is Promise<T> {
  if (isPromiseLike<T>(element) && element instanceof Promise<T>) return true;
  return false;
}
