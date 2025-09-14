-- =====================================================
-- CHYME APP - SUPABASE DATABASE SETUP
-- =====================================================
-- This script sets up the complete database schema for the Chyme messaging app
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- CORE TABLES
-- =====================================================

-- Profiles table (user profiles)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    username TEXT UNIQUE,
    email TEXT,
    phone TEXT,
    avatar_url TEXT,
    bio TEXT,
    location TEXT,
    business_name TEXT,
    user_type TEXT DEFAULT 'attendee' CHECK (user_type IN ('attendee', 'vendor', 'organizer', 'venue_owner')),
    category TEXT,
    is_online BOOLEAN DEFAULT false,
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    member_since TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    profile_views INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    services JSONB,
    reviews JSONB,
    settings JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Direct messages table (core messaging)
CREATE TABLE IF NOT EXISTS direct_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    recipient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    attachment_url TEXT,
    message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'voice', 'video', 'file')),
    read BOOLEAN DEFAULT false,
    deleted_by_sender BOOLEAN DEFAULT false,
    deleted_by_recipient BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    summary TEXT,
    category TEXT,
    event_type TEXT,
    date DATE,
    time TIME,
    end_date DATE,
    end_time TIME,
    time_zone TEXT DEFAULT 'UTC',
    location TEXT,
    venue_type TEXT,
    online_link TEXT,
    image_url TEXT,
    is_free BOOLEAN DEFAULT false,
    price DECIMAL(10,2),
    max_attendees INTEGER,
    is_vip_event BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT false,
    tags TEXT[],
    target_audience TEXT,
    organizer_name TEXT,
    organizer_email TEXT,
    organizer_phone TEXT,
    organizing_department TEXT,
    protocol_media_coverage BOOLEAN DEFAULT false,
    security_clearance_required BOOLEAN DEFAULT false,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event attendees table
CREATE TABLE IF NOT EXISTS event_attendees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    ticket_type TEXT DEFAULT 'general',
    purchase_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- Event tickets table
CREATE TABLE IF NOT EXISTS event_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    ticket_name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2),
    quantity INTEGER,
    sales_start_date TIMESTAMP WITH TIME ZONE,
    sales_end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    related_id UUID,
    related_type TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notification preferences table
CREATE TABLE IF NOT EXISTS notification_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    messages BOOLEAN DEFAULT true,
    events_updates BOOLEAN DEFAULT true,
    vendor_requests BOOLEAN DEFAULT true,
    payment_updates BOOLEAN DEFAULT true,
    system_updates BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Direct messages indexes
CREATE INDEX IF NOT EXISTS idx_direct_messages_sender_id ON direct_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_direct_messages_recipient_id ON direct_messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_direct_messages_created_at ON direct_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_direct_messages_conversation ON direct_messages(sender_id, recipient_id, created_at);

-- Events indexes
CREATE INDEX IF NOT EXISTS idx_events_user_id ON events(user_id);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_published ON events(published);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);

-- Event attendees indexes
CREATE INDEX IF NOT EXISTS idx_event_attendees_event_id ON event_attendees(event_id);
CREATE INDEX IF NOT EXISTS idx_event_attendees_user_id ON event_attendees(user_id);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE direct_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

-- Profiles policies
DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

CREATE POLICY "Users can view all profiles" ON profiles
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Direct messages policies
DROP POLICY IF EXISTS "Users can read own messages" ON direct_messages;
DROP POLICY IF EXISTS "Users can send messages" ON direct_messages;
DROP POLICY IF EXISTS "Users can update own messages" ON direct_messages;

CREATE POLICY "Users can read own messages" ON direct_messages
    FOR SELECT TO authenticated
    USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages" ON direct_messages
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update own messages" ON direct_messages
    FOR UPDATE TO authenticated
    USING (auth.uid() = sender_id);

-- Events policies
DROP POLICY IF EXISTS "Users can view published events" ON events;
DROP POLICY IF EXISTS "Users can manage own events" ON events;

CREATE POLICY "Users can view published events" ON events
    FOR SELECT TO authenticated
    USING (published = true OR auth.uid() = user_id);

CREATE POLICY "Users can manage own events" ON events
    FOR ALL TO authenticated
    USING (auth.uid() = user_id);

-- Event attendees policies
DROP POLICY IF EXISTS "Users can view event attendees" ON event_attendees;
DROP POLICY IF EXISTS "Users can manage own attendance" ON event_attendees;

CREATE POLICY "Users can view event attendees" ON event_attendees
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Users can manage own attendance" ON event_attendees
    FOR ALL TO authenticated
    USING (auth.uid() = user_id);

-- Event tickets policies
DROP POLICY IF EXISTS "Users can view event tickets" ON event_tickets;
DROP POLICY IF EXISTS "Event organizers can manage tickets" ON event_tickets;

CREATE POLICY "Users can view event tickets" ON event_tickets
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Event organizers can manage tickets" ON event_tickets
    FOR ALL TO authenticated
    USING (EXISTS (
        SELECT 1 FROM events 
        WHERE events.id = event_tickets.event_id 
        AND events.user_id = auth.uid()
    ));

-- Notifications policies
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;

CREATE POLICY "Users can view own notifications" ON notifications
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON notifications
    FOR UPDATE TO authenticated
    USING (auth.uid() = user_id);

-- Notification preferences policies
DROP POLICY IF EXISTS "Users can manage own preferences" ON notification_preferences;

CREATE POLICY "Users can manage own preferences" ON notification_preferences
    FOR ALL TO authenticated
    USING (auth.uid() = user_id);

-- =====================================================
-- FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, full_name, email, avatar_url)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'full_name',
        NEW.email,
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_direct_messages_updated_at BEFORE UPDATE ON direct_messages
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_event_tickets_updated_at BEFORE UPDATE ON event_tickets
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_notification_preferences_updated_at BEFORE UPDATE ON notification_preferences
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to create notification preferences on profile creation
CREATE OR REPLACE FUNCTION public.create_notification_preferences()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.notification_preferences (user_id)
    VALUES (NEW.user_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create notification preferences
CREATE TRIGGER create_notification_preferences_trigger
    AFTER INSERT ON profiles
    FOR EACH ROW EXECUTE FUNCTION public.create_notification_preferences();

-- =====================================================
-- SAMPLE DATA (Optional - for testing)
-- =====================================================

-- Insert sample categories
INSERT INTO events (id, user_id, title, description, category, date, time, location, published, is_free)
VALUES 
    (
        uuid_generate_v4(),
        (SELECT id FROM auth.users LIMIT 1),
        'Sample Event 1',
        'This is a sample event for testing',
        'Conference',
        '2024-12-25',
        '10:00:00',
        'Sample Venue',
        true,
        true
    ),
    (
        uuid_generate_v4(),
        (SELECT id FROM auth.users LIMIT 1),
        'Sample Event 2',
        'Another sample event',
        'Workshop',
        '2024-12-30',
        '14:00:00',
        'Online',
        true,
        false
    )
ON CONFLICT DO NOTHING;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

-- This script has successfully set up:
-- ✅ All core tables for the Chyme app
-- ✅ Proper indexes for performance
-- ✅ Row Level Security policies
-- ✅ Functions and triggers for automation
-- ✅ Sample data for testing

-- Your Chyme app database is now ready to use!
