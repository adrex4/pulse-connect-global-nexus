
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, MapPin, Globe, Users, CheckCircle, Target, Network, TrendingUp } from 'lucide-react';
import { User } from './ConnectPulse';

const COUNTRIES = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Spain',
  'Italy', 'Netherlands', 'Australia', 'New Zealand', 'Japan', 'South Korea',
  'Singapore', 'India', 'China', 'Brazil', 'Mexico', 'Argentina', 'Nigeria',
  'South Africa', 'Kenya', 'UAE', 'Saudi Arabia', 'Turkey', 'Russia',
  'Poland', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Other'
];

interface LocationSelectorProps {
  user: User;
  onComplete: (userData: Omit<User, 'id'>) => void;
  onBack: () => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ user, onComplete, onBack }) => {
  const [country, setCountry] = useState('');
  const [preferredScope, setPreferredScope] = useState<'local' | 'regional' | 'global'>('local');

  const handleComplete = () => {
    if (country) {
      onComplete({
        name: user.name,
        niche: user.niche,
        country,
        preferredScope
      });
    }
  };

  const scopeOptions = [
    {
      id: 'local',
      title: 'Local',
      icon: MapPin,
      color: 'green',
      description: 'Connect with businesses in your country',
      benefits: ['Same timezone', 'Cultural alignment', 'Local regulations'],
      illustration: '🏢'
    },
    {
      id: 'regional',
      title: 'Regional',
      icon: Users,
      color: 'blue',
      description: 'Connect within your region (continent/area)',
      benefits: ['Regional expertise', 'Broader network', 'Cross-border opportunities'],
      illustration: '🌍'
    },
    {
      id: 'global',
      title: 'Global',
      icon: Globe,
      color: 'purple',
      description: 'Connect with businesses worldwide',
      benefits: ['Maximum reach', 'Diverse perspectives', 'International expansion'],
      illustration: '🚀'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <Card className="shadow-xl border-0 bg-white overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MapPin className="h-5 w-5" />
              </div>
              <CardTitle className="text-2xl">Choose Your Location & Scope</CardTitle>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8 space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-200">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.niche}</p>
              </div>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Now let's connect you with the right business community. Choose your location and preferred networking scope.
            </p>
          </div>

          {/* How It Works Guide */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              How ConnectPulse Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl mb-3 mx-auto">1</div>
                <h4 className="font-medium text-gray-800 mb-2">Choose Location</h4>
                <p className="text-sm text-gray-600">Select your country to find relevant business groups</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl mb-3 mx-auto">2</div>
                <h4 className="font-medium text-gray-800 mb-2">Select Scope</h4>
                <p className="text-sm text-gray-600">Choose local, regional, or global networking preferences</p>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white text-xl mb-3 mx-auto">3</div>
                <h4 className="font-medium text-gray-800 mb-2">Start Connecting</h4>
                <p className="text-sm text-gray-600">Join groups and start networking with like-minded businesses</p>
              </div>
            </div>
          </div>

          {/* Country Selection */}
          <div className="space-y-4">
            <Label className="text-xl font-semibold flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              Select Your Country
            </Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="h-14 text-lg border-2 focus:border-blue-500 bg-white shadow-sm">
                <SelectValue placeholder="🌍 Choose your country..." />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                {COUNTRIES.map((countryOption) => (
                  <SelectItem key={countryOption} value={countryOption} className="text-base py-3">
                    {countryOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500 flex items-center gap-2">
              <Network className="h-4 w-4" />
              This helps us find groups relevant to your business environment and regulations
            </p>
          </div>

          {/* Scope Selection */}
          <div className="space-y-6">
            <Label className="text-xl font-semibold flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <Globe className="h-4 w-4 text-white" />
              </div>
              Choose Your Networking Scope
            </Label>
            
            <RadioGroup value={preferredScope} onValueChange={(value: 'local' | 'regional' | 'global') => setPreferredScope(value)}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {scopeOptions.map((option) => {
                  const isSelected = preferredScope === option.id;
                  const IconComponent = option.icon;
                  
                  return (
                    <Card 
                      key={option.id}
                      className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        isSelected 
                          ? `ring-2 ring-${option.color}-500 bg-${option.color}-50 shadow-lg` 
                          : 'hover:bg-gray-50 shadow-md hover:shadow-lg'
                      }`}
                    >
                      <CardContent className="p-6 text-center space-y-4">
                        <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                        <Label htmlFor={option.id} className="cursor-pointer space-y-4 block">
                          <div className="text-4xl mb-2">{option.illustration}</div>
                          <IconComponent className={`h-10 w-10 mx-auto text-${option.color}-600`} />
                          <h3 className="text-xl font-bold text-gray-800">{option.title}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {option.description}
                          </p>
                          <div className="space-y-2">
                            {option.benefits.map((benefit, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                <CheckCircle className={`h-4 w-4 text-${option.color}-500`} />
                                <span>{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </Label>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </RadioGroup>
          </div>

          {/* Success Metrics */}
          {country && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200 animate-scale-in">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-indigo-600" />
                  <div className="text-2xl font-bold text-indigo-900">25K+</div>
                  <div className="text-sm text-indigo-700">Active Members</div>
                </div>
                <div>
                  <Network className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-2xl font-bold text-purple-900">180+</div>
                  <div className="text-sm text-purple-700">Countries</div>
                </div>
                <div>
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-2xl font-bold text-blue-900">500+</div>
                  <div className="text-sm text-blue-700">Business Groups</div>
                </div>
                <div>
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-2xl font-bold text-green-900">95%</div>
                  <div className="text-sm text-green-700">Success Rate</div>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={handleComplete}
            disabled={!country}
            className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            size="lg"
          >
            {country ? `Find Groups in ${country} →` : 'Select Country to Continue →'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationSelector;
