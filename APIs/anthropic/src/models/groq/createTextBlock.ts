import { TextBlock } from '../../messages/types';

export function createTextBlock<Text extends string>(
  text: Text
): TextBlock<Text> {
  return {
    type: 'text',
    text,
  };
}
