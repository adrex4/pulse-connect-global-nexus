
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Users, Search, Code, Palette, PenTool, Camera, TrendingUp, Briefcase, Star } from 'lucide-react';
import { UserType, Group } from '@/types/connectPulse';

interface FreelancerGroupListProps {
  userType: UserType;
  profileData: any;
  onJoinGroup: (group: Group) => void;
  onBack: () => void;
}

const FreelancerGroupList: React.FC<FreelancerGroupListProps> = ({
  userType,
  profileData,
  onJoinGroup,
  onBack
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'skill-based' | 'local' | 'trending'>('all');

  // Generate groups based on profile data
  const generateGroups = (): Group[] => {
    const baseGroups: Group[] = [
      // Skill-based groups
      {
        id: 'web-dev-masters',
        name: 'Web Development Masters',
        niche: 'Web Development',
        scope: 'global',
        memberCount: 2847,
        description: 'Elite web developers sharing cutting-edge techniques, best practices, and project opportunities. Join discussions on React, Node.js, and full-stack development.'
      },
      {
        id: 'design-collective',
        name: 'Creative Design Collective',
        niche: 'Graphic Design',
        scope: 'global',
        memberCount: 1923,
        description: 'A vibrant community of graphic designers, UI/UX experts, and creative professionals. Share portfolios, get feedback, and find design collaborations.'
      },
      {
        id: 'content-creators-hub',
        name: 'Content Creators Hub',
        niche: 'Content Writing',
        scope: 'global',
        memberCount: 1564,
        description: 'Writers, copywriters, and content strategists united. Share writing tips, find clients, and collaborate on content projects.'
      },
      {
        id: 'mobile-dev-pros',
        name: 'Mobile Development Professionals',
        niche: 'Mobile Development',
        scope: 'global',
        memberCount: 1387,
        description: 'iOS, Android, and cross-platform developers building the future of mobile. Discuss React Native, Flutter, and native development.'
      },
      {
        id: 'marketing-mavens',
        name: 'Digital Marketing Mavens',
        niche: 'Digital Marketing',
        scope: 'global',
        memberCount: 2156,
        description: 'Digital marketers mastering SEO, PPC, social media, and conversion optimization. Share strategies and case studies.'
      },
      {
        id: 'video-editors-unite',
        name: 'Video Editors Unite',
        niche: 'Video Editing',
        scope: 'global',
        memberCount: 892,
        description: 'Video editors and motion graphics artists creating compelling visual stories. Share techniques and find collaborative projects.'
      },
      {
        id: 'photo-professionals',
        name: 'Photography Professionals',
        niche: 'Photography',
        scope: 'global',
        memberCount: 1234,
        description: 'Professional photographers sharing techniques, equipment reviews, and business insights. From portraits to products.'
      },
      {
        id: 'translation-experts',
        name: 'Translation & Localization Experts',
        niche: 'Translation',
        scope: 'global',
        memberCount: 567,
        description: 'Translators and localization specialists bridging language barriers. Share resources and find translation projects.'
      },
      {
        id: 'data-analysts-network',
        name: 'Data Analysts Network',
        niche: 'Data Analysis',
        scope: 'global',
        memberCount: 1876,
        description: 'Data scientists and analysts turning data into insights. Discuss Python, R, SQL, and visualization techniques.'
      },
      {
        id: 'virtual-assistants-pro',
        name: 'Virtual Assistants Pro',
        niche: 'Virtual Assistant',
        scope: 'global',
        memberCount: 987,
        description: 'Professional virtual assistants providing remote support services. Share tools, tips, and client management strategies.'
      },
      {
        id: 'consultants-circle',
        name: 'Business Consultants Circle',
        niche: 'Consulting',
        scope: 'global',
        memberCount: 1456,
        description: 'Expert consultants across industries sharing insights, methodologies, and business opportunities.'
      },

      // Trending/Popular groups
      {
        id: 'ai-automation-freelancers',
        name: 'AI & Automation Freelancers',
        niche: 'AI/Tech',
        scope: 'global',
        memberCount: 3245,
        description: 'Freelancers leveraging AI and automation tools to enhance their services. Discuss ChatGPT, automation tools, and AI-powered workflows.'
      },
      {
        id: 'remote-work-champions',
        name: 'Remote Work Champions',
        niche: 'Remote Work',
        scope: 'global',
        memberCount: 4567,
        description: 'Mastering the art of remote freelancing. Share productivity tips, tools, and strategies for successful remote collaboration.'
      },
      {
        id: 'startup-freelancers',
        name: 'Startup Freelancers Network',
        niche: 'Startups',
        scope: 'global',
        memberCount: 2134,
        description: 'Freelancers specializing in startup projects. Connect with early-stage companies and fellow freelancers in the startup ecosystem.'
      },
      {
        id: 'sustainable-freelancing',
        name: 'Sustainable Freelancing',
        niche: 'Sustainability',
        scope: 'global',
        memberCount: 876,
        description: 'Freelancers focused on sustainable business practices and eco-friendly projects. Building a better future through conscious freelancing.'
      },

      // Beginner-friendly groups
      {
        id: 'freelancer-beginners',
        name: 'Freelancer Beginners Hub',
        niche: 'General',
        scope: 'global',
        memberCount: 5432,
        description: 'New to freelancing? Start here! Get mentorship, learn the basics, and connect with other beginners on their freelancing journey.'
      },
      {
        id: 'skill-builders-academy',
        name: 'Skill Builders Academy',
        niche: 'Learning',
        scope: 'global',
        memberCount: 3456,
        description: 'Continuous learners upgrading their skills. Share courses, tutorials, and learning resources to advance your freelancing career.'
      }
    ];

    return baseGroups;
  };

  const groups = generateGroups();

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.niche.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    switch (selectedFilter) {
      case 'skill-based':
        return profileData?.skills?.some((skill: string) => 
          group.name.toLowerCase().includes(skill.toLowerCase()) ||
          group.description.toLowerCase().includes(skill.toLowerCase())
        ) || group.niche === profileData?.category;
      case 'local':
        return group.scope === 'local';
      case 'trending':
        return group.memberCount > 2000;
      default:
        return true;
    }
  });

  const getGroupIcon = (niche: string) => {
    switch (niche) {
      case 'Web Development':
      case 'Mobile Development':
        return <Code className="h-6 w-6" />;
      case 'Graphic Design':
        return <Palette className="h-6 w-6" />;
      case 'Content Writing':
        return <PenTool className="h-6 w-6" />;
      case 'Photography':
        return <Camera className="h-6 w-6" />;
      case 'Digital Marketing':
        return <TrendingUp className="h-6 w-6" />;
      default:
        return <Briefcase className="h-6 w-6" />;
    }
  };

  const getRecommendedBadge = (group: Group) => {
    if (profileData?.category && group.niche === profileData.category) {
      return <Badge className="bg-green-100 text-green-800 ml-2">Recommended</Badge>;
    }
    if (profileData?.skills?.some((skill: string) => 
      group.name.toLowerCase().includes(skill.toLowerCase()) ||
      group.description.toLowerCase().includes(skill.toLowerCase())
    )) {
      return <Badge className="bg-blue-100 text-blue-800 ml-2">Match</Badge>;
    }
    if (group.memberCount > 3000) {
      return <Badge className="bg-purple-100 text-purple-800 ml-2">Popular</Badge>;
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6" />
              <CardTitle className="text-xl">Join Freelancer Communities</CardTitle>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="text-center space-y-3 mb-8">
            <h3 className="text-2xl font-semibold text-gray-800">
              Connect with Your Freelancing Community
            </h3>
            <p className="text-gray-600 text-lg">
              Join groups that match your skills and interests to network, learn, and find opportunities
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search groups by name, skill, or topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <div className="flex gap-2">
              {[
                { key: 'all', label: 'All Groups' },
                { key: 'skill-based', label: 'For Your Skills' },
                { key: 'trending', label: 'Trending' },
                { key: 'local', label: 'Local' }
              ].map((filter) => (
                <Button
                  key={filter.key}
                  variant={selectedFilter === filter.key ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter(filter.key as any)}
                  className="whitespace-nowrap"
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow border-2 hover:border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center text-green-600">
                        {getGroupIcon(group.niche)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 line-clamp-2">{group.name}</h4>
                        <p className="text-sm text-gray-500">{group.niche}</p>
                      </div>
                    </div>
                    {getRecommendedBadge(group)}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {group.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      <span>{group.memberCount.toLocaleString()} members</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {group.scope}
                    </Badge>
                  </div>
                  
                  <Button
                    onClick={() => onJoinGroup(group)}
                    className="w-full mt-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    Join Group
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredGroups.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No groups found</h3>
              <p className="text-gray-500">Try adjusting your search or filters to find more groups</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FreelancerGroupList;
