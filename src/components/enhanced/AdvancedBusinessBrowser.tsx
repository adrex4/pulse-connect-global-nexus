
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, Filter, MapPin, Building2, Users, Star, 
  Globe, Phone, Mail, Calendar, TrendingUp, Award,
  MessageSquare, Eye, Facebook, Twitter, Instagram,
  Linkedin, Youtube, Play, Image
} from 'lucide-react';
import { WORLD_COUNTRIES } from '@/data/worldCountries';
import { BUSINESS_TYPES } from '@/data/businessTypes';

// Enhanced sorting options
const sortingOptions = [
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'founded', label: 'Newest First' },
  { value: 'employees', label: 'Company Size' },
  { value: 'reviews', label: 'Most Reviewed' },
  { value: 'verified', label: 'Verified First' },
  { value: 'location', label: 'Location' },
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'trending', label: 'Trending Now' },
  { value: 'industry', label: 'Industry Leader' }
];

// Enhanced mock business data with media and social links
const mockBusinesses = [
  {
    id: '1',
    name: 'TechFlow Solutions',
    category: 'Technology & Software',
    country: 'United States',
    description: 'Leading software development company specializing in AI and machine learning solutions for enterprise clients worldwide.',
    rating: 4.8,
    employees: '50-200',
    founded: 2018,
    verified: true,
    reviewCount: 156,
    services: ['AI Development', 'Web Applications', 'Mobile Apps', 'Cloud Solutions'],
    location: 'San Francisco, CA',
    website: 'https://techflow.com',
    email: 'contact@techflow.com',
    phone: '+1 (555) 123-4567',
    socialMedia: {
      facebook: 'https://facebook.com/techflow',
      twitter: 'https://twitter.com/techflow',
      linkedin: 'https://linkedin.com/company/techflow',
      instagram: 'https://instagram.com/techflow'
    },
    media: {
      images: [
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400'
      ],
      videos: ['https://example.com/video1.mp4']
    }
  },
  {
    id: '2',
    name: 'GreenEnergy Innovations',
    category: 'Energy & Utilities',
    country: 'Germany',
    description: 'Sustainable energy solutions provider focusing on solar and wind power installations for residential and commercial properties.',
    rating: 4.9,
    employees: '200-500',
    founded: 2015,
    verified: true,
    reviewCount: 203,
    services: ['Solar Installation', 'Wind Power', 'Energy Consulting', 'Battery Storage'],
    location: 'Berlin, Germany',
    website: 'https://greenenergy.de',
    email: 'info@greenenergy.de',
    phone: '+49 30 12345678',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/greenenergy',
      youtube: 'https://youtube.com/greenenergy'
    },
    media: {
      images: [
        'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400',
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400'
      ],
      videos: []
    }
  },
  {
    id: '3',
    name: 'Digital Marketing Pro',
    category: 'Digital Marketing & Advertising',
    country: 'United Kingdom',
    description: 'Full-service digital marketing agency helping businesses grow their online presence through innovative strategies and data-driven campaigns.',
    rating: 4.6,
    employees: '10-50',
    founded: 2020,
    verified: true,
    reviewCount: 89,
    services: ['SEO', 'Social Media Marketing', 'PPC Advertising', 'Content Strategy'],
    location: 'London, UK',
    website: 'https://digitalmarketingpro.co.uk',
    email: 'hello@digitalmarketingpro.co.uk',
    phone: '+44 20 7123 4567',
    socialMedia: {
      facebook: 'https://facebook.com/digitalmarketingpro',
      twitter: 'https://twitter.com/dmprouk',
      linkedin: 'https://linkedin.com/company/digital-marketing-pro',
      instagram: 'https://instagram.com/digitalmarketingpro'
    },
    media: {
      images: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400'
      ],
      videos: ['https://example.com/demo-video.mp4']
    }
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
      case 'employees':
        return b.employees.localeCompare(a.employees);
      case 'reviews':
        return b.reviewCount - a.reviewCount;
      case 'verified':
        return (b.verified ? 1 : 0) - (a.verified ? 1 : 0);
      default:
        return 0;
    }
  });

  const handleDirectMessage = (business: any) => {
    console.log('Opening direct message with:', business.name);
    // Navigate to direct messaging interface
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // This would typically navigate to a direct messaging component
  };

  const handleViewProfile = (business: any) => {
    console.log('Viewing full profile for:', business.name);
    // Navigate to full business profile page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // This would typically navigate to the full business profile page
  };

  const handleCreateBusinessProfile = () => {
    if (onCreateBusiness) {
      onCreateBusiness();
      // Auto-scroll to top to find exact location to start
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

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
        
        {/* First Create Business Profile Button */}
        <div className="pt-4">
          <Button 
            onClick={handleCreateBusinessProfile}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Building2 className="h-5 w-5 mr-2" />
            Create Business Profile
          </Button>
        </div>
      </div>

      {/* Always Visible Filters */}
      <Card className="border-2 border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search businesses by name, description, or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg border-2 focus:border-blue-500 bg-white"
              />
            </div>

            {/* Enhanced Filters - Always Visible */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-blue-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="bg-white border-2 focus:border-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Countries">All Countries</SelectItem>
                    {WORLD_COUNTRIES.map(country => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-white border-2 focus:border-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Categories">All Categories</SelectItem>
                    {BUSINESS_TYPES.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-white border-2 focus:border-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortingOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
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
                  className="w-full bg-white hover:bg-gray-50 border-2"
                >
                  Reset Filters
                </Button>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600">
              Found {sortedBusinesses.length} businesses
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedBusinesses.map((business) => (
          <Card key={business.id} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
            <CardHeader className="pb-3 bg-gradient-to-r from-blue-600/5 to-purple-600/5">
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
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      {business.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-purple-600" />
                      Founded {business.founded}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-yellow-700">{business.rating}</span>
                  <span className="text-sm text-yellow-600">({business.reviewCount})</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <Badge variant="outline" className="mb-2 bg-blue-50 text-blue-700 border-blue-200">{business.category}</Badge>
                <p className="text-gray-700 leading-relaxed">{business.description}</p>
              </div>

              {/* Media Section */}
              {(business.media.images.length > 0 || business.media.videos.length > 0) && (
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Image className="h-4 w-4 text-blue-600" />
                    Media Gallery
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {business.media.images.map((image, index) => (
                      <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-white shadow-sm">
                        <img 
                          src={image} 
                          alt={`${business.name} image ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                        />
                      </div>
                    ))}
                    {business.media.videos.map((video, index) => (
                      <div key={index} className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer hover:from-blue-200 hover:to-purple-200 transition-colors border-2 border-white shadow-sm">
                        <Play className="h-8 w-8 text-blue-600" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Services */}
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-gray-800 mb-2">Services</h4>
                <div className="flex flex-wrap gap-2">
                  {business.services.map((service, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-purple-100 text-purple-700 border border-purple-200">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Contact & Social Media */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-gray-800 mb-3">Contact & Social</h4>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-blue-600" />
                    <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate">
                      Website
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-600 truncate">{business.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-600">{business.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-600">{business.employees} employees</span>
                  </div>
                </div>
                
                {/* Social Media Links */}
                <div className="flex gap-2">
                  {business.socialMedia.facebook && (
                    <a href={business.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="p-2 hover:bg-blue-50 hover:border-blue-300">
                        <Facebook className="h-4 w-4 text-blue-600" />
                      </Button>
                    </a>
                  )}
                  {business.socialMedia.twitter && (
                    <a href={business.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="p-2 hover:bg-blue-50 hover:border-blue-300">
                        <Twitter className="h-4 w-4 text-blue-500" />
                      </Button>
                    </a>
                  )}
                  {business.socialMedia.linkedin && (
                    <a href={business.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="p-2 hover:bg-blue-50 hover:border-blue-300">
                        <Linkedin className="h-4 w-4 text-blue-700" />
                      </Button>
                    </a>
                  )}
                  {business.socialMedia.instagram && (
                    <a href={business.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="p-2 hover:bg-pink-50 hover:border-pink-300">
                        <Instagram className="h-4 w-4 text-pink-600" />
                      </Button>
                    </a>
                  )}
                  {business.socialMedia.youtube && (
                    <a href={business.socialMedia.youtube} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="p-2 hover:bg-red-50 hover:border-red-300">
                        <Youtube className="h-4 w-4 text-red-600" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDirectMessage(business)}
                  className="flex-1 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Message
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => handleViewProfile(business)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {sortedBusinesses.length === 0 && (
        <Card className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50">
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
            onClick={handleCreateBusinessProfile}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
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
