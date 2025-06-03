
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Globe, MapPin, Heart, TrendingUp } from 'lucide-react';
import { Group } from '@/types/connectPulse';

interface SocialMediaGroupCardProps {
  group: Group;
  onJoinGroup: (group: Group) => void;
}

const SocialMediaGroupCard: React.FC<SocialMediaGroupCardProps> = ({ group, onJoinGroup }) => {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 hover:border-pink-300">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <h3 className="text-xl font-semibold text-gray-800">{group.name}</h3>
            <Badge className={`${
              group.scope === 'local' ? 'bg-green-500' : 
              group.scope === 'regional' ? 'bg-blue-500' : 'bg-purple-500'
            } text-white flex items-center gap-1`}>
              {group.scope === 'local' ? <MapPin className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
              {group.scope === 'local' ? 'Local' : 
               group.scope === 'regional' ? 'Regional' : 'Global'}
            </Badge>
          </div>
          
          <p className="text-gray-600 mb-4 leading-relaxed">{group.description}</p>
          
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4 text-pink-500" />
              <strong className="text-pink-600">{group.memberCount.toLocaleString()}</strong> creators
            </span>
            <span className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-red-600">Active community</span>
            </span>
            <span className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-green-600">Growing fast</span>
            </span>
          </div>
          
          <Button 
            onClick={() => onJoinGroup(group)}
            className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 transition-all duration-300"
            size="lg"
          >
            Join Community
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMediaGroupCard;
