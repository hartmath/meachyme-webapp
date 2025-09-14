export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      approved_events: {
        Row: {
          created_at: string
          event_id: string
          id: string
          organizer_id: string
          status: string
          updated_at: string
          vendor_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          organizer_id: string
          status?: string
          updated_at?: string
          vendor_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          organizer_id?: string
          status?: string
          updated_at?: string
          vendor_id?: string
        }
        Relationships: []
      }
      articles: {
        Row: {
          author_name: string
          category: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          id: string
          image_url: string | null
          published: boolean | null
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author_name?: string
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string
          category?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          image_url?: string | null
          published?: boolean | null
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      billing_info: {
        Row: {
          billing_address: string | null
          city: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          payment_method_id: string | null
          state: string | null
          stripe_customer_id: string | null
          updated_at: string
          user_id: string | null
          zip_code: string | null
        }
        Insert: {
          billing_address?: string | null
          city?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          payment_method_id?: string | null
          state?: string | null
          stripe_customer_id?: string | null
          updated_at?: string
          user_id?: string | null
          zip_code?: string | null
        }
        Update: {
          billing_address?: string | null
          city?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          payment_method_id?: string | null
          state?: string | null
          stripe_customer_id?: string | null
          updated_at?: string
          user_id?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          category: string | null
          content: string | null
          created_at: string
          id: string
          published: boolean | null
          summary: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string
          id?: string
          published?: boolean | null
          summary?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string
          id?: string
          published?: boolean | null
          summary?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          amount: number | null
          created_at: string | null
          date: string
          event_id: string | null
          id: string
          notes: string | null
          service_name: string | null
          status: string
          time: string | null
          updated_at: string | null
          user_id: string
          vendor_id: string
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          date: string
          event_id?: string | null
          id?: string
          notes?: string | null
          service_name?: string | null
          status?: string
          time?: string | null
          updated_at?: string | null
          user_id: string
          vendor_id: string
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          date?: string
          event_id?: string | null
          id?: string
          notes?: string | null
          service_name?: string | null
          status?: string
          time?: string | null
          updated_at?: string | null
          user_id?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: number
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: number
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: number
          name?: string
          slug?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          content: string
          created_at: string
          id: string
          target_id: string
          target_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          target_id: string
          target_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          target_id?: string
          target_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      direct_messages: {
        Row: {
          attachment_url: string | null
          content: string
          created_at: string
          deleted_by_recipient: boolean
          deleted_by_sender: boolean
          id: string
          read: boolean
          recipient_id: string
          sender_id: string
        }
        Insert: {
          attachment_url?: string | null
          content: string
          created_at?: string
          deleted_by_recipient?: boolean
          deleted_by_sender?: boolean
          id?: string
          read?: boolean
          recipient_id: string
          sender_id: string
        }
        Update: {
          attachment_url?: string | null
          content?: string
          created_at?: string
          deleted_by_recipient?: boolean
          deleted_by_sender?: boolean
          id?: string
          read?: boolean
          recipient_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      event_attendees: {
        Row: {
          event_id: string
          id: string
          purchase_date: string
          ticket_type: string
          user_id: string
        }
        Insert: {
          event_id: string
          id?: string
          purchase_date?: string
          ticket_type?: string
          user_id: string
        }
        Update: {
          event_id?: string
          id?: string
          purchase_date?: string
          ticket_type?: string
          user_id?: string
        }
        Relationships: []
      }
      event_gallery_images: {
        Row: {
          caption: string | null
          created_at: string | null
          event_id: string | null
          id: string
          image_url: string
          position: number | null
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          event_id?: string | null
          id?: string
          image_url: string
          position?: number | null
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          event_id?: string | null
          id?: string
          image_url?: string
          position?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "event_gallery_images_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_group_chats: {
        Row: {
          created_at: string
          event_id: string
          id: string
          last_read_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          last_read_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          last_read_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_group_chats_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_images: {
        Row: {
          created_at: string | null
          event_id: string
          id: string
          image_type: string | null
          image_url: string
          is_main: boolean | null
          position: number | null
        }
        Insert: {
          created_at?: string | null
          event_id: string
          id?: string
          image_type?: string | null
          image_url: string
          is_main?: boolean | null
          position?: number | null
        }
        Update: {
          created_at?: string | null
          event_id?: string
          id?: string
          image_type?: string | null
          image_url?: string
          is_main?: boolean | null
          position?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "event_images_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_messages: {
        Row: {
          attachment_url: string | null
          content: string
          created_at: string
          event_id: string
          id: string
          read: boolean
          sender_id: string
          updated_at: string
        }
        Insert: {
          attachment_url?: string | null
          content: string
          created_at?: string
          event_id: string
          id?: string
          read?: boolean
          sender_id: string
          updated_at?: string
        }
        Update: {
          attachment_url?: string | null
          content?: string
          created_at?: string
          event_id?: string
          id?: string
          read?: boolean
          sender_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_messages_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_notifications: {
        Row: {
          created_at: string
          event_id: string | null
          id: string
          message: string
          metadata: Json | null
          notification_type: string | null
          read: boolean
          recipient_id: string | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id?: string | null
          id?: string
          message: string
          metadata?: Json | null
          notification_type?: string | null
          read?: boolean
          recipient_id?: string | null
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string | null
          id?: string
          message?: string
          metadata?: Json | null
          notification_type?: string | null
          read?: boolean
          recipient_id?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_notifications_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_participants: {
        Row: {
          can_access_chat: boolean
          created_at: string
          event_id: string
          id: string
          registration_date: string | null
          role: string
          user_id: string
        }
        Insert: {
          can_access_chat?: boolean
          created_at?: string
          event_id: string
          id?: string
          registration_date?: string | null
          role?: string
          user_id: string
        }
        Update: {
          can_access_chat?: boolean
          created_at?: string
          event_id?: string
          id?: string
          registration_date?: string | null
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      event_tickets: {
        Row: {
          created_at: string | null
          description: string | null
          event_id: string | null
          id: string
          price: number | null
          quantity: number | null
          sales_end_date: string | null
          sales_start_date: string | null
          ticket_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          event_id?: string | null
          id?: string
          price?: number | null
          quantity?: number | null
          sales_end_date?: string | null
          sales_start_date?: string | null
          ticket_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          event_id?: string | null
          id?: string
          price?: number | null
          quantity?: number | null
          sales_end_date?: string | null
          sales_start_date?: string | null
          ticket_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_tickets_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_vendors: {
        Row: {
          arrival_status: string | null
          created_at: string
          event_id: string
          id: string
          status: string
          vendor_id: string
        }
        Insert: {
          arrival_status?: string | null
          created_at?: string
          event_id: string
          id?: string
          status?: string
          vendor_id: string
        }
        Update: {
          arrival_status?: string | null
          created_at?: string
          event_id?: string
          id?: string
          status?: string
          vendor_id?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          category: string | null
          created_at: string
          date: string | null
          description: string | null
          end_date: string | null
          end_time: string | null
          event_type: string | null
          id: string
          image_url: string | null
          is_free: boolean | null
          is_vip_event: boolean | null
          location: string | null
          max_attendees: number | null
          metadata: Json | null
          online_link: string | null
          organizer_email: string | null
          organizer_name: string | null
          organizer_phone: string | null
          organizing_department: string | null
          price: number | null
          protocol_media_coverage: boolean | null
          published: boolean | null
          security_clearance_required: boolean | null
          summary: string | null
          tags: string[] | null
          target_audience: string | null
          time: string | null
          time_zone: string | null
          title: string
          updated_at: string
          user_id: string
          venue_type: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          date?: string | null
          description?: string | null
          end_date?: string | null
          end_time?: string | null
          event_type?: string | null
          id?: string
          image_url?: string | null
          is_free?: boolean | null
          is_vip_event?: boolean | null
          location?: string | null
          max_attendees?: number | null
          metadata?: Json | null
          online_link?: string | null
          organizer_email?: string | null
          organizer_name?: string | null
          organizer_phone?: string | null
          organizing_department?: string | null
          price?: number | null
          protocol_media_coverage?: boolean | null
          published?: boolean | null
          security_clearance_required?: boolean | null
          summary?: string | null
          tags?: string[] | null
          target_audience?: string | null
          time?: string | null
          time_zone?: string | null
          title: string
          updated_at?: string
          user_id: string
          venue_type?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          date?: string | null
          description?: string | null
          end_date?: string | null
          end_time?: string | null
          event_type?: string | null
          id?: string
          image_url?: string | null
          is_free?: boolean | null
          is_vip_event?: boolean | null
          location?: string | null
          max_attendees?: number | null
          metadata?: Json | null
          online_link?: string | null
          organizer_email?: string | null
          organizer_name?: string | null
          organizer_phone?: string | null
          organizing_department?: string | null
          price?: number | null
          protocol_media_coverage?: boolean | null
          published?: boolean | null
          security_clearance_required?: boolean | null
          summary?: string | null
          tags?: string[] | null
          target_audience?: string | null
          time?: string | null
          time_zone?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          venue_type?: string | null
        }
        Relationships: []
      }
      featured_content: {
        Row: {
          content_id: string
          content_type: string
          created_at: string
          end_date: string | null
          id: string
          priority: number | null
          start_date: string | null
          updated_at: string
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string
          end_date?: string | null
          id?: string
          priority?: number | null
          start_date?: string | null
          updated_at?: string
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string
          end_date?: string | null
          id?: string
          priority?: number | null
          start_date?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      follows: {
        Row: {
          created_at: string
          id: string
          target_id: string
          target_type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          target_id: string
          target_type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          target_id?: string
          target_type?: string
          user_id?: string
        }
        Relationships: []
      }
      "My Event Advisor": {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      notification_preferences: {
        Row: {
          created_at: string | null
          events_updates: boolean | null
          messages: boolean | null
          payment_updates: boolean | null
          system_updates: boolean | null
          updated_at: string | null
          user_id: string
          vendor_requests: boolean | null
        }
        Insert: {
          created_at?: string | null
          events_updates?: boolean | null
          messages?: boolean | null
          payment_updates?: boolean | null
          system_updates?: boolean | null
          updated_at?: string | null
          user_id: string
          vendor_requests?: boolean | null
        }
        Update: {
          created_at?: string | null
          events_updates?: boolean | null
          messages?: boolean | null
          payment_updates?: boolean | null
          system_updates?: boolean | null
          updated_at?: string | null
          user_id?: string
          vendor_requests?: boolean | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          metadata: Json | null
          read: boolean
          related_id: string | null
          related_type: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          metadata?: Json | null
          read?: boolean
          related_id?: string | null
          related_type?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          metadata?: Json | null
          read?: boolean
          related_id?: string | null
          related_type?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          amount: number | null
          created_at: string
          currency: string | null
          id: string
          status: string | null
          stripe_session_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          currency?: string | null
          id?: string
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      payout_details: {
        Row: {
          account_holder_name: string
          account_number: string
          account_type: string
          bank_name: string
          created_at: string
          id: string
          is_verified: boolean | null
          routing_number: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          account_holder_name: string
          account_number: string
          account_type: string
          bank_name: string
          created_at?: string
          id?: string
          is_verified?: boolean | null
          routing_number: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          account_holder_name?: string
          account_number?: string
          account_type?: string
          bank_name?: string
          created_at?: string
          id?: string
          is_verified?: boolean | null
          routing_number?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          average_rating: number | null
          bio: string | null
          business_name: string | null
          category: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          is_online: boolean | null
          last_seen: string | null
          location: string | null
          member_since: string | null
          phone: string | null
          profile_views: number | null
          reviews: Json | null
          reviews_count: number | null
          services: Json | null
          settings: Json | null
          user_type: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          average_rating?: number | null
          bio?: string | null
          business_name?: string | null
          category?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          is_online?: boolean | null
          last_seen?: string | null
          location?: string | null
          member_since?: string | null
          phone?: string | null
          profile_views?: number | null
          reviews?: Json | null
          reviews_count?: number | null
          services?: Json | null
          settings?: Json | null
          user_type?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          average_rating?: number | null
          bio?: string | null
          business_name?: string | null
          category?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_online?: boolean | null
          last_seen?: string | null
          location?: string | null
          member_since?: string | null
          phone?: string | null
          profile_views?: number | null
          reviews?: Json | null
          reviews_count?: number | null
          services?: Json | null
          settings?: Json | null
          user_type?: string
          username?: string | null
        }
        Relationships: []
      }
      push_subscriptions: {
        Row: {
          auth: string
          created_at: string | null
          endpoint: string
          id: string
          p256dh: string
          user_id: string
        }
        Insert: {
          auth: string
          created_at?: string | null
          endpoint: string
          id?: string
          p256dh: string
          user_id: string
        }
        Update: {
          auth?: string
          created_at?: string | null
          endpoint?: string
          id?: string
          p256dh?: string
          user_id?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      tickets: {
        Row: {
          created_at: string | null
          event_date: string | null
          event_id: string | null
          event_location: string | null
          event_time: string | null
          event_title: string
          id: string
          purchase_date: string | null
          quantity: number
          session_id: string
          status: string | null
          ticket_type: string
          total_amount: number | null
          updated_at: string | null
          user_email: string | null
          user_id: string | null
          username: string | null
        }
        Insert: {
          created_at?: string | null
          event_date?: string | null
          event_id?: string | null
          event_location?: string | null
          event_time?: string | null
          event_title: string
          id?: string
          purchase_date?: string | null
          quantity?: number
          session_id: string
          status?: string | null
          ticket_type?: string
          total_amount?: number | null
          updated_at?: string | null
          user_email?: string | null
          user_id?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string | null
          event_date?: string | null
          event_id?: string | null
          event_location?: string | null
          event_time?: string | null
          event_title?: string
          id?: string
          purchase_date?: string | null
          quantity?: number
          session_id?: string
          status?: string | null
          ticket_type?: string
          total_amount?: number | null
          updated_at?: string | null
          user_email?: string | null
          user_id?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      user_reports: {
        Row: {
          chat_id: string | null
          created_at: string
          id: string
          reason: string
          reported_user_id: string
          reporter_id: string
          resolved: boolean
        }
        Insert: {
          chat_id?: string | null
          created_at?: string
          id?: string
          reason: string
          reported_user_id: string
          reporter_id: string
          resolved?: boolean
        }
        Update: {
          chat_id?: string | null
          created_at?: string
          id?: string
          reason?: string
          reported_user_id?: string
          reporter_id?: string
          resolved?: boolean
        }
        Relationships: []
      }
      vendor_availability: {
        Row: {
          created_at: string | null
          friday: boolean | null
          id: string
          monday: boolean | null
          saturday: boolean | null
          sunday: boolean | null
          thursday: boolean | null
          tuesday: boolean | null
          updated_at: string | null
          vendor_id: string
          wednesday: boolean | null
        }
        Insert: {
          created_at?: string | null
          friday?: boolean | null
          id?: string
          monday?: boolean | null
          saturday?: boolean | null
          sunday?: boolean | null
          thursday?: boolean | null
          tuesday?: boolean | null
          updated_at?: string | null
          vendor_id: string
          wednesday?: boolean | null
        }
        Update: {
          created_at?: string | null
          friday?: boolean | null
          id?: string
          monday?: boolean | null
          saturday?: boolean | null
          sunday?: boolean | null
          thursday?: boolean | null
          tuesday?: boolean | null
          updated_at?: string | null
          vendor_id?: string
          wednesday?: boolean | null
        }
        Relationships: []
      }
      vendor_follows: {
        Row: {
          created_at: string | null
          id: string
          user_id: string
          vendor_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          user_id: string
          vendor_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          user_id?: string
          vendor_id?: string
        }
        Relationships: []
      }
      vendor_locations: {
        Row: {
          event_id: string
          id: string
          is_onsite: boolean | null
          latitude: number | null
          longitude: number | null
          updated_at: string | null
          vendor_id: string
        }
        Insert: {
          event_id: string
          id?: string
          is_onsite?: boolean | null
          latitude?: number | null
          longitude?: number | null
          updated_at?: string | null
          vendor_id: string
        }
        Update: {
          event_id?: string
          id?: string
          is_onsite?: boolean | null
          latitude?: number | null
          longitude?: number | null
          updated_at?: string | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_locations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_requests: {
        Row: {
          created_at: string
          event_id: string
          id: string
          message: string | null
          organizer_id: string
          read: boolean
          status: string
          updated_at: string
          user_metadata: Json | null
          vendor_id: string
        }
        Insert: {
          created_at?: string
          event_id: string
          id?: string
          message?: string | null
          organizer_id: string
          read?: boolean
          status?: string
          updated_at?: string
          user_metadata?: Json | null
          vendor_id: string
        }
        Update: {
          created_at?: string
          event_id?: string
          id?: string
          message?: string | null
          organizer_id?: string
          read?: boolean
          status?: string
          updated_at?: string
          user_metadata?: Json | null
          vendor_id?: string
        }
        Relationships: []
      }
      vendor_reviews: {
        Row: {
          created_at: string
          id: string
          rating: number
          review_text: string | null
          status: string
          user_id: string
          vendor_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          rating: number
          review_text?: string | null
          status?: string
          user_id: string
          vendor_id: string
        }
        Update: {
          created_at?: string
          id?: string
          rating?: number
          review_text?: string | null
          status?: string
          user_id?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_reviews_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors_gallery: {
        Row: {
          created_at: string | null
          id: string
          image_url: string
          position: number | null
          vendor_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url: string
          position?: number | null
          vendor_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string
          position?: number | null
          vendor_id?: string
        }
        Relationships: []
      }
      vendors_services: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          price: number
          vendor_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          price: number
          vendor_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          price?: number
          vendor_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_conversation_access: {
        Args: { conv_id: string; usr_id: string }
        Returns: boolean
      }
      create_notification: {
        Args: {
          p_user_id: string
          p_type: string
          p_title: string
          p_message: string
          p_related_id?: string
          p_related_type?: string
          p_metadata?: Json
        }
        Returns: string
      }
      get_conversation_messages: {
        Args: { user1_id: string; user2_id: string }
        Returns: {
          id: string
          sender_id: string
          recipient_id: string
          content: string
          created_at: string
          read: boolean
          attachment_url: string
        }[]
      }
      get_unread_message_count: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_user_conversations: {
        Args: Record<PropertyKey, never>
        Returns: {
          conversation_with: string
          last_message: string
          last_message_time: string
          unread_count: number
        }[]
      }
      mark_all_notifications_read: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      mark_messages_as_read: {
        Args: { p_conversation_partner_id: string }
        Returns: undefined
      }
      mark_notification_read: {
        Args: { p_notification_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
