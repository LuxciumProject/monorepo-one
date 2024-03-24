import { extname } from 'node:path';
import type { ValidMimeType } from '../types';
export function getMediaType(file: string): ValidMimeType | '' {
  const ext = extname(file).toLowerCase();
  const mediaTypes: { [key: string]: ValidMimeType } = {
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
  };
  return mediaTypes[ext] || '';
}

// export const getMediaType: GetMediaType = [
//   // async function getMediaType(file: Buffer): Promise<ValidMimeType | ''> {
//   //   const buffer = readFileSync(file);
//   //   const fileType: ImageFileTypeResult = (await fileTypeFromBuffer(
//   //     buffer
//   //   )) as ImageFileTypeResult;

//   //   if (
//   //     !fileType ||
//   //     !['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(
//   //       fileType.mime
//   //     )
//   //   ) {
//   //     return '';
//   //   }

//   //   return fileType ? fileType.mime : '';
//   // },
//   function getMediaType(file: string): ValidMimeType | '' {
//     const ext = extname(file).toLowerCase();
//     const mediaTypes: { [key: string]: ValidMimeType } = {
//       '.jpeg': 'image/jpeg',
//       '.jpg': 'image/jpeg',
//       '.png': 'image/png',
//       '.gif': 'image/gif',
//       '.webp': 'image/webp',
//     };
//     return mediaTypes[ext] || '';
//   },
// ];
