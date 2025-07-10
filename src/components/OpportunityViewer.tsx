
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, Building, Users, MapPin, Calendar, Search,
  Clock, DollarSign, Star, Eye, MessageSquare, Filter,
  Briefcase, Code, Palette, Wrench, Megaphone, Heart,
  TrendingUp, Globe, ShoppingBag, Handshake, Award
} from 'lucide-react';

interface OpportunityViewerProps {
  onBack: () => void;
}

const OpportunityViewer: React.FC<OpportunityViewerProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');

  // Demo opportunities data organized by user type
  const opportunities = [
    // Business Opportunities
    {
      id: '1',
      title: 'Strategic Marketing Partnership',
      description: 'Tech startup seeking experienced marketing agency for comprehensive digital marketing strategy and execution.',
      type: 'collaboration',
      category: 'Business',
      userType: 'business',
      author: 'TechFlow Solutions',
      location: 'San Francisco, CA',
      budget: '$5,000-10,000/month',
      postedTime: '2 hours ago',
      views: 45,
      responses: 8,
      tags: ['Marketing', 'Partnership', 'B2B'],
      urgent: true,
      featured: true
    },
    {
      id: '2',
      title: 'Investment Opportunity - FinTech Startup',
      description: 'Seeking angel investors for revolutionary fintech platform. Series A funding round.',
      type: 'collaboration',
      category: 'Business',
      userType: 'business',
      author: 'PayStream Innovations',
      location: 'New York, NY',
      budget: '$50K-500K investment',
      postedTime: '4 hours ago',
      views: 234,
      responses: 23,
      tags: ['Investment', 'FinTech', 'Startup'],
      urgent: false,
      featured: true
    },
    
    // Freelancer Opportunities
    {
      id: '3',
      title: 'Senior React Developer Needed',
      description: 'Looking for an experienced React developer to join our remote team. Long-term contract available.',
      type: 'hiring',
      category: 'Freelancer',
      userType: 'freelancer',
      author: 'Digital Dynamics',
      location: 'Remote',
      budget: '$75-95/hour',
      postedTime: '1 day ago',
      views: 189,
      responses: 34,
      tags: ['React', 'TypeScript', 'Remote'],
      urgent: false,
      featured: false
    },
    {
      id: '4',
      title: 'UI/UX Design for Mobile App',
      description: 'Need creative UI/UX designer for innovative mobile app project. Portfolio review required.',
      type: 'hiring',
      category: 'Freelancer',
      userType: 'freelancer',
      author: 'AppVenture Studios',
      location: 'Los Angeles, CA',
      budget: '$3,000-5,000 project',
      postedTime: '2 days ago',
      views: 156,
      responses: 28,
      tags: ['UI/UX', 'Mobile', 'Design'],
      urgent: false,
      featured: false
    },
    
    // Local Service Opportunities
    {
      id: '5',
      title: 'Commercial Cleaning Services Needed',
      description: 'Office building management company seeking reliable commercial cleaning service for 5 locations.',
      type: 'hiring',
      category: 'Local Service',
      userType: 'local_service',
      author: 'MetroRealty Management',
      location: 'Chicago, IL',
      budget: '$2,000-3,500/month',
      postedTime: '3 days ago',
      views: 78,
      responses: 12,
      tags: ['Cleaning', 'Commercial', 'Contract'],
      urgent: false,
      featured: false
    },
    {
      id: '6',
      title: 'Wedding Photography Package',
      description: 'Couple seeking professional wedding photographer for destination wedding. Full day coverage needed.',
      type: 'hiring',
      category: 'Local Service',
      userType: 'local_service',
      author: 'Sarah & Michael',
      location: 'Austin, TX',
      budget: '$2,500-4,000',
      postedTime: '5 days ago',
      views: 92,
      responses: 18,
      tags: ['Photography', 'Wedding', 'Event'],
      urgent: false,
      featured: false
    },
    
    // Creator/Social Media Opportunities
    {
      id: '7',
      title: 'Brand Ambassador Program',
      description: 'Fashion brand seeking micro-influencers for ongoing brand ambassador program. 10K+ followers required.',
      type: 'collaboration',
      category: 'Creator',
      userType: 'social_media',
      author: 'StyleHub Fashion',
      location: 'Global/Remote',
      budget: '$500-1,500/month + products',
      postedTime: '1 week ago',
      views: 445,
      responses: 89,
      tags: ['Fashion', 'Influencer', 'Brand Ambassador'],
      urgent: false,
      featured: true
    },
    
    // Community Events
    {
      id: '8',
      title: 'Tech Networking Meetup',
      description: 'Monthly networking event for tech professionals. Great opportunity to connect and share knowledge.',
      type: 'community',
      category: 'Event',
      userType: 'community',
      author: 'Bay Area Tech Network',
      location: 'San Francisco, CA',
      budget: 'Free',
      postedTime: '3 days ago',
      views: 267,
      responses: 45,
      tags: ['Networking', 'Tech', 'Meetup'],
      urgent: false,
      featured: false
    },
    
    // Selling Opportunities
    {
      id: '9',
      title: 'Complete Web Development Course',
      description: 'Comprehensive full-stack web development course with lifetime access. 50+ hours of content.',
      type: 'selling',
      category: 'Digital Product',
      userType: 'freelancer',
      author: 'CodeMaster Academy',
      location: 'Online',
      budget: '$199 (50% off)',
      postedTime: '1 week ago',
      views: 512,
      responses: 67,
      tags: ['Course', 'Web Development', 'Education'],
      urgent: true,
      featured: false
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hiring': return Briefcase;
      case 'selling': return ShoppingBag;
      case 'collaboration': return Handshake;
      case 'community': return Users;
      default: return Megaphone;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hiring': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'selling': return 'bg-green-50 text-green-700 border-green-200';
      case 'collaboration': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'community': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case 'business': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'freelancer': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'local_service': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'social_media': return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'community': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Filter opportunities based on active tab and search/filter criteria
  const filteredOpportunities = opportunities.filter(opp => {
    const matchesTab = activeTab === 'all' || 
                       (activeTab === 'business' && opp.userType === 'business') ||
                       (activeTab === 'freelancer' && opp.userType === 'freelancer') ||
                       (activeTab === 'local_service' && opp.userType === 'local_service') ||
                       (activeTab === 'creator' && opp.userType === 'social_media') ||
                       (activeTab === 'community' && opp.userType === 'community');
    
    const matchesSearch = searchTerm === '' || 
                         opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = selectedLocation === 'all' || 
                           opp.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesTab && matchesSearch && matchesLocation;
  });

  // Get stats for each category
  const getTabStats = () => {
    return {
      all: opportunities.length,
      business: opportunities.filter(o => o.userType === 'business').length,
      freelancer: opportunities.filter(o => o.userType === 'freelancer').length,
      local_service: opportunities.filter(o => o.userType === 'local_service').length,
      creator: opportunities.filter(o => o.userType === 'social_media').length,
      community: opportunities.filter(o => o.userType === 'community').length
    };
  };

  const tabStats = getTabStats();

  const stats = [
    { label: 'Total Opportunities', value: opportunities.length.toString(), icon: Megaphone, color: 'text-indigo-600' },
    { label: 'Active This Week', value: '89', icon: Clock, color: 'text-green-600' },
    { label: 'Success Rate', value: '94%', icon: Star, color: 'text-yellow-600' },
    { label: 'Avg Response Time', value: '1.8 hrs', icon: MessageSquare, color: 'text-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 hover:bg-white/50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Discover Opportunities</h1>
            <p className="text-gray-600 mt-2 text-lg">Connect with professionals and explore opportunities across all industries</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200">
              <CardContent className="pt-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-gray-50 rounded-full">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search opportunities, skills, companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2 focus:border-indigo-500"
                />
              </div>
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 border-2 border-gray-200 rounded-md focus:border-indigo-500 focus:outline-none"
              >
                <option value="all">All Locations</option>
                <option value="remote">Remote</option>
                <option value="san francisco">San Francisco</option>
                <option value="new york">New York</option>
                <option value="los angeles">Los Angeles</option>
                <option value="chicago">Chicago</option>
                <option value="austin">Austin</option>
              </select>
              <select 
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="px-3 py-2 border-2 border-gray-200 rounded-md focus:border-indigo-500 focus:outline-none"
              >
                <option value="all">All Budgets</option>
                <option value="under-1000">Under $1,000</option>
                <option value="1000-5000">$1,000 - $5,000</option>
                <option value="5000-10000">$5,000 - $10,000</option>
                <option value="10000+">$10,000+</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Category Filters */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-6 bg-white/80 backdrop-blur-sm h-auto p-2">
            <TabsTrigger value="all" className="flex flex-col items-center gap-1 py-3">
              <span className="font-medium">All</span>
              <Badge variant="secondary" className="text-xs">{tabStats.all}</Badge>
            </TabsTrigger>
            <TabsTrigger value="business" className="flex flex-col items-center gap-1 py-3">
              <span className="font-medium">Business</span>
              <Badge variant="secondary" className="text-xs">{tabStats.business}</Badge>
            </TabsTrigger>
            <TabsTrigger value="freelancer" className="flex flex-col items-center gap-1 py-3">
              <span className="font-medium">Freelancer</span>
              <Badge variant="secondary" className="text-xs">{tabStats.freelancer}</Badge>
            </TabsTrigger>
            <TabsTrigger value="local_service" className="flex flex-col items-center gap-1 py-3">
              <span className="font-medium">Local Service</span>
              <Badge variant="secondary" className="text-xs">{tabStats.local_service}</Badge>
            </TabsTrigger>
            <TabsTrigger value="creator" className="flex flex-col items-center gap-1 py-3">
              <span className="font-medium">Creator</span>
              <Badge variant="secondary" className="text-xs">{tabStats.creator}</Badge>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex flex-col items-center gap-1 py-3">
              <span className="font-medium">Community</span>
              <Badge variant="secondary" className="text-xs">{tabStats.community}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid gap-6">
              {filteredOpportunities.length > 0 ? (
                filteredOpportunities.map((opportunity) => {
                  const TypeIcon = getTypeIcon(opportunity.type);
                  return (
                    <Card key={opportunity.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Badge className={`px-3 py-1 ${getTypeColor(opportunity.type)}`}>
                                <TypeIcon className="h-3 w-3 mr-1" />
                                {opportunity.category}
                              </Badge>
                              <Badge className={`px-3 py-1 ${getUserTypeColor(opportunity.userType)}`}>
                                {opportunity.userType.replace('_', ' ')}
                              </Badge>
                              {opportunity.urgent && (
                                <Badge variant="destructive" className="px-2 py-1 text-xs animate-pulse">
                                  Urgent
                                </Badge>
                              )}
                              {opportunity.featured && (
                                <Badge className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 border-yellow-200">
                                  <Star className="h-3 w-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-xl mb-3 hover:text-indigo-600 transition-colors cursor-pointer">
                              {opportunity.title}
                            </CardTitle>
                            <CardDescription className="text-gray-600 mb-4 text-base leading-relaxed">
                              {opportunity.description}
                            </CardDescription>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {opportunity.tags.map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="outline" className="text-xs bg-white/60 hover:bg-indigo-50 transition-colors cursor-pointer">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          {opportunity.featured && (
                            <div className="ml-4">
                              <div className="w-2 h-16 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4" />
                              <span className="font-medium">{opportunity.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              <span>{opportunity.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-green-600" />
                              <span className="font-medium text-green-700">{opportunity.budget}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{opportunity.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{opportunity.responses}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{opportunity.postedTime}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button 
                            size="sm" 
                            className="bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
                          >
                            View Details
                          </Button>
                          <Button size="sm" variant="outline" className="hover:bg-indigo-50 hover:border-indigo-300">
                            Contact
                          </Button>
                          <Button size="sm" variant="ghost" className="text-gray-500 hover:text-red-500">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="pt-12 pb-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters to find more opportunities.</p>
                    <Button 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedLocation('all');
                        setSelectedBudget('all');
                        setActiveTab('all');
                      }}
                      variant="outline"
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 mt-12">
          <CardContent className="pt-8 pb-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Post Your Opportunity?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of professionals connecting and growing their businesses on ConnectPulse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8 py-3 bg-white text-indigo-600 hover:bg-gray-50"
              >
                Post an Opportunity
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-3 border-white text-white hover:bg-white/10"
              >
                Join ConnectPulse
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OpportunityViewer;
