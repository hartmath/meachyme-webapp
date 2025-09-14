import React, { useState } from 'react';
import { User, Settings, Edit, Camera, MapPin, Mail, Phone, ChevronRight, Bell, Shield, HelpCircle, Info, LogOut, QrCode, Star, Archive, Bookmark, Download } from 'lucide-react';
import { toast } from 'sonner';
import ProfileEditModal from './ProfileEditModal';
import NotificationSettingsModal from './NotificationSettingsModal';
import HelpCenterModal from './HelpCenterModal';

interface ProfilesPageProps {
  isDarkTheme?: boolean;
}

const ProfilesPage = ({ isDarkTheme = true }: ProfilesPageProps) => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  
  const bgPrimary = isDarkTheme ? "bg-gray-900" : "bg-gray-50";
  const bgSecondary = isDarkTheme ? "bg-gray-800" : "bg-white";
  const textPrimary = isDarkTheme ? "text-white" : "text-gray-900";
  const textSecondary = isDarkTheme ? "text-gray-300" : "text-gray-600";
  const borderColor = isDarkTheme ? "border-gray-700" : "border-gray-200";


  const handleSettingClick = (label: string) => {
    switch (label) {
      case "QR Code":
        setShowQRCode(true);
        toast.success("QR Code generated!");
        break;
      case "Profile":
        setShowProfileEdit(true);
        break;
      case "Starred Messages":
        toast.info("Starred messages feature coming soon!");
        break;
      case "Archived Chats":
        toast.info("Archived chats feature coming soon!");
        break;
      case "Notifications":
        setShowNotificationSettings(true);
        break;
      case "Chat Settings":
        toast.info("Chat settings coming soon!");
        break;
      case "Saved Messages":
        toast.info("Saved messages feature coming soon!");
        break;
      case "Privacy":
        toast.info("Privacy settings coming soon!");
        break;
      case "Security":
        toast.info("Security settings coming soon!");
        break;
      case "Data & Storage":
        toast.info("Data management coming soon!");
        break;
      case "Help Center":
        setShowHelpCenter(true);
        break;
      case "About":
        toast.info("Chyme v1.0.0 - The messaging space for event people!");
        break;
      case "Sign Out":
        if (confirm("Are you sure you want to sign out?")) {
          toast.success("Signed out successfully!");
          // In a real app, this would call the signOut function
        }
        break;
      default:
        toast.info(`${label} feature coming soon!`);
    }
  };

  const handleProfileSave = (profileData: any) => {
    // In a real app, this would save to the database
    console.log('Profile saved:', profileData);
    toast.success('Profile updated successfully!');
  };

  const userProfile = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "Los Angeles, CA",
    position: "Event Coordinator",
    businessType: "Organizer",
    businessName: "Premier Events LA",
    bio: "Passionate event coordinator with 8+ years of experience creating unforgettable experiences. Specializing in corporate events, weddings, and music festivals. Let's make your next event extraordinary!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    coverImage: "https://picsum.photos/400/200?random=profile",
    stats: {
      events: 127,
      followers: 2840,
      following: 890
    },
    specialties: ["Corporate Events", "Weddings", "Music Festivals", "Conferences"],
    rating: 4.9,
    reviews: 156
  };

  const settingsSections = [
    {
      title: "Account",
      items: [
        { icon: QrCode, label: "QR Code", subtitle: "Share your profile" },
        { icon: User, label: "Profile", subtitle: userProfile.name },
        { icon: Star, label: "Starred Messages", subtitle: "View starred messages" },
        { icon: Archive, label: "Archived Chats", subtitle: "View archived conversations" },
      ]
    },
    {
      title: "Chats",
      items: [
        { icon: Bell, label: "Notifications", subtitle: "Manage your notifications" },
        { icon: Settings, label: "Chat Settings", subtitle: "Customize your chat experience" },
        { icon: Bookmark, label: "Saved Messages", subtitle: "View your saved messages" },
      ]
    },
    {
      title: "Privacy & Security",
      items: [
        { icon: Shield, label: "Privacy", subtitle: "Control who can see your info" },
        { icon: Settings, label: "Security", subtitle: "Two-step verification" },
        { icon: Download, label: "Data & Storage", subtitle: "Manage your data usage" },
      ]
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", subtitle: "Get help and support" },
        { icon: Info, label: "About", subtitle: "Chyme v1.0.0" },
        { icon: LogOut, label: "Sign Out", subtitle: "Sign out of your account", isDestructive: true },
      ]
    }
  ];

  return (
    <div className={`h-full ${bgPrimary} overflow-y-auto pb-20`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className={`text-2xl font-bold ${textPrimary}`}>Settings</h1>
        </div>

        {/* Profile Section */}
        <div 
          className={`${bgSecondary} rounded-lg p-4 mb-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
          onClick={() => handleSettingClick("Profile")}
        >
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-16 h-16 rounded-full"
              />
              <button 
                className="absolute -bottom-1 -right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  toast.info("Camera feature coming soon!");
                }}
              >
                <Camera className="h-3 w-3" />
              </button>
            </div>
            <div className="flex-1">
              <h2 className={`${textPrimary} text-lg font-semibold`}>{userProfile.name}</h2>
              <p className={`${textSecondary} text-sm`}>{userProfile.position}</p>
              <p className={`${textSecondary} text-xs`}>{userProfile.businessType} • {userProfile.businessName}</p>
            </div>
            <ChevronRight className={`h-5 w-5 ${textSecondary}`} />
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className={`${textSecondary} text-sm font-medium mb-3 px-1`}>{section.title}</h3>
              <div className={`${bgSecondary} rounded-lg overflow-hidden`}>
                {section.items.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    onClick={() => handleSettingClick(item.label)}
                    className={`w-full flex items-center justify-between p-4 ${
                      itemIndex !== section.items.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
                    } hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-full ${
                        item.isDestructive 
                          ? 'bg-red-100 dark:bg-red-900' 
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}>
                        <item.icon className={`h-5 w-5 ${
                          item.isDestructive 
                            ? 'text-red-600 dark:text-red-400' 
                            : textSecondary
                        }`} />
                      </div>
                      <div className="text-left">
                        <p className={`${textPrimary} font-medium`}>{item.label}</p>
                        <p className={`${textSecondary} text-sm`}>{item.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight className={`h-5 w-5 ${textSecondary}`} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Specialties */}
        <div className={`${bgSecondary} rounded-lg p-4 mt-6`}>
          <h3 className={`${textPrimary} font-semibold mb-4`}>Specialties</h3>
          <div className="flex flex-wrap gap-2">
            {userProfile.specialties.map((specialty, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 text-sm rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Business Stats */}
        <div className={`${bgSecondary} rounded-lg p-4 mt-6`}>
          <h3 className={`${textPrimary} font-semibold mb-4`}>Business Overview</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className={`text-2xl font-bold ${textPrimary}`}>{userProfile.stats.events}</p>
              <p className={`${textSecondary} text-sm`}>Events</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl font-bold ${textPrimary}`}>{userProfile.stats.followers}</p>
              <p className={`${textSecondary} text-sm`}>Followers</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl font-bold ${textPrimary}`}>{userProfile.stats.following}</p>
              <p className={`${textSecondary} text-sm`}>Following</p>
            </div>
          </div>
          
          {/* Rating */}
          <div className="flex items-center justify-center space-x-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${i < Math.floor(userProfile.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className={`${textPrimary} font-semibold`}>{userProfile.rating}</span>
            <span className={`${textSecondary} text-sm`}>({userProfile.reviews} reviews)</span>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRCode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`${bgSecondary} rounded-lg p-6 w-full max-w-sm mx-4 relative`}>
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-2xl font-bold"
              onClick={() => setShowQRCode(false)}
            >
              ×
            </button>
            <div className="text-center">
              <h3 className={`${textPrimary} text-lg font-semibold mb-4`}>Your QR Code</h3>
              <div className="bg-white p-4 rounded-lg mb-4">
                <div className="w-48 h-48 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gray-300 rounded-lg mb-2 flex items-center justify-center">
                      <QrCode className="h-16 w-16 text-gray-600" />
                    </div>
                    <p className="text-sm text-gray-600">QR Code Placeholder</p>
                  </div>
                </div>
              </div>
              <p className={`${textSecondary} text-sm mb-4`}>
                Share this QR code to let others easily find and connect with you on Chyme.
              </p>
              <button
                onClick={() => {
                  toast.success("QR Code saved to gallery!");
                  setShowQRCode(false);
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Save QR Code
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={showProfileEdit}
        onClose={() => setShowProfileEdit(false)}
        isDarkTheme={isDarkTheme}
        currentProfile={{
          name: userProfile.name,
          position: userProfile.position,
          businessName: userProfile.businessName,
          businessType: userProfile.businessType,
          bio: userProfile.bio,
          location: userProfile.location,
          phone: userProfile.phone,
          email: userProfile.email,
        }}
        onSave={handleProfileSave}
      />

      {/* Notification Settings Modal */}
      <NotificationSettingsModal
        isOpen={showNotificationSettings}
        onClose={() => setShowNotificationSettings(false)}
        isDarkTheme={isDarkTheme}
      />

      {/* Help Center Modal */}
      <HelpCenterModal
        isOpen={showHelpCenter}
        onClose={() => setShowHelpCenter(false)}
        isDarkTheme={isDarkTheme}
      />
    </div>
  );
};

export default ProfilesPage;
