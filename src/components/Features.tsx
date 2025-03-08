
import { Search, User, Bookmark, Bell, Shield, Database } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Natural Language Search",
    description: "Find talent using conversational queries instead of complex filters. Just type what you need in plain language."
  },
  {
    icon: User,
    title: "Rich Talent Profiles",
    description: "Browse comprehensive profiles showcasing skills, projects, experience, and availability in a clean interface."
  },
  {
    icon: Bookmark,
    title: "Bookmarking System",
    description: "Save and organize profiles of candidates that match your requirements for future reference."
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Receive alerts when your profile is viewed or when new candidates match your search criteria."
  },
  {
    icon: Shield,
    title: "Profile Verification",
    description: "Verification system ensures the authenticity of profiles and the accuracy of information."
  },
  {
    icon: Database,
    title: "Advanced Filtering",
    description: "Refine search results with filters for location, availability, experience level, and more."
  }
];

const Features = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover how our platform simplifies the talent discovery process with these powerful features
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl p-6 border border-border hover:shadow-md transition-all hover-lift card-shadow"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
