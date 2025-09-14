import React, { useEffect, useRef, useState } from "react";
import { DirectMessage } from "@/types/chat";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Check, CheckCheck, Play, Pause, Reply, Forward, Smile, MoreVertical } from "lucide-react";

interface MessageListProps {
  messages: DirectMessage[];
  currentUserId: string;
  loading?: boolean;
  isTyping?: boolean;
  typingUser?: string;
  isDarkTheme?: boolean;
  onReply?: (message: DirectMessage) => void;
  onForward?: (message: DirectMessage) => void;
}

const TypingIndicator = ({ isDarkTheme = true }: { isDarkTheme?: boolean }) => {
  const bgSecondary = isDarkTheme ? "bg-gray-700" : "bg-gray-200";
  const textSecondary = isDarkTheme ? "text-gray-300" : "text-gray-600";
  
  return (
    <div className="flex justify-start px-3 py-1">
      <div className={`${bgSecondary} rounded-2xl px-3 py-2 max-w-[65%]`}>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className={`w-2 h-2 ${textSecondary} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
            <div className={`w-2 h-2 ${textSecondary} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
            <div className={`w-2 h-2 ${textSecondary} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VoiceMessage = ({ audioUrl, isDarkTheme = true }: { audioUrl: string; isDarkTheme?: boolean }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current?.duration || 0);
      };
      audioRef.current.ontimeupdate = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      };
      audioRef.current.onended = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };
    }
  }, [audioUrl]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={togglePlay}
        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>
      <div className="flex-1">
        <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-1 mb-1">
          <div 
            className="bg-red-600 h-1 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
    </div>
  );
};

const MessageList = ({ messages, currentUserId, loading = false, isTyping = false, typingUser, isDarkTheme = true, onReply, onForward }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showReactions, setShowReactions] = useState<string | null>(null);
  const [messageReactions, setMessageReactions] = useState<{ [key: string]: string[] }>({});

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addReaction = (messageId: string, emoji: string) => {
    setMessageReactions(prev => ({
      ...prev,
      [messageId]: [...(prev[messageId] || []), emoji]
    }));
    setShowReactions(null);
    // In a real app, you would save this to the database
    console.log(`Added reaction ${emoji} to message ${messageId}`);
  };

  const getMessageStatus = (message: any) => {
    // Simulate message status based on time
    const messageTime = new Date(message.created_at).getTime();
    const now = Date.now();
    const timeDiff = now - messageTime;
    
    if (timeDiff < 10000) return 'sent'; // 10 seconds
    if (timeDiff < 30000) return 'delivered'; // 30 seconds
    return 'read';
  };

  // Sort messages chronologically (oldest first)
  const sortedMessages = [...messages].sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  // Theme classes - WhatsApp mobile style
  const bgPrimary = isDarkTheme ? "bg-gray-900" : "bg-gray-50";
  const bgSecondary = isDarkTheme ? "bg-gray-700" : "bg-white";
  const bgTertiary = isDarkTheme ? "bg-red-600" : "bg-red-600";
  const textSecondary = isDarkTheme ? "text-gray-400" : "text-gray-500";

  return (
    <div className="flex-1 overflow-y-auto pb-4">
      {loading ? (
        <div className="flex justify-center py-4">
          <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-opacity-50 border-t-blue-600 rounded-full"></div>
        </div>
      ) : (
        <>
          {sortedMessages.map((message) => {
            const isCurrentUser = message.sender_id === currentUserId;
            const messageStatus = getMessageStatus(message);
            const isVoiceMessage = message.content.includes('🎤 Voice message');
            const reactions = messageReactions[message.id] || [];
            
            return (
              <div
                key={message.id}
                className={cn(
                  "flex items-end gap-2.5 p-4",
                  isCurrentUser ? "justify-end" : "justify-start"
                )}
              >
                {!isCurrentUser && (
                  <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-medium">
                      {message.sender?.full_name?.charAt(0) || message.sender?.email?.charAt(0) || '?'}
                    </span>
                  </div>
                )}
                
                <div className={cn("flex flex-1 flex-col gap-1", isCurrentUser ? "items-end" : "items-start")}>
                  <div
                    className={cn(
                      "text-base font-normal leading-normal flex max-w-[360px] rounded-2xl px-4 py-3",
                      isCurrentUser
                        ? "bg-blue-600 text-white rounded-br-lg"
                        : "bg-gray-100 text-gray-900 rounded-bl-lg"
                    )}
                  >
                    {isVoiceMessage ? (
                      <VoiceMessage 
                        audioUrl={message.attachment_url || ''} 
                        isDarkTheme={isDarkTheme} 
                      />
                    ) : (
                      <p className="break-words">{message.content}</p>
                    )}
                  </div>
                </div>
                
                {isCurrentUser && (
                  <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-medium">
                      {message.sender?.full_name?.charAt(0) || message.sender?.email?.charAt(0) || '?'}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
          {isTyping && <TypingIndicator isDarkTheme={isDarkTheme} />}
        </>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
