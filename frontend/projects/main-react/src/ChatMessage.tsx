// ChatMessage.tsx

import styles from './ChatMessage.module.css';

interface ChatMessageProps {
  message: string;
}

const ChatMessage = (props: ChatMessageProps) => {
  return (
    <div className={styles.message}>
      <div className={styles.content}>{props.message}</div>
    </div>
  );
};

export default ChatMessage;
