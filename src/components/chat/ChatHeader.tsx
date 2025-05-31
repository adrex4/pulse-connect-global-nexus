
import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Video, Eye, EyeOff, MoreVertical, Users, MapPin, Globe, MessageSquare } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Group } from '@/types/connectPulse';

interface ChatHeaderProps {
  group: Group;
  onlineUsers: number;
  showOnlineUsers: boolean;
  onBack: () => void;
  onVideoCall: () => void;
  onToggleUsers: () => void;
  onSettings: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  group,
  onlineUsers,
  showOnlineUsers,
  onBack,
  onVideoCall,
  onToggleUsers,
  onSettings
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
      case 'local': return 'bg-green-500';
      case 'regional': return 'bg-blue-500';
      case 'global': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <CardHeader className="flex-shrink-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="ml-2">Back to Groups</span>
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl">{group.name}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-blue-100">
                  <Badge 
                    className={`${getScopeColor(group.scope)} text-white flex items-center gap-1 hover:bg-opacity-80`}
                  >
                    {getScopeIcon(group.scope)}
                    {group.scope}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {group.memberCount.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    {onlineUsers} online
                  </span>
                </div>
              </div>
            </div>
            <p className="text-blue-100 text-sm">{group.description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20 transition-colors"
            onClick={onVideoCall}
          >
            <Video className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-white/20 transition-colors"
            onClick={onToggleUsers}
          >
            {showOnlineUsers ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 transition-colors">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem onClick={onSettings}>
                <Users className="h-4 w-4 mr-2" />
                Group Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Leave Group
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </CardHeader>
  );
};

export default ChatHeader;
