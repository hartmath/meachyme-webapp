import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight, Search, MessageCircle, Phone, Mail, HelpCircle, Shield, Users, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface HelpCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkTheme?: boolean;
}

const HelpCenterModal = ({ isOpen, onClose, isDarkTheme = true }: HelpCenterModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const bgSecondary = isDarkTheme ? "bg-gray-800" : "bg-white";
  const textPrimary = isDarkTheme ? "text-white" : "text-gray-900";
  const textSecondary = isDarkTheme ? "text-gray-300" : "text-gray-600";
  const borderColor = isDarkTheme ? "border-gray-700" : "border-gray-200";

  const faqCategories = [
    {
      id: 'messaging',
      title: 'Messaging',
      icon: MessageCircle,
      questions: [
        {
          question: 'How do I send a voice message?',
          answer: 'Hold down the microphone button while speaking, then release to send. Make sure your browser has microphone permissions enabled.'
        },
        {
          question: 'Can I search through my messages?',
          answer: 'Yes! Tap the search icon in any chat to search through your conversation history.'
        },
        {
          question: 'How do I react to messages?',
          answer: 'Long press on any message and tap the smile icon to add emoji reactions.'
        }
      ]
    },
    {
      id: 'events',
      title: 'Events',
      icon: Calendar,
      questions: [
        {
          question: 'How do I create an event?',
          answer: 'Go to the Events tab and tap the "+" button to create a new event. Fill in the details and publish.'
        },
        {
          question: 'Can I sell tickets through Chyme?',
          answer: 'Yes! You can set up ticket sales directly in your event details with pricing and availability.'
        },
        {
          question: 'How do I manage event attendees?',
          answer: 'View your event details to see all registered attendees and manage their information.'
        }
      ]
    },
    {
      id: 'profile',
      title: 'Profile & Settings',
      icon: Users,
      questions: [
        {
          question: 'How do I update my profile?',
          answer: 'Go to Settings > Profile to edit your information, business details, and profile picture.'
        },
        {
          question: 'Can I change my notification settings?',
          answer: 'Yes! Go to Settings > Notifications to customize which notifications you receive.'
        },
        {
          question: 'How do I change my password?',
          answer: 'Go to Settings > Security to update your password and security settings.'
        }
      ]
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: Shield,
      questions: [
        {
          question: 'Is my data secure?',
          answer: 'Yes! We use end-to-end encryption for all messages and follow industry-standard security practices.'
        },
        {
          question: 'Can I control who can contact me?',
          answer: 'Yes! Go to Settings > Privacy to control who can send you messages and view your profile.'
        },
        {
          question: 'How do I report inappropriate content?',
          answer: 'Long press on any message and select "Report" to flag inappropriate content to our moderation team.'
        }
      ]
    }
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      action: () => toast.info('Live chat feature coming soon!')
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us an email and we\'ll respond within 24 hours',
      action: () => toast.info('Email: support@chyme.com')
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us for urgent issues',
      action: () => toast.info('Phone: +1 (555) 123-CHYME')
    }
  ];

  const filteredFAQs = faqCategories.filter(category => 
    selectedCategory === 'all' || category.id === selectedCategory
  ).flatMap(category => 
    category.questions.map(q => ({
      ...q,
      category: category.title
    }))
  ).filter(faq =>
    searchTerm === '' || 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${bgSecondary} border-${borderColor} max-w-md w-[95vw] max-h-[90vh] overflow-y-auto`}>
        <DialogHeader className="px-1">
          <DialogTitle className={`text-xl ${textPrimary}`}>Help Center</DialogTitle>
        </DialogHeader>
        
        <div className="px-1 py-4 space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 ${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} ${textPrimary}`}
            />
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h3 className={`text-lg font-semibold ${textPrimary}`}>Categories</h3>
            <div className="grid grid-cols-2 gap-3">
              {faqCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      selectedCategory === category.id
                        ? 'border-red-600 bg-red-50 dark:bg-red-900/20'
                        : `${borderColor} bg-gray-50 dark:bg-gray-700`
                    }`}
                  >
                    <Icon className={`h-6 w-6 mx-auto mb-2 ${
                      selectedCategory === category.id ? 'text-red-600' : textSecondary
                    }`} />
                    <p className={`text-sm font-medium ${
                      selectedCategory === category.id ? 'text-red-600' : textPrimary
                    }`}>
                      {category.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* FAQ Results */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${textPrimary}`}>
              {searchTerm ? 'Search Results' : 'Frequently Asked Questions'}
            </h3>
            {filteredFAQs.length === 0 ? (
              <p className={`text-center py-8 ${textSecondary}`}>
                {searchTerm ? 'No results found for your search.' : 'No questions available for this category.'}
              </p>
            ) : (
              <div className="space-y-3">
                {filteredFAQs.map((faq, index) => (
                  <div key={index} className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-700`}>
                    <p className={`font-medium ${textPrimary} mb-2`}>{faq.question}</p>
                    <p className={`text-sm ${textSecondary}`}>{faq.answer}</p>
                    {faq.category && (
                      <span className={`inline-block mt-2 px-2 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-full`}>
                        {faq.category}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact Support */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${textPrimary}`}>Contact Support</h3>
            <div className="space-y-3">
              {contactOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <button
                    key={index}
                    onClick={option.action}
                    className={`w-full flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                        <Icon className="h-5 w-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="text-left">
                        <p className={`font-medium ${textPrimary}`}>{option.title}</p>
                        <p className={`text-sm ${textSecondary}`}>{option.description}</p>
                      </div>
                    </div>
                    <ChevronRight className={`h-5 w-5 ${textSecondary}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Close Button */}
          <div className="pt-4">
            <Button
              onClick={onClose}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpCenterModal;
