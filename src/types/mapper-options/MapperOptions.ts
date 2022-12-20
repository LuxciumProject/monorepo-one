import { Base } from '../';
import type { ErrLookupFn } from './ErrLookupFn';
import type { LookupFn } from './LookupFn';
import type { TransformFn } from './TransformFn';
import type { ValidateFn } from './ValidateFn';

// export interface MapperOptions_v1<T, U = unknown> {
//   item: T | PromiseResult<T>;
//   index: number;
//   array: (T | PromiseSettledResult<T>)[];
//   transform?: TransformFn<T, U>;
//   lookup?: LookupFn<T, U>;
//   validate?: ValidateFn<T, U>;
//   errLookup?: ErrLookupFn;
// }

export interface MapperOptions<T, U = unknown> {
  item: Base<T> | PromiseLike<Base<T>>;
  index: number;
  array: (Base<T> | PromiseLike<Base<T>>)[];
  transform?: TransformFn<T, U>;
  lookup?: LookupFn<T, U>;
  validate?: ValidateFn<T, U>;
  errLookup?: ErrLookupFn;
}
