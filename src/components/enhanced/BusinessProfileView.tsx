
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Building2, Globe, MapPin, Edit, Share } from 'lucide-react';

interface BusinessProfileViewProps {
  businessData: {
    businessName: string;
    products: string;
    website?: string;
    images: string[];
    videos: string[];
  };
  locationData?: {
    country: string;
    state?: string;
  };
  onEdit: () => void;
  onBack: () => void;
}

const BusinessProfileView: React.FC<BusinessProfileViewProps> = ({ 
  businessData, 
  locationData, 
  onEdit, 
  onBack 
}) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-3">
                <Building2 className="h-6 w-6" />
                <CardTitle className="text-xl">Your Business Profile</CardTitle>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={onEdit} className="text-white hover:bg-white/20">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Success Message */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-green-900 mb-2">🎉 Profile Created Successfully!</h3>
                <p className="text-green-700">Your business is now part of the ConnectPulse community.</p>
              </div>
            </div>

            {/* Business Profile Card */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Business Images */}
                  {businessData.images.length > 0 && (
                    <div className="relative">
                      <img
                        src={businessData.images[0]}
                        alt={businessData.businessName}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Badge className="absolute top-2 right-2 bg-green-500">
                        Your Business
                      </Badge>
                    </div>
                  )}

                  {/* Business Videos */}
                  {businessData.videos.length > 0 && (
                    <div className="relative">
                      <video
                        src={businessData.videos[0]}
                        className="w-full h-40 object-cover rounded-lg"
                        controls
                        poster={businessData.images[0]}
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-purple-500">
                          Product/Service Video
                        </Badge>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <h3 className="font-semibold text-xl text-blue-900">{businessData.businessName}</h3>
                    <p className="text-gray-600">{businessData.products}</p>
                    
                    {locationData && (
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="h-4 w-4" />
                        {locationData.state ? `${locationData.state}, ${locationData.country}` : locationData.country}
                      </div>
                    )}

                    {businessData.website && (
                      <div className="flex items-center gap-1 text-sm text-blue-600">
                        <Globe className="h-4 w-4" />
                        <a href={businessData.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
              <h4 className="text-xl font-semibold text-blue-900 mb-4">What's Next?</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h5 className="font-semibold text-gray-800 mb-2">Join Business Groups</h5>
                  <p className="text-sm text-gray-600 mb-3">Connect with other businesses in your industry</p>
                  <Button size="sm" className="w-full">Explore Groups</Button>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h5 className="font-semibold text-gray-800 mb-2">Network & Connect</h5>
                  <p className="text-sm text-gray-600 mb-3">Start building valuable business relationships</p>
                  <Button size="sm" variant="outline" className="w-full">Start Networking</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessProfileView;
