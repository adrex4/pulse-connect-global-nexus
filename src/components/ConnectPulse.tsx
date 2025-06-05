import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GroupList from './GroupList';
import BusinessGroupList from './enhanced/BusinessGroupList';
import { ArrowLeft, Users, Plus, MessageSquare } from 'lucide-react';
import { Step, UserType, UserAction, User, Group, Message } from '@/types/connectPulse';
import UserTypeSelector from './UserTypeSelector';
import BusinessProfileCreator from './BusinessProfileCreator';
import FreelancerGigCreator from './FreelancerGigCreator';
import EnhancedLocationSelector from './enhanced/EnhancedLocationSelector';
import ServiceSelector from './enhanced/ServiceSelector';
import PortfolioUploader from './enhanced/PortfolioUploader';
import SocialMediaProfileCreator from './enhanced/SocialMediaProfileCreator';
import BusinessNicheSelector from './BusinessNicheSelector';
import FreelancerGroups from './FreelancerGroups';
import BusinessGroups from './BusinessGroups';
import FreelancerLocation from './FreelancerLocation';
import SocialMediaGroupList from './enhanced/SocialMediaGroupList';
import LocalServiceGroupList from './enhanced/LocalServiceGroupList';
import GroupChat from './GroupChat';
import BusinessProfilePreview from './BusinessProfilePreview';
import FreelancerProfilePreview from './FreelancerProfilePreview';
import SocialMediaProfilePreview from './SocialMediaProfilePreview';
import LocalServiceProfilePreview from './LocalServiceProfilePreview';
import SharedStepManager from './enhanced/managers/SharedStepManager';
import ProfilePictureUploader from './enhanced/ProfilePictureUploader';
import UserDashboard from './enhanced/UserDashboard';
import ColorfulSelectionIndicator from './enhanced/ColorfulSelectionIndicator';

interface ConnectPulseProps {
  // No props needed for now
}

