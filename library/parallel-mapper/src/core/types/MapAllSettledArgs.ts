import { Mapper } from './Mapper';

export type MapAllSettledArgs<T, U> = {
  list: T[];
  mapFn: Mapper<T, U | Promise<U>>;
  limit?: number;
};
