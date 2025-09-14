import React, { useState, useEffect } from 'react';
import { Rss, Heart, MessageCircle, Share } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface FeedsPageProps {
  isDarkTheme?: boolean;
}

interface FeedPost {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  tags: string[];
  user: {
    full_name: string;
    avatar_url: string;
    user_type: string;
    business_name?: string;
  };
}

const FeedsPage = ({ isDarkTheme = true }: FeedsPageProps) => {
  const { authUser } = useAuth();
  const [feeds, setFeeds] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  const bgPrimary = isDarkTheme ? "bg-gray-900" : "bg-gray-50";
  const bgSecondary = isDarkTheme ? "bg-gray-800" : "bg-white";
  const textPrimary = isDarkTheme ? "text-white" : "text-gray-900";
  const textSecondary = isDarkTheme ? "text-gray-300" : "text-gray-600";
  const borderColor = isDarkTheme ? "border-gray-700" : "border-gray-200";


  useEffect(() => {
    fetchFeeds();
  }, []);

  const fetchFeeds = async () => {
    try {
      setLoading(true);
      
      // For now, we'll create sample feeds since we don't have a posts/feeds table yet
      // In a real implementation, you'd fetch from a posts or feeds table
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(4);

      if (error) {
        console.error('Error fetching profiles for feeds:', error);
        toast.error('Failed to load feeds');
        return;
      }

      // Create sample feed posts using profile data
      const sampleFeeds = profiles?.map((profile, index) => ({
        id: `feed-${profile.id}`,
        user_id: profile.id,
        content: [
          "Just wrapped up the most incredible corporate gala! 🎉 500+ attendees, live music, and the energy was absolutely electric. Thank you to all the vendors who made this night unforgettable! #CorporateEvents #EventSuccess",
          "Our new outdoor amphitheater is finally ready! 🎭 Perfect for concerts, weddings, and corporate events. Capacity: 2,000. Book your dates now! #Venue #Amphitheater #Events",
          "Behind the scenes of our latest wedding catering setup! 💍 Custom menu featuring local ingredients and sustainable practices. The couple was thrilled! #WeddingCatering #Sustainable #LocalIngredients",
          "Attended the most amazing tech conference yesterday! 🤖 The networking opportunities were incredible and I met so many industry leaders. Can't wait for the next one! #TechConference #Networking #Innovation"
        ][index] || "Great event experience! #Events #Networking",
        image_url: `https://picsum.photos/400/300?random=${index + 1}`,
        created_at: new Date(Date.now() - (index + 1) * 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago, 4 hours ago, etc.
        likes_count: [47, 23, 34, 18][index] || 10,
        comments_count: [12, 7, 9, 4][index] || 5,
        shares_count: [8, 15, 5, 2][index] || 3,
        tags: [
          ["Corporate Events", "Gala", "Live Music"],
          ["Venue", "Amphitheater", "Outdoor Events"],
          ["Wedding", "Catering", "Sustainable"],
          ["Tech Conference", "Networking", "Innovation"]
        ][index] || ["Events"],
        user: {
          full_name: profile.full_name || profile.username || 'Unknown User',
          avatar_url: profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.id}`,
          user_type: profile.user_type || 'attendee',
          business_name: profile.business_name
        }
      })) || [];

      setFeeds(sampleFeeds);
    } catch (error) {
      console.error('Error fetching feeds:', error);
      toast.error('Failed to load feeds');
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  return (
    <div className={`h-full ${bgPrimary} overflow-y-auto pb-20`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className={`text-2xl font-bold ${textPrimary}`}>Event Feed</h1>
          <div className="flex items-center space-x-2">
            <button className={`p-2 ${textSecondary} hover:${textPrimary} rounded-full transition-colors`}>
              <Rss className="h-6 w-6" />
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
              Post Update
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
              <span className={`ml-3 ${textSecondary}`}>Loading feeds...</span>
            </div>
          ) : feeds.length === 0 ? (
            <div className="text-center py-8">
              <p className={`${textSecondary}`}>No feeds available yet.</p>
            </div>
          ) : (
            feeds.map((feed) => (
              <div key={feed.id} className={`${bgSecondary} rounded-lg p-4 shadow-sm`}>
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={feed.user.avatar_url}
                    alt={feed.user.full_name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className={`${textPrimary} font-semibold`}>{feed.user.full_name}</h3>
                      <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 text-xs rounded-full">
                        {feed.user.user_type}
                      </span>
                    </div>
                    {feed.user.business_name && (
                      <p className={`${textSecondary} text-sm`}>{feed.user.business_name}</p>
                    )}
                    <p className={`${textSecondary} text-xs`}>{formatTimeAgo(feed.created_at)}</p>
                  </div>
                </div>
                
                <p className={`${textPrimary} mb-3`}>{feed.content}</p>
                
                {feed.image_url && (
                  <img
                    src={feed.image_url}
                    alt="Feed content"
                    className="w-full rounded-lg mb-3"
                  />
                )}

                {/* Event Tags */}
                {feed.tags && feed.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {feed.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <button className={`flex items-center space-x-2 ${textSecondary} hover:text-red-500 transition-colors`}>
                    <Heart className="h-5 w-5" />
                    <span>{feed.likes_count}</span>
                  </button>
                  <button className={`flex items-center space-x-2 ${textSecondary} hover:text-blue-500 transition-colors`}>
                    <MessageCircle className="h-5 w-5" />
                    <span>{feed.comments_count}</span>
                  </button>
                  <button className={`flex items-center space-x-2 ${textSecondary} hover:text-green-500 transition-colors`}>
                    <Share className="h-5 w-5" />
                    <span>{feed.shares_count}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedsPage;
