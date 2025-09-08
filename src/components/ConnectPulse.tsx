import React, { useState, useEffect } from 'react';
import { Step, UserType, UserAction, User, Group, Message } from '@/types/connectPulse';
import WelcomeSection from './enhanced/WelcomeSection';
import StepManager from './enhanced/StepManager';
import UserProfilePage from './UserProfilePage';
import GlobalNavigation from './GlobalNavigation';
import { supabase } from '@/integrations/supabase/client';
import OpportunityPosting from './OpportunityPosting';
import OpportunityViewer from './OpportunityViewer';

const ConnectPulse: React.FC = () => {
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
  // Update the useState for browsingFilter to include 'local_services'
  const [browsingFilter, setBrowsingFilter] = useState<'businesses' | 'freelancers' | 'groups' | 'social_media' | 'local_services' | null>(null);
  const [joinedGroups, setJoinedGroups] = useState<Group[]>([]);
  const [showOpportunityPosting, setShowOpportunityPosting] = useState(false);
  const [showOpportunityViewer, setShowOpportunityViewer] = useState(false);

  // Real-time message subscription
  useEffect(() => {
    if (!selectedGroup) return;

    const channel = supabase
      .channel(`group-messages-${selectedGroup.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `group_id=eq.${selectedGroup.id}`
        },
        (payload) => {
          const newMessage = payload.new as any;
          setMessages(prev => [...prev, {
            id: newMessage.id,
            userId: newMessage.user_id,
            userName: newMessage.user_name || 'Unknown User',
            content: newMessage.content,
            timestamp: new Date(newMessage.created_at),
            groupId: newMessage.group_id
          }]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedGroup]);

  // Real-time group updates
  useEffect(() => {
    const channel = supabase
      .channel('group-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'groups'
        },
        (payload) => {
          console.log('Group updated:', payload);
          // Refresh joined groups when groups are updated
          if (currentUser) {
            // This would typically fetch updated group data
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser]);

  // Create demo groups for demo user
  const demoGroups: Group[] = [
    {
      id: '1',
      name: 'Web Developers Community',
      description: 'A community for web developers to share knowledge and collaborate',
      memberCount: 1250,
      category: 'Technology',
      scope: 'global',
      isPublic: true,
      niche: 'Web Development'
    },
    {
      id: '2',
      name: 'Digital Marketing Experts',
      description: 'Connect with marketing professionals and share strategies',
      memberCount: 850,
      category: 'Marketing',
      scope: 'regional',
      isPublic: true,
      niche: 'Digital Marketing'
    },
    {
      id: '3',
      name: 'Startup Founders Network',
      description: 'A private network for startup founders to connect and support each other',
      memberCount: 320,
      category: 'Business',
      scope: 'global',
      isPublic: false,
      niche: 'Entrepreneurship'
    }
  ];

  // Create demo messages for demo user
  const demoMessages: Message[] = [
    {
      id: '1',
      userId: 'demo-user',
      userName: 'John Demo',
      content: 'Hello everyone! Excited to be part of this community. Looking forward to learning from all of you!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      groupId: '1'
    },
    {
      id: '2',
      userId: 'demo-user',
      userName: 'John Demo',
      content: 'Just finished a React project using Next.js. Happy to share my experience if anyone is interested!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      groupId: '1'
    },
    {
      id: '3',
      userId: 'demo-user',
      userName: 'John Demo',
      content: 'What are the latest trends in digital marketing for 2024? Would love to hear your thoughts!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      groupId: '2'
    }
  ];

  const handleNavigateToProfile = () => {
    console.log('Navigating to profile page', { currentUser });
    
    if (!currentUser) {
      const demoUser: User = {
        id: 'demo-user',
        name: 'John Demo',
        email: 'john.demo@example.com',
        niche: 'Full Stack Developer',
        country: 'United States',
        preferredScope: 'global',
        bio: 'Passionate full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies. Love building innovative solutions and collaborating with creative teams.',
        avatar: undefined
      };
      setCurrentUser(demoUser);
      setUserType('freelancer');
      setJoinedGroups(demoGroups);
      setMessages(demoMessages);
    }
    
    setCurrentStep('profile');
  };

  const handleUserRegistration = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      id: Date.now().toString(),
      ...userData
    };
    setCurrentUser(newUser);
    // REAL-TIME FLOW: After profile creation, go to explore community
    setCurrentStep('browse');
  };

  const handleGroupJoin = (group: Group) => {
    console.log('Joining group:', group);
    
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
    
    // In a real app, this would save to Supabase
    // supabase.from('messages').insert({
    //   user_id: currentUser.id,
    //   user_name: currentUser.name,
    //   content,
    //   group_id: selectedGroup.id
    // });
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
    
    // REAL-TIME FLOW: After location, go to profile preview or groups
    if (userType === 'business') {
      if (userAction === 'create' && businessData) {
        setCurrentStep('business-profile-preview');
      } else if (userAction === 'join') {
        setCurrentStep('business-groups'); // Go to business groups
      }
    } else if (userType === 'freelancer') {
      if (userAction === 'create') {
        setCurrentStep('freelancer-profile-preview');
      } else {
        setCurrentStep('browse'); // Go to explore community
      }
    } else if (userType === 'social_media_influencer') {
      if (userAction === 'create') {
        setCurrentStep('social-media-profile-preview');
      } else {
        setCurrentStep('browse'); // Go to explore community
      }
    } else if (userType === 'occupation_provider') {
      if (userAction === 'create') {
        setCurrentStep('local-service-profile-preview');
      } else {
        setCurrentStep('browse'); // Go to explore community
      }
    } else {
      setCurrentStep('browse'); // Default to explore community
    }
  };

  const handleBusinessProfileEdit = () => {
    setCurrentStep('business-profile');
  };

  const handleUserTypeSelect = (type: UserType, action: UserAction) => {
    console.log('User type selected:', type, action);
    setUserType(type);
    setUserAction(action);
    
    if (action === 'view') {
      // Set the correct browsing filter for each type
      if (type === 'business') {
        setBrowsingFilter('businesses');
      } else if (type === 'freelancer') {
        setBrowsingFilter('freelancers');
      } else if (type === 'social_media_influencer') {
        setBrowsingFilter('social_media');
      } else if (type === 'occupation_provider') {
        setBrowsingFilter('local_services');
      } else {
        setBrowsingFilter('businesses');
      }
      setCurrentStep('browse');
      return;
    }

    // Join Group flow for each type
    if (action === 'join') {
      if (type === 'business') {
        setCurrentStep('business-niche');
      } else if (type === 'freelancer') {
        setCurrentStep('freelancer-gig');
      } else if (type === 'social_media_influencer') {
        setCurrentStep('groups'); // Go directly to group selection for join
      } else if (type === 'occupation_provider') {
        setCurrentStep('service-selection');
      }
      return;
    }

    // Create Profile flow for each type
    if (action === 'create') {
      if (type === 'business') {
        setCurrentStep('business-profile');
      } else if (type === 'freelancer') {
        setCurrentStep('freelancer-gig');
      } else if (type === 'social_media_influencer') {
        setCurrentStep('social-media-profile');
      } else if (type === 'occupation_provider') {
        setCurrentStep('service-selection');
      }
      return;
    }
  };

  // Enhanced navigation handler
  const handleGlobalNavigation = (path: string) => {
    if (path === '/profile') {
      handleNavigateToProfile();
    } else if (path === '/') {
      setCurrentStep('welcome');
      setShowOpportunityPosting(false);
      setShowOpportunityViewer(false);
    } else if (path === '/groups') {
      setCurrentStep('groups');
      setShowOpportunityPosting(false);
      setShowOpportunityViewer(false);
    } else if (path === '/profiles') {
      setCurrentStep('browse');
      setBrowsingFilter('freelancers');
      setShowOpportunityPosting(false);
      setShowOpportunityViewer(false);
    }
  };

  // Handle opportunity posting
  const handlePostOpportunity = () => {
    setShowOpportunityPosting(true);
    setShowOpportunityViewer(false);
    setCurrentStep('welcome'); // Reset other steps
  };

  // Handle opportunity viewing
  const handleViewOpportunities = () => {
    setShowOpportunityViewer(true);
    setShowOpportunityPosting(false);
    setCurrentStep('welcome'); // Reset other steps
  };

  // Handle back from opportunities
  const handleBackFromOpportunities = () => {
    setShowOpportunityPosting(false);
    setShowOpportunityViewer(false);
    if (currentUser) {
      setCurrentStep('profile');
    } else {
      setCurrentStep('welcome');
    }
  };

  // Show opportunity posting
  if (showOpportunityPosting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-cyan-50 to-emerald-50">
        <OpportunityPosting onBack={handleBackFromOpportunities} />
      </div>
    );
  }

  // Show opportunity viewer
  if (showOpportunityViewer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-cyan-50 to-emerald-50">
        <OpportunityViewer onBack={handleBackFromOpportunities} />
      </div>
    );
  }

  if (currentStep === 'profile' && currentUser) {
    return (
      <UserProfilePage
        currentUser={currentUser}
        joinedGroups={joinedGroups}
        messages={messages}
        onBack={() => setCurrentStep('welcome')}
        onPostOpportunity={handlePostOpportunity}
        onEditProfile={() => {
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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-cyan-50 to-emerald-50">
      {/* Global Navigation - Show when user is logged in */}
      {currentUser && currentStep !== 'welcome' && (
        <GlobalNavigation 
          currentUserType={userType}
          onNavigate={handleGlobalNavigation}
        />
      )}
      
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          {currentStep === 'welcome' && (
            <WelcomeSection 
              onBrowse={() => setCurrentStep('browse')}
              onGetStarted={() => setCurrentStep('user-type')}
              onMyProfile={handleNavigateToProfile}
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
              browsingFilter={browsingFilter as 'businesses' | 'freelancers' | 'groups' | 'social_media' | 'local_services' | null}
              onStepChange={setCurrentStep}
              onUserTypeSelect={handleUserTypeSelect}
              onUserRegistration={handleUserRegistration}
              onGroupJoin={handleGroupJoin}
              onSendMessage={handleSendMessage}
              onPortfolioSave={handlePortfolioSave}
              onBusinessProfileSave={handleBusinessProfileSave}
              onLocationSave={handleLocationSave}
              onBusinessProfileEdit={handleBusinessProfileEdit}
              onViewOpportunities={handleViewOpportunities}
              setProfileData={setProfileData}
              setCurrentUser={setCurrentUser}
              setBrowsingFilter={setBrowsingFilter as React.Dispatch<React.SetStateAction<'businesses' | 'freelancers' | 'groups' | 'social_media' | 'local_services' | null>>}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectPulse;
