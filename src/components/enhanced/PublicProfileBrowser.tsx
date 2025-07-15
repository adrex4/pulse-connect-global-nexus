
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Eye, Briefcase, Users, Star, TrendingUp } from 'lucide-react';
import { PublicProfileBrowserProps } from '@/types/publicBrowser';
import { usePublicBrowserData } from '@/hooks/usePublicBrowserData';
import BrowserTabs from './browser/BrowserTabs';
import SearchFilters from './browser/SearchFilters';
import ResultsSection from './browser/ResultsSection';
import AdvancedBusinessBrowser from './AdvancedBusinessBrowser';
import FreelancerMarketplace from '../FreelancerMarketplace';
import SocialMediaBrowser from './SocialMediaBrowser';
import LocalServicesBrowser from './LocalServicesBrowser';

const PublicProfileBrowser: React.FC<PublicProfileBrowserProps> = ({ 
  onGetStarted, 
  initialFilter = null,
  onViewOpportunities 
}) => {
  const [activeTab, setActiveTab] = useState<'businesses' | 'freelancers' | 'groups' | 'social_media' | 'local_services'>(
    initialFilter === 'social_media' ? 'social_media' : 
    initialFilter === 'businesses' ? 'businesses' :
    initialFilter === 'freelancers' ? 'freelancers' :
    initialFilter === 'groups' ? 'groups' :
    initialFilter === 'local_services' ? 'local_services' : 'businesses'
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all_locations');
  const [selectedCategory, setSelectedCategory] = useState('all_categories');

  const {
    profiles,
    groups,
    loading,
    availableCategories,
    availableLocations,
    fetchLocations,
    fetchCategories,
    fetchProfiles,
    fetchGroups
  } = usePublicBrowserData();

  useEffect(() => {
    fetchLocations();
    if (activeTab !== 'freelancers' && activeTab !== 'social_media' && activeTab !== 'local_services') {
      fetchCategories(activeTab as 'businesses' | 'groups');
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'groups') {
      fetchGroups(searchTerm, selectedLocation, selectedCategory);
    } else if (activeTab === 'businesses') {
      fetchProfiles('businesses', searchTerm, selectedLocation, selectedCategory);
    }
  }, [activeTab, searchTerm, selectedLocation, selectedCategory]);

  const handleTabChange = (tab: 'businesses' | 'freelancers' | 'groups' | 'social_media' | 'local_services') => {
    setActiveTab(tab);
    setSelectedCategory('all_categories');
    if (tab !== 'freelancers' && tab !== 'social_media' && tab !== 'local_services') {
      fetchCategories(tab as 'businesses' | 'groups');
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedLocation('all_locations');
    setSelectedCategory('all_categories');
  };

  // If local services tab is active, show the LocalServicesBrowser component
  if (activeTab === 'local_services') {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Explore ConnectPulse Community</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing creators, businesses, and groups before joining our platform.
          </p>
        </div>

        {/* Tabs */}
        <BrowserTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Local Services Browser */}
        <LocalServicesBrowser onCreateProfile={onGetStarted} />

        {/* Call to Action */}
        <div className="text-center space-y-4 py-8">
          <h3 className="text-2xl font-semibold text-gray-800">Ready to Join ConnectPulse?</h3>
          <p className="text-gray-600">Create your profile and start connecting with customers in your area.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 text-white font-medium"
            >
              Get Started Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            {onViewOpportunities && (
              <Button 
                onClick={onViewOpportunities}
                size="lg"
                variant="outline"
                className="border-2 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Eye className="h-5 w-5 mr-2" />
                View Opportunities
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // If social media tab is active, show the SocialMediaBrowser component
  if (activeTab === 'social_media') {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Explore ConnectPulse Community</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing creators, businesses, and groups before joining our platform.
          </p>
        </div>

        {/* Tabs */}
        <BrowserTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Social Media Browser */}
        <SocialMediaBrowser
          onCreateProfile={onGetStarted}
          showFilters={true}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Call to Action */}
        <div className="text-center space-y-4 py-8">
          <h3 className="text-2xl font-semibold text-gray-800">Ready to Join ConnectPulse?</h3>
          <p className="text-gray-600">Create your profile and start connecting with amazing people in your industry.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 text-white font-medium"
            >
              Get Started Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            {onViewOpportunities && (
              <Button 
                onClick={onViewOpportunities}
                size="lg"
                variant="outline"
                className="border-2 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Eye className="h-5 w-5 mr-2" />
                View Opportunities
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // If freelancers tab is active, show the FreelancerMarketplace component
  if (activeTab === 'freelancers') {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Explore ConnectPulse Community</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing creators, businesses, and groups before joining our platform.
          </p>
        </div>

        {/* Tabs */}
        <BrowserTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Freelancer Marketplace */}
        <FreelancerMarketplace />

        {/* Call to Action */}
        <div className="text-center space-y-4 py-8">
          <h3 className="text-2xl font-semibold text-gray-800">Ready to Join ConnectPulse?</h3>
          <p className="text-gray-600">Create your profile and start connecting with amazing people in your industry.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 text-white font-medium"
            >
              Get Started Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            {onViewOpportunities && (
              <Button 
                onClick={onViewOpportunities}
                size="lg"
                variant="outline"
                className="border-2 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Eye className="h-5 w-5 mr-2" />
                View Opportunities
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // If businesses tab is active, show the AdvancedBusinessBrowser component
  if (activeTab === 'businesses') {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Explore ConnectPulse Community</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing creators, businesses, and groups before joining our platform.
          </p>
        </div>

        {/* Tabs */}
        <BrowserTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Advanced Business Browser */}
        <AdvancedBusinessBrowser onCreateBusiness={onGetStarted} />

        {/* Call to Action */}
        <div className="text-center space-y-4 py-8">
          <h3 className="text-2xl font-semibold text-gray-800">Ready to Join ConnectPulse?</h3>
          <p className="text-gray-600">Create your profile and start connecting with amazing people in your industry.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 text-white font-medium"
            >
              Get Started Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            {onViewOpportunities && (
              <Button 
                onClick={onViewOpportunities}
                size="lg"
                variant="outline"
                className="border-2 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Eye className="h-5 w-5 mr-2" />
                View Opportunities
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Groups tab - enhanced with group content and opportunities section
  return (
    <div className="space-y-8">
      <div className="flex justify-end mb-2">
        <button onClick={onGetStarted ? onGetStarted : () => window.location.reload()} className="px-4 py-2 bg-purple-600 text-white rounded shadow hover:bg-purple-700 transition">Back to Choose Your Path</button>
      </div>
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Explore ConnectPulse Community</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover amazing creators, businesses, and groups before joining our platform.
        </p>
      </div>

      {/* Tabs */}
      <BrowserTabs activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Opportunities Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-gray-800 mb-2">Community Opportunities</CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Explore opportunities shared by our vibrant community of professionals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-sm mb-1">Job Postings</h4>
              <p className="text-xs text-gray-600">Find your next career opportunity</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-green-100">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-sm mb-1">Collaborations</h4>
              <p className="text-xs text-gray-600">Partner up on exciting projects</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-purple-100">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-sm mb-1">Services</h4>
              <p className="text-xs text-gray-600">Discover professional services</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-orange-100">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-sm mb-1">Marketplace</h4>
              <p className="text-xs text-gray-600">Buy and sell products & services</p>
            </div>
          </div>
          {onViewOpportunities && (
            <div className="text-center">
              <Button 
                onClick={onViewOpportunities}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Eye className="h-5 w-5 mr-2" />
                View All Opportunities
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Group Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
          <h3 className="text-xl font-semibold text-blue-800 mb-3">Professional Groups</h3>
          <p className="text-blue-700 mb-4">Connect with industry leaders, share insights, and grow your professional network.</p>
          <div className="text-sm text-blue-600">• Business Groups • Industry Forums • Networking Groups</div>
        </div>
        
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-lg border border-pink-200">
          <h3 className="text-xl font-semibold text-pink-800 mb-3">Creator Groups</h3>
          <p className="text-pink-700 mb-4">Collaborate with fellow creators, share content strategies, and find brand partnerships.</p>
          <div className="text-sm text-pink-600">• Influencer Networks • Content Creator Groups • Brand Partnerships</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
          <h3 className="text-xl font-semibold text-green-800 mb-3">Skill-Based Groups</h3>
          <p className="text-green-700 mb-4">Learn from experts, share knowledge, and collaborate on projects in your field.</p>
          <div className="text-sm text-green-600">• Tech Groups • Design Groups • Freelancer Networks</div>
        </div>
      </div>

      {/* Search and Filters */}
      <SearchFilters
        activeTab={activeTab}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        availableLocations={availableLocations}
        availableCategories={availableCategories}
      />

      {/* Results */}
      <div className="max-w-6xl mx-auto">
        <ResultsSection
          activeTab={activeTab}
          loading={loading}
          profiles={profiles}
          groups={groups}
          onResetFilters={handleResetFilters}
        />
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-4 py-8">
        <h3 className="text-2xl font-semibold text-gray-800">Ready to Join ConnectPulse?</h3>
        <p className="text-gray-600">Create your profile and start connecting with amazing groups in your industry.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 text-white font-medium"
          >
            Get Started Now
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          {onViewOpportunities && (
            <Button 
              onClick={onViewOpportunities}
              size="lg"
              variant="outline"
              className="border-2 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Eye className="h-5 w-5 mr-2" />
              View Opportunities
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicProfileBrowser;
