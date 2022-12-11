import { isPromiseLike } from './isPromiseLike';

/** @internal */
export function isPromise<U>(element: U | Promise<U>): element is Promise<U> {
  if (isPromiseLike<U>(element) && element instanceof Promise<U>) return true;
  return false;
}
