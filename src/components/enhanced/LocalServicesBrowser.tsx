import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
  Music,
  Briefcase,
  Building,
  Truck,
  Monitor,
  PaintBucket,
  Dumbbell,
  Stethoscope,
  Gavel,
  Calculator,
  Globe,
  Package,
  Shirt,
  Video,
  Mail,
  Award,
  CheckCircle,
  Calendar,
  MessageCircle,
  Send,
  X
} from 'lucide-react';
import { WORLD_COUNTRIES } from '@/data/worldCountries';
import { useToast } from '@/hooks/use-toast';

interface LocalServicesBrowserProps {
  onCreateProfile: () => void;
}

const LocalServicesBrowser: React.FC<LocalServicesBrowserProps> = ({ onCreateProfile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageSubject, setMessageSubject] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const { toast } = useToast();

  // Enhanced service categories with individual services
  const serviceCategories = [
    {
      title: "Home Services",
      description: "Professional home maintenance and repair services",
      services: [
        {
          name: "Plumbing",
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
          icon: <Wrench className="h-5 w-5" />
        },
        {
          name: "Electrical",
          image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300&h=200&fit=crop",
          icon: <Zap className="h-5 w-5" />
        },
        {
          name: "Cleaning",
          image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop",
          icon: <Home className="h-5 w-5" />
        },
        {
          name: "Repairs",
          image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=300&h=200&fit=crop",
          icon: <Hammer className="h-5 w-5" />
        }
      ]
    },
    {
      title: "Beauty & Wellness",
      description: "Personal care and wellness services",
      services: [
        {
          name: "Hair Styling",
          image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&h=200&fit=crop",
          icon: <Scissors className="h-5 w-5" />
        },
        {
          name: "Massage Therapy",
          image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&h=200&fit=crop",
          icon: <Heart className="h-5 w-5" />
        },
        {
          name: "Personal Training",
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
          icon: <Dumbbell className="h-5 w-5" />
        },
        {
          name: "Spa Services",
          image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=300&h=200&fit=crop",
          icon: <HeartHandshake className="h-5 w-5" />
        }
      ]
    },
    {
      title: "Automotive",
      description: "Vehicle maintenance and repair services",
      services: [
        {
          name: "Car Detailing",
          image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=300&h=200&fit=crop",
          icon: <Car className="h-5 w-5" />
        },
        {
          name: "Mobile Mechanics",
          image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
          icon: <Wrench className="h-5 w-5" />
        },
        {
          name: "Auto Repair",
          image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=300&h=200&fit=crop",
          icon: <Hammer className="h-5 w-5" />
        },
        {
          name: "Tire Services",
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
          icon: <Shield className="h-5 w-5" />
        }
      ]
    },
    {
      title: "Technology",
      description: "IT support and technology services",
      services: [
        {
          name: "Computer Repair",
          image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
          icon: <Monitor className="h-5 w-5" />
        },
        {
          name: "Tech Support",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop",
          icon: <Wrench className="h-5 w-5" />
        },
        {
          name: "Setup Services",
          image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=300&h=200&fit=crop",
          icon: <Building className="h-5 w-5" />
        },
        {
          name: "Data Recovery",
          image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop",
          icon: <Shield className="h-5 w-5" />
        }
      ]
    }
  ];

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
      image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&h=300&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
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
    'Entertainment',
    'Legal Services',
    'Financial Services',
    'Real Estate',
    'Photography',
    'Event Planning',
    'Marketing & Design',
    'Construction',
    'Moving & Storage',
    'Travel & Tourism',
    'Consulting',
    'Healthcare',
    'Childcare',
    'Elder Care',
    'Fitness Training',
    'Music Lessons',
    'Art & Crafts',
    'Writing & Translation',
    'Delivery Services',
    'Repair Services',
    'Installation Services',
    'Maintenance Services'
  ];

  const countries = ['all', ...WORLD_COUNTRIES];

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
      case 'computer repair': return <Monitor className="h-5 w-5" />;
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

  const handleSendMessage = async () => {
    if (!messageSubject.trim() || !messageContent.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Both subject and message content are required.",
        variant: "destructive"
      });
      return;
    }

    setIsSendingMessage(true);
    
    // Simulate sending message
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Message Sent Successfully!",
        description: "Your message has been sent to the service provider. They will get back to you soon.",
      });
      
      setShowMessageModal(false);
      setMessageSubject('');
      setMessageContent('');
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSendingMessage(false);
    }
  };

  const openMessageModal = (provider: any) => {
    setMessageSubject(`Inquiry about ${provider.service} services`);
    setShowMessageModal(true);
  };

  // If viewing a specific provider profile
  if (selectedProvider) {
    const provider = serviceProviders.find(p => p.id === selectedProvider);
    if (!provider) return null;

    return (
      <div className="space-y-8 min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30">
        <Button 
          onClick={() => setSelectedProvider(null)}
          variant="outline"
          className="mb-6 hover:bg-orange-50 border-orange-200"
        >
          ← Back to Browse Providers
        </Button>

        <div className="max-w-6xl mx-auto">
          <Card className="shadow-2xl border-0 overflow-hidden bg-white">
            {/* Enhanced Hero Header */}
            <div className="relative h-80 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 overflow-hidden">
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <img 
                src={provider.image} 
                alt={provider.service}
                className="w-full h-full object-cover mix-blend-overlay opacity-80"
              />
              
              {/* Floating verification badge */}
              {provider.verified && (
                <div className="absolute top-6 right-6">
                  <Badge className="bg-green-500/90 text-white text-sm px-4 py-2 backdrop-blur-sm border border-green-400/50 shadow-lg">
                    <Shield className="h-4 w-4 mr-2" />
                    Verified Professional
                  </Badge>
                </div>
              )}

              {/* Enhanced profile content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-end justify-between">
                  <div className="flex items-center gap-8">
                    <div className="relative">
                      <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl border-2 border-white/30">
                        {getServiceIcon(provider.service)}
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h1 className="text-4xl font-bold mb-1 drop-shadow-lg">{provider.name}</h1>
                      <p className="text-xl text-orange-100 font-medium drop-shadow">{provider.service}</p>
                      <div className="flex items-center gap-3 text-orange-100">
                        <MapPin className="h-5 w-5" />
                        <span className="text-lg drop-shadow">{provider.location}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          <Star className="h-4 w-4 fill-yellow-300 text-yellow-300" />
                          <span className="font-bold">{provider.rating}</span>
                          <span className="text-sm opacity-90">({provider.reviews})</span>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="font-bold">{getCurrencySymbol(provider.currency)}{provider.hourlyRate}/hr</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="p-8 space-y-8">
              {/* Enhanced Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 -mt-4">
                <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-2 bg-yellow-500 rounded-lg">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-3xl font-bold text-yellow-800">{provider.rating}</span>
                  </div>
                  <p className="text-yellow-700 font-semibold">{provider.reviews} reviews</p>
                  <p className="text-yellow-600 text-sm mt-1">Excellent rating</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-3xl font-bold text-green-800">
                      {getCurrencySymbol(provider.currency)}{provider.hourlyRate}
                    </span>
                  </div>
                  <p className="text-green-700 font-semibold">per hour</p>
                  <p className="text-green-600 text-sm mt-1">Competitive rate</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-blue-800">{provider.experience}</span>
                  </div>
                  <p className="text-blue-700 font-semibold">experience</p>
                  <p className="text-blue-600 text-sm mt-1">Professional</p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-lg font-bold text-purple-800">{provider.availability}</span>
                  </div>
                  <p className="text-purple-700 font-semibold">Availability</p>
                  <p className="text-purple-600 text-sm mt-1">Ready to help</p>
                </div>
              </div>

              {/* Enhanced About Section */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200 shadow-inner">
                <h3 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  About {provider.name}
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">{provider.description}</p>
              </div>

              {/* Enhanced Specialties */}
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  Specialties & Services
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {provider.specialties.map((specialty, index) => (
                    <div key={index} className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-6 text-center hover:shadow-lg transition-all group hover:scale-105">
                      <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-600 transition-colors">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-orange-800 font-bold text-lg">{specialty}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Languages & Communication */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold mb-4 text-blue-800 flex items-center gap-3">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <Globe className="h-5 w-5 text-white" />
                    </div>
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {provider.languages.map((language, index) => (
                      <Badge key={index} className="bg-blue-500 text-white px-4 py-2 text-sm hover:bg-blue-600 transition-colors">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200">
                  <h3 className="text-2xl font-bold mb-4 text-green-800 flex items-center gap-3">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <Calendar className="h-5 w-5 text-white" />
                    </div>
                    Availability
                  </h3>
                  <div className="bg-green-200 p-4 rounded-xl border border-green-300">
                    <p className="text-green-800 font-bold text-lg">{provider.availability}</p>
                    <p className="text-green-700 text-sm mt-1">Ready to assist you</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Contact Actions - Call button removed */}
              <div className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 rounded-2xl p-8 border-2 border-orange-200 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  Ready to get started?
                </h3>
                <div className="text-center">
                  <Button 
                    size="lg" 
                    onClick={() => openMessageModal(provider)}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold shadow-xl hover:shadow-2xl transition-all duration-300 px-12 py-4 text-lg rounded-xl"
                  >
                    <MessageCircle className="h-6 w-6 mr-3" />
                    Send Message
                    <Send className="h-6 w-6 ml-3" />
                  </Button>
                  <p className="text-gray-600 mt-4 text-lg">Get in touch and discuss your project needs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Message Modal */}
        <Dialog open={showMessageModal} onOpenChange={setShowMessageModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                Send Message to {provider?.name}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                <p className="text-orange-800 font-medium">
                  <strong>Service:</strong> {provider?.service} • <strong>Location:</strong> {provider?.location}
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-lg font-semibold">Subject</Label>
                <Input
                  id="subject"
                  value={messageSubject}
                  onChange={(e) => setMessageSubject(e.target.value)}
                  placeholder="Brief description of your inquiry"
                  className="h-12 text-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="text-lg font-semibold">Message</Label>
                <Textarea
                  id="message"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder="Describe your project, timeline, and any specific requirements..."
                  rows={6}
                  className="text-lg resize-none"
                />
              </div>
              
              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={handleSendMessage}
                  disabled={isSendingMessage || !messageSubject.trim() || !messageContent.trim()}
                  className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 h-12 text-lg font-semibold"
                >
                  {isSendingMessage ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Send className="h-5 w-5" />
                      Send Message
                    </div>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowMessageModal(false)}
                  className="px-8 h-12 text-lg border-2"
                >
                  <X className="h-5 w-5 mr-2" />
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
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-gray-800">Local Service Providers</h2>
        <p className="text-gray-600 text-xl max-w-3xl mx-auto">
          Find trusted local professionals for all your service needs. From home repairs to beauty services, connect with verified providers worldwide.
        </p>
      </div>

      {/* Enhanced Service Categories with Individual Service Items */}
      <div className="space-y-12 max-w-7xl mx-auto">
        {serviceCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-800 mb-3">{category.title}</h3>
              <p className="text-gray-600 text-lg">{category.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.services.map((service, serviceIndex) => (
                <div key={serviceIndex} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-white">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                          {service.icon}
                        </div>
                        <h4 className="font-bold text-lg">{service.name}</h4>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 font-medium">Professional Service</span>
                      <Button size="sm" variant="outline" className="text-xs">
                        View Providers
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
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
            <SelectTrigger className="w-full md:w-64">
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
            <SelectTrigger className="w-full md:w-64">
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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-gray-600 text-lg">
            <span className="font-semibold text-orange-600">{filteredProviders.length}</span> service providers found
          </p>
          <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-50">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map(provider => (
            <Card key={provider.id} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-orange-200 overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={provider.image} 
                  alt={provider.service}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  {provider.verified && (
                    <Badge className="bg-green-500 text-white">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    {getServiceIcon(provider.service)}
                    <h3 className="font-bold text-lg">{provider.name}</h3>
                  </div>
                  <p className="text-orange-200 font-medium">{provider.service}</p>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4">
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
                    className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                    onClick={() => setSelectedProvider(provider.id)}
                  >
                    View Profile
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1 border-orange-300 text-orange-700 hover:bg-orange-50"
                    onClick={() => openMessageModal(provider)}
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-6 py-12 bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 rounded-xl border border-orange-200">
        <h3 className="text-3xl font-bold text-gray-800">Are you a Local Service Provider?</h3>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg">
          Join ConnectPulse and connect with customers worldwide. Create your profile and start growing your local business today.
        </p>
        <Button 
          onClick={onCreateProfile}
          size="lg"
          className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-xl hover:shadow-2xl transition-all duration-300 text-white font-medium px-8 py-4 text-lg"
        >
          <Users className="h-6 w-6 mr-3" />
          Create Service Provider Profile
          <ArrowRight className="h-6 w-6 ml-3" />
        </Button>
      </div>
    </div>
  );
};

export default LocalServicesBrowser;
