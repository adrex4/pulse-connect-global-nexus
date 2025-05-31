
import React from 'react';
import { Step, UserType, UserAction, User, Group, Message } from '@/types/connectPulse';
import BusinessStepManager from './managers/BusinessStepManager';
import FreelancerStepManager from './managers/FreelancerStepManager';
import GeneralStepManager from './managers/GeneralStepManager';
import SharedStepManager from './managers/SharedStepManager';

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
    const businessSteps = ['business-niche', 'business-profile', 'business-profile-preview'];
    if (businessSteps.includes(currentStep)) {
      return (
        <BusinessStepManager
          currentStep={currentStep}
          userType={userType}
          userAction={userAction!}
          businessData={businessData}
          locationData={locationData}
          onStepChange={onStepChange}
          onBusinessProfileSave={onBusinessProfileSave}
          onBusinessProfileEdit={onBusinessProfileEdit}
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
