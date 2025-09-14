export interface DirectMessage {
  id: string;
  content: string;
  sender_id: string;
  recipient_id: string;  // Changed from receiver_id to recipient_id to match Supabase
  created_at: string;
  attachment_url?: string;
  read: boolean;
}

export interface User {
  id: string;
  name: string | null;
  avatar_url: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  bio: string | null;
  business_name: string | null;
  category: string | null;
  user_type: string | null;
  username: string | null;
  is_online: boolean;
  last_seen: string | null;
  member_since: string | null;
  profile_views: number;
  average_rating: number;
  reviews_count: number;
}

export interface Message {
  id: string;
  content: string;
  sender_id: string;
  recipient_id: string;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  participants: User[];
  last_message: Message | null;
  unread_count: number;
  created_at: string;
  updated_at: string;
}
