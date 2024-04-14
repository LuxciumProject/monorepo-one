import { ChatParticipant } from './ChatParticipant';
import { MessageParticipant } from './MessageParticipant';

export type Conversation = [MessageParticipant, ...ChatParticipant[]];
