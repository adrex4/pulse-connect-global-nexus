
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Users, Star, Globe, MapPin, Heart, Eye, TrendingUp, Award, Briefcase, Home, Edit, Check, Share } from 'lucide-react';

interface EnhancedSocialMediaProfilePreviewProps {
  profileData: any;
  locationData: any;
  contentData: any;
  onEdit: () => void;
  onPublish: () => void;
  onHome: () => void;
}

const EnhancedSocialMediaProfilePreview: React.FC<EnhancedSocialMediaProfilePreviewProps> = ({
  profileData,
  locationData,
  contentData,
  onEdit,
  onPublish,
  onHome
}) => {
  const totalEngagement = contentData?.portfolio?.reduce((sum: number, item: any) => 
    sum + (item.stats?.views || 0) + (item.stats?.likes || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-cyan-50 p-4">
      <div className="max-w-7xl mx-auto animate-fade-in space-y-8">
        
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={onHome} className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onEdit} className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
            <Button onClick={onPublish} className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white flex items-center gap-2">
              <Check className="h-4 w-4" />
              Publish Profile
            </Button>
          </div>
        </div>

        {/* Hero Section */}
        <Card className="overflow-hidden shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <div className="relative h-48 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-end gap-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl">
                  <Camera className="h-12 w-12 text-violet-600" />
                </div>
                <div className="flex-1 text-white">
                  <h1 className="text-4xl font-bold mb-2">{profileData?.influencerName || 'Content Creator'}</h1>
                  <div className="flex items-center gap-4 text-violet-100">
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {locationData?.country || 'Global'}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {profileData?.totalFollowers || 'Growing Community'}
                    </span>
                    <span className="flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      {profileData?.niche || 'Multi-Niche Creator'}
                    </span>
                  </div>
                </div>
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                  <Share className="h-4 w-4 mr-2" />
                  Share Profile
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* About Section */}
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
                    <Camera className="h-5 w-5 text-white" />
                  </div>
                  About {profileData?.influencerName?.split(' ')[0] || 'Creator'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {profileData?.bio && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Bio</h4>
                    <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Platforms</h4>
                    <div className="flex flex-wrap gap-2">
                      {profileData?.platforms?.map((platform: string) => (
                        <Badge key={platform} variant="secondary" className="bg-violet-100 text-violet-700">
                          {platform}
                        </Badge>
                      )) || <Badge variant="secondary">Multi-Platform</Badge>}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Content Type</h4>
                    <Badge className="bg-fuchsia-100 text-fuchsia-700">
                      {profileData?.contentType || 'Varied Content'}
                    </Badge>
                  </div>
                </div>

                {profileData?.rates && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Collaboration Rates</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 whitespace-pre-line">{profileData.rates}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Portfolio Section */}
            {contentData?.portfolio && contentData.portfolio.length > 0 && (
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    Content Portfolio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {contentData.portfolio.slice(0, 4).map((item: any) => (
                      <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="aspect-video bg-gradient-to-br from-violet-100 to-fuchsia-100 relative">
                          {item.file && (
                            item.type === 'image' ? (
                              <img src={item.file} alt={item.title} className="w-full h-full object-cover" />
                            ) : (
                              <video src={item.file} className="w-full h-full object-cover" controls />
                            )
                          )}
                          {!item.file && (
                            <div className="flex items-center justify-center h-full">
                              <Camera className="h-12 w-12 text-violet-400" />
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h5 className="font-semibold text-gray-900 mb-2">{item.title}</h5>
                          {item.description && (
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
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
                  {contentData.portfolio.length > 4 && (
                    <div className="text-center mt-6">
                      <Badge variant="secondary" className="text-sm">
                        +{contentData.portfolio.length - 4} more items in portfolio
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Stats Card */}
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Performance Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-lg">
                  <div className="text-2xl font-bold text-violet-600">
                    {totalEngagement.toLocaleString()}
                  </div>
                  <div className="text-sm text-violet-700">Total Engagement</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-fuchsia-50 rounded-lg">
                    <div className="text-lg font-bold text-fuchsia-600">
                      {contentData?.portfolio?.length || 0}
                    </div>
                    <div className="text-xs text-fuchsia-700">Portfolio Items</div>
                  </div>
                  <div className="text-center p-3 bg-cyan-50 rounded-lg">
                    <div className="text-lg font-bold text-cyan-600">
                      {profileData?.platforms?.length || 0}
                    </div>
                    <div className="text-xs text-cyan-700">Platforms</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements Card */}
            {contentData?.achievements && contentData.achievements.length > 0 && (
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    Key Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {contentData.achievements.map((achievement: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                        <Star className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Collaborations Card */}
            {contentData?.collaborations && contentData.collaborations.length > 0 && (
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-blue-500" />
                    Brand Collaborations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {contentData.collaborations.map((collaboration: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <Briefcase className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{collaboration}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Location Card */}
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-500" />
                  Location & Reach
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{locationData?.country || 'Global'}</span>
                </div>
                {locationData?.city && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{locationData.city}</span>
                  </div>
                )}
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="text-xs text-green-700 font-medium">Available for</div>
                  <div className="text-sm text-green-800">
                    {locationData?.scope === 'local' ? 'Local campaigns' : 
                     locationData?.scope === 'regional' ? 'Regional campaigns' : 'Global campaigns'}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final Actions */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Launch Your Creator Profile?</h3>
            <p className="text-violet-100 mb-6 text-lg">
              Your profile is looking amazing! Publish it now to start connecting with brands and fellow creators.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={onEdit}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                Make Changes
              </Button>
              <Button 
                onClick={onPublish}
                className="bg-white text-violet-600 hover:bg-gray-100 font-semibold px-8"
              >
                Publish Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedSocialMediaProfilePreview;
