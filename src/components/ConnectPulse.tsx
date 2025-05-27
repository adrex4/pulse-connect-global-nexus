import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, Globe, MapPin, Users, Zap, Shield, 
  TrendingUp, Heart, Star, CheckCircle, Network, Building2, User, ArrowLeft
} from 'lucide-react';

// Enhanced components
import UserTypeSelector from './enhanced/UserTypeSelector';
import EnhancedLocationSelector from './enhanced/EnhancedLocationSelector';
import ServiceSelector from './enhanced/ServiceSelector';
import PublicProfileBrowser from './enhanced/PublicProfileBrowser';

// Existing components
import NicheSelector from './NicheSelector';
import LocationSelector from './LocationSelector';
import GroupChat from './GroupChat';
import GroupList from './GroupList';

export interface User {
  id: string;
  name: string;
  niche: string;
  country: string;
  preferredScope: 'local' | 'regional' | 'global';
}

export interface Group {
  id: string;
  name: string;
  niche: string;
  scope: 'local' | 'regional' | 'global';
  country?: string;
  region?: string;
  memberCount: number;
  description: string;
}

export interface Message {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  groupId: string;
}

type Step = 
  | 'welcome'
  | 'browse'
  | 'user-type'
  | 'business-niche'
  | 'service-selection'
  | 'location'
  | 'groups'
  | 'chat';

const ConnectPulse = () => {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [userType, setUserType] = useState<'business' | 'freelancer' | 'occupation_provider' | null>(null);
  const [userAction, setUserAction] = useState<'join' | 'create' | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [profileData, setProfileData] = useState<any>(null);

  const handleUserRegistration = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      id: Date.now().toString(),
      ...userData
    };
    setCurrentUser(newUser);
    setCurrentStep('groups');
  };

  const handleGroupJoin = (group: Group) => {
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

  const renderWelcome = () => (
    <div className="text-center space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="space-y-6">
        <div className="relative">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
            ConnectPulse
          </h1>
          <div className="absolute -top-2 -right-2">
            <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          The Ultimate Global Business Network - Connecting Entrepreneurs, Businesses & Professionals Across All Industries Worldwide
        </p>
        
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 text-center">
          <div className="bg-blue-50 px-6 py-3 rounded-full">
            <span className="text-2xl font-bold text-blue-600">50K+</span>
            <p className="text-blue-700 text-sm">Active Members</p>
          </div>
          <div className="bg-purple-50 px-6 py-3 rounded-full">
            <span className="text-2xl font-bold text-purple-600">180+</span>
            <p className="text-purple-700 text-sm">Countries</p>
          </div>
          <div className="bg-green-50 px-6 py-3 rounded-full">
            <span className="text-2xl font-bold text-green-600">30+</span>
            <p className="text-green-700 text-sm">Industries</p>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button 
          onClick={() => setCurrentStep('browse')} 
          variant="outline"
          className="px-8 py-3 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
          size="lg"
        >
          🔍 Browse Profiles & Groups
        </Button>
        <Button 
          onClick={() => setCurrentStep('user-type')} 
          className="px-8 py-3 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          size="lg"
        >
          🚀 Join ConnectPulse - Free!
        </Button>
      </div>
      
      {/* Main Welcome Card */}
      <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-center gap-3 text-2xl">
            <Network className="h-8 w-8" />
            Welcome to the Future of Business Networking
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <div className="text-center space-y-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              Join a revolutionary platform that connects businesses across all industries and continents. 
              Whether you're a startup founder, established entrepreneur, or business professional, 
              ConnectPulse helps you find your tribe and grow your network globally.
            </p>
          </div>
          
          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-blue-900 mb-2">Real-Time Group Chats</h3>
              <p className="text-sm text-blue-700">Telegram-style messaging with reactions, replies, and file sharing</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-green-900 mb-2">Smart Location Matching</h3>
              <p className="text-sm text-green-700">Find local, regional, or global connections based on your preferences</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-purple-900 mb-2">All Industries Welcome</h3>
              <p className="text-sm text-purple-700">From tech startups to traditional businesses - every niche has a home</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-yellow-900 mb-2">Instant Connections</h3>
              <p className="text-sm text-yellow-700">Get matched with relevant business communities instantly</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-red-900 mb-2">Verified Members</h3>
              <p className="text-sm text-red-700">Connect with confidence in our verified business community</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-indigo-900 mb-2">Growth Opportunities</h3>
              <p className="text-sm text-indigo-700">Discover partnerships, clients, and collaboration opportunities</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <Button 
                onClick={() => setCurrentStep('user-type')} 
                className="px-12 py-4 text-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                size="lg"
              >
                🚀 Start Connecting Now - It's Free!
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Join thousands of businesses already growing their network with ConnectPulse
            </p>
            
            {/* Trust Indicators */}
            <div className="flex justify-center items-center gap-4 pt-4">
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Free to Join</span>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">No Spam</span>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Verified Community</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {currentStep === 'welcome' && renderWelcome()}
        
        {currentStep === 'browse' && (
          <PublicProfileBrowser onGetStarted={() => setCurrentStep('user-type')} />
        )}
        
        {currentStep === 'user-type' && (
          <UserTypeSelector 
            onNext={(type, action) => {
              setUserType(type);
              setUserAction(action);
              if (action === 'join') {
                if (type === 'business') {
                  setCurrentStep('business-niche');
                } else {
                  setCurrentStep('service-selection');
                }
              } else {
                setCurrentStep('service-selection');
              }
            }}
            onBack={() => setCurrentStep('welcome')}
          />
        )}
        
        {currentStep === 'business-niche' && userType === 'business' && (
          <NicheSelector 
            onNext={(name, niche) => {
              setCurrentUser(prev => prev ? { ...prev, name, niche } : { id: '', name, niche, country: '', preferredScope: 'local' });
              setCurrentStep('location');
            }}
            onBack={() => setCurrentStep('user-type')}
          />
        )}

        {currentStep === 'service-selection' && userType && userType !== 'business' && (
          <ServiceSelector 
            userType={userType}
            onNext={(serviceData) => {
              setProfileData(serviceData);
              setCurrentStep('location');
            }}
            onBack={() => setCurrentStep('user-type')}
          />
        )}
        
        {currentStep === 'location' && (
          <EnhancedLocationSelector
            onNext={(locationData) => {
              // Handle completion based on user action
              if (userAction === 'join') {
                setCurrentStep('groups');
              } else {
                // Create profile and redirect to appropriate next step
                console.log('Profile data:', { profileData, locationData });
                setCurrentStep('groups');
              }
            }}
            onBack={() => {
              if (userType === 'business') {
                setCurrentStep('business-niche');
              } else {
                setCurrentStep('service-selection');
              }
            }}
            showDetailedAddress={userType === 'occupation_provider'}
          />
        )}
        
        {currentStep === 'groups' && currentUser && (
          <GroupList
            user={currentUser}
            onJoinGroup={handleGroupJoin}
            onBack={() => setCurrentStep('location')}
          />
        )}
        
        {currentStep === 'chat' && currentUser && selectedGroup && (
          <GroupChat
            user={currentUser}
            group={selectedGroup}
            messages={messages.filter(m => m.groupId === selectedGroup.id)}
            onSendMessage={handleSendMessage}
            onBack={() => setCurrentStep('groups')}
          />
        )}
      </div>
    </div>
  );
};

export default ConnectPulse;
