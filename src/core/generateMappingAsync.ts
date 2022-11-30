import {
  ErrLookupFn,
  LookupFn,
  Settled,
  TransformFn,
  ValidateFn
} from '../types';
import { fn_a1f9a } from './fn_a1f9a';

/** @public */
export async function* generateMappingAsync<R, T>(
  collection: Iterable<T | Settled<T>>,
  transform: TransformFn<T, R>,
  lookup: LookupFn<T, R> = v => void v,
  validate: ValidateFn<T, R> = async v => void v,
  errLookup: ErrLookupFn = v => void v
): AsyncGenerator<PromiseSettledResult<R>, void, unknown> {
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
