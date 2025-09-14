import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Users, MessageCircle, ArrowLeft, Filter } from 'lucide-react';
import { toast } from 'sonner';

interface Contact {
  id: string;
  full_name: string;
  username: string;
  avatar_url: string;
  user_type: string;
  business_name: string;
  is_online: boolean;
  last_seen: string;
  bio: string;
  category: string;
}

interface ContactSelectionPageProps {
  onContactSelect: (contact: Contact) => void;
  onBack: () => void;
}

export default function ContactSelectionPage({ onContactSelect, onBack }: ContactSelectionPageProps) {
  const { authUser } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());

  const categories = [
    { value: 'all', label: 'All Contacts', icon: Users },
    { value: 'vendor', label: 'Vendors', icon: MessageCircle },
    { value: 'organizer', label: 'Organizers', icon: MessageCircle },
    { value: 'attendee', label: 'Attendees', icon: MessageCircle },
    { value: 'venue_owner', label: 'Venue Owners', icon: MessageCircle },
  ];

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [contacts, searchTerm, selectedCategory]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      
      // Fetch all user profiles except current user
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('user_id', authUser?.id)
        .order('full_name', { ascending: true });

      if (error) {
        console.error('Error fetching contacts:', error);
        toast.error('Failed to load contacts');
        return;
      }

      setContacts(profiles || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const filterContacts = () => {
    let filtered = contacts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(contact =>
        contact.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.business_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(contact => contact.user_type === selectedCategory);
    }

    setFilteredContacts(filtered);
  };

  const handleContactSelect = (contact: Contact) => {
    // Navigate directly to the Chat page
    navigate(`/chat/${contact.id}`);
  };

  const handleStartGroupChat = () => {
    if (selectedContacts.size === 0) {
      toast.error('Please select at least one contact');
      return;
    }
    
    const selectedContactsList = contacts.filter(contact => 
      selectedContacts.has(contact.id)
    );
    
    // For now, just start a chat with the first selected contact
    // In a full implementation, you'd create a group chat
    navigate(`/chat/${selectedContactsList[0].id}`);
    toast.success(`Starting chat with ${selectedContactsList.length} contact(s)`);
  };

  const toggleContactSelection = (contactId: string) => {
    const newSelection = new Set(selectedContacts);
    if (newSelection.has(contactId)) {
      newSelection.delete(contactId);
    } else {
      newSelection.add(contactId);
    }
    setSelectedContacts(newSelection);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatLastSeen = (lastSeen: string) => {
    if (!lastSeen) return 'Never';
    
    const date = new Date(lastSeen);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getCategoryColor = (userType: string) => {
    switch (userType) {
      case 'vendor': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'organizer': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'venue_owner': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'attendee': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Select Contact
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Choose who to start a conversation with
            </p>
          </div>
        </div>
        
        {selectedContacts.size > 0 && (
          <Button
            onClick={handleStartGroupChat}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Start Chat ({selectedContacts.size})
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="p-3 space-y-3 bg-gray-50 dark:bg-gray-800">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white dark:bg-gray-900"
          />
        </div>

        {/* Category Filters */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
                className={`whitespace-nowrap ${
                  selectedCategory === category.value
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-white dark:bg-gray-900'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {category.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Users className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No contacts found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm || selectedCategory !== 'all'
                ? 'Try adjusting your search or filters'
                : 'No contacts available at the moment'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-0.5 p-1">
            {filteredContacts.map((contact) => (
              <Card
                key={contact.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedContacts.has(contact.id)
                    ? 'ring-2 ring-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
                onClick={() => toggleContactSelection(contact.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center space-x-3">
                    {/* Avatar */}
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={contact.avatar_url} alt={contact.full_name} />
                        <AvatarFallback className="bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200">
                          {getInitials(contact.full_name || contact.username || 'U')}
                        </AvatarFallback>
                      </Avatar>
                      {contact.is_online && (
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
                      )}
                    </div>

                    {/* Contact Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {contact.full_name || contact.username || 'Unknown User'}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="secondary"
                            className={`text-xs ${getCategoryColor(contact.user_type)}`}
                          >
                            {contact.user_type}
                          </Badge>
                          {selectedContacts.has(contact.id) && (
                            <div className="h-5 w-5 bg-red-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {contact.business_name && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {contact.business_name}
                        </p>
                      )}
                      
                      {contact.bio && (
                        <p className="text-xs text-gray-500 dark:text-gray-500 truncate mt-1">
                          {contact.bio}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {contact.is_online ? 'Online' : `Last seen ${formatLastSeen(contact.last_seen)}`}
                        </p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleContactSelect(contact);
                          }}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
