
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImagePlus, X, FileText, Video, Music, Camera } from 'lucide-react';

interface PortfolioItem {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document';
  title: string;
  description?: string;
  file: File | null;
  previewUrl?: string;
}

interface PortfolioUploaderProps {
  onSave: (items: PortfolioItem[]) => void;
  userType: 'freelancer' | 'occupation_provider' | 'social_media_influencer';
}

const PortfolioUploader: React.FC<PortfolioUploaderProps> = ({ onSave, userType }) => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [currentItem, setCurrentItem] = useState<PortfolioItem>({
    id: '',
    type: 'image',
    title: '',
    description: '',
    file: null
  });
  const [isAddingItem, setIsAddingItem] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    let type: 'image' | 'video' | 'audio' | 'document' = 'document';
    
    if (file.type.startsWith('image/')) {
      type = 'image';
    } else if (file.type.startsWith('video/')) {
      type = 'video';
    } else if (file.type.startsWith('audio/')) {
      type = 'audio';
    }

    const previewUrl = URL.createObjectURL(file);
    
    setCurrentItem({
      ...currentItem,
      id: Date.now().toString(),
      type,
      file,
      previewUrl
    });
  };

  const handleAddItem = () => {
    if (!currentItem.file || !currentItem.title.trim()) return;
    
    setPortfolioItems([...portfolioItems, currentItem]);
    setCurrentItem({
      id: '',
      type: 'image',
      title: '',
      description: '',
      file: null
    });
    setIsAddingItem(false);
  };

  const handleRemoveItem = (id: string) => {
    const updatedItems = portfolioItems.filter(item => item.id !== id);
    setPortfolioItems(updatedItems);
  };

  const handleSavePortfolio = () => {
    onSave(portfolioItems);
  };

  const getItemIcon = (type: 'image' | 'video' | 'audio' | 'document') => {
    switch (type) {
      case 'image': return <ImagePlus className="h-6 w-6 text-blue-600" />;
      case 'video': return <Video className="h-6 w-6 text-red-600" />;
      case 'audio': return <Music className="h-6 w-6 text-green-600" />;
      case 'document': return <FileText className="h-6 w-6 text-purple-600" />;
    }
  };

  const getUploadPrompt = () => {
    switch (userType) {
      case 'freelancer':
        return "Showcase your best freelance work to attract more clients.";
      case 'occupation_provider':
        return "Share examples of your services to build trust with potential clients.";
      case 'social_media_influencer':
        return "Highlight your top content and collaborations to connect with brands.";
      default:
        return "Upload examples of your work to your portfolio.";
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <Camera className="h-6 w-6" />
          <CardTitle className="text-xl">Showcase Your Work</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-8 space-y-6">
        <div className="text-center space-y-3">
          <h3 className="text-2xl font-semibold text-gray-800">Portfolio & Work Samples</h3>
          <p className="text-gray-600">
            {getUploadPrompt()}
          </p>
        </div>

        {/* Portfolio Items List */}
        <div className="space-y-4">
          {portfolioItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {portfolioItems.map((item) => (
                <div key={item.id} className="border rounded-lg overflow-hidden relative group">
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  
                  <div className="h-40 bg-gray-100 flex items-center justify-center">
                    {item.type === 'image' && item.previewUrl && (
                      <img 
                        src={item.previewUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {item.type === 'video' && item.previewUrl && (
                      <video 
                        src={item.previewUrl}
                        controls
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {item.type === 'audio' && (
                      <div className="w-full p-4 flex items-center justify-center bg-gray-50">
                        <Music className="h-10 w-10 text-green-600" />
                      </div>
                    )}
                    
                    {item.type === 'document' && (
                      <div className="w-full p-4 flex items-center justify-center bg-gray-50">
                        <FileText className="h-10 w-10 text-purple-600" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3 bg-white">
                    <h4 className="font-medium line-clamp-1">{item.title}</h4>
                    {item.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 border-2 border-dashed rounded-lg">
              <p className="text-gray-500">
                You haven't added any portfolio items yet. Add samples of your work to impress potential clients.
              </p>
            </div>
          )}
        </div>

        {/* Add New Item Form */}
        {isAddingItem ? (
          <div className="border rounded-lg p-4 space-y-4">
            <h4 className="font-semibold">Add Portfolio Item</h4>
            
            <div className="space-y-3">
              <Label htmlFor="file">Upload File</Label>
              <Input 
                id="file" 
                type="file" 
                accept="image/*,video/*,audio/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
                onChange={handleFileSelect}
              />
              <p className="text-xs text-gray-500">
                Supported formats: Images, Videos, Audio, PDF, Word documents
              </p>
            </div>
            
            {currentItem.file && (
              <>
                <div className="space-y-3">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    value={currentItem.title} 
                    onChange={(e) => setCurrentItem({...currentItem, title: e.target.value})}
                    placeholder="Enter a title for this work"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea 
                    id="description" 
                    value={currentItem.description} 
                    onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})}
                    placeholder="Briefly describe this work"
                  />
                </div>
              </>
            )}
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddingItem(false)}>Cancel</Button>
              <Button 
                onClick={handleAddItem}
                disabled={!currentItem.file || !currentItem.title.trim()}
              >
                Add to Portfolio
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button onClick={() => setIsAddingItem(true)} className="gap-2">
              <ImagePlus className="h-4 w-4" />
              Add Portfolio Item
            </Button>
          </div>
        )}

        <div className="flex justify-end">
          <Button 
            onClick={handleSavePortfolio} 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Save Portfolio
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioUploader;
