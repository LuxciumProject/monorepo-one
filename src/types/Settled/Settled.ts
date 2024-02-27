import type { SettledLeft } from './SettledLeft';
import type { SettledRight } from './SettledRight';

/**
 * Represents a value that has been settled, either successfully or with an error.
 * This type is based on the JavaScript {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled | Promise.allSettled()} API.
 * Its purpose is to separate the possible failures of a task from its successful completion.
 * It extends the `PromiseSettledResult` type with additional properties to make it isomorphic and adds cardinal and ordinal indexes.
 *
 * @typeParam TBase - The type of value contained in a successful (fulfilled) completion.
 *
 * @remarks
 * The `Settled<T>` type is equivalent to `PromiseSettledResult<T>` with additional properties.
 *
 * The `index` property measures the number of elements in a set, also indicating their order or position.
 *
 * The `transformStep` property measures the order of the steps involved in successive completions (first, second, third, etc.).
 *
 * These two properties are orthogonal in the sense that successive elements always have the same index, and each completion step has the same `transformStep` count.
 *
 * @example
 * ```typescript
 * let result: Settled<number>;
 * if (someCondition) {
 *   result = { status: 'fulfilled', value: 42, transformStep: 1, index: 0 };
 * } else {
 *   result = { status: 'rejected', reason: 'Error message', transformStep: 1, index: 0 };
 * }
 * ```
 *
 * @public
 * @group Base Types
 */
export type Settled<T> = SettledLeft | SettledRight<T>;
