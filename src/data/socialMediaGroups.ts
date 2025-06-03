
import { User, Group } from '@/types/connectPulse';

export const generateSocialMediaGroups = (user: User): Group[] => {
  return [
    {
      id: 'influencer-global',
      name: 'Global Influencer Hub',
      niche: 'Social Media',
      scope: 'global',
      memberCount: 15420,
      description: 'Premier community for content creators and influencers worldwide. Share strategies, collaborate on campaigns, and grow together.'
    },
    {
      id: 'brand-partnerships',
      name: 'Brand Partnership Network',
      niche: 'Brand Collaborations',
      scope: 'global',
      memberCount: 8740,
      description: 'Connect with brands looking for influencer partnerships. Exclusive sponsorship opportunities and collaboration deals.'
    },
    {
      id: 'content-creators-local',
      name: `${user.country} Content Creators`,
      niche: 'Content Creation',
      scope: 'local',
      country: user.country,
      memberCount: Math.floor(Math.random() * 500) + 200,
      description: `Local content creators and influencers in ${user.country}. Meet up, collaborate on local campaigns, and support each other's growth.`
    },
    {
      id: 'micro-influencers',
      name: 'Micro-Influencer Collective',
      niche: 'Micro-Influencing',
      scope: 'global',
      memberCount: 12300,
      description: 'Community for micro-influencers (1K-100K followers). Perfect for growing creators to share tips and find collaboration opportunities.'
    },
    {
      id: 'lifestyle-influencers',
      name: 'Lifestyle & Fashion Creators',
      niche: 'Lifestyle',
      scope: 'global',
      memberCount: 9850,
      description: 'Lifestyle, fashion, and beauty influencers unite! Share trends, review products, and build authentic audiences together.'
    },
    {
      id: 'tiktok-creators',
      name: 'TikTok Creator Studio',
      niche: 'TikTok',
      scope: 'global',
      memberCount: 22100,
      description: 'Master the art of TikTok content creation. Learn viral trends, editing techniques, and monetization strategies.'
    },
    {
      id: 'youtube-partners',
      name: 'YouTube Creator Network',
      niche: 'YouTube',
      scope: 'global',
      memberCount: 18600,
      description: 'YouTube creators helping each other grow. Share editing tips, collaboration opportunities, and monetization advice.'
    },
    {
      id: 'instagram-growth',
      name: 'Instagram Growth Academy',
      niche: 'Instagram',
      scope: 'global',
      memberCount: 31200,
      description: 'Master Instagram marketing and content creation. Learn from successful influencers and grow your following organically.'
    },
    {
      id: 'food-bloggers',
      name: 'Food & Recipe Creators',
      niche: 'Food',
      scope: 'global',
      memberCount: 14800,
      description: 'Food bloggers, recipe creators, and culinary influencers. Share food photography tips and collaborate with food brands.'
    },
    {
      id: 'fitness-influencers',
      name: 'Fitness & Wellness Community',
      niche: 'Fitness',
      scope: 'global',
      memberCount: 19500,
      description: 'Fitness influencers, trainers, and wellness coaches. Share workout content, nutrition tips, and fitness brand partnerships.'
    },
    {
      id: 'gaming-streamers',
      name: 'Gaming & Streaming Hub',
      niche: 'Gaming',
      scope: 'global',
      memberCount: 28400,
      description: 'Gaming content creators, streamers, and esports influencers. Share streaming tips, game reviews, and collaboration opportunities.'
    },
    {
      id: 'travel-bloggers',
      name: 'Travel Content Creators',
      niche: 'Travel',
      scope: 'global',
      memberCount: 16700,
      description: 'Travel bloggers and adventure influencers. Share destination guides, travel tips, and collaborate with tourism brands.'
    },
    {
      id: 'tech-reviewers',
      name: 'Tech Review Community',
      niche: 'Technology',
      scope: 'global',
      memberCount: 13200,
      description: 'Technology reviewers and tech influencers. Share product reviews, tech news, and collaborate with tech brands.'
    },
    {
      id: 'beauty-gurus',
      name: 'Beauty & Makeup Artists',
      niche: 'Beauty',
      scope: 'global',
      memberCount: 21500,
      description: 'Beauty influencers, makeup artists, and skincare experts. Share beauty tips, product reviews, and brand collaborations.'
    },
    {
      id: 'parenting-bloggers',
      name: 'Parenting & Family Content',
      niche: 'Parenting',
      scope: 'global',
      memberCount: 11800,
      description: 'Parenting bloggers and family content creators. Share parenting tips, family activities, and collaborate with family brands.'
    },
    {
      id: `europe-creators-${user.country}`,
      name: 'European Creator Network',
      niche: 'Regional Network',
      scope: 'regional',
      region: 'Europe',
      memberCount: 8500,
      description: 'Connect with content creators across Europe. Share cultural insights, collaborate on European campaigns, and grow together.'
    },
    {
      id: `asia-pacific-creators`,
      name: 'Asia-Pacific Influencers',
      niche: 'Regional Network',
      scope: 'regional',
      region: 'Asia-Pacific',
      memberCount: 12700,
      description: 'Dynamic community of Asia-Pacific content creators. Share trends, cultural content, and brand opportunities in the region.'
    },
    {
      id: `americas-creators`,
      name: 'Americas Creator Alliance',
      niche: 'Regional Network',
      scope: 'regional',
      region: 'Americas',
      memberCount: 15300,
      description: 'Unite creators from North and South America. Share market insights, collaborate on cross-border campaigns, and expand reach.'
    }
  ];
};
