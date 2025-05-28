
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Profile, Group } from '@/types/publicBrowser';

export const usePublicBrowserData = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [availableLocations, setAvailableLocations] = useState<{id: string, name: string}[]>([]);

  const fetchLocations = async () => {
    const { data } = await supabase
      .from('locations')
      .select('id, name')
      .eq('type', 'country')
      .order('name');
    
    setAvailableLocations(data || []);
  };

  const fetchCategories = async (activeTab: 'users' | 'businesses' | 'groups') => {
    if (activeTab === 'groups') {
      const { data } = await supabase
        .from('groups')
        .select('category')
        .not('category', 'is', null)
        .eq('is_public', true);
      
      if (data) {
        const uniqueCategories = [...new Set(data.map(item => item.category))].sort();
        setAvailableCategories(uniqueCategories);
      }
    } else if (activeTab === 'businesses') {
      const { data } = await supabase
        .from('user_profiles')
        .select('business_type')
        .eq('user_type', 'business')
        .not('business_type', 'is', null)
        .eq('visibility', 'public');
      
      if (data) {
        const uniqueCategories = [...new Set(data.map(item => item.business_type))].filter(Boolean).sort();
        setAvailableCategories(uniqueCategories);
      }
    } else {
      const { data } = await supabase
        .from('user_profiles')
        .select('primary_skill, occupation')
        .in('user_type', ['freelancer', 'occupation_provider', 'social_media_influencer'])
        .eq('visibility', 'public');
      
      if (data) {
        const skills = data.map(item => item.primary_skill).filter(Boolean);
        const occupations = data.map(item => item.occupation).filter(Boolean);
        const uniqueCategories = [...new Set([...skills, ...occupations])].sort();
        setAvailableCategories(uniqueCategories);
      }
    }
  };

  const fetchProfiles = async (
    activeTab: 'users' | 'businesses' | 'groups',
    searchTerm: string,
    selectedLocation: string,
    selectedCategory: string
  ) => {
    setLoading(true);
    let query = supabase
      .from('user_profiles')
      .select(`
        *,
        locations!user_profiles_location_id_fkey (
          name,
          parent:locations!locations_parent_id_fkey (
            name,
            parent:locations!locations_parent_id_fkey (
              name
            )
          )
        )
      `)
      .eq('visibility', 'public');

    if (activeTab === 'users') {
      query = query.in('user_type', ['freelancer', 'occupation_provider', 'social_media_influencer']);
    } else if (activeTab === 'businesses') {
      query = query.eq('user_type', 'business');
    }

    if (searchTerm) {
      query = query.or(`name.ilike.%${searchTerm}%,bio.ilike.%${searchTerm}%,business_type.ilike.%${searchTerm}%,primary_skill.ilike.%${searchTerm}%,occupation.ilike.%${searchTerm}%`);
    }

    if (selectedCategory && selectedCategory !== 'all_categories') {
      query = query.or(`business_type.ilike.%${selectedCategory}%,primary_skill.ilike.%${selectedCategory}%,occupation.ilike.%${selectedCategory}%`);
    }

    if (selectedLocation && selectedLocation !== 'all_locations') {
      query = query.eq('location_id', selectedLocation);
    }

    const { data } = await query.limit(20);
    setProfiles(data || []);
    setLoading(false);
  };

  const fetchGroups = async (
    searchTerm: string,
    selectedLocation: string,
    selectedCategory: string
  ) => {
    setLoading(true);
    let query = supabase
      .from('groups')
      .select(`
        *,
        locations!groups_location_id_fkey (
          name
        )
      `)
      .eq('is_public', true);

    if (searchTerm) {
      query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`);
    }

    if (selectedCategory && selectedCategory !== 'all_categories') {
      query = query.ilike('category', `%${selectedCategory}%`);
    }

    if (selectedLocation && selectedLocation !== 'all_locations') {
      query = query.eq('location_id', selectedLocation);
    }

    const { data } = await query.limit(20);
    setGroups(data || []);
    setLoading(false);
  };

  return {
    profiles,
    groups,
    loading,
    availableCategories,
    availableLocations,
    fetchLocations,
    fetchCategories,
    fetchProfiles,
    fetchGroups
  };
};
