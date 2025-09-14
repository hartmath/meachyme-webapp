
import React, { memo } from "react";
import { DirectMessage } from "@/types/chat";

interface MessageItemProps {
  message: DirectMessage;
  currentUserId: string | undefined;
  formatTime: (timestamp: string) => string;
}

const MessageItem = memo(({ message, currentUserId, formatTime }: MessageItemProps) => {
  const isSender = message.sender_id === currentUserId;
  
  return (
    <div 
      className={`flex ${
        isSender ? 'justify-end' : 'justify-start'
      } mb-4`}
    >
      <div 
        className={`max-w-[80%] ${
          isSender ? 'bg-primary text-primary-foreground' : 'bg-muted'
        } rounded-lg p-3`}
      >
        <p className="break-words">{message.content}</p>
        {message.attachment_url && (
          <a 
            href={message.attachment_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block mt-2 underline text-sm"
          >
            View attachment
          </a>
        )}
        <div className="text-xs mt-1 opacity-70 text-right">
          {formatTime(message.created_at)}
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Only re-render if the message content changes
  return prevProps.message.id === nextProps.message.id && 
         prevProps.message.content === nextProps.message.content;
});

MessageItem.displayName = 'MessageItem';

export default MessageItem;
