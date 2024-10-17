// src/crawler/crawl/listFiles.ts
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

/**
 * @function listFiles
 * @param {string} basePath - The base path where files should be listed.
 * @param {boolean} [caseInsensitive=false] - Whether the search should be case insensitive.
 * @returns {Set<string>} - A set of file names in the given base path.
 * @description Lists all files in the specified base path, with an option to perform a case-insensitive search.
 */

export function listFiles(
  basePath: string,
  caseInsensitive: boolean = false
): Set<string> {
  try {
    const files = readdirSync(basePath).filter(file => {
      return statSync(join(basePath, file)).isFile();
    });
    return new Set(
      caseInsensitive ? files.map(file => file.toLowerCase()) : files
    );
  } catch (error) {
    console.error(`Error listing files in path ${basePath}:`, error);
    return new Set();
  }
}
