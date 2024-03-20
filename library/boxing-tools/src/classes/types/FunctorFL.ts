import { IMap } from '.';

export interface FLMapppable<T> extends IMap<T> {
  ['fantasy-land/map']<R>(fun: (value: T) => R): IMap<R>;
}
