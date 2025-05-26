
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Image, Upload, Camera, Link, X, Crop, Filter, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageSelect: (imageUrl: string, caption?: string) => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ isOpen, onClose, onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlAdd = () => {
    if (imageUrl) {
      setSelectedImage(imageUrl);
    }
  };

  const handleSendImage = () => {
    if (selectedImage) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        onImageSelect(selectedImage, caption);
        setIsUploading(false);
        toast({
          title: "Image sent!",
          description: "Your image has been shared with the group.",
        });
        handleClose();
      }, 1000);
    }
  };

  const handleClose = () => {
    setSelectedImage(null);
    setImageUrl('');
    setCaption('');
    setIsUploading(false);
    onClose();
  };

  const capturePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // In a real app, you'd show camera preview and capture
      toast({
        title: "Camera feature",
        description: "Camera capture would be implemented here.",
      });
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to take photos.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Image className="h-5 w-5 text-blue-600" />
            Share Image
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {!selectedImage ? (
            <div className="space-y-4">
              {/* Upload Options */}
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-6 w-6" />
                  <span className="text-xs">Upload</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                  onClick={capturePhoto}
                >
                  <Camera className="h-6 w-6" />
                  <span className="text-xs">Camera</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2"
                  onClick={() => {}}
                >
                  <Link className="h-6 w-6" />
                  <span className="text-xs">URL</span>
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* URL Input */}
              <div className="space-y-2">
                <Label>Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Paste image URL here..."
                  />
                  <Button onClick={handleUrlAdd} variant="outline">
                    Add
                  </Button>
                </div>
              </div>

              {/* Recent Images */}
              <div className="space-y-2">
                <Label className="text-sm">Recent Images</Label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gray-200 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors"
                      onClick={() => setSelectedImage(`https://picsum.photos/400/400?random=${i}`)}
                    >
                      <Image className="h-6 w-6 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Image Preview */}
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full max-h-64 object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 rounded-full w-8 h-8 p-0"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Image Tools */}
              <div className="flex gap-2 justify-center">
                <Button variant="outline" size="sm">
                  <Crop className="h-4 w-4 mr-2" />
                  Crop
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Palette className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>

              {/* Caption */}
              <div className="space-y-2">
                <Label>Caption (optional)</Label>
                <Input
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Add a caption..."
                  maxLength={200}
                />
                <p className="text-xs text-gray-500 text-right">{caption.length}/200</p>
              </div>

              {/* Send Button */}
              <Button 
                onClick={handleSendImage} 
                className="w-full" 
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Image className="h-4 w-4 mr-2" />
                    Send Image
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadModal;
