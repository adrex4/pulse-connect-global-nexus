
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Camera, Users } from 'lucide-react';

interface SocialMediaProfilePreviewProps {
  profileData: any;
  onConfirm: () => void;
  onBack: () => void;
}

const SocialMediaProfilePreview: React.FC<SocialMediaProfilePreviewProps> = ({ 
  profileData, 
  onConfirm, 
  onBack 
}) => {
  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <Camera className="h-6 w-6" />
            <CardTitle className="text-xl">Social Media Profile Preview</CardTitle>
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
            <h2 className="text-2xl font-bold">{profileData?.name || 'Content Creator'}</h2>
            <p className="text-gray-600">{profileData?.niche}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Bio</h3>
            <p className="text-gray-600">{profileData?.bio || 'No bio available'}</p>
          </div>

          {profileData?.platforms && profileData.platforms.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-3">Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.platforms.map((platform: string, index: number) => (
                  <Badge key={index} variant="secondary">{platform}</Badge>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profileData?.followers && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Followers</h3>
                <p className="text-gray-600">{profileData.followers}</p>
              </div>
            )}

            {profileData?.contentType && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Content Type</h3>
                <p className="text-gray-600">{profileData.contentType}</p>
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

export default SocialMediaProfilePreview;
