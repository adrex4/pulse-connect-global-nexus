import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, Star, MapPin, Clock, DollarSign, 
  Code, Palette, Pen, Camera, Headphones, 
  Globe, Smartphone, Database, Shield, Briefcase,
  Calculator, Users, MessageSquare, TrendingUp, Settings,
  Monitor, Gamepad2, Truck, Wrench, Cpu, Video,
  Music, Languages, BarChart3, Megaphone, ShoppingCart
} from 'lucide-react';

// Skill categories with example skills
const skillCategories = [
  {
    name: 'Web Development',
    icon: <Code className="h-8 w-8 text-blue-500" />,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop',
    skills: 'WordPress, Shopify, Wix, React, PHP, Laravel',
    totalFreelancers: '12.4K'
  },
  {
    name: 'Mobile App Development',
    icon: <Smartphone className="h-8 w-8 text-green-500" />,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    skills: 'Flutter, React Native, Swift, Kotlin, Ionic',
    totalFreelancers: '8.2K'
  },
  {
    name: 'Game Development',
    icon: <Gamepad2 className="h-8 w-8 text-purple-500" />,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop',
    skills: 'Unity, Unreal Engine, Roblox, C#, Blender',
    totalFreelancers: '3.1K'
  },
  {
    name: 'DevOps & Cloud',
    icon: <Database className="h-8 w-8 text-orange-500" />,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop',
    skills: 'AWS, Docker, Kubernetes, Jenkins, Azure',
    totalFreelancers: '5.7K'
  },
  {
    name: 'UI/UX Design',
    icon: <Palette className="h-8 w-8 text-pink-500" />,
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop',
    skills: 'Figma, Adobe XD, Sketch, Prototyping',
    totalFreelancers: '15.3K'
  },
  {
    name: 'Graphic & Visual Design',
    icon: <Camera className="h-8 w-8 text-red-500" />,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    skills: 'Photoshop, Illustrator, Branding, Logo Design',
    totalFreelancers: '18.9K'
  },
  {
    name: '3D Modeling & Animation',
    icon: <Monitor className="h-8 w-8 text-indigo-500" />,
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&h=300&fit=crop',
    skills: 'Blender, Maya, 3ds Max, Character Rigging',
    totalFreelancers: '4.2K'
  },
  {
    name: 'CAD & Engineering',
    icon: <Wrench className="h-8 w-8 text-gray-600" />,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
    skills: 'AutoCAD, SolidWorks, Fusion 360, Drafting',
    totalFreelancers: '2.8K'
  },
  {
    name: 'Writing & Content',
    icon: <Pen className="h-8 w-8 text-yellow-600" />,
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop',
    skills: 'Blog Writing, SEO Content, Copywriting',
    totalFreelancers: '22.1K'
  },
  {
    name: 'Copywriting & Marketing',
    icon: <Megaphone className="h-8 w-8 text-orange-600" />,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop',
    skills: 'Ad Copy, Sales Pages, Email Marketing',
    totalFreelancers: '11.7K'
  },
  {
    name: 'Technical Writing',
    icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
    skills: 'Documentation, API Docs, User Manuals',
    totalFreelancers: '6.3K'
  },
  {
    name: 'Video & Media Production',
    icon: <Video className="h-8 w-8 text-red-600" />,
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop',
    skills: 'Premiere Pro, After Effects, Final Cut',
    totalFreelancers: '9.8K'
  },
  {
    name: 'Audio & Music',
    icon: <Music className="h-8 w-8 text-purple-600" />,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    skills: 'Pro Tools, Logic Pro, Voice Over, Mixing',
    totalFreelancers: '4.5K'
  },
  {
    name: 'Photography & Image Editing',
    icon: <Camera className="h-8 w-8 text-green-600" />,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop',
    skills: 'Lightroom, Photoshop, Retouching',
    totalFreelancers: '13.2K'
  },
  {
    name: 'Translation & Localization',
    icon: <Languages className="h-8 w-8 text-teal-500" />,
    image: 'https://images.unsplash.com/photo-1453749024858-4bca89bd9edc?w=400&h=300&fit=crop',
    skills: 'Spanish, French, German, Subtitles',
    totalFreelancers: '7.9K'
  },
  {
    name: 'Data & Administrative',
    icon: <BarChart3 className="h-8 w-8 text-indigo-600" />,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    skills: 'Excel, Data Entry, CRM Management',
    totalFreelancers: '16.4K'
  },
  {
    name: 'Social Media & Digital Marketing',
    icon: <TrendingUp className="h-8 w-8 text-pink-600" />,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    skills: 'Instagram, Facebook Ads, SEO, Analytics',
    totalFreelancers: '19.6K'
  },
  {
    name: 'Sales & Marketing Automation',
    icon: <Settings className="h-8 w-8 text-cyan-500" />,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    skills: 'ClickFunnels, HubSpot, Automation',
    totalFreelancers: '5.1K'
  },
  {
    name: 'Legal & Financial Services',
    icon: <Briefcase className="h-8 w-8 text-slate-600" />,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop',
    skills: 'Contract Law, Accounting, Tax Prep',
    totalFreelancers: '3.7K'
  },
  {
    name: 'Emerging Technologies',
    icon: <Cpu className="h-8 w-8 text-emerald-500" />,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    skills: 'Blockchain, AI/ML, Web3, Smart Contracts',
    totalFreelancers: '2.9K'
  },
  {
    name: 'Security & Quality Assurance',
    icon: <Shield className="h-8 w-8 text-red-700" />,
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
    skills: 'Penetration Testing, QA Testing, Security Audits',
    totalFreelancers: '4.8K'
  },
  {
    name: 'Business & CRM',
    icon: <Users className="h-8 w-8 text-blue-700" />,
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop',
    skills: 'Salesforce, PowerPoint, Business Plans',
    totalFreelancers: '8.6K'
  },
  {
    name: 'HR & Recruitment',
    icon: <Users className="h-8 w-8 text-green-700" />,
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop',
    skills: 'Resume Writing, LinkedIn, Recruiting',
    totalFreelancers: '6.2K'
  },
  {
    name: 'Customer Service & Support',
    icon: <Headphones className="h-8 w-8 text-orange-700" />,
    image: 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=400&h=300&fit=crop',
    skills: 'Live Chat, Email Support, Help Desk',
    totalFreelancers: '12.8K'
  },
  {
    name: 'E-commerce & Online Business',
    icon: <ShoppingCart className="h-8 w-8 text-purple-700" />,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    skills: 'Shopify, Amazon VA, Product Listings',
    totalFreelancers: '14.3K'
  }
];

