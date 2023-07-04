import { RedisClientType } from 'redis';
import type {
  DebugFlag,
  ImageFilePath,
  ImageFilePathWithExpectedStats,
  ImageFileWithPHashString,
} from './types';

import { mixBases, mixExpected } from '@luxcium/object-with-expectations';
import { stat } from 'node:fs/promises';
import { normalize } from 'node:path';
import { getBigStrPhashFromFile } from './getBigStrPHashFromFile';
import { pHashGetLookUp } from './pHashGetLookUp';
import { redisSetK } from './redisSetK';
/**
 *
 * @param R
 * @param debug
 * @returns The same object T passed in to wich will be added the newly
 * calculated or lokedUp pHashString and if available the redis key
 *
 * In order to use this utility service you must pass a R redis client and an optional debug flag
 * The debug flag is of type  "debug" or verbose" / null or false.
 *
 * You will have a computer with caching system to get the fom an object containinng a compatibleImagefilePath string key
 * @remarks
 */
export function getCachedPhashString_core(
  R: RedisClientType | null = null,
  debug: DebugFlag = null
) {
  return async <T extends ImageFilePathWithExpectedStats>(
    imageFilePath: T | string
  ): Promise<T & ImageFileWithPHashString> => {
    // Convert imageFilePath to ImageFilePathWithExpectedStats if it's a string imageFilePath
    const normalizedImageFilePath =
      typeof imageFilePath === 'string'
        ? await getImageFilePathWithExpectedStats(imageFilePath)
        : imageFilePath;

    const { compatibleImagefilePath } = normalizedImageFilePath;
    const pathObj = {
      path: compatibleImagefilePath,
    };

    // Without RedisClient no need to look into the cache
    if (!R) {
      const bigStr = await getBigStrPhashFromFile(pathObj.path);
      const pHashString = bigStr;
      const pHashMethod = 'direct';
      const lookup = { pHashString, pHashMethod };

      return {
        ...mixBases<any, any, any, any>(normalizedImageFilePath, lookup), //
        ...mixExpected<any, any>(normalizedImageFilePath, lookup),
      };
    }

    // Lookup if available from inside the cache
    const lookUP = await pHashGetLookUp(R, pathObj.path);
    const { pHashString } = lookUP;

    // if LookUP is positive (not false and not emptystring)
    if (pHashString !== false && pHashString !== '') {
      !!debug && console.warn(`lookUP:`, lookUP);

      // Then return from cache
      return {
        ...mixBases<any, any, any, any>(normalizedImageFilePath, lookUP), //
        ...mixExpected<any, any>(normalizedImageFilePath, lookUP),
      };
    } else {
      // Else calculate the value
      const bigStr = await getBigStrPhashFromFile(pathObj.path);

      // If the calculated string is not an empty string
      if (bigStr !== '') {
        // And if we can set it into the cache
        if (await redisSetK(R, pathObj.path, bigStr)) {
          !!debug && console.warn(`computed: ${bigStr}`);

          // Return the newly calculated value
          const pHashString = bigStr;
          const pHashMethod = 'cached';
          const lookup = { pHashString, pHashMethod };

          return {
            ...mixBases<any, any, any, any>(normalizedImageFilePath, lookup), //
            ...mixExpected<any, any>(normalizedImageFilePath, lookup),
          };
        }
      }
      !!debug &&
        console.error(
          `Error (can't compute phashString): '<empty string>'`,
          pathObj
        );

      // Return the newly calculated value
      const pHashString = bigStr;
      const pHashMethod = null;
      const lookup = { pHashString, pHashMethod };

      return {
        ...mixBases<any, any, any, any>(normalizedImageFilePath, lookup), //
        ...mixExpected<any, any>(normalizedImageFilePath, lookup),
      };
    }
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
      stats: stat(compatibleImagefilePath),
    },
  };
}
