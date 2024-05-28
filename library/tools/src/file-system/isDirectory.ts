import { lstatSync } from 'fs';

// Check if the path is a directory
export function isDirectory(input: string): boolean {
  const stats = lstatSync(input);
  return stats.isDirectory();
}
