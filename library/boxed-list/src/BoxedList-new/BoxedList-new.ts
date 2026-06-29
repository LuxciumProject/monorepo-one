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
  // static ==========================================-| from() |-====
  public static from<TVal>(
    box: IUnbox<TVal> | IUnbox<TVal[]>
  ): BoxedList_new<TVal>;
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
  // static ============================================-| of() |-====
  public static of<TVal>(...values: [TVal[]]): BoxedList_new<TVal>;
  public static of<TVal>(...values: TVal[]): BoxedList_new<TVal>;
  public static of<TVal>(...values: TVal[] | [TVal[]]): BoxedList_new<TVal> {
    return new BoxedList_new<TVal>(BoxedList_new.normalize<TVal>(values));
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
  public unbox<R>(mapFn: (value: T) => R, thisArg?: any): R[];
  public unbox<R = T>(mapFn?: (value: T) => R, thisArg?: any): T[] | R[] {
    return mapFn !== undefined
      ? this._value.map(mapFn, thisArg)
      : this._value.slice();
  }
  get length(): number {
    return this._value.length;
  }

  /**
   * Combines two or more arrays.
   * This method returns a new array without modifying any existing arrays.
   * @param items Additional arrays and/or items to add to the end of the array.
   */
  concat(...items: ConcatArray<T>[]): BoxedList_new<T>;
  concat(...items: (T | ConcatArray<T>)[]): BoxedList_new<T> {
    return BoxedList_new.of(this._value.concat(...items));
  }
  /**
   * Returns a new array of elements where predicate is true (type guard variant)
   */
  filter<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any
  ): BoxedList_new<S>;

  /**
   * Returns a new array of elements where predicate is true
   */
  filter(
    predicate: (value: T, index: number, array: T[]) => unknown
  ): BoxedList_new<T> {
    return BoxedList_new.of(this._value.filter(predicate));
  }
  /**
   * ES2023: Returns a new reversed copy (does not mutate)
   */
  toReversed(): BoxedList_new<T> {
    return BoxedList_new.of(this._value.toReversed());
  }

  /**
   * Returns a shallow copy of a section of the array
   */
  slice(start?: number, end?: number): BoxedList_new<T> {
    return BoxedList_new.of(this._value.slice(start, end));
  }

  /**
   * ES2023: Returns a new sorted copy (does not mutate)
   */
  toSorted(compareFn?: (a: T, b: T) => number): BoxedList_new<T> {
    return BoxedList_new.of(this._value.toSorted(compareFn));
  }

  /**
   * ES2023: Returns a new copy with edits spliced in
   */

  toSpliced(start: number, deleteCount?: number): BoxedList_new<T>;
  toSpliced(
    start: number,
    deleteCount: number,
    ...items: T[]
  ): BoxedList_new<T>;
  toSpliced(
    start: number,
    deleteCount: number = Infinity,
    ...items: T[]
  ): BoxedList_new<T> {
    return BoxedList_new.of(
      this._value.toSpliced(start, deleteCount, ...items)
    );
  }
  /**
   * ES2023: Returns a new copy with one element replaced
   */
  with(index: number, value: T): BoxedList_new<T> {
    return BoxedList_new.of(this._value.with(index, value));
  }
  /**
   * Default iterator (same as values())
   */
  *[Symbol.iterator](): IterableIterator<T> {
    yield* this._value;
  }
  /**
   * Creates an array from an async iterator or iterable object.
   * @param iterableOrArrayLike An async iterator or array-like object to convert to an array.
   */
  static async fromAsync<T>(
    iterableOrArrayLike: Iterable<T> | AsyncIterable<T>
    // | Iterable<PromiseLike<T>>
  ): Promise<BoxedList_new<T>> {
    if (BoxedList_new.isIterable(iterableOrArrayLike)) {
      return BoxedList_new.of(...iterableOrArrayLike);
    }
    if (BoxedList_new.isAsyncIterable(iterableOrArrayLike)) {
      return BoxedList_new.of(...(await Array.fromAsync(iterableOrArrayLike)));
    }
    throw 'NEVER';
  }

  // will prune later usefull for now dond mind thsoe for the time being:::
  private static isPromiseLike(value: any): value is PromiseLike<any> {
    return value != null && typeof value.then === 'function';
  }

  private static isAsyncIterable<T>(value: any): value is AsyncIterable<T> {
    return value != null && typeof value[Symbol.asyncIterator] === 'function';
  }

  private static isIterable<T>(value: any): value is Iterable<T> {
    return value != null && typeof value[Symbol.iterator] === 'function';
  }

  private static isArrayLike<T>(value: any): value is ArrayLike<T> {
    // Exclude strings since they have a .length but are usually treated as primitives
    return (
      value != null &&
      typeof value.length === 'number' &&
      typeof value !== 'string'
    );
  }
  protected static determineCollectionType(value: any): CollectionType {
    // 1. Check for AsyncIterable first
    if (this.isAsyncIterable(value)) {
      return 'AsyncIterable';
    }

    // 2. Check for Iterable (and peek inside for Promises)
    if (this.isIterable(value)) {
      // To separate Iterable<T> from Iterable<PromiseLike<T>>, we inspect the first item.
      // NOTE: If this is a one-time Generator, peeking will advance the iterator!
      try {
        const iterator = value[Symbol.iterator]();
        const firstResult = iterator.next();

        if (!firstResult.done && this.isPromiseLike(firstResult.value)) {
          return 'IterableOfPromises';
        }
      } catch {
        // If iterating throws an error, fallback to standard Iterable
      }
      return 'Iterable';
    }

    // 3. Check for ArrayLike (e.g., arguments object, DOM NodeLists)
    if (this.isArrayLike(value)) {
      return 'ArrayLike';
    }

    return 'Unknown';
  }
}
// ~@=================================================================
// ~& class end                                                      !
// ~@=================================================================

