import { SystemMessage } from '@langchain/core/messages';
import { AssistantMessage } from '..';
import { UserMessage } from '../../types';

export type MessageParticipant = UserMessage | AssistantMessage | SystemMessage;
