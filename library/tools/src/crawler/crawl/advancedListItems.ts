// src/crawler/crawl/advancedListItems.ts
import { Stats } from 'fs';
import { readdir, stat } from 'fs/promises';
import { join } from 'path/posix';

/**
 * Detailed information about an item (file or folder).
 */
type ItemInfo = {
  /** The name of the file or folder. */
  name: string;
  /** The absolute path of the file or folder. */
  path: string;
  /** The type of the item (file or folder). */
  type: 'file' | 'folder';
  /** The size of the file (optional, relevant for files). */
  size?: number | undefined;
  /** The creation date of the item. */
  createdAt: Date;
  /** The last modified date of the item. */
  modifiedAt: Date;
  /** The Stat object of the item. */
  stats: Stats;
};

/**
 * Retrieves detailed information about the item.
 *
 * @param itemPath - The path to the item.
 * @param item - The name of the item.
 * @returns The information about the item.
 */
async function getItemStats(itemPath: string, item: string): Promise<ItemInfo> {
  const stats = await stat(itemPath);
  const isDirectory = stats.isDirectory();
  return {
    name: item,
    path: itemPath,
    type: isDirectory ? 'folder' : 'file',
    size: isDirectory ? undefined : stats.size,
    createdAt: stats.birthtime,
    modifiedAt: stats.mtime,
    stats,
  };
}

/**
 * Retrieves detailed information for all items.
 *
 * @param items - The list of item names.
 * @param basePath - The base path of the items.
 * @returns The list of item information.
 */
async function getAllItemStats(
  items: string[],
  basePath: string
): Promise<ItemInfo[]> {
  const itemStatsPromises = items.map(async item => {
    const itemPath = join(basePath, item);
    try {
      return await getItemStats(itemPath, item);
    } catch (error) {
      console.error(`Error getting stats for item ${itemPath}:`, {
        error,
        itemPath,
        item,
        basePath,
      });
      return null;
    }
  });

  const itemStats = await Promise.all(itemStatsPromises);
  // The error handling in the try-catch block ensures that each item is processed independently and returns a compatible type in case of an error, making the use of `Promise.allSettled` unnecessary here.
  // Additionally, logging or counting `null` items can help understand the frequency and causes of failed stats retrievals if required in the future.
  return itemStats.filter((item): item is ItemInfo => item !== null);
}

/**
 * Filters the items based on the provided filtering function.
 *
 * @param items - The list of item information.
 * @param filterFn - The optional filtering function.
 * @returns The filtered list of items.
 */
function applyFiltering(
  items: string[],
  basePath: string,
  filterFn?: (item: ItemInfo) => boolean
): string[] {
  if (!filterFn) {
    return items;
  }
  return items.filter(item =>
    filterFn({
      name: item,
      path: join(basePath, item),
      type: 'file',
      createdAt: new Date(),
      modifiedAt: new Date(),
      stats: {} as Stats,
    })
  );
}

/**
 * Sorts the items based on the provided sorting function.
 *
 * @param items - The list of item information.
 * @param sortFn - The optional sorting function.
 * @returns The sorted list of item information.
 */
function applySorting(
  items: ItemInfo[],
  sortFn?: (a: ItemInfo, b: ItemInfo) => number
): ItemInfo[] {
  if (sortFn) {
    return [...items].sort(sortFn);
  }
  return items;
}

/**
 * Lists all items in the specified base path, including additional information about each item, with optional filtering and sorting.
 *
 * @param basePath - The base path to list items from.
 * @param filterFn - The optional filtering function.
 * @param sortFn - The optional sorting function.
 * @returns The list of filtered and sorted item information.
 */
export async function advancedListItems(
  basePath: string,
  filterFn?: (item: ItemInfo) => boolean,
  sortFn?: (a: ItemInfo, b: ItemInfo) => number
): Promise<ItemInfo[]> {
  try {
    const items = await readdir(basePath);
    const validItems = applyFiltering(items, basePath, filterFn);
    const itemStats = await getAllItemStats(validItems, basePath);
    return applySorting(itemStats, sortFn);
  } catch (error) {
    console.error(`Error listing items in path ${basePath}:`, error);
    return [];
  }
}

/**
 * Lists all folders in the specified base path.
 *
 * @param basePath - The base path to list folders from.
 * @returns The list of folder information.
 */
export function listFoldersInfo(basePath: string): Promise<ItemInfo[]> {
  return advancedListItems(basePath, item => item.type === 'folder');
}

/**
 * Lists all files in the specified base path.
 *
 * @param basePath - The base path to list files from.
 * @returns The list of file information.
 */
export function listFilesInfo(basePath: string): Promise<ItemInfo[]> {
  return advancedListItems(basePath, item => item.type === 'file');
}
