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

import { workerFactory } from '.';
import { mapAllSettled } from '../map-allSettled';
import type { MapAllSettledArgs, Mapper, ProcessMapperArgs } from '../types';

export function processMapper<T, U>({
  filename,
  workerThreads,
  list,
  mapFn,
  limit = list.length,
}: ProcessMapperArgs<T, U>): [
  () => Promise<PromiseSettledResult<U>[]>,
  () => void
] {
  const [mainWorker, threadWorker] = workerFactory(
    filename,
    mapFn,
    workerThreads
  );
  const workerMapFn: Mapper<T, Promise<U>> = mainWorker;
  const mapAllSettledArgs: MapAllSettledArgs<T, U> = {
    list,
    mapFn: workerMapFn,
    limit,
  };
  return [async () => mapAllSettled<T, U>(mapAllSettledArgs), threadWorker()];
}
