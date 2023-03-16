import { immediateZalgo, timeoutZalgo } from '@luxcium/restraining-zalgo';
import { Box } from '../Box/Box';
import { BoxedList } from '../BoxedList/BoxedList';
import type { IUnbox, IUnboxList, Mapper, ThenMapper } from '../types';
export type Bg<T> = BoxedGenerator<T>;
export class BoxedGenerator<T> implements IUnboxList<T>, IUnbox<T[]> {
  #valueGenerator: () => Generator<T>;
  // static ============================================-| of() |-====

  public static of<TVal>(...values: TVal[] | [TVal[]]): BoxedGenerator<TVal> {
    const arrayGenerator = (array: TVal[]): (() => Generator<TVal>) =>
      function* (): Generator<TVal> {
        for (const currentValue of array) {
          yield currentValue;
        }
      };
    if (values.length === 1) {
      const list = values[0];
      return Array.isArray(list)
        ? new BoxedGenerator<TVal>(arrayGenerator(list))
        : new BoxedGenerator<TVal>(
            arrayGenerator([list])
          ); /* as BoxedGenerator<TVal>; */
    } else {
      const list: TVal = [...values] as any;
      return BoxedGenerator.of<TVal>(list); /* as PseudoCode<TVal>; */
    }
  }

  /** @deprecated */
  public static of2<TVal>(...values: TVal[] | [TVal[]]): BoxedGenerator<TVal> {
    const arrayGenerator = (array: TVal[]): (() => Generator<TVal>) =>
      function* (): Generator<TVal> {
        for (const currentValue of array) {
          yield currentValue;
        }
      };

    if (values.length === 1) {
      const list = values[0];

      if (Array.isArray(list)) {
        return new BoxedGenerator<TVal>(arrayGenerator([...list]));
      }
    }

    return new BoxedGenerator<TVal>(arrayGenerator([...(values as TVal[])]));
  }

  // static =======================================-| fromGen() |-====
  public static fromGen<TVal>(
    generatorFn: () => Generator<TVal>
  ): BoxedGenerator<TVal> {
    return new BoxedGenerator<TVal>(generatorFn);
  }

  // static ==========================================-| from() |-====
  public static from<TVal>(
    ...boxedList: (IUnboxList<TVal> | IUnbox<TVal[]>)[]
  ): BoxedGenerator<TVal> {
    return BoxedGenerator.of<TVal>(boxedList.flatMap(item => item.unbox()));
  }

  // protected ================================-| constructor() |-====
  protected constructor(valueGenerator: () => Generator<T>) {
    this.#valueGenerator = valueGenerator;
  }
  // public ===========================================-| map() |-====
  private mapIndex: number = 0;
  public map<TMap>(
    fn: Mapper<T, TMap>
    // delay: undefined | null | number | boolean = false
  ): BoxedGenerator<TMap> {
    const generator = this.#valueGenerator;
    const that = this;
    function* arrayGenerator(): Generator<TMap> {
      for (const item of generator()) yield fn(item, that.mapIndex++);
    }
    return BoxedGenerator.fromGen(arrayGenerator);
  }

  // public ====================================-| awaitedMap() |-====
  private awaitedMapIndex: number = 0;
  public awaitedMap<TMap>(
    fn: Mapper<Awaited<T>, Promise<TMap>>,
    delay: number = 0
  ) {
    // : BoxedGenerator<Promise<TMap>>
    const generator = this.#valueGenerator;
    const that = this;
    function* arrayGenerator() /* : Generator<Promise<TMap>> */ {
      for (const item of generator()) {
        // yield (async () => fn(await item, that.mapIndex++))();

        yield delay === 0
          ? immediateZalgo<TMap>(
              (async () => fn(await item, that.awaitedMapIndex++))()
            )
          : timeoutZalgo<TMap>(
              (async () => fn(await item, that.awaitedMapIndex++))(),
              delay
            );
      }
    }
    return BoxedGenerator.fromGen(arrayGenerator);
  }

  // public =======================================-| thenMap() |-====
  public thenMap<TMap1, TMap2 = never>(
    onfulfilled?: ThenMapper<T, TMap1> | null,
    onrejected?: ((reason: any) => TMap2 | PromiseLike<TMap2>) | null
  ): BoxedGenerator<Promise<TMap1 | TMap2>> {
    const generator = this.#valueGenerator;

    function* arrayGenerator(): Generator<Promise<TMap1 | TMap2>> {
      for (const item of generator()) {
        const _item = immediateZalgo(item);

        yield _item.then(onfulfilled, onrejected);
      }
    }
    return BoxedGenerator.fromGen(arrayGenerator);
  }

  // public ======================================-| catchMap() |-====
  public catchMap<TMap2 = never>(
    onrejected?: ((reason: any) => TMap2 | PromiseLike<TMap2>) | null
  ): BoxedGenerator<Promise<T | TMap2>> {
    const generator = this.#valueGenerator;

    function* arrayGenerator(): Generator<Promise<T | TMap2>> {
      for (const item of generator()) {
        const _item = immediateZalgo(item);

        yield _item.catch(onrejected); // .then(onfulfilled, onrejected);
      }
    }
    return BoxedGenerator.fromGen(arrayGenerator);
  }

