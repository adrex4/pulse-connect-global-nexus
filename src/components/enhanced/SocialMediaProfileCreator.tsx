
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProfilePictureUploader from './ProfilePictureUploader';
import SocialMediaProfileHeader from './creators/SocialMediaProfileHeader';
import SocialMediaProfileForm from './creators/SocialMediaProfileForm';

interface SocialMediaProfileCreatorProps {
  onNext: (profileData: {
    influencerName: string;
    platforms: string[];
    totalFollowers: string;
    niche: string;
    contentType: string;
    bio: string;
    rates: string;
    profileImage?: string;
  }) => void;
  onBack: () => void;
}

const SocialMediaProfileCreator: React.FC<SocialMediaProfileCreatorProps> = ({ onNext, onBack }) => {
  // Strict defensive checks
  if (!onNext || !onBack) {
    console.error('SocialMediaProfileCreator: Missing required navigation handlers', { onNext, onBack });
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-red-600">
        <h2 className="text-2xl font-bold mb-4">Error: Missing navigation handlers</h2>
        <p className="mb-4">Required navigation functions are missing. Please reload the page or return to the home screen.</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-red-500 text-white rounded">Reload</button>
      </div>
    );
  }

  const [influencerName, setInfluencerName] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [totalFollowers, setTotalFollowers] = useState('');
  const [niche, setNiche] = useState('');
  const [contentType, setContentType] = useState('');
  const [bio, setBio] = useState('');
  const [rates, setRates] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Defensive check for required state before rendering form
  if (influencerName === undefined || selectedPlatforms === undefined || totalFollowers === undefined || niche === undefined || contentType === undefined) {
    console.error('SocialMediaProfileCreator: Missing required state', { influencerName, selectedPlatforms, totalFollowers, niche, contentType });
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-red-600">
        <h2 className="text-2xl font-bold mb-4">Error: Missing required form data</h2>
        <p className="mb-4">Some required form data is missing. Please reload the page or return to the home screen.</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-red-500 text-white rounded">Reload</button>
      </div>
    );
  }

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handleNext = () => {
    if (influencerName.trim() && selectedPlatforms.length > 0 && totalFollowers && niche && contentType) {
      onNext({
        influencerName: influencerName.trim(),
        platforms: selectedPlatforms,
        totalFollowers,
        niche,
        contentType,
        bio: bio.trim(),
        rates: rates.trim(),
        profileImage: profileImage || undefined
      });
    }
  };

  const isFormValid = influencerName.trim() && selectedPlatforms.length > 0 && totalFollowers && niche && contentType;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in p-4">
      <div className="flex justify-end mb-2">
        <Button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition">Back to Home</Button>
      </div>
      <Card className="shadow-2xl border-0 bg-white overflow-hidden">
        <SocialMediaProfileHeader onBack={onBack} />
        <CardContent className="p-8 space-y-8 bg-gradient-to-br from-gray-50 to-white">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Build Your Influence Empire
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Showcase your social media presence and connect with brands looking for authentic influencers like you.
            </p>
          </div>
          <div className="flex justify-center">
            <ProfilePictureUploader
              onImageSelect={setProfileImage}
              currentImage={profileImage || undefined}
              userName={influencerName || 'Influencer'}
            />
          </div>
          <SocialMediaProfileForm
            influencerName={influencerName}
            setInfluencerName={setInfluencerName}
            totalFollowers={totalFollowers}
            setTotalFollowers={setTotalFollowers}
            niche={niche}
            setNiche={setNiche}
            contentType={contentType}
            setContentType={setContentType}
            bio={bio}
            setBio={setBio}
            rates={rates}
            setRates={setRates}
            selectedPlatforms={selectedPlatforms}
            togglePlatform={togglePlatform}
          />
          <div className="flex justify-center space-y-4">
            <div className="w-full max-w-md">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Profile Completion</span>
                <span>{Math.round((Object.values({influencerName, selectedPlatforms: selectedPlatforms.length > 0, totalFollowers, niche, contentType}).filter(Boolean).length / 5) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(Object.values({influencerName, selectedPlatforms: selectedPlatforms.length > 0, totalFollowers, niche, contentType}).filter(Boolean).length / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="flex justify-center pt-4">
            <Button
              onClick={handleNext}
              disabled={!isFormValid}
              className={`h-14 px-8 text-lg font-semibold transition-all duration-300 ${
                isFormValid 
                  ? "bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:scale-105" 
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              size="lg"
            >
              {isFormValid ? (
                <>Continue to Content Showcase →</>
              ) : (
                "Complete Required Fields"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaProfileCreator;
