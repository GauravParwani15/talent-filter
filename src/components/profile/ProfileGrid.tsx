
import { type Profile } from "@/hooks/useProfiles";
import ProfileCard from "./ProfileCard";

interface ProfileGridProps {
  profiles: Profile[];
  bookmarkedProfiles: string[];
  onToggleBookmark: (id: string) => void;
}

const ProfileGrid = ({ profiles, bookmarkedProfiles, onToggleBookmark }: ProfileGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          isBookmarked={bookmarkedProfiles.includes(profile.id)}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </div>
  );
};

export default ProfileGrid;
