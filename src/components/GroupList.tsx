import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Users, MessageSquare, Globe, MapPin, Search, Filter, Star } from 'lucide-react';
import { User, Group } from './ConnectPulse';

// Enhanced mock data for groups with more realistic data
const generateGroups = (user: User): Group[] => {
  const groups: Group[] = [];
  
  // Local group
  groups.push({
    id: `local-${user.niche}`,
    name: `${user.niche} Professionals - ${user.country}`,
    niche: user.niche,
    scope: 'local',
    country: user.country,
    memberCount: Math.floor(Math.random() * 500) + 150,
    description: `Local ${user.niche.toLowerCase()} businesses and professionals in ${user.country}. Daily discussions, networking events, and local partnerships.`
  });

  // Regional groups
  const regions: { [key: string]: string } = {
    'United States': 'North America',
    'Canada': 'North America',
    'Mexico': 'North America',
    'United Kingdom': 'Europe',
    'Germany': 'Europe',
    'France': 'Europe',
    'Spain': 'Europe',
    'Italy': 'Europe',
    'Netherlands': 'Europe',
    'Australia': 'Oceania',
    'New Zealand': 'Oceania',
    'Japan': 'Asia',
    'South Korea': 'Asia',
    'China': 'Asia',
    'India': 'Asia',
    'Singapore': 'Asia',
    'Brazil': 'South America',
    'Argentina': 'South America',
    'Nigeria': 'Africa',
    'South Africa': 'Africa',
    'Kenya': 'Africa'
  };

  const region = regions[user.country] || 'Global';
  
  groups.push({
    id: `regional-${user.niche}`,
    name: `${user.niche} Network - ${region}`,
    niche: user.niche,
    scope: 'regional',
    region: region,
    memberCount: Math.floor(Math.random() * 3000) + 800,
    description: `Regional ${user.niche.toLowerCase()} community across ${region}. Cross-border collaborations, market insights, and regional opportunities.`
  });

  // Global group
  groups.push({
    id: `global-${user.niche}`,
    name: `Global ${user.niche} Alliance`,
    niche: user.niche,
    scope: 'global',
    memberCount: Math.floor(Math.random() * 15000) + 5000,
    description: `Worldwide ${user.niche.toLowerCase()} community. International partnerships, global market trends, and cross-cultural business insights.`
  });

  // Add featured cross-niche groups
  groups.push(
    {
      id: 'entrepreneurs-global',
      name: 'Global Entrepreneurs Hub',
      niche: 'All Niches',
      scope: 'global',
      memberCount: 25420,
      description: 'Premier community for entrepreneurs across all industries. Share experiences, find co-founders, and access exclusive resources.'
    },
    {
      id: 'startups-local',
      name: `Startup Ecosystem - ${user.country}`,
      niche: 'Startups',
      scope: 'local',
      country: user.country,
      memberCount: Math.floor(Math.random() * 800) + 200,
      description: `Local startup community in ${user.country}. Perfect for early-stage companies, investors, and startup enthusiasts.`
    },
    {
      id: 'women-business',
      name: 'Women in Business - Global',
      niche: 'All Niches',
      scope: 'global',
      memberCount: 18750,
      description: 'Empowering women entrepreneurs and business leaders worldwide. Mentorship, support, and networking opportunities.'
    }
  );

  return groups;
};

interface GroupListProps {
  user: User;
  onJoinGroup: (group: Group) => void;
  onBack: () => void;
}

const GroupList: React.FC<GroupListProps> = ({ user, onJoinGroup, onBack }) => {
  const [groups] = useState(generateGroups(user));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScope, setSelectedScope] = useState<'all' | 'local' | 'regional' | 'global'>('all');

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesScope = selectedScope === 'all' || group.scope === selectedScope;
    return matchesSearch && matchesScope;
  });

  const getScopeIcon = (scope: string) => {
    switch (scope) {
      case 'local': return <MapPin className="h-4 w-4" />;
      case 'regional': return <Users className="h-4 w-4" />;
      case 'global': return <Globe className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getScopeColor = (scope: string) => {
    switch (scope) {
      case 'local': return 'bg-green-500 hover:bg-green-600';
      case 'regional': return 'bg-blue-500 hover:bg-blue-600';
      case 'global': return 'bg-purple-500 hover:bg-purple-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getRecommendedBadge = (group: Group) => {
    if (group.niche === user.niche || group.scope === user.preferredScope) {
      return (
        <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
          <Star className="h-3 w-3 mr-1" />
          Recommended
        </Badge>
      );
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Users className="h-6 w-6" />
                Available Groups for You
              </CardTitle>
              <p className="text-blue-100 mt-1">Join communities that match your interests and goals</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-900">Welcome, {user.name}!</h3>
                <p className="text-blue-700">
                  Based on your business type ({user.niche}) and location ({user.country}), 
                  here are your recommended groups and communities.
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search groups by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-2 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedScope === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedScope('all')}
                className="h-12"
              >
                <Filter className="h-4 w-4 mr-2" />
                All Groups
              </Button>
              <Button
                variant={selectedScope === 'local' ? 'default' : 'outline'}
                onClick={() => setSelectedScope('local')}
                className="h-12"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Local
              </Button>
              <Button
                variant={selectedScope === 'regional' ? 'default' : 'outline'}
                onClick={() => setSelectedScope('regional')}
                className="h-12"
              >
                <Users className="h-4 w-4 mr-2" />
                Regional
              </Button>
              <Button
                variant={selectedScope === 'global' ? 'default' : 'outline'}
                onClick={() => setSelectedScope('global')}
                className="h-12"
              >
                <Globe className="h-4 w-4 mr-2" />
                Global
              </Button>
            </div>
          </div>

          {/* Groups Grid */}
          <div className="grid gap-6">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-2 hover:border-blue-300">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-800">{group.name}</h3>
                      <Badge 
                        className={`${getScopeColor(group.scope)} text-white flex items-center gap-1 transition-colors`}
                      >
                        {getScopeIcon(group.scope)}
                        {group.scope.charAt(0).toUpperCase() + group.scope.slice(1)}
                      </Badge>
                      {getRecommendedBadge(group)}
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">{group.description}</p>
                    
                    <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-6">
                      <span className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        <strong className="text-blue-600">{group.memberCount.toLocaleString()}</strong> members
                      </span>
                      <span className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-green-500" />
                        <span className="text-green-600">Active discussions</span>
                      </span>
                      {group.scope === 'local' && group.country && (
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-orange-500" />
                          <span className="text-orange-600">{group.country}</span>
                        </span>
                      )}
                    </div>
                    
                    <Button 
                      onClick={() => onJoinGroup(group)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                      size="lg"
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
              <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No groups found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
            </div>
          )}

          <div className="text-center pt-6 border-t">
            <p className="text-gray-500 mb-2">
              More specialized groups will be available as the ConnectPulse community grows!
            </p>
            <p className="text-sm text-blue-600">
              Can't find what you're looking for? Suggest a new group to our community team.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupList;
