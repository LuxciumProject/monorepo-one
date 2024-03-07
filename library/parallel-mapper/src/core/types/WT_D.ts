import { WorkerData } from './WorkerData';
import { Worker_Threads } from './Worker_Threads';

export type WT_D<T> = Worker_Threads<WorkerData<T>>;
