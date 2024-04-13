// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import * as Core from '@anthropic-ai/sdk/core';
import { APIPromise } from '@anthropic-ai/sdk/core';
import { MessageStream } from '@anthropic-ai/sdk/lib/MessageStream';
import { APIResource } from '@anthropic-ai/sdk/resource';
import * as MessagesAPI from '@anthropic-ai/sdk/resources/messages';
import { Stream } from '@anthropic-ai/sdk/streaming';
export { MessageStream } from '@anthropic-ai/sdk/lib/MessageStream';

export class Messages extends APIResource {
  create(
    body: MessageCreateParamsNonStreaming,
    options?: Core.RequestOptions
  ): APIPromise<Message>;
  create(
    body: MessageCreateParamsStreaming,
    options?: Core.RequestOptions
  ): APIPromise<Stream<MessageStreamEvent>>;
  create(
    body: MessageCreateParamsBase,
    options?: Core.RequestOptions
  ): APIPromise<Stream<MessageStreamEvent> | Message>;
  create(
    body: MessageCreateParams,
    options?: Core.RequestOptions
  ): APIPromise<Message> | APIPromise<Stream<MessageStreamEvent>> {
    return this._client.post('/v1/messages', {
      body,
      timeout: 600000,
      ...options,
      stream: body.stream ?? false,
    }) as APIPromise<Message> | APIPromise<Stream<MessageStreamEvent>>;
  }
  stream(
    body: MessageStreamParams,
    options?: Core.RequestOptions
  ): MessageStream {
    return MessageStream.createMessage(this, body, options);
  }
}

class ContentBlockClass<Text extends string> implements ContentBlock {
  private _text: Text;
  static of<Text extends string>(text: Text): ContentBlock<Text> {
    return new ContentBlockClass(text);
  }

  protected constructor(text: Text) {
    this._text = text;
  }

  public get text(): Text {
    return this._text;
  }

  public get type(): 'text' {
    return 'text';
  }

  unbond(): ContentBlock<Text> {
    return {
      text: this._text,
      type: 'text',
    };
  }
}
export interface ContentBlock<Text extends string = string> {
  text: Text;
  type: 'text';
}

export interface ContentBlockDeltaEvent {
  delta: TextDelta;
  index: number;
  type: 'content_block_delta';
}

export interface ContentBlockStartEvent {
  content_block: ContentBlock;
  index: number;
  type: 'content_block_start';
}

export interface ContentBlockStopEvent {
  index: number;
  type: 'content_block_stop';
}

