
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, MapPin, Globe, Users, Building, Mail, Phone, Calendar, Home } from 'lucide-react';

interface BusinessProfileViewProps {
  businessData: any;
  locationData: any;
  onEdit: () => void;
  onPublish?: () => void;
  showPublishButton?: boolean;
  publishButtonText?: string;
  onBack?: () => void;
}

const BusinessProfileView: React.FC<BusinessProfileViewProps> = ({ 
  businessData, 
  locationData, 
  onEdit, 
  onPublish,
  showPublishButton = false,
  publishButtonText = "Publish Profile",
  onBack
}) => {
  const isReturnHome = publishButtonText === "Return Home";
  
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Building className="h-8 w-8" />
                Your Business Profile
              </CardTitle>
              <p className="text-blue-100 mt-2">
                {isReturnHome ? "Profile created successfully!" : "Review your profile before publishing"}
              </p>
            </div>
            <div className="flex gap-2">
              {onBack && (
                <Button 
                  variant="ghost" 
                  onClick={onBack}
                  className="text-white hover:bg-white/20 border border-white/30"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
              <Button 
                variant="ghost" 
                onClick={onEdit}
                className="text-white hover:bg-white/20 border border-white/30"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              {showPublishButton && onPublish && (
                <Button 
                  onClick={onPublish}
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  {isReturnHome ? (
                    <>
                      <Home className="h-4 w-4 mr-2" />
                      Return Home
                    </>
                  ) : (
                    <>
                      <Building className="h-4 w-4 mr-2" />
                      {publishButtonText}
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-8 space-y-8">
          {/* Business Information */}
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-12 w-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{businessData?.businessName}</h2>
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-lg">
                {businessData?.category}
              </Badge>
            </div>

            {/* Business Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Business Details</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Building className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-700">Business Name</p>
                      <p className="text-gray-600">{businessData?.businessName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-700">Category</p>
                      <p className="text-gray-600">{businessData?.category}</p>
                    </div>
                  </div>
                  
                  {businessData?.website && (
                    <div className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-700">Website</p>
                        <p className="text-blue-600 hover:underline cursor-pointer">{businessData?.website}</p>
                      </div>
                    </div>
                  )}
                  
                  {businessData?.email && (
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-700">Email</p>
                        <p className="text-gray-600">{businessData?.email}</p>
                      </div>
                    </div>
                  )}
                  
                  {businessData?.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-700">Phone</p>
                        <p className="text-gray-600">{businessData?.phone}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Location & Scope</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-700">Country</p>
                      <p className="text-gray-600">{locationData?.country}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <p className="font-medium text-gray-700">Business Scope</p>
                      <Badge className={`${
                        locationData?.preferredScope === 'local' ? 'bg-green-100 text-green-800' :
                        locationData?.preferredScope === 'regional' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {locationData?.preferredScope?.charAt(0).toUpperCase() + locationData?.preferredScope?.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  
                  {businessData?.foundedYear && (
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-green-600 mt-1" />
                      <div>
                        <p className="font-medium text-gray-700">Founded</p>
                        <p className="text-gray-600">{businessData?.foundedYear}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Business Description */}
            {businessData?.description && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">About Our Business</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">{businessData?.description}</p>
                </div>
              </div>
            )}

            {/* Services */}
            {businessData?.services && businessData?.services.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Our Services</h3>
                <div className="flex flex-wrap gap-2">
                  {businessData.services.map((service: string, index: number) => (
                    <Badge key={index} variant="outline" className="px-3 py-1">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {showPublishButton && onPublish && (
            <div className="text-center pt-6 border-t">
              <p className="text-gray-600 mb-4">
                {isReturnHome 
                  ? "Your business profile has been created successfully! You can now browse other businesses or return to the main page."
                  : "Ready to publish your business profile and connect with professionals?"
                }
              </p>
              <Button 
                onClick={onPublish}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
              >
                {isReturnHome ? (
                  <>
                    <Home className="h-5 w-5 mr-2" />
                    Return Home
                  </>
                ) : (
                  <>
                    <Building className="h-5 w-5 mr-2" />
                    {publishButtonText}
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessProfileView;
