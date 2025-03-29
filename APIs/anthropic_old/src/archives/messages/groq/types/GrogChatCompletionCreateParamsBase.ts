import { CompletionCreateParams } from './CompletionCreateParams';

export interface GrogChatCompletionCreateParamsBase {
  messages: Array<CompletionCreateParams.Message>;
  model: string;
  frequency_penalty?: number;
  logit_bias?: Record<string, number>;
  logprobs?: boolean;
  max_tokens?: number;
  n?: number;
  presence_penalty?: number;
  response_format?: CompletionCreateParams.ResponseFormat;
  seed?: number;
  stop?: string | null | Array<string>;
  stream?: boolean;
  temperature?: number;
  tool_choice?: CompletionCreateParams.ToolChoice;
  tools?: Array<CompletionCreateParams.Tool>;
  top_logprobs?: number;
  top_p?: number;
  user?: string;
}
