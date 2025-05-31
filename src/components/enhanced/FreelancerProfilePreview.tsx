
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, User, Briefcase, Home, Edit, Globe } from 'lucide-react';

interface FreelancerProfilePreviewProps {
  profileData: any;
  locationData: any;
  portfolioItems: any[];
  onEdit: () => void;
  onPublish: () => void;
  onHome: () => void;
}

const FreelancerProfilePreview: React.FC<FreelancerProfilePreviewProps> = ({
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
        <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="h-6 w-6" />
              <CardTitle className="text-xl">Your Freelancer Profile</CardTitle>
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
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
              <User className="h-12 w-12 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{profileData?.name || 'Freelancer'}</h2>
              <p className="text-xl text-green-600 font-medium">{profileData?.primarySkill}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600">{locationData?.country || 'Global'}</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          {profileData?.bio && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-green-600" />
                About
              </h3>
              <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
            </div>
          )}

          {/* Skills */}
          {profileData?.skills && profileData.skills.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-500 text-white px-3 py-1">
                  {profileData.primarySkill}
                </Badge>
                {profileData.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="outline" className="px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Portfolio */}
          {portfolioItems && portfolioItems.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Portfolio</h3>
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
                          className="text-green-600 hover:text-green-700 text-sm mt-2 inline-block"
                        >
                          View Project →
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Work Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profileData?.workArrangement && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800">Work Arrangement</h4>
                <p className="text-blue-600">{profileData.workArrangement}</p>
              </div>
            )}
            {profileData?.availability && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800">Availability</h4>
                <p className="text-green-600">{profileData.availability}</p>
              </div>
            )}
          </div>

          {/* Publish Button */}
          <div className="text-center pt-6">
            <Button 
              onClick={onPublish}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
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

export default FreelancerProfilePreview;
