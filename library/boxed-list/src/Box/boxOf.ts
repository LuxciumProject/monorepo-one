import Box from './Box';

export function boxOf<TVal>(value: TVal) {
  return Box.of(value);
}
