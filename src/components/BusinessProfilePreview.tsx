
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building2, Globe, Users } from 'lucide-react';

interface BusinessProfilePreviewProps {
  profileData: any;
  onConfirm: () => void;
  onBack: () => void;
}

const BusinessProfilePreview: React.FC<BusinessProfilePreviewProps> = ({ 
  profileData, 
  onConfirm, 
  onBack 
}) => {
  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <Building2 className="h-6 w-6" />
            <CardTitle className="text-xl">Business Profile Preview</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="text-center">
            {profileData?.profileImage && (
              <img 
                src={profileData.profileImage} 
                alt="Business Logo" 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
            )}
            <h2 className="text-2xl font-bold">{profileData?.businessName || 'Business Name'}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Products/Services</h3>
              <p className="text-gray-600">{profileData?.products || 'No description available'}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Website</h3>
              <p className="text-blue-600">{profileData?.website || 'No website provided'}</p>
            </div>
          </div>

          {profileData?.images && profileData.images.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Gallery</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {profileData.images.map((image: string, index: number) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`Gallery ${index + 1}`} 
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-6">
            <Button variant="outline" onClick={onBack} className="flex-1">
              Edit Profile
            </Button>
            <Button onClick={onConfirm} className="flex-1">
              Confirm & Continue
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessProfilePreview;
