/**
 * A Redis client that supports the `send_command` method.
 */
export type RedisClient = {
  send_command: <R>(
    command: string,
    args: Array<string | number>,
    callback?: (err: any, result: any) => void
  ) => Promise<R>;
  close?: () => Promise<void>;
};

/**
 * Adds a new image perceptual hash to the Redis-ImageScout queue for later addition.
 * When the new additions reach a threshold number, the new arrivals are added to the index
 * in a batch. To add right away, immediately follow up with the `sync` command. Returns the
 * ID integer value assigned to this image. The title string is added as a hash field to the
 * `key:<id>` key. Optionally, an ID integer can be appended to the end of the command, but
 * this is not the normal use.
 *
 * @param redisClient - The Redis client to use.
 * @param key - The Redis key to use.
 * @param hashValue - The perceptual hash of the image to add.
 * @param title - The title of the image to add.
 * @param id - An optional ID to assign to the image.
 * @returns A Promise that resolves to the ID integer value assigned to the image.
 *
 * @remarks
 * This function sends the `imgscout.add` command to Redis to add a new image perceptual hash to the Redis-ImageScout queue for later addition.
 * The Redis client library will handle any low-level error handling or retries, while still giving us a clean interface to work with.
 *
 * Example:
 *
 * ```typescript
 * const redisClient = createRedisClient();
 * const key = 'my-image-key';
 * const hashValue = 'abcdef123456';
 * const title = 'My Image Title';
 * const id = 12345;
 * const result = await addImage(redisClient, key, hashValue, title, id);
 * console.log(result); // Prints the ID integer value assigned to the image
 * ```
 */
export async function addImage(
  redisClient: RedisClient,
  key: string,
  hashValue: string,
  title: string,
  id?: number
): Promise<number> {
  const args = [key, hashValue, title];
  if (id) args.push(id.toString());
  return redisClient
    .send_command<number>('imgscout.add', args)
    .then(result => Number(result))
    .catch(error => {
      // Rethrow the error to let the caller handle it
      throw error;
    });
}

/**
 * Adds all the recently submitted image perceptual hashes to the Redis-ImageScout index.
 * This command should be run after adding new images to the queue using the `addImage` command,
 * to ensure that the new images are added to the index for efficient retrieval. This command
 * adds all new images to the index in a batch, so it may take some time to complete.
 *
 * @param redisClient - The Redis client to use.
 * @param key - The Redis key to use.
 * @returns A Promise that resolves to an OK status message.
 *
 * @remarks
 * This function sends the `imgscout.sync` command to Redis to add all recently submitted image perceptual hashes to the index.
 * The Redis client library will handle any low-level error handling or retries, while still giving us a clean interface to work with.
 *
 * Example:
 *
 * ```typescript
 * const redisClient = createRedisClient();
 * const key = 'my-image-key';
 * const result = await syncImages(redisClient, key);
 * console.log(result); // Prints 'OK'
 * ```
 */
export async function syncImages(
  redisClient: RedisClient,
  key: string
): Promise<string> {
  return redisClient
    .send_command<string>('imgscout.sync', [key])
    .then(result => (result ? result.toString() : ''));
}

/**
 * Queries for all perceptual hash targets within a given radius.
 *
 * @param redisClient - The Redis client to use.
 * @param key - The Redis key to use.
 * @param targetHash - The target perceptual hash to query for.
 * @param radius - The radius within which to search for matching hashes.
 * @returns A Promise that resolves to an array of results, where each item is an array of two items:
 * the title string and the ID integer.
 * @throws {Error} If there is an error with the Redis client.
 *
 * @remarks
 * This function sends the `imgscout.query` command to Redis to query for all perceptual hash targets within a given radius.
 * The Redis client library will handle any low-level error handling or retries, while still giving us a clean interface to work with.
 *
 * Example:
 *
 * ```typescript
 * const redisClient = createRedisClient();
 * const key = 'my-image-key';
 * const targetHash = '12345';
 * const radius = 10;
 * const results = await queryImages(redisClient, key, targetHash, radius);
 * console.log(results); // Prints [[title1, id1], [title2, id2], ...]
 * ```
 */
