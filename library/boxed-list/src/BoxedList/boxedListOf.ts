import { BoxedList } from './BoxedList';

export function boxedListOf<TVal>(value: TVal) {
  return BoxedList.of<TVal>(value);
}
