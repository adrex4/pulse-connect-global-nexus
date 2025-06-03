
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Users, Globe, MapPin, Search, MessageSquare, TrendingUp, Star, Heart, Zap, Camera, Filter } from 'lucide-react';
import { User, Group, UserType, UserAction } from '@/types/connectPulse';

const generateSocialMediaGroups = (user: User): Group[] => {
  return [
    {
      id: 'influencer-global',
      name: 'Global Influencer Hub',
      niche: 'Social Media',
      scope: 'global',
      memberCount: 15420,
      description: 'Premier community for content creators and influencers worldwide. Share strategies, collaborate on campaigns, and grow together.'
    },
    {
      id: 'brand-partnerships',
      name: 'Brand Partnership Network',
      niche: 'Brand Collaborations',
      scope: 'global',
      memberCount: 8740,
      description: 'Connect with brands looking for influencer partnerships. Exclusive sponsorship opportunities and collaboration deals.'
    },
    {
      id: 'content-creators-local',
      name: `${user.country} Content Creators`,
      niche: 'Content Creation',
      scope: 'local',
      country: user.country,
      memberCount: Math.floor(Math.random() * 500) + 200,
      description: `Local content creators and influencers in ${user.country}. Meet up, collaborate on local campaigns, and support each other's growth.`
    },
    {
      id: 'micro-influencers',
      name: 'Micro-Influencer Collective',
      niche: 'Micro-Influencing',
      scope: 'global',
      memberCount: 12300,
      description: 'Community for micro-influencers (1K-100K followers). Perfect for growing creators to share tips and find collaboration opportunities.'
    },
    {
      id: 'lifestyle-influencers',
      name: 'Lifestyle & Fashion Creators',
      niche: 'Lifestyle',
      scope: 'global',
      memberCount: 9850,
      description: 'Lifestyle, fashion, and beauty influencers unite! Share trends, review products, and build authentic audiences together.'
    },
    {
      id: 'tiktok-creators',
      name: 'TikTok Creator Studio',
      niche: 'TikTok',
      scope: 'global',
      memberCount: 22100,
      description: 'Master the art of TikTok content creation. Learn viral trends, editing techniques, and monetization strategies.'
    },
    {
      id: 'youtube-partners',
      name: 'YouTube Creator Network',
      niche: 'YouTube',
      scope: 'global',
      memberCount: 18600,
      description: 'YouTube creators helping each other grow. Share editing tips, collaboration opportunities, and monetization advice.'
    },
    {
      id: 'instagram-growth',
      name: 'Instagram Growth Academy',
      niche: 'Instagram',
      scope: 'global',
      memberCount: 31200,
      description: 'Master Instagram marketing and content creation. Learn from successful influencers and grow your following organically.'
    },
    {
      id: 'food-bloggers',
      name: 'Food & Recipe Creators',
      niche: 'Food',
      scope: 'global',
      memberCount: 14800,
      description: 'Food bloggers, recipe creators, and culinary influencers. Share food photography tips and collaborate with food brands.'
    },
    {
      id: 'fitness-influencers',
      name: 'Fitness & Wellness Community',
      niche: 'Fitness',
      scope: 'global',
      memberCount: 19500,
      description: 'Fitness influencers, trainers, and wellness coaches. Share workout content, nutrition tips, and fitness brand partnerships.'
    },
    {
      id: 'gaming-streamers',
      name: 'Gaming & Streaming Hub',
      niche: 'Gaming',
      scope: 'global',
      memberCount: 28400,
      description: 'Gaming content creators, streamers, and esports influencers. Share streaming tips, game reviews, and collaboration opportunities.'
    },
    {
      id: 'travel-bloggers',
      name: 'Travel Content Creators',
      niche: 'Travel',
      scope: 'global',
      memberCount: 16700,
      description: 'Travel bloggers and adventure influencers. Share destination guides, travel tips, and collaborate with tourism brands.'
    },
    {
      id: 'tech-reviewers',
      name: 'Tech Review Community',
      niche: 'Technology',
      scope: 'global',
      memberCount: 13200,
      description: 'Technology reviewers and tech influencers. Share product reviews, tech news, and collaborate with tech brands.'
    },
    {
      id: 'beauty-gurus',
      name: 'Beauty & Makeup Artists',
      niche: 'Beauty',
      scope: 'global',
      memberCount: 21500,
      description: 'Beauty influencers, makeup artists, and skincare experts. Share beauty tips, product reviews, and brand collaborations.'
    },
    {
      id: 'parenting-bloggers',
      name: 'Parenting & Family Content',
      niche: 'Parenting',
      scope: 'global',
      memberCount: 11800,
      description: 'Parenting bloggers and family content creators. Share parenting tips, family activities, and collaborate with family brands.'
    },
    // Enhanced location-based groups
    {
      id: `europe-creators-${user.country}`,
      name: 'European Creator Network',
      niche: 'Regional Network',
      scope: 'regional',
      region: 'Europe',
      memberCount: 8500,
      description: 'Connect with content creators across Europe. Share cultural insights, collaborate on European campaigns, and grow together.'
    },
    {
      id: `asia-pacific-creators`,
      name: 'Asia-Pacific Influencers',
      niche: 'Regional Network',
      scope: 'regional',
      region: 'Asia-Pacific',
      memberCount: 12700,
      description: 'Dynamic community of Asia-Pacific content creators. Share trends, cultural content, and brand opportunities in the region.'
    },
    {
      id: `americas-creators`,
      name: 'Americas Creator Alliance',
      niche: 'Regional Network',
      scope: 'regional',
      region: 'Americas',
      memberCount: 15300,
      description: 'Unite creators from North and South America. Share market insights, collaborate on cross-border campaigns, and expand reach.'
    }
  ];
};

