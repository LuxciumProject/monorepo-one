import { MessagePort, Worker } from 'worker_threads';

/** Partial interface for `worker_threads` module */

export interface Worker_Threads<W> {
  isMainThread: boolean;
  parentPort: MessagePort | null;
  Worker: typeof Worker;
  workerData: W;
}
