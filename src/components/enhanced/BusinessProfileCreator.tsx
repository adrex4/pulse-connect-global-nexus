
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProfilePictureUploader from './ProfilePictureUploader';
import BusinessProfileHeader from './creators/BusinessProfileHeader';
import BusinessProfileForm from './creators/BusinessProfileForm';

interface BusinessProfileCreatorProps {
  onNext: (businessData: {
    businessName: string;
    products: string;
    website?: string;
    profileImage?: string;
    images: string[];
    videos: string[];
  }) => void;
  onBack: () => void;
}

const BusinessProfileCreator: React.FC<BusinessProfileCreatorProps> = ({ onNext, onBack }) => {
  const [businessName, setBusinessName] = useState('');
  const [products, setProducts] = useState('');
  const [website, setWebsite] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImages(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setVideos(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setVideos(prev => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (businessName.trim() && products.trim()) {
      onNext({
        businessName: businessName.trim(),
        products: products.trim(),
        website: website.trim() || undefined,
        profileImage: profileImage || undefined,
        images,
        videos
      });
    }
  };

  const isFormValid = businessName.trim() && products.trim();

  return (
    <div className="max-w-5xl mx-auto animate-fade-in p-4">
      <Card className="shadow-2xl border-0 bg-white overflow-hidden">
        <BusinessProfileHeader onBack={onBack} />
        
        <CardContent className="p-8 space-y-8 bg-gradient-to-br from-gray-50 to-white">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tell Us About Your Business
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Share your business details to connect with potential partners, clients, and opportunities.
            </p>
          </div>

          {/* Profile Picture */}
          <div className="flex justify-center">
            <ProfilePictureUploader
              onImageSelect={setProfileImage}
              currentImage={profileImage || undefined}
              userName={businessName || 'Business'}
            />
          </div>

          <BusinessProfileForm
            businessName={businessName}
            setBusinessName={setBusinessName}
            products={products}
            setProducts={setProducts}
            website={website}
            setWebsite={setWebsite}
            images={images}
            videos={videos}
            handleImageUpload={handleImageUpload}
            handleVideoUpload={handleVideoUpload}
            removeImage={removeImage}
            removeVideo={removeVideo}
          />

          {/* Progress Indicator */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Profile Completion</span>
                <span>{Math.round((Object.values({businessName, products}).filter(Boolean).length / 2) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(Object.values({businessName, products}).filter(Boolean).length / 2) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={handleNext}
              disabled={!isFormValid}
              className={`h-14 px-8 text-lg font-semibold transition-all duration-300 ${
                isFormValid 
                  ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transform hover:scale-105" 
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              size="lg"
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

export default BusinessProfileCreator;
