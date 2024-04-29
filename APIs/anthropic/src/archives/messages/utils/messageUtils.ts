import { ContentBlock, ImageBlockParam } from '@anthropic-ai/sdk/resources';
import { TextBlock, UserImageMessage, UserTextMessage } from '../types';

// Function for TextBlock Structure
export function createTextBlock<Text extends string>(
  text: Text
): TextBlock<Text> {
  return { text: text, type: 'text' };
}

// Function for ContentBlock Structure
export function createContentBlock(text: string): ContentBlock {
  return { text: text, type: 'text' };
}

// Function for UserTextMessage Structure
export function createUserTextMessage(text: string): UserTextMessage<string> {
  return { role: 'user', content: [createTextBlock(text)] };
}

// Function for ImageBlockParam Structure
export function createImageBlock(
  data: string,
  mediaType: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'
): ImageBlockParam {
  return {
    type: 'image',
    source: {
      type: 'base64',
      media_type: mediaType,
      data: data,
    },
  };
}

/*
{
  role: 'user',
  content: [
    {
      type: 'image',
      source: {
        type: 'base64',
        media_type: mediaType,
        data: bufferToBase64(pathToBuffer),
      },
    },
    { type: 'text', text },
  ],
};
 */

// Function for UserImageMessage Structure
export function createUserImageMessage<Text extends string>(
  text: Text,
  data: string,
  mediaType: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'
): UserImageMessage<string> {
  const content: [ImageBlockParam, TextBlock<Text>] = [
    createImageBlock(data, mediaType),
    createTextBlock<Text>(text),
  ];
  return {
    role: 'user',
    content,
  };
}
