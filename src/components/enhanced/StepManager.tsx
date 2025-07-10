import React from 'react';
import UserTypeSelection from '../UserTypeSelection';
import BusinessProfileForm from '../BusinessProfileForm';
import BusinessNicheSelection from '../BusinessNicheSelection';
import PublicProfileBrowser from './PublicProfileBrowser';
import FreelancerGigForm from '../FreelancerGigForm';
import FreelancerGroups from '../FreelancerGroups';
import FreelancerLocation from '../FreelancerLocation';
import BusinessGroups from '../BusinessGroups';
import GroupsPage from '../GroupsPage';
import PortfolioForm from '../PortfolioForm';
import LocationForm from '../LocationForm';
import Chat from '../Chat';
import ServiceSelection from '../service/ServiceSelection';
import BusinessProfilePreview from '../BusinessProfilePreview';
import FreelancerProfilePreview from '../FreelancerProfilePreview';
import SocialMediaProfileForm from '../SocialMediaProfileForm';
import SocialMediaProfilePreview from '../SocialMediaProfilePreview';
import LocalServiceProviderProfilePreview from '../LocalServiceProviderProfilePreview';
import { Step, UserType, UserAction, User, Group } from '@/types/connectPulse';
import OpportunityViewer from '../OpportunityViewer';

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
      <UserTypeSelection onUserTypeSelect={onUserTypeSelect} />
    );
  }

  if (currentStep === 'business-profile') {
    return (
      <BusinessProfileForm 
        onSave={onBusinessProfileSave} 
        onBack={() => onStepChange('user-type')}
        initialData={businessData}
      />
    );
  }

  if (currentStep === 'business-niche') {
    return (
      <BusinessNicheSelection onNicheSelect={(niche: string) => {
        setProfileData({ ...profileData, niche });
        onStepChange('location');
      }} />
    );
  }

  if (currentStep === 'freelancer-gig') {
    return (
      <FreelancerGigForm 
        onSave={onPortfolioSave} 
        onBack={() => onStepChange('user-type')}
      />
    );
  }

  if (currentStep === 'freelancer-groups') {
    return (
      <FreelancerGroups onSave={() => onStepChange('freelancer-location')} />
    );
  }

  if (currentStep === 'freelancer-location') {
    return (
      <FreelancerLocation onSave={onLocationSave} />
    );
  }

  if (currentStep === 'business-groups') {
    return (
      <BusinessGroups onSave={() => onStepChange('location')} />
    );
  }

  if (currentStep === 'groups') {
    return (
      <GroupsPage onGroupSelect={onGroupJoin} />
    );
  }

  if (currentStep === 'portfolio') {
    return (
      <PortfolioForm 
        onSave={onPortfolioSave} 
        onBack={() => onStepChange('freelancer-gig')}
      />
    );
  }

  if (currentStep === 'location') {
    return (
      <LocationForm 
        onSave={onLocationSave} 
        onBack={() => {
          if (userType === 'business') {
            onStepChange('business-profile');
          } else if (userType === 'freelancer') {
            onStepChange('portfolio');
          } else {
            onStepChange('user-type');
          }
        }}
      />
    );
  }

  if (currentStep === 'chat') {
    return (
      <Chat 
        currentUser={currentUser}
        selectedGroup={selectedGroup}
        messages={messages}
        onSendMessage={onSendMessage}
      />
    );
  }

  if (currentStep === 'service-selection') {
    return (
      <ServiceSelection 
        onSave={onLocationSave} 
        onBack={() => onStepChange('user-type')}
      />
    );
  }

  if (currentStep === 'business-profile-preview') {
    return (
      <BusinessProfilePreview 
        businessData={businessData}
        locationData={locationData}
        onEdit={onBusinessProfileEdit}
        onConfirm={() => onStepChange('browse')}
      />
    );
  }

  if (currentStep === 'freelancer-profile-preview') {
    return (
      <FreelancerProfilePreview 
        profileData={profileData}
        locationData={locationData}
        portfolioItems={portfolioItems}
        onConfirm={() => onStepChange('browse')}
      />
    );
  }

  if (currentStep === 'social-media-profile') {
    return (
      <SocialMediaProfileForm 
        onSave={onLocationSave} 
        onBack={() => onStepChange('user-type')}
      />
    );
  }

  if (currentStep === 'social-media-profile-preview') {
    return (
      <SocialMediaProfilePreview 
        profileData={profileData}
        locationData={locationData}
        onConfirm={() => onStepChange('browse')}
      />
    );
  }

  if (currentStep === 'local-service-profile-preview') {
    return (
      <LocalServiceProviderProfilePreview 
        profileData={profileData}
        locationData={locationData}
        onConfirm={() => onStepChange('browse')}
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

  return (
    <div>
      <h2>Step not found</h2>
      <p>Current step: {currentStep}</p>
    </div>
  );
};

export default StepManager;
