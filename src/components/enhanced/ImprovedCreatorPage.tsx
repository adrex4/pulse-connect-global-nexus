
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Camera, Play, Heart, MessageCircle, Share, Eye, Calendar,
  MapPin, Globe, Users, Star, Zap, Trophy, TrendingUp,
  Instagram, Youtube, Twitter, Linkedin, Facebook, Music,
  Image, Video, Mic, FileText, Award, Target
} from 'lucide-react';
import ColorfulSelectionIndicator from './ColorfulSelectionIndicator';

interface CreatorProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverImage: string;
  bio: string;
  location: string;
  category: string;
  followers: number;
  following: number;
  totalViews: number;
  totalLikes: number;
  verificationLevel: 'none' | 'verified' | 'pro' | 'expert';
  socialMedia: {
    instagram?: string;
    youtube?: string;
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    tiktok?: string;
  };
  achievements: string[];
  specialties: string[];
  mediaHighlights: {
    id: string;
    type: 'image' | 'video' | 'audio';
    thumbnail: string;
    title: string;
    views: number;
    likes: number;
    duration?: string;
  }[];
}

interface ImprovedCreatorPageProps {
  creator: CreatorProfile;
}

const ImprovedCreatorPage: React.FC<ImprovedCreatorPageProps> = ({ creator }) => {
  const [activeMediaFilter, setActiveMediaFilter] = useState<'all' | 'image' | 'video' | 'audio'>('all');
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);

  const getVerificationIcon = (level: string) => {
    switch (level) {
      case 'verified': return <Badge className="bg-blue-500"><Star className="w-3 h-3 mr-1" />Verified</Badge>;
      case 'pro': return <Badge className="bg-purple-500"><Trophy className="w-3 h-3 mr-1" />Pro</Badge>;
      case 'expert': return <Badge className="bg-gold-500"><Award className="w-3 h-3 mr-1" />Expert</Badge>;
      default: return null;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const filteredMedia = creator.mediaHighlights.filter(media => 
    activeMediaFilter === 'all' || media.type === activeMediaFilter
  );

  const socialPlatforms = [
    { key: 'instagram', icon: Instagram, color: 'text-pink-500', name: 'Instagram' },
    { key: 'youtube', icon: Youtube, color: 'text-red-500', name: 'YouTube' },
    { key: 'twitter', icon: Twitter, color: 'text-blue-400', name: 'Twitter' },
    { key: 'linkedin', icon: Linkedin, color: 'text-blue-600', name: 'LinkedIn' },
    { key: 'facebook', icon: Facebook, color: 'text-blue-700', name: 'Facebook' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Cover Section with Parallax Effect */}
      <div className="relative h-80 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-110 transition-transform duration-700 hover:scale-105"
          style={{ 
            backgroundImage: `linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(236, 72, 153, 0.8)), url(${creator.coverImage})` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end gap-6">
              <div className="relative group">
                <Avatar className="h-32 w-32 border-4 border-white shadow-2xl ring-4 ring-purple-500/30 transition-all duration-300 group-hover:ring-purple-500/60">
                  <AvatarImage src={creator.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-3xl font-bold">
                    {creator.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-400 to-green-600 p-2 rounded-full border-2 border-white shadow-lg">
                  <Camera className="h-4 w-4 text-white" />
                </div>
              </div>
              
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    {creator.name}
                  </h1>
                  {getVerificationIcon(creator.verificationLevel)}
                </div>
                <p className="text-xl text-purple-100 mb-2">@{creator.username}</p>
                <div className="flex items-center gap-4 text-sm text-purple-200">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {creator.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    {creator.category}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-3 pb-4">
                <ColorfulSelectionIndicator isSelected={isFollowing} selectionColor="purple">
                  <Button 
                    onClick={() => setIsFollowing(!isFollowing)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    size="lg"
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                </ColorfulSelectionIndicator>
                <Button variant="outline" size="lg" className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" size="lg" className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white/80 backdrop-blur-sm border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {formatNumber(creator.followers)}
                </div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {formatNumber(creator.following)}
                </div>
                <div className="text-sm text-gray-600">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  {formatNumber(creator.totalViews)}
                </div>
                <div className="text-sm text-gray-600">Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                  {formatNumber(creator.totalLikes)}
                </div>
                <div className="text-sm text-gray-600">Likes</div>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="flex gap-3">
              {socialPlatforms.map(platform => {
                const Icon = platform.icon;
                const handle = creator.socialMedia[platform.key as keyof typeof creator.socialMedia];
                if (!handle) return null;
                
                return (
                  <ColorfulSelectionIndicator key={platform.key} selectionColor="blue">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="hover:scale-110 transition-transform duration-200"
                      title={`${platform.name}: ${handle}`}
                    >
                      <Icon className={`h-4 w-4 ${platform.color}`} />
                    </Button>
                  </ColorfulSelectionIndicator>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - About & Achievements */}
          <div className="space-y-6">
            {/* Bio Card */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-white to-purple-50">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  About
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700 leading-relaxed">
                  {showFullBio ? creator.bio : `${creator.bio.substring(0, 150)}...`}
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowFullBio(!showFullBio)}
                  className="mt-2 text-purple-600 hover:text-purple-700"
                >
                  {showFullBio ? 'Show Less' : 'Read More'}
                </Button>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-white to-blue-50">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Specialties
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2">
                  {creator.specialties.map((specialty, index) => (
                    <ColorfulSelectionIndicator key={index} selectionColor="blue">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
                        {specialty}
                      </Badge>
                    </ColorfulSelectionIndicator>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-white to-yellow-50">
              <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {creator.achievements.map((achievement, index) => (
                    <ColorfulSelectionIndicator key={index} selectionColor="orange">
                      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 hover:border-orange-300 transition-colors">
                        <Award className="h-5 w-5 text-yellow-600" />
                        <span className="text-gray-700 font-medium">{achievement}</span>
                      </div>
                    </ColorfulSelectionIndicator>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Media Gallery */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-white to-indigo-50">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Media Gallery
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Media Filter Tabs */}
                <Tabs value={activeMediaFilter} onValueChange={(value) => setActiveMediaFilter(value as any)} className="mb-6">
                  <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-indigo-100 to-purple-100">
                    <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-indigo-600">
                      All Media
                    </TabsTrigger>
                    <TabsTrigger value="image" className="data-[state=active]:bg-white data-[state=active]:text-indigo-600">
                      <Image className="h-4 w-4 mr-2" />
                      Photos
                    </TabsTrigger>
                    <TabsTrigger value="video" className="data-[state=active]:bg-white data-[state=active]:text-indigo-600">
                      <Video className="h-4 w-4 mr-2" />
                      Videos
                    </TabsTrigger>
                    <TabsTrigger value="audio" className="data-[state=active]:bg-white data-[state=active]:text-indigo-600">
                      <Mic className="h-4 w-4 mr-2" />
                      Audio
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                {/* Media Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredMedia.map((media) => (
                    <ColorfulSelectionIndicator key={media.id} selectionColor="indigo">
                      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-2 hover:border-indigo-300">
                        <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200">
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Media Type Icon */}
                          <div className="absolute top-2 right-2 p-1 bg-black/50 rounded-full">
                            {media.type === 'video' && <Play className="h-4 w-4 text-white" />}
                            {media.type === 'audio' && <Music className="h-4 w-4 text-white" />}
                            {media.type === 'image' && <Image className="h-4 w-4 text-white" />}
                          </div>
                          
                          {/* Duration for video/audio */}
                          {media.duration && (
                            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-white text-xs">
                              {media.duration}
                            </div>
                          )}
                          
                          {/* Placeholder for actual media */}
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            {media.type === 'video' && <Video className="h-12 w-12" />}
                            {media.type === 'audio' && <Music className="h-12 w-12" />}
                            {media.type === 'image' && <Image className="h-12 w-12" />}
                          </div>
                        </div>
                        
                        <div className="p-3">
                          <h4 className="font-medium text-sm truncate mb-2">{media.title}</h4>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {formatNumber(media.views)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              {formatNumber(media.likes)}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </ColorfulSelectionIndicator>
                  ))}
                </div>
                
                {filteredMedia.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">No {activeMediaFilter === 'all' ? 'media' : activeMediaFilter} content available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImprovedCreatorPage;
