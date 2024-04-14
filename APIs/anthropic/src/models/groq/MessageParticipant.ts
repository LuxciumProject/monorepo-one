import { AssistantMessage } from './AssistantMessage';
import { SystemMessage } from './SystemMessage';
import { UserMessage } from './UserMessage';

export type MessageParticipant = UserMessage | AssistantMessage | SystemMessage;
