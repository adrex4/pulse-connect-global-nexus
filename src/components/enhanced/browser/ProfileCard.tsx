
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Star, Building2, Globe, Users } from 'lucide-react';
import { Profile } from '@/types/publicBrowser';

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const getLocationString = (location: any) => {
    if (!location) return 'Location not specified';
    const parts = [location.name];
    if (location.parent?.name) parts.push(location.parent.name);
    if (location.parent?.parent?.name) parts.push(location.parent.parent.name);
    return parts.join(', ');
  };

  const getProfileType = (profile: Profile) => {
    switch (profile.user_type) {
      case 'business':
        return profile.business_type || 'Business';
      case 'freelancer':
        return profile.primary_skill || 'Freelancer';
      case 'occupation_provider':
        return profile.occupation || 'Service Provider';
      case 'social_media_influencer':
        return 'Social Media Influencer';
      default:
        return profile.title || 'User';
    }
  };

  const getProfileIcon = (profile: Profile) => {
    switch (profile.user_type) {
      case 'business':
        return <Building2 className="h-4 w-4 mr-1" />;
      case 'freelancer':
        return <Globe className="h-4 w-4 mr-1" />;
      case 'occupation_provider':
        return <MapPin className="h-4 w-4 mr-1" />;
      case 'social_media_influencer':
        return <Star className="h-4 w-4 mr-1" />;
      default:
        return <Users className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile.profile_image_url} />
            <AvatarFallback>
              {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{profile.name}</h3>
              {(profile.is_verified || profile.verified) && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Verified
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              {getProfileIcon(profile)}
              <p className="text-blue-600 font-medium">{getProfileType(profile)}</p>
            </div>
            
            {(profile.bio || profile.description) && (
              <p className="text-gray-600 text-sm line-clamp-2">{profile.bio || profile.description}</p>
            )}
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {getLocationString(profile.location) || profile.location_string || 'Location not specified'}
              </div>
              
              {profile.rating && profile.rating > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {profile.rating.toFixed(1)} ({profile.total_reviews || 0})
                </div>
              )}
              
              {profile.hourly_rate && (
                <span className="font-medium text-green-600">
                  ${profile.hourly_rate}/hr
                </span>
              )}
            </div>
            
            {profile.service_type && (
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs flex items-center">
                  {profile.service_type === 'online' && <Globe className="h-3 w-3 mr-1" />}
                  {profile.service_type === 'in_person' && <MapPin className="h-3 w-3 mr-1" />}
                  {profile.service_type === 'both' && <Users className="h-3 w-3 mr-1" />}
                  {profile.service_type.replace('_', ' ')}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