export async function queryImages(
  redisClient: RedisClient,
  key: string,
  targetHash: string,
  radius: number
): Promise<Array<[string, number]>> {
  try {
    const result = await redisClient.send_command<string>('imgscout.query', [
      key,
      targetHash,
      radius.toString(),
    ]);

    const results = JSON.parse(result);
    const formattedResults = results.map((r: any) => [r[0], Number(r[1])]);

    return formattedResults;
  } catch (error) {
    throw new Error(`Error querying for images: ${error}`);
  }
}

/**
 * Looks up an image by its ID in the Redis-ImageScout index and returns its title.
 *
 * @param redisClient - The Redis client to use.
 * @param key - The Redis key to use.
 * @param id - The ID of the image to look up.
 * @returns A Promise that resolves to the title of the image.
 *
 * @throws {Error} If there is an error with the Redis client.
 *
 * @remarks
 * This function sends the `imgscout.lookup` command to Redis to retrieve the title of an image with a given ID.
 * The Redis client library will handle any low-level error handling or retries, while still giving us a clean interface to work with.
 *
 * Example:
 *
 * ```typescript
 * const redisClient = createRedisClient();
 * const key = 'my-image-key';
 * const id = 123;
 * const result = await lookupImage(redisClient, key, id);
 * console.log(result); // Prints the title of the image with ID 123
 * ```
 */
export async function lookupImage(
  redisClient: RedisClient,
  key: string,
  id: number
): Promise<string> {
  return redisClient
    .send_command<string>('imgscout.lookup', [key, id.toString()])
    .then(result => (result ? result.toString() : ''));
}

/**
 * Returns the number of entries in the Redis-ImageScout index.
 *
 * @param redisClient - The Redis client to use.
 * @param key - The Redis key to use.
 * @returns A Promise that resolves to the number of entries in the Redis-ImageScout index.
 *
 * @remarks
 * This function sends the `imgscout.size` command to Redis to retrieve the number of entries in the Redis-ImageScout index.
 * The Redis client library will handle any low-level error handling or retries, while still giving us a clean interface to work with.
 *
 * Example:
 *
 * ```typescript
 * const redisClient = createRedisClient();
 * const key = 'my-image-key';
 * const size = await getImageIndexSize(redisClient, key);
 * console.log(size); // Prints the number of entries in the index
 * ```
 */
export async function getImageIndexSize(
  redisClient: RedisClient,
  key: string
): Promise<number> {
  return redisClient
    .send_command('imgscout.size', [key])
    .then(result => Number(result));
}

/**
 * Deletes an image from the Redis-ImageScout index.
 *
 * @param redisClient - The Redis client to use.
 * @param key - The Redis key to use.
 * @param id - The ID of the image to delete.
 * @returns A Promise that resolves to an OK status message.
 *
 * @remarks
 * This function sends the `imgscout.del` command to Redis to delete an image from the index.
 * The Redis client library will handle any low-level error handling or retries, while still giving us a clean interface to work with.
 *
 * Example:
 *
 * ```typescript
 * const redisClient = createRedisClient();
 * const key = 'my-image-key';
 * const id = 1;
 * const result = await deleteImage(redisClient, key, id);
 * console.log(result); // Prints 'OK'
 * ```
 */
export async function deleteImage(
  redisClient: RedisClient,
  key: string,
  id: number
): Promise<string> {
  return redisClient
    .send_command<string>('imgscout.del', [key, id.toString()])
    .then(result => (result ? result.toString() : ''));
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
 * This module provides the following functions for managing images in a Redis image index:
 *
 * @function addImage - Add an image to the Redis image index.
 * @function syncImages - Sync the Redis image index.
 * @function queryImages - Query images in the Redis image index within a specified radius.
 * @function lookupImage - Lookup an image by ID in the Redis image index.
 * @function getImageIndexSize - Get the size of the Redis image index.
 * @function deleteImage - Delete an image by ID from the Redis image index.
 */
export default {
  addImage,
  syncImages,
  queryImages,
  lookupImage,
  getImageIndexSize,
  deleteImage,
};
