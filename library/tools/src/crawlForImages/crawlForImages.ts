import { promises as fsPromises } from 'fs';
import { join } from 'path';

// Convert a path or array of paths to a uniform array of paths
function ensureArray(paths: string[] | string): string[] {
  return Array.isArray(paths) ? paths : [paths];
}

// Define a case-insensitive set of common image file extensions
const imageExtensions = new Set(['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff']);

// Check if a file path has an image extension
function isImageFile(filePath: string): boolean {
  const extension = filePath.split('.').pop()?.toLowerCase();
  return extension ? imageExtensions.has(extension) : false;
}

// Check if a path is a directory
async function isDirectory(path: string): Promise<boolean> {
  try {
    const stat = await fsPromises.stat(path);
    return stat.isDirectory();
  } catch (error) {
    console.error(`Error checking if path is a directory: ${error}`);
    return false;
  }
}

// Read the contents of a directory
async function readDirectory(path: string): Promise<string[]> {
  try {
    return await fsPromises.readdir(path);
  } catch (error) {
    console.error(`Error reading directory: ${error}`);
    return [];
  }
}

// Filter a list of paths for image files
export function filterImageFiles(paths: string[]): string[] {
  return paths.filter(isImageFile);
}

// Recursively crawl a directory for image files
async function crawlForImages(path: string): Promise<string[]> {
  let imageFiles: string[] = [];

  if (await isDirectory(path)) {
    const contents = await readDirectory(path);
    for (const item of contents) {
      const fullPath = join(path, item);
      if (await isDirectory(fullPath)) {
        imageFiles = imageFiles.concat(await crawlForImages(fullPath));
      } else if (isImageFile(fullPath)) {
        imageFiles.push(fullPath);
      }
    }
  }

  return imageFiles;
}

// Function to start the crawling process from an initial path or array of paths
async function findImages(paths: string[] | string): Promise<string[]> {
  const pathsArray = ensureArray(paths);
  let allImageFiles: string[] = [];

  for (const path of pathsArray) {
    const imageFiles = await crawlForImages(path);
    allImageFiles = allImageFiles.concat(imageFiles);
  }

  return allImageFiles;
}

// Usage
const startPaths = '/path/to/start'; // This can also be an array of paths
findImages(startPaths).then(imageFiles => {
  console.log('Found image files:', imageFiles);
});
