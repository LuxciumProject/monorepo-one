import { createMessage, GroqMessage } from '../../../interface/groq-cli';
import type { AssistantTextMessage, UserTextMessage } from '../../types';
import { getTextFromAssistantTextMessage } from './getTextFromAssistantTextMessage';
import { getTextFromUserTextMessage } from './getTextFromUserTextMessage';

export function convertAnthropicToGroqMessage(
  messages: (AssistantTextMessage<string> | UserTextMessage<string>)[]
): GroqMessage[] {
  return messages.map(message => {
    if (message.role === 'assistant') {
      return createMessage(
        'assistant',
        getTextFromAssistantTextMessage(message)
      );
    } else if (message.role === 'user') {
      return createMessage('user', getTextFromUserTextMessage(message));
    }
  });
}
