import { IUnbox, IUnboxList } from '../types';
import { BoxedGenerator } from './BoxedGenerator';

export function BoxedGeneratorFrom<TVal>(
  ...boxedList: (IUnboxList<TVal> | IUnbox<TVal[]>)[]
) {
  return BoxedGenerator.from<TVal>(...boxedList);
}
