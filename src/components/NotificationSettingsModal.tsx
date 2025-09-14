import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Bell, MessageCircle, Calendar, Phone } from 'lucide-react';
import { toast } from 'sonner';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkTheme?: boolean;
}

const NotificationSettingsModal = ({ isOpen, onClose, isDarkTheme = true }: NotificationSettingsModalProps) => {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    messageNotifications: true,
    eventNotifications: true,
    callNotifications: true,
    emailNotifications: false,
    soundEnabled: true,
    vibrationEnabled: true,
    showPreview: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Notification settings updated!');
      onClose();
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setIsLoading(false);
    }
  };

  const bgSecondary = isDarkTheme ? "bg-gray-800" : "bg-white";
  const textPrimary = isDarkTheme ? "text-white" : "text-gray-900";
  const textSecondary = isDarkTheme ? "text-gray-300" : "text-gray-600";
  const borderColor = isDarkTheme ? "border-gray-700" : "border-gray-200";

  const notificationTypes = [
    {
      icon: Bell,
      title: "Push Notifications",
      description: "Receive notifications on your device",
      setting: "pushNotifications"
    },
    {
      icon: MessageCircle,
      title: "Message Notifications",
      description: "Get notified about new messages",
      setting: "messageNotifications"
    },
    {
      icon: Calendar,
      title: "Event Notifications",
      description: "Updates about events and bookings",
      setting: "eventNotifications"
    },
    {
      icon: Phone,
      title: "Call Notifications",
      description: "Notifications for incoming calls",
      setting: "callNotifications"
    }
  ];

  const otherSettings = [
    {
      title: "Email Notifications",
      description: "Receive notifications via email",
      setting: "emailNotifications"
    },
    {
      title: "Sound",
      description: "Play sound for notifications",
      setting: "soundEnabled"
    },
    {
      title: "Vibration",
      description: "Vibrate for notifications",
      setting: "vibrationEnabled"
    },
    {
      title: "Show Preview",
      description: "Show message preview in notifications",
      setting: "showPreview"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${bgSecondary} border-${borderColor} max-w-md w-[95vw] max-h-[90vh] overflow-y-auto`}>
        <DialogHeader className="px-1">
          <DialogTitle className={`text-xl ${textPrimary}`}>Notification Settings</DialogTitle>
        </DialogHeader>
        
        <div className="px-1 py-4 space-y-6">
          {/* Notification Types */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${textPrimary}`}>Notification Types</h3>
            {notificationTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                      <Icon className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <p className={`font-medium ${textPrimary}`}>{type.title}</p>
                      <p className={`text-sm ${textSecondary}`}>{type.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings[type.setting as keyof typeof settings]}
                    onCheckedChange={(value) => handleSettingChange(type.setting, value)}
                  />
                </div>
              );
            })}
          </div>

          {/* Other Settings */}
          <div className="space-y-4">
            <h3 className={`text-lg font-semibold ${textPrimary}`}>Other Settings</h3>
            {otherSettings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className={`font-medium ${textPrimary}`}>{setting.title}</p>
                  <p className={`text-sm ${textSecondary}`}>{setting.description}</p>
                </div>
                <Switch
                  checked={settings[setting.setting as keyof typeof settings]}
                  onCheckedChange={(value) => handleSettingChange(setting.setting, value)}
                />
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-red-600 hover:bg-red-700"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationSettingsModal;
