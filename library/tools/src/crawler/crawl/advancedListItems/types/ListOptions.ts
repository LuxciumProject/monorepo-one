import { FilterFn } from './FilterFn';
import { ItemInfo } from './ItemInfo';
import { SortFn } from './SortFn';

/**
 * Options for listing items.
 */
export interface ListOptions<T extends ItemInfo> {
  /** The type of items to list ('file', 'folder', etc., or 'all'). */
  type?: T['type'] | 'all';
  /** The optional filtering function. */
  filterFn?: FilterFn<T>;
  /** The optional sorting function. */
  sortFn?: SortFn<T>;
}
