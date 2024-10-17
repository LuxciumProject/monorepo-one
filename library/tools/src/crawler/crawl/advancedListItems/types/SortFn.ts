import { ItemInfo } from './ItemInfo';

/**
 * Sorting function type.
 */
export type SortFn<T extends ItemInfo> = (a: T, b: T) => number;
