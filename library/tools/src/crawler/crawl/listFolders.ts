// src/crawler/crawl/listFolders.ts
import { readdirSync, statSync } from 'fs';
import { join } from 'path/posix';

/**
 * @function listFolders
 * @param {string} basePath - The base path where folders should be listed.
 * @param {boolean} [caseInsensitive=false] - Whether the search should be case insensitive.
 * @returns {Set<string>} - A set of folder names in the given base path.
 * @description Lists all folders in the specified base path, with an option to perform a case-insensitive search.
 */

export function listFolders(
  basePath: string,
  caseInsensitive: boolean = false
): Set<string> {
  try {
    const folders = readdirSync(basePath).filter(file => {
      return statSync(join(basePath, file)).isDirectory();
    });
    return new Set(
      caseInsensitive ? folders.map(folder => folder.toLowerCase()) : folders
    );
  } catch (error) {
    console.error(`Error listing folders in path ${basePath}:`, error);
    return new Set();
  }
}
