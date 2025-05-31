
import React from 'react';
import { Step, UserType, UserAction } from '@/types/connectPulse';
import FreelancerGigCreator from '../FreelancerGigCreator';
import FreelancerLocationSelector from '../FreelancerLocationSelector';
import FreelancerGroupList from '../FreelancerGroupList';
import { Group } from '@/types/connectPulse';

interface FreelancerStepManagerProps {
  currentStep: Step;
  userType: UserType;
  userAction: UserAction;
  profileData: any;
  onStepChange: (step: Step) => void;
  onLocationSave: (data: any) => void;
  onGroupJoin: (group: Group) => void;
  setProfileData: (data: any) => void;
}

const FreelancerStepManager: React.FC<FreelancerStepManagerProps> = ({
  currentStep,
  userType,
  userAction,
  profileData,
  onStepChange,
  onLocationSave,
  onGroupJoin,
  setProfileData
}) => {
  // Handle freelancer-specific steps
  if (currentStep === 'freelancer-gig') {
    return (
      <FreelancerGigCreator 
        userType={userType}
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
        userType={userType}
        onNext={(locationData) => {
          onLocationSave(locationData);
          onStepChange('freelancer-groups');
        }}
        onBack={() => onStepChange('freelancer-gig')}
      />
    );
  }

  if (currentStep === 'freelancer-groups') {
    return (
      <FreelancerGroupList
        userType={userType}
        userAction={userAction as 'join' | 'create'}
        profileData={profileData}
        onJoinGroup={(group) => {
          onGroupJoin(group);
          onStepChange('chat');
        }}
        onBack={() => onStepChange('freelancer-location')}
      />
    );
  }

  return null;
};

export default FreelancerStepManager;
