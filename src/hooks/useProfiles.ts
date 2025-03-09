
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

export type Profile = {
  id: string;
  title: string;
  location: string;
  skills: string;
  created_at: string;
  source?: 'regular' | 'analytics';
};

export const useProfiles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedProfiles, setBookmarkedProfiles] = useState<string[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);
        
        // Get current user
        const { data: authData } = await supabase.auth.getSession();
        if (authData.session) {
          setUserId(authData.session.user.id);
          
          // Fetch user's bookmarked profiles
          const { data: savedData } = await supabase
            .from('saved_profiles')
            .select('profile_id')
            .eq('user_id', authData.session.user.id);
            
          if (savedData) {
            setBookmarkedProfiles(savedData.map(item => item.profile_id));
          }
        }
        
        // Fetch regular profiles
        const { data: regularProfiles, error: regularError } = await supabase
          .from('profiles')
          .select('id, title, location, skills, created_at');
          
        if (regularError) throw regularError;
        
        // Fetch analytics profiles
        const { data: analyticsProfiles, error: analyticsError } = await supabase
          .from('analytics_profiles')
          .select('id, title, location, skills, created_at');
          
        if (analyticsError) throw analyticsError;
        
        // Combine and mark the source of each profile
        const combinedProfiles = [
          ...(regularProfiles || []).map(profile => ({ ...profile, source: 'regular' as const })),
          ...(analyticsProfiles || []).map(profile => ({ ...profile, source: 'analytics' as const }))
        ];
        
        setProfiles(combinedProfiles);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load profiles. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfiles();
    
    // Set up realtime subscription
    const channel = supabase
      .channel('public:analytics_profiles')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'analytics_profiles' 
        }, 
        (payload) => {
          console.log('Realtime update:', payload);
          // Handle different realtime events
          if (payload.eventType === 'INSERT') {
            const newProfile = payload.new as Profile;
            setProfiles(currentProfiles => [
              ...currentProfiles, 
              { ...newProfile, source: 'analytics' }
            ]);
            toast({
              title: "New profile added",
              description: "A new talent profile has just been added.",
            });
          } else if (payload.eventType === 'UPDATE') {
            const updatedProfile = payload.new as Profile;
            setProfiles(currentProfiles => 
              currentProfiles.map(profile => 
                profile.id === updatedProfile.id 
                  ? { ...updatedProfile, source: 'analytics' } 
                  : profile
              )
            );
          } else if (payload.eventType === 'DELETE') {
            const deletedProfile = payload.old as Profile;
            setProfiles(currentProfiles => 
              currentProfiles.filter(profile => profile.id !== deletedProfile.id)
            );
          }
        }
      )
      .subscribe();
    
    // Cleanup function
    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);
  
  const toggleBookmark = async (profileId: string) => {
    if (!userId) {
      toast({
        title: "Authentication required",
        description: "Please sign in to bookmark profiles",
      });
      return;
    }
    
    try {
      if (bookmarkedProfiles.includes(profileId)) {
        // Remove bookmark
        await supabase
          .from('saved_profiles')
          .delete()
          .match({ user_id: userId, profile_id: profileId });
          
        setBookmarkedProfiles(prev => prev.filter(id => id !== profileId));
      } else {
        // Add bookmark
        await supabase
          .from('saved_profiles')
          .insert({ user_id: userId, profile_id: profileId });
          
        setBookmarkedProfiles(prev => [...prev, profileId]);
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update bookmark. Please try again later.",
      });
    }
  };
  
  const filteredProfiles = profiles.filter(profile => 
    profile.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.skills.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    profiles,
    filteredProfiles,
    isLoading,
    searchQuery,
    setSearchQuery,
    bookmarkedProfiles,
    toggleBookmark
  };
};
