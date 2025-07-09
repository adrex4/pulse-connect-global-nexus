
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, User, Camera, MapPin, Users, MessageSquare, 
  ArrowRight, Globe, Star, TrendingUp, Activity, Eye
} from 'lucide-react';

interface PublicProfileBrowserProps {
  onGetStarted: () => void;
  initialFilter?: 'businesses' | 'freelancers' | 'groups' | 'social_media' | 'local_services' | null;
}

const PublicProfileBrowser: React.FC<PublicProfileBrowserProps> = ({ 
  onGetStarted,
  initialFilter = 'groups'
}) => {
  const [activeTab, setActiveTab] = useState(initialFilter || 'groups');

  // Demo groups data
  const demoGroups = [
    {
      id: '1',
      name: 'Business Networking Hub',
      description: 'Connect with entrepreneurs and business leaders worldwide',
      members: 1250,
      category: 'Business',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      badge: 'Popular'
    },
    {
      id: '2',
      name: 'Freelancer Community',
      description: 'Showcase your skills and find exciting projects',
      members: 850,
      category: 'Freelancer',
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&h=300&fit=crop',
      badge: 'Active'
    },
    {
      id: '3',
      name: 'Content Creators United',
      description: 'Collaborate with influencers and content creators',
      members: 620,
      category: 'Creator',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      badge: 'Trending'
    },
    {
      id: '4',
      name: 'Local Service Providers',
      description: 'Connect with service providers in your area',
      members: 450,
      category: 'Local Service',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
      badge: 'New'
    },
    {
      id: '5',
      name: 'Tech Innovators',
      description: 'Latest trends in technology and innovation',
      members: 980,
      category: 'Business',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop',
      badge: 'Hot'
    },
    {
      id: '6',
      name: 'Digital Marketing Masters',
      description: 'Share marketing strategies and grow your reach',
      members: 720,
      category: 'Freelancer',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      badge: 'Growing'
    }
  ];

  const categoryStats = {
    businesses: { count: '2.5K+', active: '450+' },
    freelancers: { count: '3.2K+', active: '680+' },
    creators: { count: '1.8K+', active: '320+' },
    services: { count: '890+', active: '180+' }
  };

  const renderGroupCard = (group: any) => (
    <Card key={group.id} className="group hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm border-0 cursor-pointer hover:scale-105">
      <div className="relative">
        <img 
          src={group.image} 
          alt={group.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <Badge className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          {group.badge}
        </Badge>
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{group.name}</CardTitle>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            {group.members}
          </div>
        </div>
        <Badge variant="outline" className="w-fit">
          {group.category}
        </Badge>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">
          {group.description}
        </CardDescription>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-600">Active Now</span>
          </div>
          <Button 
            size="sm" 
            onClick={onGetStarted}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
          >
            <Eye className="h-4 w-4 mr-1" />
            Join to View
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-cyan-50 to-emerald-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Explore ConnectPulse Groups
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover vibrant communities across different categories. Join groups that match your interests and connect with like-minded professionals.
          </p>
          
          <Button 
            size="lg"
            onClick={onGetStarted}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg px-8 py-6"
          >
            Join ConnectPulse
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="pt-6 text-center">
              <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600 mb-1">{categoryStats.businesses.count}</div>
              <div className="text-gray-600 text-sm">Businesses</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="pt-6 text-center">
              <User className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600 mb-1">{categoryStats.freelancers.count}</div>
              <div className="text-gray-600 text-sm">Freelancers</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="pt-6 text-center">
              <Camera className="h-8 w-8 text-pink-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-pink-600 mb-1">{categoryStats.creators.count}</div>
              <div className="text-gray-600 text-sm">Creators</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="pt-6 text-center">
              <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600 mb-1">{categoryStats.services.count}</div>
              <div className="text-gray-600 text-sm">Local Services</div>
            </CardContent>
          </Card>
        </div>

        {/* Groups Grid */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Featured Groups</CardTitle>
            <CardDescription className="text-center">
              Browse popular groups across all categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demoGroups.map(renderGroupCard)}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                Want to see more groups and join conversations?
              </p>
              <Button 
                size="lg"
                onClick={onGetStarted}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
          <CardContent className="pt-8 pb-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join the Conversation?</h2>
            <p className="text-lg mb-6 opacity-90">
              Choose your path and start connecting with professionals in your field.
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              onClick={onGetStarted}
              className="text-lg px-8"
            >
              Choose Your Path
              <TrendingUp className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PublicProfileBrowser;
