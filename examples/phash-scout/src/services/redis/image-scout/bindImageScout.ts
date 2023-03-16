import {
  addImage,
  deleteImage,
  getImageIndexSize,
  lookupImage,
  queryImages,
  RedisClient,
  syncImages,
} from './imageScout';
import { BoundImageScout } from './imageScout-type';

export function bindImageScout(redisClient: RedisClient): BoundImageScout {
  return {
    addImage: (key: string, hashValue: string, title: string, id?: number) => {
      return addImage(redisClient, key, hashValue, title, id);
    },
    deleteImage: (key: string, id: number) => {
      return deleteImage(redisClient, key, id);
    },
    getImageIndexSize: (key: string) => {
      return getImageIndexSize(redisClient, key);
    },
    queryImages: (key: string, targetHash: string, radius: number) => {
      return queryImages(redisClient, key, targetHash, radius);
    },
    syncImages: (key: string) => {
      return syncImages(redisClient, key);
    },
    lookupImage: (key: string, id: number) => {
      return lookupImage(redisClient, key, id);
    },
    redisClient,
  };
}
