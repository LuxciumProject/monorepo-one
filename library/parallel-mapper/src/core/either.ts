class Nothing<T> {
  public static of<TVal>(val?: TVal) {
    return new Nothing(val);
  }

  #value: T | undefined;

  public constructor(val?: T) {
    this.#value = val;
  }

  public map<TMap>(fn: (val: T) => TMap) {
    return this.#value !== undefined
      ? new Nothing<TMap>(fn(this.#value))
      : new Nothing<TMap>(this.#value as any);
  }
}

class Just<T> {
  public static of<TVal>(val: TVal) {
    return new Just(val);
  }

  #value: T;

  public constructor(val: T) {
    this.#value = val;
  }

  public map<TMap>(fn: (val: T) => TMap) {
    return new Just<TMap>(fn(this.#value));
  }
}

export type Either<T1, T2> = Just<T1> | Nothing<T2>;
export type PromiseSettledEither<T> = Either<T, any>;

export function promiseSettledEither<T>(
  promiseSettledResult: PromiseSettledResult<T>
): PromiseSettledEither<T> {
  if (promiseSettledResult.status === 'fulfilled') {
    return Just.of(promiseSettledResult.value);
  }

  if (promiseSettledResult.status === 'rejected') {
    return Nothing.of(promiseSettledResult.reason);
  }

  throw new Error('NEVER');
}

interface PromiseFulfilledResult<T> {
  status: 'fulfilled';
  value: T;
}

interface PromiseRejectedResult {
  status: 'rejected';
  reason: any;
}

type PromiseSettledResult<T> =
  | PromiseFulfilledResult<T>
  | PromiseRejectedResult;

export interface PromiseConstructor {
  /**
   * Creates a Promise that is resolved with an array of results when all
   * of the provided Promises resolve or reject.
   * @param values An array of Promises.
   * @returns A new Promise.
   */
  allSettled<T extends readonly unknown[] | []>(
    values: T
  ): Promise<{ -readonly [P in keyof T]: PromiseSettledResult<Awaited<T[P]>> }>;

  /**
   * Creates a Promise that is resolved with an array of results when all
   * of the provided Promises resolve or reject.
   * @param values An array of Promises.
   * @returns A new Promise.
   */
  allSettled<T>(
    values: Iterable<T | PromiseLike<T>>
  ): Promise<PromiseSettledResult<Awaited<T>>[]>;
}

/*
an array called list denoted by []
a boxing type with function of and from
a boxing type with function map
a boxing type with a function named unbox or a property named value
a boxing type with a chain function map then unbox
a box of function passed to an apply function

 */

export interface IBox<T> {
  // static of

  // static from
  value: T;
  map<R>(fn: (val: T) => R): IBox<R>;
  unbox(): T;
  chain<R>(fn: (val: T) => R): R;
  apply<R>(c: IBox<(val: T) => R>): IBox<R>;
}

export type TBoxedList<T> = IBox<T[]>;

export class SimpleBox<T> implements IBox<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }
  map<R>(fn: (val: T) => R): IBox<R> {
    return new SimpleBox(fn(this.value));
  }
  unbox(): T {
    return this.value;
  }
  chain<R>(fn: (val: T) => R): R {
    return fn(this.value);
  }
  apply<R>(c: IBox<(val: T) => R>): IBox<R> {
    const facon1 = this.map(i => c.map(fn => fn(i)));
    const facon2 = c.map(fn => this.map(i => fn(i)));

    void facon1, facon2;
    return c.map(fn => this.map<R>(fn)).unbox();
  }
}

export function id<T>(value: any): T {
  return value;
}

export function double(value: any): any {
  return value * 2;
}

export function len(value: any): any {
  return value.length;
}

export function functionReducer<A, B>(list: [(...x: any[]) => unknown]) {
  return [
    list.reduce(
      (fn0, fn2): any =>
        (x: any): any =>
          fn0(fn2(x)),
      id
    ),
  ] as any as (x: A) => B;
}

export function double_typed(value: number): number {
  return value * 2;
}

//void 'something B'
// (value: T): any =>
//   fns.reduce((acc:any, fn:(arg: any) => any): T => fn(acc ), value) as any as (arg: T) => R;

// fns.push(fnOrValue as (arg: T) => R);
// return fnOrValue;
const list1 = [id, double, len, id];
const list2 = [id, len, double, id];
export const pipe2 =
  <T, R>(...fns: Array<(arg: T) => T>) =>
  (value: T) =>
    fns.reduce((acc, fn) => fn(acc), value) as any as (arg: T) => R;

const fnX = list1.reduce(
  (fn0, fn2): any =>
    (x: any): any =>
      fn0(fn2(x)),
  id
);
console.log('fnX', fnX('toto'));

const res1 = pipe2(...list2)('toto');
void res1;

console.log('pip2', pipe2(...list2)('toto'));
console.log('pip2', pipe2(...list2)('toto'));

// export function pipe_<T, R>(fnOrValue: ((arg: T) => R) | T): any {
//   if (typeof fnOrValue !== 'function') {
//     console.log(`fnOrValue is a function "${fnOrValue}"`);

//     return <A = T, B = R>(fnOrValue_: A | ((arg: A) => B)) =>
//       fnOrValue(pipe_<A, B>(fnOrValue_));
//   }

//   console.log(`fnOrValue is the value "${fnOrValue}"`);
//   return fnOrValue;
// }

// export function pipe_<T, R>(fnOrValue: ((arg: T) => R) | T): any {
//   if (typeof fnOrValue === 'function') {
//     const fn: (arg: T) => R = fnOrValue as (arg: T) => R;
//     console.log(`fnOrValue is a function "${fn}"`);
//     return <A, B>(fnOrValue_: A | ((arg: A) => B)) =>
//       fn(pipe_<A, B>(fnOrValue_));
//   }
//   const value: T = fnOrValue;
//   console.log(`fnOrValue is the value "${value}"`);
//   return value;
// }
// (((arg: T) => R)| (fn: (arg: T) => R))  =>R
// (((arg: T) => R) |(fn: (arg: T) => R) ) =>R
// ((fn: (arg: T) => R) => R) | ((arg: T) => R)
// (fn: (arg: T) => R) => (arg: T) => R;

export type PipeFunction<T, R> = (
  fn: <U>(arg: U) => T
) => R | ((value: T) => R);
export type Type2 = (fnx: (fn: (arg: string) => number) => number) => boolean; // <T>(fn: (arg: T) =>number) => boolean; // (value: number): boolean
//  (fn: (arg: T) => R)=> any PipeFunction<T, R>

// export function pipe<T, R>(fn: (arg: T) => R): /* interim fix: */  (fn: (arg: any) => T)=> (arg: any) => (arg: any) => R; // this is where I need a type
export type Func<A = any, R = any> = (arg: A) => R;

export type ArgType<T> = T extends Func<infer A, any> ? A : T;
export type ReturnType<T> = T extends Func<any, infer R> ? R : T;

export function pipe<T, R>(fnOrValue: Func<T, R>): any;
export function pipe<T, R>(value: T): R;
export function pipe(fnOrValue: any) {
  if (typeof fnOrValue === 'function') {
    console.log(`fnOrValue is a function "${fnOrValue}"`);
    function pipe_<A, B>(fn: (arg: A) => B): any;
    function pipe_<A, B>(value: A): any;
    function pipe_(fnOrValue_: any): any {
      return fnOrValue(pipe(fnOrValue_));
    }
    return pipe_;
  }
  return fnOrValue;
}

const step1 = pipe(isOdd_);
const step2 = step1(triple_);
const step3 = step2(len_);
const step4 = step3('TATA');

const thePipeline = [isOdd_, triple_, len_, id_, 'TATA'].reduce(
  (acc, fn: any) => fn(acc)
) as (x: any) => any;
// const step5 = functionReducer(thePipeline);
void thePipeline;
/*
function isOdd_(value: number): boolean // T=number, R=boolean
function double_(value: number): number // T=number, R=number
function len_(value:   'TATA' ): number // T=string, R=number
'TATA' // T=string

const step1: (fn: (arg: any) => number) => boolean

export function pipe(fnOrValue: any):any {
  if (typeof fnOrValue === 'function') {
    function pipe_(fnOrValue_: any): any {
      return fnOrValue(pipe(fnOrValue_));
    }
    return pipe_;
  }
  return fnOrValue;
}
Looks like the someThis is the delegate of the SomeThing instance and the prototype is  the someThis instance where the someMethod receives someArg like it would be
 */
// string -> number -> number -> boolean
// (arg:string) => boolean
// (fn:(arg:string) =>number) => boolean
// (fnx:(fn:(arg:string) =>number) =>number) => boolean
export function id_<T>(value: T): T {
  return value;
}
export function len_(value: any[] | string): number {
  return value.length;
}
export function triple_(value: number): number {
  return value * 3;
}
export function isOdd_(value: number): boolean {
  return value % 2 === 1;
}

console.log('TATA', id_(len_(id_('TATA'))));
console.log('pipe_x:', step4);
