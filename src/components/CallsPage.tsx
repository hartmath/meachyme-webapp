import React from 'react';
import { Phone, Video, PhoneCall, PhoneMissed, PhoneIncoming } from 'lucide-react';

interface CallsPageProps {
  isDarkTheme?: boolean;
}

const CallsPage = ({ isDarkTheme = true }: CallsPageProps) => {
  const bgPrimary = isDarkTheme ? "bg-gray-900" : "bg-gray-50";
  const bgSecondary = isDarkTheme ? "bg-gray-800" : "bg-white";
  const textPrimary = isDarkTheme ? "text-white" : "text-gray-900";
  const textSecondary = isDarkTheme ? "text-gray-300" : "text-gray-600";
  const borderColor = isDarkTheme ? "border-gray-700" : "border-gray-200";


  const sampleCalls = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      time: "2 minutes ago",
      type: "missed",
      callType: "voice"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      time: "1 hour ago",
      type: "outgoing",
      callType: "video"
    },
    {
      id: 3,
      name: "Mike Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      time: "Yesterday",
      type: "incoming",
      callType: "voice"
    },
    {
      id: 4,
      name: "Emily Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      time: "2 days ago",
      type: "outgoing",
      callType: "video"
    }
  ];

  const getCallIcon = (type: string, callType: string) => {
    if (type === 'missed') return <PhoneMissed className="h-5 w-5 text-red-500" />;
    if (callType === 'video') return <Video className="h-5 w-5" />;
    return <Phone className="h-5 w-5" />;
  };

  const getCallTypeColor = (type: string) => {
    switch (type) {
      case 'missed': return 'text-red-500';
      case 'incoming': return 'text-green-500';
      case 'outgoing': return 'text-blue-500';
      default: return textSecondary;
    }
  };

  return (
    <div className={`h-full ${bgPrimary} overflow-y-auto pb-20`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className={`text-2xl font-bold ${textPrimary}`}>Calls</h1>
          <div className="flex items-center space-x-2">
            <button className={`p-2 ${textSecondary} hover:${textPrimary} rounded-full transition-colors`}>
              <Phone className="h-6 w-6" />
            </button>
            <button className={`p-2 ${textSecondary} hover:${textPrimary} rounded-full transition-colors`}>
              <Video className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="space-y-1">
          {sampleCalls.map((call) => (
            <div key={call.id} className={`${bgSecondary} rounded-lg p-4 shadow-sm`}>
              <div className="flex items-center space-x-3">
                <img
                  src={call.avatar}
                  alt={call.name}
                  className="w-12 h-12 rounded-full"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`${textPrimary} font-semibold truncate`}>{call.name}</h3>
                    <div className="flex items-center space-x-2">
                      {getCallIcon(call.type, call.callType)}
                      <span className={`text-sm ${getCallTypeColor(call.type)}`}>
                        {call.time}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1">
                    <p className={`${textSecondary} text-sm`}>
                      {call.callType === 'video' ? 'Video call' : 'Voice call'}
                    </p>
                    <div className="flex items-center space-x-2">
                      <button className={`p-2 ${textSecondary} hover:${textPrimary} rounded-full transition-colors`}>
                        <Phone className="h-4 w-4" />
                      </button>
                      <button className={`p-2 ${textSecondary} hover:${textPrimary} rounded-full transition-colors`}>
                        <Video className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CallsPage;

