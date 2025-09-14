import React, { useState, useEffect } from "react";
import { User } from "@/types/chat";
import ContactList from "./ContactList";
import ChatContainer from "./ChatContainer";
import ConversationButton from "./ConversationButton";
import BottomNavigation from "./BottomNavigation";
import FeedsPage from "./FeedsPage";
import EventsPage from "./EventsPage";
import CallsPage from "./CallsPage";
import ProfilesPage from "./ProfilesPage";
import ContactSelectionPage from "./ContactSelectionPage";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Search, X, Sun, Moon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MessagingSystemProps {
  className?: string;
  showHeader?: boolean;
  headerTitle?: string;
  onContactSelect?: (contact: User) => void;
}

const MessagingSystem = ({
  className = "",
  showHeader = true,
  headerTitle = "Messages",
  onContactSelect
}: MessagingSystemProps) => {
  const [contacts, setContacts] = useState<User[]>([]);
  const [selectedContact, setSelectedContact] = useState<User | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(true);
  const [unreadCounts, setUnreadCounts] = useState<{ [key: string]: number }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [messageSearchTerm, setMessageSearchTerm] = useState("");
  const [showMessageSearch, setShowMessageSearch] = useState(false);
  const [showContactSelection, setShowContactSelection] = useState(false);
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser?.id) {
      fetchConversationContacts();
      // Set up real-time subscription for new messages
      const subscription = supabase
        .channel('direct_messages')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'direct_messages',
            filter: `recipient_id=eq.${authUser.id}`
          },
          (payload) => {
            const newMessage = payload.new as any;
            setUnreadCounts(prev => ({
              ...prev,
              [newMessage.sender_id]: (prev[newMessage.sender_id] || 0) + 1
            }));
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [authUser?.id]);

  // Fetch messages when selectedContact changes
  useEffect(() => {
    if (selectedContact && authUser?.id) {
      fetchMessages(selectedContact.id);
    } else {
      setMessages([]);
    }
  }, [selectedContact, authUser?.id]);

  const fetchMessages = async (contactId) => {
    setMessagesLoading(true);
    try {
      const { data, error } = await supabase
        .from('direct_messages')
        .select('*')
        .or(`and(sender_id.eq.${authUser.id},recipient_id.eq.${contactId}),and(sender_id.eq.${contactId},recipient_id.eq.${authUser.id})`)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
    } finally {
      setMessagesLoading(false);
    }
  };

  const handleSendMessage = async (content, attachmentUrl, type = 'text') => {
    if (!selectedContact) return;
    try {
      // Insert the message
      const { error } = await supabase.from('direct_messages').insert({
        content,
        sender_id: authUser.id,
        recipient_id: selectedContact.id,
        read: false,
        attachment_url: attachmentUrl
      });
      if (error) throw error;
      // Refresh messages
      fetchMessages(selectedContact.id);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  const handleReply = (message) => {
    // For now, we'll just show a toast. In a real app, you'd implement reply UI
    toast.info(`Replying to: ${message.content.substring(0, 50)}...`);
  };

  const handleForward = (message) => {
    // For now, we'll just show a toast. In a real app, you'd implement forward UI
    toast.info(`Forwarding: ${message.content.substring(0, 50)}...`);
  };

  const filteredMessages = messageSearchTerm 
    ? messages.filter(message =>
        message.content.toLowerCase().includes(messageSearchTerm.toLowerCase())
      )
    : messages;

  const fetchConversationContacts = async () => {
    setLoading(true);
    try {
      // Get all profiles except current user instead of using RPC function
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('user_id', authUser.id)
        .order('full_name');

      if (error) {
        console.error("Error in get_user_conversations:", error);
        throw new Error(`Failed to fetch conversations: ${error.message}`);
      }

      if (!data) {
        console.log("No profiles found");
        setContacts([]);
        setLoading(false);
        return;
      }

      // Get unread message counts for each conversation
      const { data: unreadData, error: unreadError } = await supabase
        .from('direct_messages')
        .select('sender_id')
        .eq('recipient_id', authUser?.id)
        .eq('read', false);

      if (unreadError) {
        console.error("Error fetching unread counts:", unreadError);
        // Don't throw error for unread counts, just continue
      }

      // Create a map of unread counts
      const unreadCountMap = (unreadData || []).reduce((acc, curr) => ({
        ...acc,
        [curr.sender_id]: (acc[curr.sender_id] || 0) + 1
      }), {});
      setUnreadCounts(unreadCountMap);
      
      // Use the profiles data directly
      const profilesData = data;

      if (profilesData && profilesData.length > 0) {
        const mappedProfiles = profilesData.map(profile => ({
          id: profile.id,
          name: profile.full_name,
          avatar_url: profile.avatar_url,
          email: profile.email,
          phone: profile.phone,
          location: profile.location,
          bio: profile.bio,
          business_name: profile.business_name,
          category: profile.category,
          user_type: profile.user_type,
          username: profile.username,
          is_online: profile.is_online,
          last_seen: profile.last_seen,
          member_since: profile.member_since,
          profile_views: profile.profile_views,
          average_rating: profile.average_rating,
          reviews_count: profile.reviews_count
        }));
        setContacts(mappedProfiles);
        if (!selectedContact) {
          setSelectedContact(mappedProfiles[0]);
        }
      } else {
        setContacts([]);
      }
    } catch (error) {
      console.error("Error in fetchConversationContacts:", error);
      toast.error(error instanceof Error ? error.message : "Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  if (!authUser) {
    return null;
  }

  const currentUser: User = {
    id: authUser.id,
    name: authUser.email || "Current User",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    email: authUser.email,
    phone: null,
    location: null,
    bio: null,
    business_name: null,
    category: null,
    user_type: "user",
    username: null,
    is_online: true,
    last_seen: new Date().toISOString(),
    member_since: new Date().toISOString(),
    profile_views: 0,
    average_rating: null,
    reviews_count: 0
  };

  const handleSelectContact = (contact: User) => {
    setSelectedContact(contact);
    setShowChat(true);
    // Clear unread count when selecting a contact
    setUnreadCounts(prev => ({
      ...prev,
      [contact.id]: 0
    }));
    if (onContactSelect) {
      onContactSelect(contact);
    }
  };

  const handleBack = () => {
    setShowChat(false);
  };

  const handleContactSelection = (contact: any) => {
    // Convert the contact from ContactSelectionPage format to User format
    const userContact: User = {
      id: contact.id,
      name: contact.full_name || contact.username || 'Unknown User',
      avatar_url: contact.avatar_url,
      email: contact.email,
      phone: contact.phone,
      location: contact.location,
      bio: contact.bio,
      business_name: contact.business_name,
      category: contact.category,
      user_type: contact.user_type,
      username: contact.username,
      is_online: contact.is_online,
      last_seen: contact.last_seen,
      member_since: contact.member_since,
      profile_views: contact.profile_views,
      average_rating: contact.average_rating,
      reviews_count: contact.reviews_count
    };
    
    setSelectedContact(userContact);
    setShowChat(true);
    setShowContactSelection(false);
    
    // Add to contacts if not already present
    if (!contacts.find(c => c.id === contact.id)) {
      setContacts(prev => [...prev, userContact]);
    }
    
    toast.success(`Started chat with ${userContact.name}`);
  };

  const handleBackFromContactSelection = () => {
    setShowContactSelection(false);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab !== "chat") {
      setShowChat(false);
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "feeds":
        return <FeedsPage isDarkTheme={isDarkTheme} />;
      case "events":
        return <EventsPage isDarkTheme={isDarkTheme} />;
      case "calls":
        return <CallsPage isDarkTheme={isDarkTheme} />;
      case "profiles":
        return <ProfilesPage isDarkTheme={isDarkTheme} />;
      case "chat":
      default:
        if (!showChat) {
          return (
            // WhatsApp Mobile Chat List View
            <div className={`h-full ${isDarkTheme ? 'bg-gray-900' : 'bg-white'} flex flex-col`}>
              {/* Header - WhatsApp Style */}
              <div className={`${isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'} px-3 py-2 flex items-center justify-between`}>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                    <img 
                      src="/mealogo.png.jpg" 
                      alt="Chyme Logo" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = 'none';
                        const nextElement = target.nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = 'flex';
                        }
                      }}
                    />
                    <div className="w-full h-full bg-red-600 rounded-full flex items-center justify-center" style={{display: 'none'}}>
                      <span className="text-sm font-bold text-white">M</span>
                    </div>
                  </div>
                  <h1 className={`${isDarkTheme ? 'text-white' : 'text-gray-900'} text-lg font-medium`}>Chats</h1>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setShowSearch(!showSearch)}
                    className={`p-2 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'} hover:${isDarkTheme ? 'text-white' : 'text-gray-900'} rounded-full transition-colors`}
                  >
                    {showSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                  </button>
                  <button 
                    onClick={toggleTheme}
                    className={`p-2 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'} hover:${isDarkTheme ? 'text-white' : 'text-gray-900'} rounded-full transition-colors`}
                  >
                    {isDarkTheme ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </button>
                  <button 
                    onClick={() => {
                      toast.info("More options coming soon!");
                    }}
                    className={`p-2 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'} hover:${isDarkTheme ? 'text-white' : 'text-gray-900'} rounded-full transition-colors`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              {showSearch && (
                <div className={`px-3 py-1 ${isDarkTheme ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <Input
                    placeholder="Search or start new chat"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`${isDarkTheme ? 'bg-gray-700' : 'bg-white'} border-0 ${isDarkTheme ? 'text-white' : 'text-gray-900'} placeholder-${isDarkTheme ? 'text-gray-400' : 'text-gray-500'} rounded-lg`}
                  />
                </div>
              )}

              {/* Contact List */}
              <div className="flex-1 overflow-hidden">
                <ContactList
                  onSelectContact={handleSelectContact}
                  selectedContactId={selectedContact?.id}
                  unreadCounts={unreadCounts}
                  contacts={filteredContacts}
                  isDarkTheme={isDarkTheme}
                />
              </div>
            </div>
          );
        } else {
          return (
            // WhatsApp Mobile Chat View
            <div className="h-full flex flex-col">
          <ChatContainer
                       selectedContact={selectedContact}
                       messages={filteredMessages}
                       onSendMessage={handleSendMessage}
                       currentUserId={currentUser.id}
                       isDarkTheme={isDarkTheme}
            onBack={handleBack}
                       onReply={handleReply}
                       onForward={handleForward}
                       messageSearchTerm={messageSearchTerm}
                       onMessageSearchChange={setMessageSearchTerm}
                       showMessageSearch={showMessageSearch}
                       onToggleMessageSearch={() => setShowMessageSearch(!showMessageSearch)}
                     />
          </div>
          );
        }
    }
  };

  // Theme classes - Red and White for light mode, Black and Red for dark mode
  const bgPrimary = isDarkTheme ? "bg-gray-900" : "bg-gray-50";

  // Show contact selection page if needed
  if (showContactSelection) {
    return (
      <div className={`h-full ${bgPrimary} ${className} relative`}>
        <ContactSelectionPage
          onContactSelect={handleContactSelection}
          onBack={handleBackFromContactSelection}
        />
      </div>
    );
  }

  return (
    <div className={`h-full ${bgPrimary} ${className} relative`}>
      {renderActiveTab()}
      {/* Only show bottom navigation when not in chat view */}
      {!showChat && (
        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
          isDarkTheme={isDarkTheme} 
        />
      )}
      {/* Floating Action Button for New Chat - only show on chat tab when not in chat view */}
      {activeTab === "chat" && !showChat && (
        <ConversationButton 
          currentUser={currentUser} 
          onSelectContact={handleSelectContact} 
          onShowContactSelection={() => setShowContactSelection(true)}
        />
      )}
    </div>
  );
};

export default MessagingSystem; 