
import React from 'react';
import { Step, UserType, UserAction } from '@/types/connectPulse';
import FreelancerGigCreator from '../FreelancerGigCreator';
import FreelancerLocationSelector from '../FreelancerLocationSelector';
import FreelancerGroupList from '../FreelancerGroupList';
import SimpleFreelancerSelector from '../SimpleFreelancerSelector';
import { Group } from '@/types/connectPulse';

interface FreelancerStepManagerProps {
  currentStep: Step;
  userAction: UserAction | null;
  profileData: any;
  locationData: any;
  portfolioItems: any[];
  onStepChange: (step: Step) => void;
  onPortfolioSave: (items: any[]) => void;
  onLocationSave: (data: any) => void;
  setProfileData: (data: any) => void;
}

const FreelancerStepManager: React.FC<FreelancerStepManagerProps> = ({
  currentStep,
  userAction,
  profileData,
  locationData,
  portfolioItems,
  onStepChange,
  onPortfolioSave,
  onLocationSave,
  setProfileData
}) => {
  // Handle freelancer-specific steps
  if (currentStep === 'freelancer-gig') {
    // Use simplified selector for join action
    if (userAction === 'join') {
      return (
        <SimpleFreelancerSelector 
          onNext={(profileData) => {
            setProfileData(profileData);
            onStepChange('freelancer-location');
          }}
          onBack={() => onStepChange('user-type')}
        />
      );
    }
    
    // Use full creator for create action
    return (
      <FreelancerGigCreator 
        userType={'freelancer' as UserType}
        onNext={(gigData) => {
          setProfileData(gigData);
          onStepChange('freelancer-location');
        }}
        onBack={() => onStepChange('user-type')}
      />
    );
  }
  
  if (currentStep === 'freelancer-location') {
    return (
      <FreelancerLocationSelector
        userType={'freelancer' as UserType}
        onNext={(locationData) => {
          onLocationSave(locationData);
          if (userAction === 'join') {
            onStepChange('freelancer-groups');
          }
          // For create action, the location save handler will route to profile preview
        }}
        onBack={() => onStepChange('freelancer-gig')}
      />
    );
  }

  if (currentStep === 'freelancer-groups') {
    return (
      <FreelancerGroupList
        userType={'freelancer' as UserType}
        userAction={userAction as 'join' | 'create'}
        profileData={profileData}
        onJoinGroup={(group) => {
          // Handle group join
          onStepChange('chat');
        }}
        onBack={() => onStepChange('freelancer-location')}
      />
    );
  }

  return null;
};

export default FreelancerStepManager;
