import { createClient, RedisClientType } from 'redis';
import { RedisCStrOptions } from '../../types';

export function createRedisClientZ(
  options?: RedisCStrOptions,
  unixSocketPath?: string
): RedisClientType {
  const connectionOptions = unixSocketPath
    ? { path: unixSocketPath }
    : redisConnectionOptions(options);
  const client = createClient(connectionOptions);

  client
    .on('error', (err: any) => console.error(err, 'Redis Client Error'))
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

function redisConnectionOptions(options?: RedisCStrOptions) {
  return {
    host: options?.host || '127.0.0.1',
    port: options?.port || 6379,
    password: options?.password || undefined,
    db: options?.dbNumber || 0,
  };
}

function connectionString(options?: RedisCStrOptions, unixSocketPath?: string) {
  if (unixSocketPath) {
    return `unix://${unixSocketPath}`;
  }
  return redisConnectionString(options).url;
}

function redisConnectionString(options?: RedisCStrOptions) {
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

// In docker // CMD ["redis-server", "--unixsocket", "/var/run/redis/redis.sock"]
