import React from "react";
import { User } from "@/types/chat";

interface ConversationButtonProps {
  currentUser: User;
  onSelectContact: (contact: User) => void;
  onShowContactSelection: () => void;
}

const ConversationButton = ({ currentUser, onSelectContact, onShowContactSelection }: ConversationButtonProps) => {
  return (
    <button 
      onClick={onShowContactSelection}
      className="fixed bottom-16 right-4 z-40 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      </svg>
    </button>
  );
};

export default ConversationButton;
