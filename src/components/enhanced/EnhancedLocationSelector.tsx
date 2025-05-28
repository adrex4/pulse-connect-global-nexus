
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, MapPin, Plus, Home, Building, Globe, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { WORLD_COUNTRIES } from '@/data/worldCountries';

interface Location {
  id: string;
  name: string;
  type: string;
  parent_id: string | null;
  country_code: string | null;
}

interface EnhancedLocationSelectorProps {
  onNext: (locationData: {
    country: string;
    state?: string;
    city?: string;
    neighborhood?: string;
    detailedAddress?: string;
    locationId: string;
  }) => void;
  onBack: () => void;
  userType: 'business' | 'freelancer' | 'occupation_provider' | 'social_media_influencer';
  showDetailedAddress?: boolean;
}

const EnhancedLocationSelector: React.FC<EnhancedLocationSelectorProps> = ({ 
  onNext, 
  onBack, 
  userType,
  showDetailedAddress = false 
}) => {
  const [countries, setCountries] = useState<Location[]>([]);
  const [states, setStates] = useState<Location[]>([]);
  const [cities, setCities] = useState<Location[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<Location[]>([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCountryName, setSelectedCountryName] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedStateName, setSelectedStateName] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCityName, setSelectedCityName] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const [selectedNeighborhoodName, setSelectedNeighborhoodName] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');
  
  const [customState, setCustomState] = useState('');
  const [customCity, setCustomCity] = useState('');
  const [customNeighborhood, setCustomNeighborhood] = useState('');
  
  const [showCustomState, setShowCustomState] = useState(false);
  const [showCustomCity, setShowCustomCity] = useState(false);
  const [showCustomNeighborhood, setShowCustomNeighborhood] = useState(false);

  const [canWork, setCanWork] = useState<'remote' | 'local' | 'both'>('both');
  const [serviceRadius, setServiceRadius] = useState<number>(10);
  const [searchingLocation, setSearchingLocation] = useState('');

  // Determine location depth based on user type
  const getLocationDepthByUserType = () => {
    switch(userType) {
      case 'occupation_provider':
        return { needsNeighborhood: true, needsDetailedAddress: true };
      case 'business':
        return { needsNeighborhood: false, needsDetailedAddress: false };
      case 'freelancer':
      case 'social_media_influencer':
        return { needsNeighborhood: false, needsDetailedAddress: false };
      default:
        return { needsNeighborhood: false, needsDetailedAddress: false };
    }
  };

  const { needsNeighborhood, needsDetailedAddress } = getLocationDepthByUserType();

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    const { data } = await supabase
      .from('locations')
      .select('*')
      .eq('type', 'country')
      .order('name');
    
    // If we don't have countries in the database or just a few, populate from our list
    if (!data || data.length < 10) {
      await populateCountries();
      const { data: refreshedData } = await supabase
        .from('locations')
        .select('*')
        .eq('type', 'country')
        .order('name');
      setCountries(refreshedData || []);
    } else {
      setCountries(data || []);
    }
  };

  const populateCountries = async () => {
    // Insert countries if they don't exist yet
    for (const country of WORLD_COUNTRIES) {
      const { data } = await supabase
        .from('locations')
        .select('id')
        .eq('name', country)
        .eq('type', 'country')
        .limit(1);
      
      if (!data || data.length === 0) {
        await supabase.from('locations').insert({
          name: country,
          type: 'country'
        });
      }
    }
  };

  const fetchStates = async (countryId: string) => {
    const { data } = await supabase
      .from('locations')
      .select('*')
      .eq('type', 'state')
      .eq('parent_id', countryId)
      .order('name');
    setStates(data || []);
  };

  const fetchCities = async (stateId: string) => {
    const { data } = await supabase
      .from('locations')
      .select('*')
      .eq('type', 'city')
      .eq('parent_id', stateId)
      .order('name');
    setCities(data || []);
  };

  const fetchNeighborhoods = async (cityId: string) => {
    const { data } = await supabase
      .from('locations')
      .select('*')
      .eq('type', 'neighborhood')
      .eq('parent_id', cityId)
      .order('name');
    setNeighborhoods(data || []);
  };

  const createLocation = async (name: string, type: string, parentId: string | null = null) => {
    const { data, error } = await supabase
      .from('locations')
      .insert({ name, type, parent_id: parentId })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating location:', error);
      return null;
    }
    return data;
  };

  const handleCountryChange = async (countryId: string) => {
    const selectedCountry = countries.find(c => c.id === countryId);
    setSelectedCountry(countryId);
    setSelectedCountryName(selectedCountry?.name || '');
    setSelectedState('');
    setSelectedCity('');
    setSelectedNeighborhood('');
    setStates([]);
    setCities([]);
    setNeighborhoods([]);
    setShowCustomState(false);
    await fetchStates(countryId);
  };

  const handleStateChange = async (stateId: string) => {
    if (stateId === 'custom') {
      setShowCustomState(true);
      return;
    }
    const selectedState = states.find(s => s.id === stateId);
    setSelectedState(stateId);
    setSelectedStateName(selectedState?.name || '');
    setSelectedCity('');
    setSelectedNeighborhood('');
    setCities([]);
    setNeighborhoods([]);
    setShowCustomCity(false);
    await fetchCities(stateId);
  };

  const handleCityChange = async (cityId: string) => {
    if (cityId === 'custom') {
      setShowCustomCity(true);
      return;
    }
    const selectedCity = cities.find(c => c.id === cityId);
    setSelectedCity(cityId);
    setSelectedCityName(selectedCity?.name || '');
    setSelectedNeighborhood('');
    setNeighborhoods([]);
    setShowCustomNeighborhood(false);
    
    if (needsNeighborhood) {
      await fetchNeighborhoods(cityId);
    }
  };

  const handleNeighborhoodChange = async (neighborhoodId: string) => {
    if (neighborhoodId === 'custom') {
      setShowCustomNeighborhood(true);
      return;
    }
    const selectedNeighborhood = neighborhoods.find(n => n.id === neighborhoodId);
    setSelectedNeighborhood(neighborhoodId);
    setSelectedNeighborhoodName(selectedNeighborhood?.name || '');
  };

  const handleAddCustomState = async () => {
    if (!customState.trim()) return;
    const newState = await createLocation(customState.trim(), 'state', selectedCountry);
    if (newState) {
      setStates(prev => [...prev, newState]);
      setSelectedState(newState.id);
      setSelectedStateName(newState.name);
      setShowCustomState(false);
      setCustomState('');
    }
  };

  const handleAddCustomCity = async () => {
    if (!customCity.trim()) return;
    const newCity = await createLocation(customCity.trim(), 'city', selectedState);
    if (newCity) {
      setCities(prev => [...prev, newCity]);
      setSelectedCity(newCity.id);
      setSelectedCityName(newCity.name);
      setShowCustomCity(false);
      setCustomCity('');
    }
  };

  const handleAddCustomNeighborhood = async () => {
    if (!customNeighborhood.trim()) return;
    const newNeighborhood = await createLocation(customNeighborhood.trim(), 'neighborhood', selectedCity);
    if (newNeighborhood) {
      setNeighborhoods(prev => [...prev, newNeighborhood]);
      setSelectedNeighborhood(newNeighborhood.id);
      setSelectedNeighborhoodName(newNeighborhood.name);
      setShowCustomNeighborhood(false);
      setCustomNeighborhood('');
    }
  };

  const handleNext = () => {
    onNext({
      country: selectedCountryName,
      state: selectedStateName,
      city: selectedCityName,
      neighborhood: selectedNeighborhoodName,
      detailedAddress: needsDetailedAddress ? detailedAddress : undefined,
      locationId: selectedNeighborhood || selectedCity || selectedState || selectedCountry
    });
  };

  const getSelectedLocationString = () => {
    const parts = [];
    if (selectedNeighborhoodName) parts.push(selectedNeighborhoodName);
    if (selectedCityName) parts.push(selectedCityName);
    if (selectedStateName) parts.push(selectedStateName);
    if (selectedCountryName) parts.push(selectedCountryName);
    return parts.join(', ');
  };

  // Determine if we've collected enough location data based on user type
  const isLocationComplete = () => {
    if (userType === 'occupation_provider') {
      return !!selectedCountry && !!selectedState && !!selectedCity && 
        (needsNeighborhood ? !!selectedNeighborhood : true);
    } else if (userType === 'business') {
      return !!selectedCountry && !!selectedState;
    } else {
      // For freelancers and social media influencers
      return !!selectedCountry;
    }
  };

  const getLocationIcon = () => {
    switch (userType) {
      case 'business':
        return <Building className="h-6 w-6" />;
      case 'occupation_provider':
        return <Home className="h-6 w-6" />;
      default:
        return <Globe className="h-6 w-6" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6" />
              <CardTitle className="text-xl">Select Your Location</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-semibold text-gray-800">Where are you located?</h3>
            <p className="text-gray-600">
              {userType === 'occupation_provider' 
                ? "Help us connect you with local clients for your services." 
                : userType === 'business'
                  ? "Connect with other businesses and professionals in your area." 
                  : "Tell us where you're based to find relevant opportunities."}
            </p>
          </div>

          {/* Search for Location */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search for a location..."
              value={searchingLocation}
              onChange={(e) => setSearchingLocation(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Country Selection */}
          <div className="space-y-3">
            <Label className="text-lg font-medium">Country</Label>
            <Select value={selectedCountry} onValueChange={handleCountryChange}>
              <SelectTrigger className="h-12 text-lg">
                <SelectValue placeholder="Select your country..." />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                {countries.map((country) => (
                  <SelectItem key={country.id} value={country.id}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* State/Province Selection - show for businesses and in-person services */}
          {(userType === 'business' || userType === 'occupation_provider') && selectedCountry && (
            <div className="space-y-3">
              <Label className="text-lg font-medium">State/Province</Label>
              {showCustomState ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter state/province name"
                    value={customState}
                    onChange={(e) => setCustomState(e.target.value)}
                    className="h-12"
                  />
                  <Button onClick={handleAddCustomState} className="h-12">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={() => setShowCustomState(false)} className="h-12">
                    Cancel
                  </Button>
                </div>
              ) : (
                <Select value={selectedState} onValueChange={handleStateChange}>
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder="Select your state/province..." />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.id} value={state.id}>
                        {state.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">
                      <Plus className="h-4 w-4 mr-2 inline" />
                      Add new state/province
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          )}

          {/* City Selection - show for in-person services */}
          {(userType === 'business' || userType === 'occupation_provider') && selectedState && !showCustomState && (
            <div className="space-y-3">
              <Label className="text-lg font-medium">City</Label>
              {showCustomCity ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter city name"
                    value={customCity}
                    onChange={(e) => setCustomCity(e.target.value)}
                    className="h-12"
                  />
                  <Button onClick={handleAddCustomCity} className="h-12">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={() => setShowCustomCity(false)} className="h-12">
                    Cancel
                  </Button>
                </div>
              ) : (
                <Select value={selectedCity} onValueChange={handleCityChange}>
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder="Select your city..." />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">
                      <Plus className="h-4 w-4 mr-2 inline" />
                      Add new city
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          )}

          {/* Neighborhood Selection - only for local services */}
          {needsNeighborhood && selectedCity && !showCustomCity && (
            <div className="space-y-3">
              <Label className="text-lg font-medium">Neighborhood/Area</Label>
              {showCustomNeighborhood ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter neighborhood name"
                    value={customNeighborhood}
                    onChange={(e) => setCustomNeighborhood(e.target.value)}
                    className="h-12"
                  />
                  <Button onClick={handleAddCustomNeighborhood} className="h-12">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={() => setShowCustomNeighborhood(false)} className="h-12">
                    Cancel
                  </Button>
                </div>
              ) : (
                <Select value={selectedNeighborhood} onValueChange={handleNeighborhoodChange}>
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder="Select your neighborhood..." />
                  </SelectTrigger>
                  <SelectContent>
                    {neighborhoods.map((neighborhood) => (
                      <SelectItem key={neighborhood.id} value={neighborhood.id}>
                        {neighborhood.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">
                      <Plus className="h-4 w-4 mr-2 inline" />
                      Add new neighborhood
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          )}

          {/* Detailed Address for Local Services */}
          {needsDetailedAddress && selectedCity && (
            <div className="space-y-3">
              <Label className="text-lg font-medium">Detailed Address (Optional)</Label>
              <Input
                placeholder="Street address, apartment number, etc."
                value={detailedAddress}
                onChange={(e) => setDetailedAddress(e.target.value)}
                className="h-12"
              />
              <p className="text-sm text-gray-500">
                This helps local clients find your services more easily.
              </p>
            </div>
          )}

          {/* Service Delivery Options - only for service providers */}
          {(userType === 'freelancer' || userType === 'occupation_provider') && selectedCountry && (
            <div className="space-y-3 border border-gray-200 p-4 rounded-lg">
              <Label className="text-lg font-medium">Service Delivery Options</Label>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remote" 
                    checked={canWork === 'remote' || canWork === 'both'} 
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setCanWork(canWork === 'local' ? 'both' : 'remote');
                      } else {
                        setCanWork(canWork === 'both' ? 'local' : 'both');
                      }
                    }}
                  />
                  <label htmlFor="remote" className="text-base font-medium">
                    I can provide services remotely/online
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="local" 
                    checked={canWork === 'local' || canWork === 'both'} 
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setCanWork(canWork === 'remote' ? 'both' : 'local');
                      } else {
                        setCanWork(canWork === 'both' ? 'remote' : 'both');
                      }
                    }}
                  />
                  <label htmlFor="local" className="text-base font-medium">
                    I can provide services in-person
                  </label>
                </div>

                {(canWork === 'local' || canWork === 'both') && (
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <Label className="text-base font-medium">How far are you willing to travel?</Label>
                    <Select value={serviceRadius.toString()} onValueChange={(v) => setServiceRadius(parseInt(v))}>
                      <SelectTrigger className="h-12 mt-2">
                        <SelectValue placeholder="Select travel distance..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">Up to 5 miles / 8 km</SelectItem>
                        <SelectItem value="10">Up to 10 miles / 16 km</SelectItem>
                        <SelectItem value="25">Up to 25 miles / 40 km</SelectItem>
                        <SelectItem value="50">Up to 50 miles / 80 km</SelectItem>
                        <SelectItem value="100">Up to 100 miles / 160 km</SelectItem>
                        <SelectItem value="250">Up to 250 miles / 400 km</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Selected Location Preview */}
          {getSelectedLocationString() && (
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  {getLocationIcon()}
                </div>
                <div>
                  <p className="font-semibold text-blue-900">Selected Location</p>
                  <p className="text-blue-700">{getSelectedLocationString()}</p>
                  {detailedAddress && (
                    <p className="text-blue-600 text-sm">{detailedAddress}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={handleNext}
            disabled={!isLocationComplete()}
            className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            size="lg"
          >
            Continue →
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedLocationSelector;
