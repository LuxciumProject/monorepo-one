import { MessageParams } from '../../../messages/types';
import { ModelReply } from '../../../messages/types/ModelReply';

export type Haiku<M extends `claude-3-haiku-${string}`> = (
  messageParams: MessageParams
) => Promise<ModelReply<M>>;
