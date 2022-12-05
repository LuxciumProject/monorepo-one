import { SettledResult } from '../Settled';
import { ErrLookupFn } from './ErrLookupFn';
import { LookupFn } from './LookupFn';
import { TransformFn } from './TransformFn';
import { ValidateFn } from './ValidateFn';

export interface MapperOptions<T, U = unknown> {
  item: T | SettledResult<T>;
  index: number;
  array: (T | PromiseSettledResult<T>)[];
  transform?: TransformFn<T, U>;
  lookup?: LookupFn<T, U>;
  validate?: ValidateFn<T, U>;
  errLookup?: ErrLookupFn;
}