export interface ImageBlockParam {
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

function claudeMessage(message: Message) {
  const { role, content: contentList, usage } = message;
  const content = contentList
    .filter(content => content.type === 'text')
    .map(content => content.text)
    .join(' ');
  return { role, content, usage };
}

export type Message = MessageRecived;

export interface MessageRecived<Text extends string = 'assistant'> {
  id: string;
  content: Array<ContentBlock>;
  model: string;
  role: Text;
  stop_reason: 'end_turn' | 'max_tokens' | 'stop_sequence' | null;
  stop_sequence: string | null;
  type: 'message';
  usage: Usage;
}

export interface MessageDeltaEvent {
  delta: MessageDeltaEvent.Delta;
  type: 'message_delta';
  usage: MessageDeltaUsage;
}

export namespace MessageDeltaEvent {
  export interface Delta {
    stop_reason: 'end_turn' | 'max_tokens' | 'stop_sequence' | null;
    stop_sequence: string | null;
  }
}

export interface MessageDeltaUsage {
  output_tokens: number;
}

export type UserTextMessage = MessageParam<'user'>;
export type AssistantTextMessage = MessageParam<'assistant'>;

export interface MessageParam<Role extends 'user' | 'assistant' = 'assistant'> {
  content: string | Array<TextBlock | ImageBlockParam>;
  role: Role;
}

export interface MessageStartEvent {
  message: Message;
  type: 'message_start';
}

export interface MessageStopEvent {
  type: 'message_stop';
}

export type MessageStreamEvent =
  | MessageStartEvent
  | MessageDeltaEvent
  | MessageStopEvent
  | ContentBlockStartEvent
  | ContentBlockDeltaEvent
  | ContentBlockStopEvent;

export interface TextBlock {
  text: string;
  type?: 'text';
}

export interface TextDelta {
  text: string;
  type: 'text_delta';
}

export interface Usage {
  input_tokens: number;
  output_tokens: number;
}

export type MessageCreateParams =
  | MessageCreateParamsNonStreaming
  | MessageCreateParamsStreaming;

export interface MessageCreateParamsBase_2 {
  max_tokens: number;
  messages: {
    content:
      | string
      | {
          text: string;
          type?: 'text';
        }
      | {
          source: {
            data: string;
            media_type: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp';
            type?: 'base64';
          };
          type?: 'image';
        }[];
    role: 'user' | 'assistant';
  }[];
  model:
    | (string & {})
    | 'claude-3-opus-20240229'
    | 'claude-3-sonnet-20240229'
    | 'claude-3-haiku-20240307'
    | "claude-2.1'"
    | 'claude-2.0'
    | 'claude-instant-1.2';
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
export interface MessageCreateParamsBase {
  max_tokens: number;
  messages: Array<MessageParam>;
  model:
    | (string & {})
    | 'claude-3-opus-20240229'
    | 'claude-3-sonnet-20240229'
    | 'claude-3-haiku-20240307'
    | "claude-2.1'"
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

export namespace MessageCreateParams {
  export interface Metadata {
    user_id?: string | null;
  }
  export type MessageCreateParamsNonStreaming =
    MessagesAPI.MessageCreateParamsNonStreaming;
  export type MessageCreateParamsStreaming =
    MessagesAPI.MessageCreateParamsStreaming;
}

export interface MessageCreateParamsNonStreaming
  extends MessageCreateParamsBase {
  stream?: false;
}

export interface MessageCreateParamsStreaming extends MessageCreateParamsBase {
  stream: true;
}

export interface MessageStreamParams {
  max_tokens: number;
  messages: Array<MessageParam>;
  model:
    | (string & {})
    | 'claude-3-opus-20240229'
    | 'claude-3-sonnet-20240229'
    | 'claude-3-haiku-20240307'
    | "claude-2.1'"
    | 'claude-2.0'
    | 'claude-instant-1.2';
  metadata?: MessageStreamParams.Metadata;
  stop_sequences?: Array<string>;
  system?: string;
  temperature?: number;
  top_k?: number;
  top_p?: number;
}

export namespace MessageStreamParams {
  export interface Metadata {
    user_id?: string | null;
  }
}

export namespace Messages {
  export import ContentBlock = MessagesAPI.ContentBlock;
  export import ContentBlockDeltaEvent = MessagesAPI.ContentBlockDeltaEvent;
  export import ContentBlockStartEvent = MessagesAPI.ContentBlockStartEvent;
  export import ContentBlockStopEvent = MessagesAPI.ContentBlockStopEvent;
  export import ImageBlockParam = MessagesAPI.ImageBlockParam;
  export import Message = MessagesAPI.Message;
  export import MessageDeltaEvent = MessagesAPI.MessageDeltaEvent;
  export import MessageDeltaUsage = MessagesAPI.MessageDeltaUsage;
  export import MessageParam = MessagesAPI.MessageParam;
  export import MessageStartEvent = MessagesAPI.MessageStartEvent;
  export import MessageStopEvent = MessagesAPI.MessageStopEvent;
  export import MessageStreamEvent = MessagesAPI.MessageStreamEvent;
  export import TextBlock = MessagesAPI.TextBlock;
  export import TextDelta = MessagesAPI.TextDelta;
  export import Usage = MessagesAPI.Usage;
  export import MessageCreateParams = MessagesAPI.MessageCreateParams;
  export import MessageCreateParamsNonStreaming = MessagesAPI.MessageCreateParamsNonStreaming;
  export import MessageCreateParamsStreaming = MessagesAPI.MessageCreateParamsStreaming;
  export import MessageStreamParams = MessagesAPI.MessageStreamParams;
}

export interface MessageCreateParamsBase {
  /**
   * The maximum number of tokens to generate before stopping.
   *
   * Note that our models may stop _before_ reaching this maximum. This parameter
   * only specifies the absolute maximum number of tokens to generate.
   *
   * Different models have different maximum values for this parameter. See
   * [models](https://docs.anthropic.com/claude/docs/models-overview) for details.
   */
  max_tokens: number;

