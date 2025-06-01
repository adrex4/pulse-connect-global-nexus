
import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, Building2, Briefcase, MessageSquare, Camera } from 'lucide-react';

interface BrowserTabsProps {
  activeTab: 'users' | 'businesses' | 'freelancers' | 'groups' | 'social_media';
  onTabChange: (tab: 'users' | 'businesses' | 'freelancers' | 'groups' | 'social_media') => void;
}

const BrowserTabs: React.FC<BrowserTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'users' as const, label: 'Professionals', icon: Users },
    { id: 'businesses' as const, label: 'Businesses', icon: Building2 },
    { id: 'freelancers' as const, label: 'Freelancers', icon: Briefcase },
    { id: 'social_media' as const, label: 'Social Media', icon: Camera },
    { id: 'groups' as const, label: 'Groups', icon: MessageSquare },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "default" : "outline"}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-2 ${
            activeTab === tab.id
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          <tab.icon className="h-4 w-4" />
          {tab.label}
        </Button>
      ))}
    </div>
  );
};

export default BrowserTabs;
