/*
*
* The MIT License (Expat)
* A permissive non-copyleft free software license,
* compatible with the GNU GPL

* Copyright (c) 2014 Andrew Kelley

* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation files
* (the "Software"), to deal in the Software without restriction,
* including without limitation the rights to use, copy, modify, merge,
* publish, distribute, sublicense, and/or sell copies of the Software,
* and to permit persons to whom the Software is furnished to do so,
* subject to the following conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
* BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
* ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
* CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.

  https://github.com/andrewrk/node-human-size
*/

export const mags: `${Mags}`[] = [
  '',
  'K',
  'M',
  'G',
  'T',
  'P',
  'E',
  'Z',
  'Y',
];
type Mags = '' | 'K' | 'M' | 'G' | 'T' | 'P' | 'E' | 'Z' | 'Y';

export function humanSize(
  bytes: number,
  spaced?: boolean
): `${string}${Mags}B`;
export function humanSize(
  bytes: number,
  precision?: number,
  spaced?: boolean
): `${string}${Mags}B`;
export function humanSize(
  bytes: number,
  precision?: number | boolean,
  spaced: boolean = false
): `${string}${Mags}B` {
  if (precision === true || precision === false) {
    spaced = precision;
    precision = undefined;
  }
  var magnitude = Math.min(
    (Math.log(bytes) / Math.log(1024)) | 0,
    mags.length - 1
  );
  let spacer: '' | ' ' = '';
  if (spaced) {
    spacer = ' ';
  }
  var result = bytes / Math.pow(1024, magnitude);
  var suffix: `${Mags}B` = `${mags[magnitude]}${'B'}`;
  return `${result.toFixed(precision)}${spacer}${suffix}`;
}

export default humanSize;
