
import React from 'react';
import { Step, UserType, UserAction } from '@/types/connectPulse';
import UserTypeSelector from '../UserTypeSelector';
import PublicProfileBrowser from '../PublicProfileBrowser';

interface GeneralStepManagerProps {
  currentStep: Step;
  browsingFilter: 'users' | 'businesses' | 'groups' | null;
  onStepChange: (step: Step) => void;
  onUserTypeSelect: (type: UserType, action: UserAction) => void;
  setBrowsingFilter: (filter: 'users' | 'businesses' | 'groups' | null) => void;
}

const GeneralStepManager: React.FC<GeneralStepManagerProps> = ({
  currentStep,
  browsingFilter,
  onStepChange,
  onUserTypeSelect,
  setBrowsingFilter
}) => {
  if (currentStep === 'browse') {
    return (
      <PublicProfileBrowser 
        onGetStarted={() => onStepChange('user-type')} 
        initialFilter={browsingFilter}
      />
    );
  }

  if (currentStep === 'user-type') {
    return (
      <UserTypeSelector 
        onNext={(type, action) => {
          onUserTypeSelect(type, action);
          
          if (action === 'view') {
            if (type === 'business') {
              setBrowsingFilter('businesses');
            } else {
              setBrowsingFilter('freelancers');
            }
            onStepChange('browse');
          } else if (action === 'join') {
            if (type === 'business') {
              onStepChange('business-niche');
            } else {
              onStepChange('freelancer-gig');
            }
          } else { // action === 'create'
            if (type === 'business') {
              onStepChange('business-profile');
            } else {
              onStepChange('freelancer-gig');
            }
          }
        }}
        onBack={() => onStepChange('welcome')}
      />
    );
  }

  return null;
};

export default GeneralStepManager;
