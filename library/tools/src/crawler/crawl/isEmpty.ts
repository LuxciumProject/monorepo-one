// src/crawler/crawl/isEmpty.ts
import { containsFiles } from './containsFiles';
import { containsFolders } from './containsFolders';

/**
 * @function isEmpty
 * @param {string} basePath - The base path to check.
 * @param {boolean} [caseInsensitive=false] - Whether the search should be case insensitive.
 * @returns {boolean} - True if the base path contains neither files nor folders, false otherwise.
 * @description Checks if the specified base path is empty (contains neither files nor folders).
 */

export function isEmpty(
  basePath: string,
  caseInsensitive: boolean = false
): boolean {
  return (
    !containsFolders(basePath, caseInsensitive) &&
    !containsFiles(basePath, caseInsensitive)
  );
}
