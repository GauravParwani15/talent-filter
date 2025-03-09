
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, BriefcaseIcon, GraduationCap, MapPin, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  location: z.string().min(2, { message: "Location is required" }),
  about: z.string().min(20, { message: "About should be at least 20 characters" }),
  skills: z.string().min(2, { message: "Please add some skills" }),
  experience: z.string().optional(),
  education: z.string().optional(),
  portfolio: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  github: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  linkedin: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

const CreateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        // Redirect to login if not authenticated
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please sign in to create a profile",
        });
        navigate("/sign-in");
      } else {
        setUserId(data.session.user.id);
      }
    };

    checkAuth();
  }, [navigate, toast]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      about: "",
      skills: "",
      experience: "",
      education: "",
      portfolio: "",
      github: "",
      linkedin: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      if (!userId) {
        throw new Error("User ID not found");
      }

      // Insert profile into Supabase
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          title: data.title,
          location: data.location,
          about: data.about,
          skills: data.skills,
          experience: data.experience,
          education: data.education,
          portfolio: data.portfolio,
          github: data.github,
          linkedin: data.linkedin,
        });

      if (error) throw error;
      
      toast({
        title: "Profile created!",
        description: "Your talent profile has been created successfully.",
      });
      
      navigate("/profile");
    } catch (error: any) {
      console.error("Error creating profile:", error);
      toast({
        variant: "destructive",
        title: "Profile creation failed",
        description: error.message || "There was a problem creating your profile.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-10 px-4 md:px-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Create Your Talent Profile</h1>
          <p className="text-muted-foreground">
            Fill in the details below to create your professional profile
          </p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Professional Title</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="title"
                  type="text"
                  placeholder="e.g. Full Stack Developer"
                  className="pl-10"
                  {...register("title")}
                />
              </div>
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="location"
                  type="text"
                  placeholder="e.g. San Francisco, CA"
                  className="pl-10"
                  {...register("location")}
                />
              </div>
              {errors.location && (
                <p className="text-sm text-destructive">{errors.location.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="skills">Skills (comma separated)</Label>
              <Input
                id="skills"
                type="text"
                placeholder="e.g. React, Node.js, Python"
                {...register("skills")}
              />
              {errors.skills && (
                <p className="text-sm text-destructive">{errors.skills.message}</p>
              )}
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="about">About</Label>
              <Textarea
                id="about"
                placeholder="Write a brief description about yourself and your professional experience"
                rows={5}
                {...register("about")}
              />
              {errors.about && (
                <p className="text-sm text-destructive">{errors.about.message}</p>
              )}
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="experience">Experience</Label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <Textarea
                  id="experience"
                  placeholder="List your work experience (e.g. Company - Position - Date Range)"
                  rows={4}
                  className="pl-10"
                  {...register("experience")}
                />
              </div>
              {errors.experience && (
                <p className="text-sm text-destructive">{errors.experience.message}</p>
              )}
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="education">Education</Label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </div>
                <Textarea
                  id="education"
                  placeholder="List your education (e.g. University - Degree - Year)"
                  rows={4}
                  className="pl-10"
                  {...register("education")}
                />
              </div>
              {errors.education && (
                <p className="text-sm text-destructive">{errors.education.message}</p>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="portfolio">Portfolio Website</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="portfolio"
                    type="url"
                    placeholder="https://myportfolio.com"
                    className="pl-10"
                    {...register("portfolio")}
                  />
                </div>
                {errors.portfolio && (
                  <p className="text-sm text-destructive">{errors.portfolio.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="github"
                    type="url"
                    placeholder="https://github.com/username"
                    className="pl-10"
                    {...register("github")}
                  />
                </div>
                {errors.github && (
                  <p className="text-sm text-destructive">{errors.github.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    className="pl-10"
                    {...register("linkedin")}
                  />
                </div>
                {errors.linkedin && (
                  <p className="text-sm text-destructive">{errors.linkedin.message}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                  Creating Profile...
                </span>
              ) : (
                "Create Profile"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
