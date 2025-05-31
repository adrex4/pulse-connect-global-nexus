
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ArrowLeft, MapPin, Users, Wrench, Search, Clock, Star, Shield, Plus } from 'lucide-react';
import { User, Group, UserType, UserAction } from '@/types/connectPulse';
import { getLocalServicesByCategory } from '@/data/localServiceJobs';

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
  const [selectedOccupation, setSelectedOccupation] = useState('');
  const [customOccupation, setCustomOccupation] = useState('');
  const [showCustomOccupation, setShowCustomOccupation] = useState(false);
  const [occupationList, setOccupationList] = useState<string[]>([]);
  
  const serviceCategories = getLocalServicesByCategory();

  React.useEffect(() => {
    // Initialize occupation list with all services
    const allOccupations: string[] = [];
    Object.values(serviceCategories).forEach(jobs => {
      allOccupations.push(...jobs);
    });
    setOccupationList(allOccupations.sort());
  }, []);

  const addCustomOccupation = () => {
    if (customOccupation.trim() && !occupationList.includes(customOccupation.trim())) {
      const newOccupation = customOccupation.trim();
      setOccupationList(prev => [...prev, newOccupation].sort());
      setSelectedOccupation(newOccupation);
      setCustomOccupation('');
      setShowCustomOccupation(false);
    }
  };

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinGroup = (group: Group) => {
    if (selectedOccupation) {
      onJoinGroup(group);
    }
  };

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
                Join Local Service Provider Networks
              </CardTitle>
              <p className="text-orange-100 mt-1">Connect with fellow service providers and grow your local business</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Quick Setup Section */}
          <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
            <h3 className="text-lg font-semibold text-orange-900 mb-4">Quick Setup - Select Your Occupation</h3>
            
            <div className="space-y-4">
              <div className="space-y-3">
                <Label className="text-base font-medium text-orange-800">Your Primary Occupation/Service</Label>
                {showCustomOccupation ? (
                  <div className="space-y-3">
                    <Input
                      placeholder="Enter your occupation/service"
                      value={customOccupation}
                      onChange={(e) => setCustomOccupation(e.target.value)}
                      className="h-12"
                    />
                    <div className="flex gap-2">
                      <Button 
                        onClick={addCustomOccupation} 
                        disabled={!customOccupation.trim()}
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Occupation
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setShowCustomOccupation(false);
                          setCustomOccupation('');
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Select value={selectedOccupation} onValueChange={setSelectedOccupation}>
                      <SelectTrigger className="h-12 text-base">
                        <SelectValue placeholder="Select your occupation/service..." />
                      </SelectTrigger>
                      <SelectContent className="max-h-80">
                        {Object.entries(serviceCategories).map(([category, jobs]) => (
                          <div key={category}>
                            <div className="px-2 py-1 text-sm font-semibold text-gray-500 bg-gray-50">
                              {category}
                            </div>
                            {jobs.map((job) => (
                              <SelectItem key={job} value={job} className="pl-4">
                                {job}
                              </SelectItem>
                            ))}
                          </div>
                        ))}
                        {occupationList.filter(job => 
                          !Object.values(serviceCategories).flat().includes(job)
                        ).map((job) => (
                          <SelectItem key={job} value={job}>
                            {job}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowCustomOccupation(true)}
                      className="w-full border-dashed border-2 border-orange-300 hover:border-orange-400 hover:bg-orange-50"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add custom occupation
                    </Button>
                  </div>
                )}
              </div>
              
              {selectedOccupation && (
                <div className="p-3 bg-orange-100 rounded-lg">
                  <p className="text-orange-800">
                    <strong>Selected:</strong> {selectedOccupation}
                  </p>
                </div>
              )}
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
                      onClick={() => handleJoinGroup(group)}
                      disabled={!selectedOccupation}
                      className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50"
                      size="lg"
                    >
                      {selectedOccupation ? 'Join Network' : 'Select Occupation First'}
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
