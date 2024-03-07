import * as fsSync from 'node:fs';
import * as fs from 'node:fs/promises';

export async function isDir(dir: string) {
  try {
    const stats = await fs.stat(dir);
    return stats.isDirectory();
  } catch (error) {
    console.error(String(error));
    return null;
  }
}

export function isDirSync(dir: string) {
  try {
    const stats = fsSync.statSync(dir);
    return stats.isDirectory();
  } catch (error) {
    console.error(String(error));
    return null;
  }
}
