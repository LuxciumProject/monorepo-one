import { SettledIso } from '../../types';

/** @public */

export function isSettledIso<T>(contender: any): contender is SettledIso<T> {
  return isSettledRight<T>(contender) || isSettledLeft(contender);
}
