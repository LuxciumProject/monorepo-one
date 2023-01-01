import { isPromiseLike } from '../helpers/assertions';
import {
  Base,
  DeferredCollection,
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

export async function serialMapping<T, R>(
  collection: DeferredCollection<T>,
  transformFn: null | TransformFn<T, R> = async value => value as any as R,
  lookupFn: null | LookupFn<T, R> = v => void v,
  validateFn: null | ValidateFn<T, R> = async v => void v,
  errLookupFn: null | ErrLookupFn = v => void v
): Promise<Settled<R>[]> {
  let array: (Base<T> | PromiseLike<Base<T>>)[];

  if (isPromiseLike(collection)) {
    array = [...(await collection)];
  } else {
    array = [...collection];
  }
  // const array = [...collection_];
  let index = 0;
  const results: Settled<R>[] = [];
  for (const item of array) {
    results.push(
      await fn_a1f9a({
        item,
        index: index++,
        array,
        transform:
          transformFn == null ? async value => value as any as R : transformFn,
        lookup: lookupFn == null ? v => void v : lookupFn,
        validate: validateFn == null ? async v => void v : validateFn,
        errLookup: errLookupFn == null ? v => void v : errLookupFn,
      })
    );
  }
  return results;
}

// TASK LIST: [TODO] (Review Documentation) --------------------------
