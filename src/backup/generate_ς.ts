import { FULFILLED, REJECTED } from '../constants';
import { Mapper } from '../types';

/** @deprecated */
export function* generateMapping_ς<R, T>(
  collection: Iterable<T>,
  transform: Mapper<T, Promise<R>>
): Generator<PromiseSettledResult<Promise<R>>, void, unknown> {
  let i = 0;
  for (const item of collection) {
    try {
      const value = transform(item, i++, [...collection]);
      yield { status: FULFILLED, value };
    } catch (error) {
      yield { status: REJECTED, reason: error };
    }
  }
}
