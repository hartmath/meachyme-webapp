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
    <div className="flex justify-start px-4 py-2">
      <div className={`${bgSecondary} rounded-2xl px-4 py-3 max-w-[65%]`}>
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
    <div className={`flex-1 overflow-y-auto ${bgPrimary} min-h-0`}>
      <div className="space-y-1">
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin h-6 w-6 border-2 border-red-600 border-opacity-50 border-t-red-600 rounded-full"></div>
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
                    "flex px-4 py-1 group",
                  isCurrentUser ? "justify-end" : "justify-start"
                )}
              >
                  <div className="relative">
                <div
                  className={cn(
                        "max-w-[70%] rounded-2xl px-4 py-2 relative",
                    isCurrentUser
                          ? `${bgTertiary} text-white`
                          : `${bgSecondary} text-gray-900 shadow-sm`
                      )}
                    >
                      {isVoiceMessage ? (
                        <VoiceMessage 
                          audioUrl={message.attachment_url || ''} 
                          isDarkTheme={isDarkTheme} 
                        />
                      ) : (
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      )}
                      
                      <div className={cn(
                        "flex items-center justify-end gap-1 mt-1",
                        isCurrentUser ? "text-white/70" : textSecondary
                      )}>
                        <span className="text-xs">
                    {format(new Date(message.created_at), "h:mm a")}
                        </span>
                        {isCurrentUser && (
                          <div className="flex items-center ml-1">
                            {messageStatus === 'read' ? (
                              <CheckCheck className="h-3 w-3 text-blue-400" />
                            ) : messageStatus === 'delivered' ? (
                              <CheckCheck className="h-3 w-3 text-white/70" />
                            ) : (
                              <Check className="h-3 w-3" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Message Actions */}
                    <div className={cn(
                      "absolute top-0 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity",
                      isCurrentUser ? "-left-16" : "-right-16"
                    )}>
                      <button
                        onClick={() => onReply?.(message)}
                        className="p-1 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition-colors"
                        title="Reply"
                      >
                        <Reply className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => onForward?.(message)}
                        className="p-1 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition-colors"
                        title="Forward"
                      >
                        <Forward className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => setShowReactions(showReactions === message.id ? null : message.id)}
                        className="p-1 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition-colors"
                        title="React"
                      >
                        <Smile className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Reactions */}
                    {reactions.length > 0 && (
                      <div className={cn(
                        "flex flex-wrap gap-1 mt-1",
                        isCurrentUser ? "justify-end" : "justify-start"
                      )}>
                        {reactions.map((reaction, index) => (
                          <span key={index} className="text-lg">{reaction}</span>
                        ))}
                      </div>
                    )}

                    {/* Reaction Picker */}
                    {showReactions === message.id && (
                      <div className={cn(
                        "absolute z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 flex space-x-1",
                        isCurrentUser ? "bottom-full right-0 mb-2" : "bottom-full left-0 mb-2"
                      )}>
                        {['👍', '❤️', '😂', '😮', '😢', '😡'].map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => addReaction(message.id, emoji)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
              </div>
            );
            })}
            {isTyping && <TypingIndicator isDarkTheme={isDarkTheme} />}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;
