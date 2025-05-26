
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Globe, MapPin, Users } from 'lucide-react';
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

const ConnectPulse = () => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'niche' | 'location' | 'groups' | 'chat'>('welcome');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

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
    <div className="text-center space-y-6">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-blue-600">ConnectPulse</h1>
        <p className="text-xl text-gray-600">
          Connecting Businesses Across All Niches, Worldwide
        </p>
      </div>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            Welcome to ConnectPulse
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            Join a global community of businesses across all industries. Connect with like-minded 
            entrepreneurs in your niche, whether locally, regionally, or globally.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold">Group Chats</h3>
              <p className="text-sm text-gray-600">Real-time communication</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold">Location-Based</h3>
              <p className="text-sm text-gray-600">Local to global reach</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Globe className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <h3 className="font-semibold">All Niches</h3>
              <p className="text-sm text-gray-600">Every business type</p>
            </div>
          </div>
          
          <Button 
            onClick={() => setCurrentStep('niche')} 
            className="w-full"
            size="lg"
          >
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {currentStep === 'welcome' && renderWelcome()}
        
        {currentStep === 'niche' && (
          <NicheSelector 
            onNext={(name, niche) => {
              setCurrentUser(prev => prev ? { ...prev, name, niche } : { id: '', name, niche, country: '', preferredScope: 'local' });
              setCurrentStep('location');
            }}
            onBack={() => setCurrentStep('welcome')}
          />
        )}
        
        {currentStep === 'location' && currentUser && (
          <LocationSelector
            user={currentUser}
            onComplete={handleUserRegistration}
            onBack={() => setCurrentStep('niche')}
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