const ConnectPulse: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [userType, setUserType] = useState<UserType | null>(null);
  const [userAction, setUserAction] = useState<UserAction | null>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [locationData, setLocationData] = useState<any>(null);
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [joinedGroups, setJoinedGroups] = useState<Group[]>([]);

  const handleStepChange = (step: Step) => {
    console.log('Navigating to step:', step);
    setCurrentStep(step);
  };

  const handleUserTypeSelect = (type: UserType) => {
    console.log('User type selected:', type);
    setUserType(type);
    setCurrentStep('business-profile');
  };

  const handleProfileDataSave = (data: any) => {
    console.log('Profile data saved:', data);
    setProfileData(data);
    setCurrentStep('location');
  };

  const handleLocationSave = (data: any) => {
    console.log('Location data saved:', data);
    setLocationData(data);
    setCurrentStep('groups');
  };

  const handlePortfolioSave = (items: any[]) => {
    console.log('Portfolio items saved:', items);
    setPortfolioItems(items);
    setCurrentStep('location');
  };

  const handleGroupJoin = (group: Group) => {
    console.log('Joining group:', group);
    setSelectedGroup(group);
    setJoinedGroups(prev => [...prev, group]);
    setCurrentStep('chat');
  };

  const handleSendMessage = (content: string) => {
    if (!selectedGroup) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      userId: 'temp-user',
      userName: 'Current User',
      content: content,
      timestamp: new Date(),
      groupId: selectedGroup.id
    };

    setMessages(prev => [...prev, newMessage]);
  };

  const handleGoBack = () => {
    if (currentStep === 'browse') {
      setCurrentStep('welcome');
    } else if (currentStep === 'user-type') {
      setCurrentStep('welcome');
    } else if (currentStep === 'business-profile') {
      setCurrentStep('user-type');
    } else if (currentStep === 'business-niche') {
      setCurrentStep('business-profile');
    } else if (currentStep === 'freelancer-gig') {
      setCurrentStep('user-type');
    } else if (currentStep === 'freelancer-groups') {
      setCurrentStep('freelancer-gig');
    } else if (currentStep === 'freelancer-location') {
      setCurrentStep('freelancer-groups');
    } else if (currentStep === 'business-groups') {
      setCurrentStep('location');
    } else if (currentStep === 'groups') {
      setCurrentStep('location');
    } else if (currentStep === 'portfolio') {
      setCurrentStep('service-selection');
    } else if (currentStep === 'location') {
       if (userType === 'business') {
        setCurrentStep('business-profile');
      } else if (userType === 'freelancer') {
        setCurrentStep('freelancer-gig');
      } else {
        setCurrentStep('service-selection');
      }
    } else if (currentStep === 'chat') {
      setCurrentStep('groups');
    } else if (currentStep === 'business-profile-preview') {
      setCurrentStep('business-groups');
    } else if (currentStep === 'freelancer-profile-preview') {
      setCurrentStep('freelancer-location');
    }
  };

  const handleUserRegistration = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      id: Date.now().toString(),
      ...userData
    };
    setCurrentUser(newUser);
    console.log('User registered:', newUser);
  };

  const renderWelcomeSection = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-2xl border-0 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 text-white text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
              <Users className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2 animate-fade-in">Welcome to ConnectPulse</h1>
            <p className="text-xl text-blue-100 animate-fade-in">
              Connect, Collaborate, and Grow with Like-minded Professionals
            </p>
          </div>
        </div>
        
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                icon: Users,
                title: "Browse Communities",
                description: "Explore existing groups and connect with professionals in your field",
                action: () => { setUserAction('view'); setCurrentStep('browse'); },
                color: "blue"
              },
              {
                icon: Plus,
                title: "Create Your Business",
                description: "Start your journey by creating a professional profile and community",
                action: () => { setUserAction('create'); setCurrentStep('user-type'); },
                color: "purple"
              },
              {
                icon: MessageSquare,
                title: "Join Existing Groups",
                description: "Find and join communities that match your interests and goals",
                action: () => { setUserAction('join'); setCurrentStep('user-type'); },
                color: "pink"
              }
            ].map((option, index) => {
              const Icon = option.icon;
              return (
                <ColorfulSelectionIndicator key={index} selectionColor={option.color}>
                  <Card 
                    className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 hover:border-blue-300 bg-gradient-to-br from-white to-gray-50"
                    onClick={option.action}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 bg-gradient-to-r from-${option.color}-500 to-${option.color}-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-float`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-800">{option.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{option.description}</p>
                    </CardContent>
                  </Card>
                </ColorfulSelectionIndicator>
              );
            })}
          </div>

          {/* Quick Access to Dashboard */}
          {currentUser && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 text-center">Quick Access</h3>
              <div className="flex justify-center">
                <ColorfulSelectionIndicator selectionColor="green">
                  <Button 
                    onClick={() => setCurrentStep('dashboard')}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg"
                    size="lg"
                  >
                    <User className="h-5 w-5 mr-2" />
                    Go to Dashboard
                  </Button>
                </ColorfulSelectionIndicator>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  // Add dashboard step rendering
  if (currentStep === 'dashboard' && currentUser) {
    return (
      <UserDashboard 
        user={currentUser}
        joinedGroups={joinedGroups}
        onUpdateUser={setCurrentUser}
      />
    );
  }

  if (currentStep === 'welcome') {
    return renderWelcomeSection();
  }

  if (currentStep === 'browse') {
    return (
      <div className="max-w-4xl mx-auto mt-12 animate-fade-in">
        <h2 className="text-3xl font-semibold text-center mb-8">Explore ConnectPulse</h2>
        <p className="text-gray-600 text-center mb-4">
          Discover communities, resources, and opportunities tailored to your professional journey.
        </p>
        <div className="flex justify-center">
          <Button onClick={handleGoBack} variant="outline" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Welcome
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-2 hover:border-blue-300">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Find a Group</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse existing groups and communities based on your industry, interests, or location.
              </p>
              <Button className="mt-4">Explore Groups</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-2 hover:border-blue-300">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Access Resources</h3>
              <p className="text-gray-600 leading-relaxed">
                Find helpful resources, tools, and guides to help you grow your business or career.
              </p>
              <Button className="mt-4">View Resources</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-2 hover:border-blue-300">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Attend Events</h3>
              <p className="text-gray-600 leading-relaxed">
                Discover upcoming events, webinars, and workshops to expand your knowledge and network.
              </p>
              <Button className="mt-4">See Events</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-2 hover:border-blue-300">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Read Articles</h3>
              <p className="text-gray-600 leading-relaxed">
                Stay up-to-date with the latest industry news, trends, and insights from our blog.
              </p>
              <Button className="mt-4">Read Articles</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (currentStep === 'user-type') {
    return (
      <UserTypeSelector 
        onUserTypeSelect={handleUserTypeSelect} 
        onBack={handleGoBack}
      />
    );
  }

  if (currentStep === 'business-profile' && userType === 'business') {
    return (
      <div className="max-w-3xl mx-auto mt-12 animate-fade-in">
        <BusinessProfileCreator 
          onSave={handleProfileDataSave} 
          onBack={handleGoBack}
        />
      </div>
    );
  }

  if (currentStep === 'business-niche' && userType === 'business') {
    return (
      <div className="max-w-md mx-auto mt-12 animate-fade-in">
        <BusinessNicheSelector
          onNicheSelect={(niche) => {
            setProfileData({ ...profileData, niche });
            setCurrentStep('location');
          }}
          onBack={handleGoBack}
        />
      </div>
    );
  }

  if (currentStep === 'freelancer-gig' && userType === 'freelancer') {
    return (
      <div className="max-w-3xl mx-auto mt-12 animate-fade-in">
        <FreelancerGigCreator 
          onSave={handleProfileDataSave}
          onBack={handleGoBack}
        />
      </div>
    );
  }

  if (currentStep === 'freelancer-groups' && userType === 'freelancer') {
    return (
      <div className="max-w-4xl mx-auto mt-12 animate-fade-in">
        <FreelancerGroups
          onGroupSelect={(group) => {
            setProfileData({ ...profileData, group });
            setCurrentStep('freelancer-location');
          }}
          onBack={handleGoBack}
        />
      </div>
    );
  }

  if (currentStep === 'freelancer-location' && userType === 'freelancer') {
    return (
      <div className="max-w-md mx-auto mt-12 animate-fade-in">
        <FreelancerLocation
          onLocationSelect={(location) => {
            setProfileData({ ...profileData, location });
            setCurrentStep('portfolio');
          }}
          onBack={handleGoBack}
        />
      </div>
    );
  }

  const sharedStepManagerProps = {
    currentStep,
    userType,
    userAction,
    currentUser,
    selectedGroup,
    messages,
    portfolioItems,
    onStepChange: handleStepChange,
    onUserRegistration: handleUserRegistration,
    onGroupJoin: handleGroupJoin,
    onSendMessage: handleSendMessage,
    onPortfolioSave: setPortfolioSave,
    onLocationSave: handleLocationSave,
    setProfileData: setProfileData
  };

  return <SharedStepManager {...sharedStepManagerProps} />;
};

export default ConnectPulse;
