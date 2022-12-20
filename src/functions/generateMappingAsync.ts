import {
  Collection,
  ErrLookupFn,
  LookupFn,
  Settled,
  TransformFn,
  ValidateFn,
} from '../types';
import { fn_a1f9a } from './core';

/**
 * **UNSAFE**: Function type signature may still change at any moment please
 * remember this package is in the early devloppment phase and is
 * **UNSAFE** to use as its API is still evolving.
 * @alpha
 */

export async function* generateMappingAsync<R, T>(
  collection: Collection<T>,
  transformFn: null | TransformFn<T, R> = async value => value as any as R,
  lookupFn: null | LookupFn<T, R> = v => void v,
  validateFn: null | ValidateFn<T, R> = async v => void v,
  errLookupFn: null | ErrLookupFn = v => void v
): AsyncGenerator<Settled<R>, void, unknown> {
  let index = 0;
  for await (const item of collection) {
    yield fn_a1f9a({
      item,
      index: index++,
      array: [...collection],
      transform:
        transformFn == null ? async value => value as any as R : transformFn,
      lookup: lookupFn == null ? v => void v : lookupFn,
      validate: validateFn == null ? async v => void v : validateFn,
      errLookup: errLookupFn == null ? v => void v : errLookupFn,
    });
  }
}
