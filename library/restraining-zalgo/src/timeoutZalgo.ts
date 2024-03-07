/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

import { TimerOptions } from 'timers';
import { promisify } from 'util';
import { isA_Promise } from './tools';

export function timeoutZalgo<T = void>(
  value?: T | Promise<T> | undefined,
  delay?: number | undefined,
  options?: TimerOptions | undefined
): Promise<T> {
  if (isA_Promise(value)) {
    return promisify(setTimeout)(delay, value, options) as any as Promise<T>;
  }
  return promisify(setTimeout)(delay, value, options);
}
