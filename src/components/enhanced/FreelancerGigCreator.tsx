import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Briefcase, Plus, X } from 'lucide-react';
import { UserType } from '@/types/connectPulse';
import ProfilePictureUploader from './ProfilePictureUploader';

interface FreelancerGigCreatorProps {
  userType: UserType;
  onNext: (data: any) => void;
  onBack: () => void;
}

const FREELANCER_CATEGORIES = [
  'Web Development',
  'Mobile Development',
  'Graphic Design',
  'Content Writing',
  'Digital Marketing',
  'Video Editing',
  'Photography',
  'Translation',
  'Data Analysis',
  'Virtual Assistant',
  'Consulting',
  'Other'
];

const SKILL_SUGGESTIONS = {
  'Web Development': ['React', 'Node.js', 'Python', 'JavaScript', 'HTML/CSS', 'PHP', 'WordPress'],
  'Mobile Development': ['React Native', 'Flutter', 'iOS', 'Android', 'Swift', 'Kotlin'],
  'Graphic Design': ['Photoshop', 'Illustrator', 'Figma', 'Logo Design', 'Branding', 'UI/UX'],
  'Content Writing': ['Blog Writing', 'Copywriting', 'SEO Writing', 'Technical Writing', 'Social Media'],
  'Digital Marketing': ['SEO', 'Google Ads', 'Facebook Ads', 'Social Media Marketing', 'Email Marketing'],
  'Video Editing': ['Premiere Pro', 'After Effects', 'Final Cut Pro', 'Motion Graphics'],
  'Photography': ['Portrait Photography', 'Product Photography', 'Event Photography', 'Photo Editing'],
  'Translation': ['English', 'Spanish', 'French', 'German', 'Chinese', 'Arabic'],
  'Data Analysis': ['Excel', 'Python', 'R', 'SQL', 'Tableau', 'Power BI'],
  'Virtual Assistant': ['Administrative Support', 'Customer Service', 'Data Entry', 'Research'],
  'Consulting': ['Business Strategy', 'Marketing Strategy', 'Financial Consulting', 'HR Consulting'],
  'Other': []
};

const FreelancerGigCreator: React.FC<FreelancerGigCreatorProps> = ({
  userType,
  onNext,
  onBack
}) => {
  const [formData, setFormData] = useState({
    gigTitle: '',
    category: '',
    description: '',
    skills: [] as string[],
    hourlyRate: '',
    experience: '',
    profileImage: null as string | null
  });
  const [customSkill, setCustomSkill] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProfileImageChange = (imageUrl: string | null) => {
    setFormData(prev => ({ ...prev, profileImage: imageUrl }));
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
    setCustomSkill('');
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = () => {
    if (formData.gigTitle && formData.category && formData.description) {
      onNext(formData);
    }
  };

  const getUserTypeTitle = () => {
    switch (userType) {
      case 'freelancer':
        return 'Tell Us About Your Skills';
      case 'occupation_provider':
        return 'Tell Us About Your Services';
      case 'social_media_influencer':
        return 'Tell Us About Your Content';
      default:
        return 'Tell Us About Your Gig';
    }
  };

  const getPlaceholderText = () => {
    switch (userType) {
      case 'freelancer':
        return {
          title: 'e.g., Full-Stack Web Developer',
          description: 'Describe your freelance services and what makes you unique...'
        };
      case 'occupation_provider':
        return {
          title: 'e.g., Plumbing Services',
          description: 'Describe the services you provide and your expertise...'
        };
      case 'social_media_influencer':
        return {
          title: 'e.g., Lifestyle & Travel Content Creator',
          description: 'Describe your content style and audience...'
        };
      default:
        return {
          title: 'e.g., Expert Consultant',
          description: 'Describe what you do and your expertise...'
        };
    }
  };

  const placeholders = getPlaceholderText();
  const sugggestedSkills = formData.category ? SKILL_SUGGESTIONS[formData.category as keyof typeof SKILL_SUGGESTIONS] || [] : [];

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <Briefcase className="h-6 w-6" />
              <CardTitle className="text-xl">{getUserTypeTitle()}</CardTitle>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-semibold text-gray-800">
              Let's create your professional profile
            </h3>
            <p className="text-gray-600">
              Share your expertise and connect with clients who need your skills
            </p>
          </div>

          {/* Profile Picture */}
          <ProfilePictureUploader
            onImageSelect={handleProfileImageChange}
            currentImage={formData.profileImage || undefined}
            userName={formData.gigTitle || 'Professional'}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Service Title *</Label>
                <Input
                  placeholder={placeholders.title}
                  value={formData.gigTitle}
                  onChange={(e) => handleInputChange('gigTitle', e.target.value)}
                  className="mt-2 h-12"
                />
              </div>

              <div>
                <Label className="text-base font-medium">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="mt-2 h-12">
                    <SelectValue placeholder="Select your category" />
                  </SelectTrigger>
                  <SelectContent>
                    {FREELANCER_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-medium">Experience Level</Label>
                <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                  <SelectTrigger className="mt-2 h-12">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (2-4 years)</SelectItem>
                    <SelectItem value="expert">Expert (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-medium">Hourly Rate (Optional)</Label>
                <Input
                  placeholder="e.g., $50/hour"
                  value={formData.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                  className="mt-2 h-12"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Description *</Label>
                <Textarea
                  placeholder={placeholders.description}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="mt-2 min-h-[120px]"
                />
              </div>

              <div>
                <Label className="text-base font-medium">Skills & Expertise</Label>
                
                {/* Add Custom Skill */}
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Add a skill..."
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill(customSkill)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => addSkill(customSkill)}
                    size="sm"
                    disabled={!customSkill}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Suggested Skills */}
                {sugggestedSkills.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Suggested skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {sugggestedSkills.map((skill) => (
                        <Button
                          key={skill}
                          variant="outline"
                          size="sm"
                          onClick={() => addSkill(skill)}
                          disabled={formData.skills.includes(skill)}
                          className="text-xs"
                        >
                          {skill}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selected Skills */}
                {formData.skills.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Your skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="px-3 py-1">
                          {skill}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSkill(skill)}
                            className="ml-2 h-4 w-4 p-0 hover:bg-transparent"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Button
              onClick={handleSubmit}
              disabled={!formData.gigTitle || !formData.category || !formData.description}
              className="w-full h-12 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Continue to Location Setup →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreelancerGigCreator;
