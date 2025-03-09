
import { User } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="text-center py-12">
      <User className="h-12 w-12 mx-auto text-muted-foreground" />
      <h2 className="text-xl font-semibold mt-4">No profiles found</h2>
      <p className="text-muted-foreground mt-2">
        Try adjusting your search or filters to find more candidates.
      </p>
    </div>
  );
};

export default EmptyState;
