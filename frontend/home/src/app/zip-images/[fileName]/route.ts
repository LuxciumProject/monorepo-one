// src/app/zip-images/[fileName]/route.ts
'use server';

import { NextResponse } from 'next/server';
import { getImageFile } from '@/app/actions/getImageFile';

export async function GET(
  _req: Request, // Prefixed with underscore to indicate it's unused
  { params }: { params: { fileName: string } },
): Promise<NextResponse> {
  try {
    const imageData = await getImageFile(params.fileName);

    if (!imageData) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    // Determine Content-Type based on file extension
    const extension = params.fileName.split('.').pop()?.toLowerCase();
    const contentTypeMap: { [key: string]: string } = {
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      gif: 'image/gif',
    };
    const contentType =
      contentTypeMap[extension || ''] || 'application/octet-stream';

    return new NextResponse(imageData, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${params.fileName}"`,
      },
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error('Error in image route:', e.message);
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
    console.error('Unknown error in image route.');
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
