import { ImageBlockParam, TextBlock } from '@anthropic-ai/sdk/resources';
import { Models } from '../models/types';
import { ImageMessageParamExtended } from './types/';

type UserMessage =
  | UserImageMessage
  | UserTextMessage
  | {
      content: string | Array<TextBlock | ImageBlockParam>;
      role: 'user';
    };
type UserImageMessage = {
  content: Array<TextBlock | ImageBlockParam>;
  role: 'user';
};
type UserTextMessage = {
  content: string | [TextBlock];
  role: 'user';
};

type AssistantMessage = {
  content: string | [TextBlock];
  role: 'assistant';
};

type Message = UserMessage | AssistantMessage;

type Messages = Message[];

export function getStreamCaller<M extends Models>(
  system: string,
  model: M = 'claude-3-haiku-20240307' as M,
  temperature: number = 0.5,
  max_tokens: number = 1024
): ImageMessageParamExtended<M> {
  const result = function streamCaller(messages: Messages) {
    return {
      messages,
      model,
      temperature,
      system,
      max_tokens,
    };
  };
  return result;
}

export function getHikuCaller(
  system: string,
  temperature: number = 0.5,
  max_tokens: number = 1024
) {
  return getStreamCaller<'claude-3-haiku-20240307'>(
    system,
    'claude-3-haiku-20240307' as const,
    temperature,
    max_tokens
  );
}

export function getSonnetCaller(
  system: string,
  temperature: number = 0.5,
  max_tokens: number = 1024
) {
  return getStreamCaller<'claude-3-sonnet-20240229'>(
    system,
    'claude-3-sonnet-20240229' as const,
    temperature,
    max_tokens
  );
}

export function getOpusCaller(
  system: string,
  temperature: number = 0.5,
  max_tokens: number = 1024
) {
  return getStreamCaller<'claude-3-opus-20240229'>(
    system,
    'claude-3-opus-20240229' as const,
    temperature,
    max_tokens
  );
}
