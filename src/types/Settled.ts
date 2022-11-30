/**
 * The type SettledResult<T> is an alias to PromiseSettledResult<T>
 *
 *
 * @alias PromiseSettledResult<T>
 * @public
 */
export type SettledResult<T> = PromiseSettledResult<T>;
/**
 * The type FulfilledResult<T> is an alias to PromiseFulfilledResult<T>
 *
 *
 * @alias PromiseSettledResult<T>
 * @public
 */
export type FulfilledResult<T> = PromiseFulfilledResult<T>;
/**
 * The type RejectedResult is an alias to PromiseRejectedResult.
 *
 *
 * @alias PromiseSettledResult<T>
 * @public
 */
export type RejectedResult = PromiseRejectedResult;

/**
 * Based on the JavaScript {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled | Promise.allSettled()} API The {@link Settled} only objective is to keep the possible failures of a task separated from the expected and extending PromiseSettledResult
 *


 * @remarks
 * The interface Settled<T> is the equivalent of
 * PromiseSettledResult<T> with aditional properties to make it
 * isometric and properties adding Cardinal and Ordinal indexes.
 *
 * @typeParam T - value of a fulfilled ({@link SettledRight}) {@link TransformFn} mapping operation.
 *
 *
 * @public
 */
export type Settled<T> = SettledLeft | SettledRight<T>;

/**
 * The type SettledRight<T> extends PromiseFulfilledResult<T> adding
 * isometric parameters with PromiseRejectedResult and adding
 * Cardinal and Ordinal indexes.
 * @public
 */
export type SettledRight<T> = PromiseFulfilledResult<T> & {
  status: 'fulfilled';
  value: T;
  reason?: undefined;
  fulfilled: T;
  rejected: null;
  recipeSteps: number;
  currentRejection: null;
  index: number;
};

/**
 * The type SettledLeft extends PromiseRejectedResult adding
 * isometric parameters with PromiseRejectedResult and adding
 * Cardinal and Ordinal indexes.
 * @public
 */
export type SettledLeft = PromiseRejectedResult & {
  status: 'rejected';
  reason: any;
  value?: undefined;
  rejected: any;
  fulfilled: null;
  recipeSteps: number;
  currentRejection: true | false | undefined;
  index: number;
};

// A Promise is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason. This lets asynchronous methods return values like synchronous methods: instead of immediately returning the final value, the asynchronous method returns a promise to supply the value at some point in the future.
