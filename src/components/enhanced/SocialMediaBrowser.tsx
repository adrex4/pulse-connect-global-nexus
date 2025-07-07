
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, Users, Star, Eye, MessageCircle, ArrowLeft, 
  Instagram, Youtube, TikTok, Send 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialMediaBrowserProps {
  onBack?: () => void;
}

// Updated niche images for social media creators
const CREATOR_NICHE_IMAGES = {
  'Entertainment & Comedy': 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=1200&h=400&fit=crop',
  'Business & Finance': 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200&h=400&fit=crop',
  'Food & Cooking': 'https://images.unsplash.com/photo-1556805572-c8bb2d7364e0?w=1200&h=400&fit=crop',
  'Lifestyle & Wellness': 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&h=400&fit=crop',
  'Technology': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=400&fit=crop',
  'Travel & Adventure': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=400&fit=crop',
  'Fashion & Beauty': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=400&fit=crop',
  'Education & Learning': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=400&fit=crop'
};

const mockCreators = [
  {
    id: '1',
    name: 'Sarah Johnson',
    username: '@sarahcooks',
    niche: 'Food & Cooking',
    followers: 125000,
    averageViews: 45000,
    engagementRate: 4.2,
    rating: 4.8,
    reviewCount: 89,
    bio: 'Professional chef sharing easy home cooking recipes and kitchen tips. Let me help you create delicious meals!',
    platforms: ['Instagram', 'TikTok', 'Youtube'],
    country: 'United States',
    contentTypes: ['Recipe Videos', 'Cooking Tips', 'Kitchen Reviews'],
    collaborationRates: {
      post: '$500-800',
      story: '$200-350',
      reel: '$750-1200'
    }
  },
  {
    id: '2',
    name: 'Mike Chen',
    username: '@techmiketalks',
    niche: 'Technology',
    followers: 89000,
    averageViews: 32000,
    engagementRate: 3.9,
    rating: 4.7,
    reviewCount: 124,
    bio: 'Tech enthusiast breaking down the latest gadgets and trends. Making technology accessible for everyone.',
    platforms: ['Youtube', 'Instagram'],
    country: 'Canada',
    contentTypes: ['Product Reviews', 'Tech Tutorials', 'Industry News'],
    collaborationRates: {
      post: '$400-650',
      story: '$150-250',
      reel: '$600-900'
    }
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    username: '@emmafitlife',
    niche: 'Lifestyle & Wellness',
    followers: 156000,
    averageViews: 68000,
    engagementRate: 5.1,
    rating: 4.9,
    reviewCount: 203,
    bio: 'Certified fitness trainer and wellness coach inspiring healthy lifestyle choices and mental well-being.',
    platforms: ['Instagram', 'TikTok'],
    country: 'Australia',
    contentTypes: ['Workout Videos', 'Wellness Tips', 'Lifestyle Content'],
    collaborationRates: {
      post: '$600-950',
      story: '$250-400',
      reel: '$800-1300'
    }
  },
  {
    id: '4',
    name: 'David Kim',
    username: '@businesswithdave',
    niche: 'Business & Finance',
    followers: 98000,
    averageViews: 41000,
    engagementRate: 4.3,
    rating: 4.6,
    reviewCount: 67,
    bio: 'Entrepreneur and business consultant sharing strategies for success, investment tips, and financial literacy.',
    platforms: ['Youtube', 'Instagram'],
    country: 'United States',
    contentTypes: ['Business Tips', 'Investment Advice', 'Success Stories'],
    collaborationRates: {
      post: '$450-700',
      story: '$180-280',
      reel: '$650-1000'
    }
  },
  {
    id: '5',
    name: 'Comedy Central Jake',
    username: '@jakejokes',
    niche: 'Entertainment & Comedy',
    followers: 203000,
    averageViews: 95000,
    engagementRate: 6.2,
    rating: 4.8,
    reviewCount: 156,
    bio: 'Stand-up comedian bringing daily laughs and entertainment. Life is better when you are laughing!',
    platforms: ['TikTok', 'Instagram', 'Youtube'],
    country: 'United Kingdom',
    contentTypes: ['Comedy Skits', 'Stand-up Clips', 'Funny Observations'],
    collaborationRates: {
      post: '$700-1100',
      story: '$300-450',
      reel: '$900-1500'
    }
  }
];

const niches = [
  'Entertainment & Comedy',
  'Business & Finance', 
  'Food & Cooking',
  'Lifestyle & Wellness',
  'Technology',
  'Travel & Adventure',
  'Fashion & Beauty',
  'Education & Learning'
];

