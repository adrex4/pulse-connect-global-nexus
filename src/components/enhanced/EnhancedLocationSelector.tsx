
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, MapPin, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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
  showDetailedAddress?: boolean;
}

const EnhancedLocationSelector: React.FC<EnhancedLocationSelectorProps> = ({ 
  onNext, 
  onBack, 
  showDetailedAddress = false 
}) => {
  const [countries, setCountries] = useState<Location[]>([]);
  const [states, setStates] = useState<Location[]>([]);
  const [cities, setCities] = useState<Location[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<Location[]>([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');
  
  const [customState, setCustomState] = useState('');
  const [customCity, setCustomCity] = useState('');
  const [customNeighborhood, setCustomNeighborhood] = useState('');
  
  const [showCustomState, setShowCustomState] = useState(false);
  const [showCustomCity, setShowCustomCity] = useState(false);
  const [showCustomNeighborhood, setShowCustomNeighborhood] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    const { data } = await supabase
      .from('locations')
      .select('*')
      .eq('type', 'country')
      .order('name');
    setCountries(data || []);
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
    setSelectedCountry(countryId);
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
    setSelectedState(stateId);
    setSelectedCity('');
    setSelectedNeighborhood('');
    setCities([]);
    setNeighborhoods([]);
    setShowCustomCity(false);
    await fetchCities(stateId);
  };

  const handleAddCustomState = async () => {
    if (!customState.trim()) return;
    const newState = await createLocation(customState.trim(), 'state', selectedCountry);
    if (newState) {
      setStates(prev => [...prev, newState]);
      setSelectedState(newState.id);
      setShowCustomState(false);
      setCustomState('');
    }
  };

  const handleNext = () => {
    const countryData = countries.find(c => c.id === selectedCountry);
    const stateData = states.find(s => s.id === selectedState);
    const cityData = cities.find(c => c.id === selectedCity);
    const neighborhoodData = neighborhoods.find(n => n.id === selectedNeighborhood);

    onNext({
      country: countryData?.name || '',
      state: stateData?.name,
      city: cityData?.name,
      neighborhood: neighborhoodData?.name,
      detailedAddress: showDetailedAddress ? detailedAddress : undefined,
      locationId: selectedNeighborhood || selectedCity || selectedState || selectedCountry
    });
  };

  const getSelectedLocationString = () => {
    const parts = [];
    if (selectedNeighborhood) {
      const neighborhood = neighborhoods.find(n => n.id === selectedNeighborhood);
      if (neighborhood) parts.push(neighborhood.name);
    }
    if (selectedCity) {
      const city = cities.find(c => c.id === selectedCity);
      if (city) parts.push(city.name);
    }
    if (selectedState) {
      const state = states.find(s => s.id === selectedState);
      if (state) parts.push(state.name);
    }
    if (selectedCountry) {
      const country = countries.find(c => c.id === selectedCountry);
      if (country) parts.push(country.name);
    }
    return parts.join(', ');
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
              Help us connect you with the right local and regional communities.
            </p>
          </div>

          {/* Country Selection */}
          <div className="space-y-3">
            <Label className="text-lg font-medium">Country</Label>
            <Select value={selectedCountry} onValueChange={handleCountryChange}>
              <SelectTrigger className="h-12 text-lg">
                <SelectValue placeholder="Select your country..." />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.id} value={country.id}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* State/Province Selection */}
          {selectedCountry && (
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
                      <Plus className="h-4 w-4 mr-2" />
                      Add new state/province
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          )}

          {/* City Selection */}
          {selectedState && !showCustomState && (
            <div className="space-y-3">
              <Label className="text-lg font-medium">City</Label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
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
                    <Plus className="h-4 w-4 mr-2" />
                    Add new city
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Detailed Address for Local Services */}
          {showDetailedAddress && selectedCity && (
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

          {/* Selected Location Preview */}
          {getSelectedLocationString() && (
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white" />
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
            disabled={!selectedCountry}
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
