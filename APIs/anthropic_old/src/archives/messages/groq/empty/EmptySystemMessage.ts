import { defaultSystemMessage } from '../../../constants/defaultSystemMessage';
import { SystemMessage } from '../SystemMessage';
import { GroqMessage } from '../types';

export class EmptySystemMessage
  extends SystemMessage<'system'>
  implements GroqMessage
{
  constructor() {
    super('system', defaultSystemMessage);
  }
  get system() {
    return this.content;
  }
  get systemMessageList(): GroqMessage[] {
    return [this];
  }
}
