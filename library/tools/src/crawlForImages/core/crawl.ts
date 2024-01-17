/**
 * The crawl module provides functions for crawling directories and filtering image file paths.
 * @module crawl
 */

import { promises as fsPromises } from 'fs';

/**
 * Set of image file extensions.
 */
export const imageExtensions = new Set([
  'jpg',
  'jpeg',
  'png',
  'gif',
  'bmp',
  'tiff',
]);

/**
 * Ensures that the input is an array. If the input is already an array, it is returned as is.
 * If the input is a string, it is wrapped in an array and returned.
 * @param paths - The input paths.
 * @returns An array of paths.
 */
export function ensureArray(paths: string[] | string): string[] {
  return Array.isArray(paths) ? paths : [paths];
}

/**
 * Checks if a file path is an image file path based on its extension.
 * @param filePath - The file path to check.
 * @returns A boolean indicating whether the file path is an image file path.
 */
export function isImageFilePath(filePath: string): boolean {
  const extension = filePath.split('.').pop()?.toLowerCase();
  return extension ? imageExtensions.has(extension) : false;
}

/**
 * Checks if a path is a directory.
 * @param path - The path to check.
 * @returns A promise that resolves to a boolean indicating whether the path is a directory.
 */
export async function isDirectory(path: string): Promise<boolean> {
  try {
    const stat = await fsPromises.stat(path);
    return stat.isDirectory();
  } catch (error) {
    console.error(`Error checking if path is a directory: ${error}`);
    return false;
  }
}

/**
 * Reads the contents of a directory.
 * @param path - The path of the directory to read.
 * @returns A promise that resolves to an array of file names in the directory.
 */
export async function readDirectory(path: string): Promise<string[]> {
  try {
    return await fsPromises.readdir(path);
  } catch (error) {
    console.error(`Error reading directory: ${error}`);
    return [];
  }
}

/**
 * Filters an array of file paths and returns only the image file paths.
 * @param paths - The array of file paths to filter.
 * @returns An array of image file paths.
 */
export function filterImageFiles(paths: string[]): string[] {
  return paths.filter(isImageFilePath);
}
