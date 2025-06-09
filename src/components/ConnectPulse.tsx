import React, { useState } from 'react';
import { Step, UserType, UserAction, User, Group, Message } from '@/types/connectPulse';
import WelcomeSection from './enhanced/WelcomeSection';
import StepManager from './enhanced/StepManager';
import UserProfilePage from './UserProfilePage';
import GlobalNavigation from './GlobalNavigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Palette, Building } from 'lucide-react';

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
  const [browsingFilter, setBrowsingFilter] = useState<'businesses' | 'freelancers' | 'groups' | 'social_media' | null>(null);
  const [joinedGroups, setJoinedGroups] = useState<Group[]>([]);

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

  // Handle navigation to profile page - Create demo user if none exists
  const handleNavigateToProfile = () => {
    console.log('Navigating to profile page', { currentUser });
    
    if (!currentUser) {
      // Create a demo user for profile viewing
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
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-cyan-50 to-emerald-50">
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

      {/* Enhanced Communities Section with Different Colors */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Explore ConnectPulse Communities
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join vibrant communities where professionals, creators, and businesses connect and collaborate
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Professional Networks */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100">
            <CardHeader className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Professional Networks
                  </CardTitle>
                  <p className="text-sm text-gray-600">Industry-specific groups</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-emerald-100">
                  <div>
                    <h4 className="font-medium text-emerald-700">Tech Innovators</h4>
                    <p className="text-sm text-gray-600">15.2k members</p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                    Join
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-emerald-100">
                  <div>
                    <h4 className="font-medium text-emerald-700">Digital Marketing</h4>
                    <p className="text-sm text-gray-600">8.7k members</p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                    Join
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-emerald-100">
                  <div>
                    <h4 className="font-medium text-emerald-700">Finance Experts</h4>
                    <p className="text-sm text-gray-600">12.1k members</p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                    Join
                  </Badge>
                </div>
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                <Users className="mr-2 h-4 w-4" />
                Explore All Networks
              </Button>
            </CardContent>
          </Card>

          {/* Creative Communities */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100">
            <CardHeader className="bg-gradient-to-r from-orange-500/10 to-amber-500/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg">
                  <Palette className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    Creative Communities
                  </CardTitle>
                  <p className="text-sm text-gray-600">Artists and designers unite</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-orange-100">
                  <div>
                    <h4 className="font-medium text-orange-700">UI/UX Designers</h4>
                    <p className="text-sm text-gray-600">22.5k members</p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                    Join
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-orange-100">
                  <div>
                    <h4 className="font-medium text-orange-700">Content Creators</h4>
                    <p className="text-sm text-gray-600">18.3k members</p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                    Join
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-orange-100">
                  <div>
                    <h4 className="font-medium text-orange-700">Photography</h4>
                    <p className="text-sm text-gray-600">16.8k members</p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                    Join
                  </Badge>
                </div>
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                <Palette className="mr-2 h-4 w-4" />
                Join Creative Hub
              </Button>
            </CardContent>
          </Card>

          {/* Business Networks */}
          <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100">
            <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-blue-500/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg">
                  <Building className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                    Business Networks
                  </CardTitle>
                  <p className="text-sm text-gray-600">Entrepreneurs and leaders</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-indigo-100">
                  <div>
                    <h4 className="font-medium text-indigo-700">Startup Founders</h4>
                    <p className="text-sm text-gray-600">9.4k members</p>
                  </div>
                  <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                    Join
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-indigo-100">
                  <div>
                    <h4 className="font-medium text-indigo-700">Business Strategy</h4>
                    <p className="text-sm text-gray-600">11.2k members</p>
                  </div>
                  <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                    Join
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-indigo-100">
                  <div>
                    <h4 className="font-medium text-indigo-700">Investment Club</h4>
                    <p className="text-sm text-gray-600">7.8k members</p>
                  </div>
                  <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                    Join
                  </Badge>
                </div>
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600">
                <Building className="mr-2 h-4 w-4" />
                Explore Business Hub
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ConnectPulse;
