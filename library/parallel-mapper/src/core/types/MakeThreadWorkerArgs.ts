import { Mapper } from './Mapper';
import { WorkerData } from './WorkerData';
import { Worker_Threads } from './Worker_Threads';

export type MakeThreadWorkerArgs<T, R> = {
  threadWorkerFn: Mapper<T, R>;
  worker_threads: Worker_Threads<WorkerData<T>>;
};
