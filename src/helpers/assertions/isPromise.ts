import { isPromiseLike } from './isPromiseLike';

/**
 * Determines if an element is a Promise object.
 * @remarks
 * Function used to check if an element is a Promise\<U\> object
 * by validating that it is an object that contains a thenable
 * function and is an instance of Promise.
 * @example
 * ```typescript
 * isPromise(1) // false
 * isPromise(Promise.resolve(1)) // true
 * isPromise({ then: () => {} }) // false
 * isPromise({ then: 1 }) // false
 * ```
 *
 * @param element - element of type U or Promise\<U\> to
 * validate as a Promise
 * @returns true if element is a Promise\<U\> object
 * @category Assertion Tools
 *
 * @public
 *
 */
export function isPromise<U>(element?: U | Promise<U>): element is Promise<U> {
  try {
    if (isPromiseLike<U>(element) && element instanceof Promise<U>) {return true;}
  } catch {
    // Do nothing
    /*
      The addition of the try/catch block
      ensure that the function does not throw any exceptions
      if an unexpected error occurs.
    */
  }

  return false;
}
