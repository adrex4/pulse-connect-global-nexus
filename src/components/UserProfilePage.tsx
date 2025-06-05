
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, MessageSquare, Users, Activity, Calendar, 
  MapPin, Edit, Settings, Bell, Heart, Share2,
  TrendingUp, Clock, Star, Trophy
} from 'lucide-react';
import { User as UserType, Group, Message } from '@/types/connectPulse';
import DirectMessaging from './enhanced/DirectMessaging';
import UserActivityFeed from './profile/UserActivityFeed';
import UserStats from './profile/UserStats';
import JoinedGroupsList from './profile/JoinedGroupsList';

interface UserProfilePageProps {
  currentUser: UserType;
  joinedGroups: Group[];
  messages: Message[];
  onBack: () => void;
  onEditProfile: () => void;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({
  currentUser,
  joinedGroups,
  messages,
  onBack,
  onEditProfile
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showDirectMessaging, setShowDirectMessaging] = useState(false);

  // Calculate user statistics
  const userStats = {
    groupsJoined: joinedGroups.length,
    messagesPosted: messages.filter(m => m.userId === currentUser.id).length,
    accountAge: Math.floor((Date.now() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24)),
    activeToday: true,
    reputation: 850,
    achievements: 12
  };

  // Recent activity data
  const recentActivity = [
    {
      id: '1',
      type: 'group_join',
      title: 'Joined Web Developers Community',
      time: '2 hours ago',
      icon: Users
    },
    {
      id: '2',
      type: 'message',
      title: 'Posted in React Experts Group',
      time: '4 hours ago',
      icon: MessageSquare
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Earned "Active Member" badge',
      time: '1 day ago',
      icon: Trophy
    },
    {
      id: '4',
      type: 'like',
      title: 'Received 5 likes on your post',
      time: '2 days ago',
      icon: Heart
    }
  ];

  if (showDirectMessaging) {
    return (
      <DirectMessaging
        currentUser={currentUser}
        onBack={() => setShowDirectMessaging(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            ← Back to App
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowDirectMessaging(true)} className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Direct Messages
            </Button>
            <Button variant="outline" onClick={onEditProfile} className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback className="text-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex gap-2">
                  <Badge variant="secondary">{currentUser.niche}</Badge>
                  {userStats.activeToday && (
                    <Badge className="bg-green-100 text-green-800">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                      Active
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentUser.name}</h1>
                    <p className="text-gray-600 mb-2">{currentUser.email}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {currentUser.country}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Member for {userStats.accountAge} days
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Share2 className="h-4 w-4" />
                      Share Profile
                    </Button>
                  </div>
                </div>

                {currentUser.bio && (
                  <p className="text-gray-700 mb-4">{currentUser.bio}</p>
                )}

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{userStats.groupsJoined}</div>
                    <div className="text-sm text-gray-600">Groups Joined</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{userStats.messagesPosted}</div>
                    <div className="text-sm text-gray-600">Messages Posted</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{userStats.reputation}</div>
                    <div className="text-sm text-gray-600">Reputation</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{userStats.achievements}</div>
                    <div className="text-sm text-gray-600">Achievements</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="groups">My Groups</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <activity.icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4">
                    View All Activity
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Frequently used features</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="h-16 flex-col gap-2"
                    onClick={() => setShowDirectMessaging(true)}
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span className="text-xs">Messages</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <Users className="h-5 w-5" />
                    <span className="text-xs">Find Groups</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2" onClick={onEditProfile}>
                    <Edit className="h-5 w-5" />
                    <span className="text-xs">Edit Profile</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col gap-2">
                    <Bell className="h-5 w-5" />
                    <span className="text-xs">Notifications</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="groups">
            <JoinedGroupsList 
              groups={joinedGroups}
              currentUser={currentUser}
            />
          </TabsContent>

          <TabsContent value="activity">
            <UserActivityFeed 
              currentUser={currentUser}
              messages={messages}
              groups={joinedGroups}
            />
          </TabsContent>

          <TabsContent value="stats">
            <UserStats 
              currentUser={currentUser}
              stats={userStats}
              messages={messages}
              groups={joinedGroups}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfilePage;
