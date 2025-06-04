
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, Globe, MapPin, Search, Filter, Star, Verified, 
  TrendingUp, Calendar, MessageSquare, Crown, Shield,
  Building, Code, Palette, Music, Camera, Briefcase,
  Heart, Coffee, Book, GamepadIcon, Plane, Home,
  Stethoscope, GraduationCap, Car, Utensils, ShoppingBag,
  Dumbbell, TreePine, Baby, PawPrint, Wrench, Lightbulb
} from 'lucide-react';
import { Group } from '@/types/connectPulse';

interface ImprovedGroupListProps {
  onSelectGroup: (group: Group) => void;
  onJoinGroup: (group: Group) => void;
  userType?: string;
}

const ImprovedGroupList: React.FC<ImprovedGroupListProps> = ({ onSelectGroup, onJoinGroup, userType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedScope, setSelectedScope] = useState('all');
  const [sortBy, setSortBy] = useState('members');
  const [activeFilter, setActiveFilter] = useState('');

  // Comprehensive countries list
  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Spain', 'Italy',
    'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Sweden', 'Norway', 'Denmark',
    'Finland', 'Poland', 'Czech Republic', 'Hungary', 'Portugal', 'Greece', 'Turkey',
    'Russia', 'Ukraine', 'Romania', 'Bulgaria', 'Croatia', 'Serbia', 'Slovenia',
    'Australia', 'New Zealand', 'Japan', 'South Korea', 'China', 'India', 'Singapore',
    'Thailand', 'Vietnam', 'Malaysia', 'Indonesia', 'Philippines', 'Taiwan', 'Hong Kong',
    'Brazil', 'Argentina', 'Mexico', 'Chile', 'Colombia', 'Peru', 'Venezuela', 'Uruguay',
    'South Africa', 'Nigeria', 'Kenya', 'Egypt', 'Morocco', 'Ghana', 'Tunisia', 'Ethiopia',
    'Israel', 'UAE', 'Saudi Arabia', 'Jordan', 'Lebanon', 'Kuwait', 'Qatar', 'Oman'
  ];

  // Enhanced categories with icons
  const categories = [
    { name: 'Technology & Software', icon: Code, color: 'bg-blue-500' },
    { name: 'Business & Finance', icon: Briefcase, color: 'bg-green-500' },
    { name: 'Creative & Design', icon: Palette, color: 'bg-purple-500' },
    { name: 'Music & Audio', icon: Music, color: 'bg-pink-500' },
    { name: 'Photography & Video', icon: Camera, color: 'bg-orange-500' },
    { name: 'Health & Wellness', icon: Heart, color: 'bg-red-500' },
    { name: 'Education & Training', icon: GraduationCap, color: 'bg-indigo-500' },
    { name: 'Food & Beverage', icon: Utensils, color: 'bg-yellow-500' },
    { name: 'Travel & Tourism', icon: Plane, color: 'bg-cyan-500' },
    { name: 'Real Estate', icon: Home, color: 'bg-emerald-500' },
    { name: 'Healthcare', icon: Stethoscope, color: 'bg-teal-500' },
    { name: 'Automotive', icon: Car, color: 'bg-gray-500' },
    { name: 'Retail & E-commerce', icon: ShoppingBag, color: 'bg-rose-500' },
    { name: 'Sports & Fitness', icon: Dumbbell, color: 'bg-lime-500' },
    { name: 'Entertainment & Gaming', icon: GamepadIcon, color: 'bg-violet-500' },
    { name: 'Environmental & Green', icon: TreePine, color: 'bg-green-600' },
    { name: 'Parenting & Family', icon: Baby, color: 'bg-pink-400' },
    { name: 'Pets & Animals', icon: PawPrint, color: 'bg-amber-500' },
    { name: 'Home Services', icon: Wrench, color: 'bg-slate-500' },
    { name: 'Innovation & Startups', icon: Lightbulb, color: 'bg-yellow-400' },
    { name: 'Books & Literature', icon: Book, color: 'bg-brown-500' },
    { name: 'Coffee & Lifestyle', icon: Coffee, color: 'bg-amber-600' }
  ];

  // Enhanced mock groups with more diversity
  const mockGroups: Group[] = [
    {
      id: 'tech-innovators-global',
      name: 'Global Tech Innovators',
      description: 'Connect with technology leaders, startup founders, and innovators worldwide. Share insights on AI, blockchain, and emerging technologies.',
      category: 'Technology & Software',
      memberCount: 25847,
      scope: 'global',
      isPublic: true,
      location: 'Global',
      verified: true,
      trending: true,
      premium: true
    },
    {
      id: 'creative-designers-us',
      name: 'Creative Designers Network',
      description: 'A community for graphic designers, UX/UI professionals, and creative minds to showcase work and collaborate.',
      category: 'Creative & Design',
      memberCount: 18923,
      scope: 'regional',
      isPublic: true,
      location: 'United States',
      verified: true,
      trending: false,
      premium: false
    },
    {
      id: 'business-leaders-europe',
      name: 'European Business Leaders',
      description: 'Exclusive network for C-level executives, entrepreneurs, and business leaders across Europe.',
      category: 'Business & Finance',
      memberCount: 12567,
      scope: 'regional',
      isPublic: false,
      location: 'Europe',
      verified: true,
      trending: true,
      premium: true
    },
    {
      id: 'digital-marketers-global',
      name: 'Digital Marketing Professionals',
      description: 'Share strategies, case studies, and trends in digital marketing, SEO, and social media.',
      category: 'Business & Finance',
      memberCount: 31245,
      scope: 'global',
      isPublic: true,
      location: 'Global',
      verified: true,
      trending: true,
      premium: false
    },
    {
      id: 'photographers-asia',
      name: 'Asian Photography Community',
      description: 'Photography enthusiasts and professionals across Asia sharing techniques and opportunities.',
      category: 'Photography & Video',
      memberCount: 8934,
      scope: 'regional',
      isPublic: true,
      location: 'Asia',
      verified: false,
      trending: false,
      premium: false
    },
    {
      id: 'healthcare-professionals',
      name: 'Healthcare Innovation Network',
      description: 'Medical professionals, researchers, and healthcare innovators discussing industry trends.',
      category: 'Healthcare',
      memberCount: 15678,
      scope: 'global',
      isPublic: true,
      location: 'Global',
      verified: true,
      trending: false,
      premium: true
    },
    {
      id: 'food-entrepreneurs',
      name: 'Food & Beverage Entrepreneurs',
      description: 'Restaurant owners, food bloggers, and culinary professionals sharing recipes and business insights.',
      category: 'Food & Beverage',
      memberCount: 22134,
      scope: 'global',
      isPublic: true,
      location: 'Global',
      verified: false,
      trending: true,
      premium: false
    },
    {
      id: 'fitness-coaches-local',
      name: 'Fitness Coaches Alliance',
      description: 'Personal trainers, yoga instructors, and fitness professionals building their practice.',
      category: 'Sports & Fitness',
      memberCount: 11456,
      scope: 'local',
      isPublic: true,
      location: 'California, USA',
      verified: false,
      trending: false,
      premium: false
    },
    {
      id: 'real-estate-agents',
      name: 'Real Estate Professionals',
      description: 'Realtors, property managers, and real estate investors sharing market insights.',
      category: 'Real Estate',
      memberCount: 19823,
      scope: 'regional',
      isPublic: true,
      location: 'North America',
      verified: true,
      trending: false,
      premium: false
    },
    {
      id: 'startup-founders',
      name: 'Startup Founders Circle',
      description: 'Early-stage entrepreneurs sharing experiences, seeking mentorship, and building connections.',
      category: 'Innovation & Startups',
      memberCount: 8745,
      scope: 'global',
      isPublic: true,
      location: 'Global',
      verified: true,
      trending: true,
      premium: true
    }
  ];

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.icon : Building;
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.color : 'bg-gray-500';
  };

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

  const filteredGroups = mockGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || group.location?.includes(selectedCountry);
    const matchesCategory = selectedCategory === 'all' || group.category === selectedCategory;
    const matchesScope = selectedScope === 'all' || group.scope === selectedScope;
    
    return matchesSearch && matchesCountry && matchesCategory && matchesScope;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'members':
        return b.memberCount - a.memberCount;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'trending':
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
      default:
        return 0;
    }
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setActiveFilter(`${filterType}: ${value}`);
    setTimeout(() => setActiveFilter(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto p-6">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold flex items-center gap-3">
              <MessageSquare className="h-8 w-8" />
              Explore ConnectPulse Communities
            </CardTitle>
            <p className="text-blue-100 text-lg">
              Discover and join professional communities that match your interests and expertise
            </p>
          </CardHeader>

          <CardContent className="p-6">
            {/* Enhanced Search and Filters */}
            <div className="space-y-6 mb-8">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search communities by name, description, or interests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg border-2 focus:border-blue-500 bg-white"
                />
              </div>

              {/* Filter Row */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <Select value={selectedCountry} onValueChange={(value) => {
                  setSelectedCountry(value);
                  handleFilterChange('Country', value);
                }}>
                  <SelectTrigger className={`h-12 border-2 transition-all ${activeFilter.includes('Country') ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                    <SelectValue placeholder="All Countries" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="all">All Countries</SelectItem>
                    {countries.map(country => (
                      <SelectItem key={country} value={country} className="hover:bg-blue-50">
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedCategory} onValueChange={(value) => {
                  setSelectedCategory(value);
                  handleFilterChange('Category', value);
                }}>
                  <SelectTrigger className={`h-12 border-2 transition-all ${activeFilter.includes('Category') ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.name} value={category.name} className="hover:bg-purple-50">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedScope} onValueChange={(value) => {
                  setSelectedScope(value);
                  handleFilterChange('Scope', value);
                }}>
                  <SelectTrigger className={`h-12 border-2 transition-all ${activeFilter.includes('Scope') ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                    <SelectValue placeholder="All Scopes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Scopes</SelectItem>
                    <SelectItem value="local" className="hover:bg-green-50">Local</SelectItem>
                    <SelectItem value="regional" className="hover:bg-blue-50">Regional</SelectItem>
                    <SelectItem value="global" className="hover:bg-purple-50">Global</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-12 border-2 border-gray-200">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="members">Most Members</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="trending">Trending</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="h-12 border-2 border-gray-200 hover:border-gray-300">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>

              {/* Active Filter Indicator */}
              {activeFilter && (
                <div className="flex items-center gap-2 p-3 bg-blue-100 border border-blue-300 rounded-lg animate-fade-in">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-blue-800 font-medium">Filtering by: {activeFilter}</span>
                </div>
              )}
            </div>

            {/* Results Summary */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
              <p className="text-gray-700">
                <span className="font-semibold text-lg">{filteredGroups.length}</span> communities found
                {searchTerm && <span> for "{searchTerm}"</span>}
              </p>
            </div>

            {/* Groups Grid */}
            <ScrollArea className="h-[800px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGroups.map((group) => {
                  const CategoryIcon = getCategoryIcon(group.category);
                  return (
                    <Card key={group.id} className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-blue-300 bg-white">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className={`p-3 rounded-full ${getCategoryColor(group.category)}`}>
                            <CategoryIcon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex flex-col gap-1">
                            {group.verified && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                <Verified className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            {group.trending && (
                              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                            {group.premium && (
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                <Crown className="h-3 w-3 mr-1" />
                                Premium
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <CardTitle className="text-xl font-bold text-gray-800 line-clamp-2">
                          {group.name}
                        </CardTitle>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <Badge 
                            className={`${getScopeColor(group.scope)} text-white flex items-center gap-1 transition-colors`}
                          >
                            {getScopeIcon(group.scope)}
                            <span className="capitalize font-medium">{group.scope}</span>
                          </Badge>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span className="font-medium">{group.memberCount.toLocaleString()}</span>
                          </span>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                          {group.description}
                        </p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <Badge variant="outline" className="text-xs">
                            {group.category}
                          </Badge>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {group.location}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            onClick={() => onSelectGroup(group)} 
                            variant="outline" 
                            className="flex-1 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button 
                            onClick={() => onJoinGroup(group)}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all"
                          >
                            Join Community
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImprovedGroupList;
