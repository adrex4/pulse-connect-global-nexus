export interface PublicProfileBrowserProps {
  onGetStarted: () => void;
  initialFilter?: 'businesses' | 'freelancers' | 'groups' | 'social_media' | null;
}

export interface Profile {
  id: string;
  name: string;
  bio?: string;
  user_type: string;
  business_type?: string;
  primary_skill?: string;
  occupation?: string;
  profile_image_url?: string;
  is_verified?: boolean;
  total_reviews?: number;
  rating?: number;
  hourly_rate?: number;
  service_type?: string;
  location?: {
    name: string;
    parent?: {
      name: string;
      parent?: {
        name: string;
      };
    };
  };
  // Legacy properties for backwards compatibility
  title?: string;
  category?: string;
  description?: string;
  location_string?: string;
  skills?: string[];
  experience?: string;
  projects?: number;
  verified?: boolean;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  category: string;
  member_count: number;
  scope: string;
  is_public: boolean;
  location?: {
    name: string;
  };
  // Legacy properties for backwards compatibility
  memberCount?: number;
  location_string?: string;
  isPublic?: boolean;
  tags?: string[];
  niche?: string;
  country?: string;
  region?: string;
}

export interface UsePublicBrowserDataReturn {
  profiles: Profile[];
  groups: Group[];
  loading: boolean;
  availableCategories: string[];
  availableLocations: string[];
  fetchLocations: () => void;
  fetchCategories: (type: 'users' | 'businesses' | 'groups') => void;
  fetchProfiles: (type: 'users' | 'businesses', search?: string, location?: string, category?: string) => void;
  fetchGroups: (search?: string, location?: string, category?: string) => void;
}
