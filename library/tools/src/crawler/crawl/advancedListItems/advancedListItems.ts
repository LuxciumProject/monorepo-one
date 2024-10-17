// src/crawler/crawl/advancedListItems/advancedListItems.ts

import { readdir, stat } from 'fs/promises';
import { extname, join } from 'path';
import {
  BaseItemInfo,
  BlockDeviceInfo,
  CharacterDeviceInfo,
  FIFOInfo,
  FileInfo,
  FilterFn,
  FolderInfo,
  ItemInfo,
  ItemType,
  ItemTypeMap,
  ListOptions,
  SocketInfo,
  SortFn,
  SymbolicLinkInfo,
  UnknownInfo,
} from './types';

/**
 * Retrieves detailed information about an item.
 *
 * @param itemPath - The absolute path to the item.
 * @param itemName - The name of the item.
 * @returns A promise that resolves to the item's information.
 */
async function getItemInfo(
  itemPath: string,
  itemName: string
): Promise<ItemInfo> {
  const stats = await stat(itemPath);
  const baseInfo: BaseItemInfo = {
    type: 'unknown', // Default type, will be updated.
    name: itemName,
    path: itemPath,
    createdAt: stats.birthtime,
    modifiedAt: stats.mtime,
    stats,
  };

  if (stats.isFile()) {
    const fileInfo: FileInfo = {
      ...baseInfo,
      type: 'file',
      size: stats.size,
      extension: extname(itemName) || undefined,
    };
    return fileInfo;
  } else if (stats.isDirectory()) {
    const folderInfo: FolderInfo = {
      ...baseInfo,
      type: 'folder',
      size: null,
      extension: null,
    };
    return folderInfo;
  } else if (stats.isBlockDevice()) {
    const blockDeviceInfo: BlockDeviceInfo = {
      ...baseInfo,
      type: 'blockDevice',
    };
    return blockDeviceInfo;
  } else if (stats.isCharacterDevice()) {
    const characterDeviceInfo: CharacterDeviceInfo = {
      ...baseInfo,
      type: 'characterDevice',
    };
    return characterDeviceInfo;
  } else if (stats.isSymbolicLink()) {
    const symbolicLinkInfo: SymbolicLinkInfo = {
      ...baseInfo,
      type: 'symbolicLink',
    };
    return symbolicLinkInfo;
  } else if (stats.isFIFO()) {
    const fifoInfo: FIFOInfo = {
      ...baseInfo,
      type: 'fifo',
    };
    return fifoInfo;
  } else if (stats.isSocket()) {
    const socketInfo: SocketInfo = {
      ...baseInfo,
      type: 'socket',
    };
    return socketInfo;
  } else {
    const unknownInfo: UnknownInfo = {
      ...baseInfo,
      type: 'unknown',
    };
    return unknownInfo;
  }
}

/**
 * Retrieves detailed information for all items in a directory.
 *
 * @param basePath - The base path to list items from.
 * @returns A promise that resolves to a list of item information.
 */
async function getAllItemsInfo(basePath: string): Promise<ItemInfo[]> {
  const itemNames = await readdir(basePath);
  const itemInfoPromises = itemNames.map(async itemName => {
    const itemPath = join(basePath, itemName);
    try {
      return await getItemInfo(itemPath, itemName);
    } catch (error) {
      console.error(`Error getting info for item ${itemPath}:`, error);
      return null;
    }
  });

  // Wait for all ItemInfo promises to resolve and filter out null values
  const itemsInfo = await Promise.all(itemInfoPromises);
  return itemsInfo.filter((item): item is ItemInfo => item !== null);
}

/**
 * Filters items based on a provided function.
 *
 * @param items - The list of item information.
 * @param filterFn - The filtering function.
 * @returns The filtered list of items.
 */
function applyFiltering<T extends ItemInfo>(
  items: T[],
  filterFn: FilterFn<T>
): T[] {
  return items.filter(filterFn);
}

/**
 * Sorts items based on a provided function.
 *
 * @param items - The list of item information.
 * @param sortFn - The sorting function.
 * @returns The sorted list of items.
 */
function applySorting<T extends ItemInfo>(items: T[], sortFn: SortFn<T>): T[] {
  return [...items].sort(sortFn);
}

/**
 * Filters items by type ('file', 'folder', etc.).
 *
 * @param items - The list of item information.
 * @param type - The type of items to filter ('file', 'folder', etc.).
 * @returns The filtered list of items.
 */
