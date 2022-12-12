import { SettledLeft } from './SettledLeft';
import { SettledRight } from './SettledRight';

/**
 * The {@link Settled} has either a {@link SettledLeft} or a {@link SettledRight} and is based on the JavaScript {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled | Promise.allSettled()} API only objective is to keep the possible failures of a task separated from the expected completion and extend  PromiseSettledResult
 *
 * @see {@link SettledLeft} and {@link SettledRight}.
 * @typeParam TBase - Represents the type of value contained in a sucesfulll (fulfilled) completion.
 * @remarks
 * The interface Settled<T> is the equivalent of
 * PromiseSettledResult<T> with aditional properties to make it
 * isometric and properties adding Cardinal and Ordinal indexes.
 *
 * The `index` measure the number of elements in a set, giving also its order or position.
 *
 * The `transformStep` measure the order of the steps involved in sucessive completions. first second third.
 *
 * Those two properties are ortogonales in the sens that sucessive
 * elements have an index always the same and each completion steps
 * have a same `transformStep` count they are ortogonal in that aspect
 *
 * ```typescript
 *  type Settled<T> = SettledLeft | SettledRight<T>;
 *
 *  type SettledRight<T> = PromiseFulfilledResult<T> & {
 *    status: 'fulfilled';
 *    value: T;
 *
 *    \/* The null value of the transformStep and the index is -1 *\/
 *    \/* When value is -1 the folowing properties a not enumerated *\/
 *    transformStep: number;
 *    index: number;
 *
 *    \/* Folowing properties a not enumerated (enumerable: false) *\/
 *    currentRejection: null;
 *    fulfilled: T;
 *    rejected: null;
 *    reason?: undefined;
 *  };
 *
 *  type SettledLeft = PromiseRejectedResult & {
 *    status: 'rejected';
 *    reason: any;
 *
 *    \/*
 *      the currentRejection can be undefined but the property itself
 *      can not be undefined *\/
 *    currentRejection: true | false | undefined;
 *
 *    \/* The null value of the transformStep and the index is -1 *\/
 *    \/* When value is -1 the folowing properties a not enumerated *\/
 *    transformStep: number;
 *    index: number;
 *
 *    \/* Folowing properties a not enumerated (enumerable: false) *\/
 *    rejected: any;
 *    fulfilled: null;
 *    value?: undefined;
 *  };
 *
 *  \/** From typescript lib *\/
 *  interface PromiseFulfilledResult<T> {
 *    status: 'fulfilled';
 *    value: T;
 *  }
 *
 *  \/** From typescript lib *\/
 *  interface PromiseRejectedResult {
 *    status: 'rejected';
 *    reason: any;
 *  }
 *
 *  \/** From typescript lib *\/
 *  type PromiseSettledResult<T> =
 *    | PromiseFulfilledResult<T>
 *    | PromiseRejectedResult;
 * ```
 *
 *
 *
 * @public
 */
export type Settled<TBase> = SettledLeft | SettledRight<TBase>;

//  * @typeParam T - value of a fulfilled ({@link SettledRight}) {@link TransformFn} mapping operation.
