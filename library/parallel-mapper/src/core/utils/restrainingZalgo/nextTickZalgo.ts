/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

import { promisify } from 'util';

export async function nextTickZalgo<T = void>(): Promise<void>;
export async function nextTickZalgo<T = void>(value: T): Promise<T>;
export async function nextTickZalgo<T = void>(
  value?: T | undefined
): Promise<T | undefined> {
  await promisify(process.nextTick)();
  return value;
}
