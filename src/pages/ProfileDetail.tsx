
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Bookmark, ExternalLink, Mail, MapPin, MessageSquare, Star, User } from "lucide-react";

// Mock data for a single profile
const mockProfile = {
  id: "1",
  name: "Jordan Smith",
  jobTitle: "Senior Software Engineer",
  location: "San Francisco, CA",
  skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
  experience: [
    {
      company: "Tech Solutions Inc.",
      role: "Senior Software Engineer",
      period: "2020 - Present",
      description: "Led the development of a customer-facing web application using React and GraphQL."
    },
    {
      company: "Digital Innovations",
      role: "Frontend Developer",
      period: "2018 - 2020",
      description: "Worked on multiple projects using React, Redux, and modern JavaScript."
    }
  ],
  education: [
    {
      institution: "University of California, Berkeley",
      degree: "B.S. Computer Science",
      year: "2018"
    }
  ],
  languages: ["English (Native)", "Spanish (Conversational)"],
  availability: "Available in 2 weeks",
  bio: "Results-driven software engineer with 5+ years of experience building robust web applications. Passionate about clean code, performance optimization, and creating great user experiences."
};

const ProfileDetail = () => {
  const { profileId } = useParams();
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // In a real app, we would fetch the profile data based on profileId
  const profile = mockProfile;
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked 
        ? "This profile has been removed from your bookmarks." 
        : "This profile has been added to your bookmarks.",
    });
  };
  
  const handleContact = () => {
    toast({
      title: "Contact initiated",
      description: `A request to contact ${profile.name} has been sent.`,
    });
  };
  
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
              <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${profile.name}`} alt={profile.name} />
              <AvatarFallback>
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{profile.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>{profile.jobTitle}</span>
                <span className="text-xs">•</span>
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
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-3 w-3" />
            {profile.availability}
          </Badge>
          {profile.skills.map((skill, index) => (
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
                About {profile.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Bio</h3>
                <p className="text-muted-foreground">{profile.bio}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium mb-2">Languages</h3>
                <ul className="list-disc pl-5 text-muted-foreground">
                  {profile.languages.map((language, index) => (
                    <li key={index}>{language}</li>
                  ))}
                </ul>
              </div>
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
            <CardContent className="space-y-6">
              {profile.experience.map((exp, index) => (
                <div key={index} className={index !== 0 ? "pt-6 border-t" : ""}>
                  <div className="flex flex-col md:flex-row justify-between mb-2">
                    <h3 className="font-semibold">{exp.role}</h3>
                    <span className="text-muted-foreground text-sm">{exp.period}</span>
                  </div>
                  <h4 className="text-muted-foreground mb-2">{exp.company}</h4>
                  <p className="text-sm">{exp.description}</p>
                </div>
              ))}
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
            <CardContent className="space-y-6">
              {profile.education.map((edu, index) => (
                <div key={index} className={index !== 0 ? "pt-6 border-t" : ""}>
                  <div className="flex flex-col md:flex-row justify-between mb-2">
                    <h3 className="font-semibold">{edu.institution}</h3>
                    <span className="text-muted-foreground text-sm">{edu.year}</span>
                  </div>
                  <h4 className="text-muted-foreground">{edu.degree}</h4>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Connect with {profile.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Interested in working with {profile.name}? Reach out directly to discuss opportunities.
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
