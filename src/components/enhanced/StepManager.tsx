import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Step, UserType, UserAction, User, Group, Message } from '@/types/connectPulse';

// Enhanced components
import UserTypeSelector from './UserTypeSelector';
import EnhancedLocationSelector from './EnhancedLocationSelector';
import ServiceSelector from './ServiceSelector';
import PublicProfileBrowser from './PublicProfileBrowser';
import PortfolioUploader from './PortfolioUploader';
import BusinessProfileCreator from './BusinessProfileCreator';
import BusinessProfileView from './BusinessProfileView';
import FreelancerGigCreator from './FreelancerGigCreator';
import FreelancerLocationSelector from './FreelancerLocationSelector';
import FreelancerGroupList from './FreelancerGroupList';

// Existing components
import NicheSelector from '../NicheSelector';
import GroupChat from '../GroupChat';
import GroupList from '../GroupList';

interface StepManagerProps {
  currentStep: Step;
  userType: UserType | null;
  userAction: UserAction | null;
  currentUser: User | null;
  selectedGroup: Group | null;
  messages: Message[];
  profileData: any;
  businessData: any;
  locationData: any;
  portfolioItems: any[];
  browsingFilter: 'users' | 'businesses' | 'groups' | null;
  onStepChange: (step: Step) => void;
  onUserTypeSelect: (type: UserType, action: UserAction) => void;
  onUserRegistration: (userData: Omit<User, 'id'>) => void;
  onGroupJoin: (group: Group) => void;
  onSendMessage: (content: string) => void;
  onPortfolioSave: (items: any[]) => void;
  onBusinessProfileSave: (data: any) => void;
  onLocationSave: (data: any) => void;
  onBusinessProfileEdit: () => void;
  setProfileData: (data: any) => void;
  setCurrentUser: (user: User | null) => void;
  setBrowsingFilter: (filter: 'users' | 'businesses' | 'groups' | null) => void;
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
  setProfileData,
  setCurrentUser,
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
            setBrowsingFilter('businesses');
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
        profileData={profileData}
        onJoinGroup={onGroupJoin}
        onBack={() => onStepChange('freelancer-location')}
      />
    );
  }

  if (currentStep === 'service-selection' && userType && userType !== 'business') {
    return (
      <ServiceSelector 
        userType={userType}
        onNext={(serviceData) => {
          setProfileData(serviceData);
          if (userType === 'freelancer' || userType === 'occupation_provider') {
            onStepChange('portfolio');
          } else {
            onStepChange('location');
          }
        }}
        onBack={() => onStepChange('user-type')}
      />
    );
  }
  
  if (currentStep === 'social-media-profile' && userType === 'social_media_influencer') {
    return (
      <Card className="max-w-4xl mx-auto animate-fade-in shadow-lg">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => onStepChange('user-type')} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-xl">Create Your Influencer Profile</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="text-center p-6">
            <h3 className="text-2xl font-semibold mb-4">Coming Soon!</h3>
            <p className="text-gray-600 mb-6">
              We're building a specialized social media influencer profile creator. 
              For now, let's continue with the standard profile setup.
            </p>
            <Button 
              onClick={() => onStepChange('portfolio')} 
              className="bg-gradient-to-r from-pink-500 to-purple-600"
            >
              Continue to Portfolio
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (currentStep === 'portfolio' && userType && (userType === 'freelancer' || userType === 'occupation_provider' || userType === 'social_media_influencer')) {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in">
        <PortfolioUploader 
          onSave={onPortfolioSave}
          userType={userType as 'freelancer' | 'occupation_provider' | 'social_media_influencer'}
        />
      </div>
    );
  }
  
  if (currentStep === 'location' && userType) {
    return (
      <EnhancedLocationSelector
        userType={userType}
        onNext={onLocationSave}
        onBack={() => {
          if (userType === 'business') {
            if (userAction === 'create') {
              onStepChange('business-profile');
            } else {
              onStepChange('business-niche');
            }
          } else if (userType === 'freelancer' || userType === 'occupation_provider') {
            onStepChange('portfolio');
          } else {
            onStepChange('service-selection');
          }
        }}
        showDetailedAddress={userType === 'occupation_provider'}
      />
    );
  }
  
  if (currentStep === 'groups' && currentUser) {
    return (
      <GroupList
        user={currentUser}
        onJoinGroup={onGroupJoin}
        onBack={() => onStepChange('location')}
      />
    );
  }
  
  if (currentStep === 'chat' && currentUser && selectedGroup) {
    return (
      <GroupChat
        user={currentUser}
        group={selectedGroup}
        messages={messages.filter(m => m.groupId === selectedGroup.id)}
        onSendMessage={onSendMessage}
        onBack={() => onStepChange('groups')}
      />
    );
  }

  return null;
};

export default StepManager;
