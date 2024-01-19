import { crawl } from './core';
import crawlForImages from './crawlForImages';

/**
 * Ensures that the input is an array. If the input is already an array, it returns the input as is.
 * If the input is not an array, it wraps it in an array and returns it.
 * @param input The input value to ensure as an array.
 * @returns The input value as an array.
 */
crawl.ensureArray;

/**
 * Filters an array of file paths and returns only the paths that point to image files.
 * @param filePaths An array of file paths to filter.
 * @returns An array of file paths that point to image files.
 */
crawl.filterImageFiles;

/**
 * An array of supported image file extensions.
 */
crawl.imageExtensions;

/**
 * Checks if a given path is a directory.
 * @param path The path to check.
 * @returns A boolean indicating whether the path is a directory or not.
 */
crawl.isDirectory;

/**
 * Checks if a given file path points to an image file.
 * @param filePath The file path to check.
 * @returns A boolean indicating whether the file path points to an image file or not.
 */
crawl.isImageFilePath;

/**
 * Reads the contents of a directory and returns an array of file paths.
 * @param directoryPath The path of the directory to read.
 * @returns An array of file paths in the directory.
 */
crawl.readDirectory;

/**
 * Crawls a directory and its subdirectories to find images.
 * @param directoryPath The path of the directory to crawl.
 * @returns An array of image file paths found in the directory and its subdirectories.
 */
crawlForImages.crawlForImages;

/**
 * Checks if a given file path points to an image file.
 * @param filePath The file path to check.
 * @returns A boolean indicating whether the file path points to an image file or not.
 */
crawlForImages.isImageFile;

/**
 * Finds images in an array of file paths.
 * @param filePaths An array of file paths to search for images.
 * @returns An array of image file paths found in the input array.
 */
crawlForImages.findImages;
