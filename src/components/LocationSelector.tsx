
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, MapPin, Users, Globe } from 'lucide-react';
import { User } from '@/types/connectPulse';
import { COUNTRIES } from '@/data/countries';

interface LocationSelectorProps {
  user: User;
  onComplete: (userData: Omit<User, 'id'>) => void;
  onBack: () => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ user, onComplete, onBack }) => {
  const [selectedCountry, setSelectedCountry] = useState('default_country');
  const [preferredScope, setPreferredScope] = useState<'local' | 'regional' | 'global'>('local');

  const handleComplete = () => {
    if (selectedCountry && selectedCountry !== 'default_country') {
      onComplete({
        name: user.name,
        niche: user.niche,
        country: selectedCountry,
        preferredScope
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6" />
              <CardTitle className="text-xl">Set Your Location & Preferences</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          {/* Welcome Message */}
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-semibold text-gray-800">Almost There, {user.name}!</h3>
            <p className="text-gray-600 text-lg">
              Let us know where you're located and your networking preferences to connect you with the right communities.
            </p>
          </div>

          {/* Country Selection */}
          <div className="space-y-3">
            <Label className="text-lg font-medium flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Your Country
            </Label>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="h-12 text-lg border-2 focus:border-blue-500">
                <SelectValue placeholder="Select your country..." />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                <SelectItem value="default_country">Select your country...</SelectItem>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country} value={country} className="text-base py-3">
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500">
              This helps us connect you with local and regional business communities
            </p>
          </div>

          {/* Networking Scope Preference */}
          <div className="space-y-4">
            <Label className="text-lg font-medium flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              Preferred Networking Scope
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  preferredScope === 'local' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-green-300 hover:bg-green-50/50'
                }`}
                onClick={() => setPreferredScope('local')}
              >
                <div className="text-center">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h4 className="font-semibold text-green-900">Local Focus</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Connect primarily with businesses in your country
                  </p>
                </div>
              </div>

              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  preferredScope === 'regional' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
                onClick={() => setPreferredScope('regional')}
              >
                <div className="text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-semibold text-blue-900">Regional Network</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Expand to neighboring countries and regions
                  </p>
                </div>
              </div>

              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  preferredScope === 'global' 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                }`}
                onClick={() => setPreferredScope('global')}
              >
                <div className="text-center">
                  <Globe className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h4 className="font-semibold text-purple-900">Global Reach</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    Connect with businesses worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          {selectedCountry && selectedCountry !== 'default_country' && (
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 animate-scale-in">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-blue-900">Your Location & Scope</p>
                  <p className="text-blue-700">{selectedCountry} • {preferredScope.charAt(0).toUpperCase() + preferredScope.slice(1)} networking</p>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={handleComplete}
            disabled={!selectedCountry || selectedCountry === 'default_country'}
            className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            size="lg"
          >
            Complete Setup & Find Groups →
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationSelector;
