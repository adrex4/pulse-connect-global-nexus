
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, User, Briefcase, Globe, MapPin, DollarSign } from 'lucide-react';
import { FREELANCER_SKILLS } from '@/data/freelancerSkills';

interface FreelancerNicheSelectorProps {
  onNext: (userData: {
    name: string;
    primarySkill: string;
    skills: string[];
    hourlyRate?: number;
    currency: string;
    availability: string;
    experience: string;
    bio: string;
  }) => void;
  onBack: () => void;
}

const FreelancerNicheSelector: React.FC<FreelancerNicheSelectorProps> = ({ onNext, onBack }) => {
  const [name, setName] = useState('');
  const [primarySkill, setPrimarySkill] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [hourlyRate, setHourlyRate] = useState<number | undefined>();
  const [currency, setCurrency] = useState('USD');
  const [availability, setAvailability] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill].slice(0, 5) // Max 5 skills
    );
  };

  const handleNext = () => {
    if (name.trim() && primarySkill && availability && experience && bio.trim()) {
      onNext({
        name: name.trim(),
        primarySkill,
        skills: selectedSkills,
        hourlyRate,
        currency,
        availability,
        experience,
        bio: bio.trim()
      });
    }
  };

  const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'CHF', 'SGD', 'INR', 'BRL'];

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <User className="h-6 w-6" />
              <CardTitle className="text-xl">Create Your Freelancer Profile</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          {/* Welcome Message */}
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-semibold text-gray-800">Welcome to ConnectPulse Freelancers!</h3>
            <p className="text-gray-600 text-lg">
              Let's create your professional profile to connect you with amazing opportunities.
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

          {/* Primary Skill */}
          <div className="space-y-3">
            <Label className="text-lg font-medium flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-green-600" />
              Primary Skill/Service
            </Label>
            <Select value={primarySkill} onValueChange={setPrimarySkill}>
              <SelectTrigger className="h-12 text-lg border-2 focus:border-green-500">
                <SelectValue placeholder="What's your main expertise?" />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                {FREELANCER_SKILLS.map((skill) => (
                  <SelectItem key={skill} value={skill} className="text-base py-3">
                    {skill}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Additional Skills */}
          <div className="space-y-3">
            <Label className="text-lg font-medium">
              Additional Skills (Max 5)
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-60 overflow-y-auto border rounded-lg p-4">
              {FREELANCER_SKILLS.filter(skill => skill !== primarySkill).map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleSkillToggle(skill)}
                  disabled={!selectedSkills.includes(skill) && selectedSkills.length >= 5}
                  className={`text-sm p-2 rounded border transition-all ${
                    selectedSkills.includes(skill)
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                  } ${!selectedSkills.includes(skill) && selectedSkills.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {skill}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500">
              Selected: {selectedSkills.length}/5 skills
            </p>
          </div>

          {/* Rate and Availability */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                Hourly Rate (Optional)
              </Label>
              <Input
                type="number"
                placeholder="50"
                value={hourlyRate || ''}
                onChange={(e) => setHourlyRate(e.target.value ? Number(e.target.value) : undefined)}
                className="h-10 border-2 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="h-10 border-2 focus:border-green-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((curr) => (
                    <SelectItem key={curr} value={curr}>
                      {curr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Availability</Label>
              <Select value={availability} onValueChange={setAvailability}>
                <SelectTrigger className="h-10 border-2 focus:border-green-500">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="project-based">Project-based</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Experience Level */}
          <div className="space-y-3">
            <Label>Experience Level</Label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'entry', label: 'Entry Level', desc: '0-2 years' },
                { value: 'intermediate', label: 'Intermediate', desc: '2-5 years' },
                { value: 'expert', label: 'Expert', desc: '5+ years' }
              ].map((level) => (
                <div
                  key={level.value}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    experience === level.value
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => setExperience(level.value)}
                >
                  <h4 className="font-semibold text-gray-800">{level.label}</h4>
                  <p className="text-sm text-gray-600">{level.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-3">
            <Label>Professional Bio</Label>
            <Textarea
              placeholder="Tell potential clients about yourself, your experience, and what makes you unique..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="min-h-24 border-2 focus:border-green-500"
              maxLength={500}
            />
            <p className="text-sm text-gray-500">
              {bio.length}/500 characters
            </p>
          </div>

          <Button
            onClick={handleNext}
            disabled={!name.trim() || !primarySkill || !availability || !experience || !bio.trim()}
            className="w-full h-12 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
            size="lg"
          >
            Continue to Location Setup →
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreelancerNicheSelector;
