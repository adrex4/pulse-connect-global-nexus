
import React from 'react';
import { Button } from '@/components/ui/button';
import { Building2, Briefcase, Users, Camera, Wrench } from 'lucide-react';

interface BrowserTabsProps {
  activeTab: 'businesses' | 'freelancers' | 'groups' | 'social_media' | 'local_services';
  onTabChange: (tab: 'businesses' | 'freelancers' | 'groups' | 'social_media' | 'local_services') => void;
}

const BrowserTabs: React.FC<BrowserTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'businesses' as const, label: 'Businesses', icon: Building2, color: 'blue' },
    { id: 'freelancers' as const, label: 'Freelancers', icon: Briefcase, color: 'green' },
    { id: 'social_media' as const, label: 'Creators', icon: Camera, color: 'pink' },
    { id: 'local_services' as const, label: 'Local Services', icon: Wrench, color: 'orange' },
    { id: 'groups' as const, label: 'Communities', icon: Users, color: 'purple' }
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {tabs.map(({ id, label, icon: Icon, color }) => (
        <Button
          key={id}
          variant={activeTab === id ? "default" : "outline"}
          onClick={() => onTabChange(id)}
          className={`flex items-center gap-2 px-6 py-3 ${
            activeTab === id
              ? `bg-${color}-600 hover:bg-${color}-700 text-white`
              : `border-${color}-200 text-${color}-600 hover:bg-${color}-50`
          }`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Button>
      ))}
    </div>
  );
};

export default BrowserTabs;
