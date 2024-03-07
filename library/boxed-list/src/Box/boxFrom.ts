import { IUnbox } from '../types';
import Box from './Box';

export function boxFrom<TVal>(box: IUnbox<TVal>) {
  return Box.from(box);
}
