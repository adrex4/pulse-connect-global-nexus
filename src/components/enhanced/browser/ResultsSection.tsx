
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { Profile, Group } from '@/types/publicBrowser';
import ProfileCard from './ProfileCard';
import GroupCard from './GroupCard';

interface ResultsSectionProps {
  activeTab: 'users' | 'businesses' | 'groups';
  loading: boolean;
  profiles: Profile[];
  groups: Group[];
  onResetFilters: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  activeTab,
  loading,
  profiles,
  groups,
  onResetFilters
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-32 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const hasResults = activeTab === 'groups' ? groups.length > 0 : profiles.length > 0;
  const resultCount = activeTab === 'groups' ? groups.length : profiles.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {resultCount} results found
        </p>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>
      
      {hasResults ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'groups' 
            ? groups.map(group => <GroupCard key={group.id} group={group} />)
            : profiles.map(profile => <ProfileCard key={profile.id} profile={profile} />)
          }
        </div>
      ) : (
        <div className="text-center p-10 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-600 mb-4">No results found matching your criteria.</p>
          <Button variant="outline" onClick={onResetFilters}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResultsSection;
