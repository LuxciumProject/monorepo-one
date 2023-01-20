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
 * @group Core Functions
 * @beta
 */

export async function serialMapping<T, R>(
  collection: DeferredCollection<T>,
  transformFn: TransformFn<T, R> | null = async value => value as any as R,
  lookupFn: LookupFn<T, R> | null = v => void v,
  validateFn: ValidateFn<T, R> | null = async v => void v,
  errLookupFn: ErrLookupFn | null = v => void v
): Promise<Settled<R>[]> {
  const array: (Base<T> | PromiseLike<Base<T>>)[] = isPromiseLike(collection)
    ? [...(await collection)]
    : [...collection];
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
