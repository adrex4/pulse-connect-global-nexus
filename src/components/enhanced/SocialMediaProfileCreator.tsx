import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Camera, Users, Star, TrendingUp } from 'lucide-react';

interface SocialMediaProfileCreatorProps {
  onNext: (profileData: {
    influencerName: string;
    platforms: string[];
    totalFollowers: string;
    niche: string;
    contentType: string;
    bio: string;
    rates: string;
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
        rates: rates.trim()
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Card className="shadow-xl border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <Camera className="h-6 w-6" />
              <CardTitle className="text-2xl">Create Your Influencer Profile</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-3">
            <h3 className="text-3xl font-semibold text-gray-800">Build Your Influence</h3>
            <p className="text-gray-600 text-lg">
              Showcase your social media presence and connect with brands looking for influencers like you.
            </p>
          </div>

          {/* Influencer Name */}
          <div className="space-y-3">
            <Label htmlFor="influencerName" className="text-lg font-medium flex items-center gap-2">
              <Star className="h-4 w-4 text-pink-500" />
              Influencer/Brand Name *
            </Label>
            <Input
              id="influencerName"
              placeholder="e.g., @fashionista_sarah, TechReviewer Pro"
              value={influencerName}
              onChange={(e) => setInfluencerName(e.target.value)}
              className="h-12 text-lg border-2 focus:border-pink-500"
            />
          </div>

          {/* Social Media Platforms */}
          <div className="space-y-3">
            <Label className="text-lg font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-pink-500" />
              Active Platforms *
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {platforms.map((platform) => (
                <Button
                  key={platform}
                  type="button"
                  variant={selectedPlatforms.includes(platform) ? "default" : "outline"}
                  onClick={() => togglePlatform(platform)}
                  className={`${
                    selectedPlatforms.includes(platform)
                      ? "bg-pink-500 hover:bg-pink-600 text-white"
                      : "border-pink-200 text-pink-600 hover:bg-pink-50"
                  }`}
                >
                  {platform}
                </Button>
              ))}
            </div>
          </div>

          {/* Total Followers */}
          <div className="space-y-3">
            <Label className="text-lg font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-pink-500" />
              Total Follower Range *
            </Label>
            <Select value={totalFollowers} onValueChange={setTotalFollowers}>
              <SelectTrigger className="h-12 text-lg border-2 focus:border-pink-500">
                <SelectValue placeholder="Select your follower range" />
              </SelectTrigger>
              <SelectContent>
                {followerRanges.map((range) => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Content Niche */}
          <div className="space-y-3">
            <Label className="text-lg font-medium">Content Niche *</Label>
            <Select value={niche} onValueChange={setNiche}>
              <SelectTrigger className="h-12 text-lg border-2 focus:border-pink-500">
                <SelectValue placeholder="Select your content niche" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {niches.map((n) => (
                  <SelectItem key={n} value={n}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Content Type */}
          <div className="space-y-3">
            <Label className="text-lg font-medium">Primary Content Type *</Label>
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger className="h-12 text-lg border-2 focus:border-pink-500">
                <SelectValue placeholder="Select your main content type" />
              </SelectTrigger>
              <SelectContent>
                {contentTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bio */}
          <div className="space-y-3">
            <Label htmlFor="bio" className="text-lg font-medium">Bio/Description</Label>
            <Textarea
              id="bio"
              placeholder="Tell brands about your unique style, audience, and what makes you special..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="min-h-[100px] text-lg border-2 focus:border-pink-500"
            />
          </div>

          {/* Rates */}
          <div className="space-y-3">
            <Label htmlFor="rates" className="text-lg font-medium">Collaboration Rates (Optional)</Label>
            <Textarea
              id="rates"
              placeholder="e.g., Instagram post: $500, Story: $200, YouTube video: $2000..."
              value={rates}
              onChange={(e) => setRates(e.target.value)}
              className="min-h-[80px] text-lg border-2 focus:border-pink-500"
            />
          </div>

          <Button
            onClick={handleNext}
            disabled={!influencerName.trim() || selectedPlatforms.length === 0 || !totalFollowers || !niche || !contentType}
            className="w-full h-12 text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            size="lg"
          >
            Continue to Content Showcase →
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaProfileCreator;
