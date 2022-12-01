import {
  ErrLookupFn,
  LookupFn,
  Settled,
  SettledLeft,
  SettledRight,
  TransformFn,
  ValidateFn,
} from '../types';
import { fn_a1f9a } from './function/fn_a1f9a';

/** @public */
export async function* generateMappingAsync<R, T>(
  collection: Iterable<T | Settled<T>>,
  transform: TransformFn<T, R> = async value => value as any as R,
  lookup: LookupFn<T, R> = v => void v,
  validate: ValidateFn<T, R> = async v => void v,
  errLookup: ErrLookupFn = v => void v
): AsyncGenerator<SettledLeft | SettledRight<R>, void, unknown> {
  let index = 0;
  for await (const item of collection) {
    yield fn_a1f9a({
      item,
      index: index++,
      array: [...collection],
      transform,
      validate,
      errLookup,
      lookup,
    });
  }
}

export async function generateMappingAsync_TEST_() {
  console.log(`at: generateMappingAsync_TEST_ from ${__filename}`);
  const generator = generateMappingAsync([{ item: 10 }]);
  for await (const generation of generator) {
    console.log(generation);
  }
  return void 0;
}
// generateMappingAsync_TEST_();
