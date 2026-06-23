// @/BoxedList/BoxedList-new.ts
import type { IMapItems, IUnbox, IUnboxList } from '@/types';
export class BoxedList_new<T>
  implements IUnboxList<T>, IUnbox<T[]>, IMapItems<T>
{
  readonly #value: T[];
  // private static =========================-| isNestedTuple() |-====
  private static isNestedTuple<TVal>(
    item: TVal[] | [TVal[]]
  ): item is [TVal[]] {
    return item.length === 1 && Array.isArray(item[0]);
  }
  // private static =============================-| normalize() |-====
  private static normalize<Item>(item: Item | Item[] | [Item[]]): Item[] {
    if (!Array.isArray(item)) {
      return [item];
    }
    if (BoxedList_new.isNestedTuple<Item>(item)) {
      return item[0];
    }
    return item;
  }
  // static ============================================-| of() |-====
  public static of<TVal>(...values: [TVal[]]): BoxedList_new<TVal>;
  public static of<TVal>(...values: TVal[]): BoxedList_new<TVal>;
  public static of<TVal>(...values: TVal[] | [TVal[]]): BoxedList_new<TVal> {
    return new BoxedList_new<TVal>(BoxedList_new.normalize<TVal>(values));
  }
  // static ==========================================-| from() |-====
  public static from<TVal>(box: IUnbox<TVal | TVal[]>): BoxedList_new<TVal>;
  public static from<TVal, RVal>(
    box: IUnbox<TVal | TVal[]>,
    mapFn: (value: TVal) => RVal,
    thisArg?: any
  ): BoxedList_new<RVal>;
  public static from<TVal, RVal>(
    box: IUnbox<TVal | TVal[]>,
    mapFn?: (value: TVal) => RVal,
    thisArg?: any
  ): BoxedList_new<TVal> | BoxedList_new<RVal> {
    const normBox = BoxedList_new.normalize<TVal>(box.unbox());
    if (mapFn !== undefined) {
      return new BoxedList_new<RVal>(normBox.map(mapFn, thisArg));
    }
    return new BoxedList_new<TVal>(normBox);
  }
  // protected ================================-| constructor() |-==============
  protected constructor(value: T[]) {
    this.#value = value;
  }
  // public ======================================-| mapItems() |-====
  public mapItems<R>(fn: (value: T) => R): BoxedList_new<R> {
    return new BoxedList_new<R>(this.#value.map(fn));
  }
  // public =========================================-| unbox() |-====
  public unbox(): T[];
  public unbox<R>(mapFn: (value: T) => R, thisArg?: any): R[];
  public unbox<R = T>(mapFn?: (value: T) => R, thisArg?: any): T[] | R[] {
    return mapFn !== undefined
      ? this.#value.map(mapFn, thisArg)
      : this.#value.slice();
  }
}