const SocialMediaBrowser: React.FC<SocialMediaBrowserProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('all_niches');
  const [selectedPlatform, setSelectedPlatform] = useState('all_platforms');
  const [followerRange, setFollowerRange] = useState('any_range');
  const [selectedCreator, setSelectedCreator] = useState<any>(null);
  const [filteredCreators, setFilteredCreators] = useState(mockCreators);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const { toast } = useToast();

  const handleSearch = () => {
    let filtered = mockCreators;

    if (searchTerm) {
      filtered = filtered.filter(creator =>
        creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.niche.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedNiche && selectedNiche !== 'all_niches') {
      filtered = filtered.filter(creator => creator.niche === selectedNiche);
    }

    if (selectedPlatform && selectedPlatform !== 'all_platforms') {
      filtered = filtered.filter(creator => 
        creator.platforms.includes(selectedPlatform)
      );
    }

    if (followerRange && followerRange !== 'any_range') {
      const [min, max] = followerRange.split('-').map(Number);
      filtered = filtered.filter(creator => {
        return creator.followers >= min && (max ? creator.followers <= max : true);
      });
    }

    setFilteredCreators(filtered);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a message before sending.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Message Sent!",
      description: `Your collaboration request has been sent to ${selectedCreator?.name}.`
    });
    setMessageText('');
    setMessageOpen(false);
  };

  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram': return <Instagram className="h-4 w-4" />;
      case 'Youtube': return <Youtube className="h-4 w-4" />;
      case 'TikTok': return <TikTok className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getHeaderImage = () => {
    if (selectedNiche === 'all_niches') {
      return 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=400&fit=crop';
    }
    return CREATOR_NICHE_IMAGES[selectedNiche as keyof typeof CREATOR_NICHE_IMAGES] || 
           'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=400&fit=crop';
  };

  React.useEffect(() => {
    handleSearch();
  }, [searchTerm, selectedNiche, selectedPlatform, followerRange]);

  if (selectedCreator) {
    return (
      <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setSelectedCreator(null)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Creator Directory
          </Button>
        </div>

        <Card className="shadow-xl border-0">
          <div 
            className="h-48 bg-cover bg-center relative rounded-t-lg"
            style={{ backgroundImage: `url(${getHeaderImage()})` }}
          >
            <div className="absolute inset-0 bg-black/50 rounded-t-lg"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl font-bold mb-2">{selectedCreator.name}</h1>
              <p className="text-xl opacity-90">{selectedCreator.username}</p>
            </div>
            <div className="absolute top-6 right-6">
              <Badge className="bg-purple-600 text-white">
                {selectedCreator.niche}
              </Badge>
            </div>
          </div>

          <CardContent className="p-8 space-y-6">
            {/* Creator Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{formatFollowers(selectedCreator.followers)}</div>
                <div className="text-sm text-gray-600">Followers</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{formatFollowers(selectedCreator.averageViews)}</div>
                <div className="text-sm text-gray-600">Avg Views</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{selectedCreator.engagementRate}%</div>
                <div className="text-sm text-gray-600">Engagement</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{selectedCreator.rating}</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h3 className="text-xl font-semibold mb-3">About</h3>
              <p className="text-gray-700 leading-relaxed">{selectedCreator.bio}</p>
            </div>

            {/* Platforms */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Active Platforms</h3>
              <div className="flex gap-3">
                {selectedCreator.platforms.map((platform: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                    {getPlatformIcon(platform)}
                    <span className="font-medium">{platform}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Types */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Content Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCreator.contentTypes.map((type: string, index: number) => (
                  <Badge key={index} variant="outline" className="px-3 py-1">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Collaboration Rates */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Collaboration Rates</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <div className="font-semibold text-blue-800">Post</div>
                  <div className="text-lg font-bold text-blue-600">{selectedCreator.collaborationRates.post}</div>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <div className="font-semibold text-green-800">Story</div>
                  <div className="text-lg font-bold text-green-600">{selectedCreator.collaborationRates.story}</div>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                  <div className="font-semibold text-purple-800">Reel</div>
                  <div className="text-lg font-bold text-purple-600">{selectedCreator.collaborationRates.reel}</div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-6 border-t">
              <Button 
                onClick={() => setMessageOpen(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Collaboration Request
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Message Modal */}
        <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-purple-600" />
                Contact {selectedCreator?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Write your collaboration proposal here..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="min-h-[120px]"
              />
              <div className="flex gap-2">
                <Button onClick={handleSendMessage} className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" onClick={() => setMessageOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Header with Dynamic Background */}
      <Card className="mb-6 shadow-lg border-0 bg-white overflow-hidden">
        <div 
          className="h-32 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${getHeaderImage()})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-white" />
                <CardTitle className="text-2xl text-white">Social Media Creators</CardTitle>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {filteredCreators.length} Creators Available
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-6">
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search creators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>
            </div>

            <Select value={selectedNiche} onValueChange={setSelectedNiche}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Niche" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_niches">All Niches</SelectItem>
                {niches.map((niche) => (
                  <SelectItem key={niche} value={niche}>
                    {niche}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_platforms">All Platforms</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="Youtube">YouTube</SelectItem>
                <SelectItem value="TikTok">TikTok</SelectItem>
              </SelectContent>
            </Select>

            <Select value={followerRange} onValueChange={setFollowerRange}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Followers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any_range">Any Range</SelectItem>
                <SelectItem value="1000-10000">1K - 10K</SelectItem>
                <SelectItem value="10000-50000">10K - 50K</SelectItem>
                <SelectItem value="50000-100000">50K - 100K</SelectItem>
                <SelectItem value="100000-500000">100K - 500K</SelectItem>
                <SelectItem value="500000-1000000">500K - 1M</SelectItem>
                <SelectItem value="1000000-999999999">1M+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        {filteredCreators.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No creators found</h3>
              <p>Try adjusting your search criteria to find more creators.</p>
            </div>
          </Card>
        ) : (
          filteredCreators.map((creator) => (
            <Card 
              key={creator.id} 
              className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-purple-500 cursor-pointer"
              onClick={() => setSelectedCreator(creator)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {creator.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-xl text-gray-900">{creator.name}</h3>
                      <span className="text-purple-600 font-medium">{creator.username}</span>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-medium">{creator.rating}</span>
                        <span className="text-gray-500">({creator.reviewCount})</span>
                      </div>
                    </div>
                    
                    <Badge variant="outline" className="mb-3">
                      {creator.niche}
                    </Badge>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{creator.bio}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{formatFollowers(creator.followers)} followers</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{formatFollowers(creator.averageViews)} avg views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{creator.engagementRate}% engagement</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      {creator.platforms.map((platform: string, index: number) => (
                        <div key={index} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-xs">
                          {getPlatformIcon(platform)}
                          <span>{platform}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SocialMediaBrowser;
