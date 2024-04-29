import { ImageBlockParam, TextBlock } from '@anthropic-ai/sdk/resources';

export type ImageMessageParam = {
  role: 'user';
  content: Array<TextBlock | ImageBlockParam>;
};
