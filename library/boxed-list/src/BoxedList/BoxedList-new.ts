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
    if (values.length === 1) {
      const value = values[0];
      if (Array.isArray(value)) return new BoxedList<TVal>([...value]);
    }
    return new BoxedList<TVal>([...(values as TVal[])]);
  }

  // static ==========================================-| from() |-====
  public static from<TVal>(
    box: IUnbox<TVal> | IUnbox<TVal[]> | IUnboxList<TVal>
  ): BoxedList<TVal> {
    const unbox = box.unbox();
    if (Array.isArray(unbox)) return BoxedList.of<TVal>(...(unbox as TVal[]));
    return BoxedList.of<TVal>(unbox as TVal);
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
