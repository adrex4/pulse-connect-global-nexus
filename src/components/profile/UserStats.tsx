
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, Clock, Star, Trophy, MessageSquare, 
  Users, Calendar, Target, Award, Zap
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
  };
  messages: Message[];
  groups: Group[];
}

const UserStats: React.FC<UserStatsProps> = ({ currentUser, stats, messages, groups }) => {
  const achievements = [
    { name: 'First Message', description: 'Posted your first message', earned: true, icon: MessageSquare },
    { name: 'Group Explorer', description: 'Joined 5 groups', earned: stats.groupsJoined >= 5, icon: Users },
    { name: 'Active Member', description: 'Posted 10 messages', earned: stats.messagesPosted >= 10, icon: Star },
    { name: 'Community Builder', description: 'Helped 10 people', earned: false, icon: Trophy },
    { name: 'Veteran', description: 'Member for 30 days', earned: stats.accountAge >= 30, icon: Award },
    { name: 'Influencer', description: 'Gained 1000 reputation', earned: stats.reputation >= 1000, icon: Zap },
  ];

  const activityData = [
    { day: 'Mon', messages: 5 },
    { day: 'Tue', messages: 8 },
    { day: 'Wed', messages: 3 },
    { day: 'Thu', messages: 12 },
    { day: 'Fri', messages: 7 },
    { day: 'Sat', messages: 2 },
    { day: 'Sun', messages: 4 },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reputation</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reputation}</div>
            <div className="flex items-center gap-2 mt-2">
              <Progress value={75} className="flex-1" />
              <span className="text-xs text-gray-500">75%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +125 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activity Score</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92</div>
            <div className="flex items-center gap-2 mt-2">
              <Progress value={92} className="flex-1" />
              <span className="text-xs text-gray-500">92%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Very active this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{achievements.filter(a => a.earned).length}/{achievements.length}</div>
            <div className="flex items-center gap-2 mt-2">
              <Progress value={(achievements.filter(a => a.earned).length / achievements.length) * 100} className="flex-1" />
              <span className="text-xs text-gray-500">{Math.round((achievements.filter(a => a.earned).length / achievements.length) * 100)}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Keep going!
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activityData.map((day) => (
              <div key={day.day} className="flex items-center gap-3">
                <div className="w-12 text-sm font-medium">{day.day}</div>
                <div className="flex-1">
                  <Progress value={(day.messages / 12) * 100} className="h-2" />
                </div>
                <div className="w-8 text-right text-sm text-gray-600">{day.messages}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.name}
                className={`flex items-center gap-3 p-4 rounded-lg border ${
                  achievement.earned 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  achievement.earned ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <achievement.icon className={`h-5 w-5 ${
                    achievement.earned ? 'text-green-600' : 'text-gray-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{achievement.name}</h3>
                    {achievement.earned && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Earned
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Group Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Group Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {groups.slice(0, 5).map((group) => (
              <div key={group.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{group.name}</h4>
                  <p className="text-sm text-gray-600">{group.memberCount} members</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {Math.floor(Math.random() * 20) + 5} messages
                  </div>
                  <div className="text-xs text-gray-500">This month</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStats;
