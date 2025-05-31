
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Camera, Users, Globe, MapPin, Search, Heart, Zap, Star } from 'lucide-react';
import { User, Group, UserType, UserAction } from '@/types/connectPulse';

const generateSocialMediaGroups = (user: User): Group[] => {
  const groups: Group[] = [
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
    }
  ];

  return groups;
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
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Camera className="h-6 w-6" />
                Influencer Communities & Brand Networks
              </CardTitle>
              <p className="text-pink-100 mt-1">Connect with fellow creators and discover brand opportunities</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <div className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-pink-900">Welcome, Content Creator!</h3>
                <p className="text-pink-700">
                  Join vibrant communities of influencers, discover brand partnerships, and grow your audience together.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search influencer communities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 border-2 focus:border-pink-500"
            />
          </div>

          <div className="grid gap-6">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 hover:border-pink-300">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-800">{group.name}</h3>
                      <Badge className={`${
                        group.scope === 'local' ? 'bg-pink-500' : 'bg-purple-500'
                      } text-white flex items-center gap-1`}>
                        {group.scope === 'local' ? <MapPin className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
                        {group.scope === 'local' ? 'Local' : 'Global'}
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
                        <span className="text-red-600">Engaged community</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        <span className="text-yellow-600">Brand collaborations</span>
                      </span>
                    </div>
                    
                    <Button 
                      onClick={() => onJoinGroup(group)}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                      size="lg"
                    >
                      Join Community
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaGroupList;
