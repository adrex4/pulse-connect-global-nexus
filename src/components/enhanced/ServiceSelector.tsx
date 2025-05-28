
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Briefcase, Plus, Globe, MapPin, Users, Upload, Film, Music } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { FREELANCER_SKILL_CATEGORIES } from '@/data/freelancerSkills';

interface Service {
  id: string;
  name: string;
  category: string;
  is_online_capable: boolean;
}

interface ServiceSelectorProps {
  userType: 'freelancer' | 'occupation_provider' | 'social_media_influencer';
  onNext: (serviceData: {
    primaryService: string;
    serviceType: 'online' | 'in_person' | 'both';
    hourlyRate?: number;
    description: string;
    portfolioFiles?: File[];
  }) => void;
  onBack: () => void;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({ userType, onNext, onBack }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState('');
  const [customService, setCustomService] = useState('');
  const [showCustomService, setShowCustomService] = useState(false);
  const [serviceType, setServiceType] = useState<'online' | 'in_person' | 'both'>('both');
  const [hourlyRate, setHourlyRate] = useState('');
  const [description, setDescription] = useState('');
  const [portfolioFiles, setPortfolioFiles] = useState<File[]>([]);

  useEffect(() => {
    fetchServices();
  }, [userType]);

  const fetchServices = async () => {
    let query = supabase.from('services').select('*').order('category, name');
    
    if (userType === 'freelancer' || userType === 'social_media_influencer') {
      query = query.eq('is_online_capable', true);
    } else if (userType === 'occupation_provider') {
      // For local services, we want both online capable and non-online services
      // but primarily show local services
    }
    
    const { data } = await query;
    setServices(data || []);
  };

  const createCustomService = async () => {
    if (!customService.trim()) return;
    
    const { data, error } = await supabase
      .from('services')
      .insert({
        name: customService.trim(),
        category: 'Custom',
        is_online_capable: userType !== 'occupation_provider'
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating service:', error);
      return;
    }
    
    setServices(prev => [...prev, data]);
    setSelectedService(data.id);
    setShowCustomService(false);
    setCustomService('');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setPortfolioFiles(prev => [...prev, ...Array.from(files)]);
    }
  };

  const removeFile = (index: number) => {
    setPortfolioFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    const selectedServiceData = services.find(s => s.id === selectedService);
    
    onNext({
      primaryService: selectedServiceData?.name || '',
      serviceType,
      hourlyRate: hourlyRate ? parseFloat(hourlyRate) : undefined,
      description,
      portfolioFiles
    });
  };

  const getServiceTitle = () => {
    switch (userType) {
      case 'freelancer':
        return 'Your Freelance Skills';
      case 'social_media_influencer':
        return 'Your Content & Influence Areas';
      case 'occupation_provider':
        return 'Your Local Services';
      default:
        return 'Your Services';
    }
  };

  const getServiceDescription = () => {
    switch (userType) {
      case 'freelancer':
        return 'What services do you offer online? Select your primary skill or add a custom service if yours isn\'t listed.';
      case 'social_media_influencer':
        return 'What type of content do you create and what niches do you influence?';
      case 'occupation_provider':
        return 'What local services do you provide? Choose your occupation or add it if it\'s not in our list.';
      default:
        return 'Select your services';
    }
  };

  const getServicesForUserType = () => {
    if (userType === 'freelancer') {
      // Return all freelancing skills from our comprehensive list
      const categories: { [key: string]: Service[] } = {};
      Object.entries(FREELANCER_SKILL_CATEGORIES).forEach(([category, skills]) => {
        categories[category] = skills.map((skill, index) => ({
          id: `freelance-${category}-${index}`,
          name: skill,
          category,
          is_online_capable: true
        }));
      });
      return categories;
    } else if (userType === 'social_media_influencer') {
      const influencerServices = {
        'Content Creation': [
          'YouTube Content Creation', 'Instagram Photography', 'TikTok Videos', 'Podcast Production',
          'Blog Writing', 'Social Media Photography', 'Video Editing', 'Live Streaming'
        ],
        'Niche Expertise': [
          'Fashion & Beauty', 'Fitness & Health', 'Travel & Lifestyle', 'Food & Cooking',
          'Tech Reviews', 'Gaming', 'Business & Entrepreneurship', 'Education & Tutorials',
          'Parenting & Family', 'Home & Decor', 'Art & Creativity', 'Music & Entertainment'
        ],
        'Platform Specialization': [
          'Instagram Influencer', 'YouTube Creator', 'TikTok Creator', 'LinkedIn Thought Leader',
          'Twitter/X Influencer', 'Facebook Creator', 'Pinterest Creator', 'Snapchat Creator'
        ],
        'Services Offered': [
          'Brand Partnerships', 'Product Reviews', 'Sponsored Content', 'Affiliate Marketing',
          'Event Hosting', 'Speaking Engagements', 'Content Strategy', 'Social Media Management'
        ]
      };
      
      const categories: { [key: string]: Service[] } = {};
      Object.entries(influencerServices).forEach(([category, skills]) => {
        categories[category] = skills.map((skill, index) => ({
          id: `influencer-${category}-${index}`,
          name: skill,
          category,
          is_online_capable: true
        }));
      });
      return categories;
    } else {
      // Return services from database for occupation providers
      const categories: { [key: string]: Service[] } = {};
      services.forEach(service => {
        if (!categories[service.category]) {
          categories[service.category] = [];
        }
        categories[service.category].push(service);
      });
      return categories;
    }
  };

  const serviceCategories = getServicesForUserType();

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <Briefcase className="h-6 w-6" />
              <CardTitle className="text-xl">{getServiceTitle()}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-semibold text-gray-800">{getServiceDescription()}</h3>
          </div>

          {/* Service Selection */}
          <div className="space-y-3">
            <Label className="text-lg font-medium">
              {userType === 'freelancer' ? 'Primary Skill/Service' : 
               userType === 'social_media_influencer' ? 'Content Type/Niche' : 'Your Occupation'}
            </Label>
            {showCustomService ? (
              <div className="space-y-3">
                <Input
                  placeholder={userType === 'freelancer' ? 'Enter your skill/service' : 
                             userType === 'social_media_influencer' ? 'Enter your content type/niche' : 'Enter your occupation'}
                  value={customService}
                  onChange={(e) => setCustomService(e.target.value)}
                  className="h-12"
                />
                <div className="flex gap-2">
                  <Button onClick={createCustomService} disabled={!customService.trim()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                  </Button>
                  <Button variant="outline" onClick={() => setShowCustomService(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder={`Select your ${userType === 'freelancer' ? 'skill' : 
                                                           userType === 'social_media_influencer' ? 'content type' : 'occupation'}...`} />
                  </SelectTrigger>
                  <SelectContent className="max-h-80">
                    {Object.entries(serviceCategories).map(([category, categoryServices]) => (
                      <div key={category}>
                        <div className="px-2 py-1 text-sm font-semibold text-gray-500 bg-gray-50">
                          {category}
                        </div>
                        {categoryServices.map((service) => (
                          <SelectItem key={service.id} value={service.id} className="pl-4">
                            {service.name}
                          </SelectItem>
                        ))}
                      </div>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  onClick={() => setShowCustomService(true)}
                  className="w-full border-dashed border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add custom {userType === 'freelancer' ? 'skill' : 
                            userType === 'social_media_influencer' ? 'content type' : 'occupation'}
                </Button>
              </div>
            )}
          </div>

          {/* Service Type Selection - Only for non-social media influencers */}
          {selectedService && !showCustomService && userType !== 'social_media_influencer' && (
            <div className="space-y-4">
              <Label className="text-lg font-medium">Service Delivery Type</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    serviceType === 'online' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setServiceType('online')}
                >
                  <div className="text-center">
                    <Globe className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h4 className="font-semibold text-blue-900">Online Only</h4>
                    <p className="text-sm text-blue-700 mt-1">Remote work, digital delivery</p>
                  </div>
                </div>

                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    serviceType === 'in_person' 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => setServiceType('in_person')}
                >
                  <div className="text-center">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <h4 className="font-semibold text-green-900">In-Person Only</h4>
                    <p className="text-sm text-green-700 mt-1">Local, physical presence required</p>
                  </div>
                </div>

                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    serviceType === 'both' 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => setServiceType('both')}
                >
                  <div className="text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <h4 className="font-semibold text-purple-900">Both</h4>
                    <p className="text-sm text-purple-700 mt-1">Flexible delivery options</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hourly Rate */}
          <div className="space-y-3">
            <Label className="text-lg font-medium">
              {userType === 'social_media_influencer' ? 'Rate per Post/Campaign (Optional)' : 'Hourly Rate (Optional)'}
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <Input
                type="number"
                placeholder={userType === 'social_media_influencer' ? '250' : '25'}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="h-12 pl-8"
                min="0"
                step="0.01"
              />
            </div>
            <p className="text-sm text-gray-500">
              {userType === 'social_media_influencer' 
                ? 'This helps brands understand your pricing range for collaborations.'
                : 'This helps clients understand your pricing range.'}
            </p>
          </div>

          {/* Portfolio Upload */}
          <div className="space-y-3">
            <Label className="text-lg font-medium">Show Your Best Work</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*,video/*,audio/*,.pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="portfolio-upload"
              />
              <label htmlFor="portfolio-upload" className="cursor-pointer">
                <div className="space-y-3">
                  <div className="flex justify-center space-x-2">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <Film className="h-8 w-8 text-gray-400" />
                    <Music className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600">Upload your portfolio files</p>
                  <p className="text-sm text-gray-500">Images, videos, audio files, or documents</p>
                </div>
              </label>
            </div>
            
            {portfolioFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Uploaded files:</p>
                {portfolioFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm">{file.name}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-3">
            <Label className="text-lg font-medium">
              {userType === 'social_media_influencer' ? 'About Your Content & Audience' : 'Service Description'}
            </Label>
            <Textarea
              placeholder={userType === 'social_media_influencer' 
                ? 'Describe your content style, audience demographics, and what makes you unique as an influencer...'
                : 'Describe your services, experience, and what makes you unique...'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px]"
            />
          </div>

          <Button
            onClick={handleNext}
            disabled={!selectedService || !description.trim()}
            className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            size="lg"
          >
            Continue →
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceSelector;
