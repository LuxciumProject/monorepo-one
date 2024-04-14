import { ChatMessage } from '../ChatMessage';
import { EmptyAssistantMessage } from './EmptyAssistantMessage';
import { EmptySystemMessage } from './EmptySystemMessage';
import { EmptyUserMessage } from './EmptyUserMessage';

export class EmptyMessage extends ChatMessage<'assistant' | 'user' | 'system'> {
  static create(role: 'assistant'): EmptyUserMessage;
  static create(role: 'user'): EmptyAssistantMessage;
  static create(role: 'system'): EmptySystemMessage;
  static create(
    role: string
  ): EmptyUserMessage | EmptyAssistantMessage | EmptySystemMessage;

  static create(): EmptySystemMessage;

  static create(role: 'assistant' | 'user' | 'system' = 'system') {
    if (role === 'assistant') {
      return new EmptyAssistantMessage();
    } else if (role === 'user') {
      return new EmptyUserMessage();
    }
    return new EmptySystemMessage();
  }
  constructor(role: 'assistant' | 'user' | 'system') {
    super(role, `[[ This message is intentionally left empty, empty turn! ]]`);
    if (role === 'system') {
      return new EmptySystemMessage();
    }
  }
}
