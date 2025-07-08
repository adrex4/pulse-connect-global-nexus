import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Filter, MapPin, Star, Users, Heart, Share2, 
  Video, Instagram, Twitter, ArrowLeft, Globe
} from 'lucide-react';

interface SocialMediaBrowserProps {
  onCreateProfile: () => void;
  showFilters: boolean;
  searchTerm: string;
  onSearchChange: React.Dispatch<React.SetStateAction<string>>;
  onBack?: () => void;
}

// Mock creator data
const mockCreators = [
  {
    id: '1',
    name: 'Alex Thompson',
    niche: 'Lifestyle & Wellness',
    platform: 'Instagram',
    followers: 150000,
    engagementRate: '3.5%',
    location: 'Los Angeles, CA',
    demographics: '25-34, predominantly female',
    contentExamples: ['Daily routines', 'Healthy recipes', 'Mindfulness tips'],
    averageViews: '50k',
    averageLikes: '10k',
    averageComments: '500',
    website: 'https://www.example.com/alexthompson',
    contactEmail: 'alex.thompson@example.com'
  },
  {
    id: '2',
    name: 'Jordan Rivers',
    niche: 'Gaming & Esports',
    platform: 'YouTube',
    followers: 750000,
    engagementRate: '4.2%',
    location: 'Toronto, Canada',
    demographics: '18-24, predominantly male',
    contentExamples: ['Game walkthroughs', 'Live streams', 'Esports commentary'],
    averageViews: '250k',
    averageLikes: '25k',
    averageComments: '2k',
    website: 'https://www.example.com/jordanrivers',
    contactEmail: 'jordan.rivers@example.com'
  },
  {
    id: '3',
    name: 'Casey Green',
    niche: 'Food & Cooking',
    platform: 'TikTok',
    followers: 2000000,
    engagementRate: '6.8%',
    location: 'New York, NY',
    demographics: '16-24, mixed gender',
    contentExamples: ['Quick recipes', 'Food challenges', 'Restaurant reviews'],
    averageViews: '1M',
    averageLikes: '200k',
    averageComments: '5k',
    website: 'https://www.example.com/caseygreen',
    contactEmail: 'casey.green@example.com'
  },
  {
    id: '4',
    name: 'Jamie Lee',
    niche: 'Fashion & Beauty',
    platform: 'Instagram',
    followers: 500000,
    engagementRate: '5.1%',
    location: 'London, UK',
    demographics: '20-30, predominantly female',
    contentExamples: ['Outfit showcases', 'Makeup tutorials', 'Beauty product reviews'],
    averageViews: '150k',
    averageLikes: '30k',
    averageComments: '1k',
    website: 'https://www.example.com/jamielee',
    contactEmail: 'jamie.lee@example.com'
  },
  {
    id: '5',
    name: 'Morgan Davis',
    niche: 'Travel & Adventure',
    platform: 'YouTube',
    followers: 300000,
    engagementRate: '2.9%',
    location: 'Sydney, Australia',
    demographics: '25-40, mixed gender',
    contentExamples: ['Travel vlogs', 'Adventure tips', 'Destination guides'],
    averageViews: '100k',
    averageLikes: '10k',
    averageComments: '800',
    website: 'https://www.example.com/morgandavis',
    contactEmail: 'morgan.davis@example.com'
  },
  {
    id: '6',
    name: 'Taylor Swift',
    niche: 'Technology & Gadgets',
    platform: 'Twitter',
    followers: 1000000,
    engagementRate: '1.5%',
    location: 'San Francisco, CA',
    demographics: '22-35, predominantly male',
    contentExamples: ['Tech reviews', 'Gadget unboxings', 'Software tutorials'],
    averageViews: 'N/A',
    averageLikes: '5k',
    averageComments: '200',
    website: 'https://www.example.com/taylorswift',
    contactEmail: 'taylor.swift@example.com'
  }
];

const SOCIAL_MEDIA_NICHES = [
  'Lifestyle & Wellness',
  'Entertainment & Comedy',
  'Business & Finance',
  'Food & Cooking',
  'Technology & Gadgets',
  'Fashion & Beauty',
  'Travel & Adventure',
  'Gaming & Esports',
  'Education & Learning',
  'Art & Creativity',
  'Sports & Fitness',
  'Music & Audio'
];

const SOCIAL_MEDIA_PLATFORMS = [
  'Instagram',
  'YouTube',
  'TikTok',
  'Twitter',
  'Facebook',
  'Twitch',
  'LinkedIn'
];

const getNicheImage = (niche: string) => {
  const nicheImages: { [key: string]: string } = {
    'Lifestyle & Wellness': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    'Entertainment & Comedy': 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop',
    'Business & Finance': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    'Food & Cooking': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    'Technology & Gadgets': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
    'Fashion & Beauty': 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop',
    'Travel & Adventure': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
    'Gaming & Esports': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
    'Education & Learning': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    'Art & Creativity': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
    'Sports & Fitness': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    'Music & Audio': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop'
  };
  return nicheImages[niche] || 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop';
};

