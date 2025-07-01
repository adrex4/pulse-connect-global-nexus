
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Camera, Users, Star, TrendingUp, Instagram, Youtube, Heart, MessageSquare, Share, Eye, Filter, Search, MapPin, Sparkles, Play, Award } from 'lucide-react';

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
  profileImage?: string;
  coverImage?: string;
  recentPosts: number;
  rating: number;
}

const generateInfluencers = (): SocialMediaInfluencer[] => {
  const niches = [
    'Fashion & Beauty', 'Fitness & Health', 'Food & Cooking', 'Travel & Adventure',
    'Technology & Gadgets', 'Gaming & Esports', 'Lifestyle & Wellness', 'Business & Finance',
    'Education & Learning', 'Entertainment & Comedy', 'Art & Design', 'Music & Audio'
  ];
  
  const platforms = ['Instagram', 'TikTok', 'YouTube', 'Twitter/X', 'LinkedIn'];
  const locations = ['New York, USA', 'Los Angeles, USA', 'London, UK', 'Paris, France', 'Tokyo, Japan', 'Sydney, Australia', 'Miami, USA', 'Berlin, Germany'];
  const followerRanges = ['10K-50K', '50K-100K', '100K-500K', '500K-1M', '1M+', '5M+'];
  
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
    contentType: ['Photos & Reels', 'Long-form Videos', 'Live Streaming', 'Stories'][Math.floor(Math.random() * 4)],
    profileImage: '/placeholder.svg',
    coverImage: '/placeholder.svg',
    recentPosts: Math.floor(Math.random() * 50) + 10,
    rating: Number((Math.random() * 2 + 3).toFixed(1))
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
  const [selectedNiche, setSelectedNiche] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [sortBy, setSortBy] = useState('followers');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const searchValue = searchTerm || localSearchTerm;
  const handleSearchChange = onSearchChange || setLocalSearchTerm;

  const filteredInfluencers = influencers.filter(influencer => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                         influencer.niche.toLowerCase().includes(searchValue.toLowerCase()) ||
                         influencer.username.toLowerCase().includes(searchValue.toLowerCase());
    const matchesNiche = selectedNiche === 'all' || influencer.niche === selectedNiche;
    const matchesPlatform = selectedPlatform === 'all' || influencer.platforms.includes(selectedPlatform);
    return matchesSearch && matchesNiche && matchesPlatform;
  });

  const sortedInfluencers = [...filteredInfluencers].sort((a, b) => {
    switch (sortBy) {
      case 'followers':
        return parseInt(b.followers.split('-')[0]) - parseInt(a.followers.split('-')[0]);
      case 'engagement':
        return parseFloat(b.engagement) - parseFloat(a.engagement);
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const niches = Array.from(new Set(influencers.map(inf => inf.niche)));
  const platforms = ['Instagram', 'TikTok', 'YouTube', 'Twitter/X', 'LinkedIn'];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram': return <Instagram className="h-4 w-4" />;
      case 'YouTube': return <Youtube className="h-4 w-4" />;
      case 'TikTok': return <Play className="h-4 w-4" />;
      default: return <Camera className="h-4 w-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Instagram': return 'bg-gradient-to-r from-purple-400 to-pink-400 text-white';
      case 'YouTube': return 'bg-red-500 text-white';
      case 'TikTok': return 'bg-black text-white';
      case 'Twitter/X': return 'bg-blue-500 text-white';
      case 'LinkedIn': return 'bg-blue-700 text-white';
      default: return 'bg-gray-500 text-white';
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

      {/* Enhanced Header */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full">
            <Camera className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Social Media Creators
          </h2>
        </div>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
          Connect with talented content creators and influencers who are shaping digital culture across platforms. 
          Discover authentic voices, creative talents, and brand partnership opportunities.
        </p>
      </div>

      {/* Enhanced Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <div className="text-center p-6 bg-gradient-to-br from-pink-50 via-pink-100 to-rose-100 rounded-2xl border border-pink-200 shadow-lg">
          <div className="text-3xl font-bold text-pink-600 mb-2">{sortedInfluencers.length}</div>
          <div className="text-pink-700 text-sm font-medium">Active Creators</div>
          <div className="text-pink-500 text-xs mt-1">Ready to Connect</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-purple-50 via-purple-100 to-violet-100 rounded-2xl border border-purple-200 shadow-lg">
          <div className="text-3xl font-bold text-purple-600 mb-2">{niches.length}+</div>
          <div className="text-purple-700 text-sm font-medium">Content Niches</div>
          <div className="text-purple-500 text-xs mt-1">Diverse Expertise</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-100 rounded-2xl border border-blue-200 shadow-lg">
          <div className="text-3xl font-bold text-blue-600 mb-2">15M+</div>
          <div className="text-blue-700 text-sm font-medium">Total Reach</div>
          <div className="text-blue-500 text-xs mt-1">Combined Followers</div>
        </div>
        <div className="text-center p-6 bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 rounded-2xl border border-green-200 shadow-lg">
          <div className="text-3xl font-bold text-green-600 mb-2">4.8★</div>
          <div className="text-green-700 text-sm font-medium">Avg Rating</div>
          <div className="text-green-500 text-xs mt-1">Quality Content</div>
        </div>
      </div>

      {/* Enhanced Search and Filters */}
      {showFilters && (
        <Card className="shadow-lg border-0 bg-gradient-to-r from-white via-pink-50/30 to-purple-50/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search creators by name, niche, or username..."
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-12 h-14 text-lg border-2 focus:border-pink-500 rounded-xl bg-white/80 backdrop-blur-sm"
                />
              </div>
              
              {/* Filter Options */}
              <div className="grid md:grid-cols-4 gap-4">
                <Select value={selectedNiche} onValueChange={setSelectedNiche}>
                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-2 hover:border-pink-300">
                    <SelectValue placeholder="All Niches" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Niches</SelectItem>
                    {niches.map((niche) => (
                      <SelectItem key={niche} value={niche}>{niche}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-2 hover:border-pink-300">
                    <SelectValue placeholder="All Platforms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    {platforms.map((platform) => (
                      <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-2 hover:border-pink-300">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="followers">Most Followers</SelectItem>
                    <SelectItem value="engagement">Best Engagement</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    onClick={() => setViewMode('grid')}
                    className="flex-1 h-12"
                  >
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    onClick={() => setViewMode('list')}
                    className="flex-1 h-12"
                  >
                    List
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Profile CTA */}
      {onCreateProfile && (
        <div className="text-center p-8 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 rounded-2xl border-2 border-pink-200 shadow-xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-8 w-8 text-pink-500" />
            <h3 className="text-2xl font-bold text-gray-800">Are you a Content Creator?</h3>
            <Sparkles className="h-8 w-8 text-purple-500" />
          </div>
          <p className="text-gray-600 mb-6 text-lg max-w-2xl mx-auto">
            Join our vibrant community of creators and connect with brands, fellow influencers, and your audience like never before.
          </p>
          <Button 
            onClick={onCreateProfile}
            size="lg"
            className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 hover:from-pink-600 hover:via-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 text-white font-semibold px-8 py-4"
          >
            <Camera className="h-5 w-5 mr-3" />
            Create Your Creator Profile
            <Star className="h-5 w-5 ml-3" />
          </Button>
        </div>
      )}

      {/* Enhanced Creators Grid */}
      <div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
        {sortedInfluencers.map((influencer) => (
          <Card key={influencer.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.03] border-0 bg-gradient-to-br from-white via-pink-50/20 to-purple-50/20 backdrop-blur-sm overflow-hidden">
            {/* Profile Header with Cover */}
            <div className="relative h-24 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute -bottom-6 left-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-white p-1 shadow-lg">
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-pink-400 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {influencer.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  {influencer.verified && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                      <Star className="h-3 w-3 text-white fill-current" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <CardHeader className="pt-8 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                    {influencer.name}
                  </CardTitle>
                  <p className="text-purple-600 font-medium text-sm">{influencer.username}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-800 border-pink-200">
                      {influencer.niche}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-gray-600">{influencer.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{influencer.bio}</p>
              
              {/* Platforms */}
              <div className="flex flex-wrap gap-2">
                {influencer.platforms.slice(0, 3).map((platform) => (
                  <div key={platform} className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(platform)}`}>
                    {getPlatformIcon(platform)}
                    <span>{platform}</span>
                  </div>
                ))}
                {influencer.platforms.length > 3 && (
                  <div className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium text-gray-600">
                    +{influencer.platforms.length - 3} more
                  </div>
                )}
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-3 gap-3 p-3 bg-gradient-to-r from-gray-50 to-purple-50/50 rounded-xl">
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">{influencer.followers}</div>
                  <div className="text-xs text-gray-500">Followers</div>
                </div>
                <div className="text-center border-x border-gray-200">
                  <div className="text-lg font-bold text-green-600">{influencer.engagement}</div>
                  <div className="text-xs text-gray-500">Engagement</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{influencer.recentPosts}</div>
                  <div className="text-xs text-gray-500">Posts</div>
                </div>
              </div>

              {/* Content Type & Location */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <Award className="h-3 w-3" />
                  <span>{influencer.contentType}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{influencer.location}</span>
                </div>
              </div>

              {/* Enhanced Actions */}
              <div className="flex gap-2 pt-2">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Profile
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-pink-50 border-pink-200">
                  <Heart className="h-4 w-4 text-pink-500" />
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-purple-50 border-purple-200">
                  <MessageSquare className="h-4 w-4 text-purple-500" />
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-blue-50 border-blue-200">
                  <Share className="h-4 w-4 text-blue-500" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedInfluencers.length === 0 && (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Camera className="h-10 w-10 text-pink-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">No creators found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search terms or filters to discover more amazing creators.</p>
            <Button 
              onClick={() => {
                setSelectedNiche('all');
                setSelectedPlatform('all');
                handleSearchChange('');
              }}
              className="bg-gradient-to-r from-pink-500 to-purple-600"
            >
              Clear All Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialMediaBrowser;
