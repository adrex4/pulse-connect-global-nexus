
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, Users, TrendingUp, Trophy, Star
} from 'lucide-react';
import { User as UserType, Group, Message } from '@/types/connectPulse';
import DirectMessaging from './enhanced/DirectMessaging';
import ProfileNavigation from './profile/ProfileNavigation';
import ProfileHeader from './profile/ProfileHeader';
import ProfileQuickActions from './profile/ProfileQuickActions';
import ProfileTabContent from './profile/ProfileTabContent';

interface UserProfilePageProps {
  currentUser: UserType;
  joinedGroups: Group[];
  messages: Message[];
  onBack: () => void;
  onEditProfile: () => void;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({
  currentUser,
  joinedGroups,
  messages,
  onBack,
  onEditProfile
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showDirectMessaging, setShowDirectMessaging] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [connectionRequests, setConnectionRequests] = useState(5);
  const [isProfileShared, setIsProfileShared] = useState(false);

  // Calculate enhanced user statistics
  const userStats = {
    groupsJoined: joinedGroups.length,
    messagesPosted: messages.filter(m => m.userId === currentUser.id).length,
    accountAge: Math.floor((Date.now() - new Date('2024-01-01').getTime()) / (1000 * 60 * 60 * 24)),
    activeToday: true,
    reputation: 850,
    achievements: 12,
    connections: 127,
    profileViews: 245,
    endorsements: 18,
    skillsRated: 8
  };

  // Enhanced functionality handlers
  const handleDirectMessaging = () => {
    console.log('Opening direct messaging system');
    setShowDirectMessaging(true);
  };

  const handleConnectionRequests = () => {
    console.log('Managing connection requests');
    setConnectionRequests(0);
  };

  const handleNotifications = () => {
    console.log('Opening notification center');
    setNotifications(0);
  };

  const handleSkillsEndorsements = () => {
    console.log('Managing skills and endorsements');
  };

  const handlePrivacySettings = () => {
    console.log('Opening privacy settings');
  };

  const handleActivityAnalytics = () => {
    console.log('Viewing activity analytics');
  };

  const handlePortfolioManagement = () => {
    console.log('Managing professional portfolio');
  };

  const handleShareProfile = () => {
    navigator.clipboard.writeText(`${window.location.origin}/profile/${currentUser.id}`);
    setIsProfileShared(true);
    setTimeout(() => setIsProfileShared(false), 2000);
  };

  const handleDownloadProfile = () => {
    console.log('Downloading profile data');
  };

  const handleUploadAvatar = () => {
    console.log('Uploading new avatar');
  };

  if (showDirectMessaging) {
    return (
      <DirectMessaging
        currentUser={currentUser}
        onBack={() => setShowDirectMessaging(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Enhanced Header with Better Navigation */}
        <ProfileNavigation
          onBack={onBack}
          onEditProfile={onEditProfile}
          handleNotifications={handleNotifications}
          handleDirectMessaging={handleDirectMessaging}
          notifications={notifications}
        />

        {/* Enhanced Profile Header */}
        <ProfileHeader
          currentUser={currentUser}
          userStats={userStats}
          connectionRequests={connectionRequests}
          isProfileShared={isProfileShared}
          handleConnectionRequests={handleConnectionRequests}
          handleShareProfile={handleShareProfile}
          handleDownloadProfile={handleDownloadProfile}
          handleUploadAvatar={handleUploadAvatar}
        />

        {/* Enhanced Quick Actions */}
        <ProfileQuickActions
          handleDirectMessaging={handleDirectMessaging}
          handleSkillsEndorsements={handleSkillsEndorsements}
          handleActivityAnalytics={handleActivityAnalytics}
          handlePortfolioManagement={handlePortfolioManagement}
        />

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-lg border-0 p-2 rounded-xl">
            <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
              <Activity className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="groups" className="gap-2 data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
              <Users className="h-4 w-4" />
              My Groups
            </TabsTrigger>
            <TabsTrigger value="activity" className="gap-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
              <TrendingUp className="h-4 w-4" />
              Activity Feed
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2 data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-700">
              <Trophy className="h-4 w-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="stats" className="gap-2 data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700">
              <Star className="h-4 w-4" />
              Statistics
            </TabsTrigger>
          </TabsList>

          <ProfileTabContent
            currentUser={currentUser}
            joinedGroups={joinedGroups}
            messages={messages}
            userStats={userStats}
          />
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfilePage;
