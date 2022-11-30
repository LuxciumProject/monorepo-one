import { OnlySideEffect, Settled, SettledResult } from '.';

/** @public */

/*

Mapper<T = any, U = unknown, A = T> = ;
= Mapper<T, Promise<U>, T | Settled<T>>;

 */
export interface TransformFn<T, U> {
  (value: T, index: number, array: readonly (T | Settled<T>)[]): Promise<U>;
}
/** @public */
export interface LookupFn<S, U> {
  (value: U, index: number, array: readonly (S | Settled<S>)[]): OnlySideEffect;
}
/** @public */
export interface ValidateFn<S, U> {
  (
    value: U,
    index: number,
    array: readonly (S | Settled<S>)[]
  ): Promise<OnlySideEffect>;
}
/** @public  */
export interface ErrLookupFn {
  /**
   * @param  reason - The reason provided by the catch clause
   * inside the mapping routine.
   * @param index - The zero based index provided by map or
   * similarly an index provided by the mapping routine.
   * @param currentRejection - Flag that indicates if the exception
   * was hapening on the curent iteration of the mapping routine or
   * if it was part of a previously raised exception that was already
   * part of the item currently being mapped from the ptovided collection.
   * @returns Do not return any value is trigered syncrounously.
   */
  (reason: any, index: number, currentRejection: boolean): OnlySideEffect;
}

/** @internal */
export interface MapperOptions<T, U> {
  item: T | SettledResult<T>; //  | PromiseLike<T | SettledResult<T>>;
  index: number;
  array: (T | Settled<T>)[];
  transform: TransformFn<T, U>;
  lookup?: LookupFn<T, U>;
  validate?: ValidateFn<T, U>;
  errLookup?: ErrLookupFn;
}
