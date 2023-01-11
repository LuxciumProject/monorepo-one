import { NULL_SYMBOL } from '../../constants';
import { makeFulfillement } from '../../functions/core/makeFulfillement';
import { Settled, SettledLeft, SettledRight } from '../../types';
import { isSettledRight } from '../assertions';
import { isSettledLeft } from '../assertions/isSettled';

/**
 * Function `filterRight` takes an array of `Settled<R>` and returns an array of `SettledRight<R>` values.
 * @param settledArray - an array of `Settled<R>`
 * @returns an array of `SettledRight<R>` values
 * @group Filters
 * @public
 */
export function filterRight<R>(settledArray: Settled<R>[]): SettledRight<R>[] {
  return settledArray.filter<SettledRight<R>>(isSettledRight);
}

/**
 * Function `filterLeft` takes an array of `Settled<R>` and returns an array of `SettledLeft` values.
 * @param settledArray - an array of `Settled<R>`
 * @returns an array of `SettledLeft` values
 * @group Filters
 * @public
 */
export function filterLeft<R>(settledArray: Settled<R>[]): SettledLeft[] {
  return settledArray.filter(isSettledLeft);
}

/**
 * Function `extractFulfilledValues` takes an array of `Settled<R>` and returns an array
 * of `R` values, filtering out any `null` or union types that include `null`.
 * @param settledArray - an array of `Settled<R>`
 * @returns an array of `R` values, filtering out any `null` or union types that include `null`.
 * @category Helper Tools
 * @public
 */
export function extractFulfilledValues<R>(settledArray: Settled<R>[]): R[] {
  return filterRight(settledArray).map(settled => settled.value);
}

/**
 * Function `extractSettledValues` takes an array of `Settled<R>` and returns an array
 * of `R` values, with a default value of `NULL_SYMBOL` in place of
 * `SettledLeft` elements which do not have a value to be returned.
 *
 * @param settledArray - an array of `Settled<R>`
 * @returns an array of `R` values, with a default value of
 * `NULL_SYMBOL` in place of `SettledLeft` wich lack of a value.
 * @category Helper Tools
 * @public
 */

export function extractSettledValues<R>(
  settledArray: Settled<R>[]
): (R | typeof NULL_SYMBOL)[] {
  const result = settledArray.map(settled => {
    if (settled.status === 'fulfilled' && 'value' in settled) {
      return settled.value;
    }
    return NULL_SYMBOL;
  });
  return result;
}

/**
 * Function `toFulfilment` takes an array or iterable of any values `T`
 * and returns a `SettledRight<T>[]`.
 *
 * @param list - an array or iterable of any values T
 * @returns an array of `SettledRight<T>`.
 * @category Helper Tools
 * @public
 */
export function toFulfilment<T>(list: Iterable<T>): SettledRight<T>[] {
  return [...list].map((value, index) =>
    makeFulfillement<T>({ value, index, transformStep: 0 })
  );
}

// TASK LIST: (Review Documentation) [TODO: Types]  ------------------
