/**
 * Determines if an element is a Promise-like object.
 * @remarks
 * Function used to check if an element is a PromiseLike\<U\> object
 * by validating that it is an object that contains a thenable function.
 * @example
 * ```typescript
 * isPromiseLike(1) // false
 * isPromiseLike(Promise.resolve(1)) // true
 * isPromiseLike({ then: () => {} }) // true
 * isPromiseLike({ then: 1 }) // false
 *```
 *
 * @param element - element of type U or PromiseLike\<U\> to
 * validate as a PromiseLike
 * @returns true if element is a PromiseLike\<U\> object
 *
 * @public
 *
 */

export function isPromiseLike<U>(
  element?: U | PromiseLike<U>
): element is PromiseLike<U> {
  try {
    if (
      element != null &&
      typeof element === 'object' &&
      'then' in element &&
      typeof element.then === 'function'
    )
      return true;
  } catch (error) {
    // Do nothing
    /*
      The addition of the try/catch block
      ensure that the function does not throw any exceptions
      if an unexpected error occurs.
    */
  }
  return false;
}
