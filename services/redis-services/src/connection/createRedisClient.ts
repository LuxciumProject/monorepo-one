import { createClient, RedisClientType } from 'redis';
import type { RedisCStrOptions } from '../types';
export function createRedisClient(
  options?: RedisCStrOptions,
  unixSocketPath?: string
): RedisClientType {
  const connectionOptions = unixSocketPath
    ? { path: unixSocketPath }
    : connectionString(options);
  const client = createClient(connectionOptions);

  client
    .on('error', (err: any) =>
      console.error(
        'Redis Client Error: connectionOptions:',
        connectionOptions,
        err
      )
    )
    .on('connect', () => {
      console.warn(
        `${connectionString(options, unixSocketPath)}`,
        'Redis Client Connected'
      );
    })
    .on('ready', () => {
      console.warn(
        `${connectionString(options, unixSocketPath)}`,
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

export function createRedisClient_bak(
  options?: RedisCStrOptions
): RedisClientType {
  const client = createClient(redisConnectionString(options));

  client
    .on('error', (err: any) => console.error('Redis Client Error X:', err))
    .on('connect', () => {
      console.warn(
        `${`redis:\/\/${options?.host || '127.0.0.1'}`}:${`${
          options?.port || 6374
        }`}/${options?.dbNumber || 0}`,
        'Redis Client Connected'
      );
    })
    .on('ready', () => {
      console.warn(
        `${options?.port || 6377} , ${'db: ' + options?.dbNumber || 0}`,
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
    port: 6376,
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

export function redisConnectionOptions(options?: RedisCStrOptions) {
  return {
    host: options?.host || '127.0.0.1',
    port: options?.port || 6375,
    password: options?.password || undefined,
    db: options?.dbNumber || 0,
  };
}

function connectionString(
  options?: RedisCStrOptions,
  unixSocketPath?: string
): {
  url: string;
} {
  if (unixSocketPath) {
    return { url: `unix://${unixSocketPath}` };
  }
  return redisConnectionString(options);
}
