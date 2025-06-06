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
  BookOpen, Award, Network, Zap, Shield, CheckCircle,
  ArrowLeft, Download, Upload, MoreHorizontal, Copy,
  Sparkles, Gift, Camera
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
  const [isProfileShared, setIsProfileShared] = useState(false);

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

  // Enhanced functionality handlers
  const handleDirectMessaging = () => {
    console.log('Opening direct messaging system');
    setShowDirectMessaging(true);
  };

  const handleConnectionRequests = () => {
    console.log('Managing connection requests');
    setConnectionRequests(0);
  };

  const handleNotifications = () => {
    console.log('Opening notification center');
    setNotifications(0);
  };

  const handleSkillsEndorsements = () => {
    console.log('Managing skills and endorsements');
  };

  const handlePrivacySettings = () => {
    console.log('Opening privacy settings');
  };

  const handleActivityAnalytics = () => {
    console.log('Viewing activity analytics');
  };

  const handlePortfolioManagement = () => {
    console.log('Managing professional portfolio');
  };

  const handleShareProfile = () => {
    navigator.clipboard.writeText(`${window.location.origin}/profile/${currentUser.id}`);
    setIsProfileShared(true);
    setTimeout(() => setIsProfileShared(false), 2000);
  };

  const handleDownloadProfile = () => {
    console.log('Downloading profile data');
  };

  const handleUploadAvatar = () => {
    console.log('Uploading new avatar');
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Enhanced Header with Better Navigation */}
        <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-lg border-0">
          <Button variant="ghost" onClick={onBack} className="gap-2 hover:bg-gray-100">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-3">
            {/* Notification Center */}
            <Button 
              variant="outline" 
              onClick={handleNotifications} 
              className="gap-2 relative hover:bg-blue-50 border-blue-200"
            >
              <Bell className="h-4 w-4" />
              Notifications
              {notifications > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                  {notifications}
                </Badge>
              )}
            </Button>
            
            {/* Direct Messages */}
            <Button 
              variant="outline" 
              onClick={handleDirectMessaging} 
              className="gap-2 hover:bg-green-50 border-green-200"
            >
              <MessageSquare className="h-4 w-4" />
              Messages
            </Button>
            
            {/* Profile Actions */}
            <Button 
              variant="outline" 
              onClick={onEditProfile} 
              className="gap-2 hover:bg-purple-50 border-purple-200"
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
            
            {/* More Options */}
            <Button variant="outline" className="px-3">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Enhanced Profile Header */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
          <CardContent className="pt-8 pb-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="relative group">
                  <Avatar className="h-32 w-32 mb-4 border-4 border-white shadow-2xl">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback className="text-2xl bg-white text-blue-600 font-bold">
                      {currentUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-white text-blue-600 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={handleUploadAvatar}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4 justify-center lg:justify-start">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {currentUser.niche}
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-100 border-green-300/30">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    Online
                  </Badge>
                  <Badge className="bg-yellow-500/20 text-yellow-100 border-yellow-300/30">
                    <Star className="w-3 h-3 mr-1" />
                    Pro Member
                  </Badge>
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6">
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text">
                      {currentUser.name}
                    </h1>
                    <p className="text-xl text-blue-100 mb-3">{currentUser.email}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-blue-100 mb-4 justify-center lg:justify-start">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {currentUser.country}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Member for {userStats.accountAge} days
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Last active: 2 hours ago
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <Button 
                      onClick={handleConnectionRequests} 
                      className="gap-2 relative bg-white text-blue-600 hover:bg-blue-50"
                    >
                      <Users className="h-4 w-4" />
                      Connections ({userStats.connections})
                      {connectionRequests > 0 && (
                        <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0">
                          {connectionRequests}
                        </Badge>
                      )}
                    </Button>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="gap-2 border-white text-white hover:bg-white hover:text-blue-600"
                        onClick={handleShareProfile}
                      >
                        {isProfileShared ? <CheckCircle className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                        {isProfileShared ? 'Copied!' : 'Share'}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-white text-white hover:bg-white hover:text-blue-600"
                        onClick={handleDownloadProfile}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Bio Section */}
                {currentUser.bio && (
                  <div className="mb-6 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      About Me
                    </h3>
                    <p className="text-blue-50 leading-relaxed">{currentUser.bio}</p>
                  </div>
                )}

                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                    <div className="text-2xl font-bold">{userStats.groupsJoined}</div>
                    <div className="text-xs text-blue-100">Communities</div>
                  </div>
                  <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                    <div className="text-2xl font-bold">{userStats.connections}</div>
                    <div className="text-xs text-blue-100">Connections</div>
                  </div>
                  <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                    <div className="text-2xl font-bold">{userStats.reputation}</div>
                    <div className="text-xs text-blue-100">Reputation</div>
                  </div>
                  <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                    <div className="text-2xl font-bold">{userStats.profileViews}</div>
                    <div className="text-xs text-blue-100">Profile Views</div>
                  </div>
                  <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                    <div className="text-2xl font-bold">{userStats.endorsements}</div>
                    <div className="text-xs text-blue-100">Endorsements</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 bg-gradient-to-br from-blue-50 to-blue-100" onClick={handleDirectMessaging}>
            <CardContent className="p-6 text-center">
              <div className="mb-4 p-4 bg-blue-100 rounded-full w-fit mx-auto group-hover:bg-blue-200 transition-colors">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-900 mb-2">Direct Messages</h3>
              <p className="text-sm text-blue-700">Private conversations & networking</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 bg-gradient-to-br from-green-50 to-green-100" onClick={handleSkillsEndorsements}>
            <CardContent className="p-6 text-center">
              <div className="mb-4 p-4 bg-green-100 rounded-full w-fit mx-auto group-hover:bg-green-200 transition-colors">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-900 mb-2">Skills & Endorsements</h3>
              <p className="text-sm text-green-700">Showcase your expertise</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 bg-gradient-to-br from-purple-50 to-purple-100" onClick={handleActivityAnalytics}>
            <CardContent className="p-6 text-center">
              <div className="mb-4 p-4 bg-purple-100 rounded-full w-fit mx-auto group-hover:bg-purple-200 transition-colors">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-purple-900 mb-2">Analytics Dashboard</h3>
              <p className="text-sm text-purple-700">Track your progress & growth</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 bg-gradient-to-br from-yellow-50 to-yellow-100" onClick={handlePortfolioManagement}>
            <CardContent className="p-6 text-center">
              <div className="mb-4 p-4 bg-yellow-100 rounded-full w-fit mx-auto group-hover:bg-yellow-200 transition-colors">
                <BookOpen className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-yellow-900 mb-2">Portfolio Manager</h3>
              <p className="text-sm text-yellow-700">Showcase your best work</p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-lg border-0 p-2 rounded-xl">
            <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
              <Activity className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="groups" className="gap-2 data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
              <Users className="h-4 w-4" />
              My Groups
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
              <TrendingUp className="h-4 w-4" />
              Activity Feed
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2 data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-700">
              <Trophy className="h-4 w-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2 data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700">
              <Star className="h-4 w-4" />
              Statistics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Enhanced Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity Highlights
                  </CardTitle>
                  <CardDescription>Your latest interactions and milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Posted in React Developers</p>
                        <p className="text-sm text-gray-600">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Users className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Joined AI Enthusiasts</p>
                        <p className="text-sm text-gray-600">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <Trophy className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium">Earned "Active Member" badge</p>
                        <p className="text-sm text-gray-600">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-20 flex-col gap-2">
                      <Edit className="h-5 w-5" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2">
                      <Settings className="h-5 w-5" />
                      Settings
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2">
                      <Shield className="h-5 w-5" />
                      Privacy
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2">
                      <Network className="h-5 w-5" />
                      Network
                    </Button>
                  </div>
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
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Achievements</h2>
              <p className="text-gray-600">Celebrate your journey and milestones on ConnectPulse</p>
            </div>
            <UserStats 
              currentUser={currentUser}
              stats={userStats}
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
