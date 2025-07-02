
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, MapPin, Users, Star, Phone, Mail, Clock, 
  Home, Wrench, Car, Scissors, Camera, Coffee,
  MessageSquare, Eye, ExternalLink
} from 'lucide-react';
import { WORLD_COUNTRIES } from '@/data/worldCountries';

// Enhanced local service categories
const serviceCategories = [
  'Home Services',
  'Automotive',
  'Beauty & Personal Care',
  'Health & Wellness',
  'Professional Services',
  'Event Services',
  'Pet Services',
  'Education & Tutoring',
  'Technology Services',
  'Cleaning Services'
];

const sortingOptions = [
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'location', label: 'Nearest First' },
  { value: 'price', label: 'Lowest Price' },
  { value: 'reviews', label: 'Most Reviewed' },
  { value: 'verified', label: 'Verified First' },
  { value: 'availability', label: 'Available Now' }
];

// Enhanced mock local service providers
const mockLocalServices = [
  {
    id: '1',
    name: 'Mike\'s Plumbing Pro',
    category: 'Home Services',
    occupation: 'Plumber',
    country: 'United States',
    location: 'New York, NY',
    description: 'Professional plumbing services with 15+ years experience. Emergency repairs, installations, and maintenance for residential and commercial properties.',
    rating: 4.9,
    reviewCount: 127,
    verified: true,
    hourlyRate: 85,
    availability: 'Available Today',
    services: ['Emergency Repairs', 'Pipe Installation', 'Drain Cleaning', 'Water Heater Service'],
    phone: '+1 (555) 123-4567',
    email: 'mike@mikesplumbing.com',
    serviceArea: '25 miles radius',
    experience: '15+ years',
    certifications: ['Licensed Plumber', 'Bonded & Insured'],
    responseTime: 'Within 2 hours',
    portfolio: [
      { type: 'image', title: 'Kitchen Renovation Plumbing', description: 'Complete kitchen plumbing installation' },
      { type: 'image', title: 'Emergency Pipe Repair', description: 'Fast emergency repair service' }
    ]
  },
  {
    id: '2',
    name: 'Sarah\'s Mobile Salon',
    category: 'Beauty & Personal Care',
    occupation: 'Hair Stylist',
    country: 'United Kingdom',
    location: 'London, UK',
    description: 'Professional mobile hair styling services. I bring the salon experience to your home with top-quality products and personalized service.',
    rating: 4.8,
    reviewCount: 89,
    verified: true,
    hourlyRate: 65,
    availability: 'Available This Week',
    services: ['Hair Cuts', 'Hair Color', 'Styling', 'Special Events'],
    phone: '+44 20 7123 4567',
    email: 'sarah@sarahssalon.co.uk',
    serviceArea: 'Greater London',
    experience: '8+ years',
    certifications: ['Certified Colorist', 'Bridal Specialist'],
    responseTime: 'Same day',
    portfolio: [
      { type: 'image', title: 'Bridal Hair Styling', description: 'Beautiful bridal hair for special day' },
      { type: 'image', title: 'Hair Color Transformation', description: 'Complete color makeover' }
    ]
  },
  {
    id: '3',
    name: 'AutoCare Express',
    category: 'Automotive',
    occupation: 'Mobile Mechanic',
    country: 'Canada',
    location: 'Toronto, ON',
    description: 'Mobile automotive repair and maintenance services. We come to you for convenient, professional car care at your location.',
    rating: 4.7,
    reviewCount: 156,
    verified: true,
    hourlyRate: 95,
    availability: 'Available Tomorrow',
    services: ['Oil Changes', 'Brake Service', 'Diagnostics', 'Tire Service'],
    phone: '+1 (416) 555-0123',
    email: 'service@autocareexpress.ca',
    serviceArea: 'GTA and surrounding areas',
    experience: '12+ years',
    certifications: ['ASE Certified', 'Mobile Service Licensed'],
    responseTime: 'Within 24 hours',
    portfolio: [
      { type: 'image', title: 'Mobile Brake Service', description: 'Professional brake repair on-site' },
      { type: 'image', title: 'Engine Diagnostics', description: 'Advanced diagnostic equipment' }
    ]
  }
];

const getServiceIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'home services': return <Home className="h-5 w-5" />;
    case 'automotive': return <Car className="h-5 w-5" />;
    case 'beauty & personal care': return <Scissors className="h-5 w-5" />;
    case 'professional services': return <Coffee className="h-5 w-5" />;
    case 'technology services': return <Wrench className="h-5 w-5" />;
    default: return <Wrench className="h-5 w-5" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'home services': return 'from-blue-500 to-blue-600';
    case 'automotive': return 'from-red-500 to-red-600';
    case 'beauty & personal care': return 'from-pink-500 to-pink-600';
    case 'professional services': return 'from-purple-500 to-purple-600';
    case 'technology services': return 'from-green-500 to-green-600';
    default: return 'from-gray-500 to-gray-600';
  }
};