const SocialMediaBrowser: React.FC<SocialMediaBrowserProps> = ({ 
  onCreateProfile, 
  showFilters, 
  searchTerm, 
  onSearchChange,
  onBack 
}) => {
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [filteredCreators, setFilteredCreators] = useState(mockCreators);

  const handleSearch = () => {
    let filtered = mockCreators;

    if (searchTerm) {
      filtered = filtered.filter(creator =>
        creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.niche.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedNiche) {
      filtered = filtered.filter(creator => creator.niche === selectedNiche);
    }

    if (selectedPlatform) {
      filtered = filtered.filter(creator => creator.platform === selectedPlatform);
    }

    setFilteredCreators(filtered);
  };

  React.useEffect(() => {
    handleSearch();
  }, [searchTerm, selectedNiche, selectedPlatform]);

  const uniqueNiches = Array.from(new Set(mockCreators.map(creator => creator.niche)));
  const uniquePlatforms = Array.from(new Set(mockCreators.map(creator => creator.platform)));

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Header Image Section */}
      <div className="relative h-80 mb-8 rounded-2xl overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=1200&h=400&fit=crop"
          alt="Social Media Creators"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/80 via-purple-900/70 to-blue-900/80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Video className="h-12 w-12" />
              </div>
              <h1 className="text-6xl font-bold drop-shadow-lg">Social Media Creators</h1>
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Share2 className="h-12 w-12" />
              </div>
            </div>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Connect with talented content creators and influencers who are shaping digital culture across platforms
            </p>
          </div>
        </div>
      </div>

      {/* Browse by Niche */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Browse by Niche</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {uniqueNiches.slice(0, 12).map((niche) => (
            <Card 
              key={niche} 
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden"
              onClick={() => setSelectedNiche(niche)}
            >
              <div className="relative h-32">
                <img 
                  src={getNicheImage(niche)} 
                  alt={niche}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-bold text-sm leading-tight">{niche}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Header */}
      <Card className="mb-6 shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6" />
                <CardTitle className="text-2xl">Find Social Media Creators</CardTitle>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white">
              {filteredCreators.length} Creators Available
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name or niche..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>
            </div>

            <Select value={selectedNiche || ''} onValueChange={setSelectedNiche}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Niche" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Niches</SelectItem>
                {SOCIAL_MEDIA_NICHES.map((niche) => (
                  <SelectItem key={niche} value={niche}>
                    {niche}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPlatform || ''} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Platforms</SelectItem>
                {SOCIAL_MEDIA_PLATFORMS.map((platform) => (
                  <SelectItem key={platform} value={platform}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {showFilters && (
              <div>
                <Button onClick={onCreateProfile} className="w-full h-10">
                  Create Profile
                </Button>
              </div>
            )}
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
              <p>Try adjusting your search criteria to find more influencers.</p>
            </div>
          </Card>
        ) : (
          filteredCreators.map((creator) => (
            <Card key={creator.id} className="shadow-md hover:shadow-lg transition-shadow duration-300 border-0">
              <CardHeader className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full overflow-hidden w-12 h-12 bg-gray-100">
                    <img
                      src={`https://source.unsplash.com/400x400/?portrait&${creator.name}`}
                      alt={creator.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">{creator.name}</CardTitle>
                    <p className="text-sm text-gray-500">{creator.niche} on {creator.platform}</p>
                  </div>
                </div>
                <Badge variant="outline">
                  {creator.followers.toLocaleString()} Followers
                </Badge>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Engagement</h4>
                  <p className="text-gray-600">
                    <Star className="inline-block h-4 w-4 mr-1 align-middle" />
                    {creator.engagementRate}
                  </p>
                  <p className="text-gray-600">
                    <Heart className="inline-block h-4 w-4 mr-1 align-middle" />
                    Avg. Likes: {creator.averageLikes}
                  </p>
                  <p className="text-gray-600">
                    <Share2 className="inline-block h-4 w-4 mr-1 align-middle" />
                    Avg. Comments: {creator.averageComments}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Demographics</h4>
                  <p className="text-gray-600">
                    <MapPin className="inline-block h-4 w-4 mr-1 align-middle" />
                    {creator.location}
                  </p>
                  <p className="text-gray-600">{creator.demographics}</p>
                </div>
              </CardContent>
              <CardContent className="flex justify-between items-center">
                <div className="flex gap-2">
                  <a href={creator.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    <Globe className="inline-block h-4 w-4 mr-1 align-middle" />
                    Website
                  </a>
                  <a href={`mailto:${creator.contactEmail}`} className="text-green-500 hover:underline">
                    Contact
                  </a>
                </div>
                <div className="flex gap-2">
                  {creator.platform === 'Instagram' && <Instagram className="h-6 w-6 text-pink-500" />}
                  {creator.platform === 'Twitter' && <Twitter className="h-6 w-6 text-blue-500" />}
                  {creator.platform === 'YouTube' && <Video className="h-6 w-6 text-red-500" />}
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
