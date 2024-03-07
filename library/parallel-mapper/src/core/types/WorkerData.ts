import { WorkerOptions } from './WorkerOptions';

export interface WorkerData<V> extends WorkerOptions {
  value: V;
  index: number;
  array: readonly V[];
}
