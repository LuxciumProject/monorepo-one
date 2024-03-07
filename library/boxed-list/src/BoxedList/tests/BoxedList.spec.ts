import Box from '../../Box/Box';
import { BoxedList } from '../BoxedList';

describe('Testing Box specification', () => {
  test('BoxedList of one item', () => {
    expect(BoxedList.of('Chocolates').list).toStrictEqual(
      BoxedList.of(['Chocolates']).list
    );
  });
  test('BoxedList of many items', () => {
    expect(BoxedList.of(1, 2, 3, 4, 5, 6, 7, 8, 9).unbox()).toStrictEqual(
      BoxedList.of([1, 2, 3, 4, 5, 6, 7, 8, 9]).unbox()
    );
  });

  test('BoxedList of one array', () => {
    expect(BoxedList.of([1, 2, 3, 4, 5, 6, 7, 8, 9]).unbox()).toStrictEqual(
      BoxedList.of(1, 2, 3, 4, 5, 6, 7, 8, 9).unbox()
    );
  });

  test('BoxedList of an array with one item (a list)', () => {
    expect(BoxedList.of([[1, 2, 3, 4, 5, 6, 7, 8, 9]]).unbox()).toStrictEqual(
      BoxedList.of([[1, 2, 3, 4, 5, 6, 7, 8, 9]]).unbox()
    );
  });

  test('BoxedList of nested arrays', () => {
    expect(BoxedList.of([[[1, 2, 3, 4, 5, 6, 7, 8, 9]]]).unbox()).toStrictEqual(
      BoxedList.of([[[1, 2, 3, 4, 5, 6, 7, 8, 9]]]).unbox()
    );
  });

  test('BoxedList from', () => {
    const boxedlist = BoxedList.of('Chocolates');

    expect(BoxedList.from(boxedlist)).toStrictEqual(BoxedList.of('Chocolates'));
  });
  //   box: IUnbox<TVal> | IUnbox<TVal[]> | IUnboxList<TVal>

  test('BoxedList from IUnbox<TVal>', () => {
    const box = Box.of('Chocolates');

    expect(BoxedList.from(box)).toStrictEqual(BoxedList.of('Chocolates'));
  });

  test('BoxedList from IUnbox<TVal[]>', () => {
    const box = Box.of(['Chocolates']);

    expect(BoxedList.from(box).unbox()).toStrictEqual(
      BoxedList.of('Chocolates').unbox()
    );
  });
  test('BoxedList from', () => {
    const boxedlist = BoxedList.of('Chocolates');

    expect(BoxedList.from(boxedlist).unbox()).toStrictEqual(
      BoxedList.of('Chocolates').unbox()
    );
  });
  test('BoxedList map', () => {
    const boxedlist = BoxedList.of(12, 13, 14);
    expect(
      boxedlist.mapItems((val: number) => val * 2 + 1).unbox()
    ).toStrictEqual(BoxedList.of(12 * 2 + 1, 13 * 2 + 1, 14 * 2 + 1).unbox());
  });

  test('BoxedList ap', () => {
    function plusOne(x: number) {
      return x + 1;
    }

    function minusOne(x: number) {
      return x - 1;
    }
    const boxedlist = BoxedList.of([1, 2, 3]);
    expect(
      boxedlist.ap(BoxedList.of([plusOne, minusOne])).unbox()
    ).toStrictEqual([2, 0, 3, 1, 4, 2]);
  });

  test('BoxedList chain', () => {
    const boxedlist = BoxedList.of(12);
    expect(boxedlist.chain(val => val * 1 + 0)).toStrictEqual([12]);
  });

  test('BoxedList unbox', () => {
    const boxedlist = BoxedList.of('Chocolates');
    expect(boxedlist.unbox()).toStrictEqual(['Chocolates']);
  });

  test('BoxedList value', () => {
    const boxedlist = BoxedList.of('Chocolates');
    expect(boxedlist.list).toStrictEqual(['Chocolates']);
  });

  test('reduceRight Method', () => {
    const expected = BoxedList.of([1, 2, 3]); // BoxedList.of('Chocolates');
    expect(expected.reduceRight<number>((prev, curr) => prev + curr, 0)).toBe(
      6
    );
  });
  test('some Method', () => {
    const expected = BoxedList.of([1, 2, 3]); // BoxedList.of('Chocolates');
    expect(
      expected.some(i => {
        void 10;
        return i === 1;
      })
    ).toBeTruthy();
  });

  test('includes Method', () => {
    const expected = BoxedList.of([1, 2, 3]); // BoxedList.of('Chocolates');
    expect(expected.includes(1)).toBeTruthy();
  });
  test('unbox Method', () => {
    const expected = BoxedList.of([1, 2, 3]); // BoxedList.of('Chocolates');
    expect(expected.unbox()).toStrictEqual([1, 2, 3]);
  });

  test('map Method', () => {
    const expected = BoxedList.of([1, 2, 3]); // BoxedList.of('Chocolates');
    expect(expected.map(i => [...i, 4]).unbox()).toStrictEqual([1, 2, 3, 4]);
  });

  test('mapItems Method', () => {
    const expected = BoxedList.of([1, 2, 3]); // BoxedList.of('Chocolates');
    expect(expected.mapItems(i => i).unbox()).toStrictEqual([1, 2, 3]);
  });

  test('mapLists Method', () => {
    const expected = BoxedList.of([1, 2, 3]); // BoxedList.of('Chocolates');
    expect(
      expected
        .mapLists(i => i)
        .unbox()
        .flat()
    ).toStrictEqual([1, 2, 3]);
  });
  test('BoxedList lenght property on many items', () => {
    expect(BoxedList.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9).length).toBe(10);
  });

  test('BoxedList @@iterator', () => {
    expect(
      BoxedList.of(...BoxedList.of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)).length
    ).toBe(10);
  });
  test('box property', () => {
    const expected = BoxedList.of(['Chocolates']);
    expect(expected.box).toStrictEqual(Box.of(['Chocolates']));
  });
  test('isArrayList property (Truthy)', () => {
    const expectedTruthy = BoxedList.of([1, 2, 3], [1, 2, 3], [1, 2, 3]);
    expect(expectedTruthy.isArrayList).toBeTruthy();
  });

  test('isArrayList property (Falsy)', () => {
    const expectedFalsy = BoxedList.of([1, 2, 3]);
    expect(expectedFalsy.isArrayList).toBeFalsy();
  });
});
//
BoxedList.of([1, 2, 3]).entries;
BoxedList.of([1, 2, 3]).keys;
BoxedList.of([1, 2, 3]).values;
BoxedList.of([1, 2, 3]).every;
BoxedList.of([1, 2, 3]).filter;
BoxedList.of([1, 2, 3]).find;
BoxedList.of([1, 2, 3]).forEach;
BoxedList.of([1, 2, 3]).reduce;
BoxedList.of([1, 2, 3]).reduceRight;
BoxedList.of([1, 2, 3]).some;
BoxedList.of([1, 2, 3]).unbox;
BoxedList.of([1, 2, 3]).map;
BoxedList.of([1, 2, 3]).mapItems;
BoxedList.of([1, 2, 3]).mapLists;
// BoxedList.of([1, 2, 3]).ap2;
BoxedList.of([1, 2, 3]).ap;
BoxedList.of([1, 2, 3]).chain;

