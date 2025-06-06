
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Camera } from 'lucide-react';

interface SocialMediaProfileHeaderProps {
  onBack: () => void;
}

const SocialMediaProfileHeader: React.FC<SocialMediaProfileHeaderProps> = ({ onBack }) => {
  return (
    <CardHeader className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white relative">
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
            <Camera className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-bold">Create Your Influencer Profile</CardTitle>
        </div>
      </div>
    </CardHeader>
  );
};

export default SocialMediaProfileHeader;
