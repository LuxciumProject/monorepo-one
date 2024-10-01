// src/app/actions/getImageFile.ts
'use server';

import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

export async function getImageFile(fileName: string): Promise<Buffer | null> {
  try {
    const zipFilePath = path.resolve(
      '/run/media/luxcium/2TB-Seagate/MJ-backups/2023/octobre/04/midjourney_session_2023-10-4_[350-400].zip',
    );

    if (!fs.existsSync(zipFilePath)) {
      throw new Error('Zip file not found');
    }

    const zip = new AdmZip(zipFilePath);
    const fileEntry = zip.getEntry(fileName);

    if (!fileEntry) {
      throw new Error(`File ${fileName} not found in the zip`);
    }

    const fileData = fileEntry.getData(); // Returns Buffer
    return fileData;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error('Error retrieving image file:', e.message);
    } else {
      console.error(
        'An unknown error occurred while retrieving the image file.',
      );
    }
    return null;
  }
}
