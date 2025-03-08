
import { useState } from "react";
import { TalentProfile } from "@/types";
import { BookmarkIcon, Calendar, Info, MapPin, Briefcase, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProfileCardProps {
  profile: TalentProfile;
  isBookmarked?: boolean;
  onBookmark?: (profileId: string) => void;
}

const ProfileCard = ({ profile, isBookmarked = false, onBookmark }: ProfileCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const initials = profile.fullName
    .split(" ")
    .map(name => name[0])
    .join("")
    .toUpperCase();
  
  const topSkills = profile.skills.slice(0, 3);
  const otherSkills = profile.skills.slice(3);
  
  return (
    <Card className={`overflow-hidden transition-all duration-300 animate-fade-in card-shadow ${expanded ? "ring-1 ring-primary/30" : ""}`}>
      <CardHeader className="relative pb-0">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`rounded-full ${isBookmarked ? "text-primary" : "text-muted-foreground"}`}
                  onClick={() => onBookmark && onBookmark(profile.id)}
                  aria-label={isBookmarked ? "Remove bookmark" : "Bookmark profile"}
                >
                  <BookmarkIcon className={`h-5 w-5 ${isBookmarked ? "fill-primary" : ""}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isBookmarked ? "Remove bookmark" : "Bookmark profile"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-start space-x-4">
          <Avatar className="h-14 w-14 border">
            <AvatarImage src={profile.avatar} alt={profile.fullName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          
          <div className="space-y-1.5">
            <h3 className="text-xl font-semibold">{profile.fullName}</h3>
            <p className="text-sm text-muted-foreground">{profile.headline}</p>
            
            <div className="flex items-center flex-wrap gap-2 mt-2">
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span>{profile.location}</span>
              </div>
              
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                <span>{profile.totalYearsOfExperience} years experience</span>
              </div>
              
              <div className="flex items-center text-xs text-muted-foreground">
                <Briefcase className="h-3.5 w-3.5 mr-1" />
                <span className="capitalize">{profile.availability.replace('-', ' ')}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Top Skills</h4>
            <div className="flex flex-wrap gap-1.5">
              {topSkills.map(skill => (
                <Badge key={skill.name} variant="secondary" className="font-normal">
                  {skill.name} • {skill.years} {skill.years === 1 ? 'yr' : 'yrs'}
                </Badge>
              ))}
              
              {otherSkills.length > 0 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline" className="cursor-help">
                        +{otherSkills.length} more
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[250px]">
                      <p className="text-xs">
                        {otherSkills.map(s => s.name).join(", ")}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
          
          {expanded && (
            <>
              {profile.projects.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Projects</h4>
                  <div className="space-y-3">
                    {profile.projects.map(project => (
                      <div key={project.id} className="bg-muted/30 p-3 rounded-lg">
                        <div className="flex items-start justify-between mb-1">
                          <h5 className="font-medium text-sm">{project.title}</h5>
                          {project.url && (
                            <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{project.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map(tech => (
                            <span key={tech} className="inline-block px-2 py-0.5 bg-secondary text-xs rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {profile.expectedCompensation && (
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-1">Expected Compensation</h4>
                  <p className="text-sm">{profile.expectedCompensation}</p>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="text-xs w-full flex items-center justify-center gap-1"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4" />
              <span>View Less</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              <span>View More</span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
