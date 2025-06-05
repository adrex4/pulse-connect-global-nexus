
import React, { useState } from 'react';
import { Step, UserType, UserAction, User, Group, Message } from '@/types/connectPulse';
import WelcomeSection from './enhanced/WelcomeSection';
import StepManager from './enhanced/StepManager';
import UserProfilePage from './UserProfilePage';
import GlobalNavigation from './GlobalNavigation';

const ConnectPulse = () => {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [userAction, setUserAction] = useState<UserAction | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [profileData, setProfileData] = useState<any>(null);
  const [businessData, setBusinessData] = useState<any>(null);
  const [locationData, setLocationData] = useState<any>(null);
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [browsingFilter, setBrowsingFilter] = useState<'businesses' | 'freelancers' | 'groups' | 'social_media' | null>(null);
  const [joinedGroups, setJoinedGroups] = useState<Group[]>([]);

  const handleUserRegistration = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      id: Date.now().toString(),
      ...userData
    };
    setCurrentUser(newUser);
    setCurrentStep('groups');
  };

  const handleGroupJoin = (group: Group) => {
    console.log('Joining group:', group);
    
    // Create user if doesn't exist
    if (!currentUser) {
      const newUser: User = {
        id: Date.now().toString(),
        name: 'New User',
        niche: profileData?.primarySkill || profileData?.niche || userType || 'general',
        country: locationData?.country || 'United States',
        preferredScope: 'global'
      };
      setCurrentUser(newUser);
    }
    
    // Add group to joined groups if not already joined
    if (!joinedGroups.find(g => g.id === group.id)) {
      setJoinedGroups(prev => [...prev, group]);
    }
    
    setSelectedGroup(group);
    setCurrentStep('chat');
  };

  const handleSendMessage = (content: string) => {
    if (!currentUser || !selectedGroup) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      content,
      timestamp: new Date(),
      groupId: selectedGroup.id
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const handlePortfolioSave = (items: any[]) => {
    setPortfolioItems(items);
    setCurrentStep('location');
  };

  const handleBusinessProfileSave = (data: any) => {
    setBusinessData(data);
    setCurrentStep('location');
  };

  const handleLocationSave = (data: any) => {
    setLocationData(data);
    
    // Different routing based on user type and action
    if (userType === 'business') {
      if (userAction === 'create' && businessData) {
        setCurrentStep('business-profile-preview');
      } else if (userAction === 'join') {
        setCurrentStep('business-groups');
      }
    } else if (userType === 'freelancer') {
      if (userAction === 'create') {
        setCurrentStep('freelancer-profile-preview');
      } else {
        setCurrentStep('freelancer-groups');
      }
    } else if (userType === 'social_media_influencer') {
      if (userAction === 'create') {
        setCurrentStep('social-media-profile-preview');
      } else {
        setCurrentStep('groups');
      }
    } else if (userType === 'occupation_provider') {
      if (userAction === 'create') {
        setCurrentStep('local-service-profile-preview');
      } else {
        setCurrentStep('groups');
      }
    } else {
      setCurrentStep('groups');
    }
  };

  const handleBusinessProfileEdit = () => {
    setCurrentStep('business-profile');
  };

  const handleUserTypeSelect = (type: UserType, action: UserAction) => {
    console.log('User type selected:', type, action);
    setUserType(type);
    setUserAction(action);
    
    // Don't handle view actions here - let GeneralStepManager handle them
    if (action === 'view') {
      return;
    }
    
    // FIXED: Handle social media influencer join action
    if (type === 'social_media_influencer' && action === 'join') {
      console.log('Social media influencer joining - going to groups');
      setCurrentStep('groups');
      return;
    }
    
    // Determine next step based on user type and action
    if (type === 'business') {
      if (action === 'create') {
        setCurrentStep('business-profile');
      } else if (action === 'join') {
        setCurrentStep('business-niche');
      }
    } else if (type === 'freelancer') {
      setCurrentStep('freelancer-gig');
    } else if (type === 'occupation_provider') {
      if (action === 'create') {
        setCurrentStep('service-selection');
      } else {
        setCurrentStep('service-selection');
      }
    } else if (type === 'social_media_influencer') {
      if (action === 'create') {
        setCurrentStep('social-media-profile');
      }
    }
  };

  // Handle navigation to profile page
  const handleNavigateToProfile = () => {
    if (currentUser) {
      setCurrentStep('profile');
    }
  };

  // Show user profile page
  if (currentStep === 'profile' && currentUser) {
    return (
      <UserProfilePage
        currentUser={currentUser}
        joinedGroups={joinedGroups}
        messages={messages}
        onBack={() => setCurrentStep('welcome')}
        onEditProfile={() => {
          // Navigate to appropriate edit profile step based on user type
          if (userType === 'business') {
            setCurrentStep('business-profile');
          } else if (userType === 'freelancer') {
            setCurrentStep('freelancer-gig');
          } else if (userType === 'social_media_influencer') {
            setCurrentStep('social-media-profile');
          } else if (userType === 'occupation_provider') {
            setCurrentStep('service-selection');
          } else {
            setCurrentStep('user-type');
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Global Navigation - Show when user is logged in */}
      {currentUser && currentStep !== 'welcome' && (
        <GlobalNavigation 
          currentUserType={userType}
          onNavigate={(path) => {
            if (path === '/profile') {
              handleNavigateToProfile();
            }
            // Add other navigation handlers as needed
          }}
        />
      )}
      
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          {currentStep === 'welcome' && (
            <WelcomeSection 
              onBrowse={() => setCurrentStep('browse')}
              onGetStarted={() => setCurrentStep('user-type')}
              onMyProfile={currentUser ? handleNavigateToProfile : undefined}
              currentUser={currentUser}
            />
          )}
          
          {currentStep !== 'welcome' && currentStep !== 'profile' && (
            <StepManager
              currentStep={currentStep}
              userType={userType}
              userAction={userAction}
              currentUser={currentUser}
              selectedGroup={selectedGroup}
              messages={messages}
              profileData={profileData}
              businessData={businessData}
              locationData={locationData}
              portfolioItems={portfolioItems}
              browsingFilter={browsingFilter}
              onStepChange={setCurrentStep}
              onUserTypeSelect={handleUserTypeSelect}
              onUserRegistration={handleUserRegistration}
              onGroupJoin={handleGroupJoin}
              onSendMessage={handleSendMessage}
              onPortfolioSave={handlePortfolioSave}
              onBusinessProfileSave={handleBusinessProfileSave}
              onLocationSave={handleLocationSave}
              onBusinessProfileEdit={handleBusinessProfileEdit}
              setProfileData={setProfileData}
              setCurrentUser={setCurrentUser}
              setBrowsingFilter={setBrowsingFilter}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectPulse;
