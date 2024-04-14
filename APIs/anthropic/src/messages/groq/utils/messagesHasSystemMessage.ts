import { ChatMessage } from '../ChatMessage';
import { ChatParticipant } from '../types';
export function messagesHasSystemMessage(
  messages: ChatMessage[]
): messages is ChatParticipant[] {
  return !messages.some(message => message.role === 'system');
}
