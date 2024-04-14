import { TextBlock } from '../../messages/types';
import { createTextBlock } from './createTextBlock';

export function createContentBlock(message: {
  content: string;
}): [TextBlock<string>] {
  return [createTextBlock(message.content)];
}
