/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

import { Mapper } from '../types/Mapper';
import { WT_D } from '../types/WT_D';
import { makeMainWorker } from './makeMainWorker';
import { makeThreadWorker } from './makeThreadWorker';

export function workerFactory<T, R>(
  filename: string,
  threadWorkerFn: Mapper<T, R>,
  worker_threads: WT_D<T>
): [Mapper<T, Promise<R>>, () => () => void] {
  const mainWorker = makeMainWorker<T>(filename, worker_threads);
  const threadWorker = () =>
    makeThreadWorker<T, R>({ threadWorkerFn, worker_threads });

  let intermediateItems: [Mapper<T, Promise<R>>, () => () => void];

  intermediateItems = [mainWorker, threadWorker];
  return intermediateItems;
}
