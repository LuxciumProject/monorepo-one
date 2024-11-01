import { MessageCreateParams } from '@anthropic-ai/sdk/resources/messages.mjs';

/**
 * Builder pattern for constructing an API request.
 * Utilizes a chainable approach to configure request properties.
 */
export function createRequestBuilder() {
  let request: Record<string, any> = {};
  return {
    addModel: (model: string) => {
      request = { ...request, model };
      return {
        ...createRequestBuilder(),
        from: (existingRequest: any) => {
          request = { ...existingRequest };
          return {
            ...createRequestBuilder(),
            build: () => request,
          };
        },
        build: () => request,
      };
    },
    addTemperature: (temperature: number) => {
      request = { ...request, temperature };
      return {
        ...createRequestBuilder(),
        from: (existingRequest: any) => {
          request = { ...existingRequest };
          return {
            ...createRequestBuilder(),
            build: () => request,
          };
        },
        build: () => request,
      };
    },
    from: (existingRequest: any) => {
      request = { ...existingRequest };
      return {
        ...createRequestBuilder(),
        build: () => request,
      };
    },
    build: () => request,
  };
}

/**
 * Higher-order function that adds a new message to the history in an immutable way.
 * Prevents mutation by returning a new array with the added message.
 * @param history - Current message history.
 * @param newMessage - Message to be added.
 */
export function addMessage(
  history: ChatMessage[],
  newMessage: ChatMessage,
): ChatMessage[] {
  return [...history, newMessage];
}

/**
 * Function that handles different content types dynamically.
 * Uses content handlers to transform different types of content.
 * @param content - Content to be handled (e.g., text, image).
 */
export function handleContent(content: any): string | any {
  if (isTextContent(content)) return content.text;
  return content; // Extend to handle more content types
}

/**
 * Formats the message history for API request purposes.
 * Maps over each message to convert it to the correct structure for an API call.
 * @param history - The chat message history.
 */
export function formatMessageHistory(
  history: ChatMessage[],
): MessageCreateParams['messages'] {
  return history.map((msg) => ({
    role: msg.role,
    content: msg.content.map(handleContent),
  }));
}

/**
 * SendMessage function using functional techniques for better modularity.
 * Utilizes enzyme-like functions to create and handle each part of the API interaction.
 * @param userInput - User input message.
 * @param imageBase64 - Optional image input in Base64 format.
 */
export async function sendMessageFunctional(
  userInput: string,
  imageBase64?: string,
) {
  const newUserMessage: ChatMessage = {
    role: 'user',
    content: [
      userInput,
      ...(imageBase64 ? [createImageBlock(imageBase64)] : []),
    ],
    timestamp: new Date(),
  };

  // Using higher-order function to immutably update message history
  messageHistory = addMessage(messageHistory, newUserMessage);

  const messageParams: MessageCreateParams = {
    model: config.model,
    max_tokens: config.maxTokens,
    temperature: config.temperature,
    messages: formatMessageHistory(messageHistory),
  };

  try {
    const response = await client.messages.create(messageParams);
    const assistantMessage: ChatMessage = {
      role: 'assistant',
      content: response.content.map(handleContent),
      timestamp: new Date(),
    };

    // Again update message history immutably
    messageHistory = addMessage(messageHistory, assistantMessage);
  } catch (error) {
    console.error('Error in message processing:', error);
    throw error;
  }
}

// Type definitions used in the toolbox
/**
 * Represents a chat message with metadata.
 */
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: (string | ImageBlockContent)[];
  timestamp?: Date;
  metadata?: Record<string, string>;
}

/**
 * Type guard for checking if content is TextContent.
 */
export function isTextContent(content: any): content is TextContent {
  return 'text' in content;
}

/**
 * Creates an image block content for use in messages.
 * @param base64Image - The base64 string of the image.
 * @param mimeType - The MIME type of the image (default is 'image/jpeg').
 */
export function createImageBlock(
  base64Image: string,
  mimeType: string = 'image/jpeg',
): ImageBlockContent {
  return {
    type: 'image',
    source: {
      type: 'base64',
      media_type: mimeType,
      data: base64Image,
    },
  };
}

// Placeholder variables for demonstration purposes
let messageHistory: ChatMessage[] = [];
const client: any = {
  messages: {
    create: async (params: any) => ({ content: [{ text: 'Sample response' }] }),
  },
}; // Mocked client for demonstration
const config: any = { model: 'claude-3', maxTokens: 1024, temperature: 0.7 }; // Mocked configuration for demonstration purposes
