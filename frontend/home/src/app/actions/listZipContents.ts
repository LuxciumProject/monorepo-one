// src/app/actions/listZipContents.ts
'use server';

import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

export async function listZipContents(): Promise<string[]> {
  try {
    const zipFilePath = path.resolve(
      '/run/media/luxcium/2TB-Seagate/MJ-backups/2023/octobre/04/midjourney_session_2023-10-4_[350-400].zip',
    );

    if (!fs.existsSync(zipFilePath)) {
      throw new Error('Zip file not found');
    }

    const zip = new AdmZip(zipFilePath);
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
