/**
 * @module crawlForImages
 * @description This module provides functions for recursively
 * crawling a directory and its subdirectories to find image files.
 */

import { extname, join } from 'path';

import { ensureArray, isDirectory, readDirectory } from './core';

/**
 * Asynchronously crawls a directory and its subdirectories to find image files.
 * This generator yields each image file path as it is found.
 *
 * @param {string} path - The path of the directory to crawl.
 * @yields {Promise<string>} A promise that resolves to the path of an image file.
 */
export async function* crawlForImages(path: string): AsyncGenerator<string> {
  const directoriesStack = [path];

  while (directoriesStack.length > 0) {
    const currentDir = directoriesStack.pop();
    let directoryContents;

    try {
      if (currentDir) {
        directoryContents = await readDirectory(currentDir);
      }
    } catch (error) {
      console.error(`Error reading directory ${currentDir}:`, error);
      continue; // Skip to the next directory
    }

    if (directoryContents) {
      for (const entry of directoryContents) {
        const entryPath = join(currentDir!, entry); // Add type assertion to ensure currentDir is not undefined

        try {
          if (await isDirectory(entryPath)) {
            directoriesStack.push(entryPath);
          } else if (isImageFile(entryPath)) {
            yield entryPath; // Yield each image file path
          }
        } catch (error) {
          console.error(`Error processing ${entryPath}:`, error);
          // Continue processing other files/directories
        }
      }
    }
  }
}

export function isImageFile(filePath: string): boolean {
  // Define your image file extension check here
  const imageExtensions = new Set([
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.bmp',
    '.tiff',
  ]);
  return imageExtensions.has(extname(filePath).toLowerCase());
}

/**
 * Asynchronously crawls given paths and their subdirectories to find image files.
 * This generator yields each image file path as it is found.
 *
 * @param {string | string[]} paths - The path or array of paths of the directories to crawl.
 * @yields {Promise<string>} A promise that resolves to the path of an image file.
 */
export async function* findImages(
  paths: string[] | string
): AsyncGenerator<string> {
  const pathsArray = ensureArray(paths);
  for (const path of pathsArray) {
    for await (const imagePath of crawlForImages(path)) {
      yield imagePath;
    }
  }
}

export default { crawlForImages, isImageFile, findImages };
