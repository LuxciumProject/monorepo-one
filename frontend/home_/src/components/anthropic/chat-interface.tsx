// @/components/anthropic/chat-interface.tsx

import { Message } from '@/types/Message';
import ChatClient from './chat-client';

type ChatInterfaceProps = {
  initialMessages: Message[];
};

export function ChatInterface({ initialMessages }: ChatInterfaceProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b bg-white p-4">
        <h1 className="text-xl font-semibold">Anthropic Chat</h1>
      </div>

      {/* Client-Side Chat Interaction */}
      <ChatClient initialMessages={initialMessages} />
    </div>
  );
}
