
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, MapPin } from 'lucide-react';

interface FreelancerLocationProps {
  onLocationSelect: (location: { country: string; scope: 'local' | 'regional' | 'global' }) => void;
  onBack: () => void;
}

const COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  'Australia',
  'India',
  'Brazil',
  'Other'
];

const FreelancerLocation: React.FC<FreelancerLocationProps> = ({ onLocationSelect, onBack }) => {
  const [country, setCountry] = useState<string>('');
  const [scope, setScope] = useState<'local' | 'regional' | 'global'>('global');

  const handleNext = () => {
    if (country) {
      onLocationSelect({ country, scope });
    }
  };

  return (
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
      <CardContent className="p-8 space-y-6">
        <div>
          <label className="text-lg font-medium mb-3 block">Country</label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map((countryOption) => (
                <SelectItem key={countryOption} value={countryOption}>
                  {countryOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-lg font-medium mb-3 block">Work Scope</label>
          <Select value={scope} onValueChange={(value: 'local' | 'regional' | 'global') => setScope(value)}>
            <SelectTrigger className="h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="local">Local (Same city/region)</SelectItem>
              <SelectItem value="regional">Regional (Same country)</SelectItem>
              <SelectItem value="global">Global (Worldwide)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleNext}
          disabled={!country}
          className="w-full h-12 text-lg"
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );
};

export default FreelancerLocation;
