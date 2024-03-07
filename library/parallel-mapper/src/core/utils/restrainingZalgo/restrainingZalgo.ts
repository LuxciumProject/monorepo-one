/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

import { immediateZalgo } from './immediateZalgo';
import { nextTickZalgo } from './nextTickZalgo';
import { timeoutZalgo } from './timeoutZalgo';

/**
 * @see https://blog.izs.me/2013/08/designing-apis-for-asynchrony
 */
export const restrainingZalgo = {
  immediate: async () => immediateZalgo(void 15),
  timeout: async () => timeoutZalgo(0, void 15),
  nextTick: async () => nextTickZalgo(),
};
