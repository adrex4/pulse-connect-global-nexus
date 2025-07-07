
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Building2, Search, Globe, MapPin, Play } from 'lucide-react';

interface Business {
  id: string;
  name: string;
  products: string;
  website?: string;
  images: string[];
  videos: string[];
  location: string;
  verified: boolean;
  category: string;
}

interface BusinessBrowserProps {
  onBack: () => void;
  onCreateBusiness: () => void;
  showFilters?: boolean;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  selectedLocation?: string;
  onLocationChange?: (location: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  availableLocations?: {id: string, name: string}[];
  availableCategories?: string[];
}

const BusinessBrowser: React.FC<BusinessBrowserProps> = ({ 
  onBack, 
  onCreateBusiness,
  showFilters = false,
  searchTerm = '',
  onSearchChange,
  selectedLocation = 'all_locations',
  onLocationChange,
  selectedCategory = 'all_categories',
  onCategoryChange,
  availableLocations = [],
  availableCategories = []
}) => {
  const [internalSearchTerm, setInternalSearchTerm] = useState('');
  
  const currentSearchTerm = showFilters ? searchTerm : internalSearchTerm;
  const handleSearchChange = showFilters ? onSearchChange : setInternalSearchTerm;

  // Sample businesses for demonstration
  const sampleBusinesses: Business[] = [
    {
      id: '1',
      name: 'TechStart Solutions',
      products: 'Web development, mobile apps, and digital marketing services',
      website: 'https://techstart.com',
      images: ['https://images.unsplash.com/photo-1498050108023-c5249f4df085'],
      videos: ['https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'],
      location: 'New York, USA',
      verified: true,
      category: 'Technology'
    },
    {
      id: '2',
      name: 'Green Energy Corp',
      products: 'Solar panels, renewable energy solutions, and eco-friendly products',
      images: ['https://images.unsplash.com/photo-1488590528505-98d2b5aba04b'],
      videos: [],
      location: 'California, USA',
      verified: true,
      category: 'Energy'
    },
    {
      id: '3',
      name: 'Creative Design Studio',
      products: 'Graphic design, branding, and creative marketing solutions',
      images: ['https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d'],
      videos: ['https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4'],
      location: 'London, UK',
      verified: false,
      category: 'Design'
    }
  ];

  const filteredBusinesses = sampleBusinesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
      business.products.toLowerCase().includes(currentSearchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all_categories' || 
      business.category.toLowerCase().includes(selectedCategory.toLowerCase());
    
    // For location, we'll do a simple match for now
    const matchesLocation = selectedLocation === 'all_locations' || 
      business.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <Card className="shadow-lg border-0 bg-white">
        {!showFilters && (
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-3">
                <Building2 className="h-6 w-6" />
                <CardTitle className="text-xl">Browse Businesses</CardTitle>
              </div>
            </div>
          </CardHeader>
        )}
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Header with Create Business Button */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">Discover Amazing Businesses</h3>
                <p className="text-gray-600">Connect with innovative companies and potential partners</p>
              </div>
              <Button
                onClick={onCreateBusiness}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                size="lg"
              >
                <Building2 className="h-4 w-4 mr-2" />
                Create Your Business
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search businesses, products, or services..."
                  value={currentSearchTerm}
                  onChange={(e) => handleSearchChange?.(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>

              {/* Filters - only show if showFilters is true */}
              {showFilters && (
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <Select value={selectedLocation} onValueChange={onLocationChange}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="All Locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all_locations">All Locations</SelectItem>
                        {availableLocations.map((location) => (
                          <SelectItem key={location.id} value={location.id}>
                            {location.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex-1 min-w-[200px]">
                    <Select value={selectedCategory} onValueChange={onCategoryChange}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all_categories">All Categories</SelectItem>
                        {availableCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>

            {/* Demo Video Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Play className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-blue-900">See How It Works</h4>
                  <p className="text-blue-700">Watch our demo video to learn how to create and showcase your business profile</p>
                  <Button variant="outline" className="mt-2 border-blue-500 text-blue-600">
                    Watch Demo Video
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800">
                {filteredBusinesses.length} Businesses Found
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBusinesses.map((business) => (
                  <Card key={business.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Business Image */}
                        {business.images.length > 0 && (
                          <div className="relative">
                            <img
                              src={business.images[0]}
                              alt={business.name}
                              className="w-full h-40 object-cover rounded-lg"
                            />
                            {business.verified && (
                              <Badge className="absolute top-2 right-2 bg-green-500">
                                Verified
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* Business Video - placed below image */}
                        {business.videos.length > 0 && (
                          <div className="relative">
                            <video
                              src={business.videos[0]}
                              className="w-full h-32 object-cover rounded-lg"
                              controls
                              poster={business.images[0]}
                            />
                            <div className="absolute top-2 left-2">
                              <Badge className="bg-purple-500">
                                Product Video
                              </Badge>
                            </div>
                          </div>
                        )}

                        <div className="space-y-2">
                          <h5 className="font-semibold text-lg">{business.name}</h5>
                          <p className="text-gray-600 text-sm line-clamp-2">{business.products}</p>
                          
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <MapPin className="h-4 w-4" />
                            {business.location}
                          </div>

                          {business.website && (
                            <div className="flex items-center gap-1 text-sm text-blue-600">
                              <Globe className="h-4 w-4" />
                              <a href={business.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                Visit Website
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessBrowser;
