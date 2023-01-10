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
 * @beta
 */

export function parallelMapping<T, R>(
  collection: Collection<T>,
  transformFn: TransformFn<T, R> | null = async value => value as any as R,
  lookupFn: LookupFn<T, R> | null = v => void v,
  validateFn: ValidateFn<T, R> | null = async v => void v,
  errLookupFn: ErrLookupFn | null = v => void v
): Promise<Settled<R>>[] {
  return [...collection].map((item, index, array) =>
    fn_a1f9a({
      item,
      index,
      array,
      transform:
        transformFn == null ? async value => value as any as R : transformFn,
      lookup: lookupFn == null ? v => void v : lookupFn,
      validate: validateFn == null ? async v => void v : validateFn,
      errLookup: errLookupFn == null ? v => void v : errLookupFn,
    })
  );
}

export function settleArray<T, R>(
  collection: Collection<T>
): Promise<Settled<R>>[] {
  return [...collection].map((item, index, array) =>
    fn_a1f9a({
      item,
      index,
      array,
      transform: async value => value as any as R,
      lookup: v => void v,
      validate: async v => void v,
      errLookup: v => void v,
    })
  );
}

// TASK LIST: [TODO] (Review Documentation) --------------------------
