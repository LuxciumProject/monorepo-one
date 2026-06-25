// =============================================================================
// Unified Array<T> interface
// Sources: lib.es5, lib.es2015.core, lib.es2015.symbol.wellknown,
//          lib.es2016.array.include, lib.es2019.array,
//          lib.es2022.array, lib.es2023.array
// Sections follow: Instance Properties · Mutating Methods ·
//   Non-Mutating: New Array · Non-Mutating: Iterator ·
//   Non-Mutating: Scalar/Boolean · Iterator Helpers ·
//   Adjacent APIs · TypeScript Types
// =============================================================================

export interface Array<T> {

  // ── Instance Properties ──────────────────────────────────────────────────
  //   length, numeric index signature, symbol-keyed metadata.

  /**
   * Gets or sets the length of the array. This is a number one higher than the highest index in
   * the array.
   */
  length: number;

  [n: number]: T;

  /**
   * Is an object whose properties have the value 'true' when they will be absent when used in a
   * 'with' statement.
   */
  readonly [Symbol.unscopables]: {
    [K in keyof any[]]?: boolean;
  };

  // ── Mutating Methods ─────────────────────────────────────────────────────
  //   All modify the receiver in place; return this, a removed element, or a
  //   count.  Alphabetical within the section.

  /**
   * Returns the this object after copying a section of the array identified by start and end
   * to the same array starting at position target.
   * @param target If target is negative, it is treated as length+target where length is the
   * length of the array.
   * @param start If start is negative, it is treated as length+start. If end is negative, it
   * is treated as length+end.
   * @param end If not specified, length of the this object is used as its default value.
   */
  copyWithin(target: number, start: number, end?: number): this;

  /**
   * Changes all array elements from `start` to `end` index to a static `value` and returns the
   * modified array.
   * @param value value to fill array section with
   * @param start index to start filling the array at. If start is negative, it is treated as
   * length+start where length is the length of the array.
   * @param end index to stop filling the array at. If end is negative, it is treated as
   * length+end.
   */
  fill(value: T, start?: number, end?: number): this;

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
   * Sorts an array in place.
   * This method mutates the array and returns a reference to the same array.
   * @param compareFn Function used to determine the order of the elements. It is expected to
   * return a negative value if the first argument is less than the second argument, zero if
   * they're equal, and a positive value otherwise. If omitted, the elements are sorted in
   * ascending, UTF-16 code unit order.
   * ```ts
   * [11,2,22,1].sort((a, b) => a - b)
   * ```
   */
  sort(compareFn?: (a: T, b: T) => number): this;

  /**
   * Removes elements from an array and, if necessary, inserts new elements in their place,
   * returning the deleted elements.
   * @param start The zero-based location in the array from which to start removing elements.
   * @param deleteCount The number of elements to remove. Omitting this argument will remove all
   * elements from the start parameter location to end of the array. If value of this argument is
   * either a negative number, zero, undefined, or a type that cannot be converted to an integer,
   * the function will evaluate the argument as zero and not remove any elements.
   * @returns An array containing the elements that were deleted.
   */
  splice(start: number, deleteCount?: number): T[];

  /**
   * Removes elements from an array and, if necessary, inserts new elements in their place,
   * returning the deleted elements.
   * @param start The zero-based location in the array from which to start removing elements.
   * @param deleteCount The number of elements to remove. If value of this argument is either a
   * negative number, zero, undefined, or a type that cannot be converted to an integer, the
   * function will evaluate the argument as zero and not remove any elements.
   * @param items Elements to insert into the array in place of the deleted elements.
   * @returns An array containing the elements that were deleted.
   */
  splice(start: number, deleteCount: number, ...items: T[]): T[];

  /**
   * Inserts new elements at the start of an array, and returns the new length of the array.
   * @param items Elements to insert at the start of the array.
   */
  unshift(...items: T[]): number;

