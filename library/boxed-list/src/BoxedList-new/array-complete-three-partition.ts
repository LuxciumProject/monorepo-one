// ============================================================================
// Array Ecosystem: Three-Partition Interface Hierarchy
// Partition 1: Identity & Structure (what the array IS)
// Partition 2: Imperative Operations (what you DO to the array)
// Partition 3: Declarative Operations (what you GET from the array)
// ============================================================================

// ─────────────────────────────────────────────────────────────────────────
// PARTITION 1: Identity & Structure
// Properties, metadata, and iterator protocol defining array-ness
// ─────────────────────────────────────────────────────────────────────────

/**
 * Array structural properties and metadata
 */
interface ArrayIdentityProperties<T> {
  /**
   * Gets or sets the length of the array.
   * This is a number one higher than the highest index.
   */
  length: number;

  /**
   * Numeric index signature: array[0], array[1], etc.
   */
  [n: number]: T;

  /**
   * Metadata object whose properties have the value 'true' when they will be absent
   * when used in a 'with' statement.
   */
  readonly [Symbol.unscopables]: {
    readonly [K in keyof any[]]?: boolean;
  };

  /**
   * Reference to the Array constructor function
   */
  readonly constructor: ArrayConstructor;
}

/**
 * Array iterator protocol: ability to iterate over indices and values
 */
interface ArrayIteratorProtocol<T> {
  /**
   * Returns an iterator over the array indices
   */
  keys(): IterableIterator<number>;

  /**
   * Returns an iterator over the array values
   */
  values(): IterableIterator<T>;

  /**
   * Returns an iterator over [index, value] pairs
   */
  entries(): IterableIterator<[number, T]>;

  /**
   * Default iterator (same as values())
   */
  [Symbol.iterator](): IterableIterator<T>;
}

/**
 * Combined identity interface: everything that defines what an array IS
 */
interface ArrayIdentity<T>
  extends ArrayIdentityProperties<T>,
    ArrayIteratorProtocol<T> {}

// ─────────────────────────────────────────────────────────────────────────
// PARTITION 2: Imperative Operations (Mutation)
// All methods that modify the array in place; all absent from ReadonlyArray<T>
// ─────────────────────────────────────────────────────────────────────────

/**
 * Imperative methods that return 'this' (the modified array itself)
 */
interface ArrayImperativeReturnThis<T> {
  /**
   * Returns this after copying a section of the array to the same array
   * at a different position.
   */
  copyWithin(target: number, start?: number, end?: number): this;

  /**
   * Changes all elements from start to end to a static value and returns this.
   */
  fill(value: T, start?: number, end?: number): this;

  /**
   * Reverses the array in place and returns this.
   */
  reverse(): this;

  /**
   * Sorts the array in place and returns this.
   */
  sort(compareFn?: (a: T, b: T) => number): this;
}

/**
 * Imperative methods that remove an element and return it
 */
interface ArrayImperativeRemoveElement<T> {
  /**
   * Removes the last element and returns it (or undefined if empty)
   */
  pop(): T | undefined;

  /**
   * Removes the first element and returns it (or undefined if empty)
   */
  shift(): T | undefined;
}

/**
 * Imperative methods that add elements and return the new length
 */
interface ArrayImperativeAddLength<T> {
  /**
   * Adds elements to the end and returns the new length
   */
  push(...items: T[]): number;

  /**
   * Adds elements to the start and returns the new length
   */
  unshift(...items: T[]): number;
}

/**
 * Imperative methods that splice: remove and/or add at position
 */
interface ArrayImperativeSplice<T> {
  /**
   * Removes elements and optionally inserts new ones at a position.
   * Returns an array of removed elements.
   * (Two overloads: with and without items to insert)
   */
  splice(start: number, deleteCount?: number): T[];

  splice(start: number, deleteCount: number, ...items: T[]): T[];
}

/**
 * Combined imperative interface: all mutation operations
 */
interface ArrayImperative<T>
  extends ArrayImperativeReturnThis<T>,
    ArrayImperativeRemoveElement<T>,
    ArrayImperativeAddLength<T>,
    ArrayImperativeSplice<T> {}

