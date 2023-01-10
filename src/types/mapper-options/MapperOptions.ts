import { Base } from '../MainTypes';
import type { ErrLookupFn, ErrLookupFnSync } from './ErrLookupFn';
import type { LookupFn, LookupFnSync } from './LookupFn';
import type { TransformFn, TransformFnSync } from './TransformFn';
import type { ValidateFn, ValidateFnSync } from './ValidateFn';

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

export interface MapperOptionsSync<T, U = unknown> {
  item: Base<T> | PromiseLike<Base<T>>;
  index: number;
  array: (Base<T> | PromiseLike<Base<T>>)[];
  transform?: TransformFnSync<T, U>;
  lookup?: LookupFnSync<T, U>;
  validate?: ValidateFnSync<T, U>;
  errLookup?: ErrLookupFnSync;
}
// TASK LIST: [TODO: Types] (Review Documentation) -------------------
