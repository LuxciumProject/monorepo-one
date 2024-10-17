import { ItemInfo } from './ItemInfo';

/**
 * Filtering function type.
 */
export type FilterFn<T extends ItemInfo> = (item: T) => boolean;
