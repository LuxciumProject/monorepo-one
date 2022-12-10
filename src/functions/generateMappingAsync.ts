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
export async function* generateMappingAsync<R, T>(
  collection: Iterable<Base<T>>,
  transform: TransformFn<T, R> = async value => value as any as R,
  lookup: LookupFn<T, R> = v => void v,
  validate: ValidateFn<T, R> = async v => void v,
  errLookup: ErrLookupFn = v => void v
): AsyncGenerator<Settled<R>, void, unknown> {
  let index = 0;
  for await (const item of collection) {
    yield fn_a1f9a({
      item,
      index: index++,
      array: [...collection],
      transform,
      validate,
      errLookup,
      lookup,
    });
  }
}
