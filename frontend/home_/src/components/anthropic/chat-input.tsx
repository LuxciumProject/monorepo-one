// @/components/anthropic/chat-input.tsx
'use client';

import { useState } from 'react';

type ChatInputProps = {
  onSendMessage: (messageContent: string) => void;
  disabled?: boolean;
};

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    onSendMessage(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="border-t p-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-md border p-2"
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={disabled || inputValue.trim() === ''}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400"
        >
          Send
        </button>
      </div>
    </form>
  );
}
