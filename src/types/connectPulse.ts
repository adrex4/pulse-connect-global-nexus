
export type Step = 
  | 'welcome'
  | 'browse'
  | 'user-type'
  | 'business-profile'
  | 'business-niche'
  | 'freelancer-gig'
  | 'freelancer-groups'
  | 'freelancer-location'
  | 'business-groups'
  | 'groups'
  | 'portfolio'
  | 'location'
  | 'chat'
  | 'service-selection'
  | 'business-profile-preview'
  | 'freelancer-profile-preview'
  | 'social-media-profile'
  | 'social-media-profile-preview'
  | 'local-service-profile-preview'
  | 'profile'
  | 'dashboard';

export type UserType = 'business' | 'freelancer' | 'social_media_influencer' | 'occupation_provider';

export type UserAction = 'create' | 'join' | 'view';

export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  bio?: string;
  niche: string;
  country: string;
  preferredScope: 'local' | 'regional' | 'global';
}

export interface Group {
  id: string;
  name: string;
  description: string;
  category?: string;
  niche?: string;
  memberCount: number;
  scope: 'local' | 'regional' | 'global';
  isPublic: boolean;
  location?: string;
  country?: string;
  region?: string;
  verified?: boolean;
  trending?: boolean;
  premium?: boolean;
}

export interface Message {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  groupId: string;
}
