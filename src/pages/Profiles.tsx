
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useProfiles } from "@/hooks/useProfiles";
import { useAISearch } from "@/hooks/useAISearch";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileGrid from "@/components/profile/ProfileGrid";
import EmptyState from "@/components/profile/EmptyState";
import LoadingState from "@/components/profile/LoadingState";
import SearchBar from "@/components/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const Profiles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchQuery = searchParams.get("search") || "";
  
  const [searchMode, setSearchMode] = useState<'standard' | 'ai'>(
    initialSearchQuery ? 'ai' : 'standard'
  );
  
  const {
    filteredProfiles,
    isLoading: isLoadingProfiles,
    searchQuery: standardSearchQuery,
    setSearchQuery: setStandardSearchQuery,
    bookmarkedProfiles,
    toggleBookmark,
    profiles: allProfiles
  } = useProfiles();
  
  const {
    searchResults: aiSearchResults,
    isSearching: isSearchingAI,
    hasSearched: hasSearchedAI,
    searchWithAI,
  } = useAISearch();
  
  const [displayedProfiles, setDisplayedProfiles] = useState(filteredProfiles);
  const [aiSearchQuery, setAiSearchQuery] = useState(initialSearchQuery);
  
  // Handle initial search from URL parameters
  useEffect(() => {
    if (initialSearchQuery) {
      searchWithAI(initialSearchQuery);
    }
  }, []);
  
  // Update displayed profiles based on search mode
  useEffect(() => {
    if (searchMode === 'standard') {
      setDisplayedProfiles(filteredProfiles);
    } else if (searchMode === 'ai' && hasSearchedAI) {
      setDisplayedProfiles(aiSearchResults);
    } else {
      setDisplayedProfiles(filteredProfiles);
    }
  }, [searchMode, filteredProfiles, aiSearchResults, hasSearchedAI]);
  
  const handleStandardSearch = (query: string) => {
    setSearchMode('standard');
    setStandardSearchQuery(query);
    
    // Update URL with search query
    if (query) {
      setSearchParams({ search: query, mode: 'standard' });
    } else {
      searchParams.delete('search');
      searchParams.delete('mode');
      setSearchParams(searchParams);
    }
  };
  
  const handleAISearch = (query: string) => {
    setSearchMode('ai');
    setAiSearchQuery(query);
    searchWithAI(query);
    
    // Update URL with search query
    if (query) {
      setSearchParams({ search: query, mode: 'ai' });
    } else {
      searchParams.delete('search');
      searchParams.delete('mode');
      setSearchParams(searchParams);
    }
  };
  
  const clearSearch = () => {
    setSearchMode('standard');
    setStandardSearchQuery('');
    setAiSearchQuery('');
    setDisplayedProfiles(allProfiles);
    
    // Clear search params from URL
    searchParams.delete('search');
    searchParams.delete('mode');
    setSearchParams(searchParams);
  };
  
  const isLoading = isLoadingProfiles || (searchMode === 'ai' && isSearchingAI);
  const currentSearchQuery = searchMode === 'ai' ? aiSearchQuery : standardSearchQuery;
  
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <ProfileHeader 
        searchQuery={standardSearchQuery}
        onSearchChange={setStandardSearchQuery}
      />
      
      <div className="mb-8">
        <SearchBar 
          onSearch={handleAISearch}
          initialQuery={aiSearchQuery}
          isLoading={isSearchingAI}
          isAIEnabled={true}
        />
      </div>
      
      {currentSearchQuery && (
        <div className="flex items-center mb-6">
          <Badge variant={searchMode === 'ai' ? "default" : "outline"} className="mr-4">
            {searchMode === 'ai' ? 'AI Search' : 'Standard Search'}
          </Badge>
          
          <p className="text-sm text-muted-foreground mr-2">
            {displayedProfiles.length} {displayedProfiles.length === 1 ? 'result' : 'results'} for:
          </p>
          
          <Badge variant="secondary" className="mr-2">
            {currentSearchQuery}
          </Badge>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="h-6 w-6"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      
      {isLoading ? (
        <LoadingState />
      ) : displayedProfiles.length > 0 ? (
        <ProfileGrid 
          profiles={displayedProfiles}
          bookmarkedProfiles={bookmarkedProfiles}
          onToggleBookmark={toggleBookmark}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default Profiles;
