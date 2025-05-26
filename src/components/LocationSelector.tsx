
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, MapPin, Globe, Users } from 'lucide-react';
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

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle>Choose Your Location & Scope</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900">Hello, {user.name}!</h3>
            <p className="text-blue-700">Niche: {user.niche}</p>
          </div>

          <div className="space-y-4">
            <Label>Select Your Country</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger>
                <SelectValue placeholder="Choose your country" />
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

          <div className="space-y-4">
            <Label>Preferred Group Scope</Label>
            <RadioGroup value={preferredScope} onValueChange={(value: 'local' | 'regional' | 'global') => setPreferredScope(value)}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className={`cursor-pointer transition-colors ${preferredScope === 'local' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}>
                  <CardContent className="p-4 text-center">
                    <RadioGroupItem value="local" id="local" className="sr-only" />
                    <Label htmlFor="local" className="cursor-pointer space-y-2 block">
                      <MapPin className="h-8 w-8 mx-auto text-green-600" />
                      <h3 className="font-semibold">Local</h3>
                      <p className="text-sm text-gray-600">
                        Connect with businesses in your country
                      </p>
                    </Label>
                  </CardContent>
                </Card>

                <Card className={`cursor-pointer transition-colors ${preferredScope === 'regional' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}>
                  <CardContent className="p-4 text-center">
                    <RadioGroupItem value="regional" id="regional" className="sr-only" />
                    <Label htmlFor="regional" className="cursor-pointer space-y-2 block">
                      <Users className="h-8 w-8 mx-auto text-blue-600" />
                      <h3 className="font-semibold">Regional</h3>
                      <p className="text-sm text-gray-600">
                        Connect within your region (continent/area)
                      </p>
                    </Label>
                  </CardContent>
                </Card>

                <Card className={`cursor-pointer transition-colors ${preferredScope === 'global' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}>
                  <CardContent className="p-4 text-center">
                    <RadioGroupItem value="global" id="global" className="sr-only" />
                    <Label htmlFor="global" className="cursor-pointer space-y-2 block">
                      <Globe className="h-8 w-8 mx-auto text-purple-600" />
                      <h3 className="font-semibold">Global</h3>
                      <p className="text-sm text-gray-600">
                        Connect with businesses worldwide
                      </p>
                    </Label>
                  </CardContent>
                </Card>
              </div>
            </RadioGroup>
          </div>

          <Button
            onClick={handleComplete}
            disabled={!country}
            className="w-full"
            size="lg"
          >
            Find My Groups
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationSelector;
