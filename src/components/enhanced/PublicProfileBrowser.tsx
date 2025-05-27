
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, MapPin, Star, Building2, User, Users, 
  Globe, Filter, ArrowRight 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  name: string;
  user_type: 'business' | 'freelancer' | 'occupation_provider';
  business_type?: string;
  primary_skill?: string;
  occupation?: string;
  service_type?: 'online' | 'in_person' | 'both';
  bio?: string;
  hourly_rate?: number;
  rating: number;
  total_reviews: number;
  location?: {
    name: string;
    parent?: {
      name: string;
      parent?: {
        name: string;
      };
    };
  };
  profile_image_url?: string;
  is_verified: boolean;
}

interface Group {
  id: string;
  name: string;
  description?: string;
  category: string;
  scope: string;
  member_count: number;
  location?: {
    name: string;
  };
}

interface PublicProfileBrowserProps {
  onGetStarted: () => void;
}

const PublicProfileBrowser: React.FC<PublicProfileBrowserProps> = ({ onGetStarted }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'businesses' | 'groups'>('users');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeTab === 'groups') {
      fetchGroups();
    } else {
      fetchProfiles();
    }
  }, [activeTab, searchTerm, selectedLocation, selectedCategory]);

  const fetchProfiles = async () => {
    setLoading(true);
    let query = supabase
      .from('user_profiles')
      .select(`
        *,
        locations!user_profiles_location_id_fkey (
          name,
          parent:locations!locations_parent_id_fkey (
            name,
            parent:locations!locations_parent_id_fkey (
              name
            )
          )
        )
      `)
      .eq('visibility', 'public');

    if (activeTab === 'users') {
      query = query.in('user_type', ['freelancer', 'occupation_provider']);
    } else if (activeTab === 'businesses') {
      query = query.eq('user_type', 'business');
    }

    if (searchTerm) {
      query = query.or(`name.ilike.%${searchTerm}%,bio.ilike.%${searchTerm}%,business_type.ilike.%${searchTerm}%,primary_skill.ilike.%${searchTerm}%,occupation.ilike.%${searchTerm}%`);
    }

    const { data } = await query.limit(20);
    setProfiles(data || []);
    setLoading(false);
  };

  const fetchGroups = async () => {
    setLoading(true);
    let query = supabase
      .from('groups')
      .select(`
        *,
        locations!groups_location_id_fkey (
          name
        )
      `)
      .eq('is_public', true);

    if (searchTerm) {
      query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`);
    }

    const { data } = await query.limit(20);
    setGroups(data || []);
    setLoading(false);
  };

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
      default:
        return 'User';
    }
  };

  const renderProfileCard = (profile: Profile) => (
    <Card key={profile.id} className="hover:shadow-lg transition-shadow cursor-pointer">
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
              {profile.is_verified && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Verified
                </Badge>
              )}
            </div>
            
            <p className="text-blue-600 font-medium">{getProfileType(profile)}</p>
            
            {profile.bio && (
              <p className="text-gray-600 text-sm line-clamp-2">{profile.bio}</p>
            )}
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {getLocationString(profile.location)}
              </div>
              
              {profile.rating > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {profile.rating.toFixed(1)} ({profile.total_reviews})
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
                <Badge variant="outline" className="text-xs">
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

  const renderGroupCard = (group: Group) => (
    <Card key={group.id} className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg">{group.name}</h3>
              <p className="text-blue-600 font-medium">{group.category}</p>
            </div>
            <Badge variant="outline">{group.scope}</Badge>
          </div>
          
          {group.description && (
            <p className="text-gray-600 text-sm line-clamp-2">{group.description}</p>
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {group.member_count} members
            </div>
            
            {group.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {group.location.name}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Explore ConnectPulse Community</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover amazing professionals, businesses, and groups before joining our platform.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-2 rounded-md transition-colors ${
              activeTab === 'users' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <User className="h-4 w-4 inline mr-2" />
            Service Providers
          </button>
          <button
            onClick={() => setActiveTab('businesses')}
            className={`px-6 py-2 rounded-md transition-colors ${
              activeTab === 'businesses' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Building2 className="h-4 w-4 inline mr-2" />
            Businesses
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`px-6 py-2 rounded-md transition-colors ${
              activeTab === 'groups' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Users className="h-4 w-4 inline mr-2" />
            Groups
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-full md:w-[200px] h-12">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Locations</SelectItem>
            <SelectItem value="US">United States</SelectItem>
            <SelectItem value="UK">United Kingdom</SelectItem>
            <SelectItem value="CA">Canada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-32 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                {activeTab === 'groups' ? groups.length : profiles.length} results found
              </p>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeTab === 'groups' 
                ? groups.map(renderGroupCard)
                : profiles.map(renderProfileCard)
              }
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-4 py-8">
        <h3 className="text-2xl font-semibold text-gray-800">Ready to Join ConnectPulse?</h3>
        <p className="text-gray-600">Create your profile and start connecting with amazing people in your industry.</p>
        <Button 
          onClick={onGetStarted}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          Get Started Now
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default PublicProfileBrowser;
