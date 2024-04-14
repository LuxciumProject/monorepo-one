import { ChatParticipant } from '../../types/ChatParticipant';
import { ChatMessage } from '../ChatMessage';
export function messagesHasSystemMessage(
  messages: ChatMessage[]
): messages is ChatParticipant[] {
  return !messages.some(message => message.role === 'system');
}
