import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, Filter, MapPin, Star, DollarSign, Clock, 
  Users, Briefcase, Globe, ArrowLeft, MessageCircle, FolderOpen, Send
} from 'lucide-react';
import FreelancerProfile from './FreelancerProfile';
import { FREELANCER_SKILL_CATEGORIES } from '@/data/freelancerSkills';
import { COUNTRIES } from '@/data/countries';
import { useToast } from '@/hooks/use-toast';

interface FreelancerMarketplaceProps {
  onBack?: () => void;
}

// Niche header images for freelancer categories
const FREELANCER_NICHE_IMAGES = {
  'Technology': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=400&fit=crop',
  'Design & Creative': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=400&fit=crop',
  'Writing & Translation': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=400&fit=crop',
  'Business & Finance': 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=400&fit=crop',
  'Marketing & Sales': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=400&fit=crop',
  'Education & Training': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=400&fit=crop'
};

// Mock freelancer data with portfolio
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
    languages: ['English', 'Mandarin'],
    portfolio: [
      { title: 'E-commerce Platform', description: 'React-based shopping platform with 10k+ users', url: '#' },
      { title: 'Task Management App', description: 'Full-stack productivity tool', url: '#' }
    ]
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
    languages: ['English', 'Spanish'],
    portfolio: [
      { title: 'Brand Identity Package', description: 'Complete rebrand for tech startup', url: '#' },
      { title: 'Marketing Materials', description: 'Print and digital marketing suite', url: '#' }
    ]
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
    languages: ['Spanish', 'English'],
    portfolio: [
      { title: 'Weight Loss Program', description: 'Custom 12-week transformation plan', url: '#' },
      { title: 'Nutrition Guide', description: 'Comprehensive meal planning system', url: '#' }
    ]
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
  const [messageOpen, setMessageOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const { toast } = useToast();

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
      description: `Your message has been sent to ${selectedFreelancer?.name}.`
    });
    setMessageText('');
    setMessageOpen(false);
  };

  const getHeaderImage = () => {
    if (selectedCategory === 'all_categories') {
      return 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=400&fit=crop';
    }
    return FREELANCER_NICHE_IMAGES[selectedCategory as keyof typeof FREELANCER_NICHE_IMAGES] || 
           'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=400&fit=crop';
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
          onContact={() => setMessageOpen(true)}
          onHire={() => setPortfolioOpen(true)}
        />

        {/* Message Modal */}
        <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                Send Message to {selectedFreelancer?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Write your message here..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="min-h-[120px]"
              />
              <div className="flex gap-2">
                <Button onClick={handleSendMessage} className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" onClick={() => setMessageOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Portfolio Modal */}
        <Dialog open={portfolioOpen} onOpenChange={setPortfolioOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-green-600" />
                {selectedFreelancer?.name}'s Portfolio
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedFreelancer?.portfolio?.map((item: any, index: number) => (
                <Card key={index} className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <Button variant="outline" size="sm">
                      <Globe className="h-4 w-4 mr-2" />
                      View Project
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto animate-fade-in">
      {/* Header with Dynamic Background */}
      <Card className="mb-6 shadow-lg border-0 bg-white overflow-hidden">
        <div 
          className="h-32 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${getHeaderImage()})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              )}
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-white" />
                <CardTitle className="text-2xl text-white">Freelancer Marketplace</CardTitle>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {filteredFreelancers.length} Professionals Available
            </Badge>
          </div>
        </div>
        
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
            <Card key={freelancer.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-green-500 cursor-pointer">
              <CardContent className="p-6" onClick={() => setSelectedFreelancer(freelancer)}>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {freelancer.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-xl text-gray-900">{freelancer.name}</h3>
                      {freelancer.rating && (
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="font-medium">{freelancer.rating}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-green-600 font-semibold text-lg mb-3">{freelancer.primarySkill}</p>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{freelancer.bio}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{freelancer.country}</span>
                      </div>
                      {freelancer.hourlyRate && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-medium">{freelancer.hourlyRate} {freelancer.currency}/hr</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{freelancer.responseTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-green-600 text-white">
                        {freelancer.primarySkill}
                      </Badge>
                      {freelancer.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                      {freelancer.skills.length > 3 && (
                        <Badge variant="outline">
                          +{freelancer.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button 
                      variant="outline" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFreelancer(freelancer);
                        setMessageOpen(true);
                      }}
                      className="min-w-[120px]"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFreelancer(freelancer);
                        setPortfolioOpen(true);
                      }}
                      className="min-w-[120px] bg-green-600 hover:bg-green-700"
                    >
                      <FolderOpen className="h-4 w-4 mr-2" />
                      View Portfolio
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default FreelancerMarketplace;
