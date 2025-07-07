import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Camera, Users, Star, TrendingUp, Instagram, Youtube, Heart, MessageSquare, Share, Eye, Filter, Search, MapPin, Sparkles, Play, Award, ExternalLink, Send, Mail, Clock, CheckCircle, Video } from 'lucide-react';

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
  const [messageModal, setMessageModal] = useState<{
    isOpen: boolean;
    creator: SocialMediaInfluencer | null;
  }>({ isOpen: false, creator: null });
  const [messageData, setMessageData] = useState({
    subject: '',
    message: '',
    priority: 'normal'
  });
  const [isMessageSending, setIsMessageSending] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

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
      case 'TikTok': return <Video className="h-4 w-4" />;
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

  const getNicheImage = (niche: string) => {
    const nicheImages: { [key: string]: string } = {
      'Fashion & Beauty': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop',
      'Fitness & Health': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      'Food & Cooking': 'https://images.unsplash.com/photo-1556909114-5b83b6c5620e?w=400&h=300&fit=crop',
      'Travel & Adventure': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
      'Technology & Gadgets': 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop',
      'Gaming & Esports': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
      'Lifestyle & Wellness': 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop',
      'Business & Finance': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
      'Education & Learning': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
      'Entertainment & Comedy': 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=300&fit=crop',
      'Art & Design': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
      'Music & Audio': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop'
    };
    return nicheImages[niche] || 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop';
  };

  const handleViewProfile = (creator: SocialMediaInfluencer) => {
    setSelectedCreator(creator);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMessage = (creator: SocialMediaInfluencer) => {
    setMessageModal({ isOpen: true, creator });
    setMessageData({ subject: '', message: '', priority: 'normal' });
    setMessageSent(false);
  };

  const handleSendMessage = async () => {
    if (!messageData.subject.trim() || !messageData.message.trim()) {
      return;
    }

    setIsMessageSending(true);
    
    // Simulate sending message
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsMessageSending(false);
    setMessageSent(true);
    
    setTimeout(() => {
      setMessageModal({ isOpen: false, creator: null });
      setMessageSent(false);
    }, 1500);
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => setSelectedCreator(null)} className="mb-6 hover:bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Creators
          </Button>
          
          {/* Enhanced Creator Profile View */}
          <div className="max-w-6xl mx-auto">
            {/* Profile Header */}
            <Card className="overflow-hidden shadow-2xl border-0 mb-8">
              <div className="relative h-80 bg-gradient-to-br from-violet-600 via-purple-700 via-pink-600 to-orange-500">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Animated Background Elements */}
                <div className="absolute top-8 left-8 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute top-16 right-12 w-20 h-20 bg-pink-400/20 rounded-full animate-bounce"></div>
                <div className="absolute bottom-24 right-24 w-16 h-16 bg-yellow-400/30 rounded-full animate-ping"></div>
                
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-end gap-8">
                    <div className="relative">
                      <div className="w-40 h-40 rounded-full bg-white p-4 shadow-2xl ring-4 ring-white/20">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center relative overflow-hidden">
                          <span className="text-white font-bold text-6xl z-10">
                            {selectedCreator.name.charAt(0)}
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
                        </div>
                      </div>
                      {selectedCreator.verified && (
                        <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                          <Star className="h-7 w-7 text-white fill-current" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 text-white pb-6">
                      <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">{selectedCreator.name}</h1>
                      <p className="text-2xl text-white/90 mb-4 font-medium">{selectedCreator.username}</p>
                      <div className="flex items-center gap-6 mb-8">
                        <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-6 py-3 text-lg font-semibold">
                          {selectedCreator.niche}
                        </Badge>
                        <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-3 rounded-full">
                          <Star className="h-6 w-6 text-yellow-300 fill-current" />
                          <span className="font-bold text-xl">{selectedCreator.rating}</span>
                        </div>
                      </div>
                      <div className="flex gap-4 flex-wrap">
                        <Button 
                          onClick={() => handleMessage(selectedCreator)} 
                          className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30 font-semibold px-6 py-3"
                        >
                          <MessageSquare className="h-5 w-5 mr-2" />
                          Message
                        </Button>
                        <Button 
                          onClick={() => handleConnect(selectedCreator)} 
                          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold shadow-lg px-6 py-3"
                        >
                          <Heart className="h-5 w-5 mr-2" />
                          Connect
                        </Button>
                        <Button 
                          onClick={() => handleCollaborate(selectedCreator)} 
                          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold shadow-lg px-6 py-3"
                        >
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
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {/* About */}
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-3xl text-gray-800">About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed text-lg mb-6">{selectedCreator.bio}</p>
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin className="h-5 w-5" />
                      <span className="font-medium text-lg">{selectedCreator.location}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Platforms */}
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-3xl text-gray-800 flex items-center gap-3">
                      <Share className="h-7 w-7 text-purple-600" />
                      Social Platforms
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {selectedCreator.platforms.map((platform) => (
                        <button
                          key={platform}
                          onClick={() => handleViewPlatform(selectedCreator, platform)}
                          className={`flex items-center justify-between gap-4 px-8 py-6 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl group text-lg ${getPlatformColor(platform)}`}
                        >
                          <div className="flex items-center gap-4">
                            {getPlatformIcon(platform)}
                            <span>{platform}</span>
                          </div>
                          <ExternalLink className="h-6 w-6 opacity-70 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-6 text-center font-medium">
                      Click on any platform to visit {selectedCreator.name}'s profile
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                {/* Enhanced Stats */}
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">Performance Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center p-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl border border-purple-200">
                      <div className="text-4xl font-bold text-purple-700 mb-2">{selectedCreator.followers}</div>
                      <div className="text-sm font-medium text-purple-600">Total Followers</div>
                    </div>
                    <div className="text-center p-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl border border-green-200">
                      <div className="text-4xl font-bold text-green-700 mb-2">{selectedCreator.engagement}</div>
                      <div className="text-sm font-medium text-green-600">Engagement Rate</div>
                    </div>
                    <div className="text-center p-8 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl border border-blue-200">
                      <div className="text-4xl font-bold text-blue-700 mb-2">{selectedCreator.recentPosts}</div>
                      <div className="text-sm font-medium text-blue-600">Recent Posts</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Content Type */}
                <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">Content Focus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-6 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl border border-orange-200">
                      <div className="flex items-center justify-center gap-3">
                        <Award className="h-6 w-6 text-orange-600" />
                        <span className="font-semibold text-orange-700 text-lg">{selectedCreator.contentType}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 space-y-12">
        {onBack && (
          <Button variant="ghost" onClick={onBack} className="mb-4 hover:bg-white/50 backdrop-blur-sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Browse
          </Button>
        )}

        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
              <Camera className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Social Media Creators
            </h1>
            <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-lg">
              <TrendingUp className="h-10 w-10 text-white" />
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect with talented content creators and influencers who are shaping digital culture across platforms.
          </p>
        </div>

        {/* Niche Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Browse by Niche</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {niches.map((niche) => (
              <Card 
                key={niche} 
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden"
                onClick={() => setSelectedNiche(niche)}
              >
                <div className="relative h-40">
                  <img 
                    src={getNicheImage(niche)} 
                    alt={niche}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg leading-tight">{niche}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-purple-600 mb-2">{sortedInfluencers.length}</div>
            <div className="text-purple-700 font-medium">Active Creators</div>
          </Card>
          <Card className="text-center p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-pink-600 mb-2">{niches.length}+</div>
            <div className="text-pink-700 font-medium">Content Niches</div>
          </Card>
          <Card className="text-center p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-blue-600 mb-2">15M+</div>
            <div className="text-blue-700 font-medium">Total Reach</div>
          </Card>
          <Card className="text-center p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-green-600 mb-2">4.8★</div>
            <div className="text-green-700 font-medium">Avg Rating</div>
          </Card>
        </div>

        {/* Search and Filters */}
        {showFilters && (
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm p-6">
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search creators by name, niche, or username..."
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-12 h-14 text-lg border-2 focus:border-purple-500 rounded-xl bg-white"
                />
              </div>
              
              {/* Filter Options */}
              <div className="grid md:grid-cols-4 gap-4">
                <Select value={selectedNiche} onValueChange={setSelectedNiche}>
                  <SelectTrigger className="h-12 bg-white border-2 hover:border-purple-300">
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
                  <SelectTrigger className="h-12 bg-white border-2 hover:border-purple-300">
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
                  <SelectTrigger className="h-12 bg-white border-2 hover:border-purple-300">
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
          </Card>
        )}

        {/* Creators Grid */}
        <div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
          {sortedInfluencers.map((influencer) => (
            <Card key={influencer.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
              {/* Profile Header */}
              <div className="relative h-28 bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute -bottom-8 left-6">
                  <div className="relative">
                    <button 
                      onClick={() => handleViewProfile(influencer)}
                      className="w-20 h-20 rounded-full bg-white p-1 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
                    >
                      <div className="w-full h-full rounded-full bg-gradient-to-r from-pink-400 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          {influencer.name.charAt(0)}
                        </span>
                      </div>
                    </button>
                    {influencer.verified && (
                      <div className="absolute -top-1 -right-1 w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                        <Star className="h-4 w-4 text-white fill-current" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <CardHeader className="pt-12 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors mb-1">
                      {influencer.name}
                    </CardTitle>
                    <p className="text-purple-600 font-medium text-sm mb-3">{influencer.username}</p>
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-800 border-pink-200 px-3 py-1">
                        {influencer.niche}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
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
                    <div key={platform} className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getPlatformColor(platform)}`}>
                      {getPlatformIcon(platform)}
                      <span>{platform}</span>
                    </div>
                  ))}
                  {influencer.platforms.length > 3 && (
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-600">
                      +{influencer.platforms.length - 3} more
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 p-4 bg-gradient-to-r from-gray-50 to-purple-50/50 rounded-xl">
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

                {/* Location & Content Type */}
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

                {/* Actions */}
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Message Modal */}
        <Dialog open={messageModal.isOpen} onOpenChange={(open) => !open && setMessageModal({ isOpen: false, creator: null })}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-500" />
                Send Message to {messageModal.creator?.name}
              </DialogTitle>
            </DialogHeader>
            
            {!messageSent ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Subject</label>
                  <Input
                    placeholder="Enter message subject..."
                    value={messageData.subject}
                    onChange={(e) => setMessageData(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Message</label>
                  <Textarea
                    placeholder="Write your message here..."
                    value={messageData.message}
                    onChange={(e) => setMessageData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full h-32 resize-none"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Priority</label>
                  <Select value={messageData.priority} onValueChange={(value) => setMessageData(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="normal">Normal Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setMessageModal({ isOpen: false, creator: null })}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!messageData.subject.trim() || !messageData.message.trim() || isMessageSending}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    {isMessageSending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-gray-600">Your message has been delivered to {messageModal.creator?.name}.</p>
              </div>
            )}
          </DialogContent>
        </Dialog>

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
    </div>
  );
};

export default SocialMediaBrowser;
