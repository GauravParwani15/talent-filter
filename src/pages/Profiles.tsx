
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bookmark, 
  Filter, 
  MapPin, 
  Search, 
  User,
  Briefcase,
  Star,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

type Profile = {
  id: string;
  title: string;
  location: string;
  skills: string;
  created_at: string;
  source?: 'regular' | 'analytics';
};

const Profiles = () => {
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
  
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Talent Profiles</h1>
          <p className="text-muted-foreground">
            Discover and connect with exceptional talent
          </p>
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search profiles..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Loading profiles...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => (
            <Card key={profile.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className={cn(
                  "h-24 bg-gradient-to-r",
                  profile.source === 'analytics' 
                    ? "from-green-100 to-green-300 dark:from-green-950 dark:to-green-900" 
                    : "from-primary/20 to-accent/20"
                )} />
              </CardHeader>
              <CardContent className="pt-0 relative">
                <div className="flex justify-between">
                  <Avatar className="h-16 w-16 border-4 border-background mt-[-32px]">
                    <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${profile.id}`} alt="Profile" />
                    <AvatarFallback>
                      <User className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center gap-2 mt-2">
                    {profile.source === 'analytics' && (
                      <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        Live Data
                      </Badge>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => toggleBookmark(profile.id)}
                    >
                      <Bookmark 
                        className={cn(
                          "h-5 w-5",
                          bookmarkedProfiles.includes(profile.id) ? "fill-primary text-primary" : "text-muted-foreground"
                        )}
                      />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-2">
                  <h3 className="text-xl font-semibold">{profile.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <MapPin className="h-3 w-3" />
                    <span>{profile.location}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {profile.skills.split(',').map((skill, index) => (
                      <Badge key={index} variant="outline">{skill.trim()}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="secondary" asChild>
                  <Link to={`/profiles/${profile.id}`}>View Profile</Link>
                </Button>
                <Button variant="outline">Contact</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {!isLoading && filteredProfiles.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 mx-auto text-muted-foreground" />
          <h2 className="text-xl font-semibold mt-4">No profiles found</h2>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filters to find more candidates.
          </p>
        </div>
      )}
    </div>
  );
};

export default Profiles;
