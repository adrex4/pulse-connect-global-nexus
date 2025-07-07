import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, Users, Star, Eye, MessageCircle, ArrowLeft, 
  Instagram, Youtube, TikTok, Send 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialMediaBrowserProps {
  onBack?: () => void;
}

// Updated niche images for social media creators
const CREATOR_NICHE_IMAGES = {
  'Entertainment & Comedy': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=400&fit=crop',
  'Business & Finance': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=400&fit=crop',
  'Food & Cooking': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop',
  'Lifestyle & Wellness': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=400&fit=crop',
  'Technology': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=400&fit=crop',
  'Travel & Adventure': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=400&fit=crop',
  'Fashion & Beauty': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=400&fit=crop',
  'Education & Learning': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=400&fit=crop'
};

const mockCreators = [
  {
    id: '1',
    name: 'Sarah Johnson',
    username: '@sarahcooks',
    niche: 'Food & Cooking',
    followers: 125000,
    averageViews: 45000,
    engagementRate: 4.2,
    rating: 4.8,
    reviewCount: 89,
    bio: 'Professional chef sharing easy home cooking recipes and kitchen tips. Let me help you create delicious meals!',
    platforms: ['Instagram', 'TikTok', 'Youtube'],
    country: 'United States',
    contentTypes: ['Recipe Videos', 'Cooking Tips', 'Kitchen Reviews'],
    collaborationRates: {
      post: '$500-800',
      story: '$200-350',
      reel: '$750-1200'
    }
  },
  {
    id: '2',
    name: 'Mike Chen',
    username: '@techmiketalks',
    niche: 'Technology',
    followers: 89000,
    averageViews: 32000,
    engagementRate: 3.9,
    rating: 4.7,
    reviewCount: 124,
    bio: 'Tech enthusiast breaking down the latest gadgets and trends. Making technology accessible for everyone.',
    platforms: ['Youtube', 'Instagram'],
    country: 'Canada',
    contentTypes: ['Product Reviews', 'Tech Tutorials', 'Industry News'],
    collaborationRates: {
      post: '$400-650',
      story: '$150-250',
      reel: '$600-900'
    }
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    username: '@emmafitlife',
    niche: 'Lifestyle & Wellness',
    followers: 156000,
    averageViews: 68000,
    engagementRate: 5.1,
    rating: 4.9,
    reviewCount: 203,
    bio: 'Certified fitness trainer and wellness coach inspiring healthy lifestyle choices and mental well-being.',
    platforms: ['Instagram', 'TikTok'],
    country: 'Australia',
    contentTypes: ['Workout Videos', 'Wellness Tips', 'Lifestyle Content'],
    collaborationRates: {
      post: '$600-950',
      story: '$250-400',
      reel: '$800-1300'
    }
  },
  {
    id: '4',
    name: 'David Kim',
    username: '@businesswithdave',
    niche: 'Business & Finance',
    followers: 98000,
    averageViews: 41000,
    engagementRate: 4.3,
    rating: 4.6,
    reviewCount: 67,
    bio: 'Entrepreneur and business consultant sharing strategies for success, investment tips, and financial literacy.',
    platforms: ['Youtube', 'Instagram'],
    country: 'United States',
    contentTypes: ['Business Tips', 'Investment Advice', 'Success Stories'],
    collaborationRates: {
      post: '$450-700',
      story: '$180-280',
      reel: '$650-1000'
    }
  },
  {
    id: '5',
    name: 'Comedy Central Jake',
    username: '@jakejokes',
    niche: 'Entertainment & Comedy',
    followers: 203000,
    averageViews: 95000,
    engagementRate: 6.2,
    rating: 4.8,
    reviewCount: 156,
    bio: 'Stand-up comedian bringing daily laughs and entertainment. Life is better when you are laughing!',
    platforms: ['TikTok', 'Instagram', 'Youtube'],
    country: 'United Kingdom',
    contentTypes: ['Comedy Skits', 'Stand-up Clips', 'Funny Observations'],
    collaborationRates: {
      post: '$700-1100',
      story: '$300-450',
      reel: '$900-1500'
    }
  }
];

const niches = [
  'Entertainment & Comedy',
  'Business & Finance', 
  'Food & Cooking',
  'Lifestyle & Wellness',
  'Technology',
  'Travel & Adventure',
  'Fashion & Beauty',
  'Education & Learning'
];

const SocialMediaBrowser: React.FC<SocialMediaBrowserProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('all_niches');
  const [selectedPlatform, setSelectedPlatform] = useState('all_platforms');
  const [followerRange, setFollowerRange] = useState('any_range');
  const [selectedCreator, setSelectedCreator] = useState<any>(null);
  const [filteredCreators, setFilteredCreators] = useState(mockCreators);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const { toast } = useToast();

  const handleSearch = () => {
    let filtered = mockCreators;

    if (searchTerm) {
      filtered = filtered.filter(creator =>
        creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        creator.niche.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedNiche && selectedNiche !== 'all_niches') {
      filtered = filtered.filter(creator => creator.niche === selectedNiche);
    }

    if (selectedPlatform && selectedPlatform !== 'all_platforms') {
      filtered = filtered.filter(creator => 
        creator.platforms.includes(selectedPlatform)
      );
    }

    if (followerRange && followerRange !== 'any_range') {
      const [min, max] = followerRange.split('-').map(Number);
      filtered = filtered.filter(creator => {
        return creator.followers >= min && (max ? creator.followers <= max : true);
      });
    }

    setFilteredCreators(filtered);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a message before sending.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Message Sent!",
      description: `Your collaboration request has been sent to ${selectedCreator?.name}.`
    });
    setMessageText('');
    setMessageOpen(false);
  };

  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram': return <Instagram className="h-4 w-4" />;
      case 'Youtube': return <Youtube className="h-4 w-4" />;
      case 'TikTok': return <TikTok className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getHeaderImage = () => {
    if (selectedNiche === 'all_niches') {
      return 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=400&fit=crop';
    }
    return CREATOR_NICHE_IMAGES[selectedNiche as keyof typeof CREATOR_NICHE_IMAGES] || 
           'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=400&fit=crop';
  };

  React.useEffect(() => {
    handleSearch();
  }, [searchTerm, selectedNiche, selectedPlatform, followerRange]);

  if (selectedCreator) {
    return (
      <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="mb-6">
          <Button
