import { ChatParticipant } from './ChatParticipant';
import { MessageParticipant } from './MessageParticipant';

type Conversation = [MessageParticipant, ...ChatParticipant[]];
