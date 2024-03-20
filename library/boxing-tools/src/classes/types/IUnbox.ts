import { Unbox } from './Unbox';

export interface IUnbox<U> {
  unbox: () => Unbox<U> | U;
}
