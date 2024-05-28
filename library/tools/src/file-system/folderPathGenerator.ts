// folderPathGenerator.ts

import { join } from 'node:path';

import { getSubdirectories } from './getSubdirectories';
import { isDirectory } from './isDirectory';
import { pathExists } from './pathExists';

// Generator function that yields folder paths within the given directory
export function* folderPathGenerator(
  input: string
): Generator<string, false | null | undefined> {
  const exists = pathExists(input);
  if (!exists) {
    return undefined; // Return undefined if the path doesn't exist
  }

  const isDir = isDirectory(input);
  if (!isDir) {
    return null; // Return null if the path is not a directory
  }

  const folders = getSubdirectories(input);
  if (0 === folders.length) {
    return false; // Return false if the directory has no subdirectories
  }

  // Yield each folder's absolute path
  for (const folder of folders) {
    yield join(input, folder);
  }

  // Return false when there are no more directories to yield
  return false;
}
