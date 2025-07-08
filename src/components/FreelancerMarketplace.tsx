
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Filter, MapPin, Star, DollarSign, Clock, 
  Users, Briefcase, Globe, ArrowLeft 
} from 'lucide-react';
import FreelancerProfile from './FreelancerProfile';
import { FREELANCER_SKILL_CATEGORIES } from '@/data/freelancerSkills';
import { COUNTRIES } from '@/data/countries';

interface FreelancerMarketplaceProps {
  onBack?: () => void;
}

// Mock freelancer data
const mockFreelancers = [
  {
    id: '1',
    name: 'Sarah Chen',
    primarySkill: 'Web Development',
    skills: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    hourlyRate: 75,
    currency: 'USD',
    availability: 'Full-time',
    experience: 'expert',
    bio: 'Full-stack developer with 6+ years of experience building scalable web applications. Specialized in React ecosystems and modern JavaScript frameworks.',
    country: 'Canada',
    workArrangement: 'Remote Only',
    serviceDelivery: 'Digital/Online',
    rating: 4.9,
    reviewCount: 127,
    completedProjects: 89,
    responseTime: '2 hours',
    languages: ['English', 'Mandarin']
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    primarySkill: 'Graphic Design',
    skills: ['Logo Design', 'Brand Design', 'Print Design'],
    hourlyRate: 45,
    currency: 'USD',
    availability: 'Part-time',
    experience: 'intermediate',
    bio: 'Creative graphic designer helping businesses build strong visual identities. Expert in brand development and marketing materials.',
    country: 'United States',
    workArrangement: 'Hybrid (Remote + On-site)',
    serviceDelivery: 'Digital/Online',
    rating: 4.7,
    reviewCount: 83,
    completedProjects: 156,
    responseTime: '4 hours',
    languages: ['English', 'Spanish']
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    primarySkill: 'Personal Trainer',
    skills: ['Fitness Coaching', 'Nutrition Planning', 'Weight Loss'],
    hourlyRate: 60,
    currency: 'USD',
    availability: 'Project-based',
    experience: 'expert',
    bio: 'Certified personal trainer with 8 years of experience. Specializing in weight loss, strength training, and nutrition coaching.',
    country: 'Mexico',
    workArrangement: 'On-site Only',
    serviceDelivery: 'In-Person/Local',
    rating: 4.8,
    reviewCount: 45,
    completedProjects: 234,
    responseTime: '1 hour',
    languages: ['Spanish', 'English']
  }
];

const getSkillCategoryImage = (category: string) => {
  const categoryImages: { [key: string]: string } = {
    'Web Development': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
    'Mobile App Development': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    'Software Development': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
    'WordPress Development': 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
    'E-commerce Development': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    'Graphic Design': 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop',
    'Logo Design': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
    'Web Design': 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop',
    'UI/UX Design': 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400&h=300&fit=crop',
    'Digital Marketing': 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=300&fit=crop',
    'Social Media Marketing': 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=400&h=300&fit=crop',
    'Content Writing': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop',
    'Copywriting': 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop',
    'Video Editing': 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=300&fit=crop',
    'Video Production': 'https://images.unsplash.com/photo-1492619176842-45906531f8ec?w=400&h=300&fit=crop',
    'Photography': 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop',
    'Animation': 'https://images.unsplash.com/photo-1626126525134-fbbc07afb32c?w=400&h=300&fit=crop',
    'Data Science': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    'Machine Learning': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
    'Personal Trainer': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    'Fitness Coaching': 'https://images.unsplash.com/photo-1549476464-37392f717541?w=400&h=300&fit=crop',
    'Music Production': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    'Voice Acting': 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=300&fit=crop',
    'Translation': 'https://images.unsplash.com/photo-1455894127589-22f75500213a?w=400&h=300&fit=crop',
    'Virtual Assistant': 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop',
    'Business Consulting': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    'Project Management': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    'Accounting': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    'SEO': 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop',
    'Email Marketing': 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=400&h=300&fit=crop',
    'Illustration': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
    'Fashion Design': 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=300&fit=crop',
    'Interior Design': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    'Architecture': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop',
    'Legal Services': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop',
    'Tutoring': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    'Language Teaching': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
    'Life Coaching': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop',
    'Yoga Instructor': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    'Massage Therapy': 'https://images.unsplash.com/photo-1559627994-b1f9235e5157?w=400&h=300&fit=crop',
    'Chef/Cook': 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=300&fit=crop',
    'Event Planning': 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
    'Wedding Planning': 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop',
    'Pet Sitting/Dog Walking': 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
    'Handyman Services': 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&h=300&fit=crop',
    'House Cleaning': 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
    'Gardening/Landscaping': 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    'DJ Services': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    'Real Estate Services': 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=400&h=300&fit=crop',
    'Travel Planning': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop'
  };
  return categoryImages[category] || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop';
};

