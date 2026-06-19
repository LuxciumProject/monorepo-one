// @/BoxedList/BoxedList.ts
import { Box } from '@/Box/Box';
import type {
  CallbackfnT,
  CallbackfnU,
  IMapItems,
  IUnbox,
  IUnboxList,
} from '@/types';

export class BoxedList<T> implements IUnboxList<T>, IUnbox<T[]>, IMapItems<T> {
  readonly #value: T[];

  // static ============================================-| of() |-====
  // Primary factory. Accepts spread elements or a single array (auto-unwrapped):
  //   BoxedList.of(1, 2, 3)   → BoxedList<number> of [1, 2, 3]
  //   BoxedList.of([1, 2, 3]) → BoxedList<number> of [1, 2, 3]
  // When T is itself an array type, prefer `new BoxedList(array)` internally
  // to avoid the single-argument unwrap heuristic producing the wrong type.
  public static of<TVal>(...values: TVal[] | [TVal[]]): BoxedList<TVal> {
    if (values.length === 1) {
      const value = values[0];
      if (Array.isArray(value)) return new BoxedList<TVal>([...value]);
    }
    return new BoxedList<TVal>([...(values as TVal[])]);
  }

  // static ==========================================-| from() |-====
  // Creates a BoxedList from any IUnbox container.
  //   unbox() → T[]  : its elements become the list contents.
  //   unbox() → T    : the scalar is wrapped in a single-element list.
  // Fix: original always called BoxedList.of(unbox as TVal) and therefore
  // wrapped arrays in a single-element list instead of spreading them.
  // from2() merged into this corrected implementation.
  public static from<TVal>(
    box: IUnbox<TVal> | IUnbox<TVal[]> | IUnboxList<TVal>
  ): BoxedList<TVal> {
    const unboxed = box.unbox();
    if (Array.isArray(unboxed)) {
      return new BoxedList<TVal>([...(unboxed as TVal[])]);
    }
    return new BoxedList<TVal>([unboxed as TVal]);
  }

  // protected ================================-| constructor() |-====
  protected constructor(value: T[]) {
    this.#value = value;
  }

  // iterator ==========================-| *[Symbol.iterator]() |-====
  public *[Symbol.iterator](): Generator<T, void, undefined> {
    yield* this.#value;
  }

  // public =======================================-| entries() |-====
  public entries(): IterableIterator<[number, T]> {
    return this.#value.entries();
  }

  // public ==========================================-| keys() |-====
  public keys(): IterableIterator<number> {
    return this.#value.keys();
  }

  // public ========================================-| values() |-====
  public values(): IterableIterator<T> {
    return this.#value.values();
  }

  // public ============================================-| at() |-====
  // Supports negative indices: at(-1) returns the last element.
  public at(index: number): T | undefined {
    return this.#value.at(index);
  }

  /// Methods that return a new BoxedList and do not mutate the original array

