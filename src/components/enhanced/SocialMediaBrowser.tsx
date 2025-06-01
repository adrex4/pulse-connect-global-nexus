
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Camera, Users, Star, TrendingUp, Instagram, Youtube, Heart, MessageSquare, Share, Eye } from 'lucide-react';

interface SocialMediaInfluencer {
  id: string;
  name: string;
  username: string;
  niche: string;
  platforms: string[];
  followers: string;
  engagement: string;
  location: string;
  bio: string;
  verified: boolean;
  contentType: string;
}

const generateInfluencers = (): SocialMediaInfluencer[] => {
  const niches = [
    'Fashion & Beauty', 'Fitness & Health', 'Food & Cooking', 'Travel & Adventure',
    'Technology & Gadgets', 'Gaming & Esports', 'Lifestyle & Wellness', 'Business & Finance',
    'Education & Learning', 'Entertainment & Comedy'
  ];
  
  const platforms = ['Instagram', 'TikTok', 'YouTube', 'Twitter/X', 'LinkedIn'];
  const locations = ['New York, USA', 'Los Angeles, USA', 'London, UK', 'Paris, France', 'Tokyo, Japan', 'Sydney, Australia'];
  const followerRanges = ['10K-50K', '50K-100K', '100K-500K', '500K-1M', '1M+'];
  
  return Array.from({ length: 24 }, (_, i) => ({
    id: `influencer-${i + 1}`,
    name: `Creator ${i + 1}`,
    username: `@creator${i + 1}`,
    niche: niches[i % niches.length],
    platforms: platforms.slice(0, Math.floor(Math.random() * 3) + 2),
    followers: followerRanges[Math.floor(Math.random() * followerRanges.length)],
    engagement: `${(Math.random() * 10 + 2).toFixed(1)}%`,
    location: locations[Math.floor(Math.random() * locations.length)],
    bio: `Passionate ${niches[i % niches.length].toLowerCase()} creator sharing authentic content and inspiring my community.`,
    verified: Math.random() > 0.7,
    contentType: ['Photos & Reels', 'Long-form Videos', 'Live Streaming', 'Stories'][Math.floor(Math.random() * 4)]
  }));
};

interface SocialMediaBrowserProps {
  onBack?: () => void;
  onCreateProfile?: () => void;
  showFilters?: boolean;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

const SocialMediaBrowser: React.FC<SocialMediaBrowserProps> = ({
  onBack,
  onCreateProfile,
  showFilters = false,
  searchTerm = '',
  onSearchChange
}) => {
  const [influencers] = useState(generateInfluencers());
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  const searchValue = searchTerm || localSearchTerm;
  const handleSearchChange = onSearchChange || setLocalSearchTerm;

  const filteredInfluencers = influencers.filter(influencer =>
    influencer.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    influencer.niche.toLowerCase().includes(searchValue.toLowerCase()) ||
    influencer.username.toLowerCase().includes(searchValue.toLowerCase())
  );

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram': return <Instagram className="h-4 w-4" />;
      case 'YouTube': return <Youtube className="h-4 w-4" />;
      default: return <Camera className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {onBack && (
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Browse
        </Button>
      )}

      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Camera className="h-8 w-8 text-pink-600" />
          <h2 className="text-3xl font-bold text-gray-800">Social Media Influencers</h2>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover talented content creators and influencers across various platforms and niches.
        </p>
      </div>

      {/* Search */}
      {showFilters && (
        <div className="max-w-md mx-auto">
          <Input
            placeholder="Search influencers by name, niche, or username..."
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="h-12 text-lg border-2 focus:border-pink-500"
          />
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
        <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl">
          <div className="text-2xl font-bold text-pink-600">{filteredInfluencers.length}</div>
          <div className="text-pink-700 text-sm">Active Creators</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
          <div className="text-2xl font-bold text-purple-600">50+</div>
          <div className="text-purple-700 text-sm">Content Niches</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
          <div className="text-2xl font-bold text-blue-600">10M+</div>
          <div className="text-blue-700 text-sm">Total Reach</div>
        </div>
      </div>

      {/* Create Profile CTA */}
      {onCreateProfile && (
        <div className="text-center p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Are you a Content Creator?</h3>
          <p className="text-gray-600 mb-4">Join our community of influencers and connect with brands and fellow creators.</p>
          <Button 
            onClick={onCreateProfile}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          >
            <Camera className="h-4 w-4 mr-2" />
            Create Your Profile
          </Button>
        </div>
      )}

      {/* Influencers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInfluencers.map((influencer) => (
          <Card key={influencer.id} className="hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] border-2 hover:border-pink-300">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CardTitle className="text-lg">{influencer.name}</CardTitle>
                    {influencer.verified && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <Star className="h-3 w-3 text-white fill-current" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{influencer.username}</p>
                </div>
                <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200">
                  {influencer.niche}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2">{influencer.bio}</p>
              
              {/* Platforms */}
              <div className="flex flex-wrap gap-2">
                {influencer.platforms.slice(0, 3).map((platform) => (
                  <div key={platform} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full text-xs">
                    {getPlatformIcon(platform)}
                    <span>{platform}</span>
                  </div>
                ))}
                {influencer.platforms.length > 3 && (
                  <div className="bg-gray-100 px-2 py-1 rounded-full text-xs">
                    +{influencer.platforms.length - 3} more
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-sm font-semibold text-gray-800">{influencer.followers}</div>
                  <div className="text-xs text-gray-500">Followers</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800">{influencer.engagement}</div>
                  <div className="text-xs text-gray-500">Engagement</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-800 capitalize">{influencer.contentType}</div>
                  <div className="text-xs text-gray-500">Content</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4" />
                </Button>
              </div>

              <div className="text-xs text-gray-400 flex items-center gap-1">
                <Users className="h-3 w-3" />
                {influencer.location}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredInfluencers.length === 0 && (
        <div className="text-center py-16">
          <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No influencers found</h3>
          <p className="text-gray-500">Try adjusting your search terms.</p>
        </div>
      )}
    </div>
  );
};

export default SocialMediaBrowser;
