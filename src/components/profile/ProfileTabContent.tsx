
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Activity, MessageSquare, Users, Trophy, Edit, Settings, 
  Shield, Network
} from 'lucide-react';
import { User, Group, Message } from '@/types/connectPulse';
import UserActivityFeed from './UserActivityFeed';
import UserStats from './UserStats';
import JoinedGroupsList from './JoinedGroupsList';

interface ProfileTabContentProps {
  currentUser: User;
  joinedGroups: Group[];
  messages: Message[];
  userStats: {
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
}

const ProfileTabContent: React.FC<ProfileTabContentProps> = ({
  currentUser,
  joinedGroups,
  messages,
  userStats
}) => {
  return (
    <>
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
    </>
  );
};

export default ProfileTabContent;
