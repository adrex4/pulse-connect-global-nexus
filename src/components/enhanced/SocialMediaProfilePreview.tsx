import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Globe, Users, Star, ExternalLink } from 'lucide-react';

interface SocialMediaProfilePreviewProps {
  profileData: {
    influencerName: string;
    platforms: string[];
    totalFollowers: string;
    niche: string;
    contentType: string;
    bio: string;
    rates: string;
    profileImage?: string;
  };
  locationData: any;
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
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    
    // Simulate publishing process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // After publishing, redirect to explore community
    onPublish();
    
    setIsPublishing(false);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return '📷';
      case 'youtube': return '🎥';
      case 'tiktok': return '🎬';
      case 'twitter': return '🐦';
      case 'facebook': return '👥';
      case 'linkedin': return '💼';
      case 'twitch': return '🎮';
      case 'snapchat': return '👻';
      default: return '📱';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return 'from-pink-500 to-purple-600';
      case 'youtube': return 'from-red-500 to-red-600';
      case 'tiktok': return 'from-black to-gray-800';
      case 'twitter': return 'from-blue-400 to-blue-600';
      case 'facebook': return 'from-blue-600 to-blue-700';
      case 'linkedin': return 'from-blue-700 to-blue-800';
      case 'twitch': return 'from-purple-500 to-purple-700';
      case 'snapchat': return 'from-yellow-400 to-yellow-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in p-4">
      <Card className="shadow-2xl border-0 bg-white overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 p-6">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onEdit}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Edit
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onEdit}
                className="text-white hover:bg-white/20"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        <CardContent className="p-8 bg-gradient-to-br from-gray-50 to-white">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Profile Ready!</h2>
            <p className="text-gray-600 text-lg">Your creator profile looks amazing. Ready to connect with brands?</p>
          </div>

          {/* Profile Preview */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-start gap-6 mb-6">
              {/* Profile Image */}
              <div className="w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {profileData.profileImage ? (
                  <img 
                    src={profileData.profileImage} 
                    alt={profileData.influencerName}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  profileData.influencerName.charAt(0).toUpperCase()
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{profileData.influencerName}</h3>
                <p className="text-gray-600 mb-3">{profileData.bio}</p>
                
                {/* Stats */}
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="font-semibold">{profileData.totalFollowers}</span>
                    <span className="text-gray-500">followers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">{locationData?.country}</span>
                  </div>
                </div>

                {/* Platforms */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {profileData.platforms.map((platform, index) => (
                    <Badge
                      key={index}
                      className={`bg-gradient-to-r ${getPlatformColor(platform)} text-white px-3 py-1`}
                    >
                      {getPlatformIcon(platform)} {platform}
                    </Badge>
                  ))}
                </div>

                {/* Niche & Content Type */}
                <div className="flex gap-4 mb-4">
                  <Badge variant="outline" className="px-3 py-1">
                    {profileData.niche}
                  </Badge>
                  <Badge variant="outline" className="px-3 py-1">
                    {profileData.contentType}
                  </Badge>
                </div>

                {/* Rates */}
                {profileData.rates && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm text-green-800">
                      <strong>Collaboration Rates:</strong> {profileData.rates}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Portfolio Preview */}
            {portfolioItems.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-4">Content Portfolio</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {portfolioItems.slice(0, 4).map((item, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-2">{item.type === 'image' ? '🖼️' : '🎥'}</div>
                      <p className="text-sm text-gray-600 truncate">{item.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={onEdit}
              className="px-8 py-3 text-lg"
            >
              <Edit className="h-5 w-5 mr-2" />
              Edit Profile
            </Button>
            
            <Button
              onClick={handlePublish}
              disabled={isPublishing}
              className="px-8 py-3 text-lg bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              {isPublishing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Publishing...
                </>
              ) : (
                <>
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Publish & Explore Community
                </>
              )}
            </Button>
          </div>

          {isPublishing && (
            <div className="mt-6 text-center">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800">
                  🎉 Publishing your profile and redirecting to explore community...
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaProfilePreview;