// Mock freelancers data
const mockFreelancers = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'Full Stack Developer',
    category: 'Web Development',
    location: 'San Francisco, CA',
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: '$85-120',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b1b5?w=150&h=150&fit=crop&crop=face',
    skills: ['React', 'Node.js', 'Python', 'AWS'],
    description: 'Experienced full-stack developer specializing in modern web applications. 8+ years building scalable solutions for startups and enterprises.',
    completedProjects: 89,
    responseTime: '2 hours',
    availability: 'Available now',
    portfolio: [
      { title: 'E-commerce Platform', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop' },
      { title: 'SaaS Dashboard', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop' }
    ]
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    title: 'UI/UX Designer',
    category: 'UI/UX Design',
    location: 'New York, NY',
    rating: 4.8,
    reviewCount: 94,
    hourlyRate: '$65-95',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    description: 'Creative UI/UX designer with a passion for creating intuitive and beautiful user experiences. Specialized in mobile and web design.',
    completedProjects: 156,
    responseTime: '1 hour',
    availability: 'Available now',
    portfolio: [
      { title: 'Mobile Banking App', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop' },
      { title: 'Travel Website', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop' }
    ]
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    title: 'Content Writer & SEO Specialist',
    category: 'Writing & Content',
    location: 'Austin, TX',
    rating: 4.9,
    reviewCount: 203,
    hourlyRate: '$45-75',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    skills: ['SEO Writing', 'Content Strategy', 'Blog Writing', 'Copywriting'],
    description: 'Professional content writer and SEO specialist helping businesses improve their online presence through engaging, optimized content.',
    completedProjects: 312,
    responseTime: '30 minutes',
    availability: 'Available now',
    portfolio: [
      { title: 'Tech Blog Series', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=200&fit=crop' },
      { title: 'Marketing Website Copy', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop' }
    ]
  }
];

const FreelancerMarketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all_categories');
  const [selectedLocation, setSelectedLocation] = useState('all_locations');
  const [priceRange, setPriceRange] = useState('any_range');
  const [selectedFreelancer, setSelectedFreelancer] = useState<any>(null);
  const [activeView, setActiveView] = useState<'categories' | 'freelancers'>('categories');

  const filteredFreelancers = mockFreelancers.filter(freelancer => {
    const matchesSearch = freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      freelancer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      freelancer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all_categories' || freelancer.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all_locations' || freelancer.location.includes(selectedLocation);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all_categories');
    setSelectedLocation('all_locations');
    setPriceRange('any_range');
  };

  if (selectedFreelancer) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedFreelancer(null)}
            className="flex items-center gap-2"
          >
            ← Back to Browse
          </Button>
        </div>

        <Card className="overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-32"></div>
          <CardContent className="relative -mt-16 pb-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <img 
                  src={selectedFreelancer.profileImage} 
                  alt={selectedFreelancer.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
                <div className="mt-4 text-center md:text-left">
                  <h1 className="text-2xl font-bold">{selectedFreelancer.name}</h1>
                  <p className="text-gray-600 mt-1">{selectedFreelancer.title}</p>
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      {selectedFreelancer.rating} ({selectedFreelancer.reviewCount} reviews)
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {selectedFreelancer.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">About</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{selectedFreelancer.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold mb-3">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedFreelancer.skills.map((skill: string, index: number) => (
                          <Badge key={index} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Quick Stats</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Hourly Rate:</span>
                          <span className="font-medium">{selectedFreelancer.hourlyRate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Projects Completed:</span>
                          <span className="font-medium">{selectedFreelancer.completedProjects}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Response Time:</span>
                          <span className="font-medium">{selectedFreelancer.responseTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Availability:</span>
                          <span className="font-medium text-green-600">{selectedFreelancer.availability}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Portfolio</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedFreelancer.portfolio.map((item: any, index: number) => (
                        <div key={index} className="relative group cursor-pointer">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <span className="text-white font-medium">{item.title}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Freelancer
                    </Button>
                    <Button variant="outline">
                      <Star className="h-4 w-4 mr-2" />
                      Save to Favorites
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (activeView === 'freelancers') {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => setActiveView('categories')}
            className="flex items-center gap-2"
          >
            ← Back to Categories
          </Button>
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedCategory === 'all_categories' ? 'All Freelancers' : selectedCategory}
          </h2>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search freelancers by name, skills, or expertise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg border-2 focus:border-blue-500 bg-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-white border-2 focus:border-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all_categories">All Categories</SelectItem>
                      {skillCategories.map(category => (
                        <SelectItem key={category.name} value={category.name}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="bg-white border-2 focus:border-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all_locations">All Locations</SelectItem>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                      <SelectItem value="Australia">Australia</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger className="bg-white border-2 focus:border-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any_range">Any Range</SelectItem>
                      <SelectItem value="under_25">Under $25/hr</SelectItem>
                      <SelectItem value="25_50">$25-50/hr</SelectItem>
                      <SelectItem value="50_100">$50-100/hr</SelectItem>
                      <SelectItem value="over_100">$100+/hr</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={handleResetFilters}
                    className="w-full bg-white hover:bg-gray-50 border-2"
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>

              <div className="text-center text-sm text-gray-600">
                Found {filteredFreelancers.length} freelancers
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Freelancers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFreelancers.map((freelancer) => (
            <Card 
              key={freelancer.id}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => setSelectedFreelancer(freelancer)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={freelancer.profileImage} 
                    alt={freelancer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{freelancer.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{freelancer.title}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span>{freelancer.rating}</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">{freelancer.reviewCount} reviews</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{freelancer.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {freelancer.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                  ))}
                  {freelancer.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">+{freelancer.skills.length - 3} more</Badge>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-1 mb-1">
                      <DollarSign className="h-3 w-3" />
                      <span className="font-medium">{freelancer.hourlyRate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{freelancer.responseTime}</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredFreelancers.length === 0 && (
          <Card className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50">
            <CardContent>
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No freelancers found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search criteria or browse different categories</p>
              <Button onClick={handleResetFilters} variant="outline">
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Browse by Skill Categories */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Browse by Skill Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <Card 
              key={index}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden"
              onClick={() => {
                setSelectedCategory(category.name);
                setActiveView('freelancers');
              }}
            >
              <div className="relative h-48">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {category.icon}
                    <h3 className="text-white font-bold text-lg leading-tight">{category.name}</h3>
                  </div>
                  <p className="text-white/90 text-sm mb-1">{category.skills}</p>
                  <p className="text-white/70 text-xs">{category.totalFreelancers} freelancers</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Featured Freelancers */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Freelancers</h2>
          <Button 
            variant="outline" 
            onClick={() => setActiveView('freelancers')}
            className="flex items-center gap-2"
          >
            View All Freelancers
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockFreelancers.map((freelancer) => (
            <Card 
              key={freelancer.id}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => setSelectedFreelancer(freelancer)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={freelancer.profileImage} 
                    alt={freelancer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{freelancer.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{freelancer.title}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span>{freelancer.rating}</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">{freelancer.reviewCount} reviews</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{freelancer.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {freelancer.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                  ))}
                  {freelancer.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">+{freelancer.skills.length - 3} more</Badge>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-1 mb-1">
                      <DollarSign className="h-3 w-3" />
                      <span className="font-medium">{freelancer.hourlyRate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{freelancer.responseTime}</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Start Your Freelancing Journey?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of talented freelancers who are building successful careers on ConnectPulse.
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Users className="h-5 w-5 mr-2" />
            Become a Freelancer
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreelancerMarketplace;
