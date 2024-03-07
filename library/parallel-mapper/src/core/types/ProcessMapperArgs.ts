import { Mapper } from './Mapper';
import { WT_D } from './WT_D';

export type ProcessMapperArgs<T, U> = {
  filename: string;
  workerThreads: WT_D<T>;
  list: T[];
  mapFn: Mapper<T, U>;
  limit?: number | undefined;
};
