
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, Camera, X } from 'lucide-react';

interface ProfilePictureUploaderProps {
  onImageSelect: (imageUrl: string | null) => void;
  currentImage?: string;
  userName?: string;
  className?: string;
}

const ProfilePictureUploader: React.FC<ProfilePictureUploaderProps> = ({
  onImageSelect,
  currentImage,
  userName = 'User',
  className = ''
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(currentImage || null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setSelectedImage(imageUrl);
        onImageSelect(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    onImageSelect(null);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Label className="text-lg font-medium flex items-center gap-2">
        <Camera className="h-4 w-4" />
        Profile Picture
      </Label>
      
      <div className="flex items-center gap-6">
        <div className="relative">
          <Avatar className="h-24 w-24 border-4 border-gray-200">
            <AvatarImage src={selectedImage || ''} />
            <AvatarFallback className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
          
          {selectedImage && (
            <Button
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
              onClick={removeImage}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="profile-picture-upload"
            />
            <label htmlFor="profile-picture-upload" className="cursor-pointer">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 font-medium">
                {selectedImage ? 'Change Photo' : 'Upload Photo'}
              </p>
              <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
            </label>
          </div>
          
          {selectedImage && (
            <Button variant="outline" onClick={removeImage} size="sm" className="w-full">
              Remove Photo
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureUploader;
