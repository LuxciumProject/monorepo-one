/**
 * Constant `NULL_SYMBOL` is a unique symbol that represents `null` or a union type that includes `null`.
 * @public
 */
export const NULL_SYMBOL: unique symbol = Symbol('null');

/**
 * Function `extractSettledRightValuesMaintainingPosition` takes an array of `Settled<R>` and returns an array
 * of `R` values, with a default value of `NULL_SYMBOL` in place of `null` or a union type that includes `null`.
 * @param settledArray - an array of `Settled<R>`
 * @returns an array of `R` values, with a default value of `NULL_SYMBOL` in place of `null` or a union type that includes `null`.
 * @public
 */
export function extractSettledRightValuesMaintainingPosition<R>(
  settledArray: Settled<R>[]
): (R | typeof NULL_SYMBOL)[] {
  return settledArray.map(settled => {
    if (settled.status === 'fulfilled' && settled.value !== null) {
      return settled.value;
    } else {
      return NULL_SYMBOL;
    }
  });
}

/**
 * Function `extractFulfilledValues` takes an array of `Settled<R>` and returns an array
 * of `R` values, filtering out any `null` or union types that include `null`.
 * @param settledArray - an array of `Settled<R>`
 * @returns an array of `R` values, filtering out any `null` or union types that include `null`.
 * @public
 */
export function extractFulfilledValues<R>(settledArray: Settled<R>[]): R[] {
  return settledArray
    .filter(settled => settled.status === 'fulfilled' && settled.value !== null)
    .map(settled => settled.value);
}

/**
 * Function `extractFulfilledValuesMaintainingPosition` takes an array of `Settled<R>` and returns an array
 * of `R` values, with a default value of `NULL_SYMBOL` in place of `null` or a union type that includes `null`.
 * The original position of the `Settled<R>` objects in the array is maintained.
 * @param settledArray - an array of `Settled<R>`
 * @returns an array of `R` values, with a default value of `NULL_SYMBOL` in place of `null` or a union type that includes `null`.
 * @public
 */
export function extractFulfilledValuesMaintainingPosition<R>(
  settledArray: Settled<R>[]
): (R | typeof NULL_SYMBOL)[] {
  return settledArray.map(settled => {
    if (settled.status === 'fulfilled' && settled.value !== null) {
      return settled.value;
    } else {
      return NULL_SYMBOL;
    }
  });
}

// TASK LIST: (Review Documentation) [TODO: Types]  -------------------
