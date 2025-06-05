
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Building2, Upload, X, CheckCircle } from 'lucide-react';
import ProfilePictureUploader from './ProfilePictureUploader';

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
        <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack} 
              className="text-white hover:bg-white/20 transition-all duration-200 z-10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Building2 className="h-6 w-6" />
              </div>
              <CardTitle className="text-2xl font-bold">Create Your Business Profile</CardTitle>
            </div>
          </div>
        </CardHeader>
        
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Business Name */}
              <div className="space-y-3">
                <Label htmlFor="businessName" className="text-lg font-semibold flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-500" />
                  Business/Company Name *
                </Label>
                <Input
                  id="businessName"
                  placeholder="e.g., Smith Consulting LLC, TechStart Inc."
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="h-12 text-lg border-2 focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Products/Services */}
              <div className="space-y-3">
                <Label htmlFor="products" className="text-lg font-semibold">
                  Products/Services Offered *
                </Label>
                <Textarea
                  id="products"
                  placeholder="Describe what products or services your business offers..."
                  value={products}
                  onChange={(e) => setProducts(e.target.value)}
                  className="min-h-[120px] text-lg border-2 focus:border-blue-500 resize-none"
                />
              </div>

              {/* Website (Optional) */}
              <div className="space-y-3">
                <Label htmlFor="website" className="text-lg font-semibold">
                  Website (Optional)
                </Label>
                <Input
                  id="website"
                  placeholder="https://www.yourwebsite.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="h-12 text-lg border-2 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Product/Service Images */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Product/Service Images</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer block">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600 font-medium">Click to upload product/service images</p>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                  </label>
                </div>
                
                {images.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img src={image} alt={`Product/Service ${index + 1}`} className="w-full h-32 object-cover rounded-lg border-2 border-gray-200" />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product/Service Videos */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold">Product/Service Videos</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={handleVideoUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <label htmlFor="video-upload" className="cursor-pointer block">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600 font-medium">Click to upload product/service videos</p>
                    <p className="text-sm text-gray-500 mt-1">MP4, MOV, AVI up to 50MB</p>
                  </label>
                </div>
                
                {videos.length > 0 && (
                  <div className="grid grid-cols-1 gap-4">
                    {videos.map((video, index) => (
                      <div key={index} className="relative group">
                        <video src={video} className="w-full h-32 object-cover rounded-lg border-2 border-gray-200" controls />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeVideo(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

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
