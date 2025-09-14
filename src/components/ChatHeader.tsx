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
  
  // WhatsApp-like theme classes
  const bgSecondary = isDarkTheme ? "bg-gray-800" : "bg-gray-50";
  const bgTertiary = isDarkTheme ? "bg-gray-700" : "bg-gray-100";
  const borderColor = isDarkTheme ? "border-gray-700" : "border-gray-200";
  const textPrimary = isDarkTheme ? "text-white" : "text-gray-900";
  const textSecondary = isDarkTheme ? "text-gray-400" : "text-gray-500";

  const handleSearch = (query: string) => {
    onMessageSearchChange?.(query);
  };

  return (
    <div className="bg-white shadow-sm z-10">
      {showMessageSearch ? (
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="text-gray-600 p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <Input
              placeholder="Search messages..."
              value={messageSearchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-gray-100 border-0 text-gray-900 placeholder-gray-500 rounded-full"
              autoFocus
            />
            <button
              onClick={onToggleMessageSearch}
              className="text-gray-600 p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center p-4 justify-between">
          <button 
            onClick={onBack} 
            className="text-gray-600 p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center shrink-0">
              <span className="text-white text-sm font-medium">
                {recipient.name?.charAt(0) || recipient.email?.charAt(0) || '?'}
              </span>
            </div>
            <h2 className="text-gray-900 text-lg font-bold leading-tight tracking-[-0.015em]">
              {recipient.name || recipient.email}
            </h2>
          </div>
          <div className="flex w-12 items-center justify-end">
            <button 
              onClick={() => {
                toast.success(`Starting video call with ${recipient.name}...`);
                setTimeout(() => {
                  toast.info('Video call feature will be available soon!');
                }, 2000);
              }}
              className="text-gray-600 p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Video className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
