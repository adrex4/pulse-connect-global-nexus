
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, Clock, Star, Trophy, MessageSquare, 
  Users, Calendar, Target, Award, Zap, Eye, Heart,
  BarChart3, PieChart, Activity, Sparkles, Gift,
  CheckCircle, AlertCircle, Info, ChevronRight
} from 'lucide-react';
import { User, Group, Message } from '@/types/connectPulse';

interface UserStatsProps {
  currentUser: User;
  stats: {
    groupsJoined: number;
    messagesPosted: number;
    accountAge: number;
    activeToday: boolean;
    reputation: number;
    achievements: number;
    connections: number;
    profileViews: number;
    endorsements: number;
    skillsRated: number;
  };
  messages: Message[];
  groups: Group[];
}

const UserStats: React.FC<UserStatsProps> = ({ currentUser, stats, messages, groups }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'year'>('week');

  const achievements = [
    { 
      name: 'First Message', 
      description: 'Posted your first message', 
      earned: stats.messagesPosted > 0, 
      icon: MessageSquare,
      rarity: 'common',
      points: 10
    },
    { 
      name: 'Group Explorer', 
      description: 'Joined 3+ communities', 
      earned: stats.groupsJoined >= 3, 
      icon: Users,
      rarity: 'common',
      points: 25
    },
    { 
      name: 'Active Member', 
      description: 'Posted 10+ messages', 
      earned: stats.messagesPosted >= 3, 
      icon: Star,
      rarity: 'uncommon',
      points: 50
    },
    { 
      name: 'Community Builder', 
      description: 'Helped 10+ people', 
      earned: false, 
      icon: Trophy,
      rarity: 'rare',
      points: 100
    },
    { 
      name: 'Veteran Member', 
      description: 'Active for 30+ days', 
      earned: stats.accountAge >= 30, 
      icon: Award,
      rarity: 'epic',
      points: 200
    },
    { 
      name: 'Influencer', 
      description: 'Gained 1000+ reputation', 
      earned: stats.reputation >= 1000, 
      icon: Zap,
      rarity: 'legendary',
      points: 500
    },
  ];

  const weeklyData = [
    { day: 'Mon', messages: 5, engagement: 75, views: 120 },
    { day: 'Tue', messages: 8, engagement: 85, views: 150 },
    { day: 'Wed', messages: 3, engagement: 45, views: 80 },
    { day: 'Thu', messages: 12, engagement: 95, views: 200 },
    { day: 'Fri', messages: 7, engagement: 70, views: 130 },
    { day: 'Sat', messages: 2, engagement: 25, views: 60 },
    { day: 'Sun', messages: 4, engagement: 50, views: 90 },
  ];

  const calculateProfileCompleteness = () => {
    let completeness = 0;
    const fields = [
      { field: currentUser.name, weight: 20, name: 'Name' },
      { field: currentUser.email, weight: 20, name: 'Email' },
      { field: currentUser.bio, weight: 25, name: 'Bio' },
      { field: currentUser.niche, weight: 20, name: 'Specialization' },
      { field: currentUser.country, weight: 15, name: 'Location' },
    ];
    
    fields.forEach(field => {
      if (field.field) completeness += field.weight;
    });
    
    return { completeness, fields };
  };

  const { completeness: profileCompleteness, fields: profileFields } = calculateProfileCompleteness();

  const earnedAchievements = achievements.filter(a => a.earned);
  const totalAchievementPoints = earnedAchievements.reduce((sum, a) => sum + a.points, 0);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'uncommon': return 'bg-green-100 text-green-700 border-green-300';
      case 'rare': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'epic': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'legendary': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Reputation</CardTitle>
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">{stats.reputation.toLocaleString()}</div>
            <div className="flex items-center gap-2 mt-3">
              <Progress value={Math.min((stats.reputation / 1000) * 100, 100)} className="flex-1 h-2" />
              <span className="text-xs text-blue-600 font-medium">
                {Math.min(Math.round((stats.reputation / 1000) * 100), 100)}%
              </span>
            </div>
            <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +125 this month
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Communities</CardTitle>
            <Users className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">{stats.groupsJoined}</div>
            <p className="text-xs text-green-600 mt-2">
              Active across {stats.groupsJoined} communities
            </p>
            <Button variant="ghost" size="sm" className="mt-2 text-green-700 hover:bg-green-200 h-6 px-2">
              View All <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Messages Posted</CardTitle>
            <MessageSquare className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">{stats.messagesPosted}</div>
            <p className="text-xs text-purple-600 mt-2">
              Across all groups
            </p>
            <div className="flex items-center gap-1 mt-2">
              <Activity className="h-3 w-3 text-purple-600" />
              <span className="text-xs text-purple-600">12 this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-700">Profile Views</CardTitle>
            <Eye className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-900">{stats.profileViews}</div>
            <p className="text-xs text-yellow-600 mt-2">
              This month
            </p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-yellow-600" />
              <span className="text-xs text-yellow-600">+18% vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Tabbed Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100">
          <TabsTrigger value="overview" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-2">
            <Activity className="h-4 w-4" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="achievements" className="gap-2">
            <Trophy className="h-4 w-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <PieChart className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Enhanced Profile Completeness */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Profile Completeness
                  <Badge className={profileCompleteness === 100 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                    {profileCompleteness}%
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-gray-600">{profileCompleteness}%</span>
                  </div>
                  <Progress value={profileCompleteness} className="w-full h-3" />
                  
                  <div className="space-y-3 mt-4">
                    {profileFields.map((field, index) => (
                      <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${field.field ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                        <div className="flex items-center gap-3">
                          {field.field ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-gray-400" />
                          )}
                          <span className={`text-sm font-medium ${field.field ? 'text-green-700' : 'text-gray-600'}`}>
                            {field.name}
                          </span>
                        </div>
                        <Badge variant={field.field ? 'default' : 'secondary'} className="text-xs">
                          {field.weight}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                  
                  {profileCompleteness < 100 && (
                    <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Complete Profile (+{100 - profileCompleteness}%)
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Achievement Points & Level */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Achievement Progress
                  <Badge className="bg-purple-100 text-purple-700">
                    Level {Math.floor(totalAchievementPoints / 100) + 1}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">
                      {totalAchievementPoints}
                    </div>
                    <p className="text-sm text-gray-600">Total Achievement Points</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress to next level</span>
                      <span>{totalAchievementPoints % 100}/100</span>
                    </div>
                    <Progress value={(totalAchievementPoints % 100)} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center p-3 bg-yellow-50 rounded-lg">
                      <div className="text-xl font-bold text-yellow-600">{earnedAchievements.length}</div>
                      <div className="text-xs text-yellow-700">Earned</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">{achievements.length - earnedAchievements.length}</div>
                      <div className="text-xs text-blue-700">Remaining</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Weekly Activity Overview
                </CardTitle>
                <div className="flex gap-2">
                  {(['week', 'month', 'year'] as const).map((timeframe) => (
                    <Button
                      key={timeframe}
                      size="sm"
                      variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
                      onClick={() => setSelectedTimeframe(timeframe)}
                      className="capitalize"
                    >
                      {timeframe}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((day, index) => (
                  <div key={day.day} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-12 text-sm font-medium text-gray-700">{day.day}</div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>Messages ({day.messages})</span>
                        <span>Engagement ({day.engagement}%)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <Progress value={(day.messages / 12) * 100} className="h-2" />
                        </div>
                        <div className="flex-1">
                          <Progress value={day.engagement} className="h-2" />
                        </div>
                        <span className="text-sm text-gray-500 w-12">{day.views} views</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <Card
                  key={index}
                  className={`transition-all duration-300 hover:scale-105 ${
                    achievement.earned
                      ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 shadow-lg'
                      : 'bg-gray-50 border-2 border-gray-200 opacity-75 hover:opacity-90'
                  }`}
                >
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className={`p-4 rounded-full ${achievement.earned ? 'bg-yellow-200' : 'bg-gray-200'}`}>
                        <IconComponent
                          className={`h-8 w-8 ${
                            achievement.earned ? 'text-yellow-700' : 'text-gray-400'
                          }`}
                        />
                      </div>
                    </div>
                    <h3
                      className={`font-bold text-lg mb-2 ${
                        achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                      }`}
                    >
                      {achievement.name}
                    </h3>
                    <p
                      className={`text-sm mb-3 ${
                        achievement.earned ? 'text-yellow-700' : 'text-gray-500'
                      }`}
                    >
                      {achievement.description}
                    </p>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Badge className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {achievement.points} pts
                      </Badge>
                    </div>
                    {achievement.earned && (
                      <Badge className="bg-yellow-600 text-white shadow-md">
                        <Award className="h-3 w-3 mr-1" />
                        Earned
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Engagement Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Heart className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <div className="text-2xl font-bold text-blue-600">{stats.endorsements}</div>
                      <div className="text-sm text-gray-600">Endorsements</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Star className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <div className="text-2xl font-bold text-green-600">4.8</div>
                      <div className="text-sm text-gray-600">Avg Rating</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                      <div className="text-2xl font-bold text-purple-600">{stats.connections}</div>
                      <div className="text-sm text-gray-600">Connections</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <Calendar className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                      <div className="text-2xl font-bold text-yellow-600">{stats.accountAge}</div>
                      <div className="text-sm text-gray-600">Days Active</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Response Rate</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Community Engagement</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Profile Visibility</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Content Quality Score</span>
                      <span className="font-medium">94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserStats;
