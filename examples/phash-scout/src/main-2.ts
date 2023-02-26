import { getPhashCompute } from '@luxcium/phash-compute';
import { ImageFileWithPHashString } from '@luxcium/phash-compute/out/typings/types';
import { rConnect } from '@luxcium/redis-services';
import { getDataPath, scanDirsFrom } from '@luxcium/scan-dirs';
import { stat } from 'node:fs/promises';
import { ImageFilePath, WithExpectedStats } from './types/ImageFilePath';

export async function processFiles(): Promise<void> {
  // Open a connection to the redis cache server
  const R = await rConnect(6383);

  // Link the connection with the pHashCompute
  const phashCompute = getPhashCompute(R, false);
  const pathAlias = 'data' as const;
  const configPath = '/projects/configs/config.json' as const;
  const pathToFolder: string = getDataPath(pathAlias, configPath, '/');

  // Initialise the file scanner to scan each folder from the link provided
  const folders = scanDirsFrom(pathToFolder).addValidExt(['.jpg', '.png']);

  const results: Promise<
    WithExpectedStats & ImageFilePath & ImageFileWithPHashString
  >[] = [...folders.scan()].map(async (filePath, index) => {
    const result = await phashCompute({
      compatibleImagefilePath: filePath,
      expected: { stats: stat(filePath) },
    });
    console.log(index, result);
    return result;
  });

  await Promise.allSettled(
    results.map(async (promise, i) => {
      const result = await promise;
      console.log(`result ${i}: `, result, '\n', result?.expected.stats);
    })
  );

  R.disconnect();
}

void processFiles();
