/**
 * The type SettledRight<T> extends PromiseFulfilledResult<T> adding
 * isometric parameters with PromiseRejectedResult and adding
 * Cardinal and Ordinal indexes.
 * @group Base Types
 * @public
 */

/**
 * Represents a settled right value in a Promise.allSettled result.
 *
 * @typeparam T - The type of the fulfilled value.
 *
 * @remarks
 * This type extends the `PromiseFulfilledResult` type and adds additional properties to represent a fulfilled value in a Promise.allSettled result.
 * It includes properties such as `status`, `value`, `fulfilled`, `rejected`, `transformStep`, `currentRejection`, and `index`.
 *
 * @public
 */
export type SettledRight<T> = PromiseFulfilledResult<T> & {
  /**
   * The status of the settled value.
   */
  status: 'fulfilled';

  /**
   * The fulfilled value.
   */
  value: T;

  /**
   * The reason for rejection. Always `never` for a fulfilled value.
   */
  reason: never;

  /**
   * The fulfilled value. Same as `value`.
   */
  fulfilled: T;

  /**
   * The rejected value. Always `never` for a fulfilled value.
   */
  rejected: never;

  /**
   * The step number of the transformation process.
   */
  transformStep: number;

  /**
   * The current rejection value. Always `null` for a fulfilled value.
   */
  currentRejection: null;

  /**
   * The index of the settled value in the Promise.allSettled result.
   */
  index: number;
};

// TASK LIST: [TODO: Types] (Review Documentation) -------------------
