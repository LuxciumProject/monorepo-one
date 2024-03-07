import { Mapper } from './Mapper';

// ------------------------------------------------------------------ //
// Functions Object Literal Arguments Types

export type ItemMapperArgs<T, U> = {
  mapFn: Mapper<T, U | Promise<U>>;
  currentItem: T;
  index: number;
  array: T[];
};
