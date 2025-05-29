
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Building2, Upload, X } from 'lucide-react';

interface BusinessProfileCreatorProps {
  onNext: (businessData: {
    businessName: string;
    products: string;
    website?: string;
    images: string[];
    videos: string[];
  }) => void;
  onBack: () => void;
}

const BusinessProfileCreator: React.FC<BusinessProfileCreatorProps> = ({ onNext, onBack }) => {
  const [businessName, setBusinessName] = useState('');
  const [products, setProducts] = useState('');
  const [website, setWebsite] = useState('');
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
        images,
        videos
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <Building2 className="h-6 w-6" />
              <CardTitle className="text-xl">Create Your Business Profile</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-semibold text-gray-800">Tell Us About Your Business</h3>
            <p className="text-gray-600">
              Share your business details to connect with potential partners, clients, and opportunities.
            </p>
          </div>

          {/* Business Name */}
          <div className="space-y-3">
            <Label htmlFor="businessName" className="text-lg font-medium">
              Business/Company Name *
            </Label>
            <Input
              id="businessName"
              placeholder="e.g., Smith Consulting LLC, TechStart Inc."
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="h-12 text-lg border-2 focus:border-blue-500"
            />
          </div>

          {/* Products/Services */}
          <div className="space-y-3">
            <Label htmlFor="products" className="text-lg font-medium">
              Products/Services Offered *
            </Label>
            <Textarea
              id="products"
              placeholder="Describe what products or services your business offers..."
              value={products}
              onChange={(e) => setProducts(e.target.value)}
              className="min-h-[100px] text-lg border-2 focus:border-blue-500"
            />
          </div>

          {/* Website (Optional) */}
          <div className="space-y-3">
            <Label htmlFor="website" className="text-lg font-medium">
              Website (Optional)
            </Label>
            <Input
              id="website"
              placeholder="https://www.yourwebsite.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="h-12 text-lg border-2 focus:border-blue-500"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-3">
            <Label className="text-lg font-medium">Business Images</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-600">Click to upload business images</p>
                <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </label>
            </div>
            
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={image} alt={`Business ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 h-6 w-6 p-0"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Video Upload */}
          <div className="space-y-3">
            <Label className="text-lg font-medium">Business Videos</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                accept="video/*"
                multiple
                onChange={handleVideoUpload}
                className="hidden"
                id="video-upload"
              />
              <label htmlFor="video-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-600">Click to upload business videos</p>
                <p className="text-sm text-gray-500">MP4, MOV, AVI up to 50MB</p>
              </label>
            </div>
            
            {videos.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {videos.map((video, index) => (
                  <div key={index} className="relative">
                    <video src={video} className="w-full h-32 object-cover rounded-lg" controls />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 h-6 w-6 p-0"
                      onClick={() => removeVideo(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            onClick={handleNext}
            disabled={!businessName.trim() || !products.trim()}
            className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            size="lg"
          >
            Continue to Location Setup →
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessProfileCreator;