interface SocialMediaGroupListProps {
  user: User;
  userType: UserType;
  userAction: UserAction;
  onJoinGroup: (group: Group) => void;
  onBack: () => void;
}

const SocialMediaGroupList: React.FC<SocialMediaGroupListProps> = ({ 
  user, 
  userType, 
  userAction, 
  onJoinGroup, 
  onBack 
}) => {
  const [groups] = useState(generateSocialMediaGroups(user));
  const [searchTerm, setSearchTerm] = useState('');
  const [nicheFilter, setNicheFilter] = useState('all');
  const [scopeFilter, setScopeFilter] = useState('all');

  const niches = ['all', ...Array.from(new Set(groups.map(g => g.niche)))];
  const scopes = ['all', 'local', 'regional', 'global'];

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.niche.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesNiche = nicheFilter === 'all' || group.niche === nicheFilter;
    const matchesScope = scopeFilter === 'all' || group.scope === scopeFilter;
    
    return matchesSearch && matchesNiche && matchesScope;
  });

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-pink-600 to-purple-600 text-white">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Camera className="h-6 w-6" />
                Social Media Creator Communities
              </CardTitle>
              <p className="text-pink-100 mt-1">Connect with fellow creators and grow your influence</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Welcome Banner */}
          <div className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-pink-900">Welcome, Content Creator!</h3>
                <p className="text-pink-700">
                  Join exclusive creator networks, discover brand partnerships, and collaborate with influencers worldwide.
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search communities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-2 focus:border-pink-500"
              />
            </div>
            
            <Select value={nicheFilter} onValueChange={setNicheFilter}>
              <SelectTrigger className="h-12 border-2 focus:border-pink-500">
                <SelectValue placeholder="Filter by niche" />
              </SelectTrigger>
              <SelectContent>
                {niches.map((niche) => (
                  <SelectItem key={niche} value={niche}>
                    {niche === 'all' ? 'All Niches' : niche}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={scopeFilter} onValueChange={setScopeFilter}>
              <SelectTrigger className="h-12 border-2 focus:border-pink-500">
                <SelectValue placeholder="Filter by scope" />
              </SelectTrigger>
              <SelectContent>
                {scopes.map((scope) => (
                  <SelectItem key={scope} value={scope}>
                    {scope === 'all' ? 'All Scopes' : scope.charAt(0).toUpperCase() + scope.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Groups Grid */}
          <div className="grid gap-6">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 hover:border-pink-300">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-800">{group.name}</h3>
                      <Badge className={`${
                        group.scope === 'local' ? 'bg-green-500' : 
                        group.scope === 'regional' ? 'bg-blue-500' : 'bg-purple-500'
                      } text-white flex items-center gap-1`}>
                        {group.scope === 'local' ? <MapPin className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
                        {group.scope === 'local' ? 'Local' : 
                         group.scope === 'regional' ? 'Regional' : 'Global'}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">{group.description}</p>
                    
                    <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-6">
                      <span className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-pink-500" />
                        <strong className="text-pink-600">{group.memberCount.toLocaleString()}</strong> creators
                      </span>
                      <span className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-red-600">Active community</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-green-600">Growing fast</span>
                      </span>
                    </div>
                    
                    <Button 
                      onClick={() => onJoinGroup(group)}
                      className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 transition-all duration-300"
                      size="lg"
                    >
                      Join Community
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredGroups.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No communities found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters to find the perfect community.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaGroupList;
