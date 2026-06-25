// ============================================================================
// array-3-residual-and-statics.ts
// ----------------------------------------------------------------------------
// SPLIT 3 of 3 — Everything that does NOT fit the two `T[]`-instance splits.
//
// Contents, in order:
//   A. Supporting array-family helper types (exported; consumed by split 2).
//   B. ArrayResidual<T> — the residual INSTANCE surface:
//        - NON-method / NON-getter members floated ABOVE all methods
//          (property, index signature, well-known-symbol property).
//        - then methods grouped BY OUTPUT TYPE, alphabetical within each group.
//   C. ArrayConstructorSurface — the STATIC side of the array thing
//      (`isArray`, `from`, `of`, `fromAsync`, ctor) — added for completeness,
//      since statics are neither instance getters nor instance methods.
//
// Source of truth: TypeScript 6.0.3 lib.es5 / es2015.core / es2015.iterable /
// es2015.symbol.wellknown / es2016.array.include / es2019.array / es2022.array /
// es2023.array / esnext.array. Element-transforming producers (map, filter,
// flatMap, flat) live HERE because they change/narrow the element type.
// ============================================================================

// ----------------------------------------------------------------------------
// A. Supporting array-family helper types
//    (module-scoped redefinitions kept structurally identical to lib; exported
//     so split 2 can import `ConcatArray`. `FlatArray` / `ArrayIterator` are
//     referenced from the global lib.)
// ----------------------------------------------------------------------------

/** Minimal concat-able shape accepted by `Array.prototype.concat`. */
export interface ConcatArray<T> {
  readonly length: number;
  readonly [n: number]: T;
  join(separator?: string): string;
  slice(start?: number, end?: number): T[];
}

// ----------------------------------------------------------------------------
// B. Residual instance surface
// ----------------------------------------------------------------------------

export interface ArrayResidual<T> {
  // ======================================================================== //
  // NON-METHOD / NON-GETTER MEMBERS — floated above all methods.
  // ======================================================================== //

  /** Element count; one higher than the highest index. Writable. */
  length: number;

  /** Numeric index signature: element access by position. */
  [n: number]: T;

  /** Well-known-symbol property: keys hidden from `with` statements. */
  readonly [Symbol.unscopables]: {
    [K in keyof any[]]?: boolean;
  };

  // ======================================================================== //
  // METHODS — grouped by output type, alphabetical within each group.
  // ======================================================================== //

  // ---- group: projecting array producers → U[] / S[] / FlatArray[] ------ //

