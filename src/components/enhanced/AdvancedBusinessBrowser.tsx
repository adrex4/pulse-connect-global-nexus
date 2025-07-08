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

// Expanded business categories with high-quality images
const businessCategories = [
  {
    name: 'Technology & Software',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
    description: 'Software development, AI, and tech solutions'
  },
  {
    name: 'Healthcare & Medical',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d04cb21cd6c?w=400&h=300&fit=crop',
    description: 'Medical services, healthcare technology'
  },
  {
    name: 'Finance & Banking',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop',
    description: 'Financial services, banking, investments'
  },
  {
    name: 'Education & Training',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop',
    description: 'Educational institutions, online learning'
  },
  {
    name: 'Real Estate',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop',
    description: 'Property management, real estate services'
  },
  {
    name: 'Retail & E-commerce',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    description: 'Online stores, retail businesses'
  },
  {
    name: 'Food & Beverage',
    image: 'https://images.unsplash.com/photo-1414235077428-9049fed747ef?w=400&h=300&fit=crop',
    description: 'Restaurants, food delivery, catering'
  },
  {
    name: 'Manufacturing',
    image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&h=300&fit=crop',
    description: 'Production, industrial manufacturing'
  },
  {
    name: 'Transportation & Logistics',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop',
    description: 'Shipping, logistics, transportation'
  },
  {
    name: 'Energy & Utilities',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop',
    description: 'Renewable energy, utilities, power'
  },
  {
    name: 'Construction',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop',
    description: 'Building, construction, architecture'
  },
  {
    name: 'Marketing & Advertising',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    description: 'Digital marketing, advertising agencies'
  },
  {
    name: 'Legal & Professional',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop',
    description: 'Law firms, legal services, consulting'
  },
  {
    name: 'Entertainment & Media',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    description: 'Media production, entertainment industry'
  },
  {
    name: 'Agriculture & Farming',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop',
    description: 'Farming, agriculture, food production'
  },
  {
    name: 'Automotive',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop',
    description: 'Auto manufacturing, car services'
  },
  {
    name: 'Non-Profit & Social',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop',
    description: 'Non-profit organizations, social causes'
  },
  {
    name: 'Fashion & Beauty',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    description: 'Fashion brands, beauty products, styling'
  },
  {
    name: 'Sports & Fitness',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    description: 'Gyms, sports equipment, fitness services'
  },
  {
    name: 'Travel & Tourism',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
    description: 'Hotels, travel agencies, tourism services'
  },
  {
    name: 'Environmental Services',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop',
    description: 'Recycling, waste management, green solutions'
  },
  {
    name: 'Telecommunications',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    description: 'Internet providers, mobile services, communication'
  },
  {
    name: 'Insurance',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
    description: 'Life insurance, property insurance, risk management'
  },
  {
    name: 'Security Services',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
    description: 'Cybersecurity, physical security, surveillance'
  },
  {
    name: 'Chemical & Pharmaceutical',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop',
    description: 'Chemical production, pharmaceuticals, research'
  }
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
    },
    products: ['Enterprise AI Solutions', 'Custom Web Applications', 'Mobile App Development', 'Cloud Migration Services'],
    fullProfile: {
      aboutUs: 'TechFlow Solutions was founded in 2018 with a mission to democratize AI technology for businesses of all sizes. Our team of expert developers and data scientists work together to create cutting-edge solutions that drive real business value.',
      achievements: ['500+ Projects Completed', 'ISO 27001 Certified', 'Top AI Company 2023'],
      clientTestimonials: [
        { client: 'Fortune 500 Company', quote: 'TechFlow transformed our business processes with their AI solutions.' },
        { client: 'StartupXYZ', quote: 'The mobile app they built exceeded our expectations.' }
      ]
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
    },
    products: ['Solar Panel Systems', 'Wind Turbines', 'Energy Storage Solutions', 'Smart Grid Technology'],
    fullProfile: {
      aboutUs: 'GreenEnergy Innovations has been at the forefront of the renewable energy revolution since 2015. We believe in a sustainable future powered by clean energy.',
      achievements: ['1000+ Installations', 'Carbon Neutral Certified', 'Green Energy Award Winner'],
      clientTestimonials: [
        { client: 'City of Berlin', quote: 'Outstanding solar installation services for our municipal buildings.' }
      ]
    }
  },
  {
    id: '3',
    name: 'Digital Marketing Pro',
    category: 'Marketing & Advertising',
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
    },
    products: ['SEO Optimization', 'Social Media Campaigns', 'Google Ads Management', 'Content Creation'],
    fullProfile: {
      aboutUs: 'Digital Marketing Pro specializes in helping small to medium businesses establish a strong digital presence. Our data-driven approach ensures measurable results.',
      achievements: ['200+ Successful Campaigns', 'Google Partner Certified', 'HubSpot Gold Partner'],
      clientTestimonials: [
        { client: 'Local Restaurant Chain', quote: 'Increased our online sales by 300% in just 6 months.' }
      ]
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
  const [showDirectMessage, setShowDirectMessage] = useState<any>(null);
  const [showFullProfile, setShowFullProfile] = useState<any>(null);

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
    setShowDirectMessage(business);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewProfile = (business: any) => {
    console.log('Viewing full profile for:', business.name);
    setShowFullProfile(business);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateBusinessProfile = () => {
    if (onCreateBusiness) {
      onCreateBusiness();
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Direct Message View
  if (showDirectMessage) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl flex items-center gap-3">
                <MessageSquare className="h-8 w-8" />
                Direct Message with {showDirectMessage.name}
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
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-900 mb-2">Start a Conversation</h3>
                <p className="text-blue-700 mb-4">
                  Send a direct message to {showDirectMessage.name} to discuss business opportunities, partnerships, or ask questions about their services.
                </p>
                <div className="space-y-4">
                  <textarea 
                    className="w-full p-4 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                    placeholder={`Type your message to ${showDirectMessage.name}...`}
                  />
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Send Message
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-3">Business Info</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Category:</span> {showDirectMessage.category}</p>
                    <p><span className="font-medium">Location:</span> {showDirectMessage.location}</p>
                    <p><span className="font-medium">Rating:</span> ⭐ {showDirectMessage.rating} ({showDirectMessage.reviewCount} reviews)</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-3">Contact Info</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Email:</span> {showDirectMessage.email}</p>
                    <p><span className="font-medium">Phone:</span> {showDirectMessage.phone}</p>
                    <p><span className="font-medium">Website:</span> 
                      <a href={showDirectMessage.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                        Visit
                      </a>
                    </p>
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
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl flex items-center gap-3">
                  <Building2 className="h-8 w-8" />
                  {showFullProfile.name}
                </CardTitle>
                <p className="text-blue-100 mt-2">{showFullProfile.category}</p>
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
              {/* Business Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
                    <h3 className="text-2xl font-semibold text-blue-900 mb-4">About {showFullProfile.name}</h3>
                    <p className="text-blue-800 leading-relaxed mb-4">{showFullProfile.description}</p>
                    <p className="text-blue-700">{showFullProfile.fullProfile?.aboutUs}</p>
                  </div>

                  {/* Products & Services */}
                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <h3 className="text-xl font-semibold text-green-900 mb-4">Products & Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {showFullProfile.products?.map((product: string, index: number) => (
                        <div key={index} className="bg-white p-4 rounded-lg border border-green-300 shadow-sm">
                          <p className="font-medium text-green-800">{product}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Media Gallery */}
                  {(showFullProfile.media.images.length > 0 || showFullProfile.media.videos.length > 0) && (
                    <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                      <h3 className="text-xl font-semibold text-purple-900 mb-4">Media Gallery</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {showFullProfile.media.images.map((image: string, index: number) => (
                          <div key={index} className="aspect-square bg-white rounded-lg overflow-hidden border-2 border-purple-200 shadow-sm">
                            <img 
                              src={image} 
                              alt={`${showFullProfile.name} image ${index + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                            />
                          </div>
                        ))}
                        {showFullProfile.media.videos.map((video: string, index: number) => (
                          <div key={index} className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer hover:from-purple-200 hover:to-blue-200 transition-colors border-2 border-purple-200 shadow-sm">
                            <Play className="h-12 w-12 text-purple-600" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-orange-600" />
                          <span className="text-orange-700">{showFullProfile.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-orange-600" />
                          <span className="text-orange-700">{showFullProfile.employees} employees</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-orange-600" />
                          <span className="text-orange-700">Founded {showFullProfile.founded}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Info */}
                  <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-blue-900 mb-4">Contact Information</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-blue-600" />
                          <a href={showFullProfile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Visit Website
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-blue-600" />
                          <span className="text-blue-700">{showFullProfile.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-blue-600" />
                          <span className="text-blue-700">{showFullProfile.phone}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Social Media */}
                  <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-pink-900 mb-4">Follow Us</h4>
                      <div className="flex flex-wrap gap-2">
                        {showFullProfile.socialMedia.facebook && (
                          <a href={showFullProfile.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="p-2 hover:bg-blue-50 hover:border-blue-300">
                              <Facebook className="h-4 w-4 text-blue-600" />
                            </Button>
                          </a>
                        )}
                        {showFullProfile.socialMedia.twitter && (
                          <a href={showFullProfile.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="p-2 hover:bg-blue-50 hover:border-blue-300">
                              <Twitter className="h-4 w-4 text-blue-500" />
                            </Button>
                          </a>
                        )}
                        {showFullProfile.socialMedia.linkedin && (
                          <a href={showFullProfile.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="p-2 hover:bg-blue-50 hover:border-blue-300">
                              <Linkedin className="h-4 w-4 text-blue-700" />
                            </Button>
                          </a>
                        )}
                        {showFullProfile.socialMedia.instagram && (
                          <a href={showFullProfile.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="p-2 hover:bg-pink-50 hover:border-pink-300">
                              <Instagram className="h-4 w-4 text-pink-600" />
                            </Button>
                          </a>
                        )}
                        {showFullProfile.socialMedia.youtube && (
                          <a href={showFullProfile.socialMedia.youtube} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="p-2 hover:bg-red-50 hover:border-red-300">
                              <Youtube className="h-4 w-4 text-red-600" />
                            </Button>
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button 
                      onClick={() => handleDirectMessage(showFullProfile)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              {showFullProfile.fullProfile?.achievements && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                  <h3 className="text-xl font-semibold text-green-900 mb-4">Achievements & Certifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {showFullProfile.fullProfile.achievements.map((achievement: string, index: number) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-green-300 shadow-sm flex items-center gap-3">
                        <Award className="h-6 w-6 text-green-600" />
                        <span className="font-medium text-green-800">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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

      {/* Business Categories Grid - Updated with more categories */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Browse by Industry</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {businessCategories.map((category, index) => (
            <Card 
              key={index}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="relative h-48">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg leading-tight mb-2">{category.name}</h3>
                  <p className="text-white/80 text-sm">{category.description}</p>
                </div>
              </div>
            </Card>
          ))}
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
                    {businessCategories.map(category => (
                      <SelectItem key={category.name} value={category.name}>{category.name}</SelectItem>
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
