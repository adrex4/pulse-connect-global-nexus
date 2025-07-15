
import React, { useState } from 'react';
import { Step, UserType, UserAction, User, Group, Message } from '@/types/connectPulse';
import EnhancedLocationSelector from '../EnhancedLocationSelector';
import ServiceSelector from '../ServiceSelector';
import PortfolioUploader from '../PortfolioUploader';
import SocialMediaProfileCreator from '../SocialMediaProfileCreator';
import SocialMediaGroupList from '../SocialMediaGroupList';
import LocalServiceGroupList from '../LocalServiceGroupList';
import GroupChat from '../../GroupChat';
import GroupList from '../../GroupList';
import EnhancedGroupChat from '../../EnhancedGroupChat';
import UserProfile from '../../profile/UserProfile';
import AdvancedGroupChat from '../AdvancedGroupChat';

interface SharedStepManagerProps {
  currentStep: Step;
  userType: UserType | null;
  userAction: UserAction | null;
  currentUser: User | null;
  selectedGroup: Group | null;
  messages: Message[];
  portfolioItems: any[];
  joinedGroups?: Group[];
  onStepChange: (step: Step) => void;
  onUserRegistration: (userData: Omit<User, 'id'>) => void;
  onGroupJoin: (group: Group) => void;
  onSendMessage: (content: string) => void;
  onPortfolioSave: (items: any[]) => void;
  onLocationSave: (data: any) => void;
  onUpdateUser?: (user: User) => void;
  setProfileData: (data: any) => void;
}

