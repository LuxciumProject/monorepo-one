import { DB_NUMBER } from '../../../constants';
import { rConnect } from '../../../tools/redis';

const REDIS_DB_NUMBER = DB_NUMBER;
export const Rc = rConnect(null, REDIS_DB_NUMBER, null);

export { commands } from './object/commands';
