import React, { useState, useEffect } from 'react';
import { Phone, Video, PhoneCall, PhoneMissed, PhoneIncoming } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface CallsPageProps {
  isDarkTheme?: boolean;
}

interface Call {
  id: string;
  caller_id: string;
  recipient_id: string;
  call_type: 'voice' | 'video';
  call_status: 'missed' | 'completed' | 'declined';
  duration?: number;
  created_at: string;
  caller: {
    full_name: string;
    avatar_url?: string;
  };
}

const CallsPage = ({ isDarkTheme = true }: CallsPageProps) => {
  const { authUser } = useAuth();
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);
  
  const bgPrimary = isDarkTheme ? "bg-gray-900" : "bg-gray-50";
  const bgSecondary = isDarkTheme ? "bg-gray-800" : "bg-white";
  const textPrimary = isDarkTheme ? "text-white" : "text-gray-900";
  const textSecondary = isDarkTheme ? "text-gray-300" : "text-gray-600";
  const borderColor = isDarkTheme ? "border-gray-700" : "border-gray-200";


  useEffect(() => {
    fetchCalls();
  }, []);

  const fetchCalls = async () => {
    try {
      setLoading(true);
      
      // For now, we'll create sample calls since we don't have a calls table yet
      // In a real implementation, you'd fetch from a calls table
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('user_id', authUser?.id)
        .limit(4);

      if (error) {
        console.error('Error fetching profiles for calls:', error);
        toast.error('Failed to load calls');
        return;
      }

      // Create sample call history using profile data
      const sampleCalls = profiles?.map((profile, index) => ({
        id: `call-${profile.id}`,
        caller_id: profile.id,
        recipient_id: authUser?.id || '',
        call_type: (['voice', 'video', 'voice', 'video'] as const)[index] || 'voice',
        call_status: (['missed', 'completed', 'completed', 'completed'] as const)[index] || 'completed',
        duration: [0, 120, 45, 300][index] || 0, // in seconds
        created_at: new Date(Date.now() - (index + 1) * 60 * 60 * 1000).toISOString(), // 1 hour, 2 hours, etc. ago
        caller: {
          full_name: profile.full_name || profile.username || 'Unknown User',
          avatar_url: profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.id}`
        }
      })) || [];

      setCalls(sampleCalls);
    } catch (error) {
      console.error('Error fetching calls:', error);
      toast.error('Failed to load calls');
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  const formatDuration = (seconds: number) => {
    if (seconds === 0) return '';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
              <span className={`ml-3 ${textSecondary}`}>Loading calls...</span>
            </div>
          ) : calls.length === 0 ? (
            <div className="text-center py-8">
              <p className={`${textSecondary}`}>No call history available yet.</p>
            </div>
          ) : (
            calls.map((call) => (
              <div key={call.id} className={`${bgSecondary} rounded-lg p-4 shadow-sm`}>
                <div className="flex items-center space-x-3">
                  <img
                    src={call.caller.avatar_url}
                    alt={call.caller.full_name}
                    className="w-12 h-12 rounded-full"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`${textPrimary} font-semibold truncate`}>{call.caller.full_name}</h3>
                      <div className="flex items-center space-x-2">
                        {getCallIcon(call.call_status, call.call_type)}
                        <span className={`text-sm ${getCallTypeColor(call.call_status)}`}>
                          {formatTimeAgo(call.created_at)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <p className={`${textSecondary} text-sm`}>
                        {call.call_type === 'video' ? 'Video call' : 'Voice call'}
                        {call.duration && call.duration > 0 && ` • ${formatDuration(call.duration)}`}
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CallsPage;