  /**
   * Input messages.
   *
   * Our models are trained to operate on alternating `user` and `assistant`
   * conversational turns. When creating a new `Message`, you specify the prior
   * conversational turns with the `messages` parameter, and the model then generates
   * the next `Message` in the conversation.
   *
   * Each input message must be an object with a `role` and `content`. You can
   * specify a single `user`-role message, or you can include multiple `user` and
   * `assistant` messages. The first message must always use the `user` role.
   *
   * If the final message uses the `assistant` role, the response content will
   * continue immediately from the content in that message. This can be used to
   * constrain part of the model's response.
   *
   * Example with a single `user` message:
   *
   * ```json
   * [{ "role": "user", "content": "Hello, Claude" }]
   * ```
   *
   * Example with multiple conversational turns:
   *
   * ```json
   * [
   *   { "role": "user", "content": "Hello there." },
   *   { "role": "assistant", "content": "Hi, I'm Claude. How can I help you?" },
   *   { "role": "user", "content": "Can you explain LLMs in plain English?" }
   * ]
   * ```
   *
   * Example with a partially-filled response from Claude:
   *
   * ```json
   * [
   *   {
   *     "role": "user",
   *     "content": "What's the Greek name for Sun? (A) Sol (B) Helios (C) Sun"
   *   },
   *   { "role": "assistant", "content": "The best answer is (" }
   * ]
   * ```
   *
   * Each input message `content` may be either a single `string` or an array of
   * content blocks, where each block has a specific `type`. Using a `string` for
   * `content` is shorthand for an array of one content block of type `"text"`. The
   * following input messages are equivalent:
   *
   * ```json
   * { "role": "user", "content": "Hello, Claude" }
   * ```
   *
   * ```json
   * { "role": "user", "content": [{ "type": "text", "text": "Hello, Claude" }] }
   * ```
   *
   * Starting with Claude 3 models, you can also send image content blocks:
   *
   * ```json
   * {
   *   "role": "user",
   *   "content": [
   *     {
   *       "type": "image",
   *       "source": {
   *         "type": "base64",
   *         "media_type": "image/jpeg",
   *         "data": "/9j/4AAQSkZJRg..."
   *       }
   *     },
   *     { "type": "text", "text": "What is in this image?" }
   *   ]
   * }
   * ```
   *
   * We currently support the `base64` source type for images, and the `image/jpeg`,
   * `image/png`, `image/gif`, and `image/webp` media types.
   *
   * See [examples](https://docs.anthropic.com/claude/reference/messages-examples)
   * for more input examples.
   *
   * Note that if you want to include a
   * [system prompt](https://docs.anthropic.com/claude/docs/system-prompts), you can
   * use the top-level `system` parameter — there is no `"system"` role for input
   * messages in the Messages API.
   */
  messages: Array<MessageParam>;

  /**
   * The model that will complete your prompt.
   *
   * See [models](https://docs.anthropic.com/claude/docs/models-overview) for
   * additional details and options.
   */
  model:
    | (string & {})
    | 'claude-3-opus-20240229'
    | 'claude-3-sonnet-20240229'
    | 'claude-3-haiku-20240307'
    | "claude-2.1'"
    | 'claude-2.0'
    | 'claude-instant-1.2';

  /**
   * An object describing metadata about the request.
   */
  metadata?: MessageCreateParams.Metadata;

  /**
   * Custom text sequences that will cause the model to stop generating.
   *
   * Our models will normally stop when they have naturally completed their turn,
   * which will result in a response `stop_reason` of `"end_turn"`.
   *
   * If you want the model to stop generating when it encounters custom strings of
   * text, you can use the `stop_sequences` parameter. If the model encounters one of
   * the custom sequences, the response `stop_reason` value will be `"stop_sequence"`
   * and the response `stop_sequence` value will contain the matched stop sequence.
   */
  stop_sequences?: Array<string>;

  /**
   * Whether to incrementally stream the response using server-sent events.
   *
   * See [streaming](https://docs.anthropic.com/claude/reference/messages-streaming)
   * for details.
   */
  stream?: boolean;

  /**
   * System prompt.
   *
   * A system prompt is a way of providing context and instructions to Claude, such
   * as specifying a particular goal or role. See our
   * [guide to system prompts](https://docs.anthropic.com/claude/docs/system-prompts).
   */
  system?: string;

  /**
   * Amount of randomness injected into the response.
   *
   * Defaults to `1.0`. Ranges from `0.0` to `1.0`. Use `temperature` closer to `0.0`
   * for analytical / multiple choice, and closer to `1.0` for creative and
   * generative tasks.
   *
   * Note that even with `temperature` of `0.0`, the results will not be fully
   * deterministic.
   */
  temperature?: number;

  /**
   * Only sample from the top K options for each subsequent token.
   *
   * Used to remove "long tail" low probability responses.
   * [Learn more technical details here](https://towardsdatascience.com/how-to-sample-from-language-models-682bceb97277).
   *
   * Recommended for advanced use cases only. You usually only need to use
   * `temperature`.
   */
  top_k?: number;

  /**
   * Use nucleus sampling.
   *
   * In nucleus sampling, we compute the cumulative distribution over all the options
   * for each subsequent token in decreasing probability order and cut it off once it
   * reaches a particular probability specified by `top_p`. You should either alter
   * `temperature` or `top_p`, but not both.
   *
   * Recommended for advanced use cases only. You usually only need to use
   * `temperature`.
   */
  top_p?: number;
}
