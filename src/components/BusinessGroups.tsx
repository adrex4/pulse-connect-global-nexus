
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building2 } from 'lucide-react';
import { Group } from '@/types/connectPulse';

interface BusinessGroupsProps {
  onGroupSelect: (group: Group) => void;
  onBack: () => void;
}

const BUSINESS_GROUPS: Group[] = [
  {
    id: '1',
    name: 'Tech Entrepreneurs',
    description: 'Network of technology business owners and entrepreneurs',
    niche: 'Technology',
    memberCount: 2100,
    scope: 'global',
    isPublic: true
  },
  {
    id: '2',
    name: 'Small Business Owners',
    description: 'Community for small business owners to share experiences',
    niche: 'General Business',
    memberCount: 1850,
    scope: 'regional',
    isPublic: true
  },
  {
    id: '3',
    name: 'Healthcare Business Network',
    description: 'Healthcare professionals and business owners connecting',
    niche: 'Healthcare',
    memberCount: 950,
    scope: 'global',
    isPublic: true
  }
];

const BusinessGroups: React.FC<BusinessGroupsProps> = ({ onGroupSelect, onBack }) => {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const handleNext = () => {
    if (selectedGroup) {
      onGroupSelect(selectedGroup);
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <Building2 className="h-6 w-6" />
            <CardTitle className="text-xl">Choose Your Business Groups</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-4">
          {BUSINESS_GROUPS.map((group) => (
            <Card
              key={group.id}
              className={`cursor-pointer transition-all ${
                selectedGroup?.id === group.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedGroup(group)}
            >
              <CardContent className="p-4">
                <h3 className="font-semibold">{group.name}</h3>
                <p className="text-sm text-gray-600">{group.description}</p>
                <p className="text-xs text-gray-500 mt-2">{group.memberCount} members</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button
          onClick={handleNext}
          disabled={!selectedGroup}
          className="w-full mt-6 h-12 text-lg"
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );
};

export default BusinessGroups;
