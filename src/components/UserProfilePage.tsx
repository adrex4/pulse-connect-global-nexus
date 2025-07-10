import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, Edit, MessageSquare, Users, MapPin, 
  Globe, Star, Calendar, Clock, Plus, Eye,
  Briefcase, Award, TrendingUp, Activity, Search
} from 'lucide-react';
import { User, Group, Message } from '@/types/connectPulse';

interface UserProfilePageProps {
  currentUser: User;
  joinedGroups: Group[];
  messages: Message[];
  onBack: () => void;
  onEditProfile: () => void;
  onPostOpportunity?: () => void;
  onExploreGroups?: () => void;
  onStartConversations?: () => void;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ 
  currentUser, 
  joinedGroups, 
  messages, 
  onBack, 
  onEditProfile,
  onPostOpportunity,
  onExploreGroups,
  onStartConversations
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Group messages by group for display
  const messagesByGroup = messages.reduce((acc, message) => {
    if (!acc[message.groupId]) {
      acc[message.groupId] = [];
    }
    acc[message.groupId].push(message);
    return acc;
  }, {} as Record<string, Message[]>);

  // Calculate profile stats
  const profileStats = {
    groupsJoined: joinedGroups.length,
    messagesPosted: messages.length,
    connectionsCount: Math.floor(Math.random() * 500) + 50, // Demo data
    profileViews: Math.floor(Math.random() * 1000) + 100 // Demo data
  };

  // Recent activity (demo data)
  const recentActivity = [
    {
      id: '1',
      type: 'message',
      description: 'Posted in Web Developers Community',
      time: '2 hours ago',
      icon: MessageSquare
    },
    {
      id: '2',
      type: 'join',
      description: 'Joined Digital Marketing Experts',
      time: '1 day ago',
      icon: Users
    },
    {
      id: '3',
      type: 'profile',
      description: 'Updated profile information',
      time: '3 days ago',
      icon: Edit
    }
  ];

  const handleExploreGroups = () => {
    if (onExploreGroups) {
      onExploreGroups();
    } else {
      // Default action - could navigate to groups section
      setActiveTab('groups');
    }
  };

  const handleStartConversations = () => {
    if (onStartConversations) {
      onStartConversations();
    } else {
      // Default action - could open messaging interface
      alert('Opening messaging interface...');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-cyan-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">My Profile</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onPostOpportunity && (
                <Button 
                  onClick={onPostOpportunity}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Post Opportunity
                </Button>
              )}
              <Button 
                onClick={onEditProfile}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl">
                      {currentUser.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentUser.name}</h2>
                  <p className="text-lg text-indigo-600 font-medium mb-2">{currentUser.niche}</p>
                  
                  <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>{currentUser.country}</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      <Globe className="h-3 w-3 mr-1" />
                      {currentUser.preferredScope}
                    </Badge>
                  </div>

