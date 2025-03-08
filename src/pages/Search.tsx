
import { useState } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import ProfileCard from '@/components/ProfileCard';
import { mockProfiles } from '@/data/mockData';
import { TalentProfile } from '@/types';
import { Loader2 } from 'lucide-react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<TalentProfile[]>([]);
  const [bookmarkedProfiles, setBookmarkedProfiles] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Simulate searching profiles with a delay
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    setHasSearched(true);
    
    // Simple search simulation with timeout to mimic API request
    setTimeout(() => {
      // For the demo, let's simulate matching based on skills, headline, or name
      const normalizedQuery = query.toLowerCase();
      
      const results = mockProfiles.filter(profile => {
        // Check if query matches the name
        if (profile.fullName.toLowerCase().includes(normalizedQuery)) {
          return true;
        }
        
        // Check if query matches the headline
        if (profile.headline.toLowerCase().includes(normalizedQuery)) {
          return true;
        }
        
        // Check if query matches any skill
        const hasMatchingSkill = profile.skills.some(skill => 
          skill.name.toLowerCase().includes(normalizedQuery)
        );
        
        if (hasMatchingSkill) {
          return true;
        }
        
        // Check project technologies
        const hasMatchingTech = profile.projects.some(project =>
          project.technologies.some(tech => 
            tech.toLowerCase().includes(normalizedQuery)
          )
        );
        
        return hasMatchingTech;
      });
      
      setSearchResults(results);
      setIsSearching(false);
    }, 1000);
  };
  
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
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover the Perfect Talent</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Use natural language to describe exactly what you're looking for
            </p>
            
            <SearchBar onSearch={handleSearch} isLoading={isSearching} />
          </div>
          
          {isSearching ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Searching for "{searchQuery}"...</p>
            </div>
          ) : hasSearched ? (
            <>
              {searchResults.length > 0 ? (
                <>
                  <div className="mb-8">
                    <h2 className="text-xl font-medium">Results for "{searchQuery}"</h2>
                    <p className="text-muted-foreground">Found {searchResults.length} profiles matching your search</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.map(profile => (
                      <ProfileCard 
                        key={profile.id} 
                        profile={profile} 
                        isBookmarked={bookmarkedProfiles.includes(profile.id)}
                        onBookmark={handleBookmark}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium mb-2">No matching profiles found</h3>
                  <p className="text-muted-foreground">Try broadening your search terms or exploring different skills</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 max-w-2xl mx-auto">
              <div className="mb-8">
                <h2 className="text-xl font-medium mb-2">Start searching by describing what you need</h2>
                <p className="text-muted-foreground">
                  For example: "Full-stack developer with 5+ years of React experience" or 
                  "UX designer with fintech background"
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {[
                  {
                    title: "Natural Language Search",
                    description: "Just type what you're looking for in plain language, no complicated filters needed"
                  },
                  {
                    title: "Semantic Understanding",
                    description: "We understand the meaning behind your search, not just matching keywords"
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-card border rounded-lg p-6 text-left">
                    <h3 className="font-medium mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Search;
