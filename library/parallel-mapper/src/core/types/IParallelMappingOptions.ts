import { Mapper } from './Mapper';
import { WT_D } from './WT_D';

export interface IParallelMappingOptions<T, U> {
  filename: string;
  workerThreads: WT_D<T>;
  list: T[];
  mappingFn: Mapper<T, U>;
  limit?: number;
}
