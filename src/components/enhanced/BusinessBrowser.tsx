
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, Building2, MapPin, Star, Users, ArrowLeft, Globe, 
  MessageCircle, Send, Calendar, Phone, Mail 
} from 'lucide-react';
import { BUSINESS_TYPES } from '@/data/businessTypes';
import { COUNTRIES } from '@/data/countries';
import { useToast } from '@/hooks/use-toast';

interface BusinessBrowserProps {
  onBack?: () => void;
}

// Business niche header images
const BUSINESS_NICHE_IMAGES = {
  'Retail': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
  'Food & Beverage': 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=1200&h=400&fit=crop',
  'Technology': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=400&fit=crop',
  'Healthcare': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=400&fit=crop',
  'Education': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=400&fit=crop',
  'Finance': 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=400&fit=crop',
  'Real Estate': 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=1200&h=400&fit=crop',
  'Consulting': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=400&fit=crop'
};

const mockBusinesses = [
  {
    id: '1',
    name: 'TechFlow Solutions',
    businessType: 'Technology',
    description: 'Leading software development company specializing in enterprise solutions and mobile applications.',
    location: 'San Francisco, CA',
    country: 'United States',
    rating: 4.8,
    reviewCount: 234,
    employeeCount: '50-100',
    founded: '2018',
    website: 'www.techflow.com',
    email: 'contact@techflow.com',
    phone: '+1 (555) 123-4567',
    services: ['Web Development', 'Mobile Apps', 'Cloud Solutions', 'AI/ML'],
    verified: true
  },
  {
    id: '2',
    name: 'Green Valley Organic',
    businessType: 'Food & Beverage',
    description: 'Premium organic food producer committed to sustainable farming and healthy nutrition.',
    location: 'Portland, OR',
    country: 'United States',
    rating: 4.9,
    reviewCount: 156,
    employeeCount: '25-50',
    founded: '2015',
    website: 'www.greenvalleyorganic.com',
    email: 'hello@greenvalley.com',
    phone: '+1 (555) 987-6543',
    services: ['Organic Produce', 'Meal Kits', 'Catering', 'Nutrition Consulting'],
    verified: true
  },
  {
    id: '3',
    name: 'Elite Financial Advisors',
    businessType: 'Finance',
    description: 'Comprehensive financial planning and investment management for individuals and businesses.',
    location: 'New York, NY',
    country: 'United States',
    rating: 4.7,
    reviewCount: 89,
    employeeCount: '10-25',
    founded: '2012',
    website: 'www.elitefinancial.com',
    email: 'advisors@elitefinancial.com',
    phone: '+1 (555) 456-7890',
    services: ['Investment Planning', 'Tax Strategy', 'Retirement Planning', 'Business Finance'],
    verified: false
  }
];

const BusinessBrowser: React.FC<BusinessBrowserProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all_types');
  const [selectedCountry, setSelectedCountry] = useState('all_countries');
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const [filteredBusinesses, setFilteredBusinesses] = useState(mockBusinesses);
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const { toast } = useToast();

  const handleSearch = () => {
    let filtered = mockBusinesses;

    if (searchTerm) {
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.businessType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType && selectedType !== 'all_types') {
      filtered = filtered.filter(business => business.businessType === selectedType);
    }

    if (selectedCountry && selectedCountry !== 'all_countries') {
      filtered = filtered.filter(business => business.country === selectedCountry);
    }

    setFilteredBusinesses(filtered);
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
      description: `Your message has been sent to ${selectedBusiness?.name}.`
    });
    setMessageText('');
    setMessageOpen(false);
  };

  const getHeaderImage = () => {
    if (selectedType === 'all_types') {
      return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop';
    }
    return BUSINESS_NICHE_IMAGES[selectedType as keyof typeof BUSINESS_NICHE_IMAGES] || 
           'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop';
  };

  React.useEffect(() => {
    handleSearch();
  }, [searchTerm, selectedType, selectedCountry]);

  if (selectedBusiness) {
    return (
      <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedBusiness(null)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Business Directory
          </Button>
        </div>

        <Card className="shadow-lg border-0">
          <div 
            className="h-48 bg-cover bg-center relative rounded-t-lg"
            style={{ backgroundImage: `url(${getHeaderImage()})` }}
          >
            <div className="absolute inset-0 bg-black/50 rounded-t-lg"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl font-bold mb-2">{selectedBusiness.name}</h1>
              <p className="text-xl opacity-90">{selectedBusiness.businessType}</p>
            </div>
            {selectedBusiness.verified && (
              <div className="absolute top-6 right-6">
                <Badge className="bg-green-600 text-white">
                  ✓ Verified Business
                </Badge>
              </div>
            )}
          </div>

          <CardContent className="p-8 space-y-6">
            {/* Business Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{selectedBusiness.rating}</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{selectedBusiness.reviewCount}</div>
                <div className="text-sm text-gray-600">Reviews</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{selectedBusiness.employeeCount}</div>
                <div className="text-sm text-gray-600">Employees</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{selectedBusiness.founded}</div>
                <div className="text-sm text-gray-600">Founded</div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold mb-3">About</h3>
              <p className="text-gray-700 leading-relaxed">{selectedBusiness.description}</p>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Services</h3>
              <div className="flex flex-wrap gap-2">
                {selectedBusiness.services.map((service: string, index: number) => (
                  <Badge key={index} variant="outline" className="px-3 py-1">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <span>{selectedBusiness.location}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <span>{selectedBusiness.phone}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <span>{selectedBusiness.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Globe className="h-5 w-5 text-gray-500" />
                  <span>{selectedBusiness.website}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <Button 
                onClick={() => setMessageOpen(true)}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" className="flex-1">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Message Modal */}
        <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                Contact {selectedBusiness?.name}
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
                <Building2 className="h-6 w-6 text-white" />
                <CardTitle className="text-2xl text-white">Business Directory</CardTitle>
              </div>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              {filteredBusinesses.length} Businesses Listed
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-6">
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search businesses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>
            </div>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Business Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_types">All Types</SelectItem>
                {BUSINESS_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
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
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        {filteredBusinesses.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="text-gray-500">
              <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No businesses found</h3>
              <p>Try adjusting your search criteria to find more businesses.</p>
            </div>
          </Card>
        ) : (
          filteredBusinesses.map((business) => (
            <Card 
              key={business.id} 
              className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500 cursor-pointer"
              onClick={() => setSelectedBusiness(business)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    {business.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-xl text-gray-900">{business.name}</h3>
                      {business.verified && (
                        <Badge className="bg-green-600 text-white text-xs">
                          ✓ Verified
                        </Badge>
                      )}
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-medium">{business.rating}</span>
                        <span className="text-gray-500">({business.reviewCount})</span>
                      </div>
                    </div>
                    
                    <Badge variant="outline" className="mb-3">
                      {business.businessType}
                    </Badge>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{business.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{business.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{business.employeeCount} employees</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Since {business.founded}</span>
                      </div>
                    </div>
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

export default BusinessBrowser;