// public static of
// public static from
// public unbox<R_unsafe
// public mapItems<R
// public mapLists<R
// public ap<R_Unsafe
// public chain<R
// public get isArrayList
// public getArrayList<R
// public get values

// import { Either, left, right } from 'fp-ts/lib/Either';
// import { Box } from './Box';
// import type { IMapItems, IUnbox, IUnboxList } from './types';

// export function boxedListOf<TVal>(value: TVal) {
//   return BoxedList.of(value);
// }

// export function boxedListFrom<TVal>(box: IUnbox<TVal>) {
//   return BoxedList.from(box);
// }
// export class BoxedList<T> implements IUnboxList<T>, IUnbox<T[]>, IMapItems<T> {
//   #value: T[];

//   // static ==============================================-| of() |-====
//   // public static of = <TVal>(...values: TVal[] | [TVal[]]): BoxedList<TVal> => {
//     if (values.length === 1) {
//       const value = values[0];

//       if (Array.isArray(value)) {
//         return new BoxedList<TVal>([...value]);
//       }
//     }
//     return new BoxedList<TVal>([...(values as TVal[])]);
//   };

//   // static ============================================-| from() |-====
//   // public static from<TVal>(box: IUnbox<TVal[] | TVal> | IUnboxList<TVal>) {
//     return BoxedList.of(box.unbox());
//   }
//   // protected ==================================-| constructor() |-====
//   protected constructor(value: T[]) {
//     this.#value = value;
//     return this;
//   }

//   public ===========================================-| unbox() |-====
//   // public unbox<R_unsafe = T>() {
//     return this.#value as any as R_unsafe[];
//   }

//   public ========================================-| mapItems() |-====
//   // public mapItems<R>(fn: (value: T) => R) {
//     return BoxedList.of<R>(...this.#value.map(fn));
//   }

