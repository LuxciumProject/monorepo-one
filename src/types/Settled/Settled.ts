import { SettledLeft } from './SettledLeft';
import { SettledRight } from './SettledRight';

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
