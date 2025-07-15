import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, Users, MapPin, Star, CheckCircle } from 'lucide-react';
import { UserType, Group } from '@/types/connectPulse';

interface FreelancerGroupListProps {
  userType: UserType;
  userAction: 'join' | 'create';
  profileData: any;
  onJoinGroup: (group: Group) => void;
  onBack: () => void;
}

// Expanded freelancer groups with more variety
const freelancerGroups: Group[] = [
  {
    id: '1',
    name: 'Web Developers United',
    niche: 'Web Development',
    scope: 'global',
    memberCount: 15420,
    description: 'Global community of web developers sharing knowledge, projects, and opportunities in React, Vue, Angular, and more.',
    isPublic: true
  },
  {
    id: '2',
    name: 'Graphic Design Masters',
    niche: 'Graphic Design',
    scope: 'global',
    memberCount: 8750,
    description: 'Creative professionals specializing in branding, logo design, and visual communication.',
    isPublic: true
  },
  {
    id: '3',
    name: 'Mobile App Creators',
    niche: 'Mobile Development',
    scope: 'global',
    memberCount: 12300,
    description: 'iOS and Android developers building the next generation of mobile applications.',
    isPublic: true
  },
  {
    id: '4',
    name: 'Content Writers Hub',
    niche: 'Content Writing',
    scope: 'global',
    memberCount: 9850,
    description: 'Professional writers creating compelling content for blogs, websites, and marketing campaigns.',
    isPublic: true
  },
  {
    id: '5',
    name: 'Digital Marketing Pros',
    niche: 'Digital Marketing',
    scope: 'global',
    memberCount: 11200,
    description: 'Marketing specialists focused on SEO, social media, PPC, and growth strategies.',
    isPublic: true
  },
  {
    id: '6',
    name: 'UI/UX Design Collective',
    niche: 'UI/UX Design',
    scope: 'global',
    memberCount: 7650,
    description: 'User experience and interface designers creating intuitive digital experiences.',
    isPublic: true
  },
  {
    id: '7',
    name: 'Video Production Network',
    niche: 'Video Production',
    scope: 'global',
    memberCount: 6420,
    description: 'Video creators, editors, and producers for commercial, educational, and entertainment content.',
    isPublic: true
  },
  {
    id: '8',
    name: 'Data Science Alliance',
    niche: 'Data Science',
    scope: 'global',
    memberCount: 10150,
    description: 'Data scientists and analysts working with machine learning, AI, and big data solutions.',
    isPublic: true
  },
  {
    id: '9',
    name: 'Freelance Photographers',
    niche: 'Photography',
    scope: 'global',
    memberCount: 5830,
    description: 'Professional photographers specializing in portraits, events, commercial, and artistic photography.',
    isPublic: true
  },
  {
    id: '10',
    name: 'Translation Services Guild',
    niche: 'Translation',
    scope: 'global',
    memberCount: 4750,
    description: 'Professional translators and interpreters working across multiple languages and industries.',
    isPublic: true
  },
  {
    id: '11',
    name: 'Copywriting Masters',
    niche: 'Copywriting',
    scope: 'global',
    memberCount: 6890,
    description: 'Sales copywriters creating persuasive content for advertising, email campaigns, and sales pages.',
    isPublic: true
  },
  {
    id: '12',
    name: 'Voice Over Artists',
    niche: 'Voice Over',
    scope: 'global',
    memberCount: 3240,
    description: 'Professional voice actors for commercials, audiobooks, animations, and corporate videos.',
    isPublic: true
  },
  {
    id: '13',
    name: 'Social Media Managers',
    niche: 'Social Media Management',
    scope: 'global',
    memberCount: 8950,
    description: 'Social media experts managing brand presence across platforms and creating engaging content strategies.',
    isPublic: true
  },
  {
    id: '14',
    name: 'Blockchain Developers',
    niche: 'Blockchain Development',
    scope: 'global',
    memberCount: 4560,
    description: 'Developers building decentralized applications, smart contracts, and cryptocurrency solutions.',
    isPublic: true
  },
  {
    id: '15',
    name: 'Music Producers Hub',
    niche: 'Music Production',
    scope: 'global',
    memberCount: 5670,
    description: 'Music producers, sound engineers, and composers creating original music and audio content.',
    isPublic: true
  },
  {
    id: '16',
    name: 'Virtual Assistants Network',
    niche: 'Virtual Assistant',
    scope: 'global',
    memberCount: 12750,
    description: 'Administrative professionals providing remote support services to businesses and entrepreneurs.',
    isPublic: true
  },
  {
    id: '17',
    name: 'Logo Design Specialists',
    niche: 'Logo Design',
    scope: 'global',
    memberCount: 4320,
    description: 'Designers specializing in brand identity and logo creation for businesses of all sizes.',
    isPublic: true
  },
  {
    id: '18',
    name: 'SEO Experts Forum',
    niche: 'SEO',
    scope: 'global',
    memberCount: 7890,
    description: 'Search engine optimization specialists helping businesses improve their online visibility.',
    isPublic: true
  },
  {
    id: '19',
    name: 'Game Developers Guild',
    niche: 'Game Development',
    scope: 'global',
    memberCount: 6540,
    description: 'Independent game developers creating innovative gaming experiences across all platforms.',
    isPublic: true
  },
  {
    id: '20',
    name: 'E-commerce Specialists',
    niche: 'E-commerce',
    scope: 'global',
    memberCount: 9340,
    description: 'Professionals helping businesses build and optimize their online stores and sales funnels.',
    isPublic: true
  }
];

