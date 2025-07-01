import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Camera, Users, Star, TrendingUp, Instagram, Youtube, Heart, MessageSquare, Share, Eye, Filter, Search, MapPin, Sparkles, Play, Award, ExternalLink } from 'lucide-react';

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
  const [selectedCreator, setSelectedCreator] = useState<SocialMediaInfluencer | null>(null);

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

  const handleViewProfile = (creator: SocialMediaInfluencer) => {
    setSelectedCreator(creator);
    // Simulate navigation to profile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMessage = (creator: SocialMediaInfluencer) => {
    alert(`Starting conversation with ${creator.name}...`);
  };

  const handleConnect = (creator: SocialMediaInfluencer) => {
    alert(`Sending connection request to ${creator.name}...`);
  };

  const handleCollaborate = (creator: SocialMediaInfluencer) => {
    alert(`Starting collaboration with ${creator.name}...`);
  };

  const handleViewPlatform = (creator: SocialMediaInfluencer, platform: string) => {
    let url = '';
    const username = creator.username.replace('@', '');
    
    switch (platform) {
      case 'Instagram':
        url = `https://instagram.com/${username}`;
        break;
      case 'YouTube':
        url = `https://youtube.com/@${username}`;
        break;
      case 'TikTok':
        url = `https://tiktok.com/@${username}`;
        break;
      case 'Twitter/X':
        url = `https://x.com/${username}`;
        break;
      case 'LinkedIn':
        url = `https://linkedin.com/in/${username}`;
        break;
      default:
        return;
    }
    
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Show creator profile if selected
  if (selectedCreator) {
    return (
      <div className="space-y-8">
        <Button variant="ghost" onClick={() => setSelectedCreator(null)} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Creators
        </Button>
        
        {/* Enhanced Creator Profile View */}
        <div className="max-w-4xl mx-auto">
          {/* Profile Header with Better Colors */}
          <Card className="overflow-hidden shadow-2xl border-0">
            <div className="relative h-72 bg-gradient-to-br from-indigo-600 via-purple-700 via-pink-600 to-orange-500">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              {/* Animated Background Elements */}
              <div className="absolute top-6 left-6 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
              <div className="absolute top-12 right-8 w-16 h-16 bg-pink-400/20 rounded-full animate-bounce"></div>
              <div className="absolute bottom-20 right-20 w-12 h-12 bg-yellow-400/30 rounded-full animate-ping"></div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-end gap-6">
                  <div className="relative">
                    <div className="w-36 h-36 rounded-full bg-white p-3 shadow-2xl ring-4 ring-white/20">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center relative overflow-hidden">
                        <span className="text-white font-bold text-5xl z-10">
                          {selectedCreator.name.charAt(0)}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
                      </div>
                    </div>
                    {selectedCreator.verified && (
                      <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                        <Star className="h-6 w-6 text-white fill-current" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-white pb-4">
                    <h1 className="text-5xl font-bold mb-3 drop-shadow-lg">{selectedCreator.name}</h1>
                    <p className="text-2xl text-white/90 mb-3 font-medium">{selectedCreator.username}</p>
                    <div className="flex items-center gap-4 mb-6">
                      <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-4 py-2 text-sm font-semibold">
                        {selectedCreator.niche}
                      </Badge>
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
                        <Star className="h-5 w-5 text-yellow-300 fill-current" />
                        <span className="font-bold text-lg">{selectedCreator.rating}</span>
                      </div>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      <Button onClick={() => handleMessage(selectedCreator)} className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30 font-semibold">
                        <MessageSquare className="h-5 w-5 mr-2" />
                        Message
                      </Button>
                      <Button onClick={() => handleConnect(selectedCreator)} className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold shadow-lg">
                        <Heart className="h-5 w-5 mr-2" />
                        Connect
                      </Button>
                      <Button onClick={() => handleCollaborate(selectedCreator)} className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-lg">
                        <Star className="h-5 w-5 mr-2" />
                        Collaborate
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Profile Content */}
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="md:col-span-2 space-y-6">
              {/* About */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800">About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-lg">{selectedCreator.bio}</p>
                  <div className="flex items-center gap-2 mt-4 text-gray-600">
                    <MapPin className="h-5 w-5" />
                    <span className="font-medium">{selectedCreator.location}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Platforms with Click Integration */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
                    <Share className="h-6 w-6 text-purple-600" />
                    Social Platforms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {selectedCreator.platforms.map((platform) => (
                      <button
                        key={platform}
                        onClick={() => handleViewPlatform(selectedCreator, platform)}
                        className={`flex items-center justify-between gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg group ${getPlatformColor(platform)}`}
                      >
                        <div className="flex items-center gap-3">
                          {getPlatformIcon(platform)}
                          <span className="text-lg">{platform}</span>
                        </div>
                        <ExternalLink className="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-4 text-center font-medium">
                    Click on any platform to visit {selectedCreator.name}'s profile
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Enhanced Stats */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Performance Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl border border-purple-200">
                    <div className="text-3xl font-bold text-purple-700 mb-1">{selectedCreator.followers}</div>
                    <div className="text-sm font-medium text-purple-600">Total Followers</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl border border-green-200">
                    <div className="text-3xl font-bold text-green-700 mb-1">{selectedCreator.engagement}</div>
                    <div className="text-sm font-medium text-green-600">Engagement Rate</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl border border-blue-200">
                    <div className="text-3xl font-bold text-blue-700 mb-1">{selectedCreator.recentPosts}</div>
                    <div className="text-sm font-medium text-blue-600">Recent Posts</div>
                  </div>
                </CardContent>
              </Card>

              {/* Content Type */}
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-orange-50">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800">Content Focus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl border border-orange-200">
                    <div className="flex items-center justify-center gap-2">
                      <Award className="h-5 w-5 text-orange-600" />
                      <span className="font-semibold text-orange-700">{selectedCreator.contentType}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {onBack && (
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Browse
        </Button>
      )}

      {/* AWESOME Enhanced Header */}
      <div className="relative overflow-hidden">
        {/* Background with animated gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900 opacity-90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,69,255,0.3),transparent_50%)]"></div>
        
        {/* Floating elements */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-6 h-6 bg-pink-400/30 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-blue-400/40 rounded-full animate-ping"></div>
        
        <div className="relative text-center py-20 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Main title with enhanced styling */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <Camera className="h-12 w-12 text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent leading-tight">
                  Social Media
                </h1>
                <div className="flex items-center gap-3 justify-center mt-2">
                  <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
                  <h2 className="text-4xl font-bold text-white">Creators</h2>
                  <Sparkles className="h-8 w-8 text-yellow-400 animate-pulse" />
                </div>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <TrendingUp className="h-12 w-12 text-white" />
              </div>
            </div>
            
            {/* Subtitle with typing effect simulation */}
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto font-light">
              Connect with talented content creators and influencers who are 
              <span className="font-semibold text-pink-300"> shaping digital culture </span>
              across platforms. Discover 
              <span className="font-semibold text-purple-300"> authentic voices</span>, 
              <span className="font-semibold text-blue-300"> creative talents</span>, and 
              <span className="font-semibold text-yellow-300"> brand partnership opportunities</span>.
            </p>
            
            {/* Animated CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {onCreateProfile && (
                <Button 
                  onClick={onCreateProfile}
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 hover:from-pink-600 hover:via-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-full shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <Star className="h-5 w-5 mr-3" />
                  Join the Creator Community
                  <Sparkles className="h-5 w-5 ml-3" />
                </Button>
              )}
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <Eye className="h-5 w-5 mr-3" />
                Explore Creators
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom wave effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 fill-white">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
          </svg>
        </div>
      </div>

      {/* Enhanced Stats with animation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto -mt-8 relative z-10">
        <div className="text-center p-6 bg-white rounded-2xl shadow-2xl border-t-4 border-pink-500 transform hover:scale-105 transition-all duration-300">
          <div className="text-3xl font-bold text-pink-600 mb-2 animate-pulse">{sortedInfluencers.length}</div>
          <div className="text-pink-700 text-sm font-medium">Active Creators</div>
          <div className="text-pink-500 text-xs mt-1">Ready to Connect</div>
        </div>
        <div className="text-center p-6 bg-white rounded-2xl shadow-2xl border-t-4 border-purple-500 transform hover:scale-105 transition-all duration-300">
          <div className="text-3xl font-bold text-purple-600 mb-2 animate-pulse">{niches.length}+</div>
          <div className="text-purple-700 text-sm font-medium">Content Niches</div>
          <div className="text-purple-500 text-xs mt-1">Diverse Expertise</div>
        </div>
        <div className="text-center p-6 bg-white rounded-2xl shadow-2xl border-t-4 border-blue-500 transform hover:scale-105 transition-all duration-300">
          <div className="text-3xl font-bold text-blue-600 mb-2 animate-pulse">15M+</div>
          <div className="text-blue-700 text-sm font-medium">Total Reach</div>
          <div className="text-blue-500 text-xs mt-1">Combined Followers</div>
        </div>
        <div className="text-center p-6 bg-white rounded-2xl shadow-2xl border-t-4 border-green-500 transform hover:scale-105 transition-all duration-300">
          <div className="text-3xl font-bold text-green-600 mb-2 animate-pulse">4.8★</div>
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

      {/* Enhanced Creators Grid */}
      <div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
        {sortedInfluencers.map((influencer) => (
          <Card key={influencer.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.03] border-0 bg-gradient-to-br from-white via-pink-50/20 to-purple-50/20 backdrop-blur-sm overflow-hidden">
            {/* Profile Header with Cover */}
            <div className="relative h-24 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute -bottom-6 left-6">
                <div className="relative">
                  <button 
                    onClick={() => handleViewProfile(influencer)}
                    className="w-16 h-16 rounded-full bg-white p-1 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-pink-400 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {influencer.name.charAt(0)}
                      </span>
                    </div>
                  </button>
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
                  onClick={() => handleViewProfile(influencer)}
                  variant="default" 
                  size="sm" 
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Profile
                </Button>
                <Button 
                  onClick={() => handleMessage(influencer)}
                  variant="outline" 
                  size="sm" 
                  className="hover:bg-pink-50 border-pink-200"
                >
                  <MessageSquare className="h-4 w-4 text-pink-500" />
                </Button>
                <Button 
                  onClick={() => handleConnect(influencer)}
                  variant="outline" 
                  size="sm" 
                  className="hover:bg-purple-50 border-purple-200"
                >
                  <Heart className="h-4 w-4 text-purple-500" />
                </Button>
                <Button 
                  onClick={() => handleCollaborate(influencer)}
                  variant="outline" 
                  size="sm" 
                  className="hover:bg-blue-50 border-blue-200"
                >
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
