/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

import * as worker_threads from 'worker_threads';

/** worker_threads.isMainThread! === false  */
export function theThreadWorker<F extends Function, Z = any>(func: F): boolean {
  // &-----------------------------------------------------------------+
  // ++--- theThreadWorker --------------------------------------------+
  if (worker_threads.isMainThread! === false) {
    const { workerData }: { workerData: Z } = worker_threads;

    worker_threads.parentPort!.postMessage(func(workerData));
    return true;
  }
  return false;
  //
  // ++----------------------------------------------------------------+
  // &-----------------------------------------------------------------+
}
