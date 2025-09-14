import React from 'react';
import { MessageCircle, Rss, Calendar, Phone, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isDarkTheme?: boolean;
}

const BottomNavigation = ({ activeTab, onTabChange, isDarkTheme = true }: BottomNavigationProps) => {
  const tabs = [
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'feeds', label: 'Feeds', icon: Rss },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'calls', label: 'Calls', icon: Phone },
    { id: 'profiles', label: 'Profiles', icon: User },
  ];

  // Theme classes
  const bgSecondary = isDarkTheme ? "bg-gray-900" : "bg-white";
  const borderColor = isDarkTheme ? "border-gray-700" : "border-gray-200";
  const textPrimary = isDarkTheme ? "text-white" : "text-gray-900";
  const textSecondary = isDarkTheme ? "text-gray-400" : "text-gray-500";
  const activeColor = "text-red-600";

  return (
    <div className={`fixed bottom-0 left-0 right-0 ${bgSecondary} border-t ${borderColor} z-50`}>
      <div className="flex items-center justify-around py-2 h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg mx-1 ${
                isActive ? activeColor : textSecondary
              }`}
            >
              <Icon className={`h-6 w-6 mb-1 ${isActive ? 'text-red-600' : textSecondary}`} />
              <span className={`text-xs font-medium truncate ${isActive ? 'text-red-600' : textSecondary}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
