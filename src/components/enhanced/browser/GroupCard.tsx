
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MapPin } from 'lucide-react';
import { Group } from '@/types/publicBrowser';

interface GroupCardProps {
  group: Group;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const getLocationString = (location: any) => {
    if (!location) return 'Location not specified';
    return location.name || 'Location not specified';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-lg">{group.name}</h3>
              <p className="text-blue-600 font-medium">{group.category}</p>
            </div>
            <Badge variant="outline">{group.scope}</Badge>
          </div>
          
          {group.description && (
            <p className="text-gray-600 text-sm line-clamp-2">{group.description}</p>
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {group.member_count} members
            </div>
            
            {group.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {getLocationString(group.location)}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupCard;
