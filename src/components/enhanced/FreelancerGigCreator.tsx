
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserType } from '@/types/connectPulse';
import ProfilePictureUploader from './ProfilePictureUploader';
import FreelancerGigHeader from './creators/FreelancerGigHeader';
import FreelancerGigForm from './creators/FreelancerGigForm';

interface FreelancerGigCreatorProps {
  userType: UserType;
  onNext: (data: any) => void;
  onBack: () => void;
}

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

  const isFormValid = formData.gigTitle && formData.category && formData.description;

  return (
    <div className="max-w-5xl mx-auto animate-fade-in p-4">
      <Card className="shadow-2xl border-0 bg-white overflow-hidden">
        <FreelancerGigHeader userType={userType} onBack={onBack} />
        
        <CardContent className="p-8 space-y-8 bg-gradient-to-br from-gray-50 to-white">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Let's create your professional profile
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Share your expertise and connect with clients who need your skills
            </p>
          </div>

          {/* Profile Picture */}
          <div className="flex justify-center">
            <ProfilePictureUploader
              onImageSelect={handleProfileImageChange}
              currentImage={formData.profileImage || undefined}
              userName={formData.gigTitle || 'Professional'}
            />
          </div>

          <FreelancerGigForm
            userType={userType}
            formData={formData}
            customSkill={customSkill}
            setCustomSkill={setCustomSkill}
            handleInputChange={handleInputChange}
            addSkill={addSkill}
            removeSkill={removeSkill}
          />

          {/* Progress Indicator */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Profile Completion</span>
                <span>{Math.round((Object.values({gigTitle: formData.gigTitle, category: formData.category, description: formData.description}).filter(Boolean).length / 3) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(Object.values({gigTitle: formData.gigTitle, category: formData.category, description: formData.description}).filter(Boolean).length / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`h-14 px-8 text-lg font-semibold transition-all duration-300 ${
                isFormValid 
                  ? "bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105" 
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {isFormValid ? (
                <>Continue to Location Setup →</>
              ) : (
                "Complete Required Fields"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreelancerGigCreator;
