import { Mapper } from './Mapper';

export type ParallelProcessMapperFactory = <T, R>(
  mappingFn: Mapper<T, R>,
  inDebugMode?: { [K: string]: number }
) => (
  list: T[],
  limit?: number | undefined
) => (
  filename: string
) => [() => Promise<PromiseSettledResult<R>[]>, () => void];
