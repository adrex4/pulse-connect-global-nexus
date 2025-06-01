
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { PublicProfileBrowserProps } from '@/types/publicBrowser';
import { usePublicBrowserData } from '@/hooks/usePublicBrowserData';
import BrowserTabs from './browser/BrowserTabs';
import SearchFilters from './browser/SearchFilters';
import ResultsSection from './browser/ResultsSection';
import BusinessBrowser from './BusinessBrowser';
import FreelancerMarketplace from '../FreelancerMarketplace';
import SocialMediaBrowser from './SocialMediaBrowser';

const PublicProfileBrowser: React.FC<PublicProfileBrowserProps> = ({ onGetStarted, initialFilter = null }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'businesses' | 'freelancers' | 'groups' | 'social_media'>(
    initialFilter === 'social_media' ? 'social_media' : initialFilter || 'users'
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
    // Only fetch categories for tabs that support them (not freelancers or social_media)
    if (activeTab !== 'freelancers' && activeTab !== 'social_media') {
      fetchCategories(activeTab as 'users' | 'businesses' | 'groups');
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'groups') {
      fetchGroups(searchTerm, selectedLocation, selectedCategory);
    } else if (activeTab !== 'freelancers' && activeTab !== 'social_media') {
      fetchProfiles(activeTab, searchTerm, selectedLocation, selectedCategory);
    }
  }, [activeTab, searchTerm, selectedLocation, selectedCategory]);

  const handleTabChange = (tab: 'users' | 'businesses' | 'freelancers' | 'groups' | 'social_media') => {
    setActiveTab(tab);
    setSelectedCategory('all_categories');
    if (tab !== 'freelancers' && tab !== 'social_media') {
      fetchCategories(tab as 'users' | 'businesses' | 'groups');
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedLocation('all_locations');
    setSelectedCategory('all_categories');
  };

  // If social media tab is active, show the SocialMediaBrowser component
  if (activeTab === 'social_media') {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Explore ConnectPulse Community</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing professionals, businesses, and groups before joining our platform.
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
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Get Started Now
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
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
            Discover amazing professionals, businesses, and groups before joining our platform.
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
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Get Started Now
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  // If businesses tab is active, show the BusinessBrowser component
  if (activeTab === 'businesses') {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Explore ConnectPulse Community</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing professionals, businesses, and groups before joining our platform.
          </p>
        </div>

        {/* Tabs */}
        <BrowserTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Business Browser with enhanced filters */}
        <BusinessBrowser
          onBack={() => handleTabChange('users')}
          onCreateBusiness={onGetStarted}
          showFilters={true}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          availableLocations={availableLocations}
          availableCategories={availableCategories}
        />

        {/* Call to Action */}
        <div className="text-center space-y-4 py-8">
          <h3 className="text-2xl font-semibold text-gray-800">Ready to Join ConnectPulse?</h3>
          <p className="text-gray-600">Create your profile and start connecting with amazing people in your industry.</p>
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Get Started Now
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">Explore ConnectPulse Community</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Discover amazing professionals, businesses, and groups before joining our platform.
        </p>
      </div>

      {/* Tabs */}
      <BrowserTabs activeTab={activeTab} onTabChange={handleTabChange} />

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
        <p className="text-gray-600">Create your profile and start connecting with amazing people in your industry.</p>
        <Button 
          onClick={onGetStarted}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          Get Started Now
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default PublicProfileBrowser;
