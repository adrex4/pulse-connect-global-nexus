
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Briefcase } from 'lucide-react';
import { UserType } from '@/types/connectPulse';

interface FreelancerGigHeaderProps {
  userType: UserType;
  onBack: () => void;
}

const FreelancerGigHeader: React.FC<FreelancerGigHeaderProps> = ({ userType, onBack }) => {
  const getUserTypeTitle = () => {
    switch (userType) {
      case 'freelancer':
        return 'Tell Us About Your Skills';
      case 'occupation_provider':
        return 'Tell Us About Your Services';
      case 'social_media_influencer':
        return 'Tell Us About Your Content';
      default:
        return 'Tell Us About Your Gig';
    }
  };

  return (
    <CardHeader className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white relative">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack} 
          className="text-white hover:bg-white/20 transition-all duration-200 z-10"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Briefcase className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-bold">{getUserTypeTitle()}</CardTitle>
        </div>
      </div>
    </CardHeader>
  );
};

export default FreelancerGigHeader;
