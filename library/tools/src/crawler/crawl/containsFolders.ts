// src/crawler/crawl/containsFolders.ts
import { listFolders } from './listFolders';

/**
 * @function containsFolders
 * @param {string} basePath - The base path to check for folders.
 * @param {boolean} [caseInsensitive=false] - Whether the search should be case insensitive.
 * @returns {boolean} - True if the base path contains at least one folder, false otherwise.
 * @description Checks if the specified base path contains any folders.
 */

export function containsFolders(
  basePath: string,
  caseInsensitive: boolean = false
): boolean {
  return listFolders(basePath, caseInsensitive).size > 0;
}