// Define a clear return type for our discriminator
export type CollectionType =
  | 'AsyncIterable'
  | 'IterableOfPromises'
  | 'Iterable'
  | 'ArrayLike'
  | 'Unknown';

export type IterableOrArrayPromiseLike<T> =
  | AsyncIterable<T>
  | Iterable<T | PromiseLike<T>>
  | ArrayLike<T | PromiseLike<T>>;
export type IterableOrArrayLike<T> =
  | AsyncIterable<T>
  | Iterable<T>
  | ArrayLike<T>;
Array;
export interface Array<T> {
  /**
   * Gets or sets the length of the array. This is a number one higher than the highest index in the array.
   */
  length: number;
  /**
   * Returns a string representation of an array.
   */
  toString(): string;
  /**
   * Returns a string representation of an array. The elements are converted to string using their toLocaleString methods.
   */
  toLocaleString(): string;
  /**
   * Removes the last element from an array and returns it.
   * If the array is empty, undefined is returned and the array is not modified.
   */
  pop(): T | undefined;
  /**
   * Appends new elements to the end of an array, and returns the new length of the array.
   * @param items New elements to add to the array.
   */
  push(...items: T[]): number;
  /**
   * Combines two or more arrays.
   * This method returns a new array without modifying any existing arrays.
   * @param items Additional arrays and/or items to add to the end of the array.
   */
  concat(...items: ConcatArray<T>[]): T[];
  /**
   * Combines two or more arrays.
   * This method returns a new array without modifying any existing arrays.
   * @param items Additional arrays and/or items to add to the end of the array.
   */
  concat(...items: (T | ConcatArray<T>)[]): T[];
  /**
   * Adds all the elements of an array into a string, separated by the specified separator string.
   * @param separator A string used to separate one element of the array from the next in the resulting string. If omitted, the array elements are separated with a comma.
   */
  join(separator?: string): string;
  /**
   * Reverses the elements in an array in place.
   * This method mutates the array and returns a reference to the same array.
   */
  reverse(): T[];
  /**
   * Removes the first element from an array and returns it.
   * If the array is empty, undefined is returned and the array is not modified.
   */
  shift(): T | undefined;
  /**
   * Returns a copy of a section of an array.
   * For both start and end, a negative index can be used to indicate an offset from the end of the array.
   * For example, -2 refers to the second to last element of the array.
   * @param start The beginning index of the specified portion of the array.
   * If start is undefined, then the slice begins at index 0.
   * @param end The end index of the specified portion of the array. This is exclusive of the element at the index 'end'.
   * If end is undefined, then the slice extends to the end of the array.
   */
  slice(start?: number, end?: number): T[];
  /**
   * Sorts an array in place.
   * This method mutates the array and returns a reference to the same array.
   * @param compareFn Function used to determine the order of the elements. It is expected to return
   * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
   * value otherwise. If omitted, the elements are sorted in ascending, UTF-16 code unit order.
   * ```ts
   * [11,2,22,1].sort((a, b) => a - b)
   * ```
   */
  sort(compareFn?: (a: T, b: T) => number): this;
  /**
   * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
   * @param start The zero-based location in the array from which to start removing elements.
   * @param deleteCount The number of elements to remove. Omitting this argument will remove all elements from the start
   * paramater location to end of the array. If value of this argument is either a negative number, zero, undefined, or a type
   * that cannot be converted to an integer, the function will evaluate the argument as zero and not remove any elements.
   * @returns An array containing the elements that were deleted.
   */
  splice(start: number, deleteCount?: number): T[];
  /**
   * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
   * @param start The zero-based location in the array from which to start removing elements.
   * @param deleteCount The number of elements to remove. If value of this argument is either a negative number, zero,
   * undefined, or a type that cannot be converted to an integer, the function will evaluate the argument as zero and
   * not remove any elements.
   * @param items Elements to insert into the array in place of the deleted elements.
   * @returns An array containing the elements that were deleted.
   */
  splice(start: number, deleteCount: number, ...items: T[]): T[];
  /**
   * Inserts new elements at the start of an array, and returns the new length of the array.
   * @param items Elements to insert at the start of the array.
   */
  unshift(...items: T[]): number;
  /**
   * Returns the index of the first occurrence of a value in an array, or -1 if it is not present.
   * @param searchElement The value to locate in the array.
   * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
   */
  indexOf(searchElement: T, fromIndex?: number): number;
  /**
   * Returns the index of the last occurrence of a specified value in an array, or -1 if it is not present.
   * @param searchElement The value to locate in the array.
   * @param fromIndex The array index at which to begin searching backward. If fromIndex is omitted, the search starts at the last index in the array.
   */
  lastIndexOf(searchElement: T, fromIndex?: number): number;
  /**
   * Determines whether all the members of an array satisfy the specified test.
   * @param predicate A function that accepts up to three arguments. The every method calls
   * the predicate function for each element in the array until the predicate returns a value
   * which is coercible to the Boolean value false, or until the end of the array.
   * @param thisArg An object to which the this keyword can refer in the predicate function.
   * If thisArg is omitted, undefined is used as the this value.
   */
  every<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any
  ): this is S[];
  /**
   * Determines whether all the members of an array satisfy the specified test.
   * @param predicate A function that accepts up to three arguments. The every method calls
   * the predicate function for each element in the array until the predicate returns a value
   * which is coercible to the Boolean value false, or until the end of the array.
   * @param thisArg An object to which the this keyword can refer in the predicate function.
   * If thisArg is omitted, undefined is used as the this value.
   */
  every(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): boolean;
  /**
   * Determines whether the specified callback function returns true for any element of an array.
   * @param predicate A function that accepts up to three arguments. The some method calls
   * the predicate function for each element in the array until the predicate returns a value
   * which is coercible to the Boolean value true, or until the end of the array.
   * @param thisArg An object to which the this keyword can refer in the predicate function.
   * If thisArg is omitted, undefined is used as the this value.
   */
  some(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): boolean;
  /**
   * Performs the specified action for each element in an array.
   * @param callbackfn A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   */
  forEach(
    callbackfn: (value: T, index: number, array: T[]) => void,
    thisArg?: any
  ): void;
  /**
   * Calls a defined callback function on each element of an array, and returns an array that contains the results.
   * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   */
  map<U>(
    callbackfn: (value: T, index: number, array: T[]) => U,
    thisArg?: any
  ): U[];
  /**
   * Returns the elements of an array that meet the condition specified in a callback function.
   * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
   */
  filter<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any
  ): S[];
  /**
   * Returns the elements of an array that meet the condition specified in a callback function.
   * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
   */
  filter(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): T[];
  /**
   * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
   * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
   */
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
  /**
   * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
   * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
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
   * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
   * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
   */
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
  /**
   * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
   * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
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

  [n: number]: T;
}

export interface Array15<T> {
  /**
   * Returns the value of the first element in the array where predicate is true, and undefined
   * otherwise.
   * @param predicate find calls predicate once for each element of the array, in ascending
   * order, until it finds one where predicate returns true. If such an element is found, find
   * immediately returns that element value. Otherwise, find returns undefined.
   * @param thisArg If provided, it will be used as the this value for each invocation of
   * predicate. If it is not provided, undefined is used instead.
   */
  find<S extends T>(
    predicate: (value: T, index: number, obj: T[]) => value is S,
    thisArg?: any
  ): S | undefined;
  find(
    predicate: (value: T, index: number, obj: T[]) => unknown,
    thisArg?: any
  ): T | undefined;

  /**
   * Returns the index of the first element in the array where predicate is true, and -1
   * otherwise.
   * @param predicate find calls predicate once for each element of the array, in ascending
   * order, until it finds one where predicate returns true. If such an element is found,
   * findIndex immediately returns that element index. Otherwise, findIndex returns -1.
   * @param thisArg If provided, it will be used as the this value for each invocation of
   * predicate. If it is not provided, undefined is used instead.
   */
  findIndex(
    predicate: (value: T, index: number, obj: T[]) => unknown,
    thisArg?: any
  ): number;

  /**
   * Changes all array elements from `start` to `end` index to a static `value` and returns the modified array
   * @param value value to fill array section with
   * @param start index to start filling the array at. If start is negative, it is treated as
   * length+start where length is the length of the array.
   * @param end index to stop filling the array at. If end is negative, it is treated as
   * length+end.
   */
  fill(value: T, start?: number, end?: number): this;

  /**
   * Returns the this object after copying a section of the array identified by start and end
   * to the same array starting at position target
   * @param target If target is negative, it is treated as length+target where length is the
   * length of the array.
   * @param start If start is negative, it is treated as length+start. If end is negative, it
   * is treated as length+end.
   * @param end If not specified, length of the this object is used as its default value.
   */
  copyWithin(target: number, start: number, end?: number): this;

  toLocaleString(
    locales: string | string[],
    options?: Intl.NumberFormatOptions & Intl.DateTimeFormatOptions
  ): string;
}

