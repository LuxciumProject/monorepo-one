// @ServerActions/anthropic/actions.ts

'use server';

export async function sendMessage(message: string) {
  console.log('Sending message to Anthropic:', message);
  return {
    response: 'Placeholder response from Anthropic',
    messageId: Date.now().toString(),
  };
}

export async function streamMessage(message: string) {
  console.log('Streaming message to Anthropic:', message);
  // Placeholder for streaming implementation
  return new Response('Placeholder streaming response');
}
