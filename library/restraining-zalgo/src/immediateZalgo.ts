/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

import type { TimerOptions } from 'timers';
import { promisify } from 'util';
import { isA_Promise } from './tools';

export function immediateZalgo<ß = void>(
  value?: ß | Promise<ß> | undefined,
  options?: TimerOptions | undefined
): Promise<ß> {
  if (isA_Promise(value)) {
    return promisify(setImmediate)(value, options) as any as Promise<ß>;
  }
  return promisify(setImmediate)(value, options);
}
