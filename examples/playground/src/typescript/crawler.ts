import fs from 'node:fs';
import path from 'node:path';

function listImagesInFolder(folderPath: string): string[] {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif']; // Add more extensions if needed
  const files = fs.readdirSync(folderPath);
  const imageFiles = files.filter(file => {
    const extension = path.extname(file).toLowerCase();
    return imageExtensions.includes(extension);
  });
  return imageFiles;
}

const folderPath = '/projects/monorepo-one/private/imgs';
const imageFiles = listImagesInFolder(folderPath);
console.log(imageFiles);