  // public ====================================-| finallyMap() |-====
  public finallyMap(
    onfinally: (() => void) | null // ThenMapper<T, TMap1> | null,
    // onrejected?: ((reason: any) => TMap2 | PromiseLike<TMap2>) | null
  ): BoxedGenerator<Promise<T>> {
    const generator = this.#valueGenerator;

    function* arrayGenerator(): Generator<Promise<T>> {
      for (const item of generator()) {
        const _item = immediateZalgo(item);

        yield _item.finally(onfinally);
      }
    }
    return BoxedGenerator.fromGen(arrayGenerator);
  }
  // public =========================================-| unbox() |-====
  public unbox<R_unsafe = T>(): R_unsafe[] {
    return [...this.#valueGenerator()] as any as R_unsafe[];
  }
  // public =========================================-| unbox() |-====
  public async asyncUnbox(): Promise<T[]> {
    return Promise.all(this.unbox().map(i => immediateZalgo(i)));
  }

  // public =========================================-| spark() |-====
  public spark() {
    return BoxedGenerator.of(...this.unbox());
  }

  // public ====================================-| sparkAsync() |-====
  public async asyncSpark(): Promise<BoxedGenerator<Awaited<T>>> {
    const result = Promise.all(this.unbox().map(i => immediateZalgo(i)));
    return BoxedGenerator.of(...(await result));
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
  readonly [n: number]: T;

  // iterator ==========================-| *[Symbol.iterator]() |-====
  public *[Symbol.iterator](): Generator<T, void, undefined> {
    yield* this.values();
  }

  // get ==============================================-| box() |-====
  get box() {
    return Box.of(this.unbox());
  }

  // get ===========================================-| length() |-====
  get length() {
    return this.unbox().length;
  }
  // get ==========================================-| boxedList |-====
  public get boxedList(): BoxedList<T> {
    return BoxedList.of<T>(...this.unbox());
  }

  // get ===============================================-| list |-====
  public get list(): T[] {
    return this.unbox();
  }

  // get ================================================-| gen |-====
  public get gen(): () => Generator<T> {
    return this.#valueGenerator;
  }
}

// interface Extracted<T> {
//   map<TMap>(
//     // delay: undefined | null | number | boolean = false
//     fn: Mapper<T, TMap>
//   ): BoxedGenerator<TMap>;
//   /* TODO: add the missing return type */
//   awaitedMap<TMap>(fn: Mapper<Awaited<T>, Promise<TMap>>): any;
//   thenMap<TMap1, TMap2 = never>(
//     onfulfilled?: ThenMapper<T, TMap1> | null,
//     onrejected?: ((reason: any) => TMap2 | PromiseLike<TMap2>) | null
//   ): BoxedGenerator<Promise<TMap1 | TMap2>>;
//   catchMap<  TMap2 = never>(onrejected?: ((reason: any) => TMap2 | PromiseLike<TMap2>) | null): BoxedGenerator<Promise<T | TMap2>>;
//   finallyMap(
//     // ThenMapper<T, TMap1> | null,
//     // onrejected?: ((reason: any) => TMap2 | PromiseLike<TMap2>) | null
//     onfinally: (() => void) | null
//   ): BoxedGenerator<Promise<T>>;
//   unbox(): R_unsafe[];
//   asyncUnbox(): Promise<T[]>;
//   /* TODO: add the missing return type */
//   spark(): any;
//   asyncSpark(): Promise<BoxedGenerator<Awaited<T>>>;
//   keys(): IterableIterator<number>;
//   values(): IterableIterator<T>;
//   Symbol.iterator(): Generator<T, void, undefined>;
//   /* TODO: add the missing return type */
//   box(): any;
//   /* TODO: add the missing return type */
//   length(): any;
//   boxedList(): BoxedList<T>;
//   list(): T[];
//   gen(): () => Generator<T>;
// }

export const generatorOf = BoxedGenerator.of;
export const generateFromGen = BoxedGenerator.fromGen;
export const generateFrom = BoxedGenerator.from;

export class PseudoCode<T> {
  public static of<TVal>(...values: TVal[] | [TVal[]]): PseudoCode<TVal> {
    if (values.length === 1) {
      const list = values[0];
      return Array.isArray(list)
        ? new PseudoCode<TVal>(list)
        : new PseudoCode<TVal>([list]); /* as PseudoCode<TVal>; */
    } else {
      // values.length !== 1
      // PseudoCode.of(1, 2, 3);
      const list = [...values];
      return PseudoCode.of<TVal>(
        list as any as TVal
      ); /* as PseudoCode<TVal>; */
      // return null;
    }
  }

  public value: T[];

  constructor(value: T[]) {
    this.value = value;
  }
}
