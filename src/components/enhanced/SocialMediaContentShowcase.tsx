
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Upload, X, Play, Image, FileText, Link, Star, Eye, Heart } from 'lucide-react';

interface ContentItem {
  id: string;
  type: 'image' | 'video' | 'post' | 'link';
  url?: string;
  file?: string;
  title: string;
  description: string;
  stats?: {
    views: number;
    likes: number;
    shares: number;
  };
}

interface SocialMediaContentShowcaseProps {
  onNext: (contentData: {
    portfolio: ContentItem[];
    achievements: string[];
    collaborations: string[];
  }) => void;
  onBack: () => void;
}

const SocialMediaContentShowcase: React.FC<SocialMediaContentShowcaseProps> = ({ onNext, onBack }) => {
  const [portfolio, setPortfolio] = useState<ContentItem[]>([]);
  const [achievements, setAchievements] = useState<string[]>(['']);
  const [collaborations, setCollaborations] = useState<string[]>(['']);
  const [newContent, setNewContent] = useState({
    type: 'image' as ContentItem['type'],
    title: '',
    description: '',
    url: '',
    file: ''
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setNewContent(prev => ({
            ...prev,
            file: e.target!.result as string,
            type
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addContentItem = () => {
    if (newContent.title.trim() && (newContent.file || newContent.url.trim())) {
      const contentItem: ContentItem = {
        id: Date.now().toString(),
        type: newContent.type,
        title: newContent.title.trim(),
        description: newContent.description.trim(),
        ...(newContent.file ? { file: newContent.file } : { url: newContent.url.trim() }),
        stats: {
          views: Math.floor(Math.random() * 10000) + 1000,
          likes: Math.floor(Math.random() * 1000) + 100,
          shares: Math.floor(Math.random() * 100) + 10
        }
      };
      
      setPortfolio(prev => [...prev, contentItem]);
      setNewContent({
        type: 'image',
        title: '',
        description: '',
        url: '',
        file: ''
      });
    }
  };

  const removeContentItem = (id: string) => {
    setPortfolio(prev => prev.filter(item => item.id !== id));
  };

  const updateAchievement = (index: number, value: string) => {
    const updated = [...achievements];
    updated[index] = value;
    setAchievements(updated);
  };

  const addAchievement = () => {
    setAchievements(prev => [...prev, '']);
  };

  const removeAchievement = (index: number) => {
    setAchievements(prev => prev.filter((_, i) => i !== index));
  };

  const updateCollaboration = (index: number, value: string) => {
    const updated = [...collaborations];
    updated[index] = value;
    setCollaborations(updated);
  };

  const addCollaboration = () => {
    setCollaborations(prev => [...prev, '']);
  };

  const removeCollaboration = (index: number) => {
    setCollaborations(prev => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    onNext({
      portfolio,
      achievements: achievements.filter(a => a.trim()),
      collaborations: collaborations.filter(c => c.trim())
    });
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      <Card className="shadow-xl border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white rounded-t-lg">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <Star className="h-6 w-6" />
              <CardTitle className="text-2xl">Showcase Your Content</CardTitle>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-8 space-y-8">
          <div className="text-center space-y-3">
            <h3 className="text-3xl font-bold text-gray-800">Build Your Portfolio</h3>
            <p className="text-gray-600 text-lg">
              Showcase your best content, highlight achievements, and display brand collaborations to attract new opportunities.
            </p>
          </div>

          {/* Content Upload Section */}
          <Card className="border-2 border-dashed border-gray-300 hover:border-pink-400 transition-colors">
            <CardContent className="p-6 space-y-4">
              <h4 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Upload className="h-5 w-5 text-pink-500" />
                Add New Content
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contentTitle">Content Title *</Label>
                  <Input
                    id="contentTitle"
                    placeholder="Give your content a catchy title"
                    value={newContent.title}
                    onChange={(e) => setNewContent(prev => ({ ...prev, title: e.target.value }))}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label>Content Type</Label>
                  <div className="flex gap-2 mt-1">
                    {(['image', 'video', 'post', 'link'] as const).map((type) => (
                      <Button
                        key={type}
                        type="button"
                        variant={newContent.type === type ? "default" : "outline"}
                        onClick={() => setNewContent(prev => ({ ...prev, type }))}
                        className="capitalize"
                      >
                        {type === 'image' && <Image className="h-4 w-4 mr-1" />}
                        {type === 'video' && <Play className="h-4 w-4 mr-1" />}
                        {type === 'post' && <FileText className="h-4 w-4 mr-1" />}
                        {type === 'link' && <Link className="h-4 w-4 mr-1" />}
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="contentDesc">Description</Label>
                <Textarea
                  id="contentDesc"
                  placeholder="Describe your content and its impact"
                  value={newContent.description}
                  onChange={(e) => setNewContent(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1"
                />
              </div>

              {(newContent.type === 'image' || newContent.type === 'video') && (
                <div className="space-y-2">
                  <Label>Upload {newContent.type === 'image' ? 'Image' : 'Video'}</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-pink-400 transition-colors">
                    <input
                      type="file"
                      accept={newContent.type === 'image' ? 'image/*' : 'video/*'}
                      onChange={(e) => handleFileUpload(e, newContent.type as 'image' | 'video')}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-600">Click to upload {newContent.type}</p>
                    </label>
                    {newContent.file && (
                      <div className="mt-4">
                        {newContent.type === 'image' ? (
                          <img src={newContent.file} alt="Preview" className="max-h-32 mx-auto rounded" />
                        ) : (
                          <video src={newContent.file} className="max-h-32 mx-auto rounded" controls />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {(newContent.type === 'post' || newContent.type === 'link') && (
                <div>
                  <Label htmlFor="contentUrl">URL *</Label>
                  <Input
                    id="contentUrl"
                    placeholder="https://instagram.com/p/your-post"
                    value={newContent.url}
                    onChange={(e) => setNewContent(prev => ({ ...prev, url: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              )}

              <Button 
                onClick={addContentItem}
                disabled={!newContent.title.trim() || (!newContent.file && !newContent.url.trim())}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
              >
                Add to Portfolio
              </Button>
            </CardContent>
          </Card>

          {/* Portfolio Display */}
          {portfolio.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-800">Your Portfolio</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {portfolio.map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <h5 className="font-semibold text-gray-800 truncate">{item.title}</h5>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeContentItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {item.file && (
                        <div className="aspect-video bg-gray-100 rounded overflow-hidden">
                          {item.type === 'image' ? (
                            <img src={item.file} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <video src={item.file} className="w-full h-full object-cover" controls />
                          )}
                        </div>
                      )}
                      
                      {item.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                      )}
                      
                      {item.stats && (
                        <div className="flex justify-between text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {item.stats.views.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {item.stats.likes.toLocaleString()}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Achievements Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-semibold text-gray-800">Key Achievements</h4>
              <Button onClick={addAchievement} variant="outline" size="sm">
                Add Achievement
              </Button>
            </div>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="e.g., Reached 100K followers, Viral video with 1M views"
                    value={achievement}
                    onChange={(e) => updateAchievement(index, e.target.value)}
                    className="flex-1"
                  />
                  {achievements.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAchievement(index)}
                      className="text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Brand Collaborations Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-semibold text-gray-800">Brand Collaborations</h4>
              <Button onClick={addCollaboration} variant="outline" size="sm">
                Add Collaboration
              </Button>
            </div>
            <div className="space-y-3">
              {collaborations.map((collaboration, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="e.g., Nike campaign, Samsung product review"
                    value={collaboration}
                    onChange={(e) => updateCollaboration(index, e.target.value)}
                    className="flex-1"
                  />
                  {collaborations.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCollaboration(index)}
                      className="text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={handleNext}
            disabled={portfolio.length === 0}
            className="w-full h-12 text-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-700"
            size="lg"
          >
            Continue to Final Review →
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaContentShowcase;
