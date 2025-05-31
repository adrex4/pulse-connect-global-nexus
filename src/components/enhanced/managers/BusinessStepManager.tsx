
import React from 'react';
import { Step, UserType, UserAction, User } from '@/types/connectPulse';
import BusinessProfileCreator from '../BusinessProfileCreator';
import BusinessProfileView from '../BusinessProfileView';
import NicheSelector from '../../NicheSelector';
import BusinessGroupList from '../BusinessGroupList';

interface BusinessStepManagerProps {
  currentStep: Step;
  userType: UserType;
  userAction: UserAction;
  businessData: any;
  locationData: any;
  currentUser: User | null;
  onStepChange: (step: Step) => void;
  onBusinessProfileSave: (data: any) => void;
  onBusinessProfileEdit: () => void;
  onGroupJoin: (group: any) => void;
  setCurrentUser: (user: User | null) => void;
}

const BusinessStepManager: React.FC<BusinessStepManagerProps> = ({
  currentStep,
  userType,
  userAction,
  businessData,
  locationData,
  currentUser,
  onStepChange,
  onBusinessProfileSave,
  onBusinessProfileEdit,
  onGroupJoin,
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

  if (currentStep === 'business-groups' && userType === 'business') {
    const user = currentUser || {
      id: 'temp-business-user',
      name: 'Business Owner',
      niche: 'business',
      country: locationData?.country || 'United States',
      preferredScope: 'local' as const
    };

    return (
      <BusinessGroupList
        user={user}
        userType={userType}
        userAction={userAction as 'join' | 'create'}
        onJoinGroup={(group) => {
          onGroupJoin(group);
          onStepChange('chat');
        }}
        onBack={() => onStepChange('location')}
      />
    );
  }

  return null;
};

export default BusinessStepManager;