interface ArrayDeclarativeNewArray<T> {
  /**
   * Returns a new array combining this array with other arrays/values
   */
  concat(...items: ConcatArray<T>[]): T[];

  concat(...items: (T | ConcatArray<T>)[]): T[];

  /**
   * Returns a new array of elements where predicate is true (type guard variant)
   */
  filter<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any
  ): S[];

  /**
   * Returns a new array of elements where predicate is true
   */
  filter(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): T[];

  /**
   * Returns a new array with sub-arrays flattened to the specified depth
   */
  flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];

  /**
   * Returns a new array: maps each element, then flattens one level
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
   * Returns a new array of transformed elements
   */
  map<U>(
    callback: (value: T, index: number, array: T[]) => U,
    thisArg?: any
  ): U[];

  /**
   * Returns a shallow copy of a section of the array
   */
  slice(start?: number, end?: number): T[];

  /**
   * ES2023: Returns a new reversed copy (does not mutate)
   */
  toReversed(): T[];

  /**
   * ES2023: Returns a new sorted copy (does not mutate)
   */
  toSorted(compareFn?: (a: T, b: T) => number): T[];

  /**
   * ES2023: Returns a new copy with edits spliced in
   */
  toSpliced(start: number, deleteCount?: number): T[];

  toSpliced(start: number, deleteCount: number, ...items: T[]): T[];

  /**
   * ES2023: Returns a new copy with one element replaced
   */
  with(index: number, value: T): T[];
}
// ─── 3b: Element Search & Access ───────────────────────────────────────

/**
 * Methods that return a single element or its index
 */
interface ArrayDeclarativeSearch<T> {
  /**
   * Returns element at index (supports negative indices)
   */
  at(index: number): T | undefined;

  /**
   * Returns first element where predicate is true (with type guard)
   */
  find<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any
  ): S | undefined;

  /**
   * Returns first element where predicate is true
   */
  find(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): T | undefined;

  /**
   * Returns index of first element where predicate is true
   */
  findIndex(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): number;

  /**
   * ES2023: Returns last element where predicate is true (with type guard)
   */
  findLast<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any
  ): S | undefined;

  /**
   * ES2023: Returns last element where predicate is true
   */
  findLast(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): T | undefined;

  /**
   * ES2023: Returns index of last element where predicate is true
   */
  findLastIndex(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): number;

  /**
   * Returns the first index of a value, or -1 if not found
   */
  indexOf(searchElement: T, fromIndex?: number): number;

  /**
   * Returns the last index of a value, or -1 if not found
   */
  lastIndexOf(searchElement: T, fromIndex?: number): number;
}

// ─── 3c: Reduction & Accumulation ──────────────────────────────────────

/**
 * Methods that accumulate to a single value
 */
interface ArrayDeclarativeReduce<T> {
  /**
   * Reduces array to a single T value (no initial value)
   */
  reduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T
  ): T;

  /**
   * Reduces array to a single T value (with initial value)
   */
  reduce(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T,
    initialValue: T
  ): T;

  /**
   * Reduces array to a single U value (different accumulator type)
   */
  reduce<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue: U
  ): U;

  /**
   * Reduces array from right to left to a single T value
   */
  reduceRight(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T
  ): T;

  /**
   * Reduces array from right to left with initial value
   */
  reduceRight(
    callbackfn: (
      previousValue: T,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => T,
    initialValue: T
  ): T;

  /**
   * Reduces array from right to left to a single U value
   */
  reduceRight<U>(
    callbackfn: (
      previousValue: U,
      currentValue: T,
      currentIndex: number,
      array: T[]
    ) => U,
    initialValue: U
  ): U;
}

// ─── 3d: Predicates (Boolean) ──────────────────────────────────────────

/**
 * Methods that return true/false
 */
interface ArrayDeclarativePredicates<T> {
  /**
   * Returns true if all elements satisfy the predicate
   */
  every(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): boolean;

  /**
   * Returns true if the element is in the array
   */
  includes(searchElement: T, fromIndex?: number): boolean;

