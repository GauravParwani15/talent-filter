
import { User } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="text-center py-12">
      <User className="h-12 w-12 mx-auto text-muted-foreground" />
      <h2 className="text-xl font-semibold mt-4">No profiles found</h2>
      <p className="text-muted-foreground mt-2">
        Try adjusting your search terms or using more specific keywords.
      </p>
      <p className="text-sm text-muted-foreground mt-2">
        For example, try searching for specific skills like "React" or "Python", 
        or job titles like "Frontend Developer" or "DevOps Engineer".
      </p>
    </div>
  );
};

export default EmptyState;
