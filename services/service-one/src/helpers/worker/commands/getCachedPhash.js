import {
  logFatal,
  PRE_CACHING,
  PROCESSED,
  UNPROCESSED
} from '../../../constants';
import { SET } from '../../SET';
import { commands, Rc } from '.';

// const { bigstr_phash_from_file } = commands;

/**
 *
 * @param {string} imgFileAbsPath if path is valid image file, returns phash as bigString
 * @returns {{processed:*; value:string; toString(): string}} bigString phash or "-2" if not valid image file
 */
export async function getCachedPhash(imgFileAbsPath) {
  const R = await Rc;
  try {
    const redisGetK_ = await redisGetK(R, imgFileAbsPath);
    const bigStrObj_ = bigStrObj(redisGetK_ || '');
    if (!isValid(bigStrObj_)) {
      const val = await commands.bigstr_phash_from_file(imgFileAbsPath);
// getBigStrPHashFromFile
      if (PRE_CACHING) {
        return redisSetK(R, imgFileAbsPath, val, false);
      }

      return bigStrObjFactory(val, false);
    }
    return bigStrObj_;
  } catch (error) {
    logFatal(error);
    return {
      processed: null,
      value: '-2',
      toString() {
        return `${this.processed ? PROCESSED : UNPROCESSED}:${this.value}`;
      },
    };
  }
}

function isValid(bigStrObj) {
  return (
    bigStrObj &&
    bigStrObj.value &&
    bigStrObj.value !== 'undefined' &&
    bigStrObj.value !== 'null' &&
    bigStrObj.value.length > 10
  );
}

function redisGetK(R, imgFileAbsPath) {
  const K = cachedPhash_K(imgFileAbsPath);
  return R.GET(K);
}

function cachedPhash_K(imgFileAbsPath) {
  return `'cachedPhash:${imgFileAbsPath}'`;
}

/**
 *
 * @param {string} bigstr phash as bigString
 * @returns {{processed:*; value:string; toString(): string}} bigString phash with value "-2" if not valid image file
 */
function bigStrObj(bigstr) {
  if (bigstr.includes(':')) {
    const [processed, value] = bigstr.split(':');
    return bigStrObjFactory(value, processed);
  }
  return bigStrObjFactory(bigstr, UNPROCESSED);
}

export function redisSetK(R, imgFileAbsPath, value, processed) {
  const K = cachedPhash_K(imgFileAbsPath);

  const bigstr = bigStrObjFactory(value, processed);
  SET(R, K, bigstr.toString());
  return bigstr;
}

/**
 * BigString Object factory function for phash values.
 *
 * @remarks BigString Object `{processed:any; value:string; toString(): string;}` is a string with a property "processed"
 * that is either "PROCESSED" or "UNPROCESSED" but can be `null` or
 * `false`.
 *
 * @param {string} value phash as bigString
 * @param {*} processed null, false, PROCESSED or UNPROCESSED
 * @returns {{processed:any; value:string; toString(): string;}} bigString Object with value pointing to bigString phash.
 */
export function bigStrObjFactory(value, processed) {
  return {
    processed,
    value,
    toString() {
      return `${this.processed ? PROCESSED : UNPROCESSED}:${this.value}`;
    },
  };
}

// const { value, processed } = {
//   value: '',
//   processed: false,
//   ...optionalValue,
// };
// const K = cachedPhash_K(imgFilecAbsPath);
// const R = await Rc;

// const calculatedValue =
//   value ||
//   getBigstr(
//     (await R.GET(K)) ||
//     (await commands.bigstr_phash_from_file(imgFileAbsPath))
//   ).value;

// return setCachedPhash(R, imgFileAbsPath, calculatedValue, processed);
