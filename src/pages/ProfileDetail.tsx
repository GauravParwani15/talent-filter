
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Bookmark, ExternalLink, Mail, MapPin, MessageSquare, Star, User, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import EmptyState from "@/components/profile/EmptyState";

type ProfileData = {
  id: string;
  title: string;
  location: string;
  about: string;
  skills: string;
  experience: string | null;
  education: string | null;
  portfolio: string | null;
  github: string | null;
  linkedin: string | null;
};

const ProfileDetail = () => {
  const { profileId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (!profileId) {
        setError("Missing profile ID");
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);
        
        // Get current user
        const { data: authData } = await supabase.auth.getSession();
        if (authData.session) {
          setUserId(authData.session.user.id);
          
          // Check if profile is bookmarked
          const { data: savedData } = await supabase
            .from('saved_profiles')
            .select('*')
            .eq('user_id', authData.session.user.id)
            .eq('profile_id', profileId)
            .maybeSingle();
            
          setIsBookmarked(!!savedData);
        }
        
        // First try to fetch from regular profiles
        let { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', profileId)
          .maybeSingle();
          
        // If not found in regular profiles, try analytics_profiles
        if (!profileData && !profileError) {
          const { data: analyticsData, error: analyticsError } = await supabase
            .from('analytics_profiles')
            .select('*')
            .eq('id', profileId)
            .maybeSingle();
            
          if (analyticsError) throw analyticsError;
          profileData = analyticsData;
        }
        
        if (profileError) throw profileError;
        
        if (profileData) {
          setProfile(profileData);
        } else {
          setError("Profile not found");
          toast({
            variant: "destructive",
            title: "Profile not found",
            description: "The requested profile does not exist or has been removed.",
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError("Failed to load profile");
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load profile. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfile();
  }, [profileId, toast, navigate]);
  
  const handleBookmark = async () => {
    if (!userId || !profileId) {
      toast({
        title: "Authentication required",
        description: "Please sign in to bookmark profiles",
      });
      return;
    }
    
    try {
      if (isBookmarked) {
        // Remove bookmark
        await supabase
          .from('saved_profiles')
          .delete()
          .match({ user_id: userId, profile_id: profileId });
          
        setIsBookmarked(false);
        
        toast({
          title: "Removed from bookmarks",
          description: "This profile has been removed from your bookmarks.",
        });
      } else {
        // Add bookmark
        await supabase
          .from('saved_profiles')
          .insert({ user_id: userId, profile_id: profileId });
          
        setIsBookmarked(true);
        
        toast({
          title: "Added to bookmarks",
          description: "This profile has been added to your bookmarks.",
        });
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
  
  const handleContact = () => {
    toast({
      title: "Contact initiated",
      description: `A request to contact this talent has been sent.`,
    });
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-20 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Loading profile...</span>
      </div>
    );
  }
  
  if (error || !profile) {
    return (
      <div className="container mx-auto py-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/profiles" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Profiles
          </Link>
        </Button>
        
        <EmptyState
          title="Profile not found"
          description="The requested profile does not exist or has been removed."
          showBackButton={true}
        />
      </div>
    );
  }
  
  // Parse skills into array
  const skillsArray = profile.skills.split(',').map(skill => skill.trim());
  
  return (
    <div className="container max-w-5xl mx-auto py-8 px-4 md:px-6">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/profiles" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Profiles
          </Link>
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${profile.id}`} alt="Profile" />
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{profile.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {profile.location}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <Button onClick={handleContact} className="flex-1 md:flex-auto">
              <Mail className="mr-2 h-4 w-4" />
              Contact
            </Button>
            <Button 
              variant={isBookmarked ? "default" : "outline"} 
              onClick={handleBookmark} 
              className="flex-1 md:flex-auto"
            >
              <Bookmark className={`mr-2 h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {skillsArray.map((skill, index) => (
            <Badge key={index} variant="outline">{skill}</Badge>
          ))}
        </div>
      </div>
      
      <Tabs defaultValue="about" className="w-full">
        <TabsList className="w-full max-w-md grid grid-cols-3 mb-8">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>
        
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                About
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Bio</h3>
                <p className="text-muted-foreground">{profile.about}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skillsArray.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
              {(profile.portfolio || profile.github || profile.linkedin) && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-2">Links</h3>
                    <ul className="space-y-2">
                      {profile.portfolio && (
                        <li>
                          <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:underline">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Portfolio Website
                          </a>
                        </li>
                      )}
                      {profile.github && (
                        <li>
                          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:underline">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            GitHub
                          </a>
                        </li>
                      )}
                      {profile.linkedin && (
                        <li>
                          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center text-primary hover:underline">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            LinkedIn
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="experience">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bookmark className="h-5 w-5" />
                Work Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              {profile.experience ? (
                <div className="space-y-4 whitespace-pre-line">
                  {profile.experience}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">No experience information provided.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              {profile.education ? (
                <div className="space-y-4 whitespace-pre-line">
                  {profile.education}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">No education information provided.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Connect
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Interested in working with this talent? Reach out directly to discuss opportunities.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleContact}>
            <Mail className="mr-2 h-4 w-4" />
            Contact Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileDetail;
