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
  ) {
    const unbox: TVal | TVal[] = box.unbox();
    return BoxedList.of<TVal>(unbox as TVal);
  }
  public static from2<TVal>(
    box: IUnbox<TVal> | IUnbox<TVal[]> | IUnboxList<TVal>
  ): BoxedList<TVal> {
    const unbox = box.unbox();
    if (Array.isArray(unbox)) {
      return BoxedList.of(...unbox);
    } else {
      return BoxedList.of(unbox);
    }
  }
  // protected ================================-| constructor() |-====
  protected constructor(value: T[]) {
    this.#value = value;
    return this;
  }

  // public =======================================-| entries() |-====
  public entries(): IterableIterator<[number, T]> {
    return this.list.entries();
  }

  // public ==========================================-| keys() |-====
  public keys(): IterableIterator<number> {
    return this.list.keys();
  }

  // public ========================================-| values() |-====
  public values(): IterableIterator<T> {
    return this.list.values();
  }

  // ============================================-| [n: number] |-====
  // readonly [n: number]: T;

  // iterator ==========================-| *[Symbol.iterator]() |-====
  public *[Symbol.iterator](): Generator<T, void, undefined> {
    yield* this.#value;
  }
  /*
## Methods that return a new array and do not mutate the original array

- concat ― Returns a new array that is the result of merging two or more arrays.
- filter ― Returns a new array with all elements that pass the test implemented by the provided function.
- flat ― Returns a new array with all sub-array elements concatenated into it recursively up to the specified depth.
- flatMap ― Returns a new array formed by applying a given function to each element of the array, and then flattening the result by one level.
- map ― Returns a new array with the results of calling a provided function on every element in the calling array.
- slice ― Returns a new array with a shallow copy of a portion of the original array, selected from start to end (end not included).
- toSorted ― Returns a new array with the elements sorted in ascending order.
- toSpliced ― Returns a new array with elements added or removed without modifying the original array.

## Methods that mutate the array in place

- copyWithin ― Modifies the array by copying a sequence of elements within the array to another position in the same array.
- fill ― Modifies the array by filling all the elements from a start index to an end index with a static value.
- pop ― Modifies the array by removing the last element and returns that element.
- push ― Modifies the array by adding one or more elements to the end and returns the new length of the array.
- reverse ― Modifies the array by reversing the order of its elements.
- shift ― Modifies the array by removing the first element and returns that element.
- sort ― Modifies the array by sorting its elements in place and returns the sorted array.
- splice (also returns a new array of deleted elements)
- unshift ― Modifies the array by adding one or more elements to the beginning and returns the new length of the array.

## Methods that do neither

- at ― Returns the element at the specified index.
- entries ― Returns a new Array Iterator object that contains the key/value pairs for each index in the array.
- every ― Tests whether all elements in the array pass the test implemented by the provided function and returns a Boolean value.
- find ― Returns the value of the first element in the array that satisfies the provided testing function.
- findIndex ― Returns the index of the first element in the array that satisfies the provided testing function.
- findLast ― Returns the value of the last element in the array that satisfies the provided testing function.
- findLastIndex ― Returns the index of the last element in the array that satisfies the provided testing function.
- forEach ― Executes a provided function once for each array element.
- includes ― Determines whether an array includes a certain value among its entries, returning true or false.
- indexOf ― Returns the first index at which a given element can be found in the array, or -1 if it is not present.
- join ― Joins all elements of an array into a string and returns this string.
- keys ― Returns a new Array Iterator object that contains the keys for each index in the array.
- lastIndexOf ― Returns the last index at which a given element can be found in the array, or -1 if it is not present.
- reduce ― Executes a reducer function on each element of the array, resulting in a single output value.
- reduceRight ― Executes a reducer function on each element of the array, from right to left, resulting in a single output value.
- some ― Tests whether at least one element in the array passes the test implemented by the provided function and returns a Boolean value.
- values ― Returns a new Array Iterator object that contains the values for each index in the array.
- toLocaleString ― Returns a string representing the elements of the array, using locale-specific conventions.
- toString ― Returns a string representing the elements of the array.

## Array Static Methods

- Array.from ― Creates a new, shallow-copied Array instance from an array-like or iterable object.
- Array.isArray ― Returns true if the value is an array; otherwise, false.
- Array.of ― Creates a new Array instance with a variable number of arguments, regardless of number or type of the arguments.
void Array.prototype.concat //+
void Array.prototype.filter //+
void Array.prototype.flat //+
void Array.prototype.flatMap //+
void Array.prototype.map //+
void Array.prototype.slice //+
void Array.prototype.toSorted //+
void Array.prototype.toSpliced //+
void Array.prototype.copyWithin // $
void Array.prototype.fill  // $
void Array.prototype.pop  // $
void Array.prototype.push  // $
void Array.prototype.reverse  // $
void Array.prototype.shift  // $
void Array.prototype.sort  // $
void Array.prototype.splice  // $
void Array.prototype.unshift  // $
void Array.prototype.at  // %
void Array.prototype.entries  // %
void Array.prototype.every  // %
void Array.prototype.find  // %
void Array.prototype.findIndex  // %
void Array.prototype.findLast  // %
void Array.prototype.findLastIndex  // %
void Array.prototype.forEach  // %
void Array.prototype.includes  // %
void Array.prototype.indexOf  // %
void Array.prototype.join  // %
void Array.prototype.keys  // %
void Array.prototype.lastIndexOf  // %
void Array.prototype.reduce  // %
void Array.prototype.reduceRight  // %
void Array.prototype.some  // %
void Array.prototype.values  // %
void Array.prototype.toLocaleString  // %
void Array.prototype.toString  // %
*/
  // void Array.prototype.every; //+
  // void Array.prototype.filter; //+
  // void Array.prototype.find; //+
  // void Array.prototype.findIndex; //+
  // void Array.prototype.forEach; //+
  // void Array.prototype.map; //!!
  // void Array.prototype.reduce; //+
  // void Array.prototype.reduceRight; //+
  // void Array.prototype.some; //+

  // public =========================================-| every() |-====
  public every<S extends T>(
    predicate: (val: T, index: number, array: T[]) => val is S,
    thisArg?: any
  ): this is S[];

  every(
    predicate: (val: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): boolean {
    return this.list.every(predicate, thisArg);
  }

  // public ========================================-| filter() |-====
  public filter<S extends T>(
    predicate: (val: T, index: number, array: T[]) => val is S,
    thisArg?: any
  ): BoxedList<S>;

  filter(
    predicate: (val: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): BoxedList<T> {
    return BoxedList.of(...this.list.filter(predicate, thisArg));
  }

  // public ==========================================-| find() |-====
  public find<S extends T>(
    predicate: (this: T, val: T, index: number, obj: T[]) => val is S,
    thisArg?: any
  ): S | undefined; // MaybeList<undefined>;

  find(
    predicate: (val: T, index: number, obj: T[]) => unknown,
    thisArg?: any
  ): T | undefined {
    // MaybeList<T | undefined>
    return this.list.find(predicate, thisArg);
  }

  // public =====================================-| findIndex() |-====
  findIndex(
    predicate: (val: T, index: number, obj: T[]) => unknown,
    thisArg?: any
  ): number {
    return this.list.findIndex(predicate, thisArg);
  }

  // public =======================================-| forEach() |-====
  public forEach(
    callbackfn: (val: T, index: number, array: T[]) => void,
    thisArgument?: any
  ): void {
    return this.list.forEach(callbackfn, thisArgument);
  }

  // public map<U>(
  //   callbackfn: (val: T, index: number, array: T[]) => U,
  //   thisArg?: any,
  // ): BoxedList<U> {
  //   return BoxedList.of<U>(
  //     super.map<U[]>(values => values.map<U>(callbackfn, thisArg)).values,
  //   );
  // }

  // public ========================================-| reduce() |-====
  public reduce<U>(
    callbackfn:
      | ((
          previousValue: U,
          currentValue: T,
          currentIndex: number,
          array: T[]
        ) => U)
      | ((
          previousValue: T,
          currentValue: T,
          currentIndex: number,
          array: T[]
        ) => T),
    initialValue?: U | T
  ): U | T {
    if (!initialValue) return this.list.reduce(callbackfn as CallbackfnT<T>);

    return this.list.reduce<T | U>(
      callbackfn as CallbackfnU<U, T>,
      initialValue
    );
  }

  // public ===================================-| reduceRight() |-====
  public reduceRight<U>(
    callbackfn:
      | ((
          previousValue: U,
          currentValue: T,
          currentIndex: number,
          array: T[]
        ) => U)
      | ((
          previousValue: T,
          currentValue: T,
          currentIndex: number,
          array: T[]
        ) => T),
    initialValue?: U | T
  ): U | T {
    if (!initialValue) {
      return this.list.reduceRight(callbackfn as CallbackfnT<T>);
    }

    return this.list.reduceRight<T | U>(
      callbackfn as CallbackfnU<U, T>,
      initialValue
    );
  }

  // public ==========================================-| some() |-====
  public some(
    predicate: (val: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): boolean {
    return this.list.some(predicate, thisArg);
  }
  public includes(searchElement: T, fromIndex?: number | undefined): boolean {
    return this.list.includes(searchElement, fromIndex);
  }
  // public =========================================-| unbox() |-====
  public unbox<R_unsafe = T>() {
    return this.#value as any as R_unsafe[];
  }

  // public ===========================================-| map() |-====
  public map<R>(fn: (value: T[]) => R[]) {
    return BoxedList.of<R>(...fn(this.#value));
  }

  // public ======================================-| mapItems() |-====
  public mapItems<R>(fn: (value: T) => R) {
    return BoxedList.of<R>(...this.#value.map(fn));
  }

  // *- ================================================================
  // public ======================================-| mapLists() |-====
  public mapLists<R>(fn: (val: T) => R) {
    const value = this.#value;

    const mapedValues = value.map(item => {
      const listBox = BoxedList.of(item);
      return listBox.mapItems(fn).unbox();
    });
    return BoxedList.of(...mapedValues);
  }

  // *- ================================================================

  // public ============================================-| ap() |-====
  // public ap2<R_Unsafe>(
  //   c: IUnbox<(val: T) => R_Unsafe> | IUnboxList<(val: any) => unknown>
  // ) {
  //   const unboxed = c.unbox();
  //   let funct: (val: any) => unknown = i => i;

  //   if (Array.isArray(unboxed)) {
  //     funct = unboxed.reduce(
  //       (previousFn, currentFunct): ((val: T) => unknown) =>
  //         placeHolder =>
  //           currentFunct(previousFn(placeHolder)),
  //       funct
  //     ) as (val: T) => R_Unsafe;
  //     return this.mapItems(val => funct(val) as R_Unsafe);
  //   }

  //   return this.mapItems(val => unboxed(val) as R_Unsafe);
  // }

  public ap<R>(fns: BoxedList<(t: T) => R>): BoxedList<R> {
    const result = this.mapItems(t => fns.mapItems(f => f(t))).mapItems(bx =>
      bx.unbox()
    );
    return BoxedList.of(...result.unbox().flat());
  }

  // public =========================================-| chain() |-====
  public chain<R>(fn: (value: T) => R) {
    return this.mapItems<R>(fn).unbox<R>();
  }

  // public ===========================================-| box() |-====
  get box() {
    return Box.of([...this.unbox<T>()]);
  }

  public get isArrayList(): boolean {
    return this.list.every(item => Array.isArray(item));
  }

  // public getArrayList<R>(): Either<T[], R[][]> {
  //   if (this.isArrayList) return right(this.list as never as R[][]);

  //   return left(this.list as T[]);

  //   // return this.value.every(item => Array.isArray(item));
  // }

  // get =============================================-| length |-====
  public get length(): number {
    return this.unbox<T>().length;
  }
  // get ===============================================-| list |-====
  public get list(): T[] {
    return this.unbox<T>();
  }

  // *--================================================================
}

function ap<T, U>(fns: ((t: T) => U)[], ts: T[]): U[] {
  return ts.flatMap(t => fns.map(f => f(t)));
}

function plusOne(x: number) {
  return x + 1;
}

function minusOne(x: number) {
  return x - 1;
}

export function main() {
  console.log(ap([plusOne, minusOne], [1, 2, 3]));
}
