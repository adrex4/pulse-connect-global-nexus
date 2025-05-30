
import React from 'react';
import { Step, UserType, UserAction, User } from '@/types/connectPulse';
import BusinessProfileCreator from '../BusinessProfileCreator';
import BusinessProfileView from '../BusinessProfileView';
import NicheSelector from '../../NicheSelector';

interface BusinessStepManagerProps {
  currentStep: Step;
  userType: UserType;
  userAction: UserAction;
  businessData: any;
  locationData: any;
  onStepChange: (step: Step) => void;
  onBusinessProfileSave: (data: any) => void;
  onBusinessProfileEdit: () => void;
  setCurrentUser: (user: User | null) => void;
}

const BusinessStepManager: React.FC<BusinessStepManagerProps> = ({
  currentStep,
  userType,
  userAction,
  businessData,
  locationData,
  onStepChange,
  onBusinessProfileSave,
  onBusinessProfileEdit,
  setCurrentUser
}) => {
  if (currentStep === 'business-profile' && userType === 'business') {
    return (
      <BusinessProfileCreator
        onNext={onBusinessProfileSave}
        onBack={() => onStepChange('user-type')}
      />
    );
  }

  if (currentStep === 'business-profile-preview' && businessData && locationData) {
    return (
      <BusinessProfileView
        businessData={businessData}
        locationData={locationData}
        onEdit={onBusinessProfileEdit}
        onPublish={() => onStepChange('welcome')}
        showPublishButton={true}
        publishButtonText="Return Home"
      />
    );
  }
  
  if (currentStep === 'business-niche' && userType === 'business') {
    return (
      <NicheSelector 
        onNext={(name, niche) => {
          const newUser: User = {
            id: Date.now().toString(),
            name,
            niche,
            country: '',
            preferredScope: 'local'
          };
          setCurrentUser(newUser);
          onStepChange('location');
        }}
        onBack={() => onStepChange('user-type')}
      />
    );
  }

  return null;
};

export default BusinessStepManager;
