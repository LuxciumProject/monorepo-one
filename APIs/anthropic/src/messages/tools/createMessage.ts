import {
  AssistantTextMessage,
  UserImageMessage,
  UserTextMessage,
} from '../types';
import { bufferToBase64, getMediaType, pathStringToBuffer } from '../utils';
import { isImageFileSizeValid } from './isImageFileSizeValid';
export function createAssitantMessage<Text extends string>(
  text: Text
): AssistantTextMessage<Text> {
  return {
    role: 'assistant',
    content: [{ type: 'text', text }],
  };
}
export function createUserMessage<Text extends string>(
  text: Text
): UserTextMessage<Text> {
  return {
    role: 'user',
    content: [{ type: 'text', text }],
  };
}
export function createImageMessage<Text extends string>(
  text: Text,
  imagePath: string,
  fileSizeLimit: number = 5
): UserImageMessage<Text> {
  const pathToBuffer = pathStringToBuffer(imagePath);
  const mediaType = getMediaType(imagePath);
  if (!mediaType) {
    throw new Error('Unsupported media type');
  }

  if (!isImageFileSizeValid(imagePath, fileSizeLimit)) {
    throw new Error('File size exceeds the limit');
  }
  return {
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
}
export const create = {
  assistantMessage: createAssitantMessage,
  imageMessage: createImageMessage,
  userMessage: createUserMessage,
};
