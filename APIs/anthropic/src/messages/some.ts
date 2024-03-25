import * as MessagesAPI from './some';
//
type MessageCreateParams =
  | MessageCreateParamsNonStreaming
  | MessageCreateParamsStreaming;

interface TextBlock {
  text: string;

  type?: 'text';
}
interface ImageBlockParam {
  source: ImageBlockParam.Source;

  type?: 'image';
}

export namespace ImageBlockParam {
  export interface Source {
    data: string;

    media_type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';

    type?: 'base64';
  }
}

interface MessageParam {
  content: string | Array<TextBlock | ImageBlockParam>;

  role: 'user' | 'assistant';
}
interface MessageCreateParamsBase {
  max_tokens: number;
  messages: Array<MessageParam>;
  model:
    | 'claude-3-opus-20240229'
    | 'claude-3-sonnet-20240229'
    | 'claude-3-haiku-20240307'
    | 'claude-2.1'
    | 'claude-2.0'
    | 'claude-instant-1.2';
  metadata?: MessageCreateParams.Metadata;
  stop_sequences?: Array<string>;
  stream?: boolean;
  system?: string;
  temperature?: number;
  top_k?: number;
  top_p?: number;
}

// console.log(msg);
// max_tokens: 1024
// messages: [ { role: 'user', content: '' }, { role: 'assistant', content: [ { text:'', type:'text'}, { role: 'user', content: {source: {data:'string-base64', media_type:'mime/type' type:'base64'} }} ] }]
// model: ...

// metadata: { user_id: '123' }
// stream:false
// system:''
// temperature:0
// top_k:0
// top_p:0

// stop_sequences:
/*
temperature number
Amount of randomness injected into the response.

Defaults to 1.0. Ranges from 0.0 to 1.0. Use temperature closer to 0.0 for analytical / multiple choice, and closer to 1.0 for creative and generative tasks.

Note that even with temperature of 0.0, the results will not be fully deterministic.

top_p number
Use nucleus sampling.

In nucleus sampling, we compute the cumulative distribution over all the options for each subsequent token in decreasing probability order and cut it off once it reaches a particular probability specified by top_p. You should either alter temperature or top_p, but not both.

Recommended for advanced use cases only. You usually only need to use temperature.

top_k integer
Only sample from the top K options for each subsequent token.

Used to remove "long tail" low probability responses. Learn more technical details here.

Recommended for advanced use cases only. You usually only need to use temperature.
 */

export interface MessageCreateParamsStreaming extends MessageCreateParamsBase {
  /**
   * Whether to incrementally stream the response using server-sent events.
   *
   * See [streaming](https://docs.anthropic.com/claude/reference/messages-streaming)
   * for details.
   */
  stream: true;
}
export interface MessageCreateParamsNonStreaming
  extends MessageCreateParamsBase {
  /**
   * Whether to incrementally stream the response using server-sent events.
   *
   * See [streaming](https://docs.anthropic.com/claude/reference/messages-streaming)
   * for details.
   */
  stream?: false;
}

export namespace MessageCreateParams {
  /**
   * An object describing metadata about the request.
   */
  export interface Metadata {
    /**
     * An external identifier for the user who is associated with the request.
     *
     * This should be a uuid, hash value, or other opaque identifier. Anthropic may use
     * this id to help detect abuse. Do not include any identifying information such as
     * name, email address, or phone number.
     */
    user_id?: string | null;
  }

  export type MessageCreateParamsNonStreaming =
    MessagesAPI.MessageCreateParamsNonStreaming;
  export type MessageCreateParamsStreaming =
    MessagesAPI.MessageCreateParamsStreaming;
}
