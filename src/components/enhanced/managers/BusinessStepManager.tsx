
import React, { useState } from 'react';
import { Step, UserType, UserAction, User } from '@/types/connectPulse';
import BusinessProfileCreator from '../BusinessProfileCreator';
import BusinessProfileView from '../BusinessProfileView';
import NicheSelector from '../../NicheSelector';
import BusinessGroupList from '../BusinessGroupList';
import EnhancedLocationSelector from '../EnhancedLocationSelector';
import AdvancedGroupChat from '../AdvancedGroupChat';

interface BusinessStepManagerProps {
  currentStep: Step;
  userAction: UserAction | null;
  profileData: any;
  businessData: any;
  locationData: any;
  onStepChange: (step: Step) => void;
  onBusinessProfileSave: (data: any) => void;
  onBusinessProfileEdit: () => void;
  onLocationSave: (data: any) => void;
  setProfileData: (data: any) => void;
}

const BusinessStepManager: React.FC<BusinessStepManagerProps> = ({
  currentStep,
  userAction,
  profileData,
  businessData,
  locationData,
  onStepChange,
  onBusinessProfileSave,
  onBusinessProfileEdit,
  onLocationSave,
  setProfileData
}) => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  if (currentStep === 'business-profile') {
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
  
  if (currentStep === 'business-niche') {
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
          setProfileData(newUser);
          onStepChange('location');
        }}
        onBack={() => onStepChange('user-type')}
      />
    );
  }

  if (currentStep === 'location') {
    return (
      <EnhancedLocationSelector
        userType="business"
        onNext={onLocationSave}
        onBack={() => onStepChange(userAction === 'create' ? 'business-profile' : 'business-niche')}
      />
    );
  }

  if (currentStep === 'business-groups') {
    const user = profileData || {
      id: 'temp-business-user',
      name: 'Business Owner',
      niche: 'business',
      country: locationData?.country || 'United States',
      preferredScope: 'local' as const
    };

    return (
      <BusinessGroupList
        user={user}
        userType={'business' as UserType}
        userAction={userAction as 'join' | 'create'}
        onJoinGroup={(group) => {
          setSelectedGroup(group);
          onStepChange('chat');
        }}
        onBack={() => onStepChange('location')}
      />
    );
  }

  if (currentStep === 'chat') {
    const user = profileData || {
      id: 'temp-business-user',
      name: 'Business Owner',
      niche: 'business',
      country: locationData?.country || 'United States',
      preferredScope: 'local' as const
    };
    const group = selectedGroup || {
      id: 'demo-business-group',
      name: 'Business Demo Group',
      niche: user.niche || 'Business',
      scope: 'local' as const,
      memberCount: 100,
      description: 'A demo group for businesses.',
      isPublic: true
    };
    return (
      <AdvancedGroupChat
        user={user}
        group={group}
        messages={[]}
        onSendMessage={() => {}}
        onBack={() => onStepChange('business-groups')}
      />
    );
  }

  return null;
};

export default BusinessStepManager;
