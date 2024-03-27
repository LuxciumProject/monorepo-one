import { ContentBlock, Usage } from '@anthropic-ai/sdk/resources';
import { AssistantTextMessage, MessageItem, UserTextMessage } from './Message';

export interface ModelReply<M extends string> {
  role: 'assistant';
  model: M;
  replyModel: string;
  replyType: 'text';
  replyText: string;
  replyMessage: string;
  content: Array<ContentBlock>;
  stop_reason: 'end_turn' | 'max_tokens' | 'stop_sequence' | null;
  stop_sequence: string | null;
  id: string;
  contentMessage: Array<ContentBlock>;
  messageType: 'message';
  usage: Usage;
  input_tokens: number;
  output_tokens: number;

  request: MessageRequest<M>;
}

export interface MessageRequest<M extends string> {
  userMessage: UserTextMessage<string>;
  assistantMessage: AssistantTextMessage<string>;
  messages: MessageItem[];
  model: M;
  max_tokens: number;
  temperature: number;
  system: string;
  stream: boolean;
  top_k: number;
  top_p: number;
  metadata: { user_id?: string | null };
}
