import { ContentBlock, Usage } from '@anthropic-ai/sdk/resources';

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
  messageType: 'message';
  usage: Usage;
  input_tokens: number;
  output_tokens: number;
}
