
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Briefcase, Plus, Globe, MapPin, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Service {
  id: string;
  name: string;
  category: string;
  is_online_capable: boolean;
}

interface ServiceSelectorProps {
  userType: 'freelancer' | 'occupation_provider';
  onNext: (serviceData: {
    primaryService: string;
    serviceType: 'online' | 'in_person' | 'both';
    experience: string;
    hourlyRate?: number;
    description: string;
  }) => void;
  onBack: () => void;
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({ userType, onNext, onBack }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState('');
  const [customService, setCustomService] = useState('');
  const [showCustomService, setShowCustomService] = useState(false);
  const [serviceType, setServiceType] = useState<'online' | 'in_person' | 'both'>('both');
  const [experience, setExperience] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchServices();
  }, [userType]);

  const fetchServices = async () => {
    let query = supabase.from('services').select('*').order('category, name');
    
    if (userType === 'freelancer') {
      query = query.eq('is_online_capable', true);
    } else if (userType === 'occupation_provider') {
      query = query.eq('is_online_capable', false);
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
        is_online_capable: userType === 'freelancer'
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

  const handleNext = () => {
    const selectedServiceData = services.find(s => s.id === selectedService);
    
    onNext({
      primaryService: selectedServiceData?.name || '',
      serviceType,
      experience,
      hourlyRate: hourlyRate ? parseFloat(hourlyRate) : undefined,
      description
    });
  };

  const getServicesByCategory = () => {
    const categories: { [key: string]: Service[] } = {};
    services.forEach(service => {
      if (!categories[service.category]) {
        categories[service.category] = [];
      }
      categories[service.category].push(service);
    });
    return categories;
  };

  const serviceCategories = getServicesByCategory();

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
              <CardTitle className="text-xl">
                {userType === 'freelancer' ? 'Your Freelance Skills' : 'Your Local Services'}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-semibold text-gray-800">
              {userType === 'freelancer' 
                ? 'What services do you offer online?' 
                : 'What local services do you provide?'}
            </h3>
            <p className="text-gray-600">
              {userType === 'freelancer'
                ? 'Select your primary skill or add a custom service if yours isn\'t listed.'
                : 'Choose your occupation or add it if it\'s not in our list.'}
            </p>
          </div>

          {/* Service Selection */}
          <div className="space-y-3">
            <Label className="text-lg font-medium">
              {userType === 'freelancer' ? 'Primary Skill/Service' : 'Your Occupation'}
            </Label>
            {showCustomService ? (
              <div className="space-y-3">
                <Input
                  placeholder={userType === 'freelancer' ? 'Enter your skill/service' : 'Enter your occupation'}
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
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder={`Select your ${userType === 'freelancer' ? 'skill' : 'occupation'}...`} />
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
                  <SelectItem value="custom">
                    <Plus className="h-4 w-4 mr-2" />
                    Add custom {userType === 'freelancer' ? 'skill' : 'occupation'}
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Service Type Selection */}
          {selectedService && !showCustomService && (
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

          {/* Experience Level */}
          <div className="space-y-3">
            <Label className="text-lg font-medium">Experience Level</Label>
            <Select value={experience} onValueChange={setExperience}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select your experience level..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                <SelectItem value="intermediate">Intermediate (2-4 years)</SelectItem>
                <SelectItem value="experienced">Experienced (5-9 years)</SelectItem>
                <SelectItem value="expert">Expert (10+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Hourly Rate */}
          <div className="space-y-3">
            <Label className="text-lg font-medium">Hourly Rate (Optional)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <Input
                type="number"
                placeholder="25"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                className="h-12 pl-8"
                min="0"
                step="0.01"
              />
            </div>
            <p className="text-sm text-gray-500">This helps clients understand your pricing range.</p>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <Label className="text-lg font-medium">Service Description</Label>
            <Textarea
              placeholder="Describe your services, experience, and what makes you unique..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button
            onClick={handleNext}
            disabled={!selectedService || !experience || !description.trim()}
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
