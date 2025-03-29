import { TextBlock } from '../../types';
import { createTextBlock } from './createTextBlock';

export function createContentBlock(message: {
  content: string;
}): [TextBlock<string>] {
  return [createTextBlock(message.content)];
}
