import { BoxedAsyncGenerator } from './BoxedAsyncGenerator';

export function BoxedAsyncGeneratorOf<TVal>(
  ...values: TVal[] | [TVal[]]
): BoxedAsyncGenerator<TVal> {
  return BoxedAsyncGenerator.of(...values);
}
