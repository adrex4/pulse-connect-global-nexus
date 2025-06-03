
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Camera, Search } from 'lucide-react';
import { User, Group, UserType, UserAction } from '@/types/connectPulse';
import { generateSocialMediaGroups } from '@/data/socialMediaGroups';
import SocialMediaGroupFilters from './SocialMediaGroupFilters';
import SocialMediaGroupCard from './SocialMediaGroupCard';
import SocialMediaWelcomeBanner from './SocialMediaWelcomeBanner';

interface SocialMediaGroupListProps {
  user: User;
  userType: UserType;
  userAction: UserAction;
  onJoinGroup: (group: Group) => void;
  onBack: () => void;
}

const SocialMediaGroupList: React.FC<SocialMediaGroupListProps> = ({ 
  user, 
  userType, 
  userAction, 
  onJoinGroup, 
  onBack 
}) => {
  const [groups] = useState(generateSocialMediaGroups(user));
  const [searchTerm, setSearchTerm] = useState('');
  const [nicheFilter, setNicheFilter] = useState('all');
  const [scopeFilter, setScopeFilter] = useState('all');

  const niches = ['all', ...Array.from(new Set(groups.map(g => g.niche)))];
  const scopes = ['all', 'local', 'regional', 'global'];

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.niche.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesNiche = nicheFilter === 'all' || group.niche === nicheFilter;
    const matchesScope = scopeFilter === 'all' || group.scope === scopeFilter;
    
    return matchesSearch && matchesNiche && matchesScope;
  });

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-pink-600 to-purple-600 text-white">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <Camera className="h-6 w-6" />
                Social Media Creator Communities
              </CardTitle>
              <p className="text-pink-100 mt-1">Connect with fellow creators and grow your influence</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <SocialMediaWelcomeBanner />

          <SocialMediaGroupFilters
            searchTerm={searchTerm}
            nicheFilter={nicheFilter}
            scopeFilter={scopeFilter}
            niches={niches}
            scopes={scopes}
            onSearchChange={setSearchTerm}
            onNicheChange={setNicheFilter}
            onScopeChange={setScopeFilter}
          />

          <div className="grid gap-6">
            {filteredGroups.map((group) => (
              <SocialMediaGroupCard
                key={group.id}
                group={group}
                onJoinGroup={onJoinGroup}
              />
            ))}
          </div>

          {filteredGroups.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No communities found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters to find the perfect community.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaGroupList;
