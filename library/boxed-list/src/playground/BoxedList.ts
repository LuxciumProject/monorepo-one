// @/playground/BoxedList.ts
import type { IMapItems, IUnbox, IUnboxList } from '@/types';

export class BoxedList<T> implements IUnboxList<T>, IUnbox<T[]>, IMapItems<T> {
  #value: T[];

  // static ============================================-| of() |-====
  /**
   * Creates a new instance of `BoxedList` from the provided values.
   *
   * This method can take either a list of values or a single array of values.
   * If a single array is provided, it will be used directly to create the `BoxedList`.
   * If multiple values are provided, they will be collected into an array to create the `BoxedList`.
   *
   * @example
   * ```typescript
   * const list1 = BoxedList.of(1, 2, 3);
   * // list1 contains [1, 2, 3]
   *
   * const list2 = BoxedList.of([4, 5, 6]);
   * // list2 contains [4, 5, 6]
   * ```
   *
   * @typeParam TVal - The type of the values in the list.
   * @param values - A list of values or a single array of values.
   * @returns A new instance of `BoxedList` containing the provided values.
   */
  public static of = <TVal>(...values: TVal[] | [TVal[]]) => {
    if (values.length === 1) {
      const value = values[0];

      if (Array.isArray(value)) return new BoxedList<TVal>([...value]);
    }

    return new BoxedList<TVal>([...(values as TVal[])]);
  };

  public constructor(value: T[]) {
    this.#value = value;
  }

  public unbox(): T[] {
    return this.#value;
  }
  public get boxedValue(): T[] {
    return this.#value;
  }

  public mapItems<U>(fn: (item: T) => U): BoxedList<U> {
    return new BoxedList(this.boxedValue.map(fn));
  }
}