const SharedStepManager: React.FC<SharedStepManagerProps> = ({
  currentStep,
  userType,
  userAction,
  currentUser,
  selectedGroup: externalSelectedGroup,
  messages,
  portfolioItems,
  joinedGroups = [],
  onStepChange,
  onUserRegistration,
  onGroupJoin,
  onSendMessage,
  onPortfolioSave,
  onLocationSave,
  onUpdateUser,
  setProfileData
}) => {
  // Track selected group in state for influencer join flow
  const [selectedGroup, setSelectedGroup] = useState(null);

  // If social media influencer is joining a group, handle group selection and chat
  if (userType === 'social_media_influencer' && userAction === 'join') {
    if (currentStep === 'chat' && selectedGroup) {
      const user = currentUser || {
        id: 'temp-social-user',
        name: 'Content Creator',
        niche: 'Social Media',
        country: 'United States',
        preferredScope: 'global' as const
      };
      return (
        <AdvancedGroupChat
          user={user}
          group={selectedGroup}
          messages={messages.filter(m => m.groupId === selectedGroup.id)}
          onSendMessage={onSendMessage}
          onBack={() => onStepChange('groups')}
        />
      );
    }
    // Always show group selection unless in chat
    return (
      <SocialMediaGroupList
        user={currentUser || {
          id: 'temp-social-user',
          name: 'Content Creator',
          niche: 'Social Media',
          country: 'United States',
          preferredScope: 'global' as const
        }}
        userType={userType}
        userAction={userAction}
        onJoinGroup={(group) => {
          setSelectedGroup(group);
          onStepChange('chat');
        }}
        onBack={() => onStepChange('user-type')}
      />
    );
  }

  // Handle profile step
  if (currentStep === 'profile' && currentUser && onUpdateUser) {
    return (
      <UserProfile
        user={currentUser}
        onUpdateUser={onUpdateUser}
        joinedGroups={joinedGroups}
        onJoinGroup={onGroupJoin}
        onOpenChat={(group) => {
          onGroupJoin(group);
          onStepChange('chat');
        }}
      />
    );
  }

  if (currentStep === 'service-selection' && userType && userType !== 'business' && userType !== 'social_media_influencer') {
    return (
      <ServiceSelector 
        userType={userType}
        onNext={(serviceData) => {
          setProfileData(serviceData);
          if (userType === 'freelancer' || userType === 'occupation_provider') {
            if (userAction === 'create') {
              onStepChange('portfolio');
            } else {
              // For join action, go directly to groups after service selection
              onStepChange('groups');
            }
          } else {
            onStepChange('location');
          }
        }}
        onBack={() => onStepChange('user-type')}
      />
    );
  }
  
  if (currentStep === 'social-media-profile' && userType === 'social_media_influencer') {
    return (
      <SocialMediaProfileCreator
        onNext={(profileData) => {
          setProfileData(profileData);
          onStepChange('portfolio');
        }}
        onBack={() => onStepChange('user-type')}
      />
    );
  }
  
  if (currentStep === 'portfolio' && userType && (userType === 'freelancer' || userType === 'occupation_provider' || userType === 'social_media_influencer')) {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in">
        <PortfolioUploader 
          onSave={onPortfolioSave}
          userType={userType as 'freelancer' | 'occupation_provider' | 'social_media_influencer'}
        />
      </div>
    );
  }
  
  if (currentStep === 'location' && userType) {
    return (
      <EnhancedLocationSelector
        userType={userType}
        onNext={onLocationSave}
        onBack={() => {
          if (userType === 'business') {
            if (userAction === 'create') {
              onStepChange('business-profile');
            } else {
              onStepChange('business-niche');
            }
          } else if (userType === 'freelancer') {
            onStepChange('freelancer-gig');
          } else if (userType === 'social_media_influencer') {
            if (userAction === 'create') {
              onStepChange('portfolio');
            } else {
              onStepChange('user-type');
            }
          } else if (userType === 'occupation_provider') {
            if (userAction === 'create') {
              onStepChange('portfolio');
            } else {
              onStepChange('service-selection');
            }
          } else {
            onStepChange('service-selection');
          }
        }}
        showDetailedAddress={userType === 'occupation_provider'}
      />
    );
  }
  
  if (currentStep === 'groups') {
    // Handle social media influencer groups specifically
    if (userType === 'social_media_influencer') {
      const user = currentUser || {
        id: 'temp-social-user',
        name: 'Content Creator',
        niche: 'Social Media',
        country: 'United States',
        preferredScope: 'global' as const
      };

      return (
        <SocialMediaGroupList
          user={user}
          userType={userType}
          userAction={userAction as 'join' | 'create'}
          onJoinGroup={onGroupJoin}
          onBack={() => {
            if (userAction === 'join') {
              onStepChange('user-type');
            } else {
              onStepChange('location');
            }
          }}
        />
      );
    }

    // Handle local service provider groups
    if (userType === 'occupation_provider') {
      const user = currentUser || {
        id: 'temp-service-user',
        name: 'Service Provider',
        niche: 'Local Services',
        country: 'United States',
        preferredScope: 'local' as const
      };

      return (
        <LocalServiceGroupList
          user={user}
          userType={userType}
          userAction={userAction as 'join' | 'create'}
          onJoinGroup={onGroupJoin}
          onBack={() => {
            if (userAction === 'join') {
              onStepChange('service-selection');
            } else {
              onStepChange('location');
            }
          }}
        />
      );
    }

    // Default groups for other user types
    const user = currentUser || {
      id: 'temp-user',
      name: 'New User',
      niche: userType || 'general',
      country: 'United States',
      preferredScope: 'global' as const
    };
    
    return (
      <GroupList
        user={user}
        onJoinGroup={onGroupJoin}
        onBack={() => {
          // For business join flow, go back to location after groups
          if (userType === 'business' && userAction === 'join') {
            onStepChange('location');
          } else {
            onStepChange('location');
          }
        }}
      />
    );
  }
  
  if (currentStep === 'chat' && selectedGroup) {
    const user = currentUser || {
      id: 'temp-user',
      name: 'New User',
      niche: userType || 'general',
      country: 'United States',
      preferredScope: 'global' as const
    };
    
    return (
      <AdvancedGroupChat
        user={user}
        group={selectedGroup || {
          id: 'demo-shared-group',
          name: 'Demo Group',
          niche: user.niche || 'General',
          scope: 'global' as const,
          memberCount: 100,
          description: 'A demo group for users.',
          isPublic: true
        }}
        messages={messages.filter(m => m.groupId === (selectedGroup?.id || 'demo-shared-group'))}
        onSendMessage={onSendMessage}
        onBack={() => onStepChange('groups')}
      />
    );
  }

  // Social media influencer: skip profile creation if joining
  if (userType === 'social_media_influencer' && userAction === 'join' && (currentStep === 'social-media-profile' || currentStep === 'portfolio')) {
    // Go directly to groups step
    return (
      <SocialMediaGroupList
        user={currentUser || {
          id: 'temp-social-user',
          name: 'Content Creator',
          niche: 'Social Media',
          country: 'United States',
          preferredScope: 'global' as const
        }}
        userType={userType}
        userAction={userAction}
        onJoinGroup={onGroupJoin}
        onBack={() => onStepChange('user-type')}
      />
    );
  }

  return null;
};

export default SharedStepManager;
