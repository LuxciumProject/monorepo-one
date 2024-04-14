import { Unbox } from './Unbox';
export interface IUnbox<T> {
  unbox(): Unbox<T> | T;
}
export interface ExtractFL<T> extends IUnbox<T> {
  ['fantasy-land/extract'](): Unbox<T> | T;
}
