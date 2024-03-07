import { NODE_ENV } from './NODE_ENV';

export const isDevEnv = () =>
  NODE_ENV() === 'development' || NODE_ENV() === 'dev';
