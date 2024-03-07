/**
 *
 * **Convert from 64 binary string to integer string.**
 *
 * @param {string} str - Must be length 64 and composed only of the characteres "0" | "1".
 * @returns {string} integer value in string format.
 *
 */
export function bigString(str: string | bigint): string {
  let str__ = str;
  if (typeof str === 'bigint') {
    str__ = str.toString(2).padStart(64, '0');
  }
  str__ = String(str__).toLowerCase().replaceAll(/[_n]/g, '');
  let strSplit = [...String(str__)];
  if (
    strSplit.length === 66 &&
    strSplit[0] === '0' &&
    strSplit[1] === 'b' &&
    strSplit.slice(2).every(bit => bit === '1' || bit === '0')
  ) {
    return BigInt(`${str__}`).toString();
  } else if (
    strSplit.length === 64 &&
    strSplit.every(bit => bit === '1' || bit === '0')
  ) {
    return BigInt(`0b${str__}`).toString();
  }
  throw new Error(
    'Something bad happened! The string was not 64 bit \'("0" | "1")\' long'
  );
}
