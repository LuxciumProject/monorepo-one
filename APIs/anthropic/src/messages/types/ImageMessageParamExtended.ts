import { ImageBlockParam, TextBlock } from '@anthropic-ai/sdk/resources';
import { Models } from '../../constants/types';

export type ImageMessageParamExtended<M extends Models> = (
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
