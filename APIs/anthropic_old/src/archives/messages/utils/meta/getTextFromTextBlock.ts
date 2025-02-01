import type { TextBlock } from '../../types';

// convert from [TextBlock<Text>] to text just text and nothing else

export function getTextFromTextBlock<Text extends string>(
  block: TextBlock<Text>
): Text {
  return block.text;
}
