
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, Users, MessageSquare, Search, 
  User, Settings, Bell, Plus
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface GlobalNavigationProps {
  currentUserType?: 'business' | 'freelancer' | 'occupation_provider' | 'social_media_influencer';
  onNavigate?: (path: string) => void;
}

const GlobalNavigation: React.FC<GlobalNavigationProps> = ({ currentUserType, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { 
      path: '/', 
      icon: Home, 
      label: 'Home', 
      badge: null 
    },
    { 
      path: '/groups', 
      icon: MessageSquare, 
      label: 'Groups', 
      badge: '12' 
    },
    { 
      path: '/profiles', 
      icon: Users, 
      label: 'Profiles', 
      badge: null 
    }
  ];

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">ConnectPulse</h1>
            {currentUserType && (
              <Badge variant="outline" className="text-xs">
                {currentUserType.replace('_', ' ')}
              </Badge>
            )}
          </div>

          {/* Main Navigation */}
          <nav className="flex items-center gap-1">
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item.path)}
                className="relative gap-2"
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
                {item.badge && (
                  <Badge variant="destructive" className="ml-1 text-xs px-1 min-w-[1.2rem] h-5">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Create</span>
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalNavigation;
