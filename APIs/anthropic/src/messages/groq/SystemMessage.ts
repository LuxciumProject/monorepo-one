import { GroqMessage } from '../../interface/groq-cli';
import { ChatMessage } from './ChatMessage';

export class SystemMessage<Type extends 'system' = 'system'>
  extends ChatMessage<Type>
  implements GroqMessage
{
  constructor(type: Type = 'system' as Type, message: string = '') {
    super(type as Type, message);
  }
  get system() {
    return this.content;
  }
  get systemMessageList(): GroqMessage[] {
    return [this];
  }
}
