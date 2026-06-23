// @/BoxedList/BoxedList-new.ts
import Box from '@/Box/Box';
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
    return [...item];
  }
  // static ============================================-| of() |-====
  public static of<TVal>(...values: [TVal[]]): BoxedList_new<TVal>;
  public static of<TVal>(...values: TVal[]): BoxedList_new<TVal>;
  public static of<TVal>(...values: TVal[] | [TVal[]]): BoxedList_new<TVal> {
    const normItem = BoxedList_new.normalize(values);
    return new BoxedList_new<TVal>(normItem);
  }
  // static ==========================================-| from() |-====
  // ──▶ BOUNDARY ENTRY: Callers arrive from outside. Context is Exposed.
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
    const normBox = BoxedList_new.normalize(box.unbox());
    if (mapFn !== undefined) {
      return BoxedList_new.of<RVal>(normBox.map(mapFn, thisArg));
    }
    return BoxedList_new.of<TVal>(normBox);
  }
  // protected ================================-| constructor() |-==============
  protected constructor(value: T[]) {
    this.#value = value;
    return this;
  }
  // public ======================================-| mapItems() |-====
  // ──▶ INTERNAL PIPELINE: Logic lives inside the box. Context is Absent.
  //   Element-level functor map: fn is applied to each T individually.
  //   Mirrors Array.prototype.map but stays inside BoxedList.
  public mapItems<R>(fn: (value: T) => R): BoxedList_new<R> {
    return BoxedList_new.of<R>(this.unbox(fn));
  }
  // public =========================================-| unbox() |-====
  // ──▶ BOUNDARY EXIT: Handing data back out to the world. Context is Exposed.
  public unbox(): T[];
  public unbox<R>(mapFn: (value: T) => R, thisArg?: any): R[];
  public unbox<R = T>(mapFn?: (value: T) => R, thisArg?: any): T[] | R[] {
    return mapFn !== undefined
      ? this.#value.map(mapFn, thisArg)
      : this.#unboxRaw();
  }
  #unboxRaw(): T[] {
    return [...this.#value];
  }
  // get ================================================-| box |-====
  public get box() {
    return Box.of(this.unbox());
  }
}
