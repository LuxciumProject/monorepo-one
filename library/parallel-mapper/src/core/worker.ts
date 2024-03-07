/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/
/*  Based on work from @userpixel (https://github.com/userpixel)      */
/*  Copyright (c) 2020-2021 Alex Ewerlöf                              */
/*--------------------------------------------------------------------*/

import { itemMapper } from './item-mapper';
import { ItemMapperArgs } from './types/ItemMapperArgs';
import { WorkerArgs } from './types/WorkerArgs';

export async function worker<T, U>({ gen, mapFn, result }: WorkerArgs<T, U>) {
  // ++----- worker ---------------------------------------------------+
  //
  for (let [currentItem, index, array] of gen) {
    const itemMapperArgs: ItemMapperArgs<T, U> = {
      mapFn,
      currentItem,
      index,
      array,
    };
    // if (inDebugMode) console.log('worker:', inDebugMode.W++);
    // SIDE EFFECTS:
    result[index] = await itemMapper(itemMapperArgs);
  }
  //
  // ++----------------------------------------------------------------+
}
