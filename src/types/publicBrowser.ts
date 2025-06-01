
export interface PublicProfileBrowserProps {
  onGetStarted: () => void;
  initialFilter?: 'users' | 'businesses' | 'freelancers' | 'groups' | 'social_media' | null;
}

export interface Profile {
  id: string;
  name: string;
  title: string;
  location: string;
  category: string;
  description: string;
  skills?: string[];
  experience?: string;
  rating?: number;
  projects?: number;
  verified?: boolean;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  location: string;
  isPublic: boolean;
  tags: string[];
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
