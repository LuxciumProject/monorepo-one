import { lstatSync, readdirSync } from 'fs';
import { join } from 'path/posix';

// Get subdirectories in the given directory
export function getSubdirectories(input: string): string[] {
  return readdirSync(input).filter(file => {
    return lstatSync(join(input, file)).isDirectory();
  });
}
