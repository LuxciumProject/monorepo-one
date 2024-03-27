import Anthropic from '@anthropic-ai/sdk';

export interface MessageParams {
  client: Anthropic;
  system: string;
  user_text?: string;
  assist_text?: string;
  max_tokens?: number;
  user_id?: string | null;
  temperature?: number;
  top_k?: number;
  top_p?: number;
}
