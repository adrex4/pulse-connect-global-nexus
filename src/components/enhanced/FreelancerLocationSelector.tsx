
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, MapPin, Globe } from 'lucide-react';
import { UserType } from '@/types/connectPulse';
import { COUNTRIES } from '@/data/countries';

interface FreelancerLocationSelectorProps {
  userType: UserType;
  onNext: (data: any) => void;
  onBack: () => void;
}

const FreelancerLocationSelector: React.FC<FreelancerLocationSelectorProps> = ({
  userType,
  onNext,
  onBack
}) => {
  const [selectedCountry, setSelectedCountry] = useState('default_country');
  const [preferredScope, setPreferredScope] = useState<'local' | 'regional' | 'global'>('global');

  const handleComplete = () => {
    if (selectedCountry && selectedCountry !== 'default_country') {
      onNext({
        country: selectedCountry,
        preferredScope
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6" />
              <CardTitle className="text-xl">Set Your Location</CardTitle>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-8 space-y-8">
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-semibold text-gray-800">Where are you located?</h3>
            <p className="text-gray-600 text-lg">
              Help clients find you and connect with local opportunities
            </p>
          </div>

          <div className="max-w-md mx-auto space-y-6">
            {/* Country Selection */}
            <div className="space-y-3">
              <Label className="text-lg font-medium flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                Your Country
              </Label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="h-12 text-lg border-2 focus:border-green-500">
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
            </div>

            {/* Working Scope */}
            <div className="space-y-4">
              <Label className="text-lg font-medium flex items-center gap-2">
                <Globe className="h-5 w-5 text-green-600" />
                Preferred Working Scope
              </Label>
              
              <div className="space-y-3">
                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    preferredScope === 'local' 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-50/50'
                  }`}
                  onClick={() => setPreferredScope('local')}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-900">Local Focus</h4>
                      <p className="text-sm text-green-700">Work primarily with clients in your country</p>
                    </div>
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
                  <div className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Regional Network</h4>
                      <p className="text-sm text-blue-700">Expand to neighboring countries and regions</p>
                    </div>
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
                  <div className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-purple-600" />
                    <div>
                      <h4 className="font-semibold text-purple-900">Global Reach</h4>
                      <p className="text-sm text-purple-700">Work with clients worldwide</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            {selectedCountry && selectedCountry !== 'default_country' && (
              <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 animate-scale-in">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-900">Your Setup</p>
                    <p className="text-green-700">{selectedCountry} • {preferredScope.charAt(0).toUpperCase() + preferredScope.slice(1)} scope</p>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handleComplete}
              disabled={!selectedCountry || selectedCountry === 'default_country'}
              className="w-full h-12 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Continue to Groups →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreelancerLocationSelector;
