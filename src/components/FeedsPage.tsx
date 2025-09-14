import React from 'react';
import { Rss, Heart, MessageCircle, Share } from 'lucide-react';

interface FeedsPageProps {
  isDarkTheme?: boolean;
}

const FeedsPage = ({ isDarkTheme = true }: FeedsPageProps) => {
  const bgPrimary = isDarkTheme ? "bg-gray-900" : "bg-gray-50";
  const bgSecondary = isDarkTheme ? "bg-gray-800" : "bg-white";
  const textPrimary = isDarkTheme ? "text-white" : "text-gray-900";
  const textSecondary = isDarkTheme ? "text-gray-300" : "text-gray-600";
  const borderColor = isDarkTheme ? "border-gray-700" : "border-gray-200";


  const sampleFeeds = [
    {
      id: 1,
      user: "Sarah Johnson",
      position: "Event Coordinator",
      businessType: "Organizer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      time: "2 hours ago",
      content: "Just wrapped up the most incredible corporate gala! 🎉 500+ attendees, live music, and the energy was absolutely electric. Thank you to all the vendors who made this night unforgettable! #CorporateEvents #EventSuccess",
      likes: 47,
      comments: 12,
      shares: 8,
      image: "https://picsum.photos/400/300?random=1",
      eventTags: ["Corporate Events", "Gala", "Live Music"]
    },
    {
      id: 2,
      user: "Mike Rodriguez",
      position: "Venue Manager",
      businessType: "Venue Owner",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      time: "4 hours ago",
      content: "Our new outdoor amphitheater is finally ready! 🎭 Perfect for concerts, weddings, and corporate events. Capacity: 2,000. Book your dates now! #Venue #Amphitheater #Events",
      likes: 23,
      comments: 7,
      shares: 15,
      image: "https://picsum.photos/400/300?random=2",
      eventTags: ["Venue", "Amphitheater", "Outdoor Events"]
    },
    {
      id: 3,
      user: "Emily Chen",
      position: "Catering Director",
      businessType: "Vendor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      time: "6 hours ago",
      content: "Behind the scenes of our latest wedding catering setup! 💍 Custom menu featuring local ingredients and sustainable practices. The couple was thrilled! #WeddingCatering #Sustainable #LocalIngredients",
      likes: 34,
      comments: 9,
      shares: 5,
      image: "https://picsum.photos/400/300?random=3",
      eventTags: ["Wedding", "Catering", "Sustainable"]
    },
    {
      id: 4,
      user: "David Park",
      position: "Event Attendee",
      businessType: "Attendee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      time: "1 day ago",
      content: "Attended the most amazing tech conference yesterday! 🤖 The networking opportunities were incredible and I met so many industry leaders. Can't wait for the next one! #TechConference #Networking #Innovation",
      likes: 18,
      comments: 4,
      shares: 2,
      eventTags: ["Tech Conference", "Networking", "Innovation"]
    }
  ];

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
          {sampleFeeds.map((feed) => (
            <div key={feed.id} className={`${bgSecondary} rounded-lg p-4 shadow-sm`}>
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={feed.avatar}
                  alt={feed.user}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className={`${textPrimary} font-semibold`}>{feed.user}</h3>
                    <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 text-xs rounded-full">
                      {feed.businessType}
                    </span>
                  </div>
                  <p className={`${textSecondary} text-sm`}>{feed.position}</p>
                  <p className={`${textSecondary} text-xs`}>{feed.time}</p>
                </div>
              </div>
              
              <p className={`${textPrimary} mb-3`}>{feed.content}</p>
              
              {feed.image && (
                <img
                  src={feed.image}
                  alt="Feed content"
                  className="w-full rounded-lg mb-3"
                />
              )}

              {/* Event Tags */}
              {feed.eventTags && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {feed.eventTags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                <button className={`flex items-center space-x-2 ${textSecondary} hover:text-red-500 transition-colors`}>
                  <Heart className="h-5 w-5" />
                  <span>{feed.likes}</span>
                </button>
                <button className={`flex items-center space-x-2 ${textSecondary} hover:text-blue-500 transition-colors`}>
                  <MessageCircle className="h-5 w-5" />
                  <span>{feed.comments}</span>
                </button>
                <button className={`flex items-center space-x-2 ${textSecondary} hover:text-green-500 transition-colors`}>
                  <Share className="h-5 w-5" />
                  <span>{feed.shares}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedsPage;
