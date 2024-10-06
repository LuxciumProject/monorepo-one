// @/app/zip-images/[fileName]/route.tsx
'use server';
// 🚫 Do NOT import this module directly in client code ('use client') modules

import { getImageFile } from '@/app/actions/getImageFile';

export async function GET(
  _request: Request,
  { params }: { params: { fileName: string } },
) {
  return getImageFile(params.fileName);
}
