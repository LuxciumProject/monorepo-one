// @/BoxedList-new/main-BoxedList-new.ts
import { BoxedList_new } from './BoxedList-new';

// 1. Instantiation using .of()
const list1 = BoxedList_new.of(1, 2, 3); // Internal: [1, 2, 3]
const list2 = BoxedList_new.of([4, 5, 6]); // Internal: [4, 5, 6] (Nested tuple caught)

// 2. Mapping
const doubledList = list1.mapItems(x => x * 2); // Returns new BoxedList_new

// 3. Unboxing (with or without transformation)
const rawArray1 = doubledList.unbox(); // [2, 4, 6]
const stringArray = doubledList.unbox(String); // ["2", "4", "6"]

// 4. Instantiation using .from()
const fun = (x: number) => x + 10;
const listFromOther1 = BoxedList_new.from(list2); // Internal: [11, 12, 13]
const listFromOther2 = BoxedList_new.from(list2, fun); // Internal: [11, 12, 13]
console.log(...listFromOther2);
//  exemple to help me undertand the method relations ship due to the union TVal | TVal[]
function processData<T, R>(values: T[], fn: (val: T) => R): R[] {
  return values.map(fn);
}
processData([1, 2, 3], x => x + 2);

fun;
list2;
rawArray1;
stringArray;
listFromOther1;
listFromOther2;

// Define a clear return type for our discriminator
export type CollectionType =
  | 'AsyncIterable'
  | 'IterableOfPromises'
  | 'Iterable'
  | 'ArrayLike'
  | 'Unknown';

/**
 * Individual Runtime Type Guards
 */
export function isPromiseLike(value: any): value is PromiseLike<any> {
  return value != null && typeof value.then === 'function';
}

export function isAsyncIterable<T>(value: any): value is AsyncIterable<T> {
  return value != null && typeof value[Symbol.asyncIterator] === 'function';
}

export function isIterable<T>(value: any): value is Iterable<T> {
  return value != null && typeof value[Symbol.iterator] === 'function';
}

export function isArrayLike<T>(value: any): value is ArrayLike<T> {
  // Exclude strings since they have a .length but are usually treated as primitives
  return (
    value != null &&
    typeof value.length === 'number' &&
    typeof value !== 'string'
  );
}
export async function* toAsyncIterable<T>(
  iterable: Iterable<PromiseLike<T>>
): AsyncIterable<T> {
  for (const promiseLike of iterable) {
    yield await promiseLike;
  }
}
/**
 * Main Discriminator Function
 */
export function determineCollectionType(value: any): CollectionType {
  // 1. Check for AsyncIterable first
  if (isAsyncIterable(value)) {
    return 'AsyncIterable';
  }

  // 2. Check for Iterable (and peek inside for Promises)
  if (isIterable(value)) {
    // To separate Iterable<T> from Iterable<PromiseLike<T>>, we inspect the first item.
    // NOTE: If this is a one-time Generator, peeking will advance the iterator!
    try {
      const iterator = value[Symbol.iterator]();
      const firstResult = iterator.next();

      if (!firstResult.done && isPromiseLike(firstResult.value)) {
        return 'IterableOfPromises';
      }
    } catch {
      // If iterating throws an error, fallback to standard Iterable
    }
    return 'Iterable';
  }

  // 3. Check for ArrayLike (e.g., arguments object, DOM NodeLists)
  if (isArrayLike(value)) {
    return 'ArrayLike';
  }

  return 'Unknown';
}

// --- Test Cases ---

// 1. AsyncIterable
async function* asyncGen() {
  yield 1;
}
console.log(determineCollectionType(asyncGen())); // "AsyncIterable"

// 2. Iterable<PromiseLike<T>>
const promiseArray = [Promise.resolve(1), Promise.resolve(2)];
console.log(determineCollectionType(promiseArray)); // "IterableOfPromises"

// 3. Iterable<T>
const normalSet = new Set([1, 2, 3]);
console.log(determineCollectionType(normalSet)); // "Iterable"

// 4. ArrayLike<T>
const arrayLike = { length: 3, 0: 'a', 1: 'b', 2: 'c' };
console.log(determineCollectionType(arrayLike)); // "ArrayLike"
