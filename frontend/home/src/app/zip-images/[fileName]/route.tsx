// @/app/zip-images/[fileName]/route.tsx
'use server';

import { getImageFile } from '@/app/actions/getImageFile';

export async function GET(
  _request: Request,
  { params }: { params: { fileName: string } },
) {
  return getImageFile(params.fileName);
}
