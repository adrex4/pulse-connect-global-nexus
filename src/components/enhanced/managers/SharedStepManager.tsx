
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Step, UserType, UserAction, User, Group, Message } from '@/types/connectPulse';
import EnhancedLocationSelector from '../EnhancedLocationSelector';
import ServiceSelector from '../ServiceSelector';
import PortfolioUploader from '../PortfolioUploader';
import GroupChat from '../../GroupChat';
import GroupList from '../../GroupList';

interface SharedStepManagerProps {
  currentStep: Step;
  userType: UserType;
  userAction: UserAction;
  currentUser: User | null;
  selectedGroup: Group | null;
  messages: Message[];
  portfolioItems: any[];
  onStepChange: (step: Step) => void;
  onUserRegistration: (userData: Omit<User, 'id'>) => void;
  onGroupJoin: (group: Group) => void;
  onSendMessage: (content: string) => void;
  onPortfolioSave: (items: any[]) => void;
  onLocationSave: (data: any) => void;
  setProfileData: (data: any) => void;
}

const SharedStepManager: React.FC<SharedStepManagerProps> = ({
  currentStep,
  userType,
  userAction,
  currentUser,
  selectedGroup,
  messages,
  portfolioItems,
  onStepChange,
  onUserRegistration,
  onGroupJoin,
  onSendMessage,
  onPortfolioSave,
  onLocationSave,
  setProfileData
}) => {
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

export default SharedStepManager;