//   // *- ================================================================
//   public ========================================-| mapLists() |-====
//   // public mapLists<R>(fn: (val: T) => R) {
//     const value = this.#value;

//     const mapedValues = value.map(item => {
//       const listBox = BoxedList.of(item);
//       return listBox.mapItems(fn).unbox();
//     });
//     return BoxedList.of(...mapedValues);
//   }
//   // *- ================================================================

//   public ==============================================-| ap() |-====
//   // public ap<R_Unsafe>(
//     c: IUnbox<(val: T) => R_Unsafe> | IUnboxList<(val: any) => unknown>
//   ) {
//     const unboxed = c.unbox();
//     let funct: (val: any) => unknown = i => i;

//     if (Array.isArray(unboxed)) {
//       funct = unboxed.reduce(
//         (previousFn, currentFunct): ((val: T) => unknown) =>
//           placeHolder =>
//             currentFunct(previousFn(placeHolder)),
//         funct
//       ) as (val: T) => R_Unsafe;
//       return this.mapItems(val => funct(val) as R_Unsafe);
//     }
//     return this.mapItems(val => unboxed(val) as R_Unsafe);
//   }
//   public ===========================================-| chain() |-====
//   // public chain<R>(fn: (value: T) => R) {
//     return this.mapItems<R>(fn).unbox<R>();
//   }
//   public =============================================-| box() |-====
//   get box() {
//     return Box.of([...this.unbox<T>()]);
//   }

//   // public get isArrayList() {
//     return this.values.every(item => Array.isArray(item));
//   }

//   // public getArrayList<R>(): Either<T[], R[][]> {
//     if (this.isArrayList) {
//       return right(this.values as never as R[][]);
//     }
//     return left(this.values as T[]);

//     // return this.value.every(item => Array.isArray(item));
//   }
//   // get ===============================================-| values |-====
//   // public get values() {
//     return this.unbox<T>();
//   }
//   // *--================================================================
// }

// function main() {
//   const values = BoxedList.of(1, 2, 3, 4, 5);
//   const functions = BoxedList.of(
//     (i: number) => i,
//     (n: number) => n + 1,
//     (n: number) => n * 2,
//     (n: number) => n - 2,
//     (n: number) => n + n
//   );
//   const results = values.ap<number>(functions);
//   const oneMoreTime = Box.of((n: number) => n * 2);

//   const value = 2;
//   const pseudoCode = (i: number): number => i;
//   [pseudoCode(value)]
//     .map(x => x * 2)
//     .map(y => y + 3)
//     .map(anything => anything - 7)
//     .map(itWasNotAsTrivialAsThisExample => 0 / itWasNotAsTrivialAsThisExample);

//   return results.ap(oneMoreTime).chain(v => console.log(v));
// }
// void main; //();

BoxedList.of([1, 2, 3]).entries;
BoxedList.of([1, 2, 3]).keys;
BoxedList.of([1, 2, 3]).values;
BoxedList.of([1, 2, 3]).every;
BoxedList.of([1, 2, 3]).filter;
BoxedList.of([1, 2, 3]).find;
BoxedList.of([1, 2, 3]).forEach;
BoxedList.of([1, 2, 3]).reduce;
BoxedList.of([1, 2, 3]).reduceRight;
BoxedList.of([1, 2, 3]).some;
BoxedList.of([1, 2, 3]).unbox;
BoxedList.of([1, 2, 3]).map;
BoxedList.of([1, 2, 3]).mapItems;
BoxedList.of([1, 2, 3]).mapLists;
// BoxedList.of([1, 2, 3]).ap2;
BoxedList.of([1, 2, 3]).ap;
BoxedList.of([1, 2, 3]).chain;
/*

  *[Symbol.iterator](): Generator<T, void, undefined> {
   static of = <TVal>(...values: TVal[] | [TVal[]]) => {
   static from<TVal>(
  entries(): IterableIterator<[number, T]> {
  keys(): IterableIterator<number> {
  values(): IterableIterator<T> {
  every<S extends T>(
  filter<S extends T>(
  find<S extends T>(
  forEach(
  reduce<U>(
  reduceRight<U>(
  some(
  unbox<R_unsafe = T>() {
  map<R>(fn: (value: T[]) => R[]) {
  mapItems<R>(fn: (value: T) => R) {
  mapLists<R>(fn: (val: T) => R) {
  ap2<R_Unsafe>(
  ap<R>(fns: ((t: T) => R)[]): BoxedList<R> {
  chain<R>(fn: (value: T) => R) {
  getArrayList<R>(): Either<T[], R[][]> {
  list() {
  isArrayList() {

 */
