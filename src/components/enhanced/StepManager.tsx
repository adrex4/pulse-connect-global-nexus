
import React from 'react';
import { Step, UserType, UserAction, User, Group, Message } from '@/types/connectPulse';
import BusinessStepManager from './managers/BusinessStepManager';
import FreelancerStepManager from './managers/FreelancerStepManager';
import GeneralStepManager from './managers/GeneralStepManager';
import SharedStepManager from './managers/SharedStepManager';
import SocialMediaGroupList from './SocialMediaGroupList';
import LocalServiceGroupList from './LocalServiceGroupList';

interface StepManagerProps {
  currentStep: Step;
  userType: UserType | null;
  userAction: UserAction | null;
  currentUser: User | null;
  selectedGroup: Group | null;
  messages: Message[];
  profileData: any;
  businessData: any;
  locationData: any;
  portfolioItems: any[];
  browsingFilter: 'users' | 'businesses' | 'freelancers' | 'groups' | null;
  onStepChange: (step: Step) => void;
  onUserTypeSelect: (type: UserType, action: UserAction) => void;
  onUserRegistration: (userData: Omit<User, 'id'>) => void;
  onGroupJoin: (group: Group) => void;
  onSendMessage: (content: string) => void;
  onPortfolioSave: (items: any[]) => void;
  onBusinessProfileSave: (data: any) => void;
  onLocationSave: (data: any) => void;
  onBusinessProfileEdit: () => void;
  setProfileData: (data: any) => void;
  setCurrentUser: (user: User | null) => void;
  setBrowsingFilter: (filter: 'users' | 'businesses' | 'freelancers' | 'groups' | null) => void;
}

const StepManager: React.FC<StepManagerProps> = (props) => {
  const {
    currentStep,
    userType,
    userAction,
    currentUser,
    selectedGroup,
    messages,
    profileData,
    businessData,
    locationData,
    portfolioItems,
    browsingFilter,
    onStepChange,
    onUserTypeSelect,
    onUserRegistration,
    onGroupJoin,
    onSendMessage,
    onPortfolioSave,
    onBusinessProfileSave,
    onLocationSave,
    onBusinessProfileEdit,
    setProfileData,
    setCurrentUser,
    setBrowsingFilter
  } = props;

  // Handle general steps (browse, user-type)
  if (currentStep === 'browse' || currentStep === 'user-type') {
    return (
      <GeneralStepManager
        currentStep={currentStep}
        browsingFilter={browsingFilter}
        onStepChange={onStepChange}
        onUserTypeSelect={onUserTypeSelect}
        setBrowsingFilter={setBrowsingFilter}
      />
    );
  }

  // Handle business-specific steps
  if (userType === 'business') {
    const businessSteps = ['business-niche', 'business-profile', 'business-profile-preview', 'business-groups'];
    if (businessSteps.includes(currentStep)) {
      return (
        <BusinessStepManager
          currentStep={currentStep}
          userType={userType}
          userAction={userAction!}
          businessData={businessData}
          locationData={locationData}
          currentUser={currentUser}
          onStepChange={onStepChange}
          onBusinessProfileSave={onBusinessProfileSave}
          onBusinessProfileEdit={onBusinessProfileEdit}
          onGroupJoin={onGroupJoin}
          setCurrentUser={setCurrentUser}
        />
      );
    }
  }

  // Handle freelancer-specific steps for create and join actions
  if (userType === 'freelancer') {
    const freelancerSteps = ['freelancer-gig', 'freelancer-location', 'freelancer-groups'];
    if (freelancerSteps.includes(currentStep)) {
      return (
        <FreelancerStepManager
          currentStep={currentStep}
          userType={userType}
          userAction={userAction!}
          profileData={profileData}
          onStepChange={onStepChange}
          onLocationSave={onLocationSave}
          onGroupJoin={onGroupJoin}
          setProfileData={setProfileData}
        />
      );
    }
  }

  // Handle social media influencer groups
  if (userType === 'social_media_influencer' && currentStep === 'groups') {
    const user = currentUser || {
      id: 'temp-social-user',
      name: 'Content Creator',
      niche: profileData?.niche || 'Social Media',
      country: locationData?.country || 'United States',
      preferredScope: 'global' as const
    };

    return (
      <SocialMediaGroupList
        user={user}
        userType={userType}
        userAction={userAction as 'join' | 'create'}
        onJoinGroup={onGroupJoin}
        onBack={() => onStepChange('location')}
      />
    );
  }

  // Handle local service provider groups
  if (userType === 'occupation_provider' && currentStep === 'groups') {
    const user = currentUser || {
      id: 'temp-service-user',
      name: 'Service Provider',
      niche: profileData?.primarySkill || 'Local Services',
      country: locationData?.country || 'United States',
      preferredScope: 'local' as const
    };

    return (
      <LocalServiceGroupList
        user={user}
        userType={userType}
        userAction={userAction as 'join' | 'create'}
        onJoinGroup={onGroupJoin}
        onBack={() => onStepChange('location')}
      />
    );
  }

  // Handle all shared steps (service selection, portfolio, location, groups, chat, etc.)
  return (
    <SharedStepManager
      currentStep={currentStep}
      userType={userType}
      userAction={userAction}
      currentUser={currentUser}
      selectedGroup={selectedGroup}
      messages={messages}
      portfolioItems={portfolioItems}
      onStepChange={onStepChange}
      onUserRegistration={onUserRegistration}
      onGroupJoin={onGroupJoin}
      onSendMessage={onSendMessage}
      onPortfolioSave={onPortfolioSave}
      onLocationSave={onLocationSave}
      setProfileData={setProfileData}
    />
  );
};

export default StepManager;
