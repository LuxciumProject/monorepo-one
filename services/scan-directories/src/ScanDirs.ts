/* ************************************************************************** */
/* *                                                                        * */
/* *  MIT License                                                           * */
/* *  Copyright webstrand © 2022                                            * */
/* *  https://gist.github.com/webstrand/46e7de2319a5aad77da443e3fd50a82d    * */
/* *  (Revision:  1100077cf56fa2532b6c0dd2c94ccb9f3718d79b)                 * */
/* *  Fast Synchronous Directory Traversal using chdir                      * */
/* *                                                                        * */
/* *  Midified by Luxcium                                                   * */
/* *  Copyright Luxcium © 2022                                              * */
/* *                                                                        * */
/* *  The above copyright notice and this permission notice shall be        * */
/* *  included in all copies or substantial portions of the Software.       * */
/* *                                                                        * */
/* *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,       * */
/* *  EXPRESS OR IMPLIED INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF     * */
/* *  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE [... MIT License ]  * */
/* *                                                                        * */
/* ************************************************************************** */

import { Mapper } from '@luxcium/tools';
import { opendirSync } from 'node:fs';
import { constants } from 'node:os';
import path, { normalize } from 'node:path';
import { chdir } from 'node:process';

const debug = false;
debug && console.error('debug on in ', __filename);

// HACK: for missing import { logHigh, logLow } from '../../../constants';
const logHigh = console.error;
const logLow = console.log;

export class ScanDirs implements AsyncIterable<string> {
  private _cwd: { path: string };
  private _parents: string[];
  private _queue: string[];
  private _validExts: Set<string>;
  private _absolutePath: string[];

  static from(absolutePath: string) {
    return new ScanDirs(absolutePath);
  }

  static scanFrom(absolutePath: string) {
    return new ScanDirs(absolutePath).scan();
  }

  static mapFrom<U = unknown>(
    absolutePath: string[] | string,
    transformFn: Mapper<any, U>
    // (path: string) => unknown = (t: string) => t
  ) {
    return new ScanDirs(absolutePath).map(transformFn);
  }

  private constructor(absolutePath: string | string[]) {
    this._absolutePath = Array.isArray(absolutePath)
      ? [...absolutePath]
      : [absolutePath];
    this._parents = [];
    this._cwd = { path: '' };
    this._queue = [...this._absolutePath];
    this._validExts = new Set();
  }

