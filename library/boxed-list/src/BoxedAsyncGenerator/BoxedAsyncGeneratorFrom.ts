import { IUnbox, IUnboxList } from '../types';
import { BoxedAsyncGenerator } from './BoxedAsyncGenerator';

export function BoxedAsyncGeneratorFrom<TVal>(
  boxedList: IUnboxList<TVal> | IUnbox<TVal[]>
) {
  return BoxedAsyncGenerator.from<TVal>(boxedList);
}
