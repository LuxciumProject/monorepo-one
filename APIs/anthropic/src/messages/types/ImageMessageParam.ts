import { ImageBlockParam, TextBlock } from '../some';

export type ImageMessageParam = {
  role: 'user';
  content: Array<TextBlock | ImageBlockParam>;
};
