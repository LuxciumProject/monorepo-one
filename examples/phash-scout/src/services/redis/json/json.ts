// import '/projects/monorepo-one/examples/phash-scout/src/services/redis/image-scout/imageScout.ts';
import * as redis from 'redis';
// TODO: Add redis-json type from @types/redis-json
redis.createClient;
interface RedisJSONArray extends Array<RedisJSON> {}
interface RedisJSONObject {
  [key: string]: RedisJSON;
  [key: number]: RedisJSON;
}
export type RedisJSON =
  | null
  | boolean
  | number
  | string
  | Date
  | RedisJSONArray
  | RedisJSONObject;

interface NX {
  NX: true;
}

interface XX {
  XX: true;
}
interface GetOptions {
  path?: string | Array<string>;
  INDENT?: string;
  NEWLINE?: string;
  SPACE?: string;
  NOESCAPE?: true;
}
type RESPReply = Array<string | number | RESPReply>;
type RedisCommandArguments = Array<RedisCommandArgument> & {
  preserve?: unknown;
};
type RedisCommandArgument = string | Buffer;
type AppendArguments = [key: string, append: string];

type AppendWithPathArguments = [key: string, path: string, append: string];

/**
 * A Redis client that supports the `send_command` method.
 */
export type RedisClient = {
  json: {
    ARRAPPEND: (key: string, path: string, ...jsons: RedisJSON[]) => string[];
    ARRINDEX: (
      key: string,
      path: string,
      json: RedisJSON,
      start?: number,
      stop?: number
    ) => string[];
    ARRINSERT: (
      key: string,
      path: string,
      index: number,
      ...jsons: RedisJSON[]
    ) => string[];
    ARRLEN: (key: string, path?: string) => string[];
    ARRPOP: (
      key: string,
      path?: string,
      index?: number
    ) => (null | RedisJSON)[];
    ARRTRIM: (
      key: string,
      path: string,
      start: number,
      stop: number
    ) => string[];
    DEBUG_MEMORY: (key: string, path?: string) => number;
    DEL: (key: string, path?: string) => number;
    FORGET: (key: string, path?: string) => number;
    GET: (key: string, options?: GetOptions) => RedisCommandArguments;
    MGET: (keys: string[], path: string) => string[];
    NUMINCRBY: (key: string, path: string, by: number) => string[];
    NUMMULTBY: (key: string, path: string, by: number) => string[];
    OBJKEYS: (key: string, path?: string) => string[];
    OBJLEN: (key: string, path?: string) => string[];
    RESP: (key: string, path?: string) => RESPReply;
    SET: (
      key: string,
      path: string,
      json: RedisJSON,
      options?: NX | XX
    ) => string[];
    STRAPPEND: (...args: AppendArguments | AppendWithPathArguments) => string[];
    STRLEN: (key: string, path?: string) => string[];
    TYPE: (key: string, path?: string) => string[];
  };
  // json: {
  //   arrAppend: (
  //     key: string,
  //     path: string,
  //     ...jsons: Array<RedisJSON>
  //   ) => Array<string>;
  // };
  send_command: <R>(
    command: string,
    args: Array<string | number>,
    callback?: (err: any, result: any) => void
  ) => Promise<R>;
  close?: () => Promise<void>;
};
export interface RedisJsonCommands {
  json: {
    arrAppend(key: string, path: string, json: object): Promise<number>;
    arrIndex(
      key: string,
      path: string,
      jsonScalar: any,
      optionalStartAndStop?: [number, number]
    ): Promise<number>;
    arrInsert(
      key: string,
      path: string,
      index: number,
      jsonArray: any[]
    ): Promise<number>;
    arrLen(key: string, path?: string): Promise<number>;
    arrPop(key: string, path?: string): Promise<any>;
    arrTrim(
      key: string,
      path: string,
      start: number,
      stop: number
    ): Promise<number>;
    clear(key: string, path?: string): Promise<boolean>;
    debug(subcommand: string, key: string, path?: string): Promise<any>; // It's not clear what this command returns
    del(key: string, path: string): Promise<number>;
    get(key: string, path?: string): Promise<any>; // It returns the JSON value at path in key
    merge(
      key: string,
      path: string,
      json: object,
      ...otherKeysAndJson: any[]
    ): Promise<number>;
    mget(keys: string[], path?: string): Promise<any[]>;
    mset(keyPathJson: [string, string, object][]): Promise<'OK'>;
    numIncrBy(key: string, path: string, number: number): Promise<number>;
    numMultBy(key: string, path: string, number: number): Promise<number>;
    objKeys(key: string, path?: string): Promise<string[]>;
    objLen(key: string, path?: string): Promise<number>;
    resp(key: string, path?: string): Promise<any>; // It's not clear what this command returns
    set(
      key: string,
      path: string,
      json: object,
      optionalConditions?: any[],
      optionalOptions?: any[]
    ): Promise<'OK'>;
    strAppend(key: string, path: string, jsonString: string): Promise<number>;
    strlen(key: string, path: string): Promise<number>;
    toggle(key: string, path: string): Promise<any[]>; // It's not clear what this command returns
    type(key: string, path: string): Promise<string>;
  };
}
// JSON.arrAppend
/**
 * Home
Commands
JSON.ARRAPPEND
JSON.ARRAPPEND
Syntax
JSON.ARRAPPEND key [path] value [value ...]
Available in:
Redis Stack / JSON 1.0.0
Time complexity:
O(1) when path is evaluated to a single value, O(N) when path is evaluated to multiple values, where N is the size of the key
Append the json values into the array at path after the last element in it

Examples

Required arguments
key
is key to modify.

value
is one or more values to append to one or more arrays.

About using strings with JSON commands
To specify a string as an array value to append, wrap the quoted string with an additional set of single quotes. Example: '"silver"'. For more detailed use, see Examples.

Optional arguments
path
is JSONPath to specify. Default is root $.

Return value
JSON.ARRAPEND returns an array of integer replies for each path, the array's new size, or nil, if the matching JSON value is not an array. For more information about replies, see Redis serialization protocol specification.

Examples
Add a new color to a list of product colors
Create a document for noise-cancelling headphones in black and silver colors.

redis> JSON.SET item:1 $ '{"name":"Noise-cancelling Bluetooth headphones","description":"Wireless Bluetooth headphones with noise-cancelling technology","connection":{"wireless":true,"type":"Bluetooth"},"price":99.98,"stock":25,"colors":["black","silver"]}'
OK
Add color blue to the end of the colors array. JSON.ARRAPEND returns the array's new size.

redis> JSON.ARRAPPEND item:1 $.colors '"blue"'
1) (integer) 3
Return the new length of the colors array.

redis> JSON.GET item:1
"{\"name\":\"Noise-cancelling Bluetooth headphones\",\"description\":\"Wireless Bluetooth headphones with noise-cancelling technology\",\"connection\":{\"wireless\":true,\"type\":\"Bluetooth\"},\"price\":99.98,\"stock\":25,\"colors\":[\"black\",\"silver\",\"blue\"]}"
See also
JSON.ARRINDEX | JSON.ARRINSERT

Related topics
RedisJSON
Index and search JSON documents
 *
 */

