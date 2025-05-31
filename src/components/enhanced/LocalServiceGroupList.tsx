
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, MapPin, Users, Wrench, Search, Clock, Star, Shield } from 'lucide-react';
import { User, Group, UserType, UserAction } from '@/types/connectPulse';

const generateLocalServiceGroups = (user: User): Group[] => {
  const groups: Group[] = [
    {
      id: `local-services-${user.country}`,
      name: `${user.country} Local Service Providers`,
      niche: 'Local Services',
      scope: 'local',
      country: user.country,
      memberCount: Math.floor(Math.random() * 800) + 300,
      description: `Community of trusted local service providers in ${user.country}. Share referrals, discuss best practices, and support each other's businesses.`
    },
    {
      id: 'home-services-network',
      name: 'Home Services Professional Network',
      niche: 'Home Services',
      scope: 'regional',
      memberCount: 6420,
      description: 'Plumbers, electricians, cleaners, and handymen unite! Share job opportunities, get advice, and build professional relationships.'
    },
    {
      id: 'skilled-trades-guild',
      name: 'Skilled Trades Guild',
      niche: 'Skilled Trades',
      scope: 'global',
      memberCount: 18500,
      description: 'Global community for skilled tradespeople. Share techniques, discuss industry trends, and find opportunities worldwide.'
    },
    {
      id: 'local-business-referrals',
      name: `${user.country} Business Referral Network`,
      niche: 'Referrals',
      scope: 'local',
      country: user.country,
      memberCount: Math.floor(Math.random() * 400) + 150,
      description: `Trusted referral network for local businesses in ${user.country}. Help each other grow through quality referrals and partnerships.`
    },
    {
      id: 'service-entrepreneurs',
      name: 'Service-Based Entrepreneurs',
      niche: 'Entrepreneurship',
      scope: 'global',
      memberCount: 9200,
      description: 'Entrepreneurs running service-based businesses. Share growth strategies, pricing tips, and business development insights.'
    }
  ];

  return groups;
};

interface LocalServiceGroupListProps {
  user: User;
  userType: UserType;
  userAction: UserAction;
  onJoinGroup: (group: Group) => void;
  onBack: () => void;
}

const LocalServiceGroupList: React.FC<LocalServiceGroupListProps> = ({ 
  user, 
  userType, 
  userAction, 
  onJoinGroup, 
  onBack 
}) => {
  const [groups] = useState(generateLocalServiceGroups(user));
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Wrench className="h-6 w-6" />
                Local Service Provider Networks
              </CardTitle>
              <p className="text-orange-100 mt-1">Connect with fellow service providers and grow your local business</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <Wrench className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-orange-900">Welcome, Service Professional!</h3>
                <p className="text-orange-700">
                  Join networks of trusted local service providers. Build referrals, share expertise, and grow your business.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search service provider networks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 border-2 focus:border-orange-500"
            />
          </div>

          <div className="grid gap-6">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 hover:border-orange-300">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-800">{group.name}</h3>
                      <Badge className={`${
                        group.scope === 'local' ? 'bg-orange-500' : group.scope === 'regional' ? 'bg-red-500' : 'bg-purple-500'
                      } text-white flex items-center gap-1`}>
                        <MapPin className="h-3 w-3" />
                        {group.scope.charAt(0).toUpperCase() + group.scope.slice(1)}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">{group.description}</p>
                    
                    <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-6">
                      <span className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-orange-500" />
                        <strong className="text-orange-600">{group.memberCount.toLocaleString()}</strong> professionals
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span className="text-blue-600">24/7 support</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span className="text-green-600">Verified members</span>
                      </span>
                    </div>
                    
                    <Button 
                      onClick={() => onJoinGroup(group)}
                      className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 transition-all duration-300"
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

export default LocalServiceGroupList;