  /**
   * Returns true if any element satisfies the predicate
   */
  some(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): boolean;
}

// ─── 3e: String Serialization ──────────────────────────────────────────

/**
 * Methods that return a string representation
 */
interface ArrayDeclarativeStringify<T> {
  /**
   * Joins all elements into a string with separator
   */
  join(separator?: string): string;

  /**
   * Returns locale-aware string representation
   */
  toLocaleString(): string;

  toLocaleString(
    locales: string | string[],
    options?: Intl.NumberFormatOptions & Intl.DateTimeFormatOptions
  ): string;

  /**
   * Returns string representation
   */
  toString(): string;
}

// ─── 3f: Side-Effect Iteration ────────────────────────────────────────

/**
 * Methods that execute a callback for side effects (return void)
 */
interface ArrayDeclarativeForEach<T> {
  /**
   * Executes callback for each element. Returns undefined.
   */
  forEach(
    callbackfn: (value: T, index: number, array: T[]) => void,
    thisArg?: any
  ): void;
}

// ─── 3g: Static Constructors ───────────────────────────────────────────

/**
 * Static methods on Array constructor (create or validate arrays)
 */
interface ArrayStaticMethods {
  /**
   * Creates an array from an iterable, optionally transforming values
   */
  from<T>(
    iterable: Iterable<T> | ArrayLike<T>,
    mapFn?: (v: T, k: number) => T,
    thisArg?: unknown
  ): T[];

  from<T, U>(
    iterable: Iterable<T> | ArrayLike<T>,
    mapFn: (v: T, k: number) => U,
    thisArg?: unknown
  ): U[];

  /**
   * ES2026: Creates an array from an async iterable
   */
  fromAsync<T>(
    iterable: AsyncIterable<T> | Iterable<T>,
    mapFn?: (v: T, k: number) => T | Promise<T>,
    thisArg?: unknown
  ): Promise<T[]>;

  fromAsync<T, U>(
    iterable: AsyncIterable<T> | Iterable<T>,
    mapFn: (v: T, k: number) => U | Promise<U>,
    thisArg?: unknown
  ): Promise<U[]>;

  /**
   * Type guard: returns true if arg is an array
   */
  isArray(arg: unknown): arg is unknown[];

  /**
   * Creates an array from arguments
   */
  of<T>(...items: T[]): T[];
}

// ─── 3h: Iterator Helpers ──────────────────────────────────────────────

/**
 * Static methods on Iterator (ES2025+)
 */
interface IteratorStaticMethods {
  /**
   * ES2025: Wraps any iterable as an Iterator with helper methods
   */
  from<T>(iterable: Iterable<T>): Iterator<T>;

  /**
   * ES2026: Chains multiple iterables into a single iterator
   */
  concat(...iterables: Iterable<any>[]): Iterator<any>;
}

/**
 * Instance methods on Iterator (ES2025+, lazy evaluation)
 */
interface IteratorInstanceMethods<T> {
  /**
   * Returns iterator of first N values
   */
  take(limit: number): Iterator<T>;

  /**
   * Returns iterator skipping first N values
   */
  drop(limit: number): Iterator<T>;

  /**
   * Returns iterator of transformed values
   */
  map<U>(fn: (value: T) => U): Iterator<U>;

  /**
   * Returns iterator of values where predicate is true
   */
  filter(predicate: (value: T) => boolean): Iterator<T>;

  /**
   * Returns iterator of mapped and flattened values
   */
  flatMap<U>(fn: (value: T) => Iterator<U>): Iterator<U>;

  /**
   * Returns first value where predicate is true
   */
  find(predicate: (value: T) => boolean): T | undefined;

  /**
   * Returns true if any value satisfies predicate
   */
  some(predicate: (value: T) => boolean): boolean;

  /**
   * Returns true if all values satisfy predicate
   */
  every(predicate: (value: T) => boolean): boolean;

  /**
   * Reduces iterator to a single value
   */
  reduce<U>(fn: (acc: U, value: T) => U, initialValue: U): U;

