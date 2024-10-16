// src/crawler/crawl/containsFiles.ts
import { listFiles } from './listFiles';

/**
 * @function containsFiles
 * @param {string} basePath - The base path to check for files.
 * @param {boolean} [caseInsensitive=false] - Whether the search should be case insensitive.
 * @returns {boolean} - True if the base path contains at least one file, false otherwise.
 * @description Checks if the specified base path contains any files.
 */

export function containsFiles(
  basePath: string,
  caseInsensitive: boolean = false
): boolean {
  return listFiles(basePath, caseInsensitive).size > 0;
}
