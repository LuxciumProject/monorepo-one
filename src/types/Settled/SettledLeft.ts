/**
 * The type SettledLeft extends PromiseRejectedResult adding
 * isometric parameters with PromiseRejectedResult and adding
 * Cardinal and Ordinal indexes.
 * @group Base Types
 * @public
 */

/**
 * Represents the left side of a settled promise.
 * This type is a combination of `PromiseRejectedResult` and additional properties.
 *
 * @remarks
 * The `SettledLeft` type is used to describe the rejected state of a promise in a specific context.
 * It includes properties such as the reason for rejection, the transform step, and the index.
 *
 * @public
 */
export type SettledLeft = PromiseRejectedResult & {
  /**
   * The status of the promise, which is always set to `'rejected'`.
   */
  status: 'rejected';

  /**
   * The reason for the rejection.
   */
  reason: any;

  /**
   * The value of the promise, which is always `never` for a rejected promise.
   */
  value: never;

  /**
   * The rejected value.
   */
  rejected: any;

  /**
   * The fulfilled value, which is always `null` for a rejected promise.
   */
  fulfilled: never;

  /**
   * The step in the transformation process.
   */
  transformStep: number;

  /**
   * The current rejection status.
   */
  currentRejection: false | true | undefined;

  /**
   * The index of the promise in the set of settled promises.
   */
  index: number;
};

// TASK LIST: [TODO: Types] (Review Documentation) -------------------
