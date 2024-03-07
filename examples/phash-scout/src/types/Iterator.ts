/*
next()
A function that accepts zero or one argument and returns a promise. The promise fulfills to an object conforming to the IteratorResult interface, and the properties have the same semantics as those of the sync iterator's.

type IteratorResult<T, TReturn = any> =
  | IteratorYieldResult<T>
  | IteratorReturnResult<TReturn>;

interface IteratorYieldResult<TYield> {
  done?: false;
  value: TYield;
}
interface IteratorReturnResult<TReturn> {
  done: true;
  val

return(value) Optional
A function that accepts zero or one argument and returns a promise. The promise fulfills to an object conforming to the IteratorResult interface, and the properties have the same semantics as those of the sync iterator's.

throw(exception) Optional
A function that accepts zero or one argument and returns a promise. The promise fulfills to an object conforming to the IteratorResult interface, and the properties have the same semantics as those of the sync iterator's.


 */

export interface Iterator<T, TReturn = any, TNext = undefined> {
  // Takes either 0 or 1 arguments - doesn't accept 'undefined'
  next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
  return?(value?: TReturn): IteratorResult<T, TReturn>;
  throw?(e?: any): IteratorResult<T, TReturn>;
}