// Return value
// JSON.ARRAPEND returns an array of integer replies for each path, the array's new size, or nil, if the matching JSON value is not an array. For more information about replies, see Redis serialization protocol specification.

/*
JSON.ARRAPPEND
Syntax
JSON.ARRAPPEND key [path] value [value ...]
Available in:
Redis Stack / JSON 1.0.0
Time complexity:
O(1) when path is evaluated to a single value, O(N) when path is evaluated to multiple values, where N is the size of the key
Append the json values into the array at path after the last element in it

Examples

Required arguments
key
is key to modify.

value
is one or more values to append to one or more arrays.

About using strings with JSON commands
To specify a string as an array value to append, wrap the quoted string with an additional set of single quotes. Example: '"silver"'. For more detailed use, see Examples.

Optional arguments
path
is JSONPath to specify. Default is root $.

Return value
JSON.ARRAPEND returns an array of integer replies for each path, the array's new size, or nil, if the matching JSON value is not an array. For more information about replies, see Redis serialization protocol specification.

Examples
Add a new color to a list of product colors
Create a document for noise-cancelling headphones in black and silver colors.

redis> JSON.SET item:1 $ '{"name":"Noise-cancelling Bluetooth headphones","description":"Wireless Bluetooth headphones with noise-cancelling technology","connection":{"wireless":true,"type":"Bluetooth"},"price":99.98,"stock":25,"colors":["black","silver"]}'
OK
Add color blue to the end of the colors array. JSON.ARRAPEND returns the array's new size.

redis> JSON.ARRAPPEND item:1 $.colors '"blue"'
1) (integer) 3
Return the new length of the colors array.

redis> JSON.GET item:1
"{\"name\":\"Noise-cancelling Bluetooth headphones\",\"description\":\"Wireless Bluetooth headphones with noise-cancelling technology\",\"connection\":{\"wireless\":true,\"type\":\"Bluetooth\"},\"price\":99.98,\"stock\":25,\"colors\":[\"black\",\"silver\",\"blue\"]}"
See also
JSON.ARRINDEX | JSON.ARRINSERT

Related topics
RedisJSON
Index and search JSON documents

Read more
 */

