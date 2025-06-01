
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Users, Globe, MapPin, Search, MessageSquare, TrendingUp, Star, Heart, Zap } from 'lucide-react';
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

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.niche.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack} 
                className="text-white hover:bg-white/20 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                  <TrendingUp className="h-6 w-6" />
                  Social Media Communities
                </CardTitle>
                <p className="text-blue-100 mt-2">Connect with creators and grow your influence</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search communities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-blue-500"
              />
            </div>

            {/* Groups List */}
            <div className="space-y-4">
              {filteredGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <MessageSquare className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">{group.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge 
                                variant="secondary" 
                                className={`${
                                  group.scope === 'local' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-blue-100 text-blue-700'
                                }`}
                              >
                                {group.scope === 'local' ? <MapPin className="h-3 w-3 mr-1" /> : <Globe className="h-3 w-3 mr-1" />}
                                {group.scope === 'local' ? 'Local' : 'Global'}
                              </Badge>
                              <Badge variant="outline" className="text-purple-600 border-purple-200">
                                {group.niche}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 leading-relaxed">{group.description}</p>
                        
                        <div className="flex items-center gap-6 text-sm">
                          <span className="flex items-center gap-2 text-gray-500">
                            <Users className="h-4 w-4" />
                            <span className="font-medium">{group.memberCount.toLocaleString()}</span> members
                          </span>
                          <span className="flex items-center gap-2 text-green-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            Active
                          </span>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => onJoinGroup(group)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Join Group
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
                <p className="text-gray-500">Try adjusting your search terms to find the perfect community.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SocialMediaGroupList;
