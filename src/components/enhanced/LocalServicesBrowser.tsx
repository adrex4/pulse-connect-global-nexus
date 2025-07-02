
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
  ArrowRight
} from 'lucide-react';

interface LocalServicesBrowserProps {
  onCreateProfile: () => void;
}

const LocalServicesBrowser: React.FC<LocalServicesBrowserProps> = ({ onCreateProfile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  // Sample local service providers data
  const serviceProviders = [
    {
      id: '1',
      name: 'Mike\'s Plumbing Services',
      category: 'Home Services',
      service: 'Plumbing',
      location: 'Downtown, New York',
      rating: 4.8,
      reviews: 127,
      hourlyRate: 85,
      availability: 'Available today',
      verified: true,
      image: '/placeholder.svg',
      specialties: ['Emergency Repairs', '24/7 Service', 'Licensed & Insured']
    },
    {
      id: '2',
      name: 'Sarah\'s Mobile Hair Salon',
      category: 'Beauty & Wellness',
      service: 'Hair Styling',
      location: 'Brooklyn, New York',
      rating: 4.9,
      reviews: 89,
      hourlyRate: 65,
      availability: 'Next available: Tomorrow',
      verified: true,
      image: '/placeholder.svg',
      specialties: ['Bridal Hair', 'Color Specialist', 'Mobile Service']
    },
    {
      id: '3',
      name: 'Pro Handyman Solutions',
      category: 'Home Services',
      service: 'General Repairs',
      location: 'Queens, New York',
      rating: 4.7,
      reviews: 203,
      hourlyRate: 55,
      availability: 'Available this week',
      verified: true,
      image: '/placeholder.svg',
      specialties: ['Furniture Assembly', 'Wall Mounting', 'Minor Repairs']
    },
    {
      id: '4',
      name: 'Elite Car Detailing',
      category: 'Automotive',
      service: 'Car Detailing',
      location: 'Manhattan, New York',
      rating: 4.6,
      reviews: 156,
      hourlyRate: 75,
      availability: 'Available today',
      verified: false,
      image: '/placeholder.svg',
      specialties: ['Ceramic Coating', 'Interior Detailing', 'Mobile Service']
    },
    {
      id: '5',
      name: 'Fresh Garden Landscaping',
      category: 'Home Services',
      service: 'Landscaping',
      location: 'Staten Island, New York',
      rating: 4.9,
      reviews: 98,
      hourlyRate: 60,
      availability: 'Available next week',
      verified: true,
      image: '/placeholder.svg',
      specialties: ['Garden Design', 'Lawn Care', 'Tree Trimming']
    },
    {
      id: '6',
      name: 'TechFix Mobile Repair',
      category: 'Technology',
      service: 'Device Repair',
      location: 'Bronx, New York',
      rating: 4.5,
      reviews: 167,
      hourlyRate: 45,
      availability: 'Available today',
      verified: true,
      image: '/placeholder.svg',
      specialties: ['Phone Repair', 'Laptop Repair', 'Data Recovery']
    }
  ];

  const categories = ['all', 'Home Services', 'Beauty & Wellness', 'Automotive', 'Technology'];
  const locations = ['all', 'Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'];

  const filteredProviders = serviceProviders.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || provider.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || provider.location.includes(selectedLocation);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const getServiceIcon = (service: string) => {
    switch (service.toLowerCase()) {
      case 'plumbing': return <Wrench className="h-5 w-5" />;
      case 'hair styling': return <Scissors className="h-5 w-5" />;
      case 'general repairs': return <Hammer className="h-5 w-5" />;
      case 'car detailing': return <Car className="h-5 w-5" />;
      case 'landscaping': return <Home className="h-5 w-5" />;
      case 'device repair': return <Camera className="h-5 w-5" />;
      default: return <Wrench className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Local Service Providers</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Find trusted local professionals for all your service needs. From home repairs to beauty services, connect with verified providers in your area.
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
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              {locations.map(location => (
                <SelectItem key={location} value={location}>
                  {location === 'all' ? 'All Locations' : location}
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
                    {provider.hourlyRate}/hr
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
                  <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    View Profile
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
          Join ConnectPulse and connect with customers in your area. Create your profile and start growing your local business today.
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
