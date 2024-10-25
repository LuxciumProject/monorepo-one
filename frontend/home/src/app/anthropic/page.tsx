// @App/anthropic/page.tsx

import { ChatInterface } from '@/components/anthropic/chat-interface';
import { Message } from '@/types/Message';

export default function AnthropicPage() {
  const initialMessages: Message[] = [
    { id: '1', role: 'system', content: 'Ready to chat!' },
  ];

  return (
    <div className="h-screen">
      <ChatInterface initialMessages={initialMessages} />
    </div>
  );
}
