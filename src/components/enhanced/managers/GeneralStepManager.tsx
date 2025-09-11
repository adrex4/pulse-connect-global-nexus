
import React from 'react';
import { Step, UserType, UserAction } from '@/types/connectPulse';
import UserTypeSelector from '../UserTypeSelector';
import PublicProfileBrowser from '../PublicProfileBrowser';
import OpportunityViewer from '../../OpportunityViewer';

interface GeneralStepManagerProps {
  currentStep: Step;
  browsingFilter: 'businesses' | 'freelancers' | 'groups' | 'social_media' | 'local_services' | null;
  onStepChange: (step: Step) => void;
  onUserTypeSelect: (type: UserType, action: UserAction) => void;
  setBrowsingFilter: (filter: 'businesses' | 'freelancers' | 'groups' | 'social_media' | 'local_services' | null) => void;
  onViewOpportunities?: () => void;
}

const GeneralStepManager: React.FC<GeneralStepManagerProps> = ({
  currentStep,
  browsingFilter,
  onStepChange,
  onUserTypeSelect,
  setBrowsingFilter,
  onViewOpportunities
}) => {
  if (currentStep === 'browse') {
    return (
      <PublicProfileBrowser 
        onGetStarted={() => onStepChange('user-type')} 
        initialFilter={browsingFilter}
        onViewOpportunities={onViewOpportunities}
        onBack={() => onStepChange('welcome')}
      />
    );
  }

  if (currentStep === 'view-opportunities') {
    return (
      <OpportunityViewer onBack={() => onStepChange('welcome')} />
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
            } else if (type === 'freelancer') {
              setBrowsingFilter('freelancers');
            } else if (type === 'social_media_influencer') {
              setBrowsingFilter('social_media');
            } else if (type === 'occupation_provider') {
              setBrowsingFilter('local_services');
            } else {
              // For other types, default to businesses
              setBrowsingFilter('businesses');
            }
            onStepChange('browse');
          }
          // Let the main StepManager handle the routing for create/join actions
        }}
        onBack={() => onStepChange('welcome')}
      />
    );
  }

  return null;
};

export default GeneralStepManager;
