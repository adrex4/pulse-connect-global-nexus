
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowRight, Users, MessageSquare, Globe, 
  Briefcase, Zap, Star, TrendingUp, User
} from 'lucide-react';
import { User as UserType } from '@/types/connectPulse';

interface WelcomeSectionProps {
  onBrowse: () => void;
  onGetStarted: () => void;
  onMyProfile?: () => void;
  currentUser?: UserType | null;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ 
  onBrowse, 
  onGetStarted, 
  onMyProfile,
  currentUser 
}) => {
  const features = [
    {
      icon: Users,
      title: "Join Communities",
      description: "Connect with like-minded professionals and expand your network"
    },
    {
      icon: MessageSquare,
      title: "Real-time Chat",
      description: "Engage in meaningful conversations with direct messaging"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Access opportunities from local to international markets"
    },
    {
      icon: Briefcase,
      title: "Professional Growth",
      description: "Showcase your skills and find collaboration opportunities"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Members" },
    { number: "1.2K+", label: "Communities" },
    { number: "25K+", label: "Connections Made" },
    { number: "98%", label: "Success Rate" }
  ];

  // Handle My Profile button click with better error handling
  const handleMyProfileClick = () => {
    console.log('My Profile button clicked');
    if (onMyProfile) {
      onMyProfile();
    } else {
      console.warn('onMyProfile function not provided');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-40 right-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* User Welcome Section */}
        {currentUser && (
          <Card className="mb-8 mx-auto max-w-md">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <h3 className="font-semibold">Welcome back, {currentUser.name}!</h3>
                  <p className="text-sm text-gray-600">{currentUser.niche}</p>
                </div>
              </div>
              <Button 
                onClick={handleMyProfileClick} 
                className="w-full gap-2"
                type="button"
              >
                <User className="h-4 w-4" />
                Go to My Profile
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Top Right Profile Button for All Users */}
        {currentUser && onMyProfile && (
          <div className="absolute top-4 right-4">
            <Button 
              onClick={handleMyProfileClick} 
              variant="outline" 
              className="gap-2"
              type="button"
            >
              <User className="h-4 w-4" />
              My Account
            </Button>
          </div>
        )}

        {/* Main Header */}
        <div className="mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            <Zap className="h-4 w-4 mr-2" />
            Connect • Collaborate • Create
          </Badge>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            ConnectPulse
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            The ultimate platform for professionals to connect, collaborate, and grow together. 
            Join communities, showcase your expertise, and build meaningful relationships.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={onGetStarted} 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-lg px-8 py-6"
              type="button"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onBrowse} 
              className="text-lg px-8 py-6"
              type="button"
            >
              Browse Communities
              <Users className="ml-2 h-5 w-5" />
            </Button>

            {/* My Profile Button for non-logged in users or additional access */}
            {onMyProfile && (
              <Button 
                size="lg" 
                variant="secondary" 
                onClick={handleMyProfileClick} 
                className="text-lg px-8 py-6"
                type="button"
              >
                <User className="mr-2 h-5 w-5" />
                My Profile
              </Button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0">
          <CardContent className="pt-8 pb-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Professional Network?</h2>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of professionals who are already building meaningful connections and growing their careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                onClick={onGetStarted} 
                className="text-lg px-8"
                type="button"
              >
                Start Your Journey
                <TrendingUp className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={onBrowse} 
                className="text-lg px-8 bg-transparent border-white text-white hover:bg-white hover:text-indigo-600"
                type="button"
              >
                Explore First
                <Star className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WelcomeSection;
