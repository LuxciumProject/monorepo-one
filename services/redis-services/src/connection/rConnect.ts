import { createRedisClient, RedisClientType } from '.';

const REDIS_DEFAULT_UNIX_SOCKET_PATH = '/var/run/redis/redis.sock';
const REDIS_DEFAULT_PORT = 6378;

export function rConnectFn(unixSocketPath: string): Promise<RedisClientType>;
export function rConnectFn(
  port?: number | null,
  dbNumber?: number | null,
  host?: string | null
): Promise<RedisClientType>;
export function rConnectFn(
  portOrUnixSocketPath?: number | string | null,
  dbNumber?: number | null,
  host?: string | null
): Promise<RedisClientType> {
  if (typeof portOrUnixSocketPath === 'string') {
    return rConnectUnixSocket(portOrUnixSocketPath);
  } else {
    return rConnectTcp(portOrUnixSocketPath, dbNumber, host);
  }
}

export async function rConnectTcp(
  port: number | null = REDIS_DEFAULT_PORT,
  dbNumber: number | null = 0,
  host: string | null = '0.0.0.0'
): Promise<RedisClientType> {
  /** *REDIS CLIENT* */
  const R = createRedisClient(
    {
      port: port || REDIS_DEFAULT_PORT,
      dbNumber: dbNumber || 0,
      host: host || '0.0.0.0',
    },
    undefined
  );
  await R.connect();
  type REDIS_CLIENT = typeof R;
  return R as REDIS_CLIENT;
}

export async function rConnectUnixSocket(
  unixSocketPath: string = REDIS_DEFAULT_UNIX_SOCKET_PATH
): Promise<RedisClientType> {
  const client = createRedisClient(undefined, unixSocketPath);
  await client.connect();
  return client;
}

export interface RConnect {
  (
    port?: number | null,
    dbNumber?: number | null,
    host?: string | null
  ): Promise<RedisClientType>;
}
export const rConnect: RConnect & RConnectUnixSocket = rConnectFn;

export type RConnectUnixSocket = (
  unixSocketPath: string
) => Promise<RedisClientType>;

export type RConnectAll = RConnect & RConnectUnixSocket;

export const rConnectFn_002: RConnectAll = Object.assign(
  (
    portOrUnixSocketPath?: number | string | null,
    dbNumber?: number | null,
    host?: string | null
  ) => {
    if (typeof portOrUnixSocketPath === 'string') {
      return rConnectUnixSocket(portOrUnixSocketPath);
    } else {
      return rConnectTcp(portOrUnixSocketPath, dbNumber, host);
    }
  },
  {
    unixSocket: rConnectUnixSocket,
  }
);

// const client = createRedisClient({
//   port: port || REDIS_DEFAULT_PORT,
//   dbNumber: dbNumber || 0,
//   host: host || '0.0.0.0',
// });
// await client.connect();
// return client;

// export async function rConnect(
//   port: number | null = REDIS_DEFAULT_PORT,
//   dbNumber: number | null = 0,
//   host: string | null = '0.0.0.0'
// ): Promise<RedisClientType> {
//   /** *REDIS CLIENT* */
//   const R = createRedisClient({
//     port: port || REDIS_DEFAULT_PORT,
//     dbNumber: dbNumber || 0,
//     host: host || '0.0.0.0',
//   });
//   await R.connect();
//   type REDIS_CLIENT = typeof R;
//   return R as REDIS_CLIENT;
// }

//  = REDIS_DEFAULT_PORT,  -  dbNumber = 0, host = '0. @default [REDIS_DEFAULT_PORT] @default REDIS_DEFAULT_PORT description 0.0.0'

/**
 * **Invoke and await to get: *REDIS CLIENT***
 *
 * @param {number} port - By default, the Redis server runs on *TCP
 * Port 63 79* but **this project use default of 6383**
 *
 * @param {number} dbNumber - Redis databases are numbered from 0
 * to 15. However, you can change the database you're using with this
 * parameter. **this project use default of 0**
 *
 * @param {string} host - By default, no password is used for local
 * Redis. where, REDIS_HOST - IP address of the interface for Redis
 * to bind **this project use default of '0.0.0.0'**
 *
 * @returns *REDIS CLIENT*
 */
