import type { PromiseResult } from '../Settled';
import type { ErrLookupFn } from './ErrLookupFn';
import type { LookupFn } from './LookupFn';
import type { TransformFn } from './TransformFn';
import type { ValidateFn } from './ValidateFn';

export interface MapperOptions<T, U = unknown> {
  item: T | PromiseResult<T>;
  index: number;
  array: (T | PromiseSettledResult<T>)[];
  transform?: TransformFn<T, U>;
  lookup?: LookupFn<T, U>;
  validate?: ValidateFn<T, U>;
  errLookup?: ErrLookupFn;
}
