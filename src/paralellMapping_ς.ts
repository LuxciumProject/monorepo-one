import { FULFILLED, REJECTED } from './constants';
import { Mapper, OnlySideEffect } from './types';

export function paralellMapping_ς<R, T>(
  collection: Iterable<T>,
  transform: Mapper<T, Promise<R>>, //  (item: T) => Promise<R>,
  // transform: (item: T) => Promise<R>,
  lookup: (value: R, index: number) => OnlySideEffect = v => void v,
  validate: (value: R, index: number) => Promise<OnlySideEffect> = async v =>
    void v,
  errLookup: (error: unknown, index: number) => OnlySideEffect = v => void v
): Promise<PromiseSettledResult<R>>[] {
  return [...collection].map(async (item, index, array) => {
    try {
      const value = await transform(item, index, array);
      lookup(value, index);
      await validate(value, index);
      return { status: FULFILLED, value };
    } catch (error) {
      errLookup(error, index);
      return { status: REJECTED, reason: error };
    }
  });
}

// Settled
// SettledRight
// SettledLeft
