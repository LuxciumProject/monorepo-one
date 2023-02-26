import { createClient, RedisClientType } from 'redis';
import { RedisCStrOptions } from '../../types';
export function createRedisClient(options?: RedisCStrOptions): RedisClientType {
  const client = createClient(redisConnectionString(options));

  client
    .on('error', (err: any) => console.error(err, 'Redis Client Error'))
    .on('connect', () => {
      console.warn(
        `${`redis:\/\/${options?.host || '127.0.0.1'}`}:${`${
          options?.port || 6379
        }`}/${options?.dbNumber || 0}`,
        'Redis Client Connected'
      );
    })
    .on('ready', () => {
      console.warn(
        `${options?.port || 6379} , ${'db: ' + options?.dbNumber || 0}`,
        'Redis Client ready'
      );
    })
    .on('end', () => {
      console.warn('Redis client Reconnecting(?)...', 'Redis Client end');
    })
    .on('reconnecting', () => {
      console.warn('Redis Client Reconnecting', 'Redis Client Reconnecting');
    });

  return client;
}

export function redisConnectionString(options?: RedisCStrOptions) {
  const o = {
    host: '127.0.0.1',
    port: 6379,
    ssl: false,
    username: '',
    password: '',
    dbNumber: 0,
    ...options,
  };
  return {
    url: `${'redis'}${o.ssl ? 's' : ''}${':'}${'//'}${o.username}${
      !!o.password ? `${':'}` : ''
    }${o.password}${!!o.username || !!o.password ? `${'@'}` : ''}${
      o.host
    }${':'}${o.port}${!!o.dbNumber ? `${'/'}${o.dbNumber}` : ''}`,
  };
}
