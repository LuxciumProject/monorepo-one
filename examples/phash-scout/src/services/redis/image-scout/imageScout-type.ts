/**
 * A Redis client that supports the `send_command` method.
 */
export interface RedisClient {
  send_command: <R>(
    command: string,
    args: Array<string | number>,
    callback?: (err: any, result: any) => void
  ) => Promise<R>;
  close?: () => Promise<void>;
}
/**
 * An interface for the Redis-ImageScout module that indexes images based on precomputed perceptual hashes.
 * This interface provides methods for adding, querying, and deleting images from a Redis-ImageScout index.
 * It also includes a reference to the Redis client used for sending Redis commands.
 * @typeparam RedisClientType - The type of Redis client to use.
 */
export interface BoundImageScout<RedisClientType = RedisClient> {
  /**
   * Adds a new image perceptual hash to the Redis-ImageScout queue for later addition.
   * When the new additions reach a threshold number, the new arrivals are added to the index
   * in a batch. To add right away, immediately follow up with the `sync` command. Returns the
   * ID integer value assigned to this image. The title string is added as a hash field to the
   * `key:<id>` key. Optionally, an ID integer can be appended to the end of the command, but
   * this is not the normal use.
   *
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
   * const key = 'my-image-key';
   * const hashValue = 'abcdef123456';
   * const title = 'My Image Title';
   * const id = 12345;
   * const result = await addImage(redisClient, key, hashValue, title, id);
   * console.log(result); // Prints the ID integer value assigned to the image
   * ```
   */

  addImage: (
    key: string,
    hashValue: string,
    title: string,
    id?: number
  ) => Promise<number>;

  /**
   * Adds all the recently submitted image perceptual hashes to the Redis-ImageScout index.
   * This command should be run after adding new images to the queue using the `addImage` command,
   * to ensure that the new images are added to the index for efficient retrieval. This command
   * adds all new images to the index in a batch, so it may take some time to complete.
   *
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
   * const key = 'my-image-key';
   * const result = await syncImages(redisClient, key);
   * console.log(result); // Prints 'OK'
   * ```
   */
  syncImages: (key: string) => Promise<string>;

  /**
   * Queries for all perceptual hash targets within a given radius.
   *
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
   * const key = 'my-image-key';
   * const targetHash = '12345';
   * const radius = 10;
   * const results = await queryImages(key, targetHash, radius);
   * console.log(results); // Prints [[title1, id1], [title2, id2], ...]
   * ```
   */
  queryImages: (
    key: string,
    targetHash: string,
    radius: number
  ) => Promise<Array<[string, number]>>;

  /**
   * Looks up an image by its ID in the Redis-ImageScout index and returns its title.
   *
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
   * const key = 'my-image-key';
   * const id = 123;
   * const result = await lookupImage(redisClient, key, id);
   * console.log(result); // Prints the title of the image with ID 123
   * ```
   */

  lookupImage: (key: string, id: number) => Promise<string | null>;

  /**
   * Returns the number of entries in the Redis-ImageScout index.
   *
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
   * const key = 'my-image-key';
   * const size = await getImageIndexSize(redisClient, key);
   * console.log(size); // Prints the number of entries in the index
   * ```
   */

  getImageIndexSize: (key: string) => Promise<number>;

  /**
   * Deletes an image from the Redis-ImageScout index.
   *
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
   * const key = 'my-image-key';
   * const id = 1;
   * const result = await deleteImage(redisClient, key, id);
   * console.log(result); // Prints 'OK'
   * ```
   */
  deleteImage: (key: string, id: number) => Promise<string>;
  redisClient: RedisClientType;
}
