// @/ServerActions/listZipContents.ts
'use server';
// 🚫 Do NOT import this module directly in client code.
import 'server-only';

import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';

export async function listZipContents(zipFilePath: string): Promise<string[]> {
  try {
    const resolvedPath = path.resolve(zipFilePath);

    if (!fs.existsSync(resolvedPath)) {
      throw new Error('Zip file not found');
    }

    const zip = new AdmZip(resolvedPath);
    const fileEntries = zip
      .getEntries()
      .filter(
        (entry) =>
          !entry.isDirectory && /\.(png|jpg|jpeg|gif)$/i.test(entry.entryName),
      )
      .map((entry) => entry.entryName);

    return fileEntries;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error('Error listing zip contents:', e.message);
    } else {
      console.error('An unknown error occurred while listing zip contents.');
    }
    return [];
  }
}
