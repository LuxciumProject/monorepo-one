// import { RedisClient } from 'redis';
export type RedisClient = {
  send_command: (
    command: string,
    args: Array<string | number>,
    callback: (err: any, result: any) => void
  ) => void;
};
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

function syncImages(redisClient: RedisClient, key: string): Promise<string> {
  return new Promise((resolve, reject) => {
    redisClient.send_command('imgscout.sync', [key], (err, result) => {
      if (err) reject(err);
      else resolve(result.toString());
    });
  });
}

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

export const imagescout = {
  addImage,
  syncImages,
  queryImages,
  lookupImage,
  getImageIndexSize,
  deleteImage,
};
