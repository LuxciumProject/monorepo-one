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

import { opendirSync } from 'node:fs';
import { constants } from 'node:os';
import path, { normalize } from 'node:path';
import { chdir } from 'node:process';

import type { Mapper } from '../types/scan-dir';

// HACK: Must implement { logHigh, logLow }
// import { logHigh, logLow } from '../../../constants';
const logHigh = console.warn;
const logLow = console.log;
export class ScanDirs {
  private readonly _cwd: { path: string };

  private readonly _parents: string[];

  private readonly _queue: string[];

  private readonly _validExts: Set<string>;

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

  private readonly _absolutePath: string[];

  private constructor(absolutePath: string[] | string) {
    this._absolutePath = Array.isArray(absolutePath)
      ? [...absolutePath]
      : [absolutePath];
    this._parents = [];
    this._cwd = { path: '' };
    this._queue = [...this._absolutePath];
    this._validExts = new Set();
  }

  public get scan() {
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
    const self = this;
    return async function* (
      transformFn: (fullPath: string) => unknown = (fullPath: string) =>
        fullPath
    ) {
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

  private _traverse() {
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
    if ('..' === next) {
      this._cwd.path = this._cwd.path.slice(
        0,
        -(this._parents.pop()!.length + 1)
      );
      return false;
    } else {
      this._parents.push(next);
      this._cwd.path =
        0 === this._cwd.path.length
          ? next
          : normalize(`${this._cwd.path}/${next}`);
      logHigh(this._cwd.path);
      this._queue.push('..');
      return true;
    }
  }

  private _scanGenerator() {
    const d = opendirSync('.', {});
    const self = this;
    return function* (): Generator<string, boolean> {
      for (let ent = d.readSync(); ent !== null; ent = d.readSync()) {
        if (ent.isDirectory()) {
          self._queue.push(ent.name);
        } else {
          const fullPath = normalize(`${self._cwd.path}/${ent.name}`);
          yield fullPath;
        }
      }
      d.close();
      return false;
    };
  }

  addValidExt(ext: string[] | string) {
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

  remValidExt(ext: string[] | string) {
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

  get validExts() {
    if (0 === this._validExts.size) {
      return [];
    }
    return [...this._validExts.values()];
  }

  get hasValidExts() {
    if (0 === this._validExts.size) {
      return false;
    }
    return true;
  }

  hasExt(ext: string) {
    return this._validExts.has(ext.toLowerCase());
  }

  private _hasKey<K extends PropertyKey>(
    o: unknown,
    key: K
  ): o is { [P in K]: unknown } {
    return 'object' === typeof o && o !== null && key in o;
  }
}
export default ScanDirs;

export const scanFrom = ScanDirs.scanFrom;
export const from = ScanDirs.from;
