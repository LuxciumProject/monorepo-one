import { ImageBlockParam, TextBlock } from '@anthropic-ai/sdk/resources';
import { Model } from '../constants/types';

type ImageMessageParam<M extends Model> = (
  messages: {
    content: string | Array<TextBlock | ImageBlockParam>;
    role: 'user' | 'assistant';
  }[]
) => {
  messages: {
    content: string | Array<TextBlock | ImageBlockParam>;
    role: 'user' | 'assistant';
  }[];
  model: M;
  temperature: number;
  system: string;
  max_tokens: number;
};
export function getStreamCaller<M extends Model>(
  system: string,
  model: M = 'claude-3-haiku-20240307' as M,
  temperature: number = 0.5,
  max_tokens: number = 1024
): ImageMessageParam<M> {
  const result = function streamCaller(
    messages: {
      content: string | Array<TextBlock | ImageBlockParam>;
      role: 'user' | 'assistant';
    }[]
  ) {
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
