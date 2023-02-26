import { RedisClientType } from 'redis';
import { createRedisClient } from '.';
import { RedisCStrOptions } from '../../types';
// import type { RedisCStrOptions } from '../types';
import { createRedisClientZ } from './socketConnector';

const REDIS_DEFAULT_PORT = 6379;
const DEFAULT_REDIS_UNIX_SOCKET_PATH = '/var/run/redis/redis.sock';
// const REDIS_DEFAULT_UNIX_SOCKET_PATH = '/var/run/redis/redis.sock';
export async function rConnectW(
  options?: RedisCStrOptions,
  unixSocketPath?: string
): Promise<RedisClientType> {
  const redisClient = createRedisClientZ(
    options,
    unixSocketPath ?? DEFAULT_REDIS_UNIX_SOCKET_PATH
  );

  await redisClient.connect();

  return redisClient;
}

interface RConnectZ {
  (options?: RedisCStrOptions): Promise<RedisClientType>;
  (
    unixSocketPath: string,
    options?: RedisCStrOptions
  ): Promise<RedisClientType>;
}

export const rConnectZ: RConnectZ = (
  arg1: string | RedisCStrOptions = {},
  arg2?: RedisCStrOptions
) => {
  let options: RedisCStrOptions;
  let unixSocketPath: string | undefined;

  if (typeof arg1 === 'string') {
    options = arg2 ?? {};
    unixSocketPath = arg1;
  } else {
    options = arg1;
  }

  if (unixSocketPath) {
    // Use Unix socket
    return rConnectUnixSocket(unixSocketPath, options);
  } else {
    // Use TCP socket
    return rConnectTcp(options);
  }
};

async function rConnectTcp(
  options: RedisCStrOptions = {}
): Promise<RedisClientType> {
  const redisClient = createRedisClient(options);

  await redisClient.connect();

  return redisClient;
}

async function rConnectUnixSocket(
  unixSocketPath: string,
  options: RedisCStrOptions = {}
): Promise<RedisClientType> {
  const redisClient = createRedisClientZ(options, unixSocketPath);

  await redisClient.connect();

  return redisClient;
}

export interface RConnectY {
  (options?: {
    port?: number;
    dbNumber?: number;
    host?: string;
  }): Promise<RedisClientType>;
}

export const rConnect: RConnectY = async (options = {}) => {
  const redisClient = createRedisClient({
    port: options.port ?? 6379,
    dbNumber: options.dbNumber ?? 0,
    host: options.host ?? '0.0.0.0',
  });

  await redisClient.connect();

  return redisClient;
};

export interface RConnectOptions {
  port?: number | null;
  dbNumber?: number | null;
  host?: string | null;
}

export interface RConnectX {
  (options?: RConnectOptions): Promise<RedisClientType>;
}

export interface RConnect {
  (
    port?: number | null,
    dbNumber?: number | null,
    host?: string | null
  ): Promise<RedisClientType>;
}

export const rConnectAll: RConnectAll = Object.assign(
  (
    portOrUnixSocketPath?: number | string | null,
    dbNumber?: number | null,
    host?: string | null
  ) => {
    if (typeof portOrUnixSocketPath === 'string') {
      return rConnectUnixSocket(portOrUnixSocketPath);
    } else {
      return rConnectTcpAll(portOrUnixSocketPath, dbNumber, host);
    }
  },
  {
    unixSocket: rConnectUnixSocket,
  }
);

export async function rConnectTcpAll(
  port: number | null = REDIS_DEFAULT_PORT,
  dbNumber: number | null = 0,
  host: string | null = '0.0.0.0'
): Promise<RedisClientType> {
  const client = createRedisClient({
    port: port || REDIS_DEFAULT_PORT,
    dbNumber: dbNumber || 0,
    host: host || '0.0.0.0',
  });
  await client.connect();
  return client;
}

export type RConnect_ = (
  port?: number | null,
  dbNumber?: number | null,
  host?: string | null
) => Promise<RedisClientType>;

export type RConnectUnixSocket = (
  unixSocketPath: string
) => Promise<RedisClientType>;

export type RConnectAll = RConnect & RConnectUnixSocket;

export function rConnectAll__(unixSocketPath: string): Promise<RedisClientType>;
export function rConnectAll__(
  port?: number | null,
  dbNumber?: number | null,
  host?: string | null
): Promise<RedisClientType>;
export function rConnectAll__(
  portOrUnixSocketPath?: number | string | null,
  dbNumber?: number | null,
  host?: string | null
): Promise<RedisClientType> {
  if (typeof portOrUnixSocketPath === 'string') {
    return rConnectUnixSocket(portOrUnixSocketPath);
  } else {
    return rConnectTcpAll(portOrUnixSocketPath, dbNumber, host);
  }
}

export const rConnectAll_: RConnectAll = Object.assign(
  (
    portOrUnixSocketPath?: number | string | null,
    dbNumber?: number | null,
    host?: string | null
  ) => {
    if (typeof portOrUnixSocketPath === 'string') {
      return rConnectUnixSocket(portOrUnixSocketPath);
    } else {
      return rConnectTcpAll(portOrUnixSocketPath, dbNumber, host);
    }
  },
  {
    unixSocket: rConnectUnixSocket,
  }
);