/**
 * Append the json values into the array at path after the last element in it
 * @param key
 * @param path
 * @param value
 * @param client
 * @returns
 * @example
 * Add a new color to a list of product colors
 * Create a document for noise-cancelling headphones in black and silver colors.
 * ```ts
 * redis> JSON.SET item:1 $ '{"name":"Noise-cancelling Bluetooth headphones","description":"Wireless Bluetooth headphones with noise-cancelling technology","connection":{"wireless":true,"type":"Bluetooth"},"price":99.98,"stock":25,"colors":["black","silver"]}'
 * OK
 * Add color blue to the end of the colors array. JSON.ARRAPEND returns the array's new size.
 * ```
 */
export function arrAppend(
  key: string,
  path: string,
  value: string,
  client: RedisClient
) {
  return client.json.ARRAPPEND(key, path, value);
}

/*
JSON.ARRINDEX
Returns the index of the first occurrence of a JSON scalar value in the array at path

Read more
JSON.ARRINSERT
Inserts the JSON scalar(s) value at the specified index in the array at path

Read more
JSON.ARRLEN
Returns the length of the array at path

Read more
JSON.ARRPOP
Removes and returns the element at the specified index in the array at path

Read more
JSON.ARRTRIM
Trims the array at path to contain only the specified inclusive range of indices from start to stop

Read more
JSON.CLEAR
Clears all values from an array or an object and sets numeric values to `0`

Read more
JSON.DEBUG
Debugging container command

Read more
JSON.DEBUG MEMORY
Reports the size in bytes of a key

Read more
JSON.DEL
Deletes a value

Read more
JSON.FORGET
Deletes a value

Read more
JSON.GET
Gets the value at one or more paths in JSON serialized form

Read more
JSON.MERGE
Merges a given JSON value into matching paths. Consequently, JSON values at matching paths are updated, deleted, or expanded with new children

Read more
JSON.MGET
Returns the values at a path from one or more keys

Read more
JSON.MSET
Sets or updates the JSON value of one or more keys

Read more
JSON.NUMINCRBY
Increments the numeric value at path by a value

Read more
JSON.NUMMULTBY
Multiplies the numeric value at path by a value

Read more
JSON.OBJKEYS
Returns the JSON keys of the object at path

Read more
JSON.OBJLEN
Returns the number of keys of the object at path

Read more
JSON.RESP
Returns the JSON value at path in Redis Serialization Protocol (RESP)

Read more
JSON.SET
Sets or updates the JSON value at a path

Read more
JSON.STRAPPEND
Appends a string to a JSON string value at path

Read more
JSON.STRLEN
Returns the length of the JSON String at path in key

Read more
JSON.TOGGLE
Toggles a boolean value

Read more
JSON.TYPE
Returns the type of the JSON value at path
 */
export {};
