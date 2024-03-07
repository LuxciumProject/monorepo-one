import { WorkerData } from '../types/WorkerData';
import { Worker_Threads } from '../types/Worker_Threads';
import { getAsyncWorker } from './the-main-worker';

export function makeMainWorker<T>(
  filename: string,
  worker_threads: Worker_Threads<WorkerData<T>>
): <R>(value: T, index?: number, array?: readonly T[]) => Promise<R> {
  return <R>(value: T, index?: number, array?: readonly T[]): Promise<R> =>
    // GACK: remove the any type here...
    worker_threads.isMainThread
      ? getAsyncWorker<R, any>(filename, {
        workerData: { value, index, array },
        worker_threads,
      })
      : (void null as never as Promise<R>);
}
