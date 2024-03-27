import {
  AssistantTextMessage,
  UserImageMessage,
  UserTextMessage,
} from '../types';
import { bufferToBase64, getMediaType, pathStringToBuffer } from '../utils';
import { isImageFileSizeValid } from './isImageFileSizeValid';

export function createAssitantMessage<
  Text extends string,
  Prefix extends string,
>(text: Text, prefix: Prefix): AssistantTextMessage<`${Prefix}${Text}`>;
export function createAssitantMessage<
  Text extends string,
  Prefix extends string,
>(text: Text, prefix: ''): AssistantTextMessage<`${Text}`>;
export function createAssitantMessage<
  Text extends string,
  Prefix extends string,
>(text: Text): AssistantTextMessage<`${Text}`>;
export function createAssitantMessage<
  Text extends string,
  Prefix extends string,
>(text: string, prefix: Prefix): AssistantTextMessage<`${Prefix}${string}`>;
export function createAssitantMessage<
  Text extends string,
  Prefix extends string,
>(text: Text, prefix: string): AssistantTextMessage<`${string}${Text}`>;
export function createAssitantMessage(
  text: string,
  prefix: string
): AssistantTextMessage<string>;
export function createAssitantMessage<
  Text extends string,
  Prefix extends string,
>(
  text: Text,
  prefix?: Prefix | ''
): AssistantTextMessage<`${Prefix | ''}${Text}`> {
  return {
    role: 'assistant',
    content: [{ type: 'text', text: `${prefix || ''}${text}` }],
  };
}

export function createUserMessage<Text extends string, Prefix extends string>(
  text: Text,
  prefix: Prefix
): UserTextMessage<`${Prefix}${Text}`>;
export function createUserMessage<Text extends string, Prefix extends string>(
  text: Text,
  prefix: ''
): UserTextMessage<`${Text}`>;
export function createUserMessage<Text extends string, Prefix extends string>(
  text: Text
): UserTextMessage<`${Text}`>;
export function createUserMessage<Text extends string, Prefix extends string>(
  text: string,
  prefix: Prefix
): UserTextMessage<`${Prefix}${string}`>;
export function createUserMessage<Text extends string, Prefix extends string>(
  text: Text,
  prefix: string
): UserTextMessage<`${string}${Text}`>;
export function createUserMessage(
  text: string,
  prefix: string
): UserTextMessage<string>;
export function createUserMessage<Text extends string, Prefix extends string>(
  text: Text,
  prefix?: Prefix | ''
): UserTextMessage<`${Prefix | ''}${Text}`> {
  return {
    role: 'user',
    content: [{ type: 'text', text: `${prefix || ''}${text}` }],
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
