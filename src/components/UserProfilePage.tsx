
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, MessageSquare, Users, Activity, Calendar, 
  MapPin, Edit, Settings, Bell, Heart, Share2,
  TrendingUp, Clock, Star, Trophy, Target, 
  BookOpen, Award, Network, Zap, Shield
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
  const [notifications, setNotifications] = useState(3);
  const [connectionRequests, setConnectionRequests] = useState(5);

  // Calculate enhanced user statistics
  const userStats = {
    groupsJoined: joinedGroups.length,
    messagesPosted: messages.filter(m => m.userId === currentUser.id).length,
    accountAge: Math.floor((Date.now() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24)),
    activeToday: true,
    reputation: 850,
    achievements: 12,
    connections: 127,
    profileViews: 245,
    endorsements: 18,
    skillsRated: 8
  };

  // Enhanced activity data
  const recentActivity = [
    {
      id: '1',
      type: 'group_join',
      title: 'Joined Web Developers Community',
      description: 'Connected with 500+ developers',
      time: '2 hours ago',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      id: '2',
      type: 'message',
      title: 'Posted in React Experts Group',
      description: 'Shared insights about React 18 features',
      time: '4 hours ago',
      icon: MessageSquare,
      color: 'text-green-600'
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Earned "Active Member" badge',
      description: 'Reached 100 community interactions',
      time: '1 day ago',
      icon: Trophy,
      color: 'text-yellow-600'
    },
    {
      id: '4',
      type: 'like',
      title: 'Received 15 endorsements',
      description: 'Your expertise was recognized',
      time: '2 days ago',
      icon: Heart,
      color: 'text-red-600'
    },
    {
      id: '5',
      type: 'connection',
      title: 'New connection with Sarah Johnson',
      description: 'Now connected via Tech Innovators group',
      time: '3 days ago',
      icon: Network,
      color: 'text-purple-600'
    }
  ];

  // Professional achievements
  const achievements = [
    { id: 1, title: 'Community Leader', description: 'Led 5+ group discussions', icon: Trophy, earned: true },
    { id: 2, title: 'Mentor', description: 'Helped 10+ community members', icon: Award, earned: true },
    { id: 3, title: 'Expert Contributor', description: 'Made 50+ valuable posts', icon: Star, earned: true },
    { id: 4, title: 'Network Builder', description: 'Connected 100+ professionals', icon: Network, earned: true },
    { id: 5, title: 'Knowledge Sharer', description: 'Shared 25+ resources', icon: BookOpen, earned: false },
    { id: 6, title: 'Innovation Champion', description: 'Pioneered new ideas', icon: Zap, earned: false }
  ];

  // Function 1: Direct Messaging System
  const handleDirectMessaging = () => {
    setShowDirectMessaging(true);
  };

  // Function 2: Connection Management
  const handleConnectionRequests = () => {
    console.log('Managing connection requests');
    // Implementation for connection management
  };

  // Function 3: Notification Center
  const handleNotifications = () => {
    console.log('Opening notification center');
    setNotifications(0);
  };

  // Function 4: Skills & Endorsements
  const handleSkillsEndorsements = () => {
    console.log('Managing skills and endorsements');
  };

  // Function 5: Privacy & Security Settings
  const handlePrivacySettings = () => {
    console.log('Opening privacy settings');
  };

  // Function 6: Activity Analytics
  const handleActivityAnalytics = () => {
    console.log('Viewing activity analytics');
  };

  // Function 7: Professional Portfolio
  const handlePortfolioManagement = () => {
    console.log('Managing professional portfolio');
  };

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
        {/* Enhanced Header with Notifications */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            ← Back to App
          </Button>
          <div className="flex gap-2">
            {/* Function 3: Notification Center */}
            <Button variant="outline" onClick={handleNotifications} className="gap-2 relative">
              <Bell className="h-4 w-4" />
              Notifications
              {notifications > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>
            
            {/* Function 1: Direct Messages */}
            <Button variant="outline" onClick={handleDirectMessaging} className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Direct Messages
            </Button>
            
            <Button variant="outline" onClick={onEditProfile} className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
            
            {/* Function 5: Privacy Settings */}
            <Button variant="outline" onClick={handlePrivacySettings}>
              <Shield className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Enhanced Profile Header */}
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="h-28 w-28 mb-4 border-4 border-white shadow-lg">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback className="text-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex gap-2 mb-4">
                  <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100">
                    {currentUser.niche}
                  </Badge>
                  <Badge className="bg-green-100 text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                    Active
                  </Badge>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <Star className="w-3 h-3 mr-1" />
                    Pro
                  </Badge>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{currentUser.name}</h1>
                    <p className="text-lg text-gray-600 mb-2">{currentUser.email}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {currentUser.country}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Member for {userStats.accountAge} days
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Last active: 2 hours ago
                      </div>
                    </div>
                  </div>
                  
                  {/* Function 2: Connection Requests */}
                  <div className="flex flex-col gap-2">
                    <Button onClick={handleConnectionRequests} className="gap-2 relative">
                      <Users className="h-4 w-4" />
                      Connections ({userStats.connections})
                      {connectionRequests > 0 && (
                        <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0">
                          {connectionRequests}
                        </Badge>
                      )}
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Share2 className="h-4 w-4" />
                      Share Profile
                    </Button>
                  </div>
                </div>

                {currentUser.bio && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">About</h3>
                    <p className="text-gray-700">{currentUser.bio}</p>
                  </div>
                )}

                {/* Enhanced Quick Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{userStats.groupsJoined}</div>
                    <div className="text-sm text-gray-600">Groups</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{userStats.connections}</div>
                    <div className="text-sm text-gray-600">Connections</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{userStats.reputation}</div>
                    <div className="text-sm text-gray-600">Reputation</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{userStats.profileViews}</div>
                    <div className="text-sm text-gray-600">Profile Views</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{userStats.endorsements}</div>
                    <div className="text-sm text-gray-600">Endorsements</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Function Buttons */}
        <div className="grid md:grid-cols-4 gap-4">
          {/* Function 1: Direct Messages */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleDirectMessaging}>
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold">Direct Messages</h3>
              <p className="text-sm text-gray-600">Private conversations</p>
            </CardContent>
          </Card>

          {/* Function 4: Skills & Endorsements */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleSkillsEndorsements}>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold">Skills & Endorsements</h3>
              <p className="text-sm text-gray-600">Showcase expertise</p>
            </CardContent>
          </Card>

          {/* Function 6: Activity Analytics */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleActivityAnalytics}>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <h3 className="font-semibold">Analytics</h3>
              <p className="text-sm text-gray-600">Track your progress</p>
            </CardContent>
          </Card>

          {/* Function 7: Portfolio */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handlePortfolioManagement}>
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
              <h3 className="font-semibold">Portfolio</h3>
              <p className="text-sm text-gray-600">Showcase your work</p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="groups">My Groups</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Enhanced Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Your latest interactions and achievements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className={`p-2 rounded-full ${activity.color.includes('blue') ? 'bg-blue-100' : 
                        activity.color.includes('green') ? 'bg-green-100' :
                        activity.color.includes('yellow') ? 'bg-yellow-100' :
                        activity.color.includes('red') ? 'bg-red-100' : 'bg-purple-100'}`}>
                        <activity.icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.description}</p>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4">
                    View All Activity
                  </Button>
                </CardContent>
              </Card>

              {/* Professional Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Professional Summary</CardTitle>
                  <CardDescription>Your professional journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Profile Completeness</span>
                      <span className="text-sm text-gray-600">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">4.8</div>
                      <div className="text-xs text-gray-600">Avg Rating</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">92%</div>
                      <div className="text-xs text-gray-600">Response Rate</div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4" onClick={onEditProfile}>
                    Complete Profile
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

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={`${achievement.earned ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200' : 'bg-gray-50 border-gray-200'}`}>
                  <CardContent className="p-4 text-center">
                    <achievement.icon className={`h-12 w-12 mx-auto mb-3 ${achievement.earned ? 'text-yellow-600' : 'text-gray-400'}`} />
                    <h3 className={`font-semibold mb-2 ${achievement.earned ? 'text-yellow-800' : 'text-gray-600'}`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm ${achievement.earned ? 'text-yellow-700' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>
                    {achievement.earned && (
                      <Badge className="mt-2 bg-yellow-600">Earned</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
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
