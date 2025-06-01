
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Camera, Users, Globe, MapPin, Search, Heart, Zap, Star, TrendingUp, Play, Image, MessageSquare } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-cyan-50 p-4">
      <div className="max-w-6xl mx-auto animate-fade-in">
        <Card className="shadow-2xl border-0 overflow-hidden backdrop-blur-sm bg-white/95">
          <CardHeader className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="flex items-center gap-4 relative z-10">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack} 
                className="text-white hover:bg-white/20 transition-all duration-300 rounded-lg"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex-1">
                <CardTitle className="text-3xl flex items-center gap-3 font-bold">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Camera className="h-8 w-8" />
                  </div>
                  Creator Communities & Influencer Networks
                </CardTitle>
                <p className="text-violet-100 mt-3 text-lg font-medium">Connect with fellow creators, discover brand opportunities, and grow your influence</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8 space-y-8">
            {/* Welcome Banner */}
            <div className="p-8 bg-gradient-to-r from-violet-50 via-fuchsia-50 to-cyan-50 rounded-2xl border-2 border-violet-200 shadow-lg">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Camera className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome, Content Creator!</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Join vibrant communities of influencers, discover exclusive brand partnerships, and collaborate with creators worldwide. 
                    Build your network, share your expertise, and take your content to the next level.
                  </p>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search communities by name, niche, or focus area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg border-2 focus:border-violet-500 rounded-xl shadow-sm bg-white/80 backdrop-blur-sm"
              />
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl border border-violet-200 shadow-lg">
                <div className="text-3xl font-bold text-violet-600">{groups.length}</div>
                <div className="text-violet-700 font-medium">Active Communities</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 rounded-xl border border-fuchsia-200 shadow-lg">
                <div className="text-3xl font-bold text-fuchsia-600">{groups.reduce((sum, g) => sum + g.memberCount, 0).toLocaleString()}</div>
                <div className="text-fuchsia-700 font-medium">Total Creators</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl border border-cyan-200 shadow-lg">
                <div className="text-3xl font-bold text-cyan-600">24/7</div>
                <div className="text-cyan-700 font-medium">Active Support</div>
              </div>
            </div>

            {/* Groups Grid */}
            <div className="grid gap-8">
              {filteredGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] border-2 hover:border-violet-300 overflow-hidden bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      {/* Group Icon */}
                      <div className="w-16 h-16 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-xl">
                        <MessageSquare className="h-8 w-8 text-white" />
                      </div>
                      
                      {/* Group Content */}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-2xl font-bold text-gray-900">{group.name}</h3>
                          <Badge className={`${
                            group.scope === 'local' ? 'bg-violet-500 hover:bg-violet-600' : 'bg-fuchsia-500 hover:bg-fuchsia-600'
                          } text-white flex items-center gap-2 px-4 py-2 text-sm font-medium shadow-lg`}>
                            {group.scope === 'local' ? <MapPin className="h-4 w-4" /> : <Globe className="h-4 w-4" />}
                            {group.scope === 'local' ? 'Local Community' : 'Global Network'}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 text-lg leading-relaxed">{group.description}</p>
                        
                        <div className="flex items-center gap-8 text-sm">
                          <span className="flex items-center gap-2 font-medium">
                            <Users className="h-5 w-5 text-violet-500" />
                            <span className="text-violet-600 font-bold">{group.memberCount.toLocaleString()}</span>
                            <span className="text-gray-600">creators</span>
                          </span>
                          <span className="flex items-center gap-2 font-medium">
                            <Heart className="h-5 w-5 text-red-500" />
                            <span className="text-red-600">High engagement</span>
                          </span>
                          <span className="flex items-center gap-2 font-medium">
                            <Zap className="h-5 w-5 text-yellow-500" />
                            <span className="text-yellow-600">Brand partnerships</span>
                          </span>
                          <span className="flex items-center gap-2 font-medium">
                            <Star className="h-5 w-5 text-cyan-500" />
                            <span className="text-cyan-600">{group.niche}</span>
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4">
                          <div className="text-sm text-gray-500">
                            {group.scope === 'local' && group.country && (
                              <span>📍 {group.country}</span>
                            )}
                          </div>
                          <Button 
                            onClick={() => onJoinGroup(group)}
                            className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 hover:from-violet-600 hover:via-fuchsia-600 hover:to-cyan-600 transition-all duration-300 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                            size="lg"
                          >
                            Join Community
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredGroups.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">No communities found</h3>
                <p className="text-gray-500 text-lg">Try adjusting your search terms to find the perfect community for you.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

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

export default SocialMediaGroupList;
