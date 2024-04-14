import { ChatMessage } from './ChatMessage';

export class UserMessage extends ChatMessage<'user'> {
  constructor(message: string, prefix: string) {
    super('user', `${prefix}${message}`);
  }
}
