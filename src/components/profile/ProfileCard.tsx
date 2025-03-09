
import { Link } from "react-router-dom";
import { Bookmark, MapPin, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { type Profile } from "@/hooks/useProfiles";

interface ProfileCardProps {
  profile: Profile;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

const ProfileCard = ({ profile, isBookmarked, onToggleBookmark }: ProfileCardProps) => {
  return (
    <Card className="overflow-hidden">
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
              onClick={() => onToggleBookmark(profile.id)}
            >
              <Bookmark 
                className={cn(
                  "h-5 w-5",
                  isBookmarked ? "fill-primary text-primary" : "text-muted-foreground"
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
  );
};

export default ProfileCard;
