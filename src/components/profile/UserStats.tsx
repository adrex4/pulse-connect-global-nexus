
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, Clock, Star, Trophy, MessageSquare, 
  Users, Calendar, Target, Award, Zap, Eye, Heart
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
  const achievements = [
    { name: 'First Message', description: 'Posted your first message', earned: stats.messagesPosted > 0, icon: MessageSquare },
    { name: 'Group Explorer', description: 'Joined 5 groups', earned: stats.groupsJoined >= 5, icon: Users },
    { name: 'Active Member', description: 'Posted 10 messages', earned: stats.messagesPosted >= 10, icon: Star },
    { name: 'Community Builder', description: 'Helped 10 people', earned: false, icon: Trophy },
    { name: 'Veteran', description: 'Member for 30 days', earned: stats.accountAge >= 30, icon: Award },
    { name: 'Influencer', description: 'Gained 1000 reputation', earned: stats.reputation >= 1000, icon: Zap },
  ];

  const activityData = [
    { day: 'Mon', messages: 5, engagement: 75 },
    { day: 'Tue', messages: 8, engagement: 85 },
    { day: 'Wed', messages: 3, engagement: 45 },
    { day: 'Thu', messages: 12, engagement: 95 },
    { day: 'Fri', messages: 7, engagement: 70 },
    { day: 'Sat', messages: 2, engagement: 25 },
    { day: 'Sun', messages: 4, engagement: 50 },
  ];

  const calculateProfileCompleteness = () => {
    let completeness = 0;
    if (currentUser.name) completeness += 20;
    if (currentUser.email) completeness += 20;
    if (currentUser.bio) completeness += 20;
    if (currentUser.niche) completeness += 20;
    if (currentUser.country) completeness += 20;
    return completeness;
  };

  const profileCompleteness = calculateProfileCompleteness();

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reputation</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reputation}</div>
            <div className="flex items-center gap-2 mt-2">
              <Progress value={Math.min((stats.reputation / 1000) * 100, 100)} className="flex-1" />
              <span className="text-xs text-gray-500">{Math.min(Math.round((stats.reputation / 1000) * 100), 100)}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +125 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Groups Joined</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.groupsJoined}</div>
            <p className="text-xs text-muted-foreground">
              Active in {stats.groupsJoined} communities
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Posted</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.messagesPosted}</div>
            <p className="text-xs text-muted-foreground">
              Across all groups
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.profileViews}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Profile Completeness */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Completeness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-gray-600">{profileCompleteness}%</span>
              </div>
              <Progress value={profileCompleteness} className="w-full" />
              
              <div className="space-y-2 text-sm">
                <div className={`flex items-center gap-2 ${currentUser.name ? 'text-green-600' : 'text-gray-500'}`}>
                  <div className={`w-2 h-2 rounded-full ${currentUser.name ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  Name {currentUser.name ? '✓' : '(incomplete)'}
                </div>
                <div className={`flex items-center gap-2 ${currentUser.email ? 'text-green-600' : 'text-gray-500'}`}>
                  <div className={`w-2 h-2 rounded-full ${currentUser.email ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  Email {currentUser.email ? '✓' : '(incomplete)'}
                </div>
                <div className={`flex items-center gap-2 ${currentUser.bio ? 'text-green-600' : 'text-gray-500'}`}>
                  <div className={`w-2 h-2 rounded-full ${currentUser.bio ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  Bio {currentUser.bio ? '✓' : '(incomplete)'}
                </div>
                <div className={`flex items-center gap-2 ${currentUser.niche ? 'text-green-600' : 'text-gray-500'}`}>
                  <div className={`w-2 h-2 rounded-full ${currentUser.niche ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  Specialization {currentUser.niche ? '✓' : '(incomplete)'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityData.map((day, index) => (
                <div key={day.day} className="flex items-center gap-4">
                  <div className="w-8 text-sm font-medium">{day.day}</div>
                  <div className="flex-1 flex items-center gap-2">
                    <Progress value={(day.messages / 12) * 100} className="flex-1" />
                    <span className="text-sm text-gray-600 w-8">{day.messages}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.earned
                      ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <IconComponent
                      className={`h-6 w-6 ${
                        achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                      }`}
                    />
                    <h3
                      className={`font-medium ${
                        achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                      }`}
                    >
                      {achievement.name}
                    </h3>
                  </div>
                  <p
                    className={`text-sm ${
                      achievement.earned ? 'text-yellow-700' : 'text-gray-500'
                    }`}
                  >
                    {achievement.description}
                  </p>
                  {achievement.earned && (
                    <Badge className="mt-2 bg-yellow-600 text-white">Earned</Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Engagement Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Engagement Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStats;
