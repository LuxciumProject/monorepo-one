import { IUnbox, Unbox } from '.';

export interface FLExtractable<T> extends IUnbox<T> {
  ['fantasy-land/extract'](): Unbox<T> | T;
}
