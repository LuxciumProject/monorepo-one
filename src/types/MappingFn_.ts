import {
  Base,
  ErrLookupFn,
  LookupFn,
  Settled,
  TransformFn,
  ValidateFn
} from '.';
import { WrappedResult } from './WrappedResult';

export type MappingFn_ = <T, R>(
  collection: Iterable<Base<T>>,
  transform: TransformFn<T, R>,
  lookup: LookupFn<T, R>,
  validate: ValidateFn<T, R>,
  errLookup: ErrLookupFn
) => WrappedResult<Settled<R>>;