function filterByType<K extends ItemType>(
  items: ItemInfo[],
  type: K
): Array<ItemTypeMap[K]> {
  return items.filter((item): item is ItemTypeMap[K] => item.type === type);
}

/**
 * Lists items in a directory with optional filtering and sorting.
 *
 * @param basePath - The base path to list items from.
 * @param options - The options for listing items.
 * @returns A promise that resolves to the list of item information.
 */
export function advancedListItems<K extends ItemType>(
  basePath: string,
  options: ListOptions<ItemTypeMap[K]> & { type: K }
): Promise<Array<ItemTypeMap[K]>>;

export function advancedListItems(
  basePath: string,
  options?: ListOptions<ItemInfo> & { type?: 'all' }
): Promise<ItemInfo[]>;

export async function advancedListItems(
  basePath: string,
  options: ListOptions<ItemInfo> = { type: 'all' }
): Promise<ItemInfo[]> {
  const { type = 'all', filterFn, sortFn } = options;

  try {
    let items: ItemInfo[] = await getAllItemsInfo(basePath);

    if (type !== 'all') {
      items = filterByType(items, type);
    }

    if (filterFn) {
      items = applyFiltering(items as any[], filterFn as any);
    }

    if (sortFn) {
      items = applySorting(items as any[], sortFn as any);
    }

    return items;
  } catch (error) {
    console.error(`Error listing items in path ${basePath}:`, error);
    return [];
  }
}

/**
 * Lists files in a directory with optional filtering and sorting.
 *
 * @param basePath - The base path to list files from.
 * @param filterFn - The optional filtering function.
 * @param sortFn - The optional sorting function.
 * @returns A promise that resolves to the list of file information.
 */
export function listFiles(
  basePath: string,
  filterFn?: FilterFn<FileInfo>,
  sortFn?: SortFn<FileInfo>
): Promise<FileInfo[]> {
  const options: ListOptions<FileInfo> & { type: 'file' } = { type: 'file' };

  if (filterFn) options.filterFn = filterFn;
  if (sortFn) options.sortFn = sortFn;

  return advancedListItems(basePath, options);
}

/**
 * Lists folders in a directory with optional filtering and sorting.
 *
 * @param basePath - The base path to list folders from.
 * @param filterFn - The optional filtering function.
 * @param sortFn - The optional sorting function.
 * @returns A promise that resolves to the list of folder information.
 */
export function listFolders(
  basePath: string,
  filterFn?: FilterFn<FolderInfo>,
  sortFn?: SortFn<FolderInfo>
): Promise<FolderInfo[]> {
  const options: ListOptions<FolderInfo> & { type: 'folder' } = {
    type: 'folder',
  };

  if (filterFn) options.filterFn = filterFn;
  if (sortFn) options.sortFn = sortFn;

  return advancedListItems(basePath, options);
}

/**
 * Lists all items (files and folders) in a directory with optional filtering and sorting.
 *
 * @param basePath - The base path to list items from.
 * @param filterFn - The optional filtering function.
 * @param sortFn - The optional sorting function.
 * @returns A promise that resolves to the list of item information.
 */
export function listAllItems(
  basePath: string,
  filterFn?: FilterFn<ItemInfo>,
  sortFn?: SortFn<ItemInfo>
): Promise<ItemInfo[]> {
  const options: ListOptions<ItemInfo> & { type: 'all' } = { type: 'all' };

  if (filterFn) options.filterFn = filterFn;
  if (sortFn) options.sortFn = sortFn;

  return advancedListItems(basePath, options);
}

/**
 * Lists items of a specific type in a directory with optional filtering and sorting.
 *
 * @param basePath - The base path to list items from.
 * @param type - The type of items to list ('file', 'folder', etc.).
 * @param filterFn - The optional filtering function.
 * @param sortFn - The optional sorting function.
 * @returns A promise that resolves to the list of item information.
 */
export function listItemsOfType<K extends ItemType>(
  basePath: string,
  type: K,
  filterFn?: FilterFn<ItemTypeMap[K]>,
  sortFn?: SortFn<ItemTypeMap[K]>
): Promise<Array<ItemTypeMap[K]>> {
  const options: ListOptions<ItemTypeMap[K]> & { type: K } = { type };

  if (filterFn) options.filterFn = filterFn;
  if (sortFn) options.sortFn = sortFn;

  return advancedListItems(basePath, options);
}
