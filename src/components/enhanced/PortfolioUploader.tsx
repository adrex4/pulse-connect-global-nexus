
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Upload, Plus, X, Image, FileText, Video, Link, Star, Award, Briefcase } from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  type: 'image' | 'video' | 'document' | 'link';
  url: string;
  tags: string[];
}

interface PortfolioUploaderProps {
  onSave: (items: PortfolioItem[]) => void;
  userType: 'freelancer' | 'occupation_provider' | 'social_media_influencer';
  onBack?: () => void;
}

const PortfolioUploader: React.FC<PortfolioUploaderProps> = ({ onSave, userType, onBack }) => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [newItem, setNewItem] = useState<Partial<PortfolioItem>>({
    title: '',
    description: '',
    type: 'image',
    url: '',
    tags: []
  });
  const [currentTag, setCurrentTag] = useState('');

  const getTitle = () => {
    switch (userType) {
      case 'freelancer':
        return 'Showcase Your Best Work';
      case 'occupation_provider':
        return 'Showcase Your Services';
      case 'social_media_influencer':
        return 'Showcase Your Content';
      default:
        return 'Build Your Portfolio';
    }
  };

  const getDescription = () => {
    switch (userType) {
      case 'freelancer':
        return 'Upload examples of your work, projects, and achievements to attract potential clients.';
      case 'occupation_provider':
        return 'Show examples of your services, before/after photos, and customer testimonials.';
      case 'social_media_influencer':
        return 'Share your best content, collaborations, and showcase your unique style and reach.';
      default:
        return 'Share your work and achievements.';
    }
  };

  const getIcon = () => {
    switch (userType) {
      case 'freelancer':
        return <Briefcase className="h-6 w-6" />;
      case 'occupation_provider':
        return <Award className="h-6 w-6" />;
      case 'social_media_influencer':
        return <Star className="h-6 w-6" />;
      default:
        return <Upload className="h-6 w-6" />;
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !newItem.tags?.includes(currentTag.trim())) {
      setNewItem({
        ...newItem,
        tags: [...(newItem.tags || []), currentTag.trim()]
      });
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewItem({
      ...newItem,
      tags: newItem.tags?.filter(tag => tag !== tagToRemove) || []
    });
  };

  const addPortfolioItem = () => {
    if (newItem.title && newItem.url) {
      const item: PortfolioItem = {
        id: Date.now().toString(),
        title: newItem.title,
        description: newItem.description || '',
        type: newItem.type || 'image',
        url: newItem.url,
        tags: newItem.tags || []
      };
      
      setPortfolioItems([...portfolioItems, item]);
      setNewItem({
        title: '',
        description: '',
        type: 'image',
        url: '',
        tags: []
      });
    }
  };

  const removePortfolioItem = (id: string) => {
    setPortfolioItems(portfolioItems.filter(item => item.id !== id));
  };

  const handleSave = () => {
    onSave(portfolioItems);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      case 'link': return <Link className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <div className="flex items-center gap-3">
              {getIcon()}
              <CardTitle className="text-xl">{getTitle()}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-semibold text-gray-800">{getTitle()}</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {getDescription()}
            </p>
          </div>

          {/* Add New Item Form */}
          <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
            <CardContent className="p-6 space-y-6">
              <h4 className="text-lg font-semibold flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-500" />
                Add Portfolio Item
              </h4>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Website Redesign Project"
                    value={newItem.title || ''}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    className="h-12"
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="type">Type</Label>
                  <select
                    id="type"
                    value={newItem.type || 'image'}
                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value as 'image' | 'video' | 'document' | 'link' })}
                    className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                    <option value="document">Document</option>
                    <option value="link">Link</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="url">URL or File Path *</Label>
                <Input
                  id="url"
                  placeholder="https://example.com/my-work.jpg"
                  value={newItem.url || ''}
                  onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                  className="h-12"
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your work, the challenges solved, and the results achieved..."
                  value={newItem.description || ''}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="space-y-3">
                <Label>Tags (Skills, Technologies, etc.)</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1"
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newItem.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      {tag}
                      <button onClick={() => removeTag(tag)} className="hover:text-blue-600">
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={addPortfolioItem}
                disabled={!newItem.title || !newItem.url}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add to Portfolio
              </Button>
            </CardContent>
          </Card>

          {/* Portfolio Items */}
          {portfolioItems.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Your Portfolio ({portfolioItems.length} items)</h4>
              <div className="grid gap-4">
                {portfolioItems.map((item) => (
                  <Card key={item.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getTypeIcon(item.type)}
                            <h5 className="font-semibold">{item.title}</h5>
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded capitalize">
                              {item.type}
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          )}
                          <p className="text-xs text-blue-600 break-all">{item.url}</p>
                          {item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePortfolioItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              onClick={handleSave}
              className="flex-1 h-12 text-lg"
            >
              Skip Portfolio
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 h-12 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Continue →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioUploader;
