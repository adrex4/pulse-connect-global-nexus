import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Star, TrendingUp, Users, MapPin } from 'lucide-react';
import { BusinessServiceCategory, SubService, getServiceCategoryById } from '@/data/businessServiceCategories';
import * as LucideIcons from 'lucide-react';

interface BusinessCategoryBrowserProps {
  categoryId: string;
  onBack: () => void;
  onGetStarted: () => void;
}

const BusinessCategoryBrowser: React.FC<BusinessCategoryBrowserProps> = ({
  categoryId,
  onBack,
  onGetStarted
}) => {
  const [selectedSubService, setSelectedSubService] = useState<SubService | null>(null);
  const category = getServiceCategoryById(categoryId);

  if (!category) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h2>
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderIcon = (iconName: string, className: string = "w-6 h-6") => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className={className} /> : <LucideIcons.Briefcase className={className} />;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="outline" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Categories
        </Button>
        <Button onClick={onGetStarted} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
          Join ConnectPulse
        </Button>
      </div>

      {/* Category Header with Background Image */}
      <div className="relative rounded-2xl overflow-hidden">
        <div 
          className="h-80 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${category.image})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-60`}></div>
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-white p-8">
            <div className="flex justify-center mb-4">
              {renderIcon(category.icon, "w-16 h-16")}
            </div>
            <h1 className="text-4xl font-bold mb-4 text-center">{category.name}</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto text-center">{category.description}</p>
            <div className="mt-6 flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{category.subServices.length} Services Available</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Growing Industry</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.subServices.map((service) => (
          <Card key={service.id} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200 cursor-pointer">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                    {renderIcon(service.icon)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    {service.demand && (
                      <Badge className={`mt-1 ${getDemandColor(service.demand)}`}>
                        {service.demand} Demand
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </CardDescription>
              
              {service.priceRange && (
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">Typical Rate:</span>
                  <span className="font-semibold text-green-600">{service.priceRange}</span>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>Popular service category</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>Professional providers available</span>
                </div>
              </div>

              <Button 
                className="w-full mt-4 group-hover:bg-blue-600 transition-colors"
                onClick={() => setSelectedSubService(service)}
              >
                Explore {service.name}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Industry Insights */}
      <Card className="bg-gradient-to-r from-gray-50 to-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Industry Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {category.subServices.filter(s => s.demand === 'High').length}
              </div>
              <div className="text-sm text-gray-600">High Demand Services</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {Math.round((category.subServices.filter(s => s.demand === 'High').length / category.subServices.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600">High Growth Services</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {category.subServices.length}+
              </div>
              <div className="text-sm text-gray-600">Service Types Available</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center space-y-6 py-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
        <h3 className="text-2xl font-bold text-gray-800">Ready to Connect?</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join thousands of businesses in the {category.name.toLowerCase()} industry. 
          Create your profile and start building meaningful connections today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            Create Business Profile
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={onBack}
          >
            Explore Other Industries
          </Button>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedSubService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                    {renderIcon(selectedSubService.icon, "w-8 h-8")}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{selectedSubService.name}</CardTitle>
                    {selectedSubService.demand && (
                      <Badge className={`mt-2 ${getDemandColor(selectedSubService.demand)}`}>
                        {selectedSubService.demand} Demand
                      </Badge>
                    )}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedSubService(null)}
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                {selectedSubService.description}
              </p>
              
              {selectedSubService.priceRange && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Typical Pricing</h4>
                  <p className="text-green-700">{selectedSubService.priceRange}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Service Type</h4>
                  <p className="text-blue-700">Professional {selectedSubService.name.toLowerCase()} services</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Industry Category</h4>
                  <p className="text-purple-700">{category.name} sector</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={onGetStarted}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Create Profile in {selectedSubService.name}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setSelectedSubService(null)}
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BusinessCategoryBrowser;