
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Users, MessageSquare, Instagram, Wrench } from 'lucide-react';

interface BrowserTabsProps {
  activeTab: 'businesses' | 'freelancers' | 'groups' | 'social_media' | 'local_services';
  onTabChange: (tab: 'businesses' | 'freelancers' | 'groups' | 'social_media' | 'local_services') => void;
}

const BrowserTabs: React.FC<BrowserTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-5 bg-gradient-to-r from-blue-50 to-purple-50 p-1 rounded-lg border-2 border-blue-200">
        <TabsTrigger 
          value="businesses" 
          className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md transition-all duration-200"
        >
          <Building2 className="h-4 w-4" />
          <span className="hidden sm:inline">Businesses</span>
        </TabsTrigger>
        <TabsTrigger 
          value="freelancers"
          className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-md transition-all duration-200"
        >
          <Users className="h-4 w-4" />
          <span className="hidden sm:inline">Freelancers</span>
        </TabsTrigger>
        <TabsTrigger 
          value="social_media"
          className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-pink-700 data-[state=active]:shadow-md transition-all duration-200"
        >
          <Instagram className="h-4 w-4" />
          <span className="hidden sm:inline">Creators</span>
        </TabsTrigger>
        <TabsTrigger 
          value="local_services"
          className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-md transition-all duration-200"
        >
          <Wrench className="h-4 w-4" />
          <span className="hidden sm:inline">Services</span>
        </TabsTrigger>
        <TabsTrigger 
          value="groups"
          className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-md transition-all duration-200"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">Groups</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default BrowserTabs;
