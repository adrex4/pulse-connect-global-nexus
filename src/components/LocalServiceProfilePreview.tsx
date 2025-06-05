
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Wrench } from 'lucide-react';

interface LocalServiceProfilePreviewProps {
  profileData: any;
  onConfirm: () => void;
  onBack: () => void;
}

const LocalServiceProfilePreview: React.FC<LocalServiceProfilePreviewProps> = ({ 
  profileData, 
  onConfirm, 
  onBack 
}) => {
  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <Wrench className="h-6 w-6" />
            <CardTitle className="text-xl">Local Service Profile Preview</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="text-center">
            {profileData?.profileImage && (
              <img 
                src={profileData.profileImage} 
                alt="Profile" 
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
            )}
            <h2 className="text-2xl font-bold">{profileData?.serviceName || 'Service Provider'}</h2>
            <p className="text-gray-600">{profileData?.category}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Service Description</h3>
            <p className="text-gray-600">{profileData?.description || 'No description available'}</p>
          </div>

          {profileData?.serviceArea && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Service Area</h3>
              <p className="text-gray-600 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {profileData.serviceArea}
              </p>
            </div>
          )}

          {profileData?.skills && profileData.skills.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Skills & Services</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profileData?.experience && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Experience</h3>
                <p className="text-gray-600 capitalize">{profileData.experience}</p>
              </div>
            )}

            {profileData?.pricing && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Pricing</h3>
                <p className="text-green-600 font-semibold">{profileData.pricing}</p>
              </div>
            )}
          </div>

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

export default LocalServiceProfilePreview;
