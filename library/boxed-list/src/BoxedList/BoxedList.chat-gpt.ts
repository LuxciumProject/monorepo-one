import { Box } from '../Box/Box';
import type {
  CallbackfnT,
  CallbackfnU,
  IMapItems,
  IUnbox,
  IUnboxList,
} from '../types';

export class BoxedList<T>
  extends Box<T[]>
  implements IUnboxList<T>, IUnbox<T[]>, IMapItems<T>
{
  #value: T[];

  public static override of = <TVal>(...values: TVal[] | [TVal[]]) => {
    if (values.length === 1) {
      const value = values[0];

      if (Array.isArray(value)) return new BoxedList<TVal>([...value]);
    }

    return new BoxedList<TVal>([...(values as TVal[])]);
  };

  public static override from<TVal>(
    box: IUnbox<TVal> | IUnbox<TVal[]> | IUnboxList<TVal>
  ) {
    const unbox: TVal | TVal[] = box.unbox();
    return BoxedList.of<TVal>(unbox as TVal);
  }

  protected constructor(value: T[]) {
    super(value);
    this.#value = value;
    return this;
  }

  public entries(): IterableIterator<[number, T]> {
    return this.list.entries();
  }

  public keys(): IterableIterator<number> {
    return this.list.keys();
  }

  public values(): IterableIterator<T> {
    return this.list.values();
  }

  // readonly [n: number]: T;

  public *[Symbol.iterator](): Generator<T, void, undefined> {
    yield* this.#value;
  }

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

  findIndex(
    predicate: (val: T, index: number, obj: T[]) => unknown,
    thisArg?: any
  ): number {
    return this.list.findIndex(predicate, thisArg);
  }

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

  public some(
    predicate: (val: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): boolean {
    return this.list.some(predicate, thisArg);
  }
  public includes(searchElement: T, fromIndex?: number | undefined): boolean {
    return this.list.includes(searchElement, fromIndex);
  }
  public override unbox<R_unsafe = T>() {
    return this.#value as any as R_unsafe[];
  }

  public override map<R>(fn: (value: T, index?: number) => R) {
    // const newValue: R[] = this.#value.map(fn);
    return super.map(value => value.map(fn));
    // return new BoxedList(newValue);
    // return BoxedList.of<R>(...this.#value.map((v,i)=>fn(v,i)));
  }

  // public 'map'<R>(fn: (value: T, index?: number) => R): Box<R> {
  //     return Box.of(fn(this.#value, -1));
  //   }
  public mapItems<R>(fn: (value: T) => R) {
    return BoxedList.of<R>(...this.#value.map(fn));
  }

  public mapLists<R>(fn: (val: T) => R) {
    const value = this.#value;

    const mapedValues = value.map(item => {
      const listBox = BoxedList.of(item);
      return listBox.mapItems(fn).unbox();
    });
    return BoxedList.of(...mapedValues);
  }

  public ap<R>(fns: BoxedList<(t: T) => R>): BoxedList<R> {
    const result = this.mapItems(t => fns.mapItems(f => f(t))).mapItems(bx =>
      bx.unbox()
    );
    return BoxedList.of(...result.unbox().flat());
  }

  public chain<R>(fn: (value: T) => R) {
    return this.mapItems<R>(fn).unbox<R>();
  }

  get box() {
    return Box.of([...this.unbox<T>()]);
  }

  public get isArrayList(): boolean {
    return this.list.every(item => Array.isArray(item));
  }

  public get length(): number {
    return this.unbox<T>().length;
  }
  public get list(): T[] {
    return this.unbox<T>();
  }
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
