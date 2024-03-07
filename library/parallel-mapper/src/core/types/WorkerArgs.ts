import { Mapper } from './Mapper';

export type WorkerArgs<T, U> = {
  gen: Generator<[T, number, T[]]>;
  mapFn: Mapper<T, U | Promise<U>>;
  result: PromiseSettledResult<U>[];
};
