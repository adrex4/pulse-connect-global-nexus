
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users } from 'lucide-react';
import { Group } from '@/types/connectPulse';

interface FreelancerGroupsProps {
  onGroupSelect: (group: Group) => void;
  onBack: () => void;
}

const FREELANCER_GROUPS: Group[] = [
  {
    id: '1',
    name: 'Web Developers United',
    description: 'Community for web developers to share knowledge and find opportunities',
    niche: 'Web Development',
    memberCount: 1250,
    scope: 'global',
    isPublic: true
  },
  {
    id: '2',
    name: 'Graphic Design Hub',
    description: 'Creative designers sharing tips and collaborating on projects',
    niche: 'Graphic Design',
    memberCount: 890,
    scope: 'global',
    isPublic: true
  },
  {
    id: '3',
    name: 'Content Writers Network',
    description: 'Professional writers connecting and sharing opportunities',
    niche: 'Content Writing',
    memberCount: 560,
    scope: 'global',
    isPublic: true
  }
];

const FreelancerGroups: React.FC<FreelancerGroupsProps> = ({ onGroupSelect, onBack }) => {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const handleNext = () => {
    if (selectedGroup) {
      onGroupSelect(selectedGroup);
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6" />
            <CardTitle className="text-xl">Choose Your Freelancer Groups</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-4">
          {FREELANCER_GROUPS.map((group) => (
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

export default FreelancerGroups;
