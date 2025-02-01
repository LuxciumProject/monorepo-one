import Anthropic from '@anthropic-ai/sdk';
import Groq from 'groq-sdk';
import { MessageItem } from './Message';

export interface MessageParams<
  APIProvider extends Anthropic | Groq = Anthropic,
> {
  client: APIProvider;
  system: string;

  systemContent?: string;
  messages?: MessageItem[];
  groq?: {};
  user_text?: string;
  user_prefix?: string;
  assist_text?: string;
  assist_prefix?: string;
  max_tokens?: number;
  user_id?: string | null;
  temperature?: number;
  top_k?: number;
  top_p?: number;
  previousMessages?: MessageItem[]; // Add a new parameter for the previous messages
}

// const nothing: MessageParams = null as MessageCreateParamsBase;
// const something: MessageCreateParamsBase = null as MessageParams;
// void nothing;
// void something;
// // MessageCreateParamsBase; 'client' or 'model'
