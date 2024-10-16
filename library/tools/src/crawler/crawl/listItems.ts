// src/crawler/crawl/listItems.ts
import { readdirSync, statSync } from 'fs';
import { join } from 'path/posix';

type SortFunction = (a: string, b: string) => number;
type FileTypeFunction = (fileName: string) => boolean;
type returnFunction = (
  basePath: string,
  sortFn?: SortFunction,
  fileTypeFn?: FileTypeFunction
) => string[];
/**
 * @function listItems
 * @param {boolean} folder - Whether to list folders. If false, lists files.
 * @returns {Function} - A function that takes a base path and returns an array of item names.
 * @description Returns a function that lists all files or folders in the specified base path based on the provided parameter.
 */

export function listItems(folder: boolean): returnFunction {
  return (
    basePath: string,
    sortFn?: (a: string, b: string) => number,
    fileTypeFn?: (fileName: string) => boolean
  ): string[] => {
    try {
      let items = readdirSync(basePath).filter(item => {
        const itemPath = join(basePath, item);
        const isDirectory = statSync(itemPath).isDirectory();
        if (folder) {
          return isDirectory;
        } else {
          return !isDirectory && (!fileTypeFn || fileTypeFn(item));
        }
      });

      // Apply the sorting function if provided, otherwise return items as-is
      if (sortFn) {
        items = items.sort(sortFn);
      }
      return items;
    } catch (error) {
      console.error(`Error listing items in path ${basePath}:`, error);
      return [];
    }
  };
}

export const listFolders = listItems(true);
export const listFiles = listItems(false);
// export type ItemInfo = {
//   name: string;
//   path: string;
//   type: 'file' | 'folder';
//   size?: number; // Size could be optional, more relevant for files
//   createdAt: Date;
//   modifiedAt: Date;
// };
