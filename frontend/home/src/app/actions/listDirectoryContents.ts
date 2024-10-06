// @/ServerActions/listDirectoryContents.ts
'use server';
// 🚫 Do NOT import this module directly in client code.
import 'server-only'; // ✅ OK to import in server-only modules.

import fs from 'fs';
import path from 'path';

interface DirectoryContents {
  directories: string[];
  files: string[];
}

export async function listDirectoryContents(
  dirPath: string,
): Promise<DirectoryContents> {
  try {
    const resolvedPath = path.resolve(dirPath);

    if (!fs.existsSync(resolvedPath)) {
      throw new Error('Directory not found');
    }

    const contents = fs.readdirSync(resolvedPath, { withFileTypes: true });

    const directories: string[] = [];
    const files: string[] = [];

    contents.forEach((item) => {
      if (item.isDirectory()) {
        directories.push(item.name);
      } else if (item.isFile() && item.name.endsWith('.zip')) {
        files.push(item.name);
      }
    });

    return { directories, files };
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error('Error listing directory contents:', e.message);
    } else {
      console.error(
        'An unknown error occurred while listing directory contents.',
      );
    }
    return { directories: [], files: [] };
  }
}
