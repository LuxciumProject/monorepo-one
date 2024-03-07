/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/

import { Worker, WorkerOptions } from 'worker_threads';

export function getAsyncWorker<Q, P extends WorkerOptions>(script: string, payload: P): Promise<Q> {
  return new Promise((resolve, reject) => {
    // &---------------------------------------------------------------+
    // ++--- getAsyncWorker -------------------------------------------+
    //
    const worker = new Worker(script, payload);
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', code => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
    //
    // ++--------------------------------------------------------------+
    // &---------------------------------------------------------------+
  });
}
