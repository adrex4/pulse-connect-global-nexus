
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Wrench, 
  MapPin, 
  Star, 
  Phone, 
  Clock, 
  DollarSign, 
  Search,
  Filter,
  Home,
  Car,
  Scissors,
  Hammer,
  Camera,
  Users,
  ArrowRight,
  Zap,
  Trees,
  Paintbrush,
  HeartHandshake,
  GraduationCap,
  Shield,
  Utensils,
  Baby,
  Heart,
  Music
} from 'lucide-react';

interface LocalServicesBrowserProps {
  onCreateProfile: () => void;
}

const LocalServicesBrowser: React.FC<LocalServicesBrowserProps> = ({ onCreateProfile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  // Expanded service providers data with global locations
  const serviceProviders = [
    {
      id: '1',
      name: 'Mike\'s Plumbing Services',
      category: 'Home Services',
      service: 'Plumbing',
      location: 'Downtown, New York, USA',
      country: 'United States',
      city: 'New York',
      rating: 4.8,
      reviews: 127,
      hourlyRate: 85,
      currency: 'USD',
      availability: 'Available today',
      verified: true,
      image: '/placeholder.svg',
      specialties: ['Emergency Repairs', '24/7 Service', 'Licensed & Insured'],
      description: 'Professional plumbing services with over 15 years of experience. Specializing in emergency repairs, installations, and maintenance.',
      phone: '+1-555-0123',
      experience: '15 years',
      languages: ['English', 'Spanish']
    },
    {
      id: '2',
      name: 'Sarah\'s Mobile Hair Salon',
      category: 'Beauty & Wellness',
      service: 'Hair Styling',
      location: 'Brooklyn, New York, USA',
      country: 'United States',
      city: 'New York',
      rating: 4.9,
      reviews: 89,
      hourlyRate: 65,
      currency: 'USD',
      availability: 'Next available: Tomorrow',
      verified: true,
      image: '/placeholder.svg',
      specialties: ['Bridal Hair', 'Color Specialist', 'Mobile Service'],
      description: 'Mobile hair styling service bringing salon-quality treatments to your doorstep. Certified colorist and bridal specialist.',
      phone: '+1-555-0124',
      experience: '8 years',
      languages: ['English']
    },
    {
      id: '3',
      name: 'London Electrical Solutions',
      category: 'Home Services',
      service: 'Electrical Work',
      location: 'Westminster, London, UK',
      country: 'United Kingdom',
      city: 'London',
      rating: 4.7,
      reviews: 203,
      hourlyRate: 70,
      currency: 'GBP',
      availability: 'Available this week',
      verified: true,
      image: '/placeholder.svg',
      specialties: ['Rewiring', 'Smart Home Installation', 'Emergency Call-outs'],
      description: 'Certified electrician providing comprehensive electrical services across London. Specializing in modern smart home installations.',
      phone: '+44-20-7946-0958',
      experience: '12 years',
      languages: ['English']
    },
    {
      id: '4',
      name: 'Toronto Garden Masters',
      category: 'Home Services',
      service: 'Landscaping',
      location: 'Downtown, Toronto, Canada',
      country: 'Canada',
      city: 'Toronto',
      rating: 4.6,
      reviews: 156,
      hourlyRate: 55,
      currency: 'CAD',
      availability: 'Available today',
      verified: false,
      image: '/placeholder.svg',
      specialties: ['Garden Design', 'Seasonal Cleanup', 'Tree Services'],
      description: 'Professional landscaping services transforming outdoor spaces. From design to maintenance, we handle all your garden needs.',
      phone: '+1-416-555-0789',
      experience: '10 years',
      languages: ['English', 'French']
    },
    {
      id: '5',
      name: 'Sydney Mobile Mechanics',
      category: 'Automotive',
      service: 'Car Repair',
      location: 'Bondi, Sydney, Australia',
      country: 'Australia',
      city: 'Sydney',
      rating: 4.5,
      reviews: 98,
      hourlyRate: 80,
      currency: 'AUD',
      availability: 'Available next week',
      verified: true,
      image: '/placeholder.svg',
      specialties: ['Mobile Service', 'Diagnostics', 'Brake Repair'],
      description: 'Mobile automotive repair service coming to your location. Full diagnostic capabilities and honest, transparent pricing.',
      phone: '+61-2-9876-5432',
      experience: '14 years',
      languages: ['English']
    },
    {
      id: '6',
      name: 'Berlin Tech Support',
      category: 'Technology',
      service: 'Computer Repair',
      location: 'Mitte, Berlin, Germany',
      country: 'Germany',
      city: 'Berlin',
      rating: 4.8,
      reviews: 167,
      hourlyRate: 60,
      currency: 'EUR',
      availability: 'Available today',
      verified: true,
      image: '/placeholder.svg',
      specialties: ['Laptop Repair', 'Data Recovery', 'Virus Removal'],
      description: 'Expert computer technician providing comprehensive IT support for homes and small businesses. Quick turnaround guaranteed.',
      phone: '+49-30-12345678',
      experience: '9 years',
      languages: ['German', 'English']
    },
    {
      id: '7',
      name: 'Mumbai Home Cleaning Co',
      category: 'Cleaning Services',
      service: 'House Cleaning',
      location: 'Bandra, Mumbai, India',
      country: 'India',
      city: 'Mumbai',
      rating: 4.4,
      reviews: 234,
      hourlyRate: 15,
      currency: 'INR',
      availability: 'Available today',
      verified: true,
      image: '/placeholder.svg',
      specialties: ['Deep Cleaning', 'Regular Maintenance', 'Eco-Friendly Products'],
      description: 'Professional cleaning service using eco-friendly products. Reliable, trustworthy team with flexible scheduling options.',
      phone: '+91-98765-43210',
      experience: '6 years',
      languages: ['Hindi', 'English', 'Marathi']
    },
    {
      id: '8',
      name: 'Tokyo Massage Therapy',
      category: 'Health & Fitness',
      service: 'Massage Therapy',
      location: 'Shibuya, Tokyo, Japan',
      country: 'Japan',
      city: 'Tokyo',
      rating: 4.9,
      reviews: 145,
      hourlyRate: 90,
      currency: 'JPY',
      availability: 'Available tomorrow',
      verified: true,
      image: '/placeholder.svg',
      specialties: ['Shiatsu', 'Deep Tissue', 'Relaxation'],
      description: 'Licensed massage therapist specializing in traditional Japanese techniques combined with modern therapeutic methods.',
      phone: '+81-3-1234-5678',
      experience: '11 years',
      languages: ['Japanese', 'English']
    }
  ];

  const categories = [
    'all', 
    'Home Services', 
    'Beauty & Wellness', 
    'Automotive', 
    'Technology',
    'Cleaning Services',
    'Health & Fitness',
    'Education & Tutoring',
    'Security Services',
    'Food & Catering',
    'Pet Services',
    'Entertainment'
  ];

  const countries = [
    'all',
    'United States',
    'United Kingdom', 
    'Canada',
    'Australia',
    'Germany',
    'India',
    'Japan',
    'France',
    'Brazil',
    'Mexico',
    'Italy',
    'Spain',
    'Netherlands',
    'Sweden'
  ];

  const filteredProviders = serviceProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || provider.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || provider.country === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const getServiceIcon = (service: string) => {
    switch (service.toLowerCase()) {
      case 'plumbing': return <Wrench className="h-5 w-5" />;
      case 'hair styling': return <Scissors className="h-5 w-5" />;
      case 'electrical work': return <Zap className="h-5 w-5" />;
      case 'landscaping': return <Trees className="h-5 w-5" />;
      case 'car repair': return <Car className="h-5 w-5" />;
      case 'computer repair': return <Camera className="h-5 w-5" />;
      case 'house cleaning': return <Home className="h-5 w-5" />;
      case 'massage therapy': return <Heart className="h-5 w-5" />;
      default: return <Wrench className="h-5 w-5" />;
    }
  };

  const getCurrencySymbol = (currency: string) => {
    const symbols: { [key: string]: string } = {
      'USD': '$',
      'GBP': '£',
      'EUR': '€',
      'CAD': 'C$',
      'AUD': 'A$',
      'INR': '₹',
      'JPY': '¥'
    };
    return symbols[currency] || currency;
  };

  // If viewing a specific provider profile
  if (selectedProvider) {
    const provider = serviceProviders.find(p => p.id === selectedProvider);
    if (!provider) return null;

    return (
      <div className="space-y-8">
        <Button 
          onClick={() => setSelectedProvider(null)}
          variant="outline"
          className="mb-4"
        >
          ← Back to Browse Providers
        </Button>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    {getServiceIcon(provider.service)}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{provider.name}</CardTitle>
                    <p className="text-orange-100 text-lg">{provider.service}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="h-4 w-4" />
                      <span>{provider.location}</span>
                    </div>
                  </div>
                </div>
                {provider.verified && (
                  <Badge className="bg-green-500 text-white">
                    <Shield className="h-4 w-4 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-8 space-y-8">
              {/* Rating and Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-bold">{provider.rating}</span>
                  </div>
                  <p className="text-gray-600">{provider.reviews} reviews</p>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5" />
                    <span className="text-2xl font-bold">
                      {getCurrencySymbol(provider.currency)}{provider.hourlyRate}
                    </span>
                  </div>
                  <p className="text-gray-600">per hour</p>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="h-5 w-5" />
                    <span className="text-lg font-bold">{provider.experience}</span>
                  </div>
                  <p className="text-gray-600">experience</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold mb-3">About</h3>
                <p className="text-gray-700 leading-relaxed">{provider.description}</p>
              </div>

              {/* Specialties */}
              <div>
                <h3 className="text-xl font-semibold mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {provider.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h3 className="text-xl font-semibold mb-3">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {provider.languages.map((language, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-800">Availability</h3>
                </div>
                <p className="text-green-700">{provider.availability}</p>
              </div>

              {/* Contact Actions */}
              <div className="flex gap-4 pt-4">
                <Button size="lg" className="flex-1 bg-orange-600 hover:bg-orange-700">
                  <Phone className="h-5 w-5 mr-2" />
                  Call {provider.phone}
                </Button>
                <Button size="lg" variant="outline" className="flex-1">
                  <Users className="h-5 w-5 mr-2" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Local Service Providers</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Find trusted local professionals for all your service needs. From home repairs to beauty services, connect with verified providers worldwide.
        </p>
      </div>

      {/* Service Categories Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg border border-orange-200">
          <div className="flex items-center gap-3 mb-3">
            <Home className="h-6 w-6 text-orange-600" />
            <h3 className="text-lg font-semibold text-orange-800">Home Services</h3>
          </div>
          <p className="text-orange-700 text-sm">Plumbing, electrical, cleaning, repairs, and more home maintenance services.</p>
        </div>
        
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-lg border border-pink-200">
          <div className="flex items-center gap-3 mb-3">
            <Scissors className="h-6 w-6 text-pink-600" />
            <h3 className="text-lg font-semibold text-pink-800">Beauty & Wellness</h3>
          </div>
          <p className="text-pink-700 text-sm">Hair styling, massage therapy, personal training, and wellness services.</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <Car className="h-6 w-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-800">Automotive</h3>
          </div>
          <p className="text-blue-700 text-sm">Car detailing, mobile mechanics, auto repair, and vehicle maintenance.</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
          <div className="flex items-center gap-3 mb-3">
            <Camera className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-semibold text-green-800">Technology</h3>
          </div>
          <p className="text-green-700 text-sm">Device repair, tech support, setup services, and IT solutions.</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for services or providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Countries" />
            </SelectTrigger>
            <SelectContent>
              {countries.map(country => (
                <SelectItem key={country} value={country}>
                  {country === 'all' ? 'All Countries' : country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            {filteredProviders.length} service providers found
          </p>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map(provider => (
            <Card key={provider.id} className="hover:shadow-lg transition-all duration-200 border-2 hover:border-orange-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getServiceIcon(provider.service)}
                    <div>
                      <CardTitle className="text-lg text-gray-800">{provider.name}</CardTitle>
                      <p className="text-sm text-orange-600 font-medium">{provider.service}</p>
                    </div>
                  </div>
                  {provider.verified && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                      Verified
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {provider.location}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{provider.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({provider.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-800">
                    <DollarSign className="h-4 w-4" />
                    {getCurrencySymbol(provider.currency)}{provider.hourlyRate}/hr
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">{provider.availability}</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {provider.specialties.slice(0, 2).map((specialty, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                  {provider.specialties.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{provider.specialties.length - 2} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-orange-600 hover:bg-orange-700"
                    onClick={() => setSelectedProvider(provider.id)}
                  >
                    View Profile
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Phone className="h-4 w-4 mr-1" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-4 py-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
        <h3 className="text-2xl font-semibold text-gray-800">Are you a Local Service Provider?</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join ConnectPulse and connect with customers worldwide. Create your profile and start growing your local business today.
        </p>
        <Button 
          onClick={onCreateProfile}
          size="lg"
          className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300 text-white font-medium"
        >
          <Users className="h-5 w-5 mr-2" />
          Create Service Provider Profile
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default LocalServicesBrowser;
