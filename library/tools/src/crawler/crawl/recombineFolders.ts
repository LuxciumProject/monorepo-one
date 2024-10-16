// src/crawler/crawl/recombineFolders.ts
import { join } from 'path/posix';

/**
 * @function recombineFolders
 * @param {string} basePath - The base path to which folder names will be appended.
 * @param {Set<string>} folders - The set of folder names to append to the base path.
 * @returns {string[]} - An array of full paths to each folder.
 * @description Recombines the base path with each folder name to create full folder paths.
 */

export function recombineFolders(
  basePath: string,
  folders: Set<string>
): string[] {
  return Array.from(folders).map(folder => join(basePath, folder));
}
