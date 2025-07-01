
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, Eye, Users, MessageSquare, Star, 
  Calendar, Clock, Target, Award, Activity,
  BarChart3, PieChart, LineChart, Download
} from 'lucide-react';

interface AnalyticsData {
  profileViews: { period: string; views: number }[];
  engagement: { type: string; count: number; change: number }[];
  topSkills: { skill: string; views: number; endorsements: number }[];
  activityTrends: { date: string; messages: number; connections: number }[];
}

const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  
  const [analytics] = useState<AnalyticsData>({
    profileViews: [
      { period: 'This Week', views: 124 },
      { period: 'Last Week', views: 98 },
      { period: 'This Month', views: 456 },
      { period: 'Last Month', views: 312 }
    ],
    engagement: [
      { type: 'Profile Views', count: 456, change: 23 },
      { type: 'Skill Endorsements', count: 18, change: 12 },
      { type: 'Messages Received', count: 34, change: -5 },
      { type: 'Connections Made', count: 12, change: 8 }
    ],
    topSkills: [
      { skill: 'React Development', views: 89, endorsements: 24 },
      { skill: 'TypeScript', views: 67, endorsements: 18 },
      { skill: 'UI/UX Design', views: 54, endorsements: 15 },
      { skill: 'Project Management', views: 43, endorsements: 12 }
    ],
    activityTrends: [
      { date: '2024-01-01', messages: 5, connections: 2 },
      { date: '2024-01-02', messages: 8, connections: 1 },
      { date: '2024-01-03', messages: 12, connections: 3 },
      { date: '2024-01-04', messages: 6, connections: 0 },
      { date: '2024-01-05', messages: 15, connections: 4 }
    ]
  });

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getChangeIcon = (change: number) => {
    return change > 0 ? '↗' : change < 0 ? '↘' : '→';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
          <p className="text-gray-600">Track your professional growth and engagement</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-4">
        {analytics.engagement.map((metric, index) => (
          <Card key={index} className="shadow-lg border-0 bg-gradient-to-br from-white/80 to-blue-50/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {index === 0 && <Eye className="h-5 w-5 text-blue-600" />}
                  {index === 1 && <Star className="h-5 w-5 text-blue-600" />}
                  {index === 2 && <MessageSquare className="h-5 w-5 text-blue-600" />}
                  {index === 3 && <Users className="h-5 w-5 text-blue-600" />}
                </div>
                <Badge 
                  variant="secondary" 
                  className={`${getChangeColor(metric.change)} bg-transparent border-0`}
                >
                  {getChangeIcon(metric.change)} {Math.abs(metric.change)}%
                </Badge>
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{metric.count}</div>
              <div className="text-sm text-gray-600">{metric.type}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-violet-50 to-cyan-50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills Performance</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="growth">Growth Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Profile Views Chart */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white/80 to-purple-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  Profile Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.profileViews.map((period, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{period.period}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                            style={{ width: `${(period.views / 500) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-12 text-right">{period.views}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity Summary */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-white/80 to-green-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-600" />
                  Activity Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Most Active Time</span>
                    </div>
                    <span className="text-sm font-medium">2:00 PM - 4:00 PM</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Most Active Day</span>
                    </div>
                    <span className="text-sm font-medium">Wednesday</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Response Rate</span>
                    </div>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white/80 to-yellow-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-yellow-600" />
                Top Performing Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topSkills.map((skill, index) => (
                  <div key={index} className="p-4 bg-white/50 rounded-lg border border-yellow-100">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{skill.skill}</h3>
                      <Badge className="bg-yellow-100 text-yellow-800">#{index + 1}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Profile Views:</span>
                        <span className="font-medium">{skill.views}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Endorsements:</span>
                        <span className="font-medium">{skill.endorsements}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white/80 to-pink-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-pink-600" />
                Engagement Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Interaction Types</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Direct Messages</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-pink-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                        <span className="text-sm font-medium">70%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Skill Endorsements</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-pink-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Profile Visits</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-pink-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Engagement Quality</h3>
                  <div className="text-center p-6 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg">
                    <div className="text-3xl font-bold text-pink-600 mb-2">A+</div>
                    <div className="text-sm text-pink-700">Overall Engagement Score</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="growth">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white/80 to-blue-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Growth Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">+23%</div>
                    <div className="text-sm text-green-700">Profile Views Growth</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">+12%</div>
                    <div className="text-sm text-blue-700">Skill Endorsements Growth</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">+8%</div>
                    <div className="text-sm text-purple-700">Network Growth</div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <h3 className="font-semibold mb-3">Growth Recommendations</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-blue-500" />
                      <span>Complete your portfolio to increase profile views by 40%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-green-500" />
                      <span>Endorse 5 more skills to boost your network engagement</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-purple-500" />
                      <span>Share more content to increase your visibility by 25%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
