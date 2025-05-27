
export interface FreelancerUser {
  id: string;
  name: string;
  skills: string[];
  primarySkill: string;
  country: string;
  city?: string;
  hourlyRate?: number;
  currency: string;
  availability: 'full-time' | 'part-time' | 'project-based';
  experience: 'entry' | 'intermediate' | 'expert';
  bio: string;
  profileImage?: string;
}

export interface FreelancerGroup {
  id: string;
  name: string;
  category: string;
  scope: 'local' | 'regional' | 'global';
  country?: string;
  region?: string;
  memberCount: number;
  description: string;
  skills: string[];
}

export interface FreelancerMessage {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  groupId: string;
}
