// @/ServerActions/listZipContents.ts
'use server';
// 🚫 Do NOT import this module directly in client code.
import 'server-only';

import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';

const ZIP_ROOT_DIR = path.resolve('/var/app/data/zips'); // TODO: Adjust to your zip storage directory

export async function listZipContents(zipFilePath: string): Promise<string[]> {
  try {
    // Only allow zip files within ZIP_ROOT_DIR
    // Normalize and resolve the path
    const candidatePath = path.resolve(ZIP_ROOT_DIR, zipFilePath);
    let resolvedPath: string;
    try {
      resolvedPath = fs.realpathSync(candidatePath);
    } catch (err) {
      throw new Error('Zip file not found');
    }

    // Ensure the zip path is within the ZIP_ROOT_DIR
    if (!resolvedPath.startsWith(ZIP_ROOT_DIR + path.sep)) {
      throw new Error('Unauthorized zip file path');
    }

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
