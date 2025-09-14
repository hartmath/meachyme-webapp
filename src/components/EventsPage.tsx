import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface EventsPageProps {
  isDarkTheme?: boolean;
}

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  event_time: string;
  location: string;
  max_attendees: number;
  current_attendees: number;
  ticket_price: number;
  organizer_id: string;
  category: string;
  image_url?: string;
  created_at: string;
  organizer: {
    full_name: string;
    business_name?: string;
    avatar_url?: string;
  };
}

const EventsPage = ({ isDarkTheme = true }: EventsPageProps) => {
  const { authUser } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  
  const bgPrimary = isDarkTheme ? "bg-gray-900" : "bg-gray-50";
  const bgSecondary = isDarkTheme ? "bg-gray-800" : "bg-white";
  const textPrimary = isDarkTheme ? "text-white" : "text-gray-900";
  const textSecondary = isDarkTheme ? "text-gray-300" : "text-gray-600";
  const borderColor = isDarkTheme ? "border-gray-700" : "border-gray-200";


  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      
      // Fetch events from database
      const { data: eventsData, error } = await supabase
        .from('events')
        .select(`
          *,
          organizer:profiles!events_organizer_id_fkey(
            full_name,
            business_name,
            avatar_url
          )
        `)
        .order('event_date', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
        toast.error('Failed to load events');
        return;
      }

      // If no events in database, create sample events using profiles
      if (!eventsData || eventsData.length === 0) {
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_type', 'organizer')
          .limit(3);

        if (profilesError) {
          console.error('Error fetching profiles for sample events:', profilesError);
          return;
        }

        const sampleEvents = profiles?.map((profile, index) => ({
          id: `event-${profile.id}`,
          title: [
            "Corporate Gala 2024",
            "Wedding Expo 2024", 
            "Music Festival Afterparty"
          ][index] || "Sample Event",
          description: [
            "Join us for an evening of networking, fine dining, and celebration. Black tie optional.",
            "Discover the latest trends in wedding planning, meet vendors, and get inspired for your special day.",
            "Continue the festival vibes with live DJs, craft cocktails, and amazing city views."
          ][index] || "Join us for an amazing event experience!",
          event_date: new Date(Date.now() + (index + 1) * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 week, 2 weeks, 3 weeks from now
          event_time: ["18:00", "10:00", "21:00"][index] || "19:00",
          location: [
            "Grand Ballroom, Downtown Convention Center",
            "Exhibition Hall, Innovation Hub",
            "Rooftop Lounge, Downtown"
          ][index] || "Event Venue",
          max_attendees: [600, 1500, 250][index] || 100,
          current_attendees: [500, 1200, 200][index] || 50,
          ticket_price: [150, 25, 45][index] || 50,
          organizer_id: profile.id,
          category: ["Corporate", "Wedding", "Music"][index] || "General",
          image_url: `https://picsum.photos/400/200?random=event${index + 1}`,
          created_at: new Date().toISOString(),
          organizer: {
            full_name: profile.full_name || profile.username || 'Event Organizer',
            business_name: profile.business_name,
            avatar_url: profile.avatar_url
          }
        })) || [];

        setEvents(sampleEvents);
      } else {
        setEvents(eventsData);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return `$${price}`;
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const isEventUpcoming = (eventDate: string) => {
    return new Date(eventDate) >= new Date();
  };

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
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
              <span className={`ml-3 ${textSecondary}`}>Loading events...</span>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-8">
              <p className={`${textSecondary}`}>No events available yet.</p>
            </div>
          ) : (
            events.map((event) => (
              <div key={event.id} className={`${bgSecondary} rounded-lg overflow-hidden shadow-sm`}>
                {/* Event Image */}
                <img
                  src={event.image_url || `https://picsum.photos/400/200?random=${event.id}`}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className={`${textPrimary} font-semibold text-lg mb-1`}>{event.title}</h3>
                      <p className={`${textSecondary} text-sm`}>
                        by {event.organizer.business_name || event.organizer.full_name}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isEventUpcoming(event.event_date)
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
                      <span className={`${textSecondary} text-sm`}>
                        {new Date(event.event_date).toLocaleDateString()} at {formatTime(event.event_time)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <MapPin className={`h-4 w-4 ${textSecondary}`} />
                      <span className={`${textSecondary} text-sm`}>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Users className={`h-4 w-4 ${textSecondary}`} />
                      <span className={`${textSecondary} text-sm`}>
                        {event.current_attendees}/{event.max_attendees} attendees
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`${textPrimary} font-bold text-lg`}>
                        {formatPrice(event.ticket_price)}
                      </span>
                      <span className={`${textSecondary} text-sm`}>per ticket</span>
                    </div>
                    
                    {isEventUpcoming(event.event_date) && (
                      <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                        Buy Tickets
                      </button>
                    )}
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

export default EventsPage;
