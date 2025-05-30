
import React from 'react';
import { User, Building2, Users, Briefcase } from 'lucide-react';

interface BrowserTabsProps {
  activeTab: 'users' | 'businesses' | 'freelancers' | 'groups';
  onTabChange: (tab: 'users' | 'businesses' | 'freelancers' | 'groups') => void;
}

const BrowserTabs: React.FC<BrowserTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex justify-center">
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => onTabChange('users')}
          className={`px-6 py-2 rounded-md transition-colors ${
            activeTab === 'users' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <User className="h-4 w-4 inline mr-2" />
          Service Providers
        </button>
        <button
          onClick={() => onTabChange('businesses')}
          className={`px-6 py-2 rounded-md transition-colors ${
            activeTab === 'businesses' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Building2 className="h-4 w-4 inline mr-2" />
          Businesses
        </button>
        <button
          onClick={() => onTabChange('freelancers')}
          className={`px-6 py-2 rounded-md transition-colors ${
            activeTab === 'freelancers' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Briefcase className="h-4 w-4 inline mr-2" />
          Freelancers
        </button>
        <button
          onClick={() => onTabChange('groups')}
          className={`px-6 py-2 rounded-md transition-colors ${
            activeTab === 'groups' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Users className="h-4 w-4 inline mr-2" />
          Groups
        </button>
      </div>
    </div>
  );
};

export default BrowserTabs;
