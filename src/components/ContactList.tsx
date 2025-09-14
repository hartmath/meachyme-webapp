import React from "react";
import { User } from "@/types/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ContactListProps {
  onSelectContact: (contact: User) => void;
  selectedContactId?: string;
  unreadCounts: Record<string, number>;
  contacts?: User[];
  isDarkTheme?: boolean;
}

const ContactList = ({ onSelectContact, selectedContactId, unreadCounts, contacts = [], isDarkTheme = true }: ContactListProps) => {
  // Theme classes - Red and White for light mode, Black and Red for dark mode
  const bgSecondary = isDarkTheme ? "bg-black" : "bg-white";
  const bgTertiary = isDarkTheme ? "bg-red-900" : "bg-red-100";
  const bgQuaternary = isDarkTheme ? "bg-red-800" : "bg-red-200";
  const textPrimary = isDarkTheme ? "text-white" : "text-gray-900";
  const textSecondary = isDarkTheme ? "text-red-300" : "text-red-600";

  if (contacts.length === 0) {
    return (
      <div className={`flex items-center justify-center h-full ${bgSecondary} ${textSecondary}`}>
        <div className="text-center">
          <div className={`w-16 h-16 ${bgQuaternary} rounded-full flex items-center justify-center mx-auto mb-3`}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
          </div>
          <p className="text-sm">No conversations yet</p>
          <p className="text-xs mt-1">Start a new chat to begin messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full ${bgSecondary} overflow-y-auto`}>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            className={`flex items-center space-x-4 px-4 py-3 cursor-pointer transition-colors ${
              selectedContactId === contact.id
                ? bgQuaternary
                : `hover:${bgTertiary}`
            }`}
          >
            <div className="relative flex-shrink-0">
              <Avatar className="w-12 h-12">
                <AvatarImage src={contact.avatar_url} />
                <AvatarFallback className="bg-red-600 text-white text-lg font-semibold">
                  {contact.name?.charAt(0) || contact.email?.charAt(0) || '?'}
                </AvatarFallback>
              </Avatar>
              {contact.is_online && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-black rounded-full"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className={`${textPrimary} font-medium text-base truncate`}>
                  {contact.name || contact.email}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className={`${textSecondary} text-xs`}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {unreadCounts[contact.id] > 0 && (
                    <div className="bg-red-600 text-white text-xs font-semibold rounded-full px-2 py-1 min-w-[20px] text-center">
                      {unreadCounts[contact.id]}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <p className={`${textSecondary} text-sm truncate`}>
                  {contact.is_online ? 'online' : 'last seen recently'}
                </p>
                <div className="flex items-center space-x-1">
                  {/* Message status indicators */}
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
