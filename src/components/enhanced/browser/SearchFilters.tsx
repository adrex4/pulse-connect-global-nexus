
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface SearchFiltersProps {
  activeTab: 'users' | 'businesses' | 'groups';
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedLocation: string;
  onLocationChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  availableLocations: {id: string, name: string}[];
  availableCategories: string[];
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  activeTab,
  searchTerm,
  onSearchChange,
  selectedLocation,
  onLocationChange,
  selectedCategory,
  onCategoryChange,
  availableLocations,
  availableCategories
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          placeholder={`Search ${activeTab}...`}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12"
        />
      </div>
      
      <Select value={selectedLocation} onValueChange={onLocationChange}>
        <SelectTrigger className="w-full md:w-[200px] h-12">
          <SelectValue placeholder="All Locations" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all_locations">All Locations</SelectItem>
          {availableLocations.map(location => (
            <SelectItem key={location.id} value={location.id}>
              {location.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full md:w-[200px] h-12">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all_categories">All Categories</SelectItem>
          {availableCategories.map(category => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchFilters;
