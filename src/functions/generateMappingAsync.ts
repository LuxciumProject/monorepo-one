import { isPromiseLike } from '../helpers/assertions';
import {
  DeferredCollection,
  ErrLookupFn,
  LookupFn,
  SettledLeft,
  SettledRight,
  TransformFn,
  ValidateFn,
} from '../types';
import { fn_a1f9a } from './core';
/**
 * @group Core Functions
 * @beta
 */

export async function* generateMappingAsync<R, T>(
  collection: DeferredCollection<T>,
  transformFn: TransformFn<T, R> | null = async value => value as any as R,
  lookupFn: LookupFn<T, R> | null = v => void v,
  validateFn: ValidateFn<T, R> | null = async v => void v,
  errLookupFn: ErrLookupFn | null = v => void v
): AsyncGenerator<SettledLeft | SettledRight<R>, void, unknown> {
  const values = [
    ...(isPromiseLike(collection) ? await collection : collection),
  ];
  let index = 0;
  for await (const item of values) {
    yield fn_a1f9a({
      item,
      index: index++,
      array: [...values],
      transform:
        transformFn == null ? async value => value as any as R : transformFn,
      lookup: lookupFn == null ? v => void v : lookupFn,
      validate: validateFn == null ? async v => void v : validateFn,
      errLookup: errLookupFn == null ? v => void v : errLookupFn,
    });
  }
}

// TASK LIST: [TODO] (Review Documentation) --------------------------
