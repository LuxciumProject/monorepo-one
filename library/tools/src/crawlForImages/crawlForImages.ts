/**
 * @module crawlForImages
 * @description This module provides functions for recursively
 * crawling a directory and its subdirectories to find image files.
 */

import { join } from 'path';

import {
  ensureArray,
  filterImageFiles,
  isDirectory,
  readDirectory,
} from './core';

/**
 * Recursively crawls a directory and its subdirectories to find image files.
 * @param path - The path of the directory to crawl.
 * @returns A promise that resolves to an array of image file paths.
 */
async function crawlForImages(path: string): Promise<string[]> {
  let imageFiles: string[] = [];

  if (await isDirectory(path)) {
    const contents = await readDirectory(path);
    for (const item of contents) {
      const fullPath = join(path, item);
      if (await isDirectory(fullPath)) {
        imageFiles = imageFiles.concat(await crawlForImages(fullPath));
      } else if (filterImageFiles([fullPath]).length > 0) {
        imageFiles.push(fullPath);
      }
    }
  }

  return imageFiles;
}

/**
 * Finds images in one or more directories.
 * @param paths - An array of directory paths or a single directory path.
 * @returns A promise that resolves to an array of image file paths.
 */
export async function findImages(paths: string[] | string): Promise<string[]> {
  const pathsArray = ensureArray(paths);
  let allImageFiles: string[] = [];

  for (const path of pathsArray) {
    const imageFiles = await crawlForImages(path);
    allImageFiles = allImageFiles.concat(imageFiles);
  }

  return allImageFiles;
}
