
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Wrench, Home, Edit, Globe, Phone, Mail } from 'lucide-react';

interface LocalServiceProfilePreviewProps {
  profileData: any;
  locationData: any;
  portfolioItems: any[];
  onEdit: () => void;
  onPublish: () => void;
  onHome: () => void;
}

const LocalServiceProfilePreview: React.FC<LocalServiceProfilePreviewProps> = ({
  profileData,
  locationData,
  portfolioItems,
  onEdit,
  onPublish,
  onHome
}) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Wrench className="h-6 w-6" />
              <CardTitle className="text-xl">Your Service Provider Profile</CardTitle>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={onHome} className="text-white hover:bg-white/20">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button variant="ghost" size="sm" onClick={onEdit} className="text-white hover:bg-white/20">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-8 space-y-6">
          {/* Profile Header */}
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto">
              <Wrench className="h-12 w-12 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{profileData?.name || 'Service Provider'}</h2>
              <p className="text-xl text-orange-600 font-medium">{profileData?.primarySkill}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">
                  {locationData?.detailedAddress || locationData?.country || 'Local Area'}
                </span>
              </div>
            </div>
          </div>

          {/* Services */}
          {profileData?.services && profileData.services.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Services Offered</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profileData.services.map((service: any, index: number) => (
                  <Card key={index} className="border-2 border-orange-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-gray-800">{service.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                      {service.price && (
                        <p className="text-orange-600 font-medium mt-2">${service.price}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Bio */}
          {profileData?.bio && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-orange-600" />
                About My Services
              </h3>
              <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
            </div>
          )}

          {/* Portfolio */}
          {portfolioItems && portfolioItems.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Previous Work</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolioItems.map((item, index) => (
                  <Card key={index} className="border-2 border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-gray-800">{item.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      {item.url && (
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-orange-600 hover:text-orange-700 text-sm mt-2 inline-block"
                        >
                          View Work →
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-orange-800">Service Area</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-orange-600" />
                <span className="text-orange-700">
                  {locationData?.country || 'Local Services'}
                </span>
              </div>
              {locationData?.detailedAddress && (
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-orange-600" />
                  <span className="text-orange-700">Local to your area</span>
                </div>
              )}
            </div>
          </div>

          {/* Publish Button */}
          <div className="text-center pt-6">
            <Button 
              onClick={onPublish}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-3 text-lg"
              size="lg"
            >
              <Globe className="h-5 w-5 mr-2" />
              Publish Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocalServiceProfilePreview;
