
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface SocialMediaGroupFiltersProps {
  searchTerm: string;
  nicheFilter: string;
  scopeFilter: string;
  niches: string[];
  scopes: string[];
  onSearchChange: (value: string) => void;
  onNicheChange: (value: string) => void;
  onScopeChange: (value: string) => void;
}

const SocialMediaGroupFilters: React.FC<SocialMediaGroupFiltersProps> = ({
  searchTerm,
  nicheFilter,
  scopeFilter,
  niches,
  scopes,
  onSearchChange,
  onNicheChange,
  onScopeChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="relative md:col-span-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search communities..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12 border-2 focus:border-pink-500"
        />
      </div>
      
      <Select value={nicheFilter} onValueChange={onNicheChange}>
        <SelectTrigger className="h-12 border-2 focus:border-pink-500">
          <SelectValue placeholder="Filter by niche" />
        </SelectTrigger>
        <SelectContent>
          {niches.map((niche) => (
            <SelectItem key={niche} value={niche}>
              {niche === 'all' ? 'All Niches' : niche}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={scopeFilter} onValueChange={onScopeChange}>
        <SelectTrigger className="h-12 border-2 focus:border-pink-500">
          <SelectValue placeholder="Filter by scope" />
        </SelectTrigger>
        <SelectContent>
          {scopes.map((scope) => (
            <SelectItem key={scope} value={scope}>
              {scope === 'all' ? 'All Scopes' : scope.charAt(0).toUpperCase() + scope.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SocialMediaGroupFilters;
