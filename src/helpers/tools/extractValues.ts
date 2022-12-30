import { NULL_SYMBOL } from '../../constants';
import { Settled, SettledLeft, SettledRight } from '../../types';
import { SettledValues } from '../../types/MainTypes';
import { isSettledRight } from '../assertions';
import { isSettledLeft } from '../assertions/isSettled';

/**
 * Function `filterRight` takes an array of `Settled<R>` and returns an array of `SettledRight<R>` values.
 * @param settledArray - an array of `Settled<R>`
 * @returns an array of `SettledRight<R>` values
 * @public
 */
export function filterRight<R>(settledArray: Settled<R>[]): SettledRight<R>[] {
  return settledArray.filter<SettledRight<R>>(isSettledRight);
}

/**
 * Function `filterLeft` takes an array of `Settled<R>` and returns an array of `SettledLeft` values.
 * @param settledArray - an array of `Settled<R>`
 * @returns an array of `SettledLeft` values
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
 * @public
 */
export function extractSettledValues<R>(
  settledArray: Settled<R>[]
): SettledValues<R> {
  return settledArray.map(settled => {
    if (settled.status === 'fulfilled' && settled.value !== null) {
      return settled.value;
    } else {
      return NULL_SYMBOL;
    }
  });
}

// TASK LIST: (Review Documentation) [TODO: Types]  -------------------
