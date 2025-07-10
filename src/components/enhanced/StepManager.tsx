
import React from 'react';
import PublicProfileBrowser from './PublicProfileBrowser';
import { Step, UserType, UserAction, User, Group } from '@/types/connectPulse';
import OpportunityViewer from '../OpportunityViewer';
import BusinessStepManager from './managers/BusinessStepManager';
import FreelancerStepManager from './managers/FreelancerStepManager';
import SharedStepManager from './managers/SharedStepManager';
import UserTypeSelector from './UserTypeSelector';

interface StepManagerProps {
  currentStep: Step;
  userType: UserType | null;
  userAction: UserAction | null;
  currentUser: User | null;
  selectedGroup: Group | null;
  messages: any[];
  profileData: any;
  businessData: any;
  locationData: any;
  portfolioItems: any[];
  browsingFilter: 'businesses' | 'freelancers' | 'groups' | 'social_media' | null;
  onStepChange: (step: Step) => void;
  onUserTypeSelect: (type: UserType, action: UserAction) => void;
  onUserRegistration: (userData: Omit<User, 'id'>) => void;
  onGroupJoin: (group: Group) => void;
  onSendMessage: (content: string) => void;
  onPortfolioSave: (items: any[]) => void;
  onBusinessProfileSave: (data: any) => void;
  onLocationSave: (data: any) => void;
  onBusinessProfileEdit: () => void;
  onViewOpportunities?: () => void;
  setProfileData: (data: any) => void;
  setCurrentUser: (user: User | null) => void;
  setBrowsingFilter: (filter: 'businesses' | 'freelancers' | 'groups' | 'social_media' | null) => void;
}

const StepManager: React.FC<StepManagerProps> = ({
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
  onViewOpportunities,
  setProfileData,
  setCurrentUser,
  setBrowsingFilter
}) => {
  if (currentStep === 'user-type') {
    return (
      <UserTypeSelector 
        onNext={onUserTypeSelect} 
        onBack={() => onStepChange('browse')}
      />
    );
  }

  if (currentStep === 'browse') {
    return (
      <PublicProfileBrowser 
        onGetStarted={() => onStepChange('user-type')} 
        initialFilter={browsingFilter}
        onViewOpportunities={onViewOpportunities}
      />
    );
  }

  if (currentStep === 'view-opportunities') {
    return (
      <OpportunityViewer onBack={() => onStepChange('browse')} />
    );
  }

  // Use the existing step managers for specific user types
  if (userType === 'business') {
    return (
      <BusinessStepManager
        currentStep={currentStep}
        userAction={userAction}
        profileData={profileData}
        businessData={businessData}
        locationData={locationData}
        onStepChange={onStepChange}
        onBusinessProfileSave={onBusinessProfileSave}
        onLocationSave={onLocationSave}
        onBusinessProfileEdit={onBusinessProfileEdit}
        setProfileData={setProfileData}
      />
    );
  }

  if (userType === 'freelancer') {
    return (
      <FreelancerStepManager
        currentStep={currentStep}
        userAction={userAction}
        profileData={profileData}
        locationData={locationData}
        portfolioItems={portfolioItems}
        onStepChange={onStepChange}
        onPortfolioSave={onPortfolioSave}
        onLocationSave={onLocationSave}
        setProfileData={setProfileData}
      />
    );
  }

  // Use SharedStepManager for other user types
  return (
    <SharedStepManager
      currentStep={currentStep}
      userType={userType}
      userAction={userAction}
      profileData={profileData}
      locationData={locationData}
      onStepChange={onStepChange}
      onLocationSave={onLocationSave}
      setProfileData={setProfileData}
    />
  );
};

export default StepManager;
