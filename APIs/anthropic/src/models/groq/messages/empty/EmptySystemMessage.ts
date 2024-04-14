import { defaultSystemMessage } from '../../../../constants/defaultSystemMessage';
import { GroqMessage } from '../../types/GroqMessage';
import { SystemMessage } from '../SystemMessage';

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
