
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, Users, Heart, Share2, Trophy, 
  Calendar, Search, Filter, Clock
} from 'lucide-react';
import { User, Group, Message } from '@/types/connectPulse';

interface UserActivityFeedProps {
  currentUser: User;
  messages: Message[];
  groups: Group[];
}

const UserActivityFeed: React.FC<UserActivityFeedProps> = ({ currentUser, messages, groups }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Generate activity feed
  const activities = [
    {
      id: '1',
      type: 'message',
      title: 'Posted in React Developers Group',
      description: 'Shared insights about React 18 features and best practices for modern web development.',
      time: '2 hours ago',
      icon: MessageSquare,
      group: 'React Developers',
      engagement: { likes: 12, replies: 5 }
    },
    {
      id: '2',
      type: 'group_join',
      title: 'Joined Vue.js Enthusiasts',
      description: 'Became a member of the Vue.js community to learn about Vue 3 and composition API.',
      time: '5 hours ago',
      icon: Users,
      group: 'Vue.js Enthusiasts',
      engagement: null
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Earned "Helpful Member" Badge',
      description: 'Received recognition for providing valuable assistance to community members.',
      time: '1 day ago',
      icon: Trophy,
      group: null,
      engagement: null
    },
    {
      id: '4',
      type: 'message',
      title: 'Posted in Web Design Trends',
      description: 'Discussed the latest design trends and shared portfolio examples.',
      time: '2 days ago',
      icon: MessageSquare,
      group: 'Web Design Trends',
      engagement: { likes: 8, replies: 3 }
    },
    {
      id: '5',
      type: 'like',
      title: 'Liked 5 posts',
      description: 'Engaged with community content about JavaScript frameworks and tools.',
      time: '3 days ago',
      icon: Heart,
      group: null,
      engagement: null
    },
    {
      id: '6',
      type: 'group_create',
      title: 'Created TypeScript Masters Group',
      description: 'Started a new community focused on advanced TypeScript development.',
      time: '1 week ago',
      icon: Users,
      group: 'TypeScript Masters',
      engagement: { members: 45 }
    }
  ];

  const filteredActivities = activities.filter(activity => {
    const matchesFilter = filter === 'all' || activity.type === filter;
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'message': return 'text-blue-600 bg-blue-100';
      case 'group_join': return 'text-green-600 bg-green-100';
      case 'achievement': return 'text-yellow-600 bg-yellow-100';
      case 'like': return 'text-pink-600 bg-pink-100';
      case 'group_create': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All Activity' },
    { value: 'message', label: 'Messages' },
    { value: 'group_join', label: 'Group Joins' },
    { value: 'achievement', label: 'Achievements' },
    { value: 'like', label: 'Likes' },
  ];

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search activity..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={filter === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <div className="space-y-4">
        {filteredActivities.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No activities found matching your filters.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredActivities.map((activity) => (
            <Card key={activity.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className={`p-3 rounded-full ${getActivityColor(activity.type)}`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                        {activity.group && (
                          <Badge variant="outline" className="mt-1">
                            {activity.group}
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{activity.description}</p>
                    
                    {activity.engagement && (
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {activity.engagement.likes && (
                          <span className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            {activity.engagement.likes} likes
                          </span>
                        )}
                        {activity.engagement.replies && (
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {activity.engagement.replies} replies
                          </span>
                        )}
                        {activity.engagement.members && (
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {activity.engagement.members} members
                          </span>
                        )}
                        <Button variant="ghost" size="sm" className="ml-auto">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Load More */}
      {filteredActivities.length > 0 && (
        <div className="text-center">
          <Button variant="outline">
            Load More Activity
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserActivityFeed;
