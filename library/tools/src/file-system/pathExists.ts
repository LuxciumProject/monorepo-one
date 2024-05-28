import { existsSync } from 'fs';

// Check if the path exists
export function pathExists(input: string): boolean {
  return existsSync(input);
}
