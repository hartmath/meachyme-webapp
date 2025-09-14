import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useParams } from "react-router-dom";
import ChatHeader from "@/components/ChatHeader";
import MessageList from "@/components/MessageList";
import MessageComposer from "@/components/MessageComposer";
import { toast } from "sonner";

interface ChatPageProps {
  className?: string;
}

const ChatPage: React.FC<ChatPageProps> = ({ className = "" }) => {
  const { user: authUser } = useAuth();
  const navigate = useNavigate();
  const { contactId } = useParams<{ contactId: string }>();
  
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [showMessageSearch, setShowMessageSearch] = useState(false);
  const [messageSearchTerm, setMessageSearchTerm] = useState("");
  const [replyToMessage, setReplyToMessage] = useState<any>(null);
  const [forwardMessage, setForwardMessage] = useState<any>(null);

  // Load contact details
  useEffect(() => {
    const loadContact = async () => {
      if (!contactId || !authUser) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', contactId)
          .single();

        if (error) {
          console.error('Error loading contact:', error);
          toast.error('Failed to load contact');
          return;
        }

        setSelectedContact(data);
      } catch (error) {
        console.error('Error loading contact:', error);
        toast.error('Failed to load contact');
      }
    };

    loadContact();
  }, [contactId, authUser]);

  // Load messages
  useEffect(() => {
    const loadMessages = async () => {
      if (!selectedContact || !authUser) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('direct_messages')
          .select('*')
          .or(`sender_id.eq.${authUser.id},receiver_id.eq.${authUser.id}`)
          .or(`sender_id.eq.${selectedContact.id},receiver_id.eq.${selectedContact.id}`)
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Error loading messages:', error);
          toast.error('Failed to load messages');
          return;
        }

        setMessages(data || []);
      } catch (error) {
        console.error('Error loading messages:', error);
        toast.error('Failed to load messages');
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, [selectedContact, authUser]);

  const handleSendMessage = async (content: string, attachmentUrl?: string, type: 'text' | 'voice' = 'text') => {
    if (!selectedContact || !authUser) return;

    try {
      const newMessage = {
        sender_id: authUser.id,
        receiver_id: selectedContact.id,
        content,
        attachment_url: attachmentUrl,
        message_type: type,
        created_at: new Date().toISOString(),
      };

      // Optimistically add message to UI
      setMessages(prev => [...prev, newMessage]);

      // Send to database
      const { error } = await supabase
        .from('direct_messages')
        .insert([newMessage]);

      if (error) {
        console.error('Error sending message:', error);
        toast.error('Failed to send message');
        // Remove optimistic message on error
        setMessages(prev => prev.filter(msg => msg !== newMessage));
        return;
      }

      toast.success('Message sent');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  const handleBack = () => {
    navigate('/messages');
  };

  const handleReply = (message: any) => {
    setReplyToMessage(message);
    toast.info(`Replying to: ${message.content.substring(0, 50)}...`);
  };

  const handleForward = (message: any) => {
    setForwardMessage(message);
    toast.info(`Forwarding: ${message.content.substring(0, 50)}...`);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // Filter messages based on search term
  const filteredMessages = messageSearchTerm
    ? messages.filter(message =>
        message.content.toLowerCase().includes(messageSearchTerm.toLowerCase())
      )
    : messages;

  if (!selectedContact) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkTheme ? 'bg-gray-900' : 'bg-white'}`}>
        <div className={`text-center ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-xl font-semibold mb-2">Contact not found</h3>
          <p className="text-sm">The contact you're looking for doesn't exist</p>
          <button
            onClick={handleBack}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-screen flex flex-col ${isDarkTheme ? 'bg-gray-900' : 'bg-white'} ${className}`}>
      {/* Chat Header */}
      <ChatHeader 
        recipient={selectedContact} 
        onBack={handleBack} 
        isDarkTheme={isDarkTheme}
        onToggleMessageSearch={() => setShowMessageSearch(!showMessageSearch)}
        showMessageSearch={showMessageSearch}
        messageSearchTerm={messageSearchTerm}
        onMessageSearchChange={setMessageSearchTerm}
      />

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <MessageList 
          messages={filteredMessages} 
          currentUserId={authUser?.id || ''} 
          loading={loading}
          isDarkTheme={isDarkTheme}
          onReply={handleReply}
          onForward={handleForward}
        />
      </div>

      {/* Message Composer */}
      <MessageComposer 
        onSendMessage={handleSendMessage} 
        isDarkTheme={isDarkTheme} 
      />
    </div>
  );
};

export default ChatPage;