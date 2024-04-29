import { MODEL } from '../models-names';

export class MyMessageCreateParamsBase implements MyMessageCreateParamsBase {
  constructor(params: MyMessageCreateParamsBase) {
    const {
      max_tokens,
      messages,
      model,
      metadata,
      stop_sequences,
      stream,
      system,
      temperature,
      top_k,
      top_p,
    } = params;
    this.max_tokens = max_tokens || 1024;
    this.messages = messages;
    this.model = model || MODEL.DEFAULT;
    this.metadata = metadata || {
      user_id: null,
    };
    this.stop_sequences = stop_sequences;
    this.stream = stream || false;
    this.system = system;
    this.temperature = temperature;
    this.top_k = top_k;
    this.top_p = top_p;
  }
}
export interface MyMessageCreateParamsBase {
  max_tokens: number;
  // messages: Array<MessageParam>
  messages: Array<{
    // content: Array<TextBlock | ImageBlockParam>
    content:
      | Array<
          | {
              text: string;
              type?: 'text';
            }
          // ImageBlockParam
          | {
              // source: ImageBlockParam.Source;
              source: {
                data: string;
                media_type:
                  | 'image/jpeg'
                  | 'image/png'
                  | 'image/gif'
                  | 'image/webp';
                type?: 'base64';
              };
              type?: 'image';
            }
        >
      | string;
    role: 'user' | 'assistant';
  }>;
  model:
    | (string & {})
    | 'claude-3-opus-20240229'
    | 'claude-3-sonnet-20240229'
    | 'claude-3-haiku-20240307'
    | "claude-2.1'"
    | 'claude-2.0'
    | 'claude-instant-1.2';
  // metadata?: MessageCreateParams.Metadata
  metadata?: {
    user_id?: string | null;
  };
  stop_sequences?: string[];
  stream?: boolean;
  system?: string;
  temperature?: number;
  top_k?: number;
  top_p?: number;
}
