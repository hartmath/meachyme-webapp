import React from "react";
import { User } from "@/types/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, MoreVertical, Phone, Video, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ChatHeaderProps {
  recipient: User;
  onBack: () => void;
  isDarkTheme?: boolean;
  onToggleMessageSearch?: () => void;
  showMessageSearch?: boolean;
  messageSearchTerm?: string;
  onMessageSearchChange?: (term: string) => void;
}

const ChatHeader = ({ 
  recipient, 
  onBack, 
  isDarkTheme = true, 
  onToggleMessageSearch,
  showMessageSearch = false,
  messageSearchTerm = "",
  onMessageSearchChange
}: ChatHeaderProps) => {
  
  // Theme classes - Red and White for light mode, Black and Red for dark mode
  const bgSecondary = isDarkTheme ? "bg-gray-900" : "bg-white";
  const bgTertiary = isDarkTheme ? "bg-gray-800" : "bg-gray-100";
  const borderColor = isDarkTheme ? "border-gray-700" : "border-gray-200";
  const textPrimary = isDarkTheme ? "text-white" : "text-gray-900";
  const textSecondary = isDarkTheme ? "text-gray-400" : "text-gray-500";

  const handleSearch = (query: string) => {
    onMessageSearchChange?.(query);
  };

  return (
    <div className={`${bgSecondary} border-b ${borderColor}`}>
      {showMessageSearch ? (
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className={`p-2 hover:${bgTertiary} rounded-full transition-colors ${textPrimary}`}
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <Input
              placeholder="Search messages..."
              value={messageSearchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className={`${bgTertiary} border-${borderColor} ${textPrimary} placeholder-${textSecondary} focus:border-red-600`}
              autoFocus
            />
            <button
              onClick={onToggleMessageSearch}
              className={`p-2 hover:${bgTertiary} rounded-full transition-colors ${textSecondary}`}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      ) : (
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack} 
              className={`p-2 hover:${bgTertiary} rounded-full transition-colors ${textPrimary}`}
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={recipient.avatar_url} />
                <AvatarFallback className="bg-red-600 text-white font-semibold">
                  {recipient.name?.charAt(0) || recipient.email?.charAt(0) || '?'}
                </AvatarFallback>
              </Avatar>
              {recipient.is_online && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-black rounded-full"></div>
              )}
            </div>
            
            <div className="flex-1">
              <h2 className={`font-semibold text-lg ${textPrimary}`}>
                {recipient.name || recipient.email}
              </h2>
              <p className={`${textSecondary} text-sm`}>
                {recipient.is_online ? 'online' : 'last seen recently'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={onToggleMessageSearch}
              className={`p-2 hover:${bgTertiary} rounded-full transition-colors`}
            >
              <Search className={`h-6 w-6 ${textSecondary}`} />
            </button>
            <button 
              onClick={() => {
                // In a real app, this would initiate a video call
                const callId = Math.random().toString(36).substr(2, 9);
                toast.success(`Starting video call with ${recipient.name}...`);
                // Simulate call initiation
                setTimeout(() => {
                  toast.info('Video call feature will be available soon!');
                }, 2000);
              }}
              className={`p-2 hover:${bgTertiary} rounded-full transition-colors`}
            >
              <Video className={`h-6 w-6 ${textSecondary}`} />
            </button>
            <button 
              onClick={() => {
                // In a real app, this would initiate a voice call
                const callId = Math.random().toString(36).substr(2, 9);
                toast.success(`Starting voice call with ${recipient.name}...`);
                // Simulate call initiation
                setTimeout(() => {
                  toast.info('Voice call feature will be available soon!');
                }, 2000);
              }}
              className={`p-2 hover:${bgTertiary} rounded-full transition-colors`}
            >
              <Phone className={`h-6 w-6 ${textSecondary}`} />
            </button>
            <button className={`p-2 hover:${bgTertiary} rounded-full transition-colors`}>
              <MoreVertical className={`h-6 w-6 ${textSecondary}`} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
