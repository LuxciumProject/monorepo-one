import {
  Base,
  ErrLookupFn,
  LookupFn,
  Settled,
  TransformFn,
  ValidateFn,
} from '../types';
import { fn_a1f9a } from './core';

/** @public */
export async function serialMapping<T, R>(
  collection: Iterable<Base<T>>,
  transform: TransformFn<T, R> = async value => value as any as R,
  lookup: LookupFn<T, R> = v => void v,
  validate: ValidateFn<T, R> = async v => void v,
  errLookup: ErrLookupFn = v => void v
) {
  let index = 0;
  const results: Settled<R>[] = [];
  for (const item of collection) {
    results.push(
      await fn_a1f9a({
        item,
        index: index++,
        array: [...collection],
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
export type MappingFn_ = <T, R>(
  collection: Iterable<Base<T>>,
  transform: TransformFn<T, R>,
  lookup: LookupFn<T, R>,
  validate: ValidateFn<T, R>,
  errLookup: ErrLookupFn
) => WrappedResult<Settled<R>>;
