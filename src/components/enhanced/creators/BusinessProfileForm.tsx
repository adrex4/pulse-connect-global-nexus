
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Building2, Upload, X } from 'lucide-react';

interface BusinessProfileFormProps {
  businessName: string;
  setBusinessName: (name: string) => void;
  products: string;
  setProducts: (products: string) => void;
  website: string;
  setWebsite: (website: string) => void;
  images: string[];
  videos: string[];
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleVideoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (index: number) => void;
  removeVideo: (index: number) => void;
}

const BusinessProfileForm: React.FC<BusinessProfileFormProps> = ({
  businessName,
  setBusinessName,
  products,
  setProducts,
  website,
  setWebsite,
  images,
  videos,
  handleImageUpload,
  handleVideoUpload,
  removeImage,
  removeVideo
}) => {
  return (
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
  );
};

export default BusinessProfileForm;