const FreelancerGroupList: React.FC<FreelancerGroupListProps> = ({ userType, userAction, profileData, onJoinGroup, onBack }) => {
  if (!userType || !userAction || !profileData || !onJoinGroup) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-red-600">
        <h2 className="text-2xl font-bold mb-4">Error: Missing required data</h2>
        <p className="mb-4">Some required information is missing. Please reload the page or return to the home screen.</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-red-500 text-white rounded">Reload</button>
      </div>
    );
  }
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('all');
  const [selectedScope, setSelectedScope] = useState('all');
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);

  // Filter groups based on search and selections
  const filteredGroups = freelancerGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.niche.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesNiche = selectedNiche === 'all' || group.niche === selectedNiche;
    const matchesScope = selectedScope === 'all' || group.scope === selectedScope;
    
    return matchesSearch && matchesNiche && matchesScope;
  });

  // Get unique niches for filter
  const uniqueNiches = [...new Set(freelancerGroups.map(group => group.niche))].sort();

  const handleJoinGroup = (group: Group) => {
    setJoinedGroups(prev => [...prev, group.id]);
    onJoinGroup(group);
  };

  const getGroupsByNiche = () => {
    const groupsByNiche: { [key: string]: Group[] } = {};
    filteredGroups.forEach(group => {
      if (!groupsByNiche[group.niche]) {
        groupsByNiche[group.niche] = [];
      }
      groupsByNiche[group.niche].push(group);
    });
    return groupsByNiche;
  };

  const groupsByNiche = getGroupsByNiche();

  return (
    <Card className="max-w-6xl mx-auto animate-fade-in shadow-lg">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6" />
            <CardTitle className="text-2xl">
              {userAction === 'join' ? 'Join Freelancer Groups' : 'Discover Your Community'}
            </CardTitle>
          </div>
        </div>
        <p className="text-blue-100 mt-2">
          {userAction === 'join' 
            ? 'Connect with other freelancers in your field and start networking'
            : 'Find your tribe and start collaborating with like-minded professionals'
          }
        </p>
      </CardHeader>
      
      <CardContent className="p-8 space-y-6">
        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedNiche} onValueChange={setSelectedNiche}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by niche" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              <SelectItem value="all">All Niches</SelectItem>
              {uniqueNiches.map((niche) => (
                <SelectItem key={niche} value={niche}>
                  {niche}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedScope} onValueChange={setSelectedScope}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by scope" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Scopes</SelectItem>
              <SelectItem value="local">Local</SelectItem>
              <SelectItem value="regional">Regional</SelectItem>
              <SelectItem value="global">Global</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            {filteredGroups.length} groups found
            {joinedGroups.length > 0 && (
              <span className="ml-2 text-green-600">
                • {joinedGroups.length} joined
              </span>
            )}
          </p>
        </div>

        {/* Groups by Niche */}
        <div className="space-y-8">
          {Object.entries(groupsByNiche).map(([niche, groups]) => (
            <div key={niche} className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                {niche} ({groups.length})
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groups.map((group) => {
                  const isJoined = joinedGroups.includes(group.id);
                  
                  return (
                    <Card key={group.id} className="hover:shadow-md transition-shadow border border-gray-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg text-gray-800 mb-1">
                              {group.name}
                            </h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{group.memberCount.toLocaleString()} members</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span className="capitalize">{group.scope}</span>
                              </div>
                            </div>
                          </div>
                          
                          <Badge variant="secondary" className="ml-2">
                            {group.niche}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {group.description}
                        </p>
                        
                        <Button 
                          onClick={() => handleJoinGroup(group)}
                          disabled={isJoined}
                          className={`w-full ${
                            isJoined 
                              ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                              : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                          }`}
                          size="sm"
                        >
                          {isJoined ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Joined
                            </>
                          ) : (
                            'Join Group'
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        {joinedGroups.length > 0 && (
          <div className="text-center pt-6 border-t">
            <Button 
              onClick={() => {
                // For now, just navigate to welcome - this could be expanded later
                console.log('Profile created successfully with groups:', joinedGroups);
              }}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              {userAction === 'join' ? 'Continue to Dashboard' : 'Complete Profile Setup'}
            </Button>
          </div>
        )}

        {filteredGroups.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No groups found</h3>
            <p className="text-gray-500">Try adjusting your search criteria to find more groups.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FreelancerGroupList;
