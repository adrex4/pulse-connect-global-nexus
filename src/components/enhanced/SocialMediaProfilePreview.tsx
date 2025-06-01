
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Camera, Users, Star, TrendingUp, Edit, Rocket, Home, Globe, Heart, Zap } from 'lucide-react';

interface SocialMediaProfilePreviewProps {
  profileData: {
    influencerName: string;
    platforms: string[];
    totalFollowers: string;
    niche: string;
    contentType: string;
    bio: string;
    rates: string;
  };
  locationData?: {
    country: string;
    state?: string;
    city?: string;
  };
  portfolioItems: any[];
  onEdit: () => void;
  onPublish: () => void;
  onHome: () => void;
}

const SocialMediaProfilePreview: React.FC<SocialMediaProfilePreviewProps> = ({
  profileData,
  locationData,
  portfolioItems,
  onEdit,
  onPublish,
  onHome
}) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Camera className="h-6 w-6" />
              <CardTitle className="text-xl">Your Influencer Profile</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onHome} className="text-white hover:bg-white/20">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-8 space-y-6">
          {/* Profile Header */}
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
              <Camera className="h-12 w-12 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{profileData.influencerName}</h2>
              <p className="text-gray-600 text-lg">{profileData.niche} Influencer</p>
              {locationData && (
                <p className="text-gray-500">{locationData.city}, {locationData.country}</p>
              )}
            </div>
          </div>

          {/* Platforms */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-pink-500" />
              Active Platforms
            </h3>
            <div className="flex flex-wrap gap-2">
              {profileData.platforms.map((platform) => (
                <Badge key={platform} variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">
                  {platform}
                </Badge>
              ))}
            </div>
          </div>

          {/* Follower Range */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-pink-500" />
              Audience Size
            </h3>
            <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg px-4 py-2">
              {profileData.totalFollowers}
            </Badge>
          </div>

          {/* Content Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Content Niche</h3>
              <Badge variant="outline" className="border-pink-500 text-pink-700">
                {profileData.niche}
              </Badge>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Content Type</h3>
              <Badge variant="outline" className="border-purple-500 text-purple-700">
                {profileData.contentType}
              </Badge>
            </div>
          </div>

          {/* Bio */}
          {profileData.bio && (
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Bio</h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg leading-relaxed">
                {profileData.bio}
              </p>
            </div>
          )}

          {/* Rates */}
          {profileData.rates && (
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Collaboration Rates</h3>
              <p className="text-gray-700 bg-green-50 p-4 rounded-lg border border-green-200">
                {profileData.rates}
              </p>
            </div>
          )}

          {/* Portfolio */}
          {portfolioItems.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Portfolio</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {portfolioItems.map((item, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <Star className="h-8 w-8 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-center">Profile Highlights</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <Globe className="h-8 w-8 mx-auto text-pink-500" />
                <div className="text-sm text-gray-600">Reach</div>
                <div className="font-semibold">{profileData.platforms.length} Platforms</div>
              </div>
              <div className="space-y-2">
                <Heart className="h-8 w-8 mx-auto text-red-500" />
                <div className="text-sm text-gray-600">Engagement</div>
                <div className="font-semibold">High Quality</div>
              </div>
              <div className="space-y-2">
                <Zap className="h-8 w-8 mx-auto text-yellow-500" />
                <div className="text-sm text-gray-600">Content</div>
                <div className="font-semibold">{profileData.contentType}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              onClick={onEdit}
              variant="outline"
              className="flex-1 h-12 border-2 border-pink-500 text-pink-700 hover:bg-pink-50"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button
              onClick={onPublish}
              className="flex-1 h-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              <Rocket className="h-4 w-4 mr-2" />
              Publish Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaProfilePreview;
