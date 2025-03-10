
import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  isLoading?: boolean;
  isAIEnabled?: boolean;
}

const SearchBar = ({ 
  onSearch, 
  initialQuery = "", 
  isLoading = false,
  isAIEnabled = true
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const placeholderIntervalRef = useRef<number | null>(null);
  
  const placeholderSuggestions = [
    "Full-stack developer with React experience",
    "DevOps engineer familiar with AWS",
    "Mobile developer with 3+ years of experience",
    "UI/UX designer who can code"
  ];
  
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);
  
  // Set up rotating placeholder suggestions
  useEffect(() => {
    // Set initial placeholder
    const randomIndex = Math.floor(Math.random() * placeholderSuggestions.length);
    setCurrentPlaceholder(placeholderSuggestions[randomIndex]);
    
    // Change placeholder every 3-4 seconds
    const getRandomInterval = () => Math.floor(Math.random() * 1000) + 3000; // 3-4 seconds
    
    const rotatePlaceholder = () => {
      const newIndex = Math.floor(Math.random() * placeholderSuggestions.length);
      setCurrentPlaceholder(placeholderSuggestions[newIndex]);
      
      // Set next interval with random timing
      placeholderIntervalRef.current = window.setTimeout(rotatePlaceholder, getRandomInterval());
    };
    
    // Start the rotation
    placeholderIntervalRef.current = window.setTimeout(rotatePlaceholder, getRandomInterval());
    
    // Clean up on unmount
    return () => {
      if (placeholderIntervalRef.current) {
        clearTimeout(placeholderIntervalRef.current);
      }
    };
  }, []);
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };
  
  const clearSearch = () => {
    setQuery("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Try: "${currentPlaceholder}"`}
            className="block w-full py-3 pl-12 pr-20 text-base rounded-xl border border-input bg-background shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            disabled={isLoading}
          />
          
          {query && (
            <div className="absolute inset-y-0 right-16 flex items-center">
              <button
                type="button"
                onClick={clearSearch}
                className="p-1 rounded-full hover:bg-muted transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          )}
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                type="submit" 
                disabled={!query.trim() || isLoading}
                className="absolute right-0 top-0 bottom-0 px-4 rounded-l-none rounded-r-xl"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    {isAIEnabled && <Sparkles className="h-4 w-4 mr-1.5" />}
                    <span>Search</span>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            {isAIEnabled && (
              <TooltipContent>
                <p>AI-powered search</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </form>
      
      <div className="flex flex-wrap gap-2 mt-3">
        <p className="text-sm text-muted-foreground mr-1">Popular searches:</p>
        {["React", "Machine Learning", "DevOps", "UX Designer"].map((term) => (
          <button
            key={term}
            onClick={() => {
              setQuery(term);
              onSearch(term);
            }}
            disabled={isLoading}
            className="text-sm px-3 py-1 rounded-full bg-secondary text-secondary-foreground hover:bg-primary/10 transition-colors cursor-pointer"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
