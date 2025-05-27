
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, User, Briefcase, Globe, MapPin, DollarSign, Clock, Star } from 'lucide-react';
import { FREELANCER_SKILL_CATEGORIES, WORK_ARRANGEMENTS, SERVICE_DELIVERY_TYPES, EXPERIENCE_LEVELS } from '@/data/freelancerSkills';

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
    workArrangement: string;
    serviceDelivery: string;
    languages: string[];
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
  const [workArrangement, setWorkArrangement] = useState('');
  const [serviceDelivery, setServiceDelivery] = useState('');
  const [languages, setLanguages] = useState<string[]>(['English']);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill].slice(0, 8) // Max 8 skills
    );
  };

  const handleNext = () => {
    if (name.trim() && primarySkill && availability && experience && bio.trim() && workArrangement && serviceDelivery) {
      onNext({
        name: name.trim(),
        primarySkill,
        skills: selectedSkills,
        hourlyRate,
        currency,
        availability,
        experience,
        bio: bio.trim(),
        workArrangement,
        serviceDelivery,
        languages
      });
    }
  };

  const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'CHF', 'SGD', 'INR', 'BRL', 'MXN', 'ZAR', 'NGN', 'KES'];
  const availabilityOptions = ['Full-time', 'Part-time', 'Project-based', 'As needed'];

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <User className="h-6 w-6" />
              <CardTitle className="text-xl">Create Your Professional Profile</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          {/* Welcome Message */}
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-semibold text-gray-800">Join ConnectPulse Professionals!</h3>
            <p className="text-gray-600 text-lg">
              Create your profile to connect with amazing opportunities and grow your professional network.
            </p>
          </div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="skills">Skills & Services</TabsTrigger>
              <TabsTrigger value="preferences">Work Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6 mt-6">
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

              {/* Bio */}
              <div className="space-y-3">
                <Label className="text-lg font-medium">Professional Bio</Label>
                <Textarea
                  placeholder="Tell potential clients about yourself, your experience, and what makes you unique. Highlight your achievements and what sets you apart..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="min-h-32 border-2 focus:border-green-500"
                  maxLength={800}
                />
                <p className="text-sm text-gray-500">
                  {bio.length}/800 characters
                </p>
              </div>

              {/* Experience Level */}
              <div className="space-y-3">
                <Label className="text-lg font-medium">Experience Level</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {EXPERIENCE_LEVELS.map((level) => (
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
                      <p className="text-sm text-gray-600">{level.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-6 mt-6">
              {/* Primary Skill by Category */}
              <div className="space-y-3">
                <Label className="text-lg font-medium flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-green-600" />
                  Primary Skill/Service
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              {/* Additional Skills */}
              {selectedCategory && (
                <div className="space-y-3">
                  <Label className="text-lg font-medium">
                    Additional Skills (Max 8)
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-80 overflow-y-auto border rounded-lg p-4">
                    {FREELANCER_SKILL_CATEGORIES[selectedCategory as keyof typeof FREELANCER_SKILL_CATEGORIES]
                      .filter(skill => skill !== primarySkill)
                      .map((skill) => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => handleSkillToggle(skill)}
                          disabled={!selectedSkills.includes(skill) && selectedSkills.length >= 8}
                          className={`text-sm p-2 rounded border transition-all ${
                            selectedSkills.includes(skill)
                              ? 'bg-green-500 text-white border-green-500'
                              : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                          } ${!selectedSkills.includes(skill) && selectedSkills.length >= 8 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {skill}
                        </button>
                      ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    Selected: {selectedSkills.length}/8 skills
                  </p>
                </div>
              )}

              {/* Rate */}
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
                      {availabilityOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6 mt-6">
              {/* Work Arrangement */}
              <div className="space-y-3">
                <Label className="text-lg font-medium flex items-center gap-2">
                  <Globe className="h-5 w-5 text-green-600" />
                  Work Arrangement
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {WORK_ARRANGEMENTS.map((arrangement) => (
                    <div
                      key={arrangement}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        workArrangement === arrangement
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                      onClick={() => setWorkArrangement(arrangement)}
                    >
                      <div className="text-center">
                        <h4 className="font-semibold text-gray-800">{arrangement}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Delivery */}
              <div className="space-y-3">
                <Label className="text-lg font-medium">Service Delivery Type</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {SERVICE_DELIVERY_TYPES.map((delivery) => (
                    <div
                      key={delivery}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        serviceDelivery === delivery
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                      onClick={() => setServiceDelivery(delivery)}
                    >
                      <div className="text-center">
                        <h4 className="font-semibold text-gray-800">{delivery}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="space-y-3">
                <Label className="text-lg font-medium">Languages You Speak</Label>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang, index) => (
                    <Badge key={index} variant="outline" className="px-3 py-1">
                      {lang}
                      {lang !== 'English' && (
                        <button
                          onClick={() => setLanguages(prev => prev.filter((_, i) => i !== index))}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a language..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        const newLang = e.currentTarget.value.trim();
                        if (!languages.includes(newLang)) {
                          setLanguages(prev => [...prev, newLang]);
                        }
                        e.currentTarget.value = '';
                      }
                    }}
                    className="flex-1"
                  />
                  <p className="text-sm text-gray-500 self-center">Press Enter to add</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Button
            onClick={handleNext}
            disabled={!name.trim() || !primarySkill || !availability || !experience || !bio.trim() || !workArrangement || !serviceDelivery}
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
