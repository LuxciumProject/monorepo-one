import {
  addImage,
  deleteImage,
  getImageIndexSize,
  lookupImage,
  queryImages,
  RedisClient,
  syncImages,
} from './imageScout';

describe('imageScout functions', () => {
  let redisClient: jest.Mocked<Omit<RedisClient, 'close'>>;

  beforeEach(() => {
    redisClient = {
      send_command: jest.fn().mockImplementation((command, _args) => {
        if (command === 'imgscout.query') {
          // Return a valid result for the query command
          return Promise.resolve(
            JSON.stringify([
              ['image1', 1],
              ['image2', 2],
              ['image3', 3],
            ])
          );
        } else {
          // Return a resolved promise with undefined for other commands
          return Promise.resolve();
        }
      }),
    };
  });

  describe('addImage function', () => {
    beforeEach(() => {
      redisClient.send_command.mockClear();
    });

    it('should call Redis client with correct arguments', async () => {
      const key = 'my-image-key';
      const hashValue = 'abcdef123456';
      const title = 'My Image Title';
      const id = 12_345;
      const expectedArgs = [key, hashValue, title, id.toString()];

      await addImage(redisClient, key, hashValue, title, id);

      expect(redisClient.send_command).toHaveBeenCalledWith(
        'imgscout.add',
        expectedArgs
      );
    });

    it('should call Redis client with correct arguments when id is not provided', async () => {
      const key = 'my-image-key';
      const hashValue = 'abcdef123456';
      const title = 'My Image Title';
      const expectedArgs = [key, hashValue, title];

      await addImage(redisClient, key, hashValue, title);

      expect(redisClient.send_command).toHaveBeenCalledWith(
        'imgscout.add',
        expectedArgs
      );
    });

    it('should return the ID integer value assigned to the image', async () => {
      redisClient.send_command.mockResolvedValueOnce('123');
      const result = await addImage(
        redisClient,
        'key',
        'hashValue',
        'title',
        12_345
      );
      expect(result).toBe(123);
    });

    it('should throw an error when Redis client returns an error', async () => {
      redisClient.send_command.mockRejectedValueOnce(new Error('Redis error'));

      await expect(
        addImage(redisClient, 'key', 'hashValue', 'title')
      ).rejects.toThrow('Redis error');
    });
  });

  describe('syncImages function', () => {
    beforeEach(() => {
      redisClient.send_command.mockClear();
    });

    it('should call Redis client with correct arguments', async () => {
      const key = 'my-image-key';

      await syncImages(redisClient, key);

      expect(redisClient.send_command).toHaveBeenCalledWith('imgscout.sync', [
        key,
      ]);
    });

    it('should return the result of the sync operation', async () => {
      redisClient.send_command.mockResolvedValueOnce('123');
      const result = await syncImages(redisClient, 'key');
      expect(result).toBe('123');
    });

    it('should throw an error when Redis client returns an error', async () => {
      redisClient.send_command.mockRejectedValueOnce(new Error('Redis error'));

      await expect(syncImages(redisClient, 'key')).rejects.toThrow(
        'Redis error'
      );
    });
  });
  describe('queryImages function', () => {
    beforeEach(() => {
      redisClient.send_command.mockClear();
    });

    it('should call Redis client with correct arguments', async () => {
      const key = 'my-image-key';
      const targetHash = 'abcdef123456';
      const radius = 5;
      const expectedArgs = [key, targetHash, radius.toString()];

      await queryImages(redisClient, key, targetHash, radius);

      expect(redisClient.send_command).toHaveBeenCalledWith(
        'imgscout.query',
        expectedArgs
      );
    });

    it('should return the formatted results array', async () => {
      const expectedResult = [
        ['image1', 1],
        ['image2', 2],
        ['image3', 3],
      ];
      redisClient.send_command.mockResolvedValueOnce(
        JSON.stringify(expectedResult)
      );

      const result = await queryImages(redisClient, 'key', 'targetHash', 5);
      expect(result).toEqual(expectedResult.map(r => [r[0], Number(r[1])]));
    });

    it('should throw an error when Redis client returns an error', async () => {
      redisClient.send_command.mockRejectedValueOnce(new Error('Redis error'));

      await expect(
        queryImages(redisClient, 'key', 'targetHash', 5)
      ).rejects.toThrow('Error querying for images: Error: Redis error');
    });
  });
  describe('lookupImage function', () => {
    beforeEach(() => {
      redisClient.send_command.mockClear();
    });

    it('should call Redis client with correct arguments', async () => {
      const key = 'my-image-key';
      const id = 12_345;
      const expectedArgs = [key, id.toString()];

      await lookupImage(redisClient, key, id);

      expect(redisClient.send_command).toHaveBeenCalledWith(
        'imgscout.lookup',
        expectedArgs
      );
    });

    it('should return the hash value of the image', async () => {
      redisClient.send_command.mockResolvedValueOnce('abcdef123456');
      const result = await lookupImage(redisClient, 'key', 12_345);
      expect(result).toBe('abcdef123456');
    });

    it('should throw an error when Redis client returns an error', async () => {
      redisClient.send_command.mockRejectedValueOnce(new Error('Redis error'));

      await expect(lookupImage(redisClient, 'key', 12_345)).rejects.toThrow(
        'Redis error'
      );
    });
  });
  describe('getImageIndexSize function', () => {
    beforeEach(() => {
      redisClient.send_command.mockClear();
    });

    it('should call Redis client with correct arguments', async () => {
      const key = 'my-image-key';

      await getImageIndexSize(redisClient, key);

      expect(redisClient.send_command).toHaveBeenCalledWith('imgscout.size', [
        key,
      ]);
    });

    it('should return the size of the image index as a number from string', async () => {
      redisClient.send_command.mockResolvedValueOnce('123');
      let result = await getImageIndexSize(redisClient, 'key');
      expect(result).toBe(123);
    });

    it('should return the size of the image index as a number from number', async () => {
      redisClient.send_command.mockResolvedValueOnce(456);
      let result = await getImageIndexSize(redisClient, 'key');
      expect(result).toBe(456);
    });

    it('should throw an error when Redis client returns an error', async () => {
      redisClient.send_command.mockRejectedValueOnce(new Error('Redis error'));

      await expect(getImageIndexSize(redisClient, 'key')).rejects.toThrow(
        'Redis error'
      );
    });
  });

  describe('deleteImage function', () => {
    beforeEach(() => {
      redisClient.send_command.mockClear();
    });

    it('should call Redis client with correct arguments', async () => {
      const key = 'my-image-key';
      const id = 12_345;

      await deleteImage(redisClient, key, id);

      expect(redisClient.send_command).toHaveBeenCalledWith('imgscout.del', [
        key,
        id.toString(),
      ]);
    });

    it('should return the result of the delete operation', async () => {
      redisClient.send_command.mockResolvedValueOnce('OK');
      const result = await deleteImage(redisClient, 'key', 123);
      expect(result).toBe('OK');
    });

    it('should throw an error when Redis client returns an error', async () => {
      redisClient.send_command.mockRejectedValueOnce(new Error('Redis error'));

      await expect(deleteImage(redisClient, 'key', 123)).rejects.toThrow(
        'Redis error'
      );
    });
  });
});
