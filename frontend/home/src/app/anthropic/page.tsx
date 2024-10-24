// @App/anthropic/page.tsx

import { sendMessage } from '@ServerActions/anthropic/actions/sendMessage';

export default async function AnthropicPage() {
  async function handleSubmit(formData: FormData) {
    'use server';
    const message = formData.get('message');
    if (typeof message !== 'string') return;
    await sendMessage(message);
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="border-b p-4">
        <h1 className="text-xl font-semibold">Anthropic Chat</h1>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-4">
          {/* Messages will be displayed here */}
          <div className="rounded-lg bg-gray-100 p-3">
            <p>System: Ready to chat!</p>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <form action={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            name="message"
            placeholder="Type your message..."
            className="flex-1 rounded-md border p-2"
          />
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
