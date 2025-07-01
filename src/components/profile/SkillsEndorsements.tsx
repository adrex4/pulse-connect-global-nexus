
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Star, Plus, ThumbsUp, Award, Target, TrendingUp,
  Users, MessageSquare, Heart, CheckCircle
} from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  level: number;
  endorsements: number;
  endorsedBy: { name: string; avatar?: string }[];
}

interface Endorsement {
  id: string;
  skill: string;
  endorsedBy: string;
  endorserAvatar?: string;
  message: string;
  date: string;
}

const SkillsEndorsements: React.FC = () => {
  const [skills] = useState<Skill[]>([
    {
      id: '1',
      name: 'React Development',
      level: 95,
      endorsements: 24,
      endorsedBy: [
        { name: 'John Smith', avatar: undefined },
        { name: 'Sarah Johnson', avatar: undefined },
        { name: 'Mike Chen', avatar: undefined }
      ]
    },
    {
      id: '2',
      name: 'TypeScript',
      level: 88,
      endorsements: 18,
      endorsedBy: [
        { name: 'Emily Davis', avatar: undefined },
        { name: 'Alex Wilson', avatar: undefined }
      ]
    },
    {
      id: '3',
      name: 'UI/UX Design',
      level: 82,
      endorsements: 15,
      endorsedBy: [
        { name: 'Lisa Brown', avatar: undefined },
        { name: 'David Lee', avatar: undefined }
      ]
    },
    {
      id: '4',
      name: 'Project Management',
      level: 75,
      endorsements: 12,
      endorsedBy: [
        { name: 'Robert Taylor', avatar: undefined }
      ]
    }
  ]);

  const [endorsements] = useState<Endorsement[]>([
    {
      id: '1',
      skill: 'React Development',
      endorsedBy: 'John Smith',
      message: 'Exceptional React developer with deep understanding of modern practices.',
      date: '2 days ago'
    },
    {
      id: '2',
      skill: 'TypeScript',
      endorsedBy: 'Sarah Johnson',
      message: 'Great TypeScript skills and always writes clean, maintainable code.',
      date: '1 week ago'
    },
    {
      id: '3',
      skill: 'UI/UX Design',
      endorsedBy: 'Emily Davis',
      message: 'Creates beautiful and intuitive user interfaces.',
      date: '2 weeks ago'
    }
  ]);

  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      console.log('Adding skill:', newSkill);
      setNewSkill('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Skills Section */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white/80 to-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Your Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Skill */}
          <div className="flex gap-2">
            <Input
              placeholder="Add a new skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAddSkill} className="bg-gradient-to-r from-blue-500 to-purple-600">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Skills List */}
          <div className="space-y-4">
            {skills.map((skill) => (
              <div key={skill.id} className="p-4 bg-white/70 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{skill.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-800">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      {skill.endorsements}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Proficiency Level</span>
                    <span className="font-medium">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>

                {/* Endorsed By */}
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Endorsed by:</p>
                  <div className="flex gap-1">
                    {skill.endorsedBy.slice(0, 3).map((endorser, index) => (
                      <Avatar key={index} className="h-6 w-6">
                        <AvatarImage src={endorser.avatar} />
                        <AvatarFallback className="text-xs bg-gradient-to-r from-violet-500 to-cyan-500 text-white">
                          {endorser.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {skill.endorsedBy.length > 3 && (
                      <div className="h-6 w-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                        +{skill.endorsedBy.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Endorsements Section */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white/80 to-green-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-green-600" />
            Recent Endorsements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {endorsements.map((endorsement) => (
            <div key={endorsement.id} className="p-4 bg-white/70 rounded-lg border border-green-100">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={endorsement.endorserAvatar} />
                  <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                    {endorsement.endorsedBy.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{endorsement.endorsedBy}</span>
                    <span className="text-sm text-gray-500">endorsed you for</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {endorsement.skill}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{endorsement.message}</p>
                  <p className="text-xs text-gray-500">{endorsement.date}</p>
                </div>
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full hover:bg-green-50 border-green-200">
            View All Endorsements
          </Button>
        </CardContent>
      </Card>

      {/* Skills Statistics */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-800">{skills.length}</div>
            <div className="text-sm text-blue-600">Skills Listed</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-800">
              {skills.reduce((acc, skill) => acc + skill.endorsements, 0)}
            </div>
            <div className="text-sm text-green-600">Total Endorsements</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-800">
              {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%
            </div>
            <div className="text-sm text-purple-600">Avg. Proficiency</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SkillsEndorsements;
