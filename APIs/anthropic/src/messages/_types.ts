import * as A from '@anthropic-ai/sdk';
import { RequestOptions } from '@anthropic-ai/sdk/core';
import {
  Completion,
  CompletionCreateParams,
  CompletionCreateParamsNonStreaming,
  CompletionCreateParamsStreaming,
  Completions,
  ContentBlock,
  ContentBlockDeltaEvent,
  ContentBlockStartEvent,
  ContentBlockStopEvent,
  ImageBlockParam,
  Message,
  MessageCreateParams,
  MessageCreateParamsNonStreaming,
  MessageCreateParamsStreaming,
  MessageDeltaEvent,
  MessageDeltaUsage,
  MessageParam,
  Messages,
  MessageStartEvent,
  MessageStopEvent,
  MessageStreamEvent,
  MessageStreamParams,
  TextBlock,
  TextDelta,
  Usage,
} from '@anthropic-ai/sdk/resources';
import { MessageCreateParamsBase } from '@anthropic-ai/sdk/resources/messages';

import {
  AI_PROMPT,
  Anthropic,
  APIConnectionError,
  APIConnectionTimeoutError,
  APIError,
  APIUserAbortError,
  AuthenticationError,
  BadRequestError,
  ClientOptions,
  ConflictError,
  fileFromPath,
  HUMAN_PROMPT,
  InternalServerError,
  NotFoundError,
  PermissionDeniedError,
  RateLimitError,
  toFile,
  UnprocessableEntityError,
} from '@anthropic-ai/sdk';
console.log(A.HUMAN_PROMPT);
console.log(A.AI_PROMPT);
A.toFile;
A.fileFromPath;

void Anthropic;
void HUMAN_PROMPT;
void AI_PROMPT;
void APIError;
void APIConnectionError;
void APIConnectionTimeoutError;
void APIUserAbortError;
void NotFoundError;
void ConflictError;
void RateLimitError;
void BadRequestError;
void AuthenticationError;
void InternalServerError;
void PermissionDeniedError;
void UnprocessableEntityError;
void toFile;
void fileFromPath;

const clientOptions: ClientOptions = null as any;
const requestOptions: RequestOptions = null as any;
const completion: Completion = null as any;
const completions: Completions = null as any;
const completionCreateParams: CompletionCreateParams = null as any;
const completionNonStreaming: CompletionCreateParamsNonStreaming = null as any; // completionCreateParamsNonStreaming
const completionStreaming: CompletionCreateParamsStreaming = null as any; // completionCreateParamsStreaming
const contentBlock: ContentBlock = null as any;
const contentBlockDeltaEvent: ContentBlockDeltaEvent = null as any;
const contentBlockStartEvent: ContentBlockStartEvent = null as any;
const contentBlockStopEvent: ContentBlockStopEvent = null as any;
const imageBlockParam: ImageBlockParam = null as any;
const messageDeltaEvent: MessageDeltaEvent = null as any;
const messageDeltaUsage: MessageDeltaUsage = null as any;
const messageParam: MessageParam = null as any;
const messageStartEvent: MessageStartEvent = null as any;
const messageStopEvent: MessageStopEvent = null as any;
const messageStreamEvent: MessageStreamEvent = null as any; //
const textBlock: TextBlock = null as any;
const textDelta: TextDelta = null as any;
const usage: Usage = null as any;
const messageCreateParams: MessageCreateParams = null as any;
const messageStreaming: MessageCreateParamsNonStreaming = null as any; // messageCreateParamsNonStreaming
const messageCreateParamsStreaming: MessageCreateParamsStreaming = null as any;
const messageStreamParams: MessageStreamParams = null as any;
const messageCreateParamsBase: MessageCreateParamsBase = null as any;

const message: Message = null as any;
const messages: Messages = null as any;

export type Models =
  | (string & {})
  | 'claude-3-opus-20240229'
  | 'claude-3-sonnet-20240229'
  | 'claude-3-haiku-20240307'
  | "claude-2.1'"
  | 'claude-2.0'
  | 'claude-instant-1.2';

// const messages: Messages = null as any;
// const messageCreateParams: MessageCreateParams = null as any;
// const messageStreamEvent: MessageStreamEvent = null as any;
// const contentBlock: ContentBlock = null as any;
// const contentBlockDeltaEvent: ContentBlockDeltaEvent = null as any;
// const contentBlockStartEvent: ContentBlockStartEvent = null as any;
// const contentBlockStopEvent: ContentBlockStopEvent = null as any;
// const imageBlockParam: ImageBlockParam = null as any;
// // const source: Source = null as any;
// const message: Message = null as any;
// const messageDeltaEvent: MessageDeltaEvent = null as any;
// // const delta: Delta = null as any;
// const messageDeltaUsage: MessageDeltaUsage = null as any;
// const messageParam: MessageParam = null as any;
// const messageStartEvent: MessageStartEvent = null as any;
// const messageStopEvent: MessageStopEvent = null as any;
// const textBlock: TextBlock = null as any;
// const textDelta: TextDelta = null as any;
// const usage: Usage = null as any;
// const messageCreateParamsBase: MessageCreateParamsBase = null as any;
// // const metadata: Metadata = null as any;
// const messageCreateParamsNonStreaming: MessageCreateParamsNonStreaming =
//   null as any;
// const messageCreateParamsStreaming: MessageCreateParamsStreaming = null as any;
// const messageStreamParams: MessageStreamParams = null as any;
// // const metadata:Metadata=null as any

void toFile;
void clientOptions;
void requestOptions;
void completions;
void completion;
void completionCreateParams;
void completionNonStreaming;
void completionStreaming;
void contentBlock;
void contentBlockDeltaEvent;
void contentBlockStartEvent;
void contentBlockStopEvent;
void imageBlockParam;
void message;
void messageDeltaEvent;
void messageDeltaUsage;
void messageParam;
void messageStartEvent;
void messageStopEvent;
void messageStreamEvent;
void textBlock;
void textDelta;
void usage;
void messageCreateParams;
void messageStreaming;
void messageCreateParamsStreaming;
void messageStreamParams;
void messages;
void messageCreateParams;
void messageStreamEvent;
void contentBlock;
void contentBlockDeltaEvent;
void contentBlockStartEvent;
void contentBlockStopEvent;
void imageBlockParam;
// void source
void message;
void messageDeltaEvent;
// void delta
void messageDeltaUsage;
void messageParam;
void messageStartEvent;
void messageStopEvent;
void textBlock;
void textDelta;
void usage;
void messageCreateParamsBase;
// void metadata
void messageStreamParams;
// void metadata

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
