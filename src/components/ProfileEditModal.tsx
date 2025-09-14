import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, X } from 'lucide-react';
import { toast } from 'sonner';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkTheme?: boolean;
  currentProfile?: {
    name: string;
    position: string;
    businessName: string;
    businessType: string;
    bio: string;
    location: string;
    phone: string;
    email: string;
  };
  onSave: (profile: any) => void;
}

const ProfileEditModal = ({ 
  isOpen, 
  onClose, 
  isDarkTheme = true, 
  currentProfile,
  onSave 
}: ProfileEditModalProps) => {
  const [formData, setFormData] = useState({
    name: currentProfile?.name || '',
    position: currentProfile?.position || '',
    businessName: currentProfile?.businessName || '',
    businessType: currentProfile?.businessType || '',
    bio: currentProfile?.bio || '',
    location: currentProfile?.location || '',
    phone: currentProfile?.phone || '',
    email: currentProfile?.email || '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Call the parent's save function which handles database operations
      onSave(formData);
      onClose();
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const bgSecondary = isDarkTheme ? "bg-gray-800" : "bg-white";
  const textPrimary = isDarkTheme ? "text-white" : "text-gray-900";
  const textSecondary = isDarkTheme ? "text-gray-300" : "text-gray-600";
  const borderColor = isDarkTheme ? "border-gray-700" : "border-gray-200";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${bgSecondary} border-${borderColor} max-w-md w-[95vw] max-h-[90vh] overflow-y-auto`}>
        <DialogHeader className="px-1">
          <DialogTitle className={`text-xl ${textPrimary}`}>Edit Profile</DialogTitle>
        </DialogHeader>
        
        <div className="px-1 py-4 space-y-6">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <Camera className="h-8 w-8 text-gray-500" />
              </div>
              <button className="absolute -bottom-1 -right-1 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <p className={`text-sm ${textSecondary}`}>Tap to change profile picture</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className={`text-sm font-medium ${textPrimary}`}>Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} ${textPrimary}`}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="position" className={`text-sm font-medium ${textPrimary}`}>Position</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                className={`${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} ${textPrimary}`}
                placeholder="e.g., Event Coordinator"
              />
            </div>

            <div>
              <Label htmlFor="businessName" className={`text-sm font-medium ${textPrimary}`}>Business Name</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                className={`${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} ${textPrimary}`}
                placeholder="Enter your business name"
              />
            </div>

            <div>
              <Label htmlFor="businessType" className={`text-sm font-medium ${textPrimary}`}>Business Type</Label>
              <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                <SelectTrigger className={`${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} ${textPrimary}`}>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent className={bgSecondary}>
                  <SelectItem value="Organizer">Event Organizer</SelectItem>
                  <SelectItem value="Vendor">Vendor</SelectItem>
                  <SelectItem value="Venue Owner">Venue Owner</SelectItem>
                  <SelectItem value="Attendee">Attendee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location" className={`text-sm font-medium ${textPrimary}`}>Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className={`${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} ${textPrimary}`}
                placeholder="City, State"
              />
            </div>

            <div>
              <Label htmlFor="phone" className={`text-sm font-medium ${textPrimary}`}>Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} ${textPrimary}`}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <Label htmlFor="email" className={`text-sm font-medium ${textPrimary}`}>Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} ${textPrimary}`}
                placeholder="your@email.com"
              />
            </div>

            <div>
              <Label htmlFor="bio" className={`text-sm font-medium ${textPrimary}`}>Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className={`${isDarkTheme ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} ${textPrimary}`}
                placeholder="Tell us about yourself..."
                rows={3}
              />
            </div>
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
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditModal;
