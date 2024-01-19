import { crawl } from './core';
import crawlForImages from './crawlForImages';

/**
 * Ensures that the input is an array. If the input is already an array, it returns the input as is.
 * If the input is not an array, it wraps it in an array and returns it.
 * @param input The input value to ensure as an array.
 * @returns The input value as an array.
 */
const ensureArray = crawl.ensureArray;

/**
 * Filters an array of file paths and returns only the paths that point to image files.
 * @param filePaths An array of file paths to filter.
 * @returns An array of file paths that point to image files.
 */
const filterImageFiles = crawl.filterImageFiles;

/**
 * An array of supported image file extensions.
 */
const imageExtensions = crawl.imageExtensions;

/**
 * Checks if a given path is a directory.
 * @param path The path to check.
 * @returns A boolean indicating whether the path is a directory or not.
 */
const isDirectory = crawl.isDirectory;

/**
 * Checks if a given file path points to an image file.
 * @param filePath The file path to check.
 * @returns A boolean indicating whether the file path points to an image file or not.
 */
const isImageFilePath = crawl.isImageFilePath;

/**
 * Reads the contents of a directory and returns an array of file paths.
 * @param directoryPath The path of the directory to read.
 * @returns An array of file paths in the directory.
 */
const readDirectory = crawl.readDirectory;

ensureArray;
filterImageFiles;
imageExtensions;
isDirectory;
isImageFilePath;
readDirectory;

/**
 * Crawls a directory and its subdirectories to find images.
 * @param directoryPath The path of the directory to crawl.
 * @returns An array of image file paths found in the directory and its subdirectories.
 */
const crawlForImages_fn = crawlForImages.crawlForImages;

/**
 * Checks if a given file path points to an image file.
 * @param filePath The file path to check.
 * @returns A boolean indicating whether the file path points to an image file or not.
 */
const isImageFile = crawlForImages.isImageFile;

/**
 * Finds images in an array of file paths.
 * @param filePaths An array of file paths to search for images.
 * @returns An array of image file paths found in the input array.
 declare const  */
const findImages_fn = crawlForImages.findImages;

crawlForImages_fn;
isImageFile;
findImages_fn;

// (async function main() {
//   const targetDirectory = '/path/to/target';

//   // Check if the target is a directory
//   if (!isDirectory(targetDirectory)) {
//     throw new Error('The specified path is not a directory.');
//   }

//   // Read the directory contents
//   const directoryContents = readDirectory(targetDirectory);

//   // Ensure the contents are in an array format
//   const fileList = ensureArray(directoryContents);

//   // Use the findImages function to process each file path
//   for await (const imagePath of findImages_fn(fileList)) {
//     // Process each image path, e.g., log to console or add to an array
//     console.log('Found image:', imagePath);
//   }
// }
// )

const dir_path = '/projects/monorepo-one/private/imgs/' as const;
async function main(targetDirectory: string) {
  // Check if the target is a directory
  if (!(await isDirectory(targetDirectory))) {
    throw new Error('The specified path is not a directory.');
  }

  // Read the directory contents (awaiting the Promise here)
  const directoryContents = await readDirectory(targetDirectory);

  // Ensure the contents are in an array format
  const fileList = ensureArray(directoryContents);

  // Use the findImages function to process each file path
  for await (const imagePath of findImages_fn(fileList)) {
    // Process each image path, e.g., log to console or add to an array
    console.log('Found image:', imagePath);
  }
}

// Run the main function
main(dir_path)
  .then(() => {
    console.log('Image crawling has been completed.');
  })
  .catch(error => {
    console.error('An error occurred during image crawling:', error);
  });