  /**
   * Executes callback for each value (consumes iterator)
   */
  forEach(fn: (value: T) => void): void;

  /**
   * Consumes entire iterator and returns array
   */
  toArray(): T[];
}

// ─── 3i: Adjacent APIs (ES2024–ES2026) ────────────────────────────────

/**
 * Adjacent APIs that consume arrays but live on other constructors
 */
interface AdjacentArrayAPIs {
  /**
   * ES2024: Groups iterable by key, returns object
   */
  'Object.groupBy'<T, K extends PropertyKey>(
    iterable: Iterable<T>,
    keySelector: (item: T, index: number) => K
  ): Record<K & PropertyKey, T[]>;

  /**
   * ES2024: Groups iterable by key, returns Map
   */
  'Map.groupBy'<T, K>(
    iterable: Iterable<T>,
    keySelector: (item: T, index: number) => K
  ): Map<K, T[]>;

  /**
   * ES2026: Sums iterable with Kahan-accurate floating-point
   */
  'Math.sumPrecise'(iterable: Iterable<number>): number;

  /**
   * ES2026: Decodes base64 string to Uint8Array
   */
  'Uint8Array.fromBase64'(
    input: string,
    options?: { lastChunkHandling?: 'loose' | 'strict' }
  ): Uint8Array;

  /**
   * ES2026: Decodes hex string to Uint8Array
   */
  'Uint8Array.fromHex'(input: string): Uint8Array;

  /**
   * ES2026: Encodes Uint8Array as base64 string
   */
  'uint8Array.toBase64'(
    array: Uint8Array,
    options?: { omitPadding?: boolean }
  ): string;

  /**
   * ES2026: Encodes Uint8Array as hex string
   */
  'uint8Array.toHex'(array: Uint8Array): string;
}

// ─── Combined Declarative Interface ────────────────────────────────────

/**
 * All non-mutating operations combined
 */
interface ArrayDeclarative<T>
  extends ArrayDeclarativeNewArray<T>,
    ArrayDeclarativeSearch<T>,
    ArrayDeclarativeReduce<T>,
    ArrayDeclarativePredicates<T>,
    ArrayDeclarativeStringify<T>,
    ArrayDeclarativeForEach<T> {}

// ─────────────────────────────────────────────────────────────────────────
// MASTER COMPOSITION: All Three Partitions United
// ─────────────────────────────────────────────────────────────────────────

/**
 * Complete Array<T> ecosystem: full TypeScript + JavaScript + future specs
 * Partition 1: Identity & Structure (what the array IS)
 * Partition 2: Imperative (what you DO to it)
 * Partition 3: Declarative (what you GET from it)
 *   3a–3e: Instance methods (new arrays, search, reduce, predicates, strings, forEach)
 *   3f: Side-effect iteration
 *   3g: Static constructors (Array.from, etc.)
 *   3h: Iterator helpers (lazy evaluation)
 *   3i: Adjacent APIs (Object.groupBy, Map.groupBy, Math.sumPrecise, Uint8Array)
 */
export interface Array<T>
  extends ArrayIdentity<T>,
    ArrayImperative<T>,
    ArrayDeclarative<T> {}

export interface ArrayConstructor extends ArrayStaticMethods {}

export interface Iterator<T> extends IteratorInstanceMethods<T> {}

// ─────────────────────────────────────────────────────────────────────────
// UTILITY TYPES (Consumed by array methods but defined externally)
// ─────────────────────────────────────────────────────────────────────────

/**
 * Helper type for concat() — array or array-like
 */
export type ConcatArray<T> = T[] | ArrayLike<T>;

/**
 * Helper type for flat() — recursively flattens nested arrays to specified depth
 * @example FlatArray<number[][], 1> = number[]
 * @example FlatArray<number[][][], 2> = number[]
 */
export type FlatArray<Arr, Depth extends number> = {
  done: Arr;
  recur: Arr extends ReadonlyArray<infer InnerArr>
    ? FlatArray<
        InnerArr,
        [
          -1,
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
        ][Depth]
      >
    : Arr;
}[Depth extends -1 ? 'done' : 'recur'];
