import { Settled, SettledLeft, SettledRight } from '../../types';
import { isometricSettledResult } from './isometricSettledResult';

export function converToIsometricSettledResult_(
  collection: Array<SettledLeft | PromiseRejectedResult>
): SettledLeft[];
export function converToIsometricSettledResult_<T>(
  collection: Array<SettledRight<T> | PromiseSettledResult<T>>
): SettledRight<T>[];
export function converToIsometricSettledResult_<T>(
  collection: Array<Settled<T> | PromiseSettledResult<T>>
): (SettledRight<T> | SettledLeft)[];
export function converToIsometricSettledResult_<T>(
  collection: Array<Settled<T> | PromiseSettledResult<T>>
): (SettledRight<T> | SettledLeft)[] {
  return collection.map(isometricSettledResult);
}

// converToIsometricSettledResult_TEST_();

/** @beta */
export const converToIsometricSettledResult = converToIsometricSettledResult_;

// TASK LIST: [TODO] (Review Documentation) --------------------------
