// @/BoxedList/BoxedList-new.ts
import Box from '@/Box/Box';
import type { IMapItems, IUnbox, IUnboxList } from '@/types';
export class BoxedList<T> implements IUnboxList<T>, IUnbox<T[]>, IMapItems<T> {
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
    if (BoxedList.isNestedTuple<Item>(item)) {
      const intern = item[0];
      return intern;
    }
    return item;
  }
  // static ============================================-| of() |-====
  public static of<TVal>(...values: TVal[] | [TVal[]]) {
    const normItem = BoxedList.normalize(values);
    return new BoxedList<TVal>([...normItem]);
  }
  // static ==========================================-| from() |-====
  public static from<TVal>(
    box: IUnbox<TVal> | IUnbox<TVal[]> | IUnboxList<TVal>
  ): BoxedList<TVal>;
  public static from<TVal, RVal>(
    box: IUnbox<TVal> | IUnbox<TVal[]> | IUnboxList<TVal>,
    mapFn: (value: TVal) => RVal,
    thisArg?: any
  ): BoxedList<RVal>;
  public static from<TVal, RVal>(
    box: IUnbox<TVal> | IUnbox<TVal[]> | IUnboxList<TVal>,
    mapFn?: (value: TVal) => RVal,
    thisArg?: any
  ): BoxedList<TVal> | BoxedList<RVal> {
    const rawBox = box.unbox();
    const oneBox: TVal[] = Array.isArray(rawBox) ? rawBox : [rawBox];
    if (mapFn !== undefined) {
      return BoxedList.of<RVal>([...oneBox.map(mapFn, thisArg)]);
    }
    return BoxedList.of<TVal>([...oneBox]);
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
  public unbox(): T[];
  public unbox<RVal = T>(mapFn: (value: T) => RVal, thisArg?: any): RVal[];
  public unbox<R_unsafe = T>(
    mapFn?: (value: T) => R_unsafe,
    thisArg?: any
  ): R_unsafe[] {
    if (mapFn !== undefined) {
      return this.#value.map(mapFn, thisArg);
    }
    return this.#value as unknown as R_unsafe[];
  }

  // get ================================================-| box |-====
  public get box() {
    return Box.of([...this.unbox()]);
  }
}
