
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building2, User, Users, Plus, Eye, Camera } from 'lucide-react';

interface UserTypeSelectorProps {
  onNext: (userType: 'business' | 'freelancer' | 'occupation_provider' | 'social_media_influencer', action: 'join' | 'create' | 'view') => void;
  onBack: () => void;
}

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ onNext, onBack }) => {
  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-xl">What brings you to ConnectPulse?</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="text-center space-y-6 mb-8">
            <h3 className="text-2xl font-semibold text-gray-800">Choose Your Path</h3>
            <p className="text-gray-600 text-lg">
              Select what best describes you and how you'd like to get started.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {/* Business Owner */}
            <div className="space-y-4">
              <div className="p-6 border-2 border-gray-200 rounded-xl">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Business Owner</h3>
                  <p className="text-gray-600 text-sm">
                    I own or represent a business and want to connect with other businesses, find partners, and grow my network.
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>✓ Business networking groups</p>
                    <p>✓ Industry-specific communities</p>
                    <p>✓ Partnership opportunities</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Button 
                  onClick={() => onNext('business', 'join')}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Join Groups
                </Button>
                <Button 
                  onClick={() => onNext('business', 'create')}
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Profile
                </Button>
                <Button 
                  onClick={() => onNext('business', 'view')}
                  variant="outline"
                  className="border-blue-300 text-blue-600 hover:bg-blue-50"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Businesses
                </Button>
              </div>
            </div>

            {/* Freelancer */}
            <div className="space-y-4">
              <div className="p-6 border-2 border-gray-200 rounded-xl">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Freelancer</h3>
                  <p className="text-gray-600 text-sm">
                    I offer digital services and skills that can be done remotely or online.
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>✓ Online service opportunities</p>
                    <p>✓ Global client reach</p>
                    <p>✓ Skill-based communities</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Button 
                  onClick={() => onNext('freelancer', 'join')}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Join Groups
                </Button>
                <Button 
                  onClick={() => onNext('freelancer', 'create')}
                  variant="outline"
                  className="border-green-500 text-green-500 hover:bg-green-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Profile
                </Button>
                <Button 
                  onClick={() => onNext('freelancer', 'view')}
                  variant="outline"
                  className="border-green-300 text-green-600 hover:bg-green-50"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Freelancers
                </Button>
              </div>
            </div>

            {/* Local Service Provider */}
            <div className="space-y-4">
              <div className="p-6 border-2 border-gray-200 rounded-xl">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Local Service Provider</h3>
                  <p className="text-gray-600 text-sm">
                    I provide local, in-person services like plumbing, cooking, cleaning, etc.
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>✓ Local client opportunities</p>
                    <p>✓ In-person service delivery</p>
                    <p>✓ Community-based networking</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Button 
                  onClick={() => onNext('occupation_provider', 'join')}
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Join Groups
                </Button>
                <Button 
                  onClick={() => onNext('occupation_provider', 'create')}
                  variant="outline"
                  className="border-purple-500 text-purple-500 hover:bg-purple-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Profile
                </Button>
                <Button 
                  onClick={() => onNext('occupation_provider', 'view')}
                  variant="outline"
                  className="border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Service Providers
                </Button>
              </div>
            </div>

            {/* Social Media Influencer */}
            <div className="space-y-4">
              <div className="p-6 border-2 border-gray-200 rounded-xl">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">Social Media Influencer</h3>
                  <p className="text-gray-600 text-sm">
                    I create content and influence audiences across social media platforms.
                  </p>
                  <div className="space-y-2 text-sm text-gray-500">
                    <p>✓ Brand partnerships</p>
                    <p>✓ Content collaboration</p>
                    <p>✓ Audience growth strategies</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Button 
                  onClick={() => onNext('social_media_influencer', 'join')}
                  className="bg-pink-500 hover:bg-pink-600 text-white"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Join Groups
                </Button>
                <Button 
                  onClick={() => onNext('social_media_influencer', 'create')}
                  variant="outline"
                  className="border-pink-500 text-pink-500 hover:bg-pink-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Profile
                </Button>
                <Button 
                  onClick={() => onNext('social_media_influencer', 'view')}
                  variant="outline"
                  className="border-pink-300 text-pink-600 hover:bg-pink-50"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Influencers
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserTypeSelector;
