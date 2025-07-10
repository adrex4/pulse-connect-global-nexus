
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, Building, Users, MapPin, Calendar,
  Clock, DollarSign, Star, Eye, MessageSquare,
  Briefcase, Code, Palette, Wrench, Megaphone
} from 'lucide-react';

interface OpportunityViewerProps {
  onBack: () => void;
}

const OpportunityViewer: React.FC<OpportunityViewerProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('all');

  // Demo opportunities data
  const opportunities = [
    {
      id: '1',
      title: 'Senior React Developer Needed',
      description: 'Looking for an experienced React developer to join our startup team. Remote work available.',
      type: 'hiring',
      category: 'Freelancer',
      author: 'TechStartup Inc.',
      location: 'Remote',
      budget: '$50-80/hour',
      postedTime: '2 hours ago',
      views: 24,
      responses: 3,
      tags: ['React', 'TypeScript', 'Remote'],
      urgent: false
    },
    {
      id: '2',
      title: 'UI/UX Design Course - 50% Off',
      description: 'Complete UI/UX design course covering Figma, Adobe XD, and design principles. Limited time offer!',
      type: 'selling',
      category: 'Digital Item',
      author: 'DesignMaster',
      location: 'Online',
      budget: '$49 (was $99)',
      postedTime: '4 hours ago',
      views: 156,
      responses: 12,
      tags: ['UI/UX', 'Design', 'Course'],
      urgent: true
    },
    {
      id: '3',
      title: 'Web Development Workshop',
      description: 'Free workshop on modern web development technologies. Perfect for beginners and intermediate developers.',
      type: 'community',
      category: 'Workshop',
      author: 'DevCommunity',
      location: 'San Francisco, CA',
      budget: 'Free',
      postedTime: '1 day ago',
      views: 89,
      responses: 24,
      tags: ['Workshop', 'Web Dev', 'Free'],
      urgent: false
    },
    {
      id: '4',
      title: 'Looking for Marketing Partner',
      description: 'Seeking a marketing expert to collaborate on promoting our SaaS product. Equity-based partnership.',
      type: 'collaboration',
      category: 'Partner up',
      author: 'SaaS Founder',
      location: 'Global',
      budget: 'Equity-based',
      postedTime: '3 days ago',
      views: 67,
      responses: 8,
      tags: ['Marketing', 'SaaS', 'Partnership'],
      urgent: false
    },
    {
      id: '5',
      title: 'Custom Website Development',
      description: 'Professional website development services for small businesses. Modern, responsive, and SEO-optimized.',
      type: 'selling',
      category: 'Service',
      author: 'WebCraft Studio',
      location: 'New York, NY',
      budget: 'Starting at $1,200',
      postedTime: '5 days ago',
      views: 203,
      responses: 31,
      tags: ['Website', 'Business', 'SEO'],
      urgent: false
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hiring': return Briefcase;
      case 'selling': return DollarSign;
      case 'collaboration': return Users;
      case 'community': return Calendar;
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

  const filteredOpportunities = activeTab === 'all' 
    ? opportunities 
    : opportunities.filter(opp => opp.type === activeTab);

  const stats = [
    { label: 'Total Opportunities', value: '1,247', icon: Megaphone },
    { label: 'Active This Week', value: '156', icon: Clock },
    { label: 'Success Rate', value: '92%', icon: Star },
    { label: 'Avg Response Time', value: '2.4 hrs', icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">View Opportunities</h1>
            <p className="text-gray-600 mt-1">Discover opportunities shared by the ConnectPulse community</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="hiring">Hiring</TabsTrigger>
            <TabsTrigger value="selling">Selling</TabsTrigger>
            <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid gap-6">
              {filteredOpportunities.map((opportunity) => {
                const TypeIcon = getTypeIcon(opportunity.type);
                return (
                  <Card key={opportunity.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className={`px-3 py-1 ${getTypeColor(opportunity.type)}`}>
                              <TypeIcon className="h-3 w-3 mr-1" />
                              {opportunity.category}
                            </Badge>
                            {opportunity.urgent && (
                              <Badge variant="destructive" className="px-2 py-1 text-xs">
                                Urgent
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-xl mb-2">{opportunity.title}</CardTitle>
                          <CardDescription className="text-gray-600 mb-3">
                            {opportunity.description}
                          </CardDescription>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {opportunity.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="text-xs bg-white/60">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Building className="h-4 w-4" />
                            {opportunity.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {opportunity.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {opportunity.budget}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {opportunity.views}
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {opportunity.responses}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {opportunity.postedTime}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          Contact
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 mt-8">
          <CardContent className="pt-8 pb-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Post Your Opportunity?</h2>
            <p className="text-lg mb-6 opacity-90">
              Share your opportunities with thousands of professionals in the ConnectPulse community.
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8"
            >
              Post an Opportunity
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OpportunityViewer;
