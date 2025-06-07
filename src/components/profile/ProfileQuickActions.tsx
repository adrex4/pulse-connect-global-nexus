
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MessageSquare, Target, TrendingUp, BookOpen
} from 'lucide-react';

interface ProfileQuickActionsProps {
  handleDirectMessaging: () => void;
  handleSkillsEndorsements: () => void;
  handleActivityAnalytics: () => void;
  handlePortfolioManagement: () => void;
}

const ProfileQuickActions: React.FC<ProfileQuickActionsProps> = ({
  handleDirectMessaging,
  handleSkillsEndorsements,
  handleActivityAnalytics,
  handlePortfolioManagement
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 bg-gradient-to-br from-blue-50 to-blue-100" onClick={handleDirectMessaging}>
        <CardContent className="p-6 text-center">
          <div className="mb-4 p-4 bg-blue-100 rounded-full w-fit mx-auto group-hover:bg-blue-200 transition-colors">
            <MessageSquare className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="font-semibold text-blue-900 mb-2">Direct Messages</h3>
          <p className="text-sm text-blue-700">Private conversations & networking</p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 bg-gradient-to-br from-green-50 to-green-100" onClick={handleSkillsEndorsements}>
        <CardContent className="p-6 text-center">
          <div className="mb-4 p-4 bg-green-100 rounded-full w-fit mx-auto group-hover:bg-green-200 transition-colors">
            <Target className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="font-semibold text-green-900 mb-2">Skills & Endorsements</h3>
          <p className="text-sm text-green-700">Showcase your expertise</p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 bg-gradient-to-br from-purple-50 to-purple-100" onClick={handleActivityAnalytics}>
        <CardContent className="p-6 text-center">
          <div className="mb-4 p-4 bg-purple-100 rounded-full w-fit mx-auto group-hover:bg-purple-200 transition-colors">
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="font-semibold text-purple-900 mb-2">Analytics Dashboard</h3>
          <p className="text-sm text-purple-700">Track your progress & growth</p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 bg-gradient-to-br from-yellow-50 to-yellow-100" onClick={handlePortfolioManagement}>
        <CardContent className="p-6 text-center">
          <div className="mb-4 p-4 bg-yellow-100 rounded-full w-fit mx-auto group-hover:bg-yellow-200 transition-colors">
            <BookOpen className="h-8 w-8 text-yellow-600" />
          </div>
          <h3 className="font-semibold text-yellow-900 mb-2">Portfolio Manager</h3>
          <p className="text-sm text-yellow-700">Showcase your best work</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileQuickActions;