const FreelancerMarketplace: React.FC<FreelancerMarketplaceProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all_categories');
  const [selectedCountry, setSelectedCountry] = useState('all_countries');
  const [priceRange, setPriceRange] = useState('any_price');
  const [workArrangement, setWorkArrangement] = useState('any_arrangement');
  const [selectedFreelancer, setSelectedFreelancer] = useState<any>(null);
  const [filteredFreelancers, setFilteredFreelancers] = useState(mockFreelancers);

  const handleSearch = () => {
    let filtered = mockFreelancers;

    if (searchTerm) {
      filtered = filtered.filter(freelancer =>
        freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        freelancer.primarySkill.toLowerCase().includes(searchTerm.toLowerCase()) ||
        freelancer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory && selectedCategory !== 'all_categories') {
      const categorySkills = FREELANCER_SKILL_CATEGORIES[selectedCategory as keyof typeof FREELANCER_SKILL_CATEGORIES];
      filtered = filtered.filter(freelancer =>
        categorySkills.includes(freelancer.primarySkill)
      );
    }

    if (selectedCountry && selectedCountry !== 'all_countries') {
      filtered = filtered.filter(freelancer => freelancer.country === selectedCountry);
    }

    if (priceRange && priceRange !== 'any_price') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(freelancer => {
        if (!freelancer.hourlyRate) return true;
        return freelancer.hourlyRate >= min && (max ? freelancer.hourlyRate <= max : true);
      });
    }

    if (workArrangement && workArrangement !== 'any_arrangement') {
      filtered = filtered.filter(freelancer => freelancer.workArrangement === workArrangement);
    }

    setFilteredFreelancers(filtered);
  };

  React.useEffect(() => {
    handleSearch();
  }, [searchTerm, selectedCategory, selectedCountry, priceRange, workArrangement]);

  if (selectedFreelancer) {
    return (
      <div className="max-w-7xl mx-auto animate-fade-in">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedFreelancer(null)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Search Results
          </Button>
        </div>
        <FreelancerProfile 
          freelancer={selectedFreelancer}
          onContact={() => console.log('Contact freelancer')}
          onHire={() => console.log('Hire freelancer')}
        />
      </div>
    );
  }

  const allSkills = Object.values(FREELANCER_SKILL_CATEGORIES).flat();
  const uniqueSkills = Array.from(new Set(allSkills));

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Header Image Section */}
      <div className="relative h-80 mb-8 rounded-2xl overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=400&fit=crop"
          alt="Freelancer Marketplace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/70 to-pink-900/80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Users className="h-12 w-12" />
              </div>
              <h1 className="text-6xl font-bold drop-shadow-lg">Freelancer Marketplace</h1>
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Briefcase className="h-12 w-12" />
              </div>
            </div>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Connect with talented freelancers and skilled professionals ready to bring your projects to life
            </p>
          </div>
        </div>
      </div>

      {/* Skills Categories Grid */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Browse by Skill Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {uniqueSkills.slice(0, 10).map((skill) => (
            <Card 
              key={skill} 
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden"
              onClick={() => setSelectedCategory(Object.keys(FREELANCER_SKILL_CATEGORIES).find(cat => 
                FREELANCER_SKILL_CATEGORIES[cat as keyof typeof FREELANCER_SKILL_CATEGORIES].includes(skill)
              ) || 'all_categories')}
            >
              <div className="relative h-32">
                <img 
                  src={getSkillCategoryImage(skill)} 
                  alt={skill}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-bold text-sm leading-tight">{skill}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Header */}
      <Card className="mb-6 shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6" />
                <CardTitle className="text-2xl">Find Freelancers</CardTitle>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white">
              {filteredFreelancers.length} Professionals Available
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, skill, or service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_categories">All Categories</SelectItem>
                {Object.keys(FREELANCER_SKILL_CATEGORIES).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                <SelectItem value="all_countries">All Countries</SelectItem>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any_price">Any Price</SelectItem>
                <SelectItem value="0-25">$0 - $25/hr</SelectItem>
                <SelectItem value="25-50">$25 - $50/hr</SelectItem>
                <SelectItem value="50-75">$50 - $75/hr</SelectItem>
                <SelectItem value="75-100">$75 - $100/hr</SelectItem>
                <SelectItem value="100-999">$100+/hr</SelectItem>
              </SelectContent>
            </Select>

            <Select value={workArrangement} onValueChange={setWorkArrangement}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Work Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any_arrangement">Any Arrangement</SelectItem>
                <SelectItem value="Remote Only">Remote Only</SelectItem>
                <SelectItem value="On-site Only">On-site Only</SelectItem>
                <SelectItem value="Hybrid (Remote + On-site)">Hybrid</SelectItem>
                <SelectItem value="Flexible">Flexible</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        {filteredFreelancers.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No freelancers found</h3>
              <p>Try adjusting your search criteria to find more professionals.</p>
            </div>
          </Card>
        ) : (
          filteredFreelancers.map((freelancer) => (
            <div key={freelancer.id} onClick={() => setSelectedFreelancer(freelancer)}>
              <FreelancerProfile 
                freelancer={freelancer}
                compact={true}
                onContact={() => setSelectedFreelancer(freelancer)}
                onHire={() => setSelectedFreelancer(freelancer)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FreelancerMarketplace;
