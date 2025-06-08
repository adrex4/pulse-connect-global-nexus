
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, MessageSquare, Users, Activity, Calendar, 
  MapPin, Edit, Settings, Bell, Heart, Share2,
  TrendingUp, Clock, Star, Trophy, Target, 
  BookOpen, Award, Network, Zap, Shield, Camera,
  Download, Upload, Eye, EyeOff, Globe, Lock,
  Briefcase, GraduationCap, Mail, Phone
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
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [profileData, setProfileData] = useState(currentUser);

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

  // Function handlers
  const handleDirectMessaging = () => {
    setShowDirectMessaging(true);
  };

  const handleConnectionRequests = () => {
    console.log('Managing connection requests');
  };

  const handleNotifications = () => {
    console.log('Opening notification center');
    setNotifications(0);
  };

  const handleSkillsEndorsements = () => {
    console.log('Managing skills and endorsements');
  };

  const handlePrivacySettings = () => {
    setShowSettings(true);
  };

  const handleActivityAnalytics = () => {
    console.log('Viewing activity analytics');
  };

  const handlePortfolioManagement = () => {
    console.log('Managing professional portfolio');
  };

  const handleSaveProfile = () => {
    console.log('Saving profile:', profileData);
    setShowEditProfile(false);
    onEditProfile();
  };

  // Edit Profile Dialog Component
  const EditProfileDialog = () => (
    <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Edit Profile
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profileData.avatar} />
              <AvatarFallback className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white text-xl">
                {profileData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button size="sm" className="bg-gradient-to-r from-violet-500 to-cyan-500">
                <Camera className="h-4 w-4 mr-2" />
                Change Photo
              </Button>
              <Button size="sm" variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Input
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Specialization</label>
              <Input
                value={profileData.niche}
                onChange={(e) => setProfileData(prev => ({ ...prev, niche: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Country</label>
              <Input
                value={profileData.country}
                onChange={(e) => setProfileData(prev => ({ ...prev, country: e.target.value }))}
                className="mt-1"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm font-medium">Bio</label>
            <Textarea
              value={profileData.bio || ''}
              onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
              className="mt-1"
              rows={3}
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input placeholder="+1 (555) 123-4567" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Website</label>
              <Input placeholder="https://yourwebsite.com" className="mt-1" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button onClick={() => setShowEditProfile(false)} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSaveProfile} className="flex-1 bg-gradient-to-r from-violet-500 to-cyan-500">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Settings Dialog Component
  const SettingsDialog = () => (
    <Dialog open={showSettings} onOpenChange={setShowSettings}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Privacy & Settings
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Privacy Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Profile Visibility</span>
                <Button size="sm" variant="outline">
                  <Globe className="h-4 w-4 mr-2" />
                  Public
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Contact Info</span>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Visible
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Activity Status</span>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Visible
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Message notifications</span>
                <Button size="sm" variant="default">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Group updates</span>
                <Button size="sm" variant="default">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-600">
              <Shield className="h-4 w-4 mr-2" />
              Deactivate Account
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  if (showDirectMessaging) {
    return (
      <DirectMessaging
        currentUser={currentUser}
        onBack={() => setShowDirectMessaging(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-cyan-50 to-emerald-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Enhanced Header with Notifications */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="gap-2 hover:bg-white/50">
            ← Back to App
          </Button>
          <div className="flex gap-2">
            {/* Notification Center */}
            <Button variant="outline" onClick={handleNotifications} className="gap-2 relative hover:bg-violet-50 border-violet-200">
              <Bell className="h-4 w-4" />
              Notifications
              {notifications > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-violet-500 to-cyan-500">
                  {notifications}
                </Badge>
              )}
            </Button>
            
            {/* Direct Messages */}
            <Button variant="outline" onClick={handleDirectMessaging} className="gap-2 hover:bg-violet-50 border-violet-200">
              <MessageSquare className="h-4 w-4" />
              Direct Messages
            </Button>
            
            <Button variant="outline" onClick={() => setShowEditProfile(true)} className="gap-2 hover:bg-violet-50 border-violet-200">
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
            
            {/* Privacy Settings */}
            <Button variant="outline" onClick={handlePrivacySettings} className="hover:bg-violet-50 border-violet-200">
              <Shield className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Enhanced Profile Header */}
        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="h-28 w-28 mb-4 border-4 border-white shadow-lg ring-4 ring-violet-100">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback className="text-xl bg-gradient-to-r from-violet-500 to-cyan-500 text-white">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex gap-2 mb-4">
                  <Badge variant="secondary" className="bg-gradient-to-r from-violet-100 to-cyan-100 text-violet-700">
                    {currentUser.niche}
                  </Badge>
                  <Badge className="bg-green-100 text-green-800">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                    Active
                  </Badge>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Pro
                  </Badge>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                      {currentUser.name}
                    </h1>
                    <p className="text-lg text-gray-600 mb-2 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {currentUser.email}
                    </p>
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
                  
                  {/* Connection Requests */}
                  <div className="flex flex-col gap-2">
                    <Button onClick={handleConnectionRequests} className="gap-2 relative bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600">
                      <Users className="h-4 w-4" />
                      Connections ({userStats.connections})
                      {connectionRequests > 0 && (
                        <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0">
                          {connectionRequests}
                        </Badge>
                      )}
                    </Button>
                    <Button variant="outline" className="gap-2 hover:bg-violet-50 border-violet-200">
                      <Share2 className="h-4 w-4" />
                      Share Profile
                    </Button>
                  </div>
                </div>

                {currentUser.bio && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-violet-50 to-cyan-50 rounded-lg border border-violet-100">
                    <h3 className="font-semibold mb-2 text-violet-700">About</h3>
                    <p className="text-gray-700">{currentUser.bio}</p>
                  </div>
                )}

                {/* Enhanced Quick Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">{userStats.groupsJoined}</div>
                    <div className="text-sm text-gray-600">Groups</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-sm border border-green-200">
                    <div className="text-2xl font-bold text-green-600">{userStats.connections}</div>
                    <div className="text-sm text-gray-600">Connections</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-sm border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600">{userStats.reputation}</div>
                    <div className="text-sm text-gray-600">Reputation</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg shadow-sm border border-yellow-200">
                    <div className="text-2xl font-bold text-yellow-600">{userStats.profileViews}</div>
                    <div className="text-sm text-gray-600">Profile Views</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow-sm border border-red-200">
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
          {/* Direct Messages */}
          <Card className="hover:shadow-lg transition-all cursor-pointer transform hover:scale-105 bg-white/70 backdrop-blur-sm border-0" onClick={handleDirectMessaging}>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold">Direct Messages</h3>
              <p className="text-sm text-gray-600">Private conversations</p>
            </CardContent>
          </Card>

          {/* Skills & Endorsements */}
          <Card className="hover:shadow-lg transition-all cursor-pointer transform hover:scale-105 bg-white/70 backdrop-blur-sm border-0" onClick={handleSkillsEndorsements}>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold">Skills & Endorsements</h3>
              <p className="text-sm text-gray-600">Showcase expertise</p>
            </CardContent>
          </Card>

          {/* Activity Analytics */}
          <Card className="hover:shadow-lg transition-all cursor-pointer transform hover:scale-105 bg-white/70 backdrop-blur-sm border-0" onClick={handleActivityAnalytics}>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold">Analytics</h3>
              <p className="text-sm text-gray-600">Track your progress</p>
            </CardContent>
          </Card>

          {/* Portfolio */}
          <Card className="hover:shadow-lg transition-all cursor-pointer transform hover:scale-105 bg-white/70 backdrop-blur-sm border-0" onClick={handlePortfolioManagement}>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold">Portfolio</h3>
              <p className="text-sm text-gray-600">Showcase your work</p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs */}
        <Card className="shadow-xl border-0 bg-white/70 backdrop-blur-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="p-6 pb-0">
              <TabsList className="grid w-full grid-cols-5 bg-gradient-to-r from-violet-50 to-cyan-50">
                <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">Overview</TabsTrigger>
                <TabsTrigger value="groups" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">My Groups</TabsTrigger>
                <TabsTrigger value="activity" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">Activity</TabsTrigger>
                <TabsTrigger value="achievements" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">Achievements</TabsTrigger>
                <TabsTrigger value="stats" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">Statistics</TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6 pt-0">
              <TabsContent value="overview" className="space-y-6 mt-0">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Enhanced Recent Activity */}
                  <Card className="shadow-lg border-0 bg-gradient-to-br from-white/80 to-violet-50/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-violet-600" />
                        Recent Activity
                      </CardTitle>
                      <CardDescription>Your latest interactions and achievements</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-3 p-3 hover:bg-white/50 rounded-lg transition-colors">
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
                      <Button variant="outline" className="w-full mt-4 hover:bg-violet-50 border-violet-200">
                        View All Activity
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Professional Summary */}
                  <Card className="shadow-lg border-0 bg-gradient-to-br from-white/80 to-cyan-50/50">
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
                          <div className="bg-gradient-to-r from-violet-500 to-cyan-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="text-center p-3 bg-gradient-to-r from-violet-50 to-cyan-50 rounded-lg">
                          <div className="text-lg font-bold text-gray-900">4.8</div>
                          <div className="text-xs text-gray-600">Avg Rating</div>
                        </div>
                        <div className="text-center p-3 bg-gradient-to-r from-violet-50 to-cyan-50 rounded-lg">
                          <div className="text-lg font-bold text-gray-900">92%</div>
                          <div className="text-xs text-gray-600">Response Rate</div>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full mt-4 hover:bg-violet-50 border-violet-200" onClick={() => setShowEditProfile(true)}>
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
                    <Card key={achievement.id} className={`transform hover:scale-105 transition-all ${achievement.earned ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 shadow-lg' : 'bg-gray-50 border-gray-200'}`}>
                      <CardContent className="p-4 text-center">
                        <achievement.icon className={`h-12 w-12 mx-auto mb-3 ${achievement.earned ? 'text-yellow-600' : 'text-gray-400'}`} />
                        <h3 className={`font-semibold mb-2 ${achievement.earned ? 'text-yellow-800' : 'text-gray-600'}`}>
                          {achievement.title}
                        </h3>
                        <p className={`text-sm ${achievement.earned ? 'text-yellow-700' : 'text-gray-500'}`}>
                          {achievement.description}
                        </p>
                        {achievement.earned && (
                          <Badge className="mt-2 bg-gradient-to-r from-yellow-500 to-orange-500">Earned</Badge>
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
            </div>
          </Tabs>
        </Card>

        {/* Dialogs */}
        <EditProfileDialog />
        <SettingsDialog />
      </div>
    </div>
  );
};

export default UserProfilePage;
