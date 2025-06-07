
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, Bell, MessageSquare, Edit, MoreHorizontal
} from 'lucide-react';

interface ProfileNavigationProps {
  onBack: () => void;
  onEditProfile: () => void;
  handleNotifications: () => void;
  handleDirectMessaging: () => void;
  notifications: number;
}

const ProfileNavigation: React.FC<ProfileNavigationProps> = ({
  onBack,
  onEditProfile,
  handleNotifications,
  handleDirectMessaging,
  notifications
}) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-lg border-0">
      <Button variant="ghost" onClick={onBack} className="gap-2 hover:bg-gray-100">
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Button>
      
      <div className="flex items-center gap-3">
        {/* Notification Center */}
        <Button 
          variant="outline" 
          onClick={handleNotifications} 
          className="gap-2 relative hover:bg-blue-50 border-blue-200"
        >
          <Bell className="h-4 w-4" />
          Notifications
          {notifications > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
              {notifications}
            </Badge>
          )}
        </Button>
        
        {/* Direct Messages */}
        <Button 
          variant="outline" 
          onClick={handleDirectMessaging} 
          className="gap-2 hover:bg-green-50 border-green-200"
        >
          <MessageSquare className="h-4 w-4" />
          Messages
        </Button>
        
        {/* Profile Actions */}
        <Button 
          variant="outline" 
          onClick={onEditProfile} 
          className="gap-2 hover:bg-purple-50 border-purple-200"
        >
          <Edit className="h-4 w-4" />
          Edit Profile
        </Button>
        
        {/* More Options */}
        <Button variant="outline" className="px-3">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProfileNavigation;
