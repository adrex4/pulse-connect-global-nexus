
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

// Updated category images mapping with unique, relevant images for each category
const getCategoryImage = (category: string) => {
  const categoryImages: { [key: string]: string } = {
    'Web Development': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop',
    'Mobile App Development': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
    'Game Development': 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&h=400&fit=crop',
    'DevOps & Cloud': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    'UI/UX Design': 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop',
    'Graphic & Visual Design': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop',
    '3D Modeling & Animation': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
    'CAD & Engineering': 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop',
    'Writing & Content': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=400&fit=crop',
    'Copywriting & Marketing': 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&h=400&fit=crop',
    'Technical Writing': 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop',
    'Video & Media Production': 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop',
    'Audio & Music': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
    'Photography & Image Editing': 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&h=400&fit=crop',
    'Translation & Localization': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    'Data & Administrative': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    'Social Media & Digital Marketing': 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    'Sales & Marketing Automation': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    'Legal & Financial Services': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop',
    'Emerging Technologies': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop',
    'Security & Quality Assurance': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop',
    'Business & CRM': 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop',
    'HR & Recruitment': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop',
    'Customer Service & Support': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
    'E-commerce & Online Business': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop'
  };
  return categoryImages[category] || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop';
};

// Enhanced mock freelancer data
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
  },
  {
    id: '4',
    name: 'David Kim',
    primarySkill: 'Data Science',
    skills: ['Python', 'Machine Learning', 'SQL', 'Tableau'],
    hourlyRate: 85,
    currency: 'USD',
    availability: 'Full-time',
    experience: 'expert',
    bio: 'Data scientist with expertise in machine learning and statistical analysis. Helping businesses make data-driven decisions.',
    country: 'South Korea',
    workArrangement: 'Remote Only',
    serviceDelivery: 'Digital/Online',
    rating: 4.9,
    reviewCount: 94,
    completedProjects: 67,
    responseTime: '3 hours',
    languages: ['Korean', 'English']
  },
  {
    id: '5',
    name: 'Emma Thompson',
    primarySkill: 'Content Writing',
    skills: ['SEO Writing', 'Blog Writing', 'Copywriting'],
    hourlyRate: 35,
    currency: 'USD',
    availability: 'Part-time',
    experience: 'intermediate',
    bio: 'Professional content writer with 4 years of experience creating engaging content for various industries.',
    country: 'United Kingdom',
    workArrangement: 'Remote Only',
    serviceDelivery: 'Digital/Online',
    rating: 4.6,
    reviewCount: 112,
    completedProjects: 203,
    responseTime: '6 hours',
    languages: ['English']
  }
];

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

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Categories Grid */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Browse by Skill Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.keys(FREELANCER_SKILL_CATEGORIES).map((category) => (
            <Card 
              key={category} 
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden"
              onClick={() => setSelectedCategory(category)}
            >
              <div className="relative h-48">
                <img 
                  src={getCategoryImage(category)} 
                  alt={category}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg leading-tight mb-2">{category}</h3>
                  <p className="text-white/80 text-sm">
                    {FREELANCER_SKILL_CATEGORIES[category as keyof typeof FREELANCER_SKILL_CATEGORIES].length} skills available
                  </p>
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
