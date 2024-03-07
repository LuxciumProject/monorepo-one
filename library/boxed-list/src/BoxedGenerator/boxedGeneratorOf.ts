import { BoxedGenerator } from './BoxedGenerator';

export function BoxedGeneratorOf<TVal>(
  ...values: TVal[] | [TVal[]]
): BoxedGenerator<TVal> {
  return BoxedGenerator.of(...values);
}
