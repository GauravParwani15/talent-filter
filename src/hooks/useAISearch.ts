
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { Profile } from "@/hooks/useProfiles";

export const useAISearch = () => {
  const [searchResults, setSearchResults] = useState<Profile[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const searchWithAI = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-search', {
        body: { query },
      });

      if (error) {
        console.error('Error invoking AI search function:', error);
        toast({
          variant: "destructive",
          title: "Search Error",
          description: "Failed to perform AI search. Please try again later.",
        });
        setSearchResults([]);
        return;
      }

      if (data.error) {
        console.error('Error from AI search function:', data.error);
        toast({
          variant: "destructive",
          title: "Search Error",
          description: data.error || "An error occurred during search.",
        });
        setSearchResults([]);
        return;
      }

      console.log('AI search results:', data);

      // Update the search results
      setSearchResults(data.profiles || []);

      if ((data.profiles || []).length === 0) {
        toast({
          title: "No Results",
          description: "No profiles match your search criteria.",
        });
      }
    } catch (error) {
      console.error('Error in AI search:', error);
      toast({
        variant: "destructive",
        title: "Search Error",
        description: "Failed to perform AI search. Please try again later.",
      });
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return {
    searchResults,
    isSearching,
    hasSearched,
    searchWithAI,
    setSearchResults,
  };
};
