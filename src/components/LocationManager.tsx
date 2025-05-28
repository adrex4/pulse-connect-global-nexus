
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { 
  MapPin, Globe, Search, Plus, Edit, Trash2, 
  Users, Building, Navigation, Filter, SortAsc
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import GlobalNavigation from './GlobalNavigation';

interface Location {
  id: string;
  name: string;
  type: 'country' | 'state' | 'city' | 'region';
  parentId?: string;
  userCount: number;
  businessCount: number;
  groupCount: number;
  coordinates?: { lat: number; lng: number };
  description?: string;
}

const LocationManager: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'users' | 'businesses'>('name');
  const { toast } = useToast();

  // Mock data for locations
  useEffect(() => {
    const mockLocations: Location[] = [
      {
        id: '1',
        name: 'United States',
        type: 'country',
        userCount: 15420,
        businessCount: 3280,
        groupCount: 145,
        description: 'Professional networking across all states'
      },
      {
        id: '2',
        name: 'California',
        type: 'state',
        parentId: '1',
        userCount: 4250,
        businessCount: 890,
        groupCount: 38,
        description: 'Tech and finance hub with diverse opportunities'
      },
      {
        id: '3',
        name: 'San Francisco',
        type: 'city',
        parentId: '2',
        userCount: 1240,
        businessCount: 280,
        groupCount: 12,
        coordinates: { lat: 37.7749, lng: -122.4194 },
        description: 'Financial district and tech startup ecosystem'
      },
      {
        id: '4',
        name: 'Los Angeles',
        type: 'city',
        parentId: '2',
        userCount: 1850,
        businessCount: 420,
        groupCount: 15,
        coordinates: { lat: 34.0522, lng: -118.2437 },
        description: 'Entertainment and media business center'
      },
      {
        id: '5',
        name: 'New York',
        type: 'state',
        parentId: '1',
        userCount: 3200,
        businessCount: 740,
        groupCount: 28,
        description: 'Financial services and corporate headquarters'
      },
      {
        id: '6',
        name: 'New York City',
        type: 'city',
        parentId: '5',
        userCount: 2100,
        businessCount: 520,
        groupCount: 18,
        coordinates: { lat: 40.7128, lng: -74.0060 },
        description: 'Global financial center and business hub'
      },
      {
        id: '7',
        name: 'United Kingdom',
        type: 'country',
        userCount: 8200,
        businessCount: 1650,
        groupCount: 72,
        description: 'European business and financial services'
      },
      {
        id: '8',
        name: 'London',
        type: 'city',
        parentId: '7',
        userCount: 2800,
        businessCount: 580,
        groupCount: 22,
        coordinates: { lat: 51.5074, lng: -0.1278 },
        description: 'International financial district'
      }
    ];
    setLocations(mockLocations);
  }, []);

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || location.type === selectedType;
    return matchesSearch && matchesType;
  });

  const sortedLocations = [...filteredLocations].sort((a, b) => {
    switch (sortBy) {
      case 'users':
        return b.userCount - a.userCount;
      case 'businesses':
        return b.businessCount - a.businessCount;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'country': return <Globe className="h-4 w-4" />;
      case 'state': return <MapPin className="h-4 w-4" />;
      case 'city': return <Building className="h-4 w-4" />;
      default: return <Navigation className="h-4 w-4" />;
    }
  };

  const getLocationBadgeColor = (type: string) => {
    switch (type) {
      case 'country': return 'bg-purple-500';
      case 'state': return 'bg-blue-500';
      case 'city': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleAddLocation = () => {
    toast({
      title: "Add Location",
      description: "Location creation form would open here.",
    });
  };

  const handleEditLocation = (locationId: string) => {
    toast({
      title: "Edit Location",
      description: `Edit form for location ${locationId} would open here.`,
    });
  };

  const handleDeleteLocation = (locationId: string) => {
    setLocations(prev => prev.filter(loc => loc.id !== locationId));
    toast({
      title: "Location Deleted",
      description: "Location has been removed from the system.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <GlobalNavigation currentUserType="business" />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Location Management</h1>
          <p className="text-gray-600">Manage and explore professional networks by location</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search locations..."
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Type: {selectedType === 'all' ? 'All' : selectedType}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedType('all')}>
                      All Types
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedType('country')}>
                      Countries
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedType('state')}>
                      States/Regions
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedType('city')}>
                      Cities
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <SortAsc className="h-4 w-4" />
                      Sort by {sortBy}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSortBy('name')}>
                      Name
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('users')}>
                      User Count
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('businesses')}>
                      Business Count
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button onClick={handleAddLocation} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Location
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedLocations.map((location) => (
            <Card key={location.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${getLocationBadgeColor(location.type)} rounded-full flex items-center justify-center text-white`}>
                      {getLocationIcon(location.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{location.name}</CardTitle>
                      <Badge variant="outline" className="text-xs mt-1 capitalize">
                        {location.type}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditLocation(location.id)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteLocation(location.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent>
                {location.description && (
                  <p className="text-sm text-gray-600 mb-4">{location.description}</p>
                )}

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="h-4 w-4 text-blue-500" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{location.userCount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Users</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Building className="h-4 w-4 text-green-500" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{location.businessCount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Businesses</p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="h-4 w-4 text-purple-500" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{location.groupCount}</p>
                    <p className="text-xs text-gray-500">Groups</p>
                  </div>
                </div>

                {location.coordinates && (
                  <div className="text-xs text-gray-500 mb-3">
                    📍 {location.coordinates.lat.toFixed(4)}, {location.coordinates.lng.toFixed(4)}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    View Businesses
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    View Groups
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedLocations.length === 0 && (
          <Card className="p-8 text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No locations found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or add a new location.</p>
            <Button onClick={handleAddLocation}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Location
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LocationManager;
