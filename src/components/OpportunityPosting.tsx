
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingBag, Wrench, Download, Users, UserCheck, 
  Building, Handshake, Share2, Users2, Calendar,
  MapPin, Megaphone, ArrowLeft, Plus
} from 'lucide-react';

interface OpportunityPostingProps {
  onBack: () => void;
}

const OpportunityPosting: React.FC<OpportunityPostingProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const opportunityCategories = [
    {
      id: 'selling',
      title: "I'm looking to sell something",
      description: "Offer products, services, or digital items to the community",
      icon: ShoppingBag,
      color: 'bg-green-50 border-green-200 hover:bg-green-100',
      iconColor: 'text-green-600',
      types: [
        { id: 'product', name: 'Product', icon: ShoppingBag, description: 'Physical goods and merchandise' },
        { id: 'service', name: 'Service', icon: Wrench, description: 'Professional services and expertise' },
        { id: 'digital', name: 'Digital Item', icon: Download, description: 'Software, courses, templates' }
      ]
    },
    {
      id: 'hiring',
      title: "I need help – I'm hiring",
      description: "Find talent for your projects and business needs",
      icon: UserCheck,
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      iconColor: 'text-blue-600',
      types: [
        { id: 'freelancer', name: 'Freelancer', icon: Users, description: 'Project-based professionals' },
        { id: 'contractor', name: 'Contractor', icon: Building, description: 'Specialized service providers' },
        { id: 'employee', name: 'Employee', icon: UserCheck, description: 'Full-time team members' }
      ]
    },
    {
      id: 'collaboration',
      title: "I'm open for collaboration",
      description: "Partner with others for mutual growth and success",
      icon: Handshake,
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      iconColor: 'text-purple-600',
      types: [
        { id: 'partner', name: 'Partner up', icon: Handshake, description: 'Long-term business partnerships' },
        { id: 'cocreate', name: 'Co-create', icon: Share2, description: 'Creative collaborations' },
        { id: 'joint', name: 'Joint venture', icon: Users2, description: 'Shared business opportunities' }
      ]
    },
    {
      id: 'community',
      title: "I'm part of a community",
      description: "Share events, meetups, and community activities",
      icon: Calendar,
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
      iconColor: 'text-orange-600',
      types: [
        { id: 'event', name: 'Event announcement', icon: Calendar, description: 'Conferences, seminars, networking' },
        { id: 'meetup', name: 'Meetup', icon: MapPin, description: 'Local gatherings and socializing' },
        { id: 'workshop', name: 'Workshop', icon: Megaphone, description: 'Educational and skill-building sessions' }
      ]
    },
    {
      id: 'custom',
      title: "Other / Custom",
      description: "Describe your unique opportunity in your own words",
      icon: Plus,
      color: 'bg-gray-50 border-gray-200 hover:bg-gray-100',
      iconColor: 'text-gray-600',
      types: [
        { id: 'custom', name: 'Custom Opportunity', icon: Plus, description: 'Tell us about your unique opportunity' }
      ]
    }
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedType(null);
  };

  const handleTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    // Here you would typically navigate to the posting form
    console.log('Selected opportunity type:', typeId);
  };

  const selectedCategoryData = opportunityCategories.find(cat => cat.id === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
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
            <h1 className="text-3xl font-bold text-gray-900">Post an Opportunity</h1>
            <p className="text-gray-600 mt-1">Share your opportunities with the ConnectPulse community</p>
          </div>
        </div>

        {!selectedCategory ? (
          /* Category Selection */
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                What kind of opportunity are you posting?
              </h2>
              <p className="text-gray-600">Choose the category that best describes your opportunity</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {opportunityCategories.map((category) => (
                <Card 
                  key={category.id}
                  className={`cursor-pointer transition-all duration-200 ${category.color} hover:shadow-lg`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${category.iconColor} bg-white/80`}>
                        <category.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                    </div>
                    <CardDescription className="text-sm">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2">
                      {category.types.map((type) => (
                        <Badge 
                          key={type.id} 
                          variant="secondary" 
                          className="text-xs bg-white/60"
                        >
                          {type.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          /* Type Selection */
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                {selectedCategoryData?.title}
              </h2>
              <p className="text-gray-600">Choose the specific type of opportunity</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {selectedCategoryData?.types.map((type) => (
                <Card 
                  key={type.id}
                  className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 bg-white/80 backdrop-blur-sm"
                  onClick={() => handleTypeSelect(type.id)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`mx-auto p-3 rounded-full ${selectedCategoryData.iconColor} bg-gray-50 mb-3 w-fit`}>
                      <type.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-lg">{type.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {type.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="flex justify-center pt-6">
              <Button 
                onClick={() => setSelectedCategory(null)}
                variant="outline"
                size="lg"
              >
                Choose Different Category
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpportunityPosting;
