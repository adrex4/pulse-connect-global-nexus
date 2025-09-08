import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, Building, Users, MapPin, Calendar, Search,
  Clock, DollarSign, Star, Eye, MessageSquare, Filter,
  Briefcase, Code, Palette, Wrench, Megaphone, Heart,
  TrendingUp, Globe, ShoppingBag, Handshake, Award, Timer
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
      userType: 'Business',
      company: 'TechFlow Solutions',
      location: 'San Francisco, CA',
      budget: '$5,000-10,000/month',
      timePosted: '2 hours ago',
      views: 45,
      applicants: 8,
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
      userType: 'Business',
      company: 'PayStream Innovations',
      location: 'New York, NY',
      budget: '$50K-500K investment',
      timePosted: '4 hours ago',
      views: 234,
      applicants: 23,
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
      userType: 'Freelancer',
      company: 'Digital Dynamics',
      location: 'Remote',
      budget: '$75-95/hour',
      timePosted: '1 day ago',
      views: 189,
      applicants: 34,
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
      userType: 'Freelancer',
      company: 'AppVenture Studios',
      location: 'Los Angeles, CA',
      budget: '$3,000-5,000 project',
      timePosted: '2 days ago',
      views: 156,
      applicants: 28,
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
      userType: 'Local Service',
      company: 'MetroRealty Management',
      location: 'Chicago, IL',
      budget: '$2,000-3,500/month',
      timePosted: '3 days ago',
      views: 78,
      applicants: 12,
      tags: ['Cleaning', 'Commercial', 'Contract'],
      urgent: false,
      featured: false
    },
    
    // Creator/Social Media Opportunities
    {
      id: '6',
      title: 'Brand Ambassador Program',
      description: 'Fashion brand seeking micro-influencers for ongoing brand ambassador program. 10K+ followers required.',
      type: 'collaboration',
      category: 'Creator',
      userType: 'Creator',
      company: 'StyleHub Fashion',
      location: 'Global/Remote',
      budget: '$500-1,500/month + products',
      timePosted: '1 week ago',
      views: 445,
      applicants: 89,
      tags: ['Fashion', 'Influencer', 'Brand Ambassador'],
      urgent: false,
      featured: true
    },
    
    // Community Events
    {
      id: '7',
      title: 'Tech Networking Meetup',
      description: 'Monthly networking event for tech professionals. Great opportunity to connect and share knowledge.',
      type: 'community',
      category: 'Event',
      userType: 'Community',
      company: 'Bay Area Tech Network',
      location: 'San Francisco, CA',
      budget: 'Free',
      timePosted: '3 days ago',
      views: 267,
      applicants: 45,
      tags: ['Networking', 'Tech', 'Meetup'],
      urgent: false,
      featured: false
    }
  ];

  const getUserTypeColor = (userType: string) => {
    switch (userType.toLowerCase()) {
      case 'business': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'freelancer': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'local service': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'creator': return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'community': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Filter opportunities based on active tab and search/filter criteria
  const filteredOpportunities = opportunities.filter(opp => {
    const matchesTab = activeTab === 'all' || 
                       (activeTab === 'business' && opp.userType.toLowerCase() === 'business') ||
                       (activeTab === 'freelancer' && opp.userType.toLowerCase() === 'freelancer') ||
                       (activeTab === 'local_service' && opp.userType.toLowerCase() === 'local service') ||
                       (activeTab === 'creator' && opp.userType.toLowerCase() === 'creator') ||
                       (activeTab === 'community' && opp.userType.toLowerCase() === 'community');
    
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
      business: opportunities.filter(o => o.userType.toLowerCase() === 'business').length,
      freelancer: opportunities.filter(o => o.userType.toLowerCase() === 'freelancer').length,
      localService: opportunities.filter(o => o.userType.toLowerCase() === 'local service').length,
      creator: opportunities.filter(o => o.userType.toLowerCase() === 'creator').length,
      community: opportunities.filter(o => o.userType.toLowerCase() === 'community').length
    };
  };

  const statsData = [
    { label: 'Total Opportunities', value: '9', icon: Briefcase },
    { label: 'Active This Week', value: '89', icon: Clock },
    { label: 'Success Rate', value: '94%', icon: Star },
    { label: 'Avg Response Time', value: '1.8 hrs', icon: Timer }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-cyan-50 to-emerald-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Discover Opportunities</h1>
              <p className="text-gray-600 mt-1">Connect with professionals and explore opportunities across all industries</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statsData.map((stat, index) => (
              <Card key={index} className="bg-white/50 backdrop-blur-sm border-0 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <stat.icon className={`h-8 w-8 ${
                      index === 0 ? 'text-purple-600' :
                      index === 1 ? 'text-green-600' :
                      index === 2 ? 'text-yellow-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 mb-8 shadow-sm border border-white/20">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search opportunities, skills, companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/80 border-gray-200 h-12 text-base"
                  />
                </div>
              </div>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full md:w-48 bg-white/80 h-12">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="san-francisco">San Francisco, CA</SelectItem>
                  <SelectItem value="new-york">New York, NY</SelectItem>
                  <SelectItem value="los-angeles">Los Angeles, CA</SelectItem>
                  <SelectItem value="london">London, UK</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                <SelectTrigger className="w-full md:w-48 bg-white/80 h-12">
                  <SelectValue placeholder="All Budgets" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Budgets</SelectItem>
                  <SelectItem value="under-1k">Under $1,000</SelectItem>
                  <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                  <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                  <SelectItem value="10k-plus">$10,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-2 bg-white/50 backdrop-blur-sm p-2 h-auto rounded-xl border border-white/20">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg py-3">
                All
                <Badge variant="secondary" className="ml-2 bg-white/20">{getTabStats().all}</Badge>
              </TabsTrigger>
              <TabsTrigger value="business" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg py-3">
                Business
                <Badge variant="secondary" className="ml-2 bg-white/20">{getTabStats().business}</Badge>
              </TabsTrigger>
              <TabsTrigger value="freelancer" className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-lg py-3">
                Freelancer
                <Badge variant="secondary" className="ml-2 bg-white/20">{getTabStats().freelancer}</Badge>
              </TabsTrigger>
              <TabsTrigger value="local_service" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white rounded-lg py-3">
                Local Service
                <Badge variant="secondary" className="ml-2 bg-white/20">{getTabStats().localService}</Badge>
              </TabsTrigger>
              <TabsTrigger value="creator" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg py-3">
                Creator
                <Badge variant="secondary" className="ml-2 bg-white/20">{getTabStats().creator}</Badge>
              </TabsTrigger>
              <TabsTrigger value="community" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white rounded-lg py-3">
                Community
                <Badge variant="secondary" className="ml-2 bg-white/20">{getTabStats().community}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-6">
                {filteredOpportunities.length > 0 ? (
                  filteredOpportunities.map((opportunity) => (
                    <Card key={opportunity.id} className="bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-200 border border-white/20 rounded-xl overflow-hidden">
                      <CardContent className="p-6">
                        {/* Tags Row */}
                        <div className="flex items-center gap-2 mb-4">
                          <Badge variant="outline" className={`${getUserTypeColor(opportunity.userType)} text-xs font-medium`}>
                            {opportunity.userType}
                          </Badge>
                          <Badge variant="outline" className="text-xs bg-gray-100 text-gray-700">
                            {opportunity.category.toLowerCase()}
                          </Badge>
                          {opportunity.featured && (
                            <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              Featured
                            </Badge>
                          )}
                          {opportunity.urgent && (
                            <Badge className="bg-red-100 text-red-800 text-xs">
                              Urgent
                            </Badge>
                          )}
                        </div>
                        
                        {/* Title and Description */}
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{opportunity.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{opportunity.description}</p>
                        
                        {/* Skills/Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {opportunity.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Company and Location Row */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Building className="h-4 w-4" />
                              <span className="font-medium">{opportunity.company}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{opportunity.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              <span className="font-semibold text-green-600">{opportunity.budget}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{opportunity.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>{opportunity.applicants}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Timer className="h-4 w-4" />
                              <span>{opportunity.timePosted}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4 border-t border-gray-100">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-300">
                            Contact
                          </Button>
                          <Button size="sm" variant="ghost" className="text-gray-500">
                            <Star className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
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
    </div>
  );
};

export default OpportunityViewer;