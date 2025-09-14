import React from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

interface EventsPageProps {
  isDarkTheme?: boolean;
}

const EventsPage = ({ isDarkTheme = true }: EventsPageProps) => {
  const bgPrimary = isDarkTheme ? "bg-gray-900" : "bg-gray-50";
  const bgSecondary = isDarkTheme ? "bg-gray-800" : "bg-white";
  const textPrimary = isDarkTheme ? "text-white" : "text-gray-900";
  const textSecondary = isDarkTheme ? "text-gray-300" : "text-gray-600";
  const borderColor = isDarkTheme ? "border-gray-700" : "border-gray-200";


  const sampleEvents = [
    {
      id: 1,
      title: "Corporate Gala 2024",
      date: "2024-01-15",
      time: "6:00 PM",
      location: "Grand Ballroom, Downtown Convention Center",
      attendees: 500,
      capacity: 600,
      price: "$150",
      organizer: "Premier Events LA",
      category: "Corporate",
      type: "upcoming",
      description: "Join us for an evening of networking, fine dining, and celebration. Black tie optional.",
      image: "https://picsum.photos/400/200?random=event1"
    },
    {
      id: 2,
      title: "Wedding Expo 2024",
      date: "2024-01-20",
      time: "10:00 AM",
      location: "Exhibition Hall, Innovation Hub",
      attendees: 1200,
      capacity: 1500,
      price: "$25",
      organizer: "Dream Weddings Inc",
      category: "Wedding",
      type: "upcoming",
      description: "Discover the latest trends in wedding planning, meet vendors, and get inspired for your special day.",
      image: "https://picsum.photos/400/200?random=event2"
    },
    {
      id: 3,
      title: "Music Festival Afterparty",
      date: "2024-01-10",
      time: "9:00 PM",
      location: "Rooftop Lounge, Downtown",
      attendees: 200,
      capacity: 250,
      price: "$45",
      organizer: "SoundWave Events",
      category: "Music",
      type: "past",
      description: "Continue the festival vibes with live DJs, craft cocktails, and amazing city views.",
      image: "https://picsum.photos/400/200?random=event3"
    }
  ];

  return (
    <div className={`h-full ${bgPrimary} overflow-y-auto pb-20`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className={`text-2xl font-bold ${textPrimary}`}>Events</h1>
          <div className="flex items-center space-x-2">
            <button className={`p-2 ${textSecondary} hover:${textPrimary} rounded-full transition-colors`}>
              <Calendar className="h-6 w-6" />
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
              Create Event
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {sampleEvents.map((event) => (
            <div key={event.id} className={`${bgSecondary} rounded-lg overflow-hidden shadow-sm`}>
              {/* Event Image */}
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className={`${textPrimary} font-semibold text-lg mb-1`}>{event.title}</h3>
                    <p className={`${textSecondary} text-sm`}>by {event.organizer}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    event.type === 'upcoming' 
                      ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {event.category}
                  </span>
                </div>

                <p className={`${textPrimary} text-sm mb-3`}>{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className={`h-4 w-4 ${textSecondary}`} />
                    <span className={`${textSecondary} text-sm`}>{event.date} at {event.time}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MapPin className={`h-4 w-4 ${textSecondary}`} />
                    <span className={`${textSecondary} text-sm`}>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Users className={`h-4 w-4 ${textSecondary}`} />
                    <span className={`${textSecondary} text-sm`}>{event.attendees}/{event.capacity} attendees</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`${textPrimary} font-bold text-lg`}>{event.price}</span>
                    <span className={`${textSecondary} text-sm`}>per ticket</span>
                  </div>
                  
                  {event.type === 'upcoming' && (
                    <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                      Buy Tickets
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
