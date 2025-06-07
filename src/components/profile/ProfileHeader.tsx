
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, Calendar, Clock, Users, Share2, Download, 
  CheckCircle, Sparkles, Star, BookOpen, Camera
} from 'lucide-react';
import { User } from '@/types/connectPulse';

interface ProfileHeaderProps {
  currentUser: User;
  userStats: {
    groupsJoined: number;
    connections: number;
    reputation: number;
    profileViews: number;
    endorsements: number;
    accountAge: number;
  };
  connectionRequests: number;
  isProfileShared: boolean;
  handleConnectionRequests: () => void;
  handleShareProfile: () => void;
  handleDownloadProfile: () => void;
  handleUploadAvatar: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  currentUser,
  userStats,
  connectionRequests,
  isProfileShared,
  handleConnectionRequests,
  handleShareProfile,
  handleDownloadProfile,
  handleUploadAvatar
}) => {
  return (
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
  );
};

export default ProfileHeader;
