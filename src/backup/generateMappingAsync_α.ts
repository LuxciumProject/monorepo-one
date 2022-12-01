import { FULFILLED, REJECTED } from '../constants';
import { Mapper } from '../types';

/** @deprecated */
export async function* generateMappingAsync_α<R, T>(
  collection: Iterable<T>,
  transform: Mapper<T, Promise<R>> // (item: T) => Promise<R>
): AsyncGenerator<PromiseSettledResult<R>, void, unknown> {
  let i = 0;
  for await (const item of collection) {
    try {
      const value = await transform(item, i++, [...collection]);
      yield { status: FULFILLED, value };
    } catch (error) {
      yield { status: REJECTED, reason: error };
    }
  }
}

/** @deprecated */
export const map: <U>(
  callbackfn: (value: never, index: number, array: never[]) => U,
  thisArg?: any
) => U[] = [].map;
