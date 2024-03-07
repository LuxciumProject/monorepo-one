import { WorkerData } from '../types/WorkerData';
import { Worker_Threads } from '../types/Worker_Threads';
import { getAsyncWorker } from './the-main-worker';

export function makeMainWorker2<T>(filename: string, worker_threads: Worker_Threads<WorkerData<T>>) {
  return <R>(workerData: WorkerData<T>): Promise<R> =>
    worker_threads.isMainThread
      ? getAsyncWorker<R, any>(filename, {
        workerData,
        worker_threads,
      })
      : (void null as never as Promise<R>);
}
