
export interface Profile {
  id: string;
  name: string;
  user_type: string;
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

export interface Group {
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

export interface PublicProfileBrowserProps {
  onGetStarted: () => void;
  initialFilter?: 'users' | 'businesses' | 'freelancers' | 'groups' | null;
}
