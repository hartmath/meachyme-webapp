import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageComposer from './MessageComposer';

interface ChatContainerProps {
  selectedContact: any;
  messages: any[];
  onSendMessage: (message: string, attachmentUrl?: string, type?: 'text' | 'voice') => void;
  currentUserId: string;
  isDarkTheme: boolean;
  onBack?: () => void;
  onReply?: (message: any) => void;
  onForward?: (message: any) => void;
  messageSearchTerm?: string;
  onMessageSearchChange?: (term: string) => void;
  showMessageSearch?: boolean;
  onToggleMessageSearch?: () => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  selectedContact,
  messages,
  onSendMessage,
  currentUserId,
  isDarkTheme,
  onBack,
  onReply,
  onForward,
  messageSearchTerm,
  onMessageSearchChange,
  showMessageSearch,
  onToggleMessageSearch
}) => {
  if (!selectedContact) {
    return (
      <div className={`flex-1 flex items-center justify-center ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}>
        <div className={`text-center ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-xl font-semibold mb-2">Select a contact to start chatting</h3>
          <p className="text-sm">Choose from your contacts list to begin a conversation</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}>
      <ChatHeader 
        recipient={selectedContact} 
        onBack={onBack} 
        isDarkTheme={isDarkTheme}
        onToggleMessageSearch={onToggleMessageSearch}
        showMessageSearch={showMessageSearch}
        messageSearchTerm={messageSearchTerm}
        onMessageSearchChange={onMessageSearchChange}
      />
      <MessageList 
        messages={messages} 
        currentUserId={currentUserId} 
        isDarkTheme={isDarkTheme}
        onReply={onReply}
        onForward={onForward}
      />
      <MessageComposer onSendMessage={onSendMessage} isDarkTheme={isDarkTheme} />
    </div>
  );
};

export default ChatContainer;
