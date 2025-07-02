import React, { useState, useEffect } from 'react';
import GlobalNavigation from '@/components/GlobalNavigation';
import StepManager from '@/components/enhanced/StepManager';
import { supabase } from '@/integrations/supabase/client';
import { UserType, UserAction, Step, User, Group, Message } from '@/types/connectPulse';

interface ProfileData {
  name: string;
  bio: string;
  location: string;
  skills: string[];
}

interface BusinessData {
  name: string;
  niche: string;
  description: string;
}

const ConnectPulse: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [userAction, setUserAction] = useState<UserAction | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [locationData, setLocationData] = useState<any>(null);
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [browsingFilter, setBrowsingFilter] = useState<'businesses' | 'freelancers' | 'groups' | 'social_media' | null>(null);

  // Real-time subscription for profile updates
  useEffect(() => {
    const channel = supabase
      .channel('profile-updates')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_profiles'
        },
        (payload) => {
          console.log('New profile created:', payload);
          // Auto-redirect to explore community after profile creation
          if (payload.new.user_type === 'occupation_provider') {
            setTimeout(() => {
              setBrowsingFilter('local_services');
              setCurrentStep('browse');
            }, 2000);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'user_profiles'
        },
        (payload) => {
          console.log('Profile updated:', payload);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleUserRegistration = async (userData: Omit<User, 'id'>) => {
    try {
      const { data: user, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            user_type: userType,
            location_string: userData.location_string,
            skills: userData.skills,
            experience: userData.experience,
            category: userData.category,
            title: userData.title,
            description: userData.description,
            verified: false,
          },
        },
      });

      if (error) {
        console.error('Error signing up:', error);
        return;
      }

      console.log('User signed up:', user);
      setCurrentUser(userData as User);
      setCurrentStep('welcome');
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  const handleGroupJoin = (group: Group) => {
    console.log('Joining group:', group);
    setSelectedGroup(group);
    setCurrentStep('chat');
  };

  const handleSendMessage = (content: string) => {
    if (!selectedGroup) return;

    const newMessage: Message = {
      id: Math.random().toString(),
      groupId: selectedGroup.id,
      senderId: currentUser?.id || 'temp-user',
      content,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
  };

  const handlePortfolioSave = (items: any[]) => {
    console.log('Saving portfolio items:', items);
    setPortfolioItems(items);
    setCurrentStep('location');
  };

  const handleBusinessProfileSave = (data: any) => {
    console.log('Saving business profile data:', data);
    setBusinessData(data);
    setCurrentStep('business-profile-preview');
  };

  const handleUserTypeSelect = (type: UserType, action: UserAction) => {
    console.log(`Selected user type: ${type}, action: ${action}`);
    setUserType(type);
    setUserAction(action);
    
    if (type === 'business') {
      if (action === 'create') {
        setCurrentStep('business-niche');
      } else {
        setCurrentStep('business-niche');
      }
    } else if (type === 'freelancer') {
      if (action === 'create') {
        setCurrentStep('freelancer-gig');
      } else {
        setCurrentStep('freelancer-gig');
      }
    } else if (type === 'social_media_influencer') {
      if (action === 'create') {
        setCurrentStep('social-media-profile');
      } else {
        setCurrentStep('groups');
      }
    } else if (type === 'occupation_provider') {
      if (action === 'create') {
        setCurrentStep('service-selection');
      } else {
        setCurrentStep('groups');
      }
    }
  };

  const handleLocationSave = (data: any) => {
    console.log('Location data saved:', data);
    setLocationData(data);
    
    if (userType === 'freelancer') {
      setCurrentStep('freelancer-profile-preview');
    } else if (userType === 'social_media_influencer') {
      setCurrentStep('social-media-profile-preview');
    } else if (userType === 'occupation_provider') {
      setCurrentStep('local-service-profile-preview');
    } else {
      setCurrentStep('groups');
    }
  };

  const handleGlobalNavigation = (path: string) => {
    console.log('Navigating to:', path);
    
    switch (path) {
      case '/':
        setCurrentStep('welcome');
        break;
      case '/groups':
        if (currentUser) {
          setCurrentStep('groups');
        } else {
          setCurrentStep('browse');
          setBrowsingFilter('groups');
        }
        break;
      case '/profiles':
        setCurrentStep('browse');
        if (userType === 'social_media_influencer') {
          setBrowsingFilter('social_media');
        } else if (userType === 'business') {
          setBrowsingFilter('businesses');
        } else if (userType === 'freelancer') {
          setBrowsingFilter('freelancers');
        } else if (userType === 'occupation_provider') {
          setBrowsingFilter('local_services');
        } else {
          setBrowsingFilter('businesses');
        }
        break;
      case '/profile':
        if (currentUser) {
          setCurrentStep('profile');
        } else {
          setCurrentStep('user-type');
        }
        break;
      default:
        setCurrentStep('welcome');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <GlobalNavigation 
        currentUserType={userType}
        onNavigate={handleGlobalNavigation}
        showBackButton={currentStep !== 'welcome' && currentStep !== 'browse'}
        onBack={() => {
          if (currentStep === 'user-type') {
            setCurrentStep('browse');
          } else if (currentStep === 'business-niche') {
            setCurrentStep('user-type');
          } else if (currentStep === 'freelancer-gig') {
            setCurrentStep('user-type');
          } else if (currentStep === 'social-media-profile') {
            setCurrentStep('user-type');
          } else if (currentStep === 'service-selection') {
            setCurrentStep('user-type');
          } else {
            setCurrentStep('welcome');
          }
        }}
      />
      
      <div className="container mx-auto px-4 py-8">
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
          onBusinessProfileEdit={() => setCurrentStep('business-profile')}
          setProfileData={setProfileData}
          setCurrentUser={setCurrentUser}
          setBrowsingFilter={setBrowsingFilter}
        />
      </div>
    </div>
  );
};

export default ConnectPulse;
