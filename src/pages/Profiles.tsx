
import { useProfiles } from "@/hooks/useProfiles";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileGrid from "@/components/profile/ProfileGrid";
import EmptyState from "@/components/profile/EmptyState";
import LoadingState from "@/components/profile/LoadingState";

const Profiles = () => {
  const {
    filteredProfiles,
    isLoading,
    searchQuery,
    setSearchQuery,
    bookmarkedProfiles,
    toggleBookmark
  } = useProfiles();
  
  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <ProfileHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      {isLoading ? (
        <LoadingState />
      ) : filteredProfiles.length > 0 ? (
        <ProfileGrid 
          profiles={filteredProfiles}
          bookmarkedProfiles={bookmarkedProfiles}
          onToggleBookmark={toggleBookmark}
        />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default Profiles;
