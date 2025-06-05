
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building2 } from 'lucide-react';

interface BusinessNicheSelectorProps {
  onNicheSelect: (niche: string) => void;
  onBack: () => void;
}

const BUSINESS_NICHES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Retail',
  'Manufacturing',
  'Real Estate',
  'Consulting',
  'Marketing',
  'Food & Beverage',
  'Construction',
  'Other'
];

const BusinessNicheSelector: React.FC<BusinessNicheSelectorProps> = ({ onNicheSelect, onBack }) => {
  const [selectedNiche, setSelectedNiche] = useState<string>('');

  const handleNext = () => {
    if (selectedNiche) {
      onNicheSelect(selectedNiche);
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <Building2 className="h-6 w-6" />
            <CardTitle className="text-xl">Select Your Business Niche</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {BUSINESS_NICHES.map((niche) => (
            <Button
              key={niche}
              variant={selectedNiche === niche ? "default" : "outline"}
              onClick={() => setSelectedNiche(niche)}
              className="h-12"
            >
              {niche}
            </Button>
          ))}
        </div>
        <Button
          onClick={handleNext}
          disabled={!selectedNiche}
          className="w-full mt-6 h-12 text-lg"
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );
};

export default BusinessNicheSelector;
