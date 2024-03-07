/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

import { TimerOptions } from 'timers';
import { promisify } from 'util';

export function immediateZalgo<ß = void>(
  value?: ß | undefined,
  options?: TimerOptions | undefined
): Promise<ß> {
  return promisify(setImmediate)(value, options);
}
