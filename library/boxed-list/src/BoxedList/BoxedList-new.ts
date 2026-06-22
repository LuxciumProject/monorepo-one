// @/BoxedList/BoxedList-new.ts
import Box from '@/Box/Box';
import type {
  //   CallbackfnT,
  //   CallbackfnU,
  IMapItems,
  IUnbox,
  IUnboxList,
} from '@/types';
export class BoxedList<T> implements IUnboxList<T>, IUnbox<T[]>, IMapItems<T> {
  readonly #value: T[];
  // static ============================================-| of() |-====
  public static of<TVal>(...values: TVal[] | [TVal[]]) {
    const normItem = BoxedList.normalizeItem(values);
    if (values.length === 1) {
      const value = values[0];
      if (Array.isArray(value)) return new BoxedList<TVal>([...value]);
    }
    // BoxedList.normalizeItem(values);
    return new BoxedList<TVal>([...normItem]);
  }

  // static =====================================-| normalize() |-====
  public static normalizeItem<TVal>(item: TVal | TVal[] | [TVal[]]) {
    item;
    if (!Array.isArray(item)) {
      item; // item is TVal;
      return [item];
    }
    item; // item isTVal[] | [TVal[]];
    if (item.length === 1) {
      item;
      if (!Array.isArray(item[0])) {
        return [item[0]];
      }
    }

    Array.isArray(item[0]) && item.length === 1;
    const items = Array.isArray(item) ? item : [item];
    if (Array.isArray(item) && item.length === 1 && Array.isArray(item[0])) {
      return item[0];
    }
    return items;
  }
  // static ==========================================-| from() |-====
  public static from<TVal>(
    box: IUnbox<TVal> | IUnbox<TVal[]> | IUnboxList<TVal>,
    mapFn?: <RVal>(value: TVal) => RVal,
    thisArg?: any
  ): BoxedList<TVal> {
    const oneBox = BoxedList.normalizeItem(box.unbox());
    return BoxedList.of<TVal>(...oneBox.map(mapFn || (x => x), thisArg));
  }

  // protected ================================-| constructor() |-====
  protected constructor(value: T[]) {
    this.#value = value;
    return this;
  }
  // public ======================================-| mapItems() |-====
  //   Element-level functor map: fn is applied to each T individually.
  //   Mirrors Array.prototype.map but stays inside BoxedList.
  public mapItems<R>(fn: (value: T) => R): BoxedList<R> {
    return BoxedList.of<R>(...this.#value.map(fn));
  }

  // public =========================================-| unbox() |-====
  public unbox<R_unsafe = T>(): R_unsafe[] {
    return this.#value as unknown as R_unsafe[];
  }

  // get ================================================-| box |-====
  public get box() {
    return Box.of([...this.unbox<T>()]);
  }
}
