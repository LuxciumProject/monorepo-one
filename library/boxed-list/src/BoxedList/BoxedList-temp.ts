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
  #value: T[];

  // static ============================================-| of() |-====
  public static of = <TVal>(...values: TVal[] | [TVal[]]) => {
    if (values.length === 1) {
      const value = values[0];
      if (Array.isArray(value)) return new BoxedList<TVal>([...value]);
    }
    return new BoxedList<TVal>([...(values as TVal[])]);
  };

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

  // public ===========================================-| at() |-====
  public at(index: number): T | undefined {
    return this.#value.at(index);
  }

  // public ========================================-| concat() |-====
  public concat(...items: (T | ConcatArray<T>)[]): BoxedList<T> {
    return BoxedList.of<T>(...this.#value.concat(...items));
  }

  // public =========================================-| every() |-====
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
    return this.#value.every(predicate, thisArg);
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
    return BoxedList.of<T>(
      ...this.#value.filter(
        predicate as (val: T, index: number, array: T[]) => boolean,
        thisArg
      )
    );
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
    return this.#value.find(predicate, thisArg);
  }

  // public =====================================-| findIndex() |-====
  public findIndex(
    predicate: (val: T, index: number, obj: T[]) => unknown,
    thisArg?: unknown
  ): number {
    return this.#value.findIndex(predicate, thisArg);
  }

  // public ======================================-| findLast() |-====
  public findLast<S extends T>(
    predicate: (val: T, index: number, array: T[]) => val is S,
    thisArg?: unknown
  ): S | undefined;
  public findLast(
    predicate: (val: T, index: number, array: T[]) => unknown,
    thisArg?: unknown
  ): T | undefined;
  public findLast(
    predicate: (val: T, index: number, array: T[]) => unknown,
    thisArg?: unknown
  ): T | undefined {
    return this.#value.findLast(predicate, thisArg);
  }

  // public ==================================-| findLastIndex() |-====
  public findLastIndex(
    predicate: (val: T, index: number, array: T[]) => unknown,
    thisArg?: unknown
  ): number {
    return this.#value.findLastIndex(predicate, thisArg);
  }

  // public ==========================================-| flat() |-====
  public flat<D extends number = 1>(depth?: D): BoxedList<FlatArray<T[], D>> {
    return BoxedList.of<FlatArray<T[], D>>(
      ...(this.#value.flat(depth) as FlatArray<T[], D>[])
    );
  }

  // public =======================================-| flatMap() |-====
  public flatMap<R>(
    callbackFn: (value: T, index: number, array: T[]) => R | ReadonlyArray<R>,
    thisArg?: unknown
  ): BoxedList<R> {
    return BoxedList.of<R>(...this.#value.flatMap(callbackFn, thisArg));
  }

  // public =======================================-| forEach() |-====
  public forEach(
    callbackFn: (val: T, index: number, array: T[]) => void,
    thisArg?: unknown
  ): void {
    this.#value.forEach(callbackFn, thisArg);
  }

  // public =======================================-| includes() |-====
  public includes(searchElement: T, fromIndex?: number): boolean {
    return this.#value.includes(searchElement, fromIndex);
  }

  // public =======================================-| indexOf() |-====
  public indexOf(searchElement: T, fromIndex?: number): number {
    return this.#value.indexOf(searchElement, fromIndex);
  }

  // public ==========================================-| join() |-====
  public join(separator?: string): string {
    return this.#value.join(separator);
  }

  // public =====================================-| lastIndexOf() |-====
  public lastIndexOf(searchElement: T, fromIndex?: number): number {
    return fromIndex !== undefined
      ? this.#value.lastIndexOf(searchElement, fromIndex)
      : this.#value.lastIndexOf(searchElement);
  }

  // public ===========================================-| map() |-====
  //   Container-level transform: fn receives the whole T[] and returns R[].
  //   Distinct from mapItems — this is "lift the array", not "lift each element".
  public map<R>(fn: (value: T[]) => R[]): BoxedList<R> {
    return BoxedList.of<R>(...fn(this.#value));
  }

  // public ======================================-| mapItems() |-====
  //   Element-level functor map: fn is applied to each T individually.
  //   Mirrors Array.prototype.map but stays inside BoxedList.
  public mapItems<R>(fn: (value: T) => R): BoxedList<R> {
    return BoxedList.of<R>(...this.#value.map(fn));
  }

  // public ======================================-| mapLists() |-====
  //   For T[] where each item is itself list-shaped: boxes each item
  //   individually, maps it, then re-wraps. Returns BoxedList<R[]>.
  public mapLists<R>(fn: (val: T) => R): BoxedList<R[]> {
    const mapped = this.#value.map(item =>
      BoxedList.of(item).mapItems(fn).unbox<R>()
    );
    return BoxedList.of<R[]>(...mapped);
  }

  // public ========================================-| reduce() |-====
  public reduce(callbackFn: (prev: T, curr: T, idx: number, arr: T[]) => T): T;
  public reduce<U>(
    callbackFn: (prev: U, curr: T, idx: number, arr: T[]) => U,
    initialValue: U
  ): U;
  public reduce<U = T>(
    callbackFn: CallbackfnT<T> | CallbackfnU<U, T>,
    ...args: [] | [U]
  ): T | U {
    return args.length === 0
      ? this.#value.reduce(callbackFn as CallbackfnT<T>)
      : this.#value.reduce(callbackFn as CallbackfnU<U, T>, args[0]);
  }

  // public ===================================-| reduceRight() |-====
  public reduceRight(
    callbackFn: (prev: T, curr: T, idx: number, arr: T[]) => T
  ): T;
  public reduceRight<U>(
    callbackFn: (prev: U, curr: T, idx: number, arr: T[]) => U,
    initialValue: U
  ): U;
  public reduceRight<U = T>(
    callbackFn: CallbackfnT<T> | CallbackfnU<U, T>,
    ...args: [] | [U]
  ): T | U {
    return args.length === 0
      ? this.#value.reduceRight(callbackFn as CallbackfnT<T>)
      : this.#value.reduceRight(callbackFn as CallbackfnU<U, T>, args[0]);
  }

  // public =========================================-| slice() |-====
  public slice(start?: number, end?: number): BoxedList<T> {
    return BoxedList.of<T>(...this.#value.slice(start, end));
  }

  // public ==========================================-| some() |-====
  public some(
    predicate: (val: T, index: number, array: T[]) => unknown,
    thisArg?: unknown
  ): boolean {
    return this.#value.some(predicate, thisArg);
  }

  // public ===================================-| toLocaleString() |-====
  public toLocaleString(locales?: string | string[], options?: object): string {
    return locales !== undefined
      ? (this.#value as unknown[]).toLocaleString(locales, options)
      : this.#value.toLocaleString();
  }

  // public =====================================-| toReversed() |-====
  public toReversed(): BoxedList<T> {
    return BoxedList.of<T>(...this.#value.toReversed());
  }

  // public =======================================-| toSorted() |-====
  public toSorted(compareFn?: (a: T, b: T) => number): BoxedList<T> {
    return BoxedList.of<T>(...this.#value.toSorted(compareFn));
  }

  // public =====================================-| toSpliced() |-====
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
    const result =
      deleteCount !== undefined
        ? this.#value.toSpliced(start, deleteCount, ...items)
        : this.#value.toSpliced(start);
    return BoxedList.of<T>(...result);
  }

  // public =======================================-| toString() |-====
  public toString(): string {
    return this.#value.toString();
  }

  // public ===========================================-| with() |-====
  public with(index: number, value: T): BoxedList<T> {
    return BoxedList.of<T>(...this.#value.with(index, value));
  }

  // public ===========================================-| ap() |-====
  //   Applicative: applies each fn in fns to each item in this,
  //   fns-outer order — [f(1), f(2), g(1), g(2)] for fns=[f,g], this=[1,2].
  public ap<R>(fns: BoxedList<(t: T) => R>): BoxedList<R> {
    return BoxedList.of<R>(
      ...fns.list.flatMap(f => this.#value.map(t => f(t)))
    );
  }

  // public =========================================-| chain() |-====
  //   Applies fn to each item and returns the raw unwrapped R[].
  //   Bind-and-unbox: escapes the BoxedList when the result is needed flat.
  public chain<R>(fn: (value: T) => R): R[] {
    return this.mapItems<R>(fn).unbox<R>();
  }

  // public =========================================-| unbox() |-====
  public unbox<R_unsafe = T>(): R_unsafe[] {
    return this.#value as unknown as R_unsafe[];
  }

  // get ================================================-| box |-====
  public get box() {
    return Box.of([...this.unbox<T>()]);
  }

  // get ==========================================-| isArrayList |-====
  public get isArrayList(): boolean {
    return this.#value.every(item => Array.isArray(item));
  }

  // get =============================================-| length |-====
  public get length(): number {
    return this.#value.length;
  }

  // get ===============================================-| list |-====
  public get list(): T[] {
    return this.unbox<T>();
  }
}