                  {currentUser.bio && (
                    <p className="text-gray-600 text-sm leading-relaxed">{currentUser.bio}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                  Profile Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">{profileStats.groupsJoined}</div>
                    <div className="text-sm text-gray-600">Groups Joined</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{profileStats.messagesPosted}</div>
                    <div className="text-sm text-gray-600">Messages Posted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{profileStats.connectionsCount}</div>
                    <div className="text-sm text-gray-600">Connections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{profileStats.profileViews}</div>
                    <div className="text-sm text-gray-600">Profile Views</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-indigo-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="p-2 bg-indigo-50 rounded-lg">
                        <activity.icon className="h-4 w-4 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Tabs Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="groups">My Groups</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Welcome Message */}
                <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-2">Welcome to ConnectPulse, {currentUser.name}! 🎉</h3>
                    <p className="opacity-90 mb-4">
                      You're all set up and ready to connect with amazing professionals in your field. 
                      Start exploring groups, sharing your expertise, and building meaningful relationships.
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        Profile Complete
                      </Badge>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        {joinedGroups.length} Groups Joined
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                    <CardDescription>Get started with these common activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button 
                        variant="outline" 
                        className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200"
                        onClick={handleExploreGroups}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <Search className="h-5 w-5 text-blue-600" />
                          <span className="font-medium">Explore Groups</span>
                        </div>
                        <span className="text-sm text-gray-600 text-left">
                          Discover new communities in your field and connect with like-minded professionals
                        </span>
                      </Button>

                      {onPostOpportunity && (
                        <Button 
                          variant="outline" 
                          className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-green-50 hover:border-green-200 transition-all duration-200"
                          onClick={onPostOpportunity}
                        >
                          <div className="flex items-center gap-2 w-full">
                            <Plus className="h-5 w-5 text-green-600" />
                            <span className="font-medium">Post Opportunity</span>
                          </div>
                          <span className="text-sm text-gray-600 text-left">
                            Share job openings, collaborations, or services with the community
                          </span>
                        </Button>
                      )}

                      <Button 
                        variant="outline" 
                        className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-purple-50 hover:border-purple-200 transition-all duration-200"
                        onClick={onEditProfile}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <Edit className="h-5 w-5 text-purple-600" />
                          <span className="font-medium">Update Profile</span>
                        </div>
                        <span className="text-sm text-gray-600 text-left">
                          Keep your information current and showcase your latest achievements
                        </span>
                      </Button>

                      <Button 
                        variant="outline" 
                        className="h-auto p-4 flex flex-col items-start gap-2 hover:bg-orange-50 hover:border-orange-200 transition-all duration-200"
                        onClick={handleStartConversations}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <MessageSquare className="h-5 w-5 text-orange-600" />
                          <span className="font-medium">Start Conversations</span>
                        </div>
                        <span className="text-sm text-gray-600 text-left">
                          Engage with your groups and network with other professionals
                        </span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Profile Completion Tips */}
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      Profile Enhancement Tips
                    </CardTitle>
                    <CardDescription>Make your profile stand out</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-green-800">Complete your bio</p>
                          <p className="text-sm text-green-700">Share your story and expertise to attract connections</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-blue-800">Join relevant groups</p>
                          <p className="text-sm text-blue-700">Connect with professionals in your industry</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-purple-800">Share opportunities</p>
                          <p className="text-sm text-purple-700">Help others while building your reputation</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="groups" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="h-5 w-5 text-indigo-600" />
                      My Groups ({joinedGroups.length})
                    </CardTitle>
                    <CardDescription>Groups you're actively participating in</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {joinedGroups.length > 0 ? (
                      <div className="grid gap-4">
                        {joinedGroups.map((group) => (
                          <div key={group.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 mb-1">{group.name}</h4>
                                <p className="text-sm text-gray-600 mb-2">{group.description}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    {group.memberCount.toLocaleString()} members
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Globe className="h-3 w-3" />
                                    {group.scope}
                                  </span>
                                  {group.category && (
                                    <Badge variant="outline" className="text-xs">
                                      {group.category}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <Button size="sm" variant="outline">
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Chat
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No groups joined yet</h3>
                        <p className="text-gray-600 mb-4">Start by exploring and joining groups that match your interests.</p>
                        <Button onClick={handleExploreGroups}>
                          <Users className="h-4 w-4 mr-2" />
                          Explore Groups
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-indigo-600" />
                      My Messages ({messages.length})
                    </CardTitle>
                    <CardDescription>Your recent messages across all groups</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {messages.length > 0 ? (
                      <div className="space-y-4">
                        {messages.slice(0, 5).map((message) => {
                          const group = joinedGroups.find(g => g.id === message.groupId);
                          return (
                            <div key={message.id} className="p-4 border border-gray-200 rounded-lg">
                              <div className="flex items-start gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-indigo-100 text-indigo-600 text-sm">
                                    {message.userName.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-sm">{message.userName}</span>
                                    <span className="text-xs text-gray-500">in</span>
                                    <Badge variant="outline" className="text-xs">
                                      {group?.name || 'Unknown Group'}
                                    </Badge>
                                    <span className="text-xs text-gray-500">
                                      {message.timestamp.toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-700">{message.content}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        {messages.length > 5 && (
                          <div className="text-center">
                            <Button variant="outline" size="sm">
                              View All Messages
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
                        <p className="text-gray-600 mb-4">Start engaging with your groups by posting messages.</p>
                        <Button onClick={handleStartConversations}>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Start Chatting
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
