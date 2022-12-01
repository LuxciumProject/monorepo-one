import { FULFILLED, REJECTED } from '../constants';
import { Mapper, OnlySideEffect } from '../types';

/** @deprecated */
export async function serialMapping_α<R, T>(
  collection: Iterable<T>,
  transform: Mapper<T, Promise<R>>, // (item: T) => Promise<R>
  // transform: (item: T) => Promise<R>,
  lookup: (value: R, index: number) => OnlySideEffect = v => void v,
  validate: (value: R, index: number) => Promise<OnlySideEffect> = async v =>
    void v,
  errLookup: (error: unknown, index: number) => OnlySideEffect = v => void v
): Promise<PromiseSettledResult<R>[]> {
  let i = 0;
  const results: PromiseSettledResult<R>[] = [];
  for (const item of collection) {
    try {
      const value = await transform(item, i++, [...collection]);
      lookup(value, i);
      await validate(value, i);
      results.push({ status: FULFILLED, value });
    } catch (error) {
      errLookup(error, i);
      results.push({ status: REJECTED, reason: error });
    }
  }
  return results;
}
