
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, X, CheckCircle, Award } from 'lucide-react';
import { UserType } from '@/types/connectPulse';

interface FreelancerGigFormProps {
  userType: UserType;
  formData: {
    gigTitle: string;
    category: string;
    description: string;
    skills: string[];
    hourlyRate: string;
    experience: string;
  };
  customSkill: string;
  setCustomSkill: (skill: string) => void;
  handleInputChange: (field: string, value: string) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
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

const FreelancerGigForm: React.FC<FreelancerGigFormProps> = ({
  userType,
  formData,
  customSkill,
  setCustomSkill,
  handleInputChange,
  addSkill,
  removeSkill
}) => {
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
  const suggestedSkills = formData.category ? SKILL_SUGGESTIONS[formData.category as keyof typeof SKILL_SUGGESTIONS] || [] : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column */}
      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-lg font-semibold flex items-center gap-2">
            <Award className="h-5 w-5 text-green-500" />
            Service Title *
          </Label>
          <Input
            placeholder={placeholders.title}
            value={formData.gigTitle}
            onChange={(e) => handleInputChange('gigTitle', e.target.value)}
            className="h-12 text-lg border-2 focus:border-green-500 transition-colors"
          />
        </div>

        <div className="space-y-3">
          <Label className="text-lg font-semibold">Category *</Label>
          <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
            <SelectTrigger className="h-12 text-lg border-2 focus:border-green-500">
              <SelectValue placeholder="Select your category" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white">
              {FREELANCER_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-lg font-semibold">Experience Level</Label>
          <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
            <SelectTrigger className="h-12 text-lg border-2 focus:border-green-500">
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white">
              <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
              <SelectItem value="intermediate">Intermediate (2-4 years)</SelectItem>
              <SelectItem value="expert">Expert (5+ years)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label className="text-lg font-semibold">Hourly Rate (Optional)</Label>
          <Input
            placeholder="e.g., $50/hour"
            value={formData.hourlyRate}
            onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
            className="h-12 text-lg border-2 focus:border-green-500 transition-colors"
          />
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-lg font-semibold">Description *</Label>
          <Textarea
            placeholder={placeholders.description}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="min-h-[120px] text-lg border-2 focus:border-green-500 resize-none"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-lg font-semibold">Skills & Expertise</Label>
          
          {/* Add Custom Skill */}
          <div className="flex gap-3">
            <Input
              placeholder="Add a skill..."
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSkill(customSkill)}
              className="flex-1 h-12 border-2 focus:border-green-500"
            />
            <Button 
              onClick={() => addSkill(customSkill)}
              disabled={!customSkill}
              className="h-12 px-6 bg-green-600 hover:bg-green-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Suggested Skills */}
          {suggestedSkills.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Suggested skills for {formData.category}:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedSkills.map((skill) => (
                  <Button
                    key={skill}
                    variant="outline"
                    size="sm"
                    onClick={() => addSkill(skill)}
                    disabled={formData.skills.includes(skill)}
                    className={`text-sm transition-all duration-200 ${
                      formData.skills.includes(skill)
                        ? "bg-green-100 border-green-300 text-green-700 cursor-not-allowed"
                        : "hover:bg-green-50 hover:border-green-400"
                    }`}
                  >
                    {formData.skills.includes(skill) && <CheckCircle className="h-3 w-3 mr-1" />}
                    {skill}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Selected Skills */}
          {formData.skills.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Your skills ({formData.skills.length}):</p>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-3 py-2 bg-green-100 text-green-800 border border-green-200">
                    {skill}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSkill(skill)}
                      className="ml-2 h-4 w-4 p-0 hover:bg-red-100 hover:text-red-600 transition-colors"
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
  );
};

export default FreelancerGigForm;
