import { FULFILLED, REJECTED } from './constants';
import { Mapper, OnlySideEffect } from './types';

export async function awaitedMapping_α<R, T>(
  collection: Iterable<T>,
  transform: Mapper<T, Promise<R>>,
  lookup: (value: R, index: number) => OnlySideEffect = v => void v,
  validate: (value: R, index: number) => Promise<OnlySideEffect> = async v =>
    void v,
  errLookup: (error: unknown, index: number) => OnlySideEffect = v => void v
): Promise<PromiseSettledResult<R>[]> {
  const result = [...collection].map(async (item, index, array) => {
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

  return Promise.all(result);
}
