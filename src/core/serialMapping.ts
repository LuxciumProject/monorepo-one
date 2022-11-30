import {
  ErrLookupFn,
  LookupFn,
  Settled,
  SettledLeft,
  SettledRight,
  TransformFn,
  ValidateFn,
} from '../types';
import { fn_a1f9a } from './fn_a1f9a';

/** @public */
export async function serialMapping<T, R>(
  collection: Iterable<T | Settled<T>>,
  transform: TransformFn<T, R>,
  lookup: LookupFn<R> = v => void v,
  validate: ValidateFn<R> = async v => void v,
  errLookup: ErrLookupFn = v => void v
) {
  let index = 0;
  const results: (SettledLeft | SettledRight<R>)[] = [];
  for (const item of collection) {
    results.push(
      await fn_a1f9a({
        item,
        index: index++,
        transform,
        lookup,
        validate,
        errLookup,
      })
    );
  }
  return results;
}

type WrappedResult<U> = <W>(wraper: W) => Settled<U>;
export type MappingFn = <T, R>(
  collection: Iterable<T | Settled<T>>,
  transform: TransformFn<T, R>,
  lookup: LookupFn<R>,
  validate: ValidateFn<R>,
  errLookup: ErrLookupFn
) => WrappedResult<Settled<R>>;
