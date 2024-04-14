import { TextBlock } from '../../types';

export function extreactTextBlock<Text extends string>(
  block: TextBlock<Text>
): Text {
  // only to illustrate the validation of the type.
  if (block.type === 'text') {
    return block.text;
  }
  return block.text;
}
