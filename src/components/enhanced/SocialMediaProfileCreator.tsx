
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Camera, Users, Star, TrendingUp, CheckCircle } from 'lucide-react';
import ProfilePictureUploader from './ProfilePictureUploader';

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
  const [influencerName, setInfluencerName] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [totalFollowers, setTotalFollowers] = useState('');
  const [niche, setNiche] = useState('');
  const [contentType, setContentType] = useState('');
  const [bio, setBio] = useState('');
  const [rates, setRates] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const platforms = [
    'Instagram', 'TikTok', 'YouTube', 'Twitter/X', 'LinkedIn', 
    'Facebook', 'Snapchat', 'Pinterest', 'Twitch', 'Discord',
    'Reddit', 'Clubhouse', 'BeReal', 'Threads', 'Mastodon'
  ];

  const niches = [
    'Fashion & Beauty', 'Fitness & Health', 'Food & Cooking', 'Travel & Adventure',
    'Technology & Gadgets', 'Gaming & Esports', 'Lifestyle & Wellness', 'Business & Finance',
    'Education & Learning', 'Entertainment & Comedy', 'Sports & Athletics', 'Art & Design',
    'Music & Audio', 'Photography & Visual Arts', 'Home & Decor', 'Parenting & Family',
    'Pets & Animals', 'Nature & Environment', 'DIY & Crafts', 'Book Reviews & Literature'
  ];

  const contentTypes = [
    'Photos & Reels', 'Long-form Videos', 'Live Streaming', 'Stories',
    'Tutorials & How-tos', 'Product Reviews', 'Vlogs', 'Educational Content',
    'Comedy Skits', 'Dance Videos', 'Music Covers', 'Unboxing Videos',
    'Before & After', 'Day in the Life', 'Q&A Sessions', 'Collaborations',
    'Behind the Scenes', 'Challenges', 'Reaction Videos', 'Podcasts'
  ];

  const followerRanges = [
    '1K - 10K (Micro)', '10K - 100K (Mid-tier)', '100K - 1M (Macro)',
    '1M+ (Mega)', '10M+ (Celebrity)'
  ];

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
      <Card className="shadow-2xl border-0 bg-white overflow-hidden">
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
        
        <CardContent className="p-8 space-y-8 bg-gradient-to-br from-gray-50 to-white">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Build Your Influence Empire
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Showcase your social media presence and connect with brands looking for authentic influencers like you.
            </p>
          </div>

          {/* Profile Picture */}
          <div className="flex justify-center">
            <ProfilePictureUploader
              onImageSelect={setProfileImage}
              currentImage={profileImage || undefined}
              userName={influencerName || 'Influencer'}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Influencer Name */}
              <div className="space-y-3">
                <Label htmlFor="influencerName" className="text-lg font-semibold flex items-center gap-2">
                  <Star className="h-5 w-5 text-pink-500" />
                  Influencer/Brand Name *
                </Label>
                <Input
                  id="influencerName"
                  placeholder="e.g., @fashionista_sarah, TechReviewer Pro"
                  value={influencerName}
                  onChange={(e) => setInfluencerName(e.target.value)}
                  className="h-12 text-lg border-2 focus:border-pink-500 transition-colors"
                />
              </div>

              {/* Total Followers */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-pink-500" />
                  Total Follower Range *
                </Label>
                <Select value={totalFollowers} onValueChange={setTotalFollowers}>
                  <SelectTrigger className="h-12 text-lg border-2 focus:border-pink-500">
                    <SelectValue placeholder="Select your follower range" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-white">
                    {followerRanges.map((range) => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Content Niche */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Content Niche *</Label>
                <Select value={niche} onValueChange={setNiche}>
                  <SelectTrigger className="h-12 text-lg border-2 focus:border-pink-500">
                    <SelectValue placeholder="Select your content niche" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 z-50 bg-white">
                    {niches.map((n) => (
                      <SelectItem key={n} value={n}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Content Type */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold">Primary Content Type *</Label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger className="h-12 text-lg border-2 focus:border-pink-500">
                    <SelectValue placeholder="Select your main content type" />
                  </SelectTrigger>
                  <SelectContent className="z-50 bg-white">
                    {contentTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Social Media Platforms */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5 text-pink-500" />
                  Active Platforms * ({selectedPlatforms.length} selected)
                </Label>
                <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto p-2 border-2 border-gray-200 rounded-lg">
                  {platforms.map((platform) => (
                    <Button
                      key={platform}
                      type="button"
                      variant="outline"
                      onClick={() => togglePlatform(platform)}
                      className={`relative transition-all duration-200 ${
                        selectedPlatforms.includes(platform)
                          ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white border-transparent shadow-lg transform scale-105"
                          : "border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-400"
                      }`}
                    >
                      {selectedPlatforms.includes(platform) && (
                        <CheckCircle className="h-4 w-4 absolute top-1 right-1" />
                      )}
                      {platform}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-3">
                <Label htmlFor="bio" className="text-lg font-semibold">Bio/Description</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell brands about your unique style, audience, and what makes you special..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="min-h-[100px] text-lg border-2 focus:border-pink-500 resize-none"
                />
              </div>

              {/* Rates */}
              <div className="space-y-3">
                <Label htmlFor="rates" className="text-lg font-semibold">Collaboration Rates (Optional)</Label>
                <Textarea
                  id="rates"
                  placeholder="e.g., Instagram post: $500, Story: $200, YouTube video: $2000..."
                  value={rates}
                  onChange={(e) => setRates(e.target.value)}
                  className="min-h-[80px] text-lg border-2 focus:border-pink-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
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
