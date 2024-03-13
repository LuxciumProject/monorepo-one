import { Unbox } from './Unbox';

export interface ExtractFL<T> {
  ['fantasy-land/extract'](): Unbox<T> | T;
}
export interface IUnbox<T> extends ExtractFL<T> {
  unbox(): Unbox<T> | T;
}
