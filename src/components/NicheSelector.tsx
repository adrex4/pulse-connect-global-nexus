
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search } from 'lucide-react';

const BUSINESS_NICHES = [
  'Technology & Software', 'E-commerce & Retail', 'Healthcare & Medical',
  'Finance & Fintech', 'Education & Training', 'Food & Beverage',
  'Real Estate', 'Manufacturing', 'Consulting', 'Marketing & Advertising',
  'Travel & Tourism', 'Fashion & Beauty', 'Agriculture', 'Automotive',
  'Entertainment & Media', 'Construction', 'Logistics & Transportation',
  'Energy & Utilities', 'Legal Services', 'Non-Profit', 'Sports & Fitness',
  'Art & Design', 'Photography', 'Music & Audio', 'Gaming',
  'Cryptocurrency & Blockchain', 'Environmental Services', 'Security',
  'Telecommunications', 'Other'
];

interface NicheSelectorProps {
  onNext: (name: string, niche: string) => void;
  onBack: () => void;
}

const NicheSelector: React.FC<NicheSelectorProps> = ({ onNext, onBack }) => {
  const [name, setName] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNiches = BUSINESS_NICHES.filter(niche =>
    niche.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNext = () => {
    if (name.trim() && selectedNiche) {
      onNext(name.trim(), selectedNiche);
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
            <CardTitle>Tell us about your business</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name / Business Name</Label>
            <Input
              id="name"
              placeholder="Enter your name or business name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <Label>Select Your Business Niche</Label>
            
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search niches..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-96 overflow-y-auto">
              {filteredNiches.map((niche) => (
                <Badge
                  key={niche}
                  variant={selectedNiche === niche ? "default" : "outline"}
                  className={`cursor-pointer p-3 text-center justify-center ${
                    selectedNiche === niche 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedNiche(niche)}
                >
                  {niche}
                </Badge>
              ))}
            </div>

            {selectedNiche && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  Selected: <strong>{selectedNiche}</strong>
                </p>
              </div>
            )}
          </div>

          <Button
            onClick={handleNext}
            disabled={!name.trim() || !selectedNiche}
            className="w-full"
            size="lg"
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NicheSelector;
