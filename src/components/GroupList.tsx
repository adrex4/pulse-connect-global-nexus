
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, MessageSquare, Globe, MapPin } from 'lucide-react';
import { User, Group } from './ConnectPulse';

// Mock data for groups
const generateGroups = (user: User): Group[] => {
  const groups: Group[] = [];
  
  // Local group
  groups.push({
    id: `local-${user.niche}`,
    name: `${user.niche} - ${user.country}`,
    niche: user.niche,
    scope: 'local',
    country: user.country,
    memberCount: Math.floor(Math.random() * 500) + 50,
    description: `Connect with ${user.niche.toLowerCase()} businesses in ${user.country}`
  });

  // Regional group
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
    name: `${user.niche} - ${region}`,
    niche: user.niche,
    scope: 'regional',
    region: region,
    memberCount: Math.floor(Math.random() * 2000) + 200,
    description: `Regional ${user.niche.toLowerCase()} network across ${region}`
  });

  // Global group
  groups.push({
    id: `global-${user.niche}`,
    name: `${user.niche} - Global`,
    niche: user.niche,
    scope: 'global',
    memberCount: Math.floor(Math.random() * 10000) + 1000,
    description: `Worldwide ${user.niche.toLowerCase()} community`
  });

  // Add some cross-niche groups based on user's preferred scope
  if (user.preferredScope === 'global') {
    groups.push({
      id: 'entrepreneurs-global',
      name: 'Global Entrepreneurs Hub',
      niche: 'All Niches',
      scope: 'global',
      memberCount: 15420,
      description: 'Connect with entrepreneurs from all industries worldwide'
    });
  }

  return groups;
};

interface GroupListProps {
  user: User;
  onJoinGroup: (group: Group) => void;
  onBack: () => void;
}

const GroupList: React.FC<GroupListProps> = ({ user, onJoinGroup, onBack }) => {
  const groups = generateGroups(user);

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
      case 'local': return 'bg-green-500';
      case 'regional': return 'bg-blue-500';
      case 'global': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle>Available Groups for You</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900">Welcome, {user.name}!</h3>
            <p className="text-blue-700">Based on your niche ({user.niche}) and location ({user.country}), here are your recommended groups:</p>
          </div>

          <div className="grid gap-4">
            {groups.map((group) => (
              <Card key={group.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{group.name}</h3>
                        <Badge 
                          className={`${getScopeColor(group.scope)} text-white flex items-center gap-1`}
                        >
                          {getScopeIcon(group.scope)}
                          {group.scope}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-2">{group.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {group.memberCount.toLocaleString()} members
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          Active discussions
                        </span>
                      </div>
                    </div>
                    <Button onClick={() => onJoinGroup(group)}>
                      Join Group
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-500">
              More groups will be available as the ConnectPulse community grows!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupList;