interface LocalServiceBrowserProps {
  onCreateProfile?: () => void;
  showFilters?: boolean;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

const LocalServiceBrowser: React.FC<LocalServiceBrowserProps> = ({ 
  onCreateProfile,
  showFilters = true,
  searchTerm = '',
  onSearchChange
}) => {
  const [internalSearchTerm, setInternalSearchTerm] = useState(searchTerm);
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('rating');
  const [showDirectMessage, setShowDirectMessage] = useState<any>(null);
  const [showFullProfile, setShowFullProfile] = useState<any>(null);

  const effectiveSearchTerm = onSearchChange ? searchTerm : internalSearchTerm;

  const handleSearchChange = (value: string) => {
    if (onSearchChange) {
      onSearchChange(value);
    } else {
      setInternalSearchTerm(value);
    }
  };

  const filteredServices = mockLocalServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(effectiveSearchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(effectiveSearchTerm.toLowerCase()) ||
      service.occupation.toLowerCase().includes(effectiveSearchTerm.toLowerCase()) ||
      service.services.some(s => s.toLowerCase().includes(effectiveSearchTerm.toLowerCase()));
    
    const matchesCountry = selectedCountry === 'All Countries' || service.country === selectedCountry;
    const matchesCategory = selectedCategory === 'All Categories' || service.category === selectedCategory;
    
    return matchesSearch && matchesCountry && matchesCategory;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.hourlyRate - b.hourlyRate;
      case 'reviews':
        return b.reviewCount - a.reviewCount;
      case 'verified':
        return (b.verified ? 1 : 0) - (a.verified ? 1 : 0);
      default:
        return 0;
    }
  });

  const handleDirectMessage = (service: any) => {
    setShowDirectMessage(service);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewProfile = (service: any) => {
    setShowFullProfile(service);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Direct Message View
  if (showDirectMessage) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl flex items-center gap-3">
                <MessageSquare className="h-8 w-8" />
                Contact {showDirectMessage.name}
              </CardTitle>
              <Button 
                variant="ghost" 
                onClick={() => setShowDirectMessage(null)}
                className="text-white hover:bg-white/20"
              >
                Back to Browse
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-semibold text-green-900 mb-2">Request Service</h3>
                <p className="text-green-700 mb-4">
                  Contact {showDirectMessage.name} to discuss your service needs and get a quote.
                </p>
                <div className="space-y-4">
                  <textarea 
                    className="w-full p-4 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    rows={4}
                    placeholder={`Describe your service needs to ${showDirectMessage.name}...`}
                  />
                  <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    Send Message
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-3">Service Info</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Category:</span> {showDirectMessage.category}</p>
                    <p><span className="font-medium">Service Area:</span> {showDirectMessage.serviceArea}</p>
                    <p><span className="font-medium">Rate:</span> ${showDirectMessage.hourlyRate}/hour</p>
                    <p><span className="font-medium">Response Time:</span> {showDirectMessage.responseTime}</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-3">Contact Info</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Phone:</span> {showDirectMessage.phone}</p>
                    <p><span className="font-medium">Email:</span> {showDirectMessage.email}</p>
                    <p><span className="font-medium">Availability:</span> {showDirectMessage.availability}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Full Profile View
  if (showFullProfile) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl flex items-center gap-3">
                  {getServiceIcon(showFullProfile.category)}
                  {showFullProfile.name}
                </CardTitle>
                <p className="text-green-100 mt-2">{showFullProfile.occupation} • {showFullProfile.category}</p>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => setShowFullProfile(null)}
                className="text-white hover:bg-white/20"
              >
                Back to Browse
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* About Section */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                    <h3 className="text-2xl font-semibold text-green-900 mb-4">About {showFullProfile.name}</h3>
                    <p className="text-green-800 leading-relaxed">{showFullProfile.description}</p>
                  </div>

                  {/* Services Offered */}
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Services Offered</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {showFullProfile.services.map((service: string, index: number) => (
                        <div key={index} className="bg-white p-4 rounded-lg border border-blue-300 shadow-sm">
                          <p className="font-medium text-blue-800">{service}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Portfolio */}
                  <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                    <h3 className="text-xl font-semibold text-purple-900 mb-4">Work Portfolio</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {showFullProfile.portfolio.map((item: any, index: number) => (
                        <div key={index} className="bg-white p-4 rounded-lg border border-purple-300 shadow-sm">
                          <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg mb-3 flex items-center justify-center">
                            <Camera className="h-12 w-12 text-purple-600" />
                          </div>
                          <h4 className="font-medium text-purple-800 mb-1">{item.title}</h4>
                          <p className="text-sm text-purple-600">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Contact & Rating */}
                  <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <div className="flex items-center justify-center gap-1 mb-2">
                          <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                          <span className="text-2xl font-bold text-yellow-700">{showFullProfile.rating}</span>
                        </div>
                        <p className="text-yellow-600">({showFullProfile.reviewCount} reviews)</p>
                        <p className="text-lg font-semibold text-orange-700 mt-2">${showFullProfile.hourlyRate}/hour</p>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-orange-600" />
                          <span className="text-orange-700">{showFullProfile.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-orange-600" />
                          <span className="text-orange-700">{showFullProfile.availability}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Service Details */}
                  <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-blue-900 mb-4">Service Details</h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-medium text-blue-800">Service Area:</span>
                          <p className="text-blue-700">{showFullProfile.serviceArea}</p>
                        </div>
                        <div>
                          <span className="font-medium text-blue-800">Experience:</span>
                          <p className="text-blue-700">{showFullProfile.experience}</p>
                        </div>
                        <div>
                          <span className="font-medium text-blue-800">Response Time:</span>
                          <p className="text-blue-700">{showFullProfile.responseTime}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Certifications */}
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-green-900 mb-4">Certifications</h4>
                      <div className="space-y-2">
                        {showFullProfile.certifications.map((cert: string, index: number) => (
                          <Badge key={index} className="bg-green-100 text-green-800 border border-green-300">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button 
                      onClick={() => handleDirectMessage(showFullProfile)}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Request Service
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

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Local Service Providers
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find trusted local professionals for all your service needs - from home repairs to personal care
        </p>
        
        {onCreateProfile && (
          <div className="pt-4">
            <Button 
              onClick={onCreateProfile}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Users className="h-5 w-5 mr-2" />
              Become a Service Provider
            </Button>
          </div>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <Card className="border-2 border-green-100 bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search services by name, type, or location..."
                  value={effectiveSearchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10 h-12 text-lg border-2 focus:border-green-500 bg-white"
                />
              </div>

              {/* Filter Controls */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-green-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger className="bg-white border-2 focus:border-green-500">
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
                    <SelectTrigger className="bg-white border-2 focus:border-green-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Categories">All Categories</SelectItem>
                      {serviceCategories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="bg-white border-2 focus:border-green-500">
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
                      handleSearchChange('');
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
                Found {sortedServices.length} service providers
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Service Providers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedServices.map((service) => (
          <Card key={service.id} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-green-300 bg-gradient-to-br from-white via-green-50/30 to-blue-50/30">
            <CardHeader className="pb-3 bg-gradient-to-r from-green-600/5 to-blue-600/5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(service.category)} text-white`}>
                      {getServiceIcon(service.category)}
                    </div>
                    <div>
                      <CardTitle className="text-xl text-green-900">{service.name}</CardTitle>
                      <p className="text-sm text-gray-600">{service.occupation}</p>
                    </div>
                    {service.verified && (
                      <Badge className="bg-green-500 text-white">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-green-600" />
                      {service.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-blue-600" />
                      {service.availability}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-yellow-700">{service.rating}</span>
                    <span className="text-sm text-yellow-600">({service.reviewCount})</span>
                  </div>
                  <p className="text-lg font-bold text-green-700">${service.hourlyRate}/hr</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <Badge variant="outline" className="mb-2 bg-green-50 text-green-700 border-green-200">{service.category}</Badge>
                <p className="text-gray-700 leading-relaxed">{service.description}</p>
              </div>

              {/* Services */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-800 mb-2">Services</h4>
                <div className="flex flex-wrap gap-2">
                  {service.services.map((serviceItem, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-700 border border-blue-200">
                      {serviceItem}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-gray-800 mb-3">Service Details</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-green-600" />
                    <span className="text-gray-600 truncate">{service.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-green-600" />
                    <span className="text-gray-600 truncate">{service.email}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium text-green-800">Service Area:</span>
                    <span className="text-gray-600 ml-2">{service.serviceArea}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium text-green-800">Response Time:</span>
                    <span className="text-gray-600 ml-2">{service.responseTime}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDirectMessage(service)}
                  className="flex-1 hover:bg-green-50 hover:border-green-300 hover:text-green-700"
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Contact
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => handleViewProfile(service)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
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
      {sortedServices.length === 0 && (
        <Card className="text-center py-12 bg-gradient-to-br from-gray-50 to-green-50">
          <CardContent>
            <Wrench className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No service providers found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search criteria or filters</p>
            <Button onClick={() => {
              handleSearchChange('');
              setSelectedCountry('All Countries');
              setSelectedCategory('All Categories');
            }}>
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Call to Action */}
      {onCreateProfile && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
          <CardContent className="text-center py-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Offer Your Services?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of local service providers and connect with customers in your area.
            </p>
            <Button 
              onClick={onCreateProfile}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Users className="h-5 w-5 mr-2" />
              Become a Service Provider
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LocalServiceBrowser;