  // ── Non-Mutating: New Array ──────────────────────────────────────────────
  //   Return a new array; the receiver is never modified.  Alphabetical.

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
   * Returns the elements of an array that meet the condition specified in a callback function.
   * @param predicate A function that accepts up to three arguments. The filter method calls the
   * predicate function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the predicate function.
   * If thisArg is omitted, undefined is used as the this value.
   */
  filter<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any
  ): S[];

  /**
   * Returns the elements of an array that meet the condition specified in a callback function.
   * @param predicate A function that accepts up to three arguments. The filter method calls the
   * predicate function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the predicate function.
   * If thisArg is omitted, undefined is used as the this value.
   */
  filter(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): T[];

  /**
   * Returns a new array with all sub-array elements concatenated into it recursively up to the
   * specified depth.
   * @param depth The maximum recursion depth
   */
  flat<A, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];

  /**
   * Calls a defined callback function on each element of an array. Then, flattens the result
   * into a new array. This is identical to a map followed by flat with depth 1.
   * @param callback A function that accepts up to three arguments. The flatMap method calls the
   * callback function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the callback function.
   * If thisArg is omitted, undefined is used as the this value.
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
   * Calls a defined callback function on each element of an array, and returns an array that
   * contains the results.
   * @param callbackfn A function that accepts up to three arguments. The map method calls the
   * callbackfn function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the callbackfn function.
   * If thisArg is omitted, undefined is used as the this value.
   */
  map<U>(
    callbackfn: (value: T, index: number, array: T[]) => U,
    thisArg?: any
  ): U[];

  /**
   * Returns a copy of a section of an array.
   * For both start and end, a negative index can be used to indicate an offset from the end of
   * the array. For example, -2 refers to the second to last element of the array.
   * @param start The beginning index of the specified portion of the array.
   * If start is undefined, then the slice begins at index 0.
   * @param end The end index of the specified portion of the array. This is exclusive of the
   * element at the index 'end'. If end is undefined, then the slice extends to the end of the
   * array.
   */
  slice(start?: number, end?: number): T[];

  /**
   * Returns a copy of an array with its elements reversed.
   */
  toReversed(): T[];

  /**
   * Returns a copy of an array with its elements sorted.
   * @param compareFn Function used to determine the order of the elements. It is expected to
   * return a negative value if the first argument is less than the second argument, zero if
   * they're equal, and a positive value otherwise. If omitted, the elements are sorted in
   * ascending, UTF-16 code unit order.
   * ```ts
   * [11, 2, 22, 1].toSorted((a, b) => a - b) // [1, 2, 11, 22]
   * ```
   */
  toSorted(compareFn?: (a: T, b: T) => number): T[];

  /**
   * Copies an array and removes elements and, if necessary, inserts new elements in their place.
   * Returns the copied array.
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
   * Copies an array, then overwrites the value at the provided index with the given value.
   * If the index is negative, then it replaces from the end of the array.
   * @param index The index of the value to overwrite. If the index is negative, then it replaces
   * from the end of the array.
   * @param value The value to write into the copied array.
   * @returns The copied array with the updated value.
   */
  with(index: number, value: T): T[];

  // ── Non-Mutating: Iterator ───────────────────────────────────────────────
  //   entries(), keys(), values(), [Symbol.iterator]() — defined in
  //   lib.es2015.iterable.d.ts; not present in the source fragments merged here.

  // ── Non-Mutating: Scalar / Boolean ──────────────────────────────────────
  //   Return a single value (element, index, string, boolean) or void.
  //   Alphabetical; overload pairs kept together.

  /**
   * Returns the item located at the specified index.
   * @param index The zero-based index of the desired code unit. A negative index will count back
   * from the last item.
   */
  at(index: number): T | undefined;

  /**
   * Determines whether all the members of an array satisfy the specified test.
   * @param predicate A function that accepts up to three arguments. The every method calls the
   * predicate function for each element in the array until the predicate returns a value which is
   * coercible to the Boolean value false, or until the end of the array.
   * @param thisArg An object to which the this keyword can refer in the predicate function.
   * If thisArg is omitted, undefined is used as the this value.
   */
  every<S extends T>(
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any
  ): this is S[];

  /**
   * Determines whether all the members of an array satisfy the specified test.
   * @param predicate A function that accepts up to three arguments. The every method calls the
   * predicate function for each element in the array until the predicate returns a value which is
   * coercible to the Boolean value false, or until the end of the array.
   * @param thisArg An object to which the this keyword can refer in the predicate function.
   * If thisArg is omitted, undefined is used as the this value.
   */
  every(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): boolean;

  /**
   * Returns the value of the first element in the array where predicate is true, and undefined
   * otherwise.
   * @param predicate find calls predicate once for each element of the array, in ascending order,
   * until it finds one where predicate returns true. If such an element is found, find immediately
   * returns that element value. Otherwise, find returns undefined.
   * @param thisArg If provided, it will be used as the this value for each invocation of
   * predicate. If it is not provided, undefined is used instead.
   */
  find<S extends T>(
    predicate: (value: T, index: number, obj: T[]) => value is S,
    thisArg?: any
  ): S | undefined;

  /**
   * Returns the value of the first element in the array where predicate is true, and undefined
   * otherwise.
   * @param predicate find calls predicate once for each element of the array, in ascending order,
   * until it finds one where predicate returns true. If such an element is found, find immediately
   * returns that element value. Otherwise, find returns undefined.
   * @param thisArg If provided, it will be used as the this value for each invocation of
   * predicate. If it is not provided, undefined is used instead.
   */
  find(
    predicate: (value: T, index: number, obj: T[]) => unknown,
    thisArg?: any
  ): T | undefined;

  /**
   * Returns the index of the first element in the array where predicate is true, and -1
   * otherwise.
   * @param predicate find calls predicate once for each element of the array, in ascending order,
   * until it finds one where predicate returns true. If such an element is found, findIndex
   * immediately returns that element index. Otherwise, findIndex returns -1.
   * @param thisArg If provided, it will be used as the this value for each invocation of
   * predicate. If it is not provided, undefined is used instead.
   */
  findIndex(
    predicate: (value: T, index: number, obj: T[]) => unknown,
    thisArg?: any
  ): number;

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

  /**
   * Returns the value of the last element in the array where predicate is true, and undefined
   * otherwise.
   * @param predicate findLast calls predicate once for each element of the array, in descending
   * order, until it finds one where predicate returns true. If such an element is found, findLast
   * immediately returns that element value. Otherwise, findLast returns undefined.
   * @param thisArg If provided, it will be used as the this value for each invocation of
   * predicate. If it is not provided, undefined is used instead.
   */
  findLast(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): T | undefined;

  /**
   * Returns the index of the last element in the array where predicate is true, and -1
   * otherwise.
   * @param predicate findLastIndex calls predicate once for each element of the array, in
   * descending order, until it finds one where predicate returns true. If such an element is
   * found, findLastIndex immediately returns that element index. Otherwise, findLastIndex
   * returns -1.
   * @param thisArg If provided, it will be used as the this value for each invocation of
   * predicate. If it is not provided, undefined is used instead.
   */
  findLastIndex(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): number;

  /**
   * Performs the specified action for each element in an array.
   * @param callbackfn A function that accepts up to three arguments. forEach calls the callbackfn
   * function one time for each element in the array.
   * @param thisArg An object to which the this keyword can refer in the callbackfn function.
   * If thisArg is omitted, undefined is used as the this value.
   */
  forEach(
    callbackfn: (value: T, index: number, array: T[]) => void,
    thisArg?: any
  ): void;

  /**
   * Determines whether an array includes a certain element, returning true or false as
   * appropriate.
   * @param searchElement The element to search for.
   * @param fromIndex The position in this array at which to begin searching for searchElement.
   */
  includes(searchElement: T, fromIndex?: number): boolean;

  /**
   * Returns the index of the first occurrence of a value in an array, or -1 if it is not
   * present.
   * @param searchElement The value to locate in the array.
   * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the
   * search starts at index 0.
   */
  indexOf(searchElement: T, fromIndex?: number): number;

  /**
   * Adds all the elements of an array into a string, separated by the specified separator string.
   * @param separator A string used to separate one element of the array from the next in the
   * resulting string. If omitted, the array elements are separated with a comma.
   */
  join(separator?: string): string;

  /**
   * Returns the index of the last occurrence of a specified value in an array, or -1 if it is
   * not present.
   * @param searchElement The value to locate in the array.
   * @param fromIndex The array index at which to begin searching backward. If fromIndex is
   * omitted, the search starts at the last index in the array.
   */
  lastIndexOf(searchElement: T, fromIndex?: number): number;

  /**
   * Calls the specified callback function for all the elements in an array. The return value of
   * the callback function is the accumulated result, and is provided as an argument in the next
   * call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
   * callbackfn function one time for each element in the array.
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
   * Calls the specified callback function for all the elements in an array. The return value of
   * the callback function is the accumulated result, and is provided as an argument in the next
   * call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
   * callbackfn function one time for each element in the array.
   * @param initialValue If initialValue is specified, it is used as the initial value to start
   * the accumulation. The first call to the callbackfn function provides this value as an
   * argument instead of an array value.
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
   * Calls the specified callback function for all the elements in an array. The return value of
   * the callback function is the accumulated result, and is provided as an argument in the next
   * call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduce method calls the
   * callbackfn function one time for each element in the array.
   * @param initialValue If initialValue is specified, it is used as the initial value to start
   * the accumulation. The first call to the callbackfn function provides this value as an
   * argument instead of an array value.
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
   * Calls the specified callback function for all the elements in an array, in descending order.
   * The return value of the callback function is the accumulated result, and is provided as an
   * argument in the next call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
   * the callbackfn function one time for each element in the array.
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
   * Calls the specified callback function for all the elements in an array, in descending order.
   * The return value of the callback function is the accumulated result, and is provided as an
   * argument in the next call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
   * the callbackfn function one time for each element in the array.
   * @param initialValue If initialValue is specified, it is used as the initial value to start
   * the accumulation. The first call to the callbackfn function provides this value as an
   * argument instead of an array value.
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
   * Calls the specified callback function for all the elements in an array, in descending order.
   * The return value of the callback function is the accumulated result, and is provided as an
   * argument in the next call to the callback function.
   * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls
   * the callbackfn function one time for each element in the array.
   * @param initialValue If initialValue is specified, it is used as the initial value to start
   * the accumulation. The first call to the callbackfn function provides this value as an
   * argument instead of an array value.
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

  /**
   * Determines whether the specified callback function returns true for any element of an array.
   * @param predicate A function that accepts up to three arguments. The some method calls the
   * predicate function for each element in the array until the predicate returns a value which is
   * coercible to the Boolean value true, or until the end of the array.
   * @param thisArg An object to which the this keyword can refer in the predicate function.
   * If thisArg is omitted, undefined is used as the this value.
   */
  some(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): boolean;

  /**
   * Returns a string representation of an array. The elements are converted to string using
   * their toLocaleString methods.
   */
  toLocaleString(): string;

  /**
   * Returns a string representation of an array. The elements are converted to string using
   * their toLocaleString methods.
   */
  toLocaleString(
    locales: string | string[],
    options?: Intl.NumberFormatOptions & Intl.DateTimeFormatOptions
  ): string;

  /**
   * Returns a string representation of an array.
   */
  toString(): string;

  // ── Iterator Helpers ─────────────────────────────────────────────────────
  //   Iterator.prototype.{map,filter,take,drop,flatMap,reduce,toArray,…} —
  //   TC39 Stage 4; defined in lib.esnext.iterator.d.ts.
  //   Not present in the source fragments merged here.

  // ── Adjacent APIs ────────────────────────────────────────────────────────
  //   ArrayConstructor (Array.from, Array.fromAsync, Array.isArray, Array.of)
  //   lives on a separate ArrayConstructor interface and is not merged here.
  //   ReadonlyArray<T>, ConcatArray<T>, and TypedArrays are also adjacent but
  //   separate.

  // ── TypeScript Types ─────────────────────────────────────────────────────
  //   FlatArray<A, D>  — depth-recursive utility type consumed by flat();
  //   defined externally in lib.es2019.array.d.ts.
  //   Type-predicate overloads (value is S / this is S[]) appear inline above
  //   on: every, filter, find, findLast.
}
