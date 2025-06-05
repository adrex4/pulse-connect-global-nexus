
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, MessageSquare, Settings, Search, Filter,
  Globe, MapPin, Crown, Star, MoreVertical, Bell
} from 'lucide-react';
import { User, Group } from '@/types/connectPulse';

interface JoinedGroupsListProps {
  groups: Group[];
  currentUser: User;
}

const JoinedGroupsList: React.FC<JoinedGroupsListProps> = ({ groups, currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || group.scope === filter;
    return matchesSearch && matchesFilter;
  });

  const getScopeIcon = (scope: string) => {
    switch (scope) {
      case 'global': return Globe;
      case 'local': return MapPin;
      case 'regional': return MapPin;
      default: return Globe;
    }
  };

  const getScopeColor = (scope: string) => {
    switch (scope) {
      case 'global': return 'text-blue-600 bg-blue-100';
      case 'local': return 'text-green-600 bg-green-100';
      case 'regional': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search your groups..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'global' ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter('global')}
              >
                Global
              </Button>
              <Button
                variant={filter === 'local' ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter('local')}
              >
                Local
              </Button>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            You're a member of {groups.length} groups
          </div>
        </CardContent>
      </Card>

      {/* Groups Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => {
          const ScopeIcon = getScopeIcon(group.scope);
          return (
            <Card key={group.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {group.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg leading-tight">{group.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={getScopeColor(group.scope)}>
                          <ScopeIcon className="h-3 w-3 mr-1" />
                          {group.scope}
                        </Badge>
                        {group.verified && (
                          <Badge variant="secondary" className="text-blue-600 bg-blue-100">
                            <Star className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {group.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {group.memberCount.toLocaleString()} members
                  </div>
                  {group.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {group.location}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Chat
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredGroups.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="font-medium text-gray-900 mb-2">No groups found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search terms.' : 'Join some groups to get started!'}
            </p>
            <Button>
              <Users className="h-4 w-4 mr-2" />
              Discover Groups
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JoinedGroupsList;
