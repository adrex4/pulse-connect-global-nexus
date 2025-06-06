
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, Users, Calendar, TrendingUp, Star, 
  Award, Clock, Heart, Share2, UserPlus, Search,
  Filter, ChevronDown, ChevronUp, Eye, ThumbsUp,
  MessageCircle, Bookmark
} from 'lucide-react';
import { User, Group, Message } from '@/types/connectPulse';

interface UserActivityFeedProps {
  currentUser: User;
  messages: Message[];
  groups: Group[];
}

interface ActivityItem {
  id: string;
  type: 'message' | 'group_join' | 'achievement' | 'connection' | 'like' | 'share' | 'comment' | 'view';
  title: string;
  description: string;
  timestamp: Date;
  icon: any;
  color: string;
  groupName?: string;
  messageContent?: string;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
}

const UserActivityFeed: React.FC<UserActivityFeedProps> = ({ currentUser, messages, groups }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'messages' | 'groups' | 'achievements'>('all');
  const [showAllActivity, setShowAllActivity] = useState(false);

  // Generate enhanced activity feed
  const generateActivityFeed = (): ActivityItem[] => {
    const activities: ActivityItem[] = [];

    // Add group joining activities with enhanced data
    groups.forEach((group, index) => {
      activities.push({
        id: `group-${group.id}`,
        type: 'group_join',
        title: `Joined ${group.name}`,
        description: `Connected with ${group.memberCount} members in ${group.category}`,
        timestamp: new Date(Date.now() - (index + 1) * 1000 * 60 * 60 * 24),
        icon: Users,
        color: 'text-blue-600',
        groupName: group.name,
        engagement: {
          likes: Math.floor(Math.random() * 25) + 5,
          comments: Math.floor(Math.random() * 10) + 2,
          shares: Math.floor(Math.random() * 8) + 1,
          views: Math.floor(Math.random() * 100) + 20
        }
      });
    });

    // Add message activities with engagement
    const userMessages = messages.filter(msg => msg.userId === currentUser.id);
    userMessages.slice(0, 8).forEach((message, index) => {
      const group = groups.find(g => g.id === message.groupId);
      activities.push({
        id: `message-${message.id}`,
        type: 'message',
        title: `Posted in ${group?.name || 'Community'}`,
        description: message.content.substring(0, 120) + (message.content.length > 120 ? '...' : ''),
        timestamp: message.timestamp,
        icon: MessageSquare,
        color: 'text-green-600',
        messageContent: message.content,
        groupName: group?.name,
        engagement: {
          likes: Math.floor(Math.random() * 50) + 10,
          comments: Math.floor(Math.random() * 20) + 3,
          shares: Math.floor(Math.random() * 15) + 2,
          views: Math.floor(Math.random() * 200) + 50
        }
      });
    });

    // Add enhanced achievement activities
    const achievementActivities = [
      {
        id: 'achievement-1',
        type: 'achievement' as const,
        title: 'First Message Milestone',
        description: 'Congratulations on your first contribution! Welcome to the community.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
        icon: Award,
        color: 'text-yellow-600',
        engagement: {
          likes: 15,
          comments: 5,
          shares: 3,
          views: 80
        }
      },
      {
        id: 'achievement-2',
        type: 'achievement' as const,
        title: 'Community Explorer Badge',
        description: 'Earned for joining multiple groups and actively networking with professionals.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
        icon: Star,
        color: 'text-purple-600',
        engagement: {
          likes: 28,
          comments: 8,
          shares: 6,
          views: 150
        }
      },
      {
        id: 'achievement-3',
        type: 'achievement' as const,
        title: 'Rising Contributor',
        description: 'Recognized for consistent quality contributions and community engagement.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96),
        icon: TrendingUp,
        color: 'text-indigo-600',
        engagement: {
          likes: 42,
          comments: 12,
          shares: 9,
          views: 220
        }
      }
    ];

    activities.push(...achievementActivities);

    // Sort by timestamp (newest first)
    return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  };

  const allActivities = generateActivityFeed();
  
  // Filter activities based on search and filter type
  const filteredActivities = allActivities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || activity.type.includes(filterType.slice(0, -1));
    return matchesSearch && matchesFilter;
  });

  const displayedActivities = showAllActivity ? filteredActivities : filteredActivities.slice(0, 6);

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'message': return 'bg-green-50 text-green-700 border-green-200';
      case 'group_join': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'achievement': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'connection': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'like': return 'bg-red-50 text-red-700 border-red-200';
      case 'share': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-xl">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              Your Activity Feed
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {filteredActivities.length} activities
              </Badge>
            </CardTitle>
          </div>
          
          {/* Enhanced Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search your activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-200"
              />
            </div>
            <div className="flex gap-2">
              {[
                { id: 'all', label: 'All', icon: Filter },
                { id: 'messages', label: 'Messages', icon: MessageSquare },
                { id: 'groups', label: 'Groups', icon: Users },
                { id: 'achievements', label: 'Achievements', icon: Award }
              ].map((filter) => {
                const Icon = filter.icon;
                return (
                  <Button
                    key={filter.id}
                    size="sm"
                    variant={filterType === filter.id ? 'default' : 'outline'}
                    onClick={() => setFilterType(filter.id as any)}
                    className="gap-2"
                  >
                    <Icon className="h-3 w-3" />
                    {filter.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {displayedActivities.map((activity) => {
              const IconComponent = activity.icon;
              const isExpanded = expandedItems.has(activity.id);
              
              return (
                <div 
                  key={activity.id} 
                  className={`p-6 border-2 rounded-xl hover:shadow-md transition-all duration-300 ${getActivityColor(activity.type)} hover:scale-[1.02]`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${activity.color.includes('blue') ? 'bg-blue-100' : 
                      activity.color.includes('green') ? 'bg-green-100' :
                      activity.color.includes('yellow') ? 'bg-yellow-100' :
                      activity.color.includes('red') ? 'bg-red-100' : 
                      activity.color.includes('purple') ? 'bg-purple-100' : 'bg-indigo-100'}`}>
                      <IconComponent className={`h-5 w-5 ${activity.color}`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-lg">{activity.title}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500 font-medium">
                            {formatTimeAgo(activity.timestamp)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpanded(activity.id)}
                            className="h-8 w-8 p-0"
                          >
                            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-3 leading-relaxed">
                        {isExpanded ? activity.messageContent || activity.description : activity.description}
                      </p>
                      
                      {activity.groupName && (
                        <Badge variant="outline" className="mb-3 bg-white/50">
                          <Users className="h-3 w-3 mr-1" />
                          {activity.groupName}
                        </Badge>
                      )}
                      
                      {/* Enhanced Engagement Metrics */}
                      {activity.engagement && (
                        <div className="flex items-center gap-6 pt-3 border-t border-gray-200">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Eye className="h-4 w-4" />
                            <span className="font-medium">{activity.engagement.views}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <ThumbsUp className="h-4 w-4" />
                            <span className="font-medium">{activity.engagement.likes}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MessageCircle className="h-4 w-4" />
                            <span className="font-medium">{activity.engagement.comments}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Share2 className="h-4 w-4" />
                            <span className="font-medium">{activity.engagement.shares}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="ml-auto">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {filteredActivities.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Clock className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No activities found</h3>
                <p className="text-sm">
                  {searchTerm ? 'Try adjusting your search terms' : 'Start engaging with the community to see your activity here!'}
                </p>
              </div>
            )}
            
            {filteredActivities.length > 6 && (
              <div className="text-center pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAllActivity(!showAllActivity)}
                  className="gap-2"
                >
                  {showAllActivity ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      Show All Activities ({filteredActivities.length - 6} more)
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserActivityFeed;