  /**
   * Selects elements passing `predicate` into a NEW array. Guard overload
   * narrows to `S[]`; predicate overload yields `T[]`. Element-derived, so it
   * sits with the projection family rather than split 2.
   */
  filter<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any
  ): S[];
  filter(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): T[];

  /**
   * Flattens nested arrays up to `depth` into a NEW array. Return element type
   * computed by `FlatArray`.
   */
  flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];

  /**
   * Maps then flattens one level into a NEW `U[]` (map + flat depth 1).
   */
  flatMap<U, This = undefined>(
    callback: (
      this: This,
      value: T,
      index: number,
      array: T[]
    ) => U | ReadonlyArray<U>,
    thisArg?: This
  ): U[];

  /**
   * Projects each element through `callbackfn` into a NEW `U[]`.
   */
  map<U>(
    callbackfn: (value: T, index: number, array: T[]) => U,
    thisArg?: any
  ): U[];

  // ---- group: single element access → T | undefined / S | undefined ----- //

  /** Element at `index` (negative counts from end), or `undefined`. */
  at(index: number): T | undefined;

  /** First element satisfying `predicate`, or `undefined`. Guard-narrowing. */
  find<S extends T>(
    predicate: (value: T, index: number, obj: T[]) => value is S,
    thisArg?: any
  ): S | undefined;
  find(
    predicate: (value: T, index: number, obj: T[]) => unknown,
    thisArg?: any
  ): T | undefined;

  /** Last element satisfying `predicate`, or `undefined`. Guard-narrowing. */
  findLast<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any
  ): S | undefined;
  findLast(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): T | undefined;

  /** Removes and returns the last element, or `undefined`. Mutates length. */
  pop(): T | undefined;

  /** Removes and returns the first element, or `undefined`. Mutates. */
  shift(): T | undefined;

  // ---- group: numeric → number ------------------------------------------ //

  /** Index of the first element satisfying `predicate`, or `-1`. */
  findIndex(
    predicate: (value: T, index: number, obj: T[]) => unknown,
    thisArg?: any
  ): number;

  /** Index of the last element satisfying `predicate`, or `-1`. */
  findLastIndex(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): number;

  /** Index of the first occurrence of `searchElement`, or `-1`. */
  indexOf(searchElement: T, fromIndex?: number): number;

  /** Index of the last occurrence of `searchElement`, or `-1`. */
  lastIndexOf(searchElement: T, fromIndex?: number): number;

  /** Appends items, returns the NEW length. Mutates. */
  push(...items: T[]): number;

  /** Prepends items, returns the NEW length. Mutates. */
  unshift(...items: T[]): number;

  // ---- group: boolean / type-predicate → boolean / this is S[] ---------- //

  /** True if all elements satisfy `predicate`. Guard overload narrows `this`. */
  every<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any
  ): this is S[];
  every(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): boolean;

  /** True if `searchElement` is present (SameValueZero). */
  includes(searchElement: T, fromIndex?: number): boolean;

  /** True if any element satisfies `predicate`. */
  some(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): boolean;

  // ---- group: accumulator → T | U --------------------------------------- //

  /** Left fold. Overloaded for same-type `T` and seeded `U` accumulators. */
  reduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T
  ): T;
  reduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T,
    initialValue: T
  ): T;
  reduce<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue: U
  ): U;

  /** Right fold. Overloaded for same-type `T` and seeded `U` accumulators. */
  reduceRight(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T
  ): T;
  reduceRight(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T,
    initialValue: T
  ): T;
  reduceRight<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue: U
  ): U;

  // ---- group: string → string ------------------------------------------- //

  /** Joins elements into a string separated by `separator` (default `,`). */
  join(separator?: string): string;

  /** Locale-aware string form. Overloaded with explicit locale/options. */
  toLocaleString(): string;
  toLocaleString(
    locales: string | string[],
    options?: Intl.NumberFormatOptions & Intl.DateTimeFormatOptions
  ): string;

  /** Default string form (comma-joined). */
  toString(): string;

  // ---- group: iterator → ArrayIterator<…> ------------------------------- //

  /** Iterator of `[index, value]` pairs. */
  entries(): ArrayIterator<[number, T]>;

  /** Iterator of indices. */
  keys(): ArrayIterator<number>;

  /** Iterator of values. */
  values(): ArrayIterator<T>;

  /** Well-known-symbol method: default iterator (values). */
  [Symbol.iterator](): ArrayIterator<T>;

  // ---- group: void ------------------------------------------------------ //

  /** Runs `callbackfn` for each element; returns nothing. */
  forEach(
    callbackfn: (value: T, index: number, array: T[]) => void,
    thisArg?: any
  ): void;
}

// ----------------------------------------------------------------------------
// C. Static constructor surface (added for completeness — not instance members)
//    Mirrors `ArrayConstructor` from lib.es5 / es2015 / esnext.array.
// ----------------------------------------------------------------------------

export interface ArrayConstructorSurface {
  // -- construction (non-method members of the array thing) --------------- //
  readonly prototype: any[];
  new (arrayLength?: number): any[];
  new <T>(arrayLength: number): T[];
  new <T>(...items: T[]): T[];
  (arrayLength?: number): any[];
  <T>(arrayLength: number): T[];
  <T>(...items: T[]): T[];

  // -- from --------------------------------------------------------------- //
  /** Builds a new array from an array-like or iterable, with optional map. */
  from<T>(arrayLike: ArrayLike<T>): T[];
  from<T, U>(
    arrayLike: ArrayLike<T>,
    mapfn: (v: T, k: number) => U,
    thisArg?: any
  ): U[];
  from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
  from<T, U>(
    iterable: Iterable<T> | ArrayLike<T>,
    mapfn: (v: T, k: number) => U,
    thisArg?: any
  ): U[];

  // -- fromAsync ---------------------------------------------------------- //
  /** Builds a promise of an array from async/sync iterables, awaiting items. */
  fromAsync<T>(
    iterableOrArrayLike:
      | AsyncIterable<T>
      | Iterable<T | PromiseLike<T>>
      | ArrayLike<T | PromiseLike<T>>
  ): Promise<T[]>;
  fromAsync<T, U>(
    iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>,
    mapFn: (value: Awaited<T>, index: number) => U,
    thisArg?: any
  ): Promise<Awaited<U>[]>;

  // -- isArray ------------------------------------------------------------ //
  /** Type-guard: narrows `arg` to `any[]`. */
  isArray(arg: any): arg is any[];

  // -- of ----------------------------------------------------------------- //
  /** Builds a new array from the given items. */
  of<T>(...items: T[]): T[];
}
