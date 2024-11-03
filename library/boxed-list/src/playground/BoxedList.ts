import type { IMapItems, IUnbox, IUnboxList } from '../types';

export class BoxedList<T> implements IUnboxList<T>, IUnbox<T[]>, IMapItems<T> {
  #value: T[];

  constructor(value: T[]) {
    this.#value = value;
  }

  unbox(): T[] {
    return this.#value;
  }
  get boxedValue(): T[] {
    return this.#value;
  }

  mapItems<U>(fn: (item: T) => U): BoxedList<U> {
    return new BoxedList(this.boxedValue.map(fn));
  }
}
