
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, Filter, MapPin, Building2, Users, Star, 
  Globe, Phone, Mail, Calendar, TrendingUp, Award
} from 'lucide-react';

// Comprehensive list of countries
const countries = [
  'All Countries', 'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 
  'Italy', 'Spain', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Sweden', 
  'Norway', 'Denmark', 'Finland', 'Poland', 'Czech Republic', 'Hungary', 'Portugal',
  'Australia', 'New Zealand', 'Japan', 'South Korea', 'Singapore', 'Hong Kong',
  'China', 'India', 'Brazil', 'Mexico', 'Argentina', 'Chile', 'Colombia', 'Peru',
  'South Africa', 'Nigeria', 'Kenya', 'Egypt', 'Morocco', 'Israel', 'UAE', 'Saudi Arabia',
  'Russia', 'Ukraine', 'Turkey', 'Greece', 'Ireland', 'Luxembourg', 'Iceland'
];

// Comprehensive business categories
const businessCategories = [
  'All Categories',
  'Technology & Software',
  'Digital Marketing & Advertising',
  'E-commerce & Retail',
  'Financial Services & Fintech',
  'Healthcare & Medical',
  'Education & Training',
  'Consulting & Professional Services',
  'Real Estate & Property',
  'Manufacturing & Industrial',
  'Food & Beverage',
  'Travel & Hospitality',
  'Media & Entertainment',
  'Fashion & Beauty',
  'Automotive',
  'Energy & Utilities',
  'Agriculture & Farming',
  'Construction & Architecture',
  'Legal Services',
  'Transportation & Logistics',
  'Sports & Recreation',
  'Non-profit & Social Impact',
  'Arts & Creative Services',
  'Home & Garden',
  'Pet Services',
  'Event Planning & Management'
];

// Mock business data
const mockBusinesses = [
  {
    id: '1',
    name: 'TechFlow Solutions',
    category: 'Technology & Software',
    country: 'United States',
    description: 'Leading software development company specializing in AI and machine learning solutions.',
    rating: 4.8,
    employees: '50-200',
    founded: 2018,
    verified: true,
    services: ['AI Development', 'Web Applications', 'Mobile Apps'],
    location: 'San Francisco, CA'
  },
  {
    id: '2',
    name: 'GreenEnergy Innovations',
    category: 'Energy & Utilities',
    country: 'Germany',
    description: 'Sustainable energy solutions provider focusing on solar and wind power installations.',
    rating: 4.9,
    employees: '200-500',
    founded: 2015,
    verified: true,
    services: ['Solar Installation', 'Wind Power', 'Energy Consulting'],
    location: 'Berlin, Germany'
  },
  {
    id: '3',
    name: 'Digital Marketing Pro',
    category: 'Digital Marketing & Advertising',
    country: 'United Kingdom',
    description: 'Full-service digital marketing agency helping businesses grow their online presence.',
    rating: 4.6,
    employees: '10-50',
    founded: 2020,
    verified: true,
    services: ['SEO', 'Social Media Marketing', 'PPC Advertising'],
    location: 'London, UK'
  },
  {
    id: '4',
    name: 'HealthTech Dynamics',
    category: 'Healthcare & Medical',
    country: 'Canada',
    description: 'Innovative healthcare technology solutions improving patient care and medical efficiency.',
    rating: 4.7,
    employees: '100-300',
    founded: 2017,
    verified: true,
    services: ['Medical Software', 'Telemedicine', 'Health Analytics'],
    location: 'Toronto, Canada'
  },
  {
    id: '5',
    name: 'EduFuture Learning',
    category: 'Education & Training',
    country: 'Australia',
    description: 'Online education platform providing professional development and certification courses.',
    rating: 4.5,
    employees: '20-100',
    founded: 2019,
    verified: false,
    services: ['Online Courses', 'Corporate Training', 'Certification Programs'],
    location: 'Sydney, Australia'
  }
];

interface AdvancedBusinessBrowserProps {
  onCreateBusiness?: () => void;
}

const AdvancedBusinessBrowser: React.FC<AdvancedBusinessBrowserProps> = ({ onCreateBusiness }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  const filteredBusinesses = mockBusinesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCountry = selectedCountry === 'All Countries' || business.country === selectedCountry;
    const matchesCategory = selectedCategory === 'All Categories' || business.category === selectedCategory;
    
    return matchesSearch && matchesCountry && matchesCategory;
  });

  const sortedBusinesses = [...filteredBusinesses].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'founded':
        return b.founded - a.founded;
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Explore Global Businesses
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover innovative companies, connect with industry leaders, and find business opportunities worldwide
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="border-2 border-blue-100">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search businesses by name, description, or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg border-2 focus:border-blue-500"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
              <div className="text-sm text-gray-600">
                Found {sortedBusinesses.length} businesses
              </div>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {businessCategories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="founded">Founded Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCountry('All Countries');
                      setSelectedCategory('All Categories');
                      setSortBy('rating');
                    }}
                    className="w-full"
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Business Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedBusinesses.map((business) => (
          <Card key={business.id} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-xl text-blue-900">{business.name}</CardTitle>
                    {business.verified && (
                      <Badge className="bg-green-500 text-white">
                        <Award className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {business.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Founded {business.founded}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{business.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Badge variant="outline" className="mb-2">{business.category}</Badge>
                <p className="text-gray-700 leading-relaxed">{business.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Services</h4>
                <div className="flex flex-wrap gap-2">
                  {business.services.map((service, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {business.employees}
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    {business.country}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Connect
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {sortedBusinesses.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No businesses found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search criteria or filters</p>
            <Button onClick={() => {
              setSearchTerm('');
              setSelectedCountry('All Countries');
              setSelectedCategory('All Categories');
            }}>
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
        <CardContent className="text-center py-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Join the Network?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Connect with thousands of businesses worldwide. Create your business profile and start networking today.
          </p>
          <Button 
            onClick={onCreateBusiness}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Building2 className="h-5 w-5 mr-2" />
            Create Business Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedBusinessBrowser;
