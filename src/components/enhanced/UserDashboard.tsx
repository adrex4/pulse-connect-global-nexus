
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, MessageCircle, Users, Settings, Bell, Crown, 
  Calendar, Activity, MapPin, Globe, Star, Edit, ArrowLeft
} from 'lucide-react';
import { User as UserType, Group } from '@/types/connectPulse';
import UserProfile from '../profile/UserProfile';
import DirectMessaging from './DirectMessaging';

interface UserDashboardProps {
  user: UserType;
  joinedGroups: Group[];
  onUpdateUser: (user: UserType) => void;
  onBack?: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ 
  user, 
  joinedGroups, 
  onUpdateUser,
  onBack 
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getGroupsByScope = (scope: string) => {
    return joinedGroups.filter(group => group.scope === scope);
  };

  const totalMembers = joinedGroups.reduce((sum, group) => sum + group.memberCount, 0);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header Section */}
      <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-center gap-6">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-white text-blue-600 text-2xl font-bold">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <p className="text-blue-100 text-lg mb-3">{user.email}</p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-white/20 text-white hover:bg-white/30">
                  <Crown className="h-3 w-3 mr-1" />
                  {user.niche}
                </Badge>
                <Badge className="bg-white/20 text-white hover:bg-white/30">
                  <MapPin className="h-3 w-3 mr-1" />
                  {user.country}
                </Badge>
                <Badge className="bg-white/20 text-white hover:bg-white/30">
                  <Globe className="h-3 w-3 mr-1" />
                  {user.preferredScope}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-900">{joinedGroups.length}</div>
            <div className="text-blue-700">Groups Joined</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-900">{Math.floor(Math.random() * 50) + 20}</div>
            <div className="text-green-700">Messages Sent</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6 text-center">
            <Activity className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-900">{totalMembers.toLocaleString()}</div>
            <div className="text-purple-700">Network Reach</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-900">{Math.floor(Math.random() * 100) + 50}</div>
            <div className="text-orange-700">Connections</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            My Groups
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Messages
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Joined Global Business Partnerships</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Sent message in Tech Innovators</p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Updated profile information</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Messages Sent</span>
                  <span className="font-semibold">{Math.floor(Math.random() * 20) + 5}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">New Connections</span>
                  <span className="font-semibold">{Math.floor(Math.random() * 10) + 2}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Groups Joined</span>
                  <span className="font-semibold">{Math.floor(Math.random() * 3) + 1}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Profile Views</span>
                  <span className="font-semibold">{Math.floor(Math.random() * 50) + 10}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Local Groups */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  Local Groups ({getGroupsByScope('local').length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {getGroupsByScope('local').map((group) => (
                  <div key={group.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h4 className="font-medium text-sm">{group.name}</h4>
                    <p className="text-xs text-gray-500">{group.memberCount.toLocaleString()} members</p>
                  </div>
                ))}
                {getGroupsByScope('local').length === 0 && (
                  <p className="text-gray-500 text-sm">No local groups yet</p>
                )}
              </CardContent>
            </Card>

            {/* Regional Groups */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Regional Groups ({getGroupsByScope('regional').length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {getGroupsByScope('regional').map((group) => (
                  <div key={group.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h4 className="font-medium text-sm">{group.name}</h4>
                    <p className="text-xs text-gray-500">{group.memberCount.toLocaleString()} members</p>
                  </div>
                ))}
                {getGroupsByScope('regional').length === 0 && (
                  <p className="text-gray-500 text-sm">No regional groups yet</p>
                )}
              </CardContent>
            </Card>

            {/* Global Groups */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5 text-purple-600" />
                  Global Groups ({getGroupsByScope('global').length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {getGroupsByScope('global').map((group) => (
                  <div key={group.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h4 className="font-medium text-sm">{group.name}</h4>
                    <p className="text-xs text-gray-500">{group.memberCount.toLocaleString()} members</p>
                  </div>
                ))}
                {getGroupsByScope('global').length === 0 && (
                  <p className="text-gray-500 text-sm">No global groups yet</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="messages">
          <DirectMessaging user={user} />
        </TabsContent>

        <TabsContent value="profile">
          <UserProfile user={user} onUpdateUser={onUpdateUser} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
