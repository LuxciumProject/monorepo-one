import { IUnbox } from '../types';
import { BoxedList } from './BoxedList';

export function boxedListFrom<TVal>(box: IUnbox<TVal>) {
  return BoxedList.from<TVal>(box);
}
