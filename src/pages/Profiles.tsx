
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ProfileCard from '@/components/ProfileCard';
import { mockProfiles, locations, availabilityOptions } from '@/data/mockData';
import { TalentProfile, SearchFilters } from '@/types';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

const Profiles = () => {
  const [profiles, setProfiles] = useState<TalentProfile[]>(mockProfiles);
  const [filteredProfiles, setFilteredProfiles] = useState<TalentProfile[]>(mockProfiles);
  const [bookmarkedProfiles, setBookmarkedProfiles] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [experienceRange, setExperienceRange] = useState([0, 10]);
  
  // Handle bookmarking a profile
  const handleBookmark = (profileId: string) => {
    setBookmarkedProfiles(prevBookmarks => {
      if (prevBookmarks.includes(profileId)) {
        return prevBookmarks.filter(id => id !== profileId);
      } else {
        return [...prevBookmarks, profileId];
      }
    });
  };
  
  // Apply filters to profiles
  useEffect(() => {
    let result = [...profiles];
    
    if (filters.location) {
      result = result.filter(profile => profile.location === filters.location);
    }
    
    if (filters.availability) {
      result = result.filter(profile => profile.availability === filters.availability);
    }
    
    if (filters.experienceMin !== undefined || filters.experienceMax !== undefined) {
      result = result.filter(profile => {
        const experience = profile.totalYearsOfExperience;
        const minFilter = filters.experienceMin !== undefined ? experience >= filters.experienceMin : true;
        const maxFilter = filters.experienceMax !== undefined ? experience <= filters.experienceMax : true;
        return minFilter && maxFilter;
      });
    }
    
    setFilteredProfiles(result);
  }, [profiles, filters]);
  
  // Handle experience range slider change
  const handleExperienceRangeChange = (values: number[]) => {
    setExperienceRange(values);
    setFilters(prev => ({
      ...prev,
      experienceMin: values[0],
      experienceMax: values[1]
    }));
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({});
    setExperienceRange([0, 10]);
    setFilteredProfiles(profiles);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Discover Talent</h1>
            <p className="text-muted-foreground">Browse through our selection of skilled professionals</p>
          </div>
          
          {/* Filters section */}
          <div className="mb-8 bg-card border rounded-xl p-4 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              
              <div className="flex flex-wrap gap-2 items-center">
                {Object.keys(filters).length > 0 && (
                  <Button 
                    variant="ghost" 
                    className="h-8 text-xs text-muted-foreground"
                    onClick={clearFilters}
                  >
                    Clear all
                    <X className="h-3 w-3 ml-1" />
                  </Button>
                )}
                
                {filters.location && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Location: {filters.location}
                    <button 
                      onClick={() => setFilters(prev => ({ ...prev, location: undefined }))}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                
                {filters.availability && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Availability: {filters.availability.replace('-', ' ')}
                    <button 
                      onClick={() => setFilters(prev => ({ ...prev, availability: undefined }))}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                
                {(filters.experienceMin !== undefined || filters.experienceMax !== undefined) && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Experience: {filters.experienceMin} - {filters.experienceMax} years
                    <button 
                      onClick={() => {
                        setFilters(prev => ({ 
                          ...prev, 
                          experienceMin: undefined, 
                          experienceMax: undefined 
                        }));
                        setExperienceRange([0, 10]);
                      }}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                
                <div className="text-sm text-muted-foreground">
                  Showing {filteredProfiles.length} of {profiles.length} profiles
                </div>
              </div>
            </div>
            
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t animate-fade-in">
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Select 
                    value={filters.location} 
                    onValueChange={value => setFilters(prev => ({ ...prev, location: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Availability</label>
                  <Select 
                    value={filters.availability} 
                    onValueChange={value => setFilters(prev => ({ ...prev, availability: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      {availabilityOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Years of Experience: {experienceRange[0]} - {experienceRange[1]}</label>
                  <Slider
                    min={0}
                    max={10}
                    step={1}
                    value={experienceRange}
                    onValueChange={handleExperienceRangeChange}
                    className="mt-6"
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Profiles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map(profile => (
              <ProfileCard 
                key={profile.id} 
                profile={profile} 
                isBookmarked={bookmarkedProfiles.includes(profile.id)}
                onBookmark={handleBookmark}
              />
            ))}
          </div>
          
          {filteredProfiles.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No matching profiles found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters to find more results</p>
              <Button onClick={clearFilters}>Clear all filters</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profiles;
