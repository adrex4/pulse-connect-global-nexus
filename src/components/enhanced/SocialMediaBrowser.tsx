
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, Heart, MessageCircle, Share2, Eye, Users, 
  Calendar, MapPin, Globe, Instagram, Youtube, 
  Twitter, TrendingUp, Camera, Play, Mic, Palette,
  BookOpen, Gamepad, Music, Utensils, Plane, Dumbbell
} from 'lucide-react';

interface SocialMediaBrowserProps {
  onCreateProfile?: () => void;
  showFilters?: boolean;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

// Expanded creator niches with more comprehensive categories
const creatorNiches = [
  {
    name: 'Lifestyle & Fashion',
    icon: <Camera className="h-8 w-8 text-pink-500" />,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop',
    description: 'Fashion, beauty, lifestyle content',
    followers: '2.5M+',
    categories: ['Fashion', 'Beauty', 'Lifestyle', 'Style', 'OOTD']
  },
  {
    name: 'Food & Cooking',
    icon: <Utensils className="h-8 w-8 text-orange-500" />,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
    description: 'Recipe creators, food bloggers, cooking shows',
    followers: '1.8M+',
    categories: ['Cooking', 'Recipes', 'Food Reviews', 'Restaurants', 'Baking']
  },
  {
    name: 'Travel & Adventure',
    icon: <Plane className="h-8 w-8 text-blue-500" />,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop',
    description: 'Travel bloggers, adventure seekers',
    followers: '3.2M+',
    categories: ['Travel', 'Adventure', 'Backpacking', 'Culture', 'Photography']
  },
  {
    name: 'Fitness & Health',
    icon: <Dumbbell className="h-8 w-8 text-green-500" />,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
    description: 'Fitness trainers, wellness coaches',
    followers: '2.1M+',
    categories: ['Fitness', 'Wellness', 'Nutrition', 'Yoga', 'Mental Health']
  },
  {
    name: 'Gaming & Esports',
    icon: <Gamepad className="h-8 w-8 text-purple-500" />,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop',
    description: 'Gaming streamers, esports content',
    followers: '4.1M+',
    categories: ['Gaming', 'Streaming', 'Esports', 'Reviews', 'Tutorials']
  },
  {
    name: 'Music & Audio',
    icon: <Music className="h-8 w-8 text-red-500" />,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
    description: 'Musicians, podcasters, audio content',
    followers: '1.9M+',
    categories: ['Music', 'Podcasts', 'Audio', 'Covers', 'Original Songs']
  },
  {
    name: 'Art & Creative',
    icon: <Palette className="h-8 w-8 text-indigo-500" />,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop',
    description: 'Digital artists, traditional art, crafts',
    followers: '1.4M+',
    categories: ['Digital Art', 'Traditional Art', 'Crafts', 'DIY', 'Design']
  },
  {
    name: 'Education & Learning',
    icon: <BookOpen className="h-8 w-8 text-teal-500" />,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
    description: 'Educational content, tutorials, courses',
    followers: '2.3M+',
    categories: ['Education', 'Tutorials', 'Science', 'History', 'Languages']
  },
  {
    name: 'Technology & Innovation',
    icon: <Mic className="h-8 w-8 text-cyan-500" />,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop',
    description: 'Tech reviews, innovation, gadgets',
    followers: '1.7M+',
    categories: ['Technology', 'Reviews', 'Innovation', 'Gadgets', 'AI']
  },
  {
    name: 'Business & Entrepreneurship',
    icon: <TrendingUp className="h-8 w-8 text-amber-500" />,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    description: 'Business tips, entrepreneurship, marketing',
    followers: '1.6M+',
    categories: ['Business', 'Entrepreneurship', 'Marketing', 'Finance', 'Leadership']
  },
  {
    name: 'Home & Garden',
    icon: <Camera className="h-8 w-8 text-emerald-500" />,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
    description: 'Home decor, gardening, DIY projects',
    followers: '1.3M+',
    categories: ['Home Decor', 'Gardening', 'DIY', 'Interior Design', 'Organization']
  },
  {
    name: 'Parenting & Family',
    icon: <Heart className="h-8 w-8 text-rose-500" />,
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=400&fit=crop',
    description: 'Parenting tips, family activities, child development',
    followers: '1.1M+',
    categories: ['Parenting', 'Family', 'Kids Activities', 'Education', 'Health']
  },
  {
    name: 'Automotive & Vehicles',
    icon: <Play className="h-8 w-8 text-slate-500" />,
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop',
    description: 'Car reviews, automotive content, modifications',
    followers: '1.2M+',
    categories: ['Cars', 'Reviews', 'Modifications', 'Racing', 'Maintenance']
  },
  {
    name: 'Photography & Videography',
    icon: <Camera className="h-8 w-8 text-violet-500" />,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=400&fit=crop',
    description: 'Photography tutorials, gear reviews, techniques',
    followers: '1.5M+',
    categories: ['Photography', 'Videography', 'Tutorials', 'Gear Reviews', 'Editing']
  },
  {
    name: 'Pet & Animal Content',
    icon: <Heart className="h-8 w-8 text-yellow-500" />,
    image: 'https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=600&h=400&fit=crop',
    description: 'Pet care, animal behavior, cute pet content',
    followers: '2.0M+',
    categories: ['Pets', 'Animal Care', 'Training', 'Funny Animals', 'Wildlife']
  }
];

// Mock social media creators with enhanced data
const mockCreators = [
  {
    id: '1',
    name: 'Emma Style',
    niche: 'Lifestyle & Fashion',
    platform: 'Instagram',
    followers: '245K',
    engagement: '4.2%',
    bio: 'Fashion enthusiast sharing daily outfit inspiration and style tips. Collaborating with sustainable fashion brands.',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b1b5?w=150&h=150&fit=crop&crop=face',
    verified: true,
    recentPosts: [
      { type: 'image', likes: '12.3K', comments: '234', caption: 'Summer outfit inspiration 🌞' },
      { type: 'reel', likes: '28.7K', comments: '456', caption: 'Getting ready with me - morning routine' }
    ],
    collaborationRates: {
      post: '$500-800',
      story: '$200-300',
      reel: '$800-1200'
    }
  },
  {
    id: '2',
    name: 'Chef Marco',
    niche: 'Food & Cooking',
    platform: 'YouTube',
    followers: '89K',
    engagement: '6.8%',
    bio: 'Professional chef sharing authentic Italian recipes and cooking techniques. Making gourmet cooking accessible to everyone.',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    verified: true,
    recentPosts: [
      { type: 'video', likes: '5.2K', comments: '89', caption: 'Perfect Pasta Carbonara - Traditional Recipe' },
      { type: 'short', likes: '15.6K', comments: '234', caption: 'Quick pasta sauce hack!' }
    ],
    collaborationRates: {
      video: '$1200-2000',
      short: '$400-600',
      sponsorship: '$2500-4000'
    }
  },
  {
    id: '3',
    name: 'Adventure Alex',
    niche: 'Travel & Adventure',
    platform: 'Instagram',
    followers: '178K',
    engagement: '5.1%',
    bio: 'Digital nomad documenting adventures around the world. Sharing budget travel tips and hidden gems.',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    verified: false,
    recentPosts: [
      { type: 'image', likes: '8.9K', comments: '156', caption: 'Sunset from Bali temple 🌅' },
      { type: 'carousel', likes: '14.2K', comments: '298', caption: 'Best street food in Bangkok - thread' }
    ],
    collaborationRates: {
      post: '$400-600',
      story: '$150-250',
      reel: '$600-900'
    }
  }
];

const SocialMediaBrowser: React.FC<SocialMediaBrowserProps> = ({ 
  onCreateProfile, 
  showFilters = true,
  searchTerm = '',
  onSearchChange 
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [selectedNiche, setSelectedNiche] = useState('all_niches');
  const [selectedPlatform, setSelectedPlatform] = useState('all_platforms');
  const [followerRange, setFollowerRange] = useState('any_range');
  const [selectedCreator, setSelectedCreator] = useState<any>(null);

  const handleSearchChange = (value: string) => {
    setLocalSearchTerm(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const filteredCreators = mockCreators.filter(creator => {
    const matchesSearch = creator.name.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
      creator.niche.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
      creator.bio.toLowerCase().includes(localSearchTerm.toLowerCase());
    
    const matchesNiche = selectedNiche === 'all_niches' || creator.niche === selectedNiche;
    const matchesPlatform = selectedPlatform === 'all_platforms' || creator.platform === selectedPlatform;
    
    return matchesSearch && matchesNiche && matchesPlatform;
  });

  if (selectedCreator) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedCreator(null)}
            className="flex items-center gap-2"
          >
            ← Back to Browse
          </Button>
        </div>

        <Card className="overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 h-32"></div>
          <CardContent className="relative -mt-16 pb-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <img 
                  src={selectedCreator.profileImage} 
                  alt={selectedCreator.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
                <div className="mt-4 text-center md:text-left">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <h1 className="text-2xl font-bold">{selectedCreator.name}</h1>
                    {selectedCreator.verified && (
                      <Badge className="bg-blue-500 text-white">Verified</Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">{selectedCreator.niche}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {selectedCreator.followers} followers
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      {selectedCreator.engagement} engagement
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">About</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedCreator.bio}</p>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Recent Performance</h4>
                      <div className="space-y-2">
                        {selectedCreator.recentPosts.map((post: any, index: number) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="capitalize">{post.type}</span>
                            <span>{post.likes} likes • {post.comments} comments</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Collaboration Rates</h4>
                      <div className="space-y-2 text-sm">
                        {Object.entries(selectedCreator.collaborationRates).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="capitalize">{key}:</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact for Collaboration
                    </Button>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View Full Portfolio
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Creator Niches Grid */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Explore Creator Niches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {creatorNiches.map((niche, index) => (
            <Card 
              key={index}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden"
              onClick={() => setSelectedNiche(niche.name)}
            >
              <div className="relative h-48">
                <img 
                  src={niche.image} 
                  alt={niche.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {niche.icon}
                    <h3 className="text-white font-bold text-lg leading-tight">{niche.name}</h3>
                  </div>
                  <p className="text-white/80 text-sm mb-1">{niche.description}</p>
                  <p className="text-white/60 text-xs">{niche.followers} total followers</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      {showFilters && (
        <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search creators by name, niche, or content type..."
                  value={localSearchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 h-12 text-lg border-2 focus:border-pink-500 bg-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Niche</label>
                  <Select value={selectedNiche} onValueChange={setSelectedNiche}>
                    <SelectTrigger className="bg-white border-2 focus:border-pink-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all_niches">All Niches</SelectItem>
                      {creatorNiches.map(niche => (
                        <SelectItem key={niche.name} value={niche.name}>{niche.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                  <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                    <SelectTrigger className="bg-white border-2 focus:border-pink-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all_platforms">All Platforms</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="YouTube">YouTube</SelectItem>
                      <SelectItem value="TikTok">TikTok</SelectItem>
                      <SelectItem value="Twitter">Twitter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Followers</label>
                  <Select value={followerRange} onValueChange={setFollowerRange}>
                    <SelectTrigger className="bg-white border-2 focus:border-pink-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any_range">Any Range</SelectItem>
                      <SelectItem value="1k-10k">1K - 10K</SelectItem>
                      <SelectItem value="10k-100k">10K - 100K</SelectItem>
                      <SelectItem value="100k-1m">100K - 1M</SelectItem>
                      <SelectItem value="1m+">1M+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      handleSearchChange('');
                      setSelectedNiche('all_niches');
                      setSelectedPlatform('all_platforms');
                      setFollowerRange('any_range');
                    }}
                    className="w-full bg-white hover:bg-gray-50 border-2"
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>

              <div className="text-center text-sm text-gray-600">
                Found {filteredCreators.length} creators
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Creators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCreators.map((creator) => (
          <Card 
            key={creator.id}
            className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
            onClick={() => setSelectedCreator(creator)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <img 
                  src={creator.profileImage} 
                  alt={creator.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg">{creator.name}</h3>
                    {creator.verified && (
                      <Badge className="bg-blue-500 text-white text-xs">✓</Badge>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{creator.niche}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {creator.followers}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {creator.engagement}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 text-sm mt-4 line-clamp-2">{creator.bio}</p>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <Badge variant="outline" className="text-xs">
                  {creator.platform}
                </Badge>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" className="text-xs bg-gradient-to-r from-pink-500 to-purple-500">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredCreators.length === 0 && (
        <Card className="text-center py-12 bg-gradient-to-br from-gray-50 to-pink-50">
          <CardContent>
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No creators found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search criteria or explore different niches</p>
          </CardContent>
        </Card>
      )}

      {/* Call to Action */}
      {onCreateProfile && (
        <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-200">
          <CardContent className="text-center py-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Become a Creator?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of creators who are building their brand and connecting with their audience on ConnectPulse.
            </p>
            <Button 
              onClick={onCreateProfile}
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Camera className="h-5 w-5 mr-2" />
              Create Creator Profile
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SocialMediaBrowser;
