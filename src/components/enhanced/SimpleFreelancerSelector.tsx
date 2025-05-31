
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, User, Briefcase } from 'lucide-react';
import { FREELANCER_SKILL_CATEGORIES } from '@/data/freelancerSkills';

interface SimpleFreelancerSelectorProps {
  onNext: (userData: {
    name: string;
    primarySkill: string;
  }) => void;
  onBack: () => void;
}

const SimpleFreelancerSelector: React.FC<SimpleFreelancerSelectorProps> = ({ onNext, onBack }) => {
  const [name, setName] = useState('');
  const [primarySkill, setPrimarySkill] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleNext = () => {
    if (name.trim() && primarySkill) {
      onNext({
        name: name.trim(),
        primarySkill
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <User className="h-6 w-6" />
              <CardTitle className="text-xl">Join as Freelancer</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-semibold text-gray-800">Quick Setup</h3>
            <p className="text-gray-600 text-lg">
              Just tell us your name and main skill to get started!
            </p>
          </div>

          {/* Name Input */}
          <div className="space-y-3">
            <Label htmlFor="name" className="text-lg font-medium flex items-center gap-2">
              <User className="h-5 w-5 text-green-600" />
              Your Full Name
            </Label>
            <Input
              id="name"
              placeholder="e.g., Sarah Johnson"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 text-lg border-2 focus:border-green-500 transition-colors"
            />
          </div>

          {/* Primary Skill by Category */}
          <div className="space-y-3">
            <Label className="text-lg font-medium flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-green-600" />
              Your Main Skill
            </Label>
            <div className="grid grid-cols-1 gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="h-12 text-lg border-2 focus:border-green-500">
                  <SelectValue placeholder="Choose a category first..." />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  {Object.keys(FREELANCER_SKILL_CATEGORIES).map((category) => (
                    <SelectItem key={category} value={category} className="text-base py-3">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedCategory && (
                <Select value={primarySkill} onValueChange={setPrimarySkill}>
                  <SelectTrigger className="h-12 text-lg border-2 focus:border-green-500">
                    <SelectValue placeholder="Select your main skill..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-80">
                    {FREELANCER_SKILL_CATEGORIES[selectedCategory as keyof typeof FREELANCER_SKILL_CATEGORIES].map((skill) => (
                      <SelectItem key={skill} value={skill} className="text-base py-3">
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          <Button
            onClick={handleNext}
            disabled={!name.trim() || !primarySkill}
            className="w-full h-12 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
            size="lg"
          >
            Continue to Location →
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleFreelancerSelector;