  // public ========================================-| concat() |-====
  // Plain values, plain arrays, and other BoxedLists are all accepted.
  public concat(...items: (T | T[] | BoxedList<T>)[]): BoxedList<T> {
    const resolved = items.flatMap<T>(item => {
      if (item instanceof BoxedList) return item.#value;
      if (Array.isArray(item)) return item as T[];
      return [item as T];
    });
    return new BoxedList<T>([...this.#value, ...resolved]);
  }

  // public ========================================-| filter() |-====
  public filter<S extends T>(
    predicate: (val: T, index: number, array: T[]) => val is S,
    thisArg?: unknown
  ): BoxedList<S>;
  public filter(
    predicate: (val: T, index: number, array: T[]) => unknown,
    thisArg?: unknown
  ): BoxedList<T>;
  public filter(
    predicate: (val: T, index: number, array: T[]) => unknown,
    thisArg?: unknown
  ): BoxedList<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new BoxedList<T>(
      this.#value.filter(predicate as any, thisArg as any)
    );
  }

  // public ==========================================-| flat() |-====
  public flat<D extends number = 1>(depth?: D): BoxedList<FlatArray<T[], D>> {
    return new BoxedList<FlatArray<T[], D>>(this.#value.flat(depth));
  }

  // public =======================================-| flatMap() |-====
  public flatMap<U>(
    callbackfn: (val: T, index: number, array: T[]) => U | ReadonlyArray<U>,
    thisArg?: unknown
  ): BoxedList<U> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new BoxedList<U>(
      this.#value.flatMap(callbackfn as any, thisArg as any)
    );
  }

  // public ===========================================-| map() |-====
  // Functor-map: fn receives the entire inner array and returns a new one.
  // For element-wise transformation, use mapItems().
  public map<R>(fn: (value: T[]) => R[]): BoxedList<R> {
    return new BoxedList<R>(fn(this.#value));
  }

  // public ======================================-| mapItems() |-====
  // Element-wise map; equivalent to Array#map but boxed.
  public mapItems<R>(fn: (value: T) => R): BoxedList<R> {
    return new BoxedList<R>(this.#value.map(fn));
  }

  // public ======================================-| mapLists() |-====
  // Wraps each element in a single-element BoxedList, applies fn through
  // mapItems, then unboxes. Useful for element-level functor composition.
  public mapLists<R>(fn: (val: T) => R): BoxedList<R[]> {
    return new BoxedList<R[]>(
      this.#value.map(item => new BoxedList<T>([item]).mapItems(fn).unbox())
    );
  }

  // public =========================================-| slice() |-====
  public slice(start?: number, end?: number): BoxedList<T> {
    return new BoxedList<T>(this.#value.slice(start, end));
  }

  // public ====================================-| toReversed() |-====
  // ES2023 — returns a new reversed copy, does not mutate.
  public toReversed(): BoxedList<T> {
    return new BoxedList<T>(this.#value.toReversed());
  }

  // public ======================================-| toSorted() |-====
  // ES2023 — returns a new sorted copy, does not mutate.
  public toSorted(compareFn?: (a: T, b: T) => number): BoxedList<T> {
    return new BoxedList<T>(this.#value.toSorted(compareFn));
  }

  // public =====================================-| toSpliced() |-====
  // ES2023 — returns a new copy with elements inserted/removed at start.
  public toSpliced(
    start: number,
    deleteCount: number,
    ...items: T[]
  ): BoxedList<T>;
  public toSpliced(start: number): BoxedList<T>;
  public toSpliced(
    start: number,
    deleteCount?: number,
    ...items: T[]
  ): BoxedList<T> {
    return deleteCount === undefined
      ? new BoxedList<T>(this.#value.toSpliced(start))
      : new BoxedList<T>(this.#value.toSpliced(start, deleteCount, ...items));
  }

  // public ==========================================-| with() |-====
  // ES2023 — returns a new copy with the element at index replaced by value.
  public with(index: number, value: T): BoxedList<T> {
    return new BoxedList<T>(this.#value.with(index, value));
  }

  /// Methods that return a scalar value or perform a side-effect

  // public =========================================-| every() |-====
  // Fix: original typed predicate return as `this is S[]`; corrected to
  // `this is BoxedList<S>` since this is a BoxedList, not a plain array.
  public every<S extends T>(
    predicate: (val: T, index: number, array: T[]) => val is S,
    thisArg?: unknown
  ): this is BoxedList<S>;
  public every(
    predicate: (val: T, index: number, array: T[]) => unknown,
    thisArg?: unknown
  ): boolean;
  public every(
    predicate: (val: T, index: number, array: T[]) => unknown,
    thisArg?: unknown
  ): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.#value.every(predicate as any, thisArg as any);
  }

  // public ==========================================-| find() |-====
  public find<S extends T>(
    predicate: (val: T, index: number, obj: T[]) => val is S,
    thisArg?: unknown
  ): S | undefined;
  public find(
    predicate: (val: T, index: number, obj: T[]) => unknown,
    thisArg?: unknown
  ): T | undefined;
  public find(
    predicate: (val: T, index: number, obj: T[]) => unknown,
    thisArg?: unknown
  ): T | undefined {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.#value.find(predicate as any, thisArg as any);
  }

  // public =====================================-| findIndex() |-====
  public findIndex(
    predicate: (val: T, index: number, obj: T[]) => unknown,
    thisArg?: unknown
  ): number {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.#value.findIndex(predicate as any, thisArg as any);
  }

  // public ======================================-| findLast() |-====
  // ES2023
  public findLast<S extends T>(
    predicate: (val: T, index: number, obj: T[]) => val is S,
    thisArg?: unknown
  ): S | undefined;
  public findLast(
    predicate: (val: T, index: number, obj: T[]) => unknown,
    thisArg?: unknown
  ): T | undefined;
  public findLast(
    predicate: (val: T, index: number, obj: T[]) => unknown,
    thisArg?: unknown
  ): T | undefined {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.#value.findLast(predicate as any, thisArg as any);
  }

  // public =================================-| findLastIndex() |-====
  // ES2023
  public findLastIndex(
    predicate: (val: T, index: number, obj: T[]) => unknown,
    thisArg?: unknown
  ): number {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.#value.findLastIndex(predicate as any, thisArg as any);
  }

  // public =======================================-| forEach() |-====
  // Fix: original had `return this.list.forEach(...)` — forEach returns void.
  public forEach(
    callbackfn: (val: T, index: number, array: T[]) => void,
    thisArg?: unknown
  ): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.#value.forEach(callbackfn, thisArg as any);
  }

  // public ======================================-| includes() |-====
  public includes(searchElement: T, fromIndex?: number): boolean {
    return fromIndex !== undefined
      ? this.#value.includes(searchElement, fromIndex)
      : this.#value.includes(searchElement);
  }

  // public =======================================-| indexOf() |-====
  public indexOf(searchElement: T, fromIndex?: number): number {
    return fromIndex !== undefined
      ? this.#value.indexOf(searchElement, fromIndex)
      : this.#value.indexOf(searchElement);
  }

  // public ==========================================-| join() |-====
  public join(separator?: string): string {
    return this.#value.join(separator);
  }

  // public ===================================-| lastIndexOf() |-====
  public lastIndexOf(searchElement: T, fromIndex?: number): number {
    return fromIndex !== undefined
      ? this.#value.lastIndexOf(searchElement, fromIndex)
      : this.#value.lastIndexOf(searchElement);
  }

  // public ========================================-| reduce() |-====
  // Fix: original used `if (!initialValue)` — skipped falsy-but-valid values
  // like 0, false, null, ''. Corrected to `=== undefined`.
  public reduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T
  ): T;
  public reduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T,
    initialValue: T
  ): T;
  public reduce<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue: U
  ): U;
  public reduce<U = T>(
    callbackfn:
      | ((
          previousValue: T,
          currentValue: T,
          currentIndex: number,
          array: T[]
        ) => T)
      | ((
          previousValue: U,
          currentValue: T,
          currentIndex: number,
          array: T[]
        ) => U),
    initialValue?: T | U
  ): T | U {
    if (initialValue === undefined) {
      return this.#value.reduce(callbackfn as CallbackfnT<T>);
    }
    return this.#value.reduce<T | U>(
      callbackfn as CallbackfnU<U, T>,
      initialValue
    );
  }

  // public ===================================-| reduceRight() |-====
  // Fix: same initialValue guard as reduce().
  public reduceRight(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T
  ): T;
  public reduceRight(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T,
    initialValue: T
  ): T;
  public reduceRight<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue: U
  ): U;
  public reduceRight<U = T>(
    callbackfn:
      | ((
          previousValue: T,
          currentValue: T,
          currentIndex: number,
          array: T[]
        ) => T)
      | ((
          previousValue: U,
          currentValue: T,
          currentIndex: number,
          array: T[]
        ) => U),
    initialValue?: T | U
  ): T | U {
    if (initialValue === undefined) {
      return this.#value.reduceRight(callbackfn as CallbackfnT<T>);
    }
    return this.#value.reduceRight<T | U>(
      callbackfn as CallbackfnU<U, T>,
      initialValue
    );
  }

  // public ==========================================-| some() |-====
  public some(
    predicate: (val: T, index: number, array: T[]) => unknown,
    thisArg?: unknown
  ): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.#value.some(predicate as any, thisArg as any);
  }

  // public ================================-| toLocaleString() |-====
  public toLocaleString(
    locales?: string | string[],
    options?: Intl.NumberFormatOptions & Intl.DateTimeFormatOptions
  ): string {
    if (locales === undefined) return this.#value.toLocaleString();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this.#value as any[]).toLocaleString(locales, options);
  }

  // public ======================================-| toString() |-====
  public toString(): string {
    return this.#value.toString();
  }

  /// Monadic and applicative helpers

  // public ============================================-| ap() |-====
  // Applies each fn in fns to each element of this — cartesian product.
  // Fix: simplified from original; no intermediate boxing, same semantics.
  public ap<R>(fns: BoxedList<(t: T) => R>): BoxedList<R> {
    return new BoxedList<R>(
      this.#value.flatMap(t => fns.#value.map(f => f(t)))
    );
  }

  // public =========================================-| chain() |-====
  // Fix: simplified from original mapItems().unbox(); direct this.#value.map.
  public chain<R>(fn: (value: T) => R): R[] {
    return this.#value.map(fn);
  }

  /// Unboxing

  // public =========================================-| unbox() |-====
  // R_unsafe is an escape hatch for when the caller knows more than the
  // type system — use sparingly.
  public unbox<R_unsafe = T>(): R_unsafe[] {
    return this.#value as unknown as R_unsafe[];
  }

  /// Interop and predicates

  // public =========================================-| get box |-====
  public get box(): Box<T[]> {
    return Box.of([...this.#value]);
  }

  // public =================================-| get isArrayList |-====
  public get isArrayList(): boolean {
    return this.#value.every(item => Array.isArray(item));
  }

  // public ======================================-| get length |-====
  public get length(): number {
    return this.#value.length;
  }

  // public ========================================-| get list |-====
  // Direct reference to the inner array — read-only by convention.
  // To fully escape the container, use unbox() instead.
  public get list(): T[] {
    return this.#value;
  }
}
