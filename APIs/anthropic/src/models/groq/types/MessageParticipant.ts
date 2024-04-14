import { AssistantMessage } from '../messages/AssistantMessage';
import { SystemMessage } from '../messages/SystemMessage';
import { UserMessage } from '../messages/UserMessage';

export type MessageParticipant = UserMessage | AssistantMessage | SystemMessage;
