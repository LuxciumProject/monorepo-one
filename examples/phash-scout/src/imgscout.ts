/**
 * Redis-ImageScout
 *
 * A Redis module for indexing images. The module accepts
 * precomputed perceptual hashes of images and indexes them
 * for fast efficient retrieval. A perceptual hash is a
 * fingerprint robust to small distortions - such as compression
 * blurr, scaling, etc. Useful for such things as duplicate
 * detection and copyright protection of images.
 */
export type RedisClient = {
  send_command: (
    command: string,
    args: Array<string | number>,
    callback: (err: any, result: any) => void
  ) => void;
};

/**
 * Adds a new image perceptual hash to the queue for later addition. When the
 * new additions reach a threshold number, the new arrivals are added to the
 * index in a batch. To add right away, immediately follow up with the sync
 * command. Returns the id integer value assigned to this image. The title
 * string is added as a hash field to the key:<id> key. Optionally, an id integer
 * can be appended to the end of the command, but this is not the normal use.
 * @param redisClient - The Redis client instance.
 * @param key - The key for the image index.
 * @param hashValue - The hash value of the image.
 * @param title - The title of the image.
 * @param id - The optional ID of the image.
 * @returns A promise that resolves to the ID of the added image.
 */
function addImage(
  redisClient: RedisClient,
  key: string,
  hashValue: string,
  title: string,
  id?: number
): Promise<number> {
  return new Promise((resolve, reject) => {
    const args = [key, hashValue, title];
    if (id) args.push(id.toString());
    redisClient.send_command('imgscout.add', args, (err, result) => {
      if (err) reject(err);
      else resolve(parseInt(result));
    });
  });
}

/**
 * Adds all the recently submitted image perceptual hashes to the index. Returns
 * an OK status message.
 * @param redisClient - The Redis client instance.
 * @param key - The key for the image index.
 * @returns A promise that resolves to the status of the sync operation.
 */
function syncImages(redisClient: RedisClient, key: string): Promise<string> {
  return new Promise((resolve, reject) => {
    redisClient.send_command('imgscout.sync', [key], (err, result) => {
      if (err) reject(err);
      else resolve(result.toString());
    });
  });
}

/**
 * Queries for all perceptual hash targets within a given radius. Returns an array of results.
 * Each item in the array is also an array of two items: the title string and the id integer.
 * @param redisClient - The Redis client instance.
 * @param key - The key for the image index.
 * @param targetHash - The target hash value to search around.
 * @param radius - The search radius.
 * @returns A promise that resolves to an array of matched image titles and distances.
 */
function queryImages(
  redisClient: RedisClient,
  key: string,
  targetHash: string,
  radius: number
): Promise<Array<[string, number]>> {
  return new Promise((resolve, reject) => {
    redisClient.send_command(
      'imgscout.query',
      [key, targetHash, radius.toString()],
      (err, result) => {
        if (err) reject(err);
        else {
          const results = JSON.parse(result);
          const formattedResults = results.map((r: any) => [
            r[0],
            parseInt(r[1]),
          ]);
          resolve(formattedResults);
        }
      }
    );
  });
}

/**
 * Looks up an integer id. Returns the title string.
 * @param redisClient - The Redis client instance.
 * @param key - The key for the image index.
 * @param id - The ID of the image to look up.
 * @returns A promise that resolves to the title of the image.
 */
function lookupImage(
  redisClient: RedisClient,
  key: string,
  id: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    redisClient.send_command(
      'imgscout.lookup',
      [key, id.toString()],
      (err, result) => {
        if (err) reject(err);
        else resolve(result.toString());
      }
    );
  });
}

/**
 * Returns the number of entries in the index.
 * @param redisClient - The Redis client instance.
 * @param key - The key for the image index.
 * @returns A promise that resolves to the size of the image index.
 */
function getImageIndexSize(
  redisClient: RedisClient,
  key: string
): Promise<number> {
  return new Promise((resolve, reject) => {
    redisClient.send_command('imgscout.size', [key], (err, result) => {
      if (err) reject(err);
      else resolve(parseInt(result));
    });
  });
}

/**
 * Deletes the id from the image index. Returns OK status.
 * @param redisClient - The Redis client instance.
 * @param key - The key for the image index.
 * @param id - The ID of the image to delete.
 * @returns A promise that resolves to the status of the delete operation.
 */
function deleteImage(
  redisClient: RedisClient,
  key: string,
  id: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    redisClient.send_command(
      'imgscout.del',
      [key, id.toString()],
      (err, result) => {
        if (err) reject(err);
        else resolve(result.toString());
      }
    );
  });
}
/**
 * @module Redis-ImageScout
 *
 * A TypeScript module for interacting with the Redis-ImageScout, which is a Redis module
 * for indexing images. The module accepts precomputed perceptual hashes of images and
 * indexes them for fast efficient retrieval. A perceptual hash is a fingerprint robust
 * to small distortions, such as compression blur, scaling, etc. Useful for duplicate
 * detection and copyright protection of images.
 *
 * This module provides functions for managing images in a Redis image index:
 * - addImage: Add an image to the Redis image index.
 * - syncImages: Sync the Redis image index.
 * - queryImages: Query images in the Redis image index within a specified radius.
 * - lookupImage: Lookup an image by ID in the Redis image index.
 * - getImageIndexSize: Get the size of the Redis image index.
 * - deleteImage: Delete an image by ID from the Redis image index.
 */
export const imagescout = {
  addImage,
  syncImages,
  queryImages,
  lookupImage,
  getImageIndexSize,
  deleteImage,
};
