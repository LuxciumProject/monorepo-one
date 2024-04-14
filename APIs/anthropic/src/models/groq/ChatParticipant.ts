import { AssistantMessage } from './messages/AssistantMessage';
import { UserMessage } from './messages/UserMessage';

export type ChatParticipant = UserMessage | AssistantMessage;
