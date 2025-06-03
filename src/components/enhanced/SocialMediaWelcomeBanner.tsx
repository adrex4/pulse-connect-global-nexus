
import React from 'react';
import { Camera } from 'lucide-react';

const SocialMediaWelcomeBanner: React.FC = () => {
  return (
    <div className="p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-200">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center">
          <Camera className="h-8 w-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-pink-900">Welcome, Content Creator!</h3>
          <p className="text-pink-700">
            Join exclusive creator networks, discover brand partnerships, and collaborate with influencers worldwide.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaWelcomeBanner;
