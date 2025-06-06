
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Star, TrendingUp, Users, CheckCircle } from 'lucide-react';

interface SocialMediaProfileFormProps {
  influencerName: string;
  setInfluencerName: (name: string) => void;
  totalFollowers: string;
  setTotalFollowers: (followers: string) => void;
  niche: string;
  setNiche: (niche: string) => void;
  contentType: string;
  setContentType: (type: string) => void;
  bio: string;
  setBio: (bio: string) => void;
  rates: string;
  setRates: (rates: string) => void;
  selectedPlatforms: string[];
  togglePlatform: (platform: string) => void;
}

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

const SocialMediaProfileForm: React.FC<SocialMediaProfileFormProps> = ({
  influencerName,
  setInfluencerName,
  totalFollowers,
  setTotalFollowers,
  niche,
  setNiche,
  contentType,
  setContentType,
  bio,
  setBio,
  rates,
  setRates,
  selectedPlatforms,
  togglePlatform
}) => {
  return (
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
  );
};

export default SocialMediaProfileForm;
