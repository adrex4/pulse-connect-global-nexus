
import React from 'react';
import { Step, UserType } from '@/types/connectPulse';
import FreelancerGigCreator from '../FreelancerGigCreator';
import FreelancerLocationSelector from '../FreelancerLocationSelector';
import FreelancerGroupList from '../FreelancerGroupList';
import { Group } from '@/types/connectPulse';

interface FreelancerStepManagerProps {
  currentStep: Step;
  userType: UserType;
  userAction: 'join' | 'create';
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
  if (currentStep === 'freelancer-gig' && userType && userType !== 'business') {
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
  
  if (currentStep === 'freelancer-location' && userType && userType !== 'business') {
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

  if (currentStep === 'freelancer-groups' && userType && userType !== 'business') {
    return (
      <FreelancerGroupList
        userType={userType}
        userAction={userAction}
        profileData={profileData}
        onJoinGroup={onGroupJoin}
        onBack={() => onStepChange('freelancer-location')}
      />
    );
  }

  return null;
};

export default FreelancerStepManager;
