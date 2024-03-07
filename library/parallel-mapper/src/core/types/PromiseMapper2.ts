/* ------------------------------------------------------------------ */
// + Licensed under the MIT License.                                  */
/*------------------------------------------------------------------- */
/*  Copyright (c) 2021 Benjamin Vincent Kasapoglu (Luxcium)           */
/*  For license information visit:                                    */
/*  See https://github.com/Luxcium/parallel-mapping/blob/cbf7e/LICENSE*/
/*--------------------------------------------------------------------*/
// export type WorkerMapper_<U, R> = (workerData: WorkerData<U>) => R;
// export type ThreadMapper<T, R> = (workerData: WorkerData<T>) => R;
// // export type WorkerMapper = <R>() => Mapper<TVal> &
// //   (<T>(value: T, index?: number, array?: readonly T[]) => Promise<R>);
// export type WorkerMapper = <T>() => <U>() => Mapper<T, Promise<U>>; // /* Mapper<TVal,R> & */
// // (value: T, index?: number, array?: readonly T[]) => Promise<U>;
// export type WT = <T>() => <U>() => Mapper<T, U>; //(
// //   value: T,
// //   index?: number,
// //   array?: readonly T[]
// // ) => Promise<U>;
export type PromiseMapper2<T, U> = (
  value: T,
  index?: number,
  array?: readonly T[]
) => Promise<U>;
