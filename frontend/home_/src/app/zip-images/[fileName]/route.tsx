// @/app/zip-images/[fileName]/route.tsx
'use server';
// 🚫 Importing server-side logic into client modules strictly prohibited
import { getImageFile } from '@ServerActions/getImageFile';

export async function GET(
  _request: Request,
  { params }: { params: { fileName: string; zipFilePath: string } },
) {
  return getImageFile(params.fileName, params.zipFilePath);
}
