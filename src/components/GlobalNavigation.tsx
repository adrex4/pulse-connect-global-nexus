
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, Users, MessageSquare, Search, 
  User, Bell, Plus, ArrowLeft
} from 'lucide-react';

interface GlobalNavigationProps {
  currentUserType?: 'business' | 'freelancer' | 'occupation_provider' | 'social_media_influencer';
  onNavigate?: (path: string) => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

const GlobalNavigation: React.FC<GlobalNavigationProps> = ({ 
  currentUserType, 
  onNavigate,
  showBackButton = false,
  onBack
}) => {
  const handleNavigation = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case 'social_media_influencer':
        return 'Creator';
      case 'occupation_provider':
        return 'Service Provider';
      case 'freelancer':
        return 'Freelancer';
      case 'business':
        return 'Business';
      default:
        return type;
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            {showBackButton && onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">ConnectPulse</h1>
              {currentUserType && (
                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                  {getUserTypeLabel(currentUserType)}
                </Badge>
              )}
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation('/')}
              className="gap-2 hover:bg-blue-50 hover:text-blue-700"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation('/groups')}
              className="relative gap-2 hover:bg-blue-50 hover:text-blue-700"
            >
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Groups</span>
              <Badge variant="destructive" className="ml-1 text-xs px-1 min-w-[1.2rem] h-5">
                12
              </Badge>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation('/profiles')}
              className="gap-2 hover:bg-blue-50 hover:text-blue-700"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Profiles</span>
            </Button>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative hover:bg-blue-50 hover:text-blue-700"
            >
              <Bell className="h-4 w-4" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              className="hover:bg-blue-50 hover:text-blue-700"
            >
              <Search className="h-4 w-4" />
            </Button>
            
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Plus className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Create</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleNavigation('/profile')}
              className="hover:bg-blue-50 hover:text-blue-700"
            >
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalNavigation;
