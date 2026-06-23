// @/BoxedList/BoxedList-new.ts
import type { IMapItems, IUnbox, IUnboxList } from '@/types';
export class BoxedList_new<T>
  implements IUnboxList<T>, IUnbox<T[]>, IMapItems<T>
{
  readonly _value: T[];
  // private static =========================-| isNestedTuple() |-====
  private static isNestedTuple<TVal>(
    item: TVal[] | [TVal[]]
  ): item is [TVal[]] {
    return item.length === 1 && Array.isArray(item[0]);
  }
  // private static =============================-| normalize() |-====
  static normalize<Item>(item: Item | Item[] | [Item[]]): Item[] {
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
  // Overload A: Box contains an array
  public static from<TVal>(box: IUnbox<TVal[]>): BoxedList_new<TVal>;

  // Overload B: Box contains a single scalar item
  public static from<TVal>(box: IUnbox<TVal>): BoxedList_new<TVal>;

  // Overload C: Box contains an array + map function
  public static from<TVal, RVal>(
    box: IUnbox<TVal[]>,
    mapFn: (value: TVal) => RVal,
    thisArg?: unknown
  ): BoxedList_new<RVal>;

  // Overload D: Box contains a single item + map function
  public static from<TVal, RVal>(
    box: IUnbox<TVal>,
    mapFn: (value: TVal) => RVal,
    thisArg?: unknown
  ): BoxedList_new<RVal>;
  // Implementation signature
  public static from<TVal, RVal>(
    box: IUnbox<any>,
    mapFn?: (value: TVal) => RVal,
    thisArg?: unknown
  ): BoxedList_new<TVal> | BoxedList_new<RVal> {
    const rawContent = box.unbox();
    const normBox = BoxedList_new.normalize<TVal>(rawContent);

    if (mapFn !== undefined) {
      return new BoxedList_new<RVal>(normBox.map(mapFn, thisArg));
    }
    return new BoxedList_new<TVal>(normBox);
  }
  // protected ================================-| constructor() |-==============
  protected constructor(value: T[]) {
    this._value = value;
  }
  // public ======================================-| mapItems() |-====
  public mapItems<R>(fn: (value: T) => R): BoxedList_new<R> {
    return new BoxedList_new<R>(this._value.map(fn));
  }
  // public =========================================-| unbox() |-====
  public unbox(): T[];
  public unbox<R>(mapFn: (value: T) => R, thisArg?: unknown): R[];
  public unbox<R = T>(mapFn?: (value: T) => R, thisArg?: unknown): T[] | R[] {
    return mapFn !== undefined
      ? this._value.map(mapFn, thisArg)
      : this._value.slice();
  }
}
