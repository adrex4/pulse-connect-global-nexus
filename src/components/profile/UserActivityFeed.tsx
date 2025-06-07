
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageSquare, Users, Calendar, TrendingUp, Star, 
  Award, Clock, Heart, Share2, UserPlus
} from 'lucide-react';
import { User, Group, Message } from '@/types/connectPulse';

interface UserActivityFeedProps {
  currentUser: User;
  messages: Message[];
  groups: Group[];
}

interface ActivityItem {
  id: string;
  type: 'message' | 'group_join' | 'achievement' | 'connection' | 'like' | 'share';
  title: string;
  description: string;
  timestamp: Date;
  icon: any;
  color: string;
  groupName?: string;
  messageContent?: string;
}

const UserActivityFeed: React.FC<UserActivityFeedProps> = ({ currentUser, messages, groups }) => {
  // Generate activity feed based on user data
  const generateActivityFeed = (): ActivityItem[] => {
    const activities: ActivityItem[] = [];

    // Add group joining activities
    groups.forEach((group, index) => {
      activities.push({
        id: `group-${group.id}`,
        type: 'group_join',
        title: `Joined ${group.name}`,
        description: `Connected with ${group.memberCount} members in this community`,
        timestamp: new Date(Date.now() - (index + 1) * 1000 * 60 * 60 * 24),
        icon: Users,
        color: 'text-blue-600',
        groupName: group.name
      });
    });

    // Add message activities
    const userMessages = messages.filter(msg => msg.userId === currentUser.id);
    userMessages.slice(0, 5).forEach((message, index) => {
      const group = groups.find(g => g.id === message.groupId);
      activities.push({
        id: `message-${message.id}`,
        type: 'message',
        title: `Posted in ${group?.name || 'Community'}`,
        description: message.content.substring(0, 100) + (message.content.length > 100 ? '...' : ''),
        timestamp: message.timestamp,
        icon: MessageSquare,
        color: 'text-green-600',
        messageContent: message.content,
        groupName: group?.name
      });
    });

    // Add achievement activities
    const achievementActivities = [
      {
        id: 'achievement-1',
        type: 'achievement' as const,
        title: 'First Message Posted',
        description: 'Congratulations on your first contribution to the community!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
        icon: Award,
        color: 'text-yellow-600'
      },
      {
        id: 'achievement-2',
        type: 'achievement' as const,
        title: 'Community Explorer',
        description: 'Joined multiple groups and started networking',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
        icon: Star,
        color: 'text-purple-600'
      }
    ];

    activities.push(...achievementActivities);

    // Sort by timestamp (newest first)
    return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  };

  const activityFeed = generateActivityFeed();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'message': return MessageSquare;
      case 'group_join': return Users;
      case 'achievement': return Award;
      case 'connection': return UserPlus;
      case 'like': return Heart;
      case 'share': return Share2;
      default: return Clock;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'message': return 'bg-green-100 text-green-600';
      case 'group_join': return 'bg-blue-100 text-blue-600';
      case 'achievement': return 'bg-yellow-100 text-yellow-600';
      case 'connection': return 'bg-purple-100 text-purple-600';
      case 'like': return 'bg-red-100 text-red-600';
      case 'share': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Your Activity Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activityFeed.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{activity.title}</h4>
                      <span className="text-sm text-gray-500">
                        {activity.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                    {activity.groupName && (
                      <Badge variant="outline" className="text-xs">
                        {activity.groupName}
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
            
            {activityFeed.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No recent activity</p>
                <p className="text-sm">Start engaging with the community to see your activity here!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserActivityFeed;
