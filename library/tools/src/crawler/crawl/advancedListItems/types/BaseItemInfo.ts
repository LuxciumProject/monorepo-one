import { Stats } from 'fs';
import { ItemType } from './ItemType';

/**
 * Base information about an item.
 */
export interface BaseItemInfo {
  /** The type of the item. */
  type: ItemType;
  /** The name of the item. */
  name: string;
  /** The absolute path of the item. */
  path: string;
  /** The creation date of the item. */
  createdAt: Date;
  /** The last modified date of the item. */
  modifiedAt: Date;
  /** The Stats object of the item. */
  stats: Stats;
}
