
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface EmptyStateProps {
  title?: string;
  description?: string;
  showBackButton?: boolean;
}

const EmptyState = ({ 
  title = "No profiles found", 
  description = "Try adjusting your search terms or using more specific keywords.",
  showBackButton = false
}: EmptyStateProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-12">
      <Search className="h-12 w-12 mx-auto text-muted-foreground" />
      <h2 className="text-xl font-semibold mt-4">{title}</h2>
      <p className="text-muted-foreground mt-2">
        {description}
      </p>
      {!showBackButton ? (
        <p className="text-sm text-muted-foreground mt-2">
          For example, try searching for specific skills like "React" or "Python", 
          or job titles like "Frontend Developer" or "DevOps Engineer".
        </p>
      ) : (
        <div className="mt-6">
          <Button onClick={() => navigate("/profiles")}>
            Back to Profiles
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
