
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Star, MapPin, Clock, DollarSign, User, Briefcase, 
  Globe, Phone, Mail, Calendar, Award, CheckCircle 
} from 'lucide-react';

interface FreelancerProfileProps {
  freelancer: {
    id: string;
    name: string;
    primarySkill: string;
    skills: string[];
    hourlyRate?: number;
    currency: string;
    availability: string;
    experience: string;
    bio: string;
    country: string;
    workArrangement: string;
    serviceDelivery: string;
    rating?: number;
    reviewCount?: number;
    completedProjects?: number;
    responseTime?: string;
    languages?: string[];
  };
  onContact?: () => void;
  onHire?: () => void;
  compact?: boolean;
}

const FreelancerProfile: React.FC<FreelancerProfileProps> = ({ 
  freelancer, 
  onContact, 
  onHire, 
  compact = false 
}) => {
  const [showFullBio, setShowFullBio] = useState(false);

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case 'entry': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'expert': return 'bg-purple-100 text-purple-800';
      case 'specialist': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (compact) {
    return (
      <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-green-500">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-green-100 text-green-700 font-semibold">
                {getInitials(freelancer.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 truncate">{freelancer.name}</h3>
                {freelancer.rating && (
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">{freelancer.rating}</span>
                  </div>
                )}
              </div>
              
              <p className="text-green-600 font-medium text-sm mb-2">{freelancer.primarySkill}</p>
              
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{freelancer.country}</span>
                </div>
                {freelancer.hourlyRate && (
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    <span>{freelancer.hourlyRate} {freelancer.currency}/hr</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-1 mb-2">
                {freelancer.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs px-2 py-0">
                    {skill}
                  </Badge>
                ))}
                {freelancer.skills.length > 3 && (
                  <Badge variant="outline" className="text-xs px-2 py-0">
                    +{freelancer.skills.length - 3}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              {onContact && (
                <Button size="sm" variant="outline" onClick={onContact}>
                  Contact
                </Button>
              )}
              {onHire && (
                <Button size="sm" onClick={onHire}>
                  Hire
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-4 border-white">
            <AvatarFallback className="bg-white text-green-600 font-bold text-xl">
              {getInitials(freelancer.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <CardTitle className="text-2xl mb-2">{freelancer.name}</CardTitle>
            <p className="text-green-100 text-lg font-medium mb-2">{freelancer.primarySkill}</p>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{freelancer.country}</span>
              </div>
              {freelancer.rating && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current text-yellow-300" />
                  <span>{freelancer.rating} ({freelancer.reviewCount} reviews)</span>
                </div>
              )}
              {freelancer.responseTime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Responds in {freelancer.responseTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{freelancer.completedProjects || 0}</div>
            <div className="text-sm text-gray-600">Projects Completed</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {freelancer.hourlyRate ? `${freelancer.hourlyRate} ${freelancer.currency}` : 'TBD'}
            </div>
            <div className="text-sm text-gray-600">Hourly Rate</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <Badge className={getExperienceColor(freelancer.experience)}>
              {freelancer.experience.charAt(0).toUpperCase() + freelancer.experience.slice(1)}
            </Badge>
            <div className="text-sm text-gray-600 mt-1">Experience</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-lg font-semibold text-purple-600">{freelancer.availability}</div>
            <div className="text-sm text-gray-600">Availability</div>
          </div>
        </div>

        {/* Bio */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <User className="h-5 w-5 text-green-600" />
            About
          </h3>
          <div className="text-gray-700 leading-relaxed">
            {showFullBio || freelancer.bio.length <= 200 ? (
              <p>{freelancer.bio}</p>
            ) : (
              <>
                <p>{freelancer.bio.substring(0, 200)}...</p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-green-600"
                  onClick={() => setShowFullBio(true)}
                >
                  Read more
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-green-600" />
            Skills & Expertise
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" className="bg-green-600 text-white">
              {freelancer.primarySkill}
            </Badge>
            {freelancer.skills.map((skill, index) => (
              <Badge key={index} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Work Preferences */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Globe className="h-5 w-5 text-green-600" />
            Work Preferences
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-gray-700">Work Arrangement: {freelancer.workArrangement}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-gray-700">Service Delivery: {freelancer.serviceDelivery}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4 border-t">
          {onContact && (
            <Button variant="outline" size="lg" onClick={onContact} className="flex-1">
              <Mail className="h-4 w-4 mr-2" />
              Contact {freelancer.name}
            </Button>
          )}
          {onHire && (
            <Button size="lg" onClick={onHire} className="flex-1 bg-green-600 hover:bg-green-700">
              <Award className="h-4 w-4 mr-2" />
              Hire Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FreelancerProfile;
