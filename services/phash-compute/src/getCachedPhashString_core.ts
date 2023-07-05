import { mixBases, mixExpected } from '@luxcium/object-with-expectations';
import { stat } from 'node:fs/promises';
import { normalize } from 'node:path';
import type { RedisClientType } from 'redis';

import { getBigStrPhashFromFile } from './getBigStrPHashFromFile';
import { pHashGetLookUp } from './pHashGetLookUp';
import { redisSetK } from './redisSetK';

import type {
  DebugFlag,
  ImageFilePath,
  ImageFilePathWithExpectedStats,
  ImageFileWithPHashString,
} from './types';

// Helper function to build the return result
function buildResult<T extends ImageFilePathWithExpectedStats>(
  imageFilePath: T,
  lookup: any
) {
  return {
    ...mixBases<any, any, any, any>(imageFilePath, lookup),
    ...mixExpected<any, any>(imageFilePath, lookup),
  };
}

// Helper function to handle lookup
async function handleLookup(
  R: RedisClientType,
  path: string,
  debug: DebugFlag
) {
  const lookUP = await pHashGetLookUp(R, path);
  const { pHashString } = lookUP;

  if (pHashString !== false && pHashString !== '') {
    !!debug && console.warn(`lookUP:`, lookUP);
    return lookUP;
  }

  return null;
}

// Helper function to handle calculation
async function handleCalculation(
  R: RedisClientType,
  path: string,
  debug: DebugFlag
) {
  const bigStr = await getBigStrPhashFromFile(path);

  if (bigStr !== '' && (await redisSetK(R, path, bigStr))) {
    !!debug && console.warn(`computed: ${bigStr}`);

    const pHashString = bigStr;
    const pHashMethod = 'cached';
    const cacheKey = path; // The path is used as the cache key here

    return { pHashString, pHashMethod, cacheKey };
  }

  return null;
}

export function getCachedPhashString_core(
  R: RedisClientType | null = null,
  debug: DebugFlag = null
) {
  return async <T extends ImageFilePathWithExpectedStats>(
    imageFilePath: T | string
  ): Promise<T & ImageFileWithPHashString> => {
    const normalizedImageFilePath =
      typeof imageFilePath === 'string'
        ? await getImageFilePathWithExpectedStats(imageFilePath)
        : imageFilePath;

    const { compatibleImagefilePath } = normalizedImageFilePath;
    const pathObj = {
      path: compatibleImagefilePath,
    };

    if (!R) {
      const bigStr = await getBigStrPhashFromFile(pathObj.path);
      const pHashString = bigStr;
      const pHashMethod = 'direct';
      const cacheKey = pathObj.path; // The path is used as the cache key here

      return buildResult(normalizedImageFilePath, {
        pHashString,
        pHashMethod,
        cacheKey,
      });
    }

    let lookup = await handleLookup(R, pathObj.path, debug);

    if (!lookup) {
      lookup = await handleCalculation(R, pathObj.path, debug);
      if (!lookup) {
        lookup = {
          pHashString: '',
          pHashMethod: 'direct',
          cacheKey: pathObj.path,
        }; // Default values are assigned here
        !!debug &&
          console.error(
            `Error (can't compute phashString): '<empty string>'`,
            pathObj
          );
      }
    }

    return buildResult(normalizedImageFilePath, lookup);
  };
}

export async function getImageFilePathWithExpectedStats(
  filePathOrObject: string | ImageFilePath
): Promise<ImageFilePathWithExpectedStats> {
  const compatibleImagefilePath =
    typeof filePathOrObject === 'string'
      ? normalize(filePathOrObject)
      : filePathOrObject.compatibleImagefilePath;

  return {
    compatibleImagefilePath,
    expected: {
      stats: () => stat(compatibleImagefilePath),
    },
  };
}
