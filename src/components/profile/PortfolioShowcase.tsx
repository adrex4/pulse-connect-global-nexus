import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, ExternalLink, Calendar, Star, Eye, Heart,
  Image, Video, FileText, Code, Palette, Camera,
  Edit, Trash2, Share, Download, Award, TrendingUp
} from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  type: 'image' | 'video' | 'document' | 'code' | 'design';
  category: string;
  tags: string[];
  url?: string;
  thumbnail?: string;
  date: string;
  views: number;
  likes: number;
  featured: boolean;
}

const PortfolioShowcase: React.FC = () => {
  const [portfolioItems] = useState<PortfolioItem[]>([
    {
      id: '1',
      title: 'E-commerce React Application',
      description: 'Full-stack e-commerce platform built with React, Node.js, and PostgreSQL',
      type: 'code',
      category: 'Web Development',
      tags: ['React', 'Node.js', 'PostgreSQL', 'E-commerce'],
      url: 'https://github.com/example/ecommerce-app',
      date: '2024-01-15',
      views: 234,
      likes: 18,
      featured: true
    },
    {
      id: '2',
      title: 'Mobile App UI Design',
      description: 'Modern mobile app interface design for a fitness tracking application',
      type: 'design',
      category: 'UI/UX Design',
      tags: ['Figma', 'Mobile', 'UI Design', 'Fitness'],
      thumbnail: '/placeholder.svg',
      date: '2024-01-10',
      views: 156,
      likes: 24,
      featured: true
    },
    {
      id: '3',
      title: 'Brand Identity Package',
      description: 'Complete brand identity design including logo, color palette, and guidelines',
      type: 'design',
      category: 'Branding',
      tags: ['Logo Design', 'Branding', 'Color Theory'],
      thumbnail: '/placeholder.svg',
      date: '2024-01-05',
      views: 189,
      likes: 32,
      featured: false
    },
    {
      id: '4',
      title: 'Data Visualization Dashboard',
      description: 'Interactive dashboard for business analytics with real-time data updates',
      type: 'code',
      category: 'Data Visualization',
      tags: ['D3.js', 'React', 'Analytics', 'Dashboard'],
      url: 'https://example.com/dashboard',
      date: '2023-12-20',
      views: 98,
      likes: 15,
      featured: false
    },
    {
      id: '5',
      title: 'Photography Portfolio',
      description: 'Collection of professional portrait and landscape photography',
      type: 'image',
      category: 'Photography',
      tags: ['Portrait', 'Landscape', 'Photography'],
      thumbnail: '/placeholder.svg',
      date: '2023-12-15',
      views: 267,
      likes: 41,
      featured: false
    },
    {
      id: '6',
      title: 'Product Demo Video',
      description: 'Animated product demonstration video showcasing key features',
      type: 'video',
      category: 'Video Production',
      tags: ['Animation', 'Product Demo', 'After Effects'],
      thumbnail: '/placeholder.svg',
      date: '2023-12-10',
      views: 145,
      likes: 28,
      featured: false
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddItem, setShowAddItem] = useState(false);

  const categories = ['all', ...Array.from(new Set(portfolioItems.map(item => item.category)))];

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      case 'code': return <Code className="h-4 w-4" />;
      case 'design': return <Palette className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'image': return 'bg-green-100 text-green-800';
      case 'video': return 'bg-red-100 text-red-800';
      case 'document': return 'bg-blue-100 text-blue-800';
      case 'code': return 'bg-purple-100 text-purple-800';
      case 'design': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Portfolio</h2>
          <p className="text-gray-600">Showcase your best work and achievements</p>
        </div>
        <Dialog open={showAddItem} onOpenChange={setShowAddItem}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-violet-500 to-cyan-500">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Portfolio Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Project title..." />
              <Textarea placeholder="Project description..." rows={3} />
              <Input placeholder="Category..." />
              <Input placeholder="Tags (comma separated)..." />
              <Input placeholder="Project URL (optional)..." />
              <div className="flex gap-2">
                <Button className="flex-1">Add Project</Button>
                <Button variant="outline" onClick={() => setShowAddItem(false)}>Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Portfolio Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-800">{portfolioItems.length}</div>
            <div className="text-sm text-blue-600">Total Projects</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <Eye className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-800">
              {portfolioItems.reduce((acc, item) => acc + item.views, 0)}
            </div>
            <div className="text-sm text-green-600">Total Views</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4 text-center">
            <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-800">
              {portfolioItems.reduce((acc, item) => acc + item.likes, 0)}
            </div>
            <div className="text-sm text-red-600">Total Likes</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-800">
              {portfolioItems.filter(item => item.featured).length}
            </div>
            <div className="text-sm text-purple-600">Featured Projects</div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "bg-gradient-to-r from-violet-500 to-cyan-500" : ""}
          >
            {category === 'all' ? 'All Categories' : category}
          </Button>
        ))}
      </div>

      {/* Featured Projects */}
      {selectedCategory === 'all' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Featured Projects
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {portfolioItems.filter(item => item.featured).map((item) => (
              <Card key={item.id} className="shadow-lg border-0 bg-gradient-to-br from-white/80 to-yellow-50/50">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {getTypeIcon(item.type)}
                        {item.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getTypeColor(item.type)}>
                          {item.type}
                        </Badge>
                        <Badge variant="secondary">{item.category}</Badge>
                      </div>
                    </div>
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {item.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {item.likes}
                      </span>
                    </div>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {item.url && (
                      <Button size="sm" variant="outline" className="flex-1">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View Project
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Share className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Projects Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">
          {selectedCategory === 'all' ? 'All Projects' : `${selectedCategory} Projects`}
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    {getTypeIcon(item.type)}
                    {item.title}
                  </CardTitle>
                  {item.featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getTypeColor(item.type)}>
                    {item.type}
                  </Badge>
                  <Badge variant="outline">{item.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {item.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {item.likes}
                    </span>
                  </div>
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>

                <div className="flex gap-1">
                  {item.url ? (
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                  )}
                  <Button size="sm" variant="outline" className="px-2">
                    <Share className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="px-2">
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <Camera className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No projects found</h3>
          <p className="text-gray-500 mb-4">
            {selectedCategory === 'all' 
              ? "Start building your portfolio by adding your first project." 
              : `No projects found in ${selectedCategory} category.`}
          </p>
          <Button onClick={() => setShowAddItem(true)} className="bg-gradient-to-r from-violet-500 to-cyan-500">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Project
          </Button>
        </div>
      )}
    </div>
  );
};

export default PortfolioShowcase;
