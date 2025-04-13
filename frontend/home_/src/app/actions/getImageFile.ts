// @/ServerActions/getImageFile.ts
'use server';
// 🚫 Do NOT import this module directly in client code.
import 'server-only';

import AdmZip from 'adm-zip';
import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function getImageFile(
  fileName: string,
  zipFilePath: string,
): Promise<NextResponse> {
  try {
    const resolvedPath = path.resolve(zipFilePath);

    if (!fs.existsSync(resolvedPath)) {
      throw new Error('Zip file not found');
    }

    const zip = new AdmZip(resolvedPath);
    const fileEntry = zip.getEntry(fileName);

    if (!fileEntry) {
      throw new Error(`File "${fileName}" not found in zip`);
    }

    const imageData = fileEntry.getData();
    return new NextResponse(imageData, {
      headers: {
        'Content-Type': 'image/png', // Adjust based on image type
      },
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error('Error fetching image:', e.message);
      return new NextResponse(`Error: ${e.message}`, { status: 404 });
    }
    console.error('Unknown error occurred while fetching image.');
    return new NextResponse('Unknown error occurred', { status: 500 });
  }
}
