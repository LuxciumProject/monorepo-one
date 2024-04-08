import { MessageParams, ModelReply } from '../../messages/types';

export type Claude<M extends `claude-${string}`> = (
  messageParams: MessageParams
) => Promise<ModelReply<M>>;
