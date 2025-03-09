
import { useState } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  isLoading?: boolean;
}

const SearchBar = ({ onSearch, initialQuery = "", isLoading = false }: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };
  
  const clearSearch = () => {
    setQuery("");
  };
  
  const placeholderSuggestions = [
    "Full-stack developer with React experience",
    "DevOps engineer familiar with AWS",
    "Mobile developer with 3+ years of experience",
    "UI/UX designer who can code"
  ];
  
  const randomPlaceholder = placeholderSuggestions[Math.floor(Math.random() * placeholderSuggestions.length)];

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
            placeholder={`Try: "${randomPlaceholder}"`}
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
        
        <Button 
          type="submit" 
          disabled={!query.trim() || isLoading}
          className="absolute right-0 top-0 bottom-0 px-4 rounded-l-none rounded-r-xl"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <span>Search</span>
          )}
        </Button>
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
