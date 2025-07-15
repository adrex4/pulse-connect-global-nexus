
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Building2, Users, Globe, MapPin, Search, Handshake, TrendingUp } from 'lucide-react';
import { User, Group, UserType, UserAction } from '@/types/connectPulse';

const generateBusinessGroups = (user: User): Group[] => {
  const groups: Group[] = [
    {
      id: `business-local-${user.niche}`,
      name: `${user.country} Business Network`,
      niche: 'Business Networking',
      scope: 'local',
      country: user.country,
      memberCount: Math.floor(Math.random() * 300) + 120,
      description: `Exclusive business networking group for ${user.country}. Connect with local business owners, share opportunities, and build partnerships.`,
      isPublic: true
    },
    {
      id: 'business-partnerships',
      name: 'Global Business Partnerships',
      niche: 'Partnerships',
      scope: 'global',
      memberCount: 8420,
      description: 'International business partnership hub. Find co-founders, investors, suppliers, and strategic partners worldwide.',
      isPublic: true
    },
    {
      id: 'industry-leaders',
      name: `${user.niche} Industry Leaders`,
      niche: user.niche,
      scope: 'global',
      memberCount: Math.floor(Math.random() * 2000) + 500,
      description: `Elite network of ${user.niche.toLowerCase()} industry leaders. Share insights, discuss trends, and collaborate on major projects.`,
      isPublic: true
    },
    {
      id: 'startup-founders',
      name: 'Startup Founders Circle',
      niche: 'Startups',
      scope: 'global',
      memberCount: 5240,
      description: 'Exclusive community for startup founders and entrepreneurs. Get mentorship, find co-founders, and access funding opportunities.',
      isPublic: true
    },
    {
      id: 'local-chamber',
      name: `${user.country} Digital Chamber of Commerce`,
      niche: 'Chamber of Commerce',
      scope: 'local',
      country: user.country,
      memberCount: Math.floor(Math.random() * 800) + 200,
      description: `Digital extension of traditional chamber of commerce for ${user.country}. Government updates, local business support, and advocacy.`,
      isPublic: true
    }
  ];

  return groups;
};

interface BusinessGroupListProps {
  user: User;
  userType: UserType;
  userAction: UserAction;
  onJoinGroup: (group: Group) => void;
  onBack: () => void;
}

const BusinessGroupList: React.FC<BusinessGroupListProps> = ({ 
  user, 
  userType, 
  userAction, 
  onJoinGroup, 
  onBack 
}) => {
  if (!user || !onJoinGroup || !onBack) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-red-600">
        <h2 className="text-2xl font-bold mb-4">Error: Missing required data</h2>
        <p className="mb-4">Some required information is missing. Please reload the page or return to the home screen.</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-red-500 text-white rounded">Reload</button>
      </div>
    );
  }
  const [groups] = useState(generateBusinessGroups(user));
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <div className="flex justify-end mb-2">
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition">Back to Home</button>
      </div>
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Building2 className="h-6 w-6" />
                Business Networks & Partnerships
              </CardTitle>
              <p className="text-blue-100 mt-1">Connect with fellow business owners and industry leaders</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-900">Welcome, Business Owner!</h3>
                <p className="text-blue-700">
                  Join exclusive business networks designed for growth, partnerships, and industry collaboration.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search business networks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 border-2 focus:border-blue-500"
            />
          </div>

          <div className="grid gap-6">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 hover:border-blue-300">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-800">{group.name}</h3>
                      <Badge className={`${
                        group.scope === 'local' ? 'bg-green-500' : 'bg-blue-500'
                      } text-white flex items-center gap-1`}>
                        {group.scope === 'local' ? <MapPin className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
                        {group.scope === 'local' ? 'Local' : 'Global'}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">{group.description}</p>
                    
                    <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-6">
                      <span className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        <strong className="text-blue-600">{group.memberCount.toLocaleString()}</strong> members
                      </span>
                      <span className="flex items-center gap-2">
                        <Handshake className="h-4 w-4 text-green-500" />
                        <span className="text-green-600">Active partnerships</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-purple-500" />
                        <span className="text-purple-600">Growth opportunities</span>
                      </span>
                    </div>
                    
                    <Button 
                      onClick={() => onJoinGroup(group)}
                      className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-300"
                      size="lg"
                    >
                      Join Network
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

export default BusinessGroupList;
