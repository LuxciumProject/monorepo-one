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

import { mapAllSettled } from './map-allSettled';
import type { MapAllSettledArgs, MapperArgs } from './types';

// ~#------- IO_Mapper ------------------------------------------------#-~
export async function IO_Mapper<T, R>({
  list,
  mapFn,
  limit,
}: MapperArgs<T, R>): Promise<PromiseSettledResult<R>[]> {
  // ++----- IO_Mapper ------------------------------------------------+
  //
  const mapAllSettledArgs: MapAllSettledArgs<T, R> = {
    list,
    mapFn,
    limit: limit ? limit : list.length,
  };
  return mapAllSettled(mapAllSettledArgs);
  //
  // ++----------------------------------------------------------------+
}
// ~#------------------------------------------------------------------#-~
