import { Stats } from 'fs';
import fs from 'fs/promises';
import path from 'path';

const dirPath =
  '/projects/monorepo-one/common/temp/node_modules/.pnpm/@anthropic-ai+sdk@0.18.0/node_modules/@anthropic-ai/sdk/src';
const extensions = ['.txt', '.ts']; // Add the extensions you want to include

void async function convertFileStructureToString_(
  dirPath: string
): Promise<string> {
  let output = '';

  const items = await fs.readdir(dirPath);
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stat = await fs.stat(itemPath);

    if (stat.isDirectory()) {
      output +=
        `at: ${itemPath}↓\n` +
        (await convertFileStructureToString_(itemPath)) +
        '\n';
    } else {
      output +=
        `at: ${itemPath}→\n\n` + (await fs.readFile(itemPath, 'utf-8')) + '\n';
    }
  }

  return output;
};
export async function convertFileStructureToString(
  dirPath: string,
  extensions: string[]
): Promise<string> {
  let output = '';

  const items = await fs.readdir(dirPath);
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stat: Stats = await fs.stat(itemPath);

    if (stat.isDirectory()) {
      if (item.startsWith('_')) continue;
      if (item.startsWith('shim')) continue;
      output +=
        `at: ${itemPath}↓\n` +
        (await convertFileStructureToString(itemPath, extensions)) +
        '\n';
    } else {
      const ext = path.extname(itemPath).toLowerCase();
      if (extensions.includes(ext)) {
        output +=
          `at: ${itemPath}→\n\n` +
          (await fs.readFile(itemPath, 'utf-8')) +
          '\n';
      }
    }
  }

  return output;
}

convertFileStructureToString(dirPath, extensions)
  .then(output => console.log(output))
  .catch(err => console.error(err));
