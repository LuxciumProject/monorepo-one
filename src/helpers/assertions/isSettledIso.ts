import { SettledIso } from '../../types';
import { isSettledLeft, isSettledRight } from './isSettled';

/** @internal */

export function isSettledIso<T>(contender: any): contender is SettledIso<T> {
  return isSettledRight<T>(contender) || isSettledLeft(contender);
}
