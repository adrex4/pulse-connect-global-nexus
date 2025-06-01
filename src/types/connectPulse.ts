
export interface User {
  id: string;
  name: string;
  niche: string;
  country: string;
  preferredScope: 'local' | 'regional' | 'global';
}

export interface Group {
  id: string;
  name: string;
  niche: string;
  scope: 'local' | 'regional' | 'global';
  country?: string;
  region?: string;
  memberCount: number;
  description: string;
}

export interface Message {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  groupId: string;
}

export type Step = 
  | 'welcome'
  | 'browse'
  | 'user-type'
  | 'business-niche'
  | 'business-profile'
  | 'business-profile-preview'
  | 'business-groups'
  | 'service-selection'
  | 'social-media-profile'
  | 'social-media-profile-preview'
  | 'portfolio'
  | 'location'
  | 'groups'
  | 'chat'
  | 'freelancer-gig'
  | 'freelancer-location'
  | 'freelancer-groups'
  | 'freelancer-profile-preview'
  | 'local-service-profile-preview';

export type UserType = 'business' | 'freelancer' | 'occupation_provider' | 'social_media_influencer';
export type UserAction = 'join' | 'create' | 'view';
