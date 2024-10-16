// src/crawler/crawl.ts

import { containsFiles } from './containsFiles';
import { containsFolders } from './containsFolders';
import { isEmpty } from './isEmpty';
import { listFiles } from './listFiles';
import { listFolders } from './listFolders';
import { recombineFolders } from './recombineFolders';

/**
 * @function crawl
 * @param {string} targetPath - The path where the crawl operation should begin.
 * @param {boolean} [caseInsensitive=false] - Whether the search should be case insensitive.
 * @description Lists folders and files, then checks if the directory contains folders or files, and prints the results.
 */
export function crawl(
  targetPath: string,
  caseInsensitive: boolean = false
): void {
  console.log(`Crawling path: ${targetPath}`);
  const folders = listFolders(targetPath, caseInsensitive);
  const files = listFiles(targetPath, caseInsensitive);
  const folderPaths = recombineFolders(targetPath, folders);
  console.log('Folders found:', Array.from(folders));
  console.log('Files found:', Array.from(files));
  console.log('Full paths to folders:', folderPaths);
  console.log(
    'Contains folders:',
    containsFolders(targetPath, caseInsensitive)
  );
  console.log('Contains files:', containsFiles(targetPath, caseInsensitive));
  console.log('Is empty:', isEmpty(targetPath, caseInsensitive));
}
