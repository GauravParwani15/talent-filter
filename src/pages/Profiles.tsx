
import { useState } from "react";
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
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock profiles data
const mockProfiles = [
  {
    id: "1",
    name: "Jordan Smith",
    jobTitle: "Senior Software Engineer",
    location: "San Francisco, CA",
    skills: ["React", "TypeScript", "Node.js"],
    availability: "Available in 2 weeks",
    imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Jordan Smith"
  },
  {
    id: "2",
    name: "Alex Johnson",
    jobTitle: "UX/UI Designer",
    location: "New York, NY",
    skills: ["Figma", "Adobe XD", "UI Design"],
    availability: "Immediately Available",
    imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Alex Johnson"
  },
  {
    id: "3",
    name: "Taylor Wilson",
    jobTitle: "DevOps Engineer",
    location: "Austin, TX",
    skills: ["AWS", "Docker", "Kubernetes"],
    availability: "Available in 1 month",
    imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Taylor Wilson"
  },
  {
    id: "4",
    name: "Morgan Lee",
    jobTitle: "Full Stack Developer",
    location: "Seattle, WA",
    skills: ["JavaScript", "Python", "React", "Django"],
    availability: "Available in 2 weeks",
    imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Morgan Lee"
  },
  {
    id: "5",
    name: "Casey Brown",
    jobTitle: "Mobile Developer",
    location: "Los Angeles, CA",
    skills: ["React Native", "Swift", "Kotlin"],
    availability: "Immediately Available",
    imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Casey Brown"
  },
  {
    id: "6",
    name: "Riley Garcia",
    jobTitle: "Data Scientist",
    location: "Chicago, IL",
    skills: ["Python", "R", "Machine Learning", "SQL"],
    availability: "Available in 3 weeks",
    imageUrl: "https://api.dicebear.com/7.x/personas/svg?seed=Riley Garcia"
  }
];

const Profiles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedProfiles, setBookmarkedProfiles] = useState<string[]>([]);
  
  const toggleBookmark = (profileId: string) => {
    setBookmarkedProfiles(prev => 
      prev.includes(profileId)
        ? prev.filter(id => id !== profileId)
        : [...prev, profileId]
    );
  };
  
  const filteredProfiles = mockProfiles.filter(profile => 
    profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfiles.map((profile) => (
          <Card key={profile.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="h-24 bg-gradient-to-r from-primary/20 to-accent/20" />
            </CardHeader>
            <CardContent className="pt-0 relative">
              <div className="flex justify-between">
                <Avatar className="h-16 w-16 border-4 border-background mt-[-32px]">
                  <AvatarImage src={profile.imageUrl} alt={profile.name} />
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="mt-2"
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
              
              <div className="mt-2">
                <h3 className="text-xl font-semibold">{profile.name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Briefcase className="h-3 w-3" />
                  <span>{profile.jobTitle}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3" />
                  <span>{profile.location}</span>
                </div>
                
                <div className="flex items-center gap-1 text-sm mb-3">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {profile.availability}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">{skill}</Badge>
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
      
      {filteredProfiles.length === 0 && (
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
