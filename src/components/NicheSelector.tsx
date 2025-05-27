
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Building2, Users, Globe, MapPin } from 'lucide-react';
import { BUSINESS_TYPES } from '@/data/businessTypes';

interface NicheSelectorProps {
  onNext: (name: string, niche: string) => void;
  onBack: () => void;
}

const NicheSelector: React.FC<NicheSelectorProps> = ({ onNext, onBack }) => {
  const [name, setName] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('');

  const handleNext = () => {
    if (name.trim() && selectedNiche) {
      onNext(name.trim(), selectedNiche);
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
              <Building2 className="h-6 w-6" />
              <CardTitle className="text-xl">Tell us about your business</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          {/* Welcome Message */}
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-semibold text-gray-800">Welcome to ConnectPulse!</h3>
            <p className="text-gray-600 text-lg">
              Let's get you connected with the right business community. Share some details about yourself and your business.
            </p>
          </div>

          {/* Name Input */}
          <div className="space-y-3">
            <Label htmlFor="name" className="text-lg font-medium flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Your Name / Business Name
            </Label>
            <Input
              id="name"
              placeholder="e.g., John Smith or Smith Consulting LLC"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 text-lg border-2 focus:border-blue-500 transition-colors"
            />
            <p className="text-sm text-gray-500">This is how you'll appear to other members in your groups</p>
          </div>

          {/* Business Type Dropdown */}
          <div className="space-y-3">
            <Label className="text-lg font-medium flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              Select Your Business Type
            </Label>
            <Select value={selectedNiche} onValueChange={setSelectedNiche}>
              <SelectTrigger className="h-12 text-lg border-2 focus:border-blue-500">
                <SelectValue placeholder="Choose your business category..." />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                {BUSINESS_TYPES.map((business) => (
                  <SelectItem key={business} value={business} className="text-base py-3">
                    {business}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-500">
              Select the category that best describes your business or professional area
            </p>
          </div>

          {/* Selected Business Preview */}
          {selectedNiche && (
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 animate-scale-in">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-blue-900">Selected Business Type</p>
                  <p className="text-blue-700 text-lg">{selectedNiche}</p>
                </div>
              </div>
            </div>
          )}

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="text-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <MapPin className="h-10 w-10 mx-auto mb-3 text-green-600" />
              <h4 className="font-semibold text-green-900 mb-2">Local Connections</h4>
              <p className="text-sm text-green-700">Connect with businesses in your area</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <Users className="h-10 w-10 mx-auto mb-3 text-blue-600" />
              <h4 className="font-semibold text-blue-900 mb-2">Regional Networks</h4>
              <p className="text-sm text-blue-700">Expand to your broader region</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <Globe className="h-10 w-10 mx-auto mb-3 text-purple-600" />
              <h4 className="font-semibold text-purple-900 mb-2">Global Reach</h4>
              <p className="text-sm text-purple-700">Connect worldwide in your niche</p>
            </div>
          </div>

          <Button
            onClick={handleNext}
            disabled={!name.trim() || !selectedNiche}
            className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            size="lg"
          >
            Continue to Location Setup →
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NicheSelector;
