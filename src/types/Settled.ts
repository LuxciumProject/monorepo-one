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
 * The interface Settled<T> is the equivalent of
 * PromiseSettledResult<T> with aditional properties to make it
 * isometric and properties adding Cardinal and Ordinal indexes.
 * @public
 */
export type Settled<T> = SettledLeft | SettledRight<T>;

/**
 * The interface SettledRight<T> extends PromiseFulfilledResult<T> adding
 * isometric parameters with PromiseRejectedResult and adding
 * Cardinal and Ordinal indexes.
 * @public
 */
export interface SettledRight<T> extends PromiseFulfilledResult<T> {
  status: 'fulfilled';
  value: T;
  reason?: undefined;
  fulfilled: T;
  rejected: null;
  recipeSteps: number;
  currentRejection: null;
  index: number;
}

/**
 * The interface SettledLeft extends PromiseRejectedResult adding
 * isometric parameters with PromiseRejectedResult and adding
 * Cardinal and Ordinal indexes.
 * @public
 */
export interface SettledLeft extends PromiseRejectedResult {
  status: 'rejected';
  reason: any;
  value?: undefined;
  rejected: any;
  fulfilled: null;
  recipeSteps: number;
  currentRejection: true | false | undefined;
  index: number;
}
