import { isDevEnv } from '../utils/isDevEnv';
import { splitedHead, splitedTail } from '../utils/split';

export function getDevFilename(out = 'out') {
  return (__filename_: string = __filename) =>
    isDevEnv()
      ? `${splitedHead(
          __filename_,
          'parallel-mapping/'
        )}parallel-mapping/${out}/${splitedHead(
          splitedTail(__filename_, 'parallel-mapping/'),
          '.ts'
        )}.js`
      : __filename_;
}