  private _traverse(): boolean {
    const next = this._queue.pop()!;
    try {
      chdir(next);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (this._hasKey(error, 'errno')) {
          if (error.errno === -constants.errno.EACCES) {
            logLow([next, error].toString(), 'EACCES: skipping');
            return false;
          }
          if (error.errno === -constants.errno.ENOENT) {
            logLow([next, error].toString(), 'ENOENT: skipping');
            return false;
          }
        }
      }
      throw error;
    }
    if (next === '..') {
      this._cwd.path = this._cwd.path.slice(
        0,
        -(this._parents.pop()!.length + 1)
      );
      return false;
    } else {
      this._parents.push(next);
      this._cwd.path =
        this._cwd.path.length === 0
          ? next
          : normalize(`${this._cwd.path}/${next}`);
      debug && logHigh(this._cwd.path);
      this._queue.push('..');
      return true;
    }
  }

  private _scanGenerator() {
    const d = opendirSync('.', {});
    const self = this;
    return function* (): Generator<string, boolean, unknown> {
      for (let ent = d.readSync(); ent !== null; ent = d.readSync()) {
        if (ent.isDirectory()) {
          self._queue.push(ent.name);
        } else {
          const fullPath = normalize(`${self._cwd.path}/${ent.name}`);
          const extname = path.extname(fullPath).toLowerCase();
          extname;
          if (self.hasValidExts) {
            if (self.hasExt(extname)) {
              yield fullPath;
            }
          }
        }
      }
      d.close();
      return false;
    };
  }

  public get scan(): () => Generator<string, boolean, unknown> {
    const self = this;
    return function* () {
      while (self._queue.length > 0) {
        const traverse = self._traverse();
        if (traverse) {
          yield* self._scanGenerator()();
        }
      }
      return false;
    };
  }

  public get map() {
    // = (fullPath: string) => fullPath
    const self = this;
    return async function* <R>(transformFn: (fullPath: string) => R) {
      for await (const fullPath of self.scan()) {
        const extname = path.extname(fullPath).toLowerCase();
        extname;
        if (self.hasValidExts) {
          if (self.hasExt(extname)) {
            yield transformFn(fullPath);
          }
        }
      }
      return false;
    };
  }

  public addValidExt(ext: string | string[]) {
    if (!Array.isArray(ext)) {
      if (this._validExts.has(ext.toLowerCase())) {
        return this;
      }
      this._validExts.add(ext.toLowerCase());
    } else {
      for (const xt of ext) {
        if (!this._validExts.has(xt.toLowerCase())) {
          this._validExts.add(xt.toLowerCase());
        }
      }
    }
    return this;
  }

  public remValidExt(ext: string | string[]) {
    if (!Array.isArray(ext)) {
      if (!this._validExts.has(ext.toLowerCase())) {
        return this;
      }
      this._validExts.delete(ext.toLowerCase());
    } else {
      for (const xt of ext) {
        if (this._validExts.has(xt.toLowerCase())) {
          this._validExts.delete(xt.toLowerCase());
        }
      }
    }
    return this;
  }

  public hasExt(ext: string) {
    return this._validExts.has(ext.toLowerCase());
  }

  public get validExts() {
    if (this._validExts.size === 0) {
      return [];
    }
    return [...this._validExts.values()];
  }

  public get hasValidExts() {
    if (this._validExts.size === 0) {
      return false;
    }
    return true;
  }

  private get asyncIteratorPrototype() {
    return Object.getPrototypeOf(
      Object.getPrototypeOf(async function* () {}.prototype)
    );
  }

  private _hasKey<K extends PropertyKey>(
    o: unknown,
    key: K
  ): o is { [P in K]: unknown } {
    return typeof o === 'object' && o !== null && key in o;
  }

  async *[Symbol.asyncIterator](): AsyncIterator<string> {
    this.asyncIteratorPrototype;
    yield* this.map(idem => idem);
  }

  /**
   * A function that accepts zero or one argument and returns a
   * promise. The promise fulfills to an object conforming to the
   * the IteratorResult interface, and the properties have the same
   * semantics as those of the sync iterator's.
   * @param value
   */
  // async next(value?: any): Promise<never> {
  //   void value as never;
  //   throw Error('Method not implemented');
  // }
  /**
   * A function that accepts zero or one argument and returns a
   * promise. The promise fulfills to an object conforming to
   * the IteratorResult interface, and the properties have the
   * same semantics as those of the sync iterator's.
   * @param value
   */
  // async return(value: any): Promise<never> {
  //   void value as never;
  //   throw Error('Method not implemented');
  // }
  /**
   * A function that accepts zero or one argument and returns a
   * promise. The promise fulfills to an object conforming to
   * the IteratorResult interface, and the properties have the same
   * semantics as those of the sync iterator's.
   * @param exception
   */
  // async throw(exception: any): Promise<never> {
  //   void exception as never;
  //   throw Error('Method not implemented');
  // }

  /*
interface AsyncIterator<T, TReturn = any, TNext = undefined> {
    // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
    next(...args: [] | [TNext]): Promise<IteratorResult<T, TReturn>>;
    return?(value?: TReturn | PromiseLike<TReturn>): Promise<IteratorResult<T, TReturn>>;
    throw?(e?: any): Promise<IteratorResult<T, TReturn>>;
}

interface AsyncIterable<T> {
    [Symbol.asyncIterator](): AsyncIterator<T>;
}

interface AsyncIterableIterator<T> extends AsyncIterator<T> {
    [Symbol.asyncIterator](): AsyncIterableIterator<T>;
}

interface AsyncGenerator<T = unknown, TReturn = any, TNext = unknown> extends AsyncIterator<T, TReturn, TNext> {
    // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
    next(...args: [] | [TNext]): Promise<IteratorResult<T, TReturn>>;
    return(value: TReturn | PromiseLike<TReturn>): Promise<IteratorResult<T, TReturn>>;
    throw(e: any): Promise<IteratorResult<T, TReturn>>;
    [Symbol.asyncIterator](): AsyncGenerator<T, TReturn, TNext>;
}


    next(...args: [] | [TNext]): Promise<IteratorResult<T, TReturn>>;
    return(value: TReturn | PromiseLike<TReturn>): Promise<IteratorResult<T, TReturn>>;
    throw(e: any): Promise<IteratorResult<T, TReturn>>;
    [Symbol.asyncIterator](): AsyncGenerator<T, TReturn, TNext>;

  =https://stackoverflow.com/a/66552487/10269298#CC-BY-SA-4.0
//% The async iterator and async iterable protocols
There are another pair of protocols used for async iteration, named async iterator and async iterable protocols. They have very similar interfaces compared to the iterable and iterator protocols, except that each return value from the calls to the iterator methods is wrapped in a promise.

An object implements the async iterable protocol when it implements the following methods:

//%+ [Symbol.asyncIterator]
A zero-argument function that returns an object, conforming to the async iterator protocol.

An object implements the async iterator protocol when it implements the following methods:

//%+ next()
A function that accepts zero or one argument and returns a promise. The promise fulfills to an object conforming to the IteratorResult interface, and the properties have the same semantics as those of the sync iterator's.

//%+ return(value) Optional
A function that accepts zero or one argument and returns a promise. The promise fulfills to an object conforming to the IteratorResult interface, and the properties have the same semantics as those of the sync iterator's.

//%+ throw(exception) Optional
A function that accepts zero or one argument and returns a promise. The promise fulfills to an object conforming to the IteratorResult interface, and the properties have the same semantics as those of the sync iterator's.




Now this code works just fine

async *[Symbol.asyncIterator](){
  var promise;
  while (true){
    promise = this.#HEAD.promise;
    this.size--;
    this.#HEAD.next ? this.#HEAD = this.#HEAD.next
                    : this.#LAST = void 0;
    yield await promise;
  };
};

// --------------------
  [Symbol.asyncIterator](){
    let current = this.#HEAD;
    return Object.assign(Object.create(asyncIterator), {
        next() {
            if (true)) { // done condition
                return Promise.resolve({done: true});
            }
            return current.promise.then(value => {
                current = current.next; // or whatever
                return {value, done: false};
            });
        }
    });
}

// have next, throw, and return methods.
   */
}
export default ScanDirs;

export const scanDirs = ScanDirs.scanFrom;
export const scanDirsFrom = ScanDirs.from;