export interface Array15i<T> {
  /**
   * Is an object whose properties have the value 'true'
   * when they will be absent when used in a 'with' statement.
   */
  readonly [Symbol.unscopables]: {
    [K in keyof any[]]?: boolean;
  };
}
export interface Array16<T> {
  /**
   * Determines whether an array includes a certain element, returning true or false as appropriate.
   * @param searchElement The element to search for.
   * @param fromIndex The position in this array at which to begin searching for searchElement.
   */
  includes(searchElement: T, fromIndex?: number): boolean;
}
export interface Array19<T> {
  /**
   * Calls a defined callback function on each element of an array. Then, flattens the result into
   * a new array.
   * This is identical to a map followed by flat with depth 1.
   *
   * @param callback A function that accepts up to three arguments. The flatMap method calls the
   * callback function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the callback function. If
   * thisArg is omitted, undefined is used as the this value.
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
   * Returns a new array with all sub-array elements concatenated into it recursively up to the
   * specified depth.
   *
   * @param depth The maximum recursion depth
   */
  flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];
}
export interface Array22<T> {
  /**
   * Returns the item located at the specified index.
   * @param index The zero-based index of the desired code unit. A negative index will count back from the last item.
   */
  at(index: number): T | undefined;
}

export interface Array23<T> {
  /**
   * Returns the value of the last element in the array where predicate is true, and undefined
   * otherwise.
   * @param predicate findLast calls predicate once for each element of the array, in descending
   * order, until it finds one where predicate returns true. If such an element is found, findLast
   * immediately returns that element value. Otherwise, findLast returns undefined.
   * @param thisArg If provided, it will be used as the this value for each invocation of
   * predicate. If it is not provided, undefined is used instead.
   */
  findLast<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any
  ): S | undefined;
  findLast(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): T | undefined;

  /**
   * Returns the index of the last element in the array where predicate is true, and -1
   * otherwise.
   * @param predicate findLastIndex calls predicate once for each element of the array, in descending
   * order, until it finds one where predicate returns true. If such an element is found,
   * findLastIndex immediately returns that element index. Otherwise, findLastIndex returns -1.
   * @param thisArg If provided, it will be used as the this value for each invocation of
   * predicate. If it is not provided, undefined is used instead.
   */
  findLastIndex(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): number;

  /**
   * Returns a copy of an array with its elements reversed.
   */
  toReversed(): T[];

  /**
   * Returns a copy of an array with its elements sorted.
   * @param compareFn Function used to determine the order of the elements. It is expected to return
   * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
   * value otherwise. If omitted, the elements are sorted in ascending, UTF-16 code unit order.
   * ```ts
   * [11, 2, 22, 1].toSorted((a, b) => a - b) // [1, 2, 11, 22]
   * ```
   */
  toSorted(compareFn?: (a: T, b: T) => number): T[];

  /**
   * Copies an array and removes elements and, if necessary, inserts new elements in their place. Returns the copied array.
   * @param start The zero-based location in the array from which to start removing elements.
   * @param deleteCount The number of elements to remove.
   * @param items Elements to insert into the copied array in place of the deleted elements.
   * @returns The copied array.
   */
  toSpliced(start: number, deleteCount: number, ...items: T[]): T[];

  /**
   * Copies an array and removes elements while returning the remaining elements.
   * @param start The zero-based location in the array from which to start removing elements.
   * @param deleteCount The number of elements to remove.
   * @returns A copy of the original array with the remaining elements.
   */
  toSpliced(start: number, deleteCount?: number): T[];

  /**
   * Copies an array, then overwrites the value at the provided index with the
   * given value. If the index is negative, then it replaces from the end
   * of the array.
   * @param index The index of the value to overwrite. If the index is
   * negative, then it replaces from the end of the array.
   * @param value The value to write into the copied array.
   * @returns The copied array with the updated value.
   */
  with(index: number, value: T): T[];
}
