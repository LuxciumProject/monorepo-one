import { Mapper } from './Mapper';

export type MapperArgs<T, U> = {
  list: T[];
  mapFn: Mapper<T, U>;
  limit?: number | undefined;
};
