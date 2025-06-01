
import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Video, Phone, Eye, EyeOff, MoreVertical, Users, MapPin, Globe, MessageSquare, Search, Star, Settings, UserPlus, Bell, BellOff, Volume2, VolumeX, Pin } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { Group } from '@/types/connectPulse';

interface EnhancedChatHeaderProps {
  group: Group;
  onlineUsers: number;
  showOnlineUsers: boolean;
  onBack: () => void;
  onVideoCall: () => void;
  onAudioCall?: () => void;
  onToggleUsers: () => void;
  onSettings: () => void;
  onSearch?: () => void;
  onInvite?: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
  isNotified?: boolean;
  onToggleNotifications?: () => void;
}

const EnhancedChatHeader: React.FC<EnhancedChatHeaderProps> = ({
  group,
  onlineUsers,
  showOnlineUsers,
  onBack,
  onVideoCall,
  onAudioCall,
  onToggleUsers,
  onSettings,
  onSearch,
  onInvite,
  isMuted = false,
  onToggleMute,
  isNotified = true,
  onToggleNotifications
}) => {
  const getScopeIcon = (scope: string) => {
    switch (scope) {
      case 'local': return <MapPin className="h-4 w-4" />;
      case 'regional': return <Users className="h-4 w-4" />;
      case 'global': return <Globe className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getScopeColor = (scope: string) => {
    switch (scope) {
      case 'local': return 'bg-green-500 hover:bg-green-600';
      case 'regional': return 'bg-blue-500 hover:bg-blue-600';
      case 'global': return 'bg-purple-500 hover:bg-purple-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <CardHeader className="flex-shrink-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white border-b shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack} 
            className="text-white hover:bg-white/20 transition-all rounded-lg"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="ml-2 hidden sm:inline">Back</span>
          </Button>
          
          <div className="flex items-center gap-4">
            {/* Group Avatar */}
            <Avatar className="h-12 w-12 border-2 border-white/20 shadow-lg">
              <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
                {group.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            {/* Group Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <CardTitle className="text-xl font-bold truncate">{group.name}</CardTitle>
                <Badge 
                  className={`${getScopeColor(group.scope)} text-white flex items-center gap-1 shadow-sm transition-colors`}
                >
                  {getScopeIcon(group.scope)}
                  <span className="hidden sm:inline">{group.scope}</span>
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-blue-100">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">{group.memberCount.toLocaleString()}</span>
                  <span className="hidden sm:inline">members</span>
                </span>
                
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-sm"></div>
                  <span className="font-medium">{onlineUsers}</span>
                  <span className="hidden sm:inline">online</span>
                </span>
                
                <Badge variant="secondary" className="bg-white/20 text-white border-white/20 hidden md:flex">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Active Chat
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {/* Search */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20 transition-all rounded-lg"
            onClick={onSearch}
          >
            <Search className="h-4 w-4" />
          </Button>
          
          {/* Audio Call */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20 transition-all rounded-lg"
            onClick={onAudioCall}
          >
            <Phone className="h-4 w-4" />
          </Button>
          
          {/* Video Call */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20 transition-all rounded-lg"
            onClick={onVideoCall}
          >
            <Video className="h-4 w-4" />
          </Button>
          
          {/* Toggle Users Panel */}
          <Button 
            variant="ghost" 
            size="sm" 
            className={`text-white hover:bg-white/20 transition-all rounded-lg ${showOnlineUsers ? 'bg-white/20' : ''}`}
            onClick={onToggleUsers}
          >
            {showOnlineUsers ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          
          {/* More Options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 transition-all rounded-lg">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end">
              <DropdownMenuLabel className="font-semibold">Group Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={onInvite}>
                <UserPlus className="h-4 w-4 mr-3" />
                Invite Members
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={onSearch}>
                <Search className="h-4 w-4 mr-3" />
                Search Messages
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                <Pin className="h-4 w-4 mr-3" />
                View Pinned Messages
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="font-semibold">Preferences</DropdownMenuLabel>
              
              <DropdownMenuItem onClick={onToggleNotifications}>
                {isNotified ? <Bell className="h-4 w-4 mr-3" /> : <BellOff className="h-4 w-4 mr-3" />}
                {isNotified ? 'Disable' : 'Enable'} Notifications
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={onToggleMute}>
                {isMuted ? <Volume2 className="h-4 w-4 mr-3" /> : <VolumeX className="h-4 w-4 mr-3" />}
                {isMuted ? 'Unmute' : 'Mute'} Group
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={onSettings}>
                <Settings className="h-4 w-4 mr-3" />
                Group Settings
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                <ArrowLeft className="h-4 w-4 mr-3" />
                Leave Group
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Group Description */}
      <div className="mt-3 text-blue-100 text-sm leading-relaxed">
        <p className="truncate sm:whitespace-normal">{group.description}</p>
      </div>
    </CardHeader>
  );
};

export default EnhancedChatHeader;
