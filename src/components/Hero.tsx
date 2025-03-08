
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-36 lg:pt-40 section-padding">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-10 md:mb-16 max-w-4xl mx-auto">
          <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6 animate-fade-in">
            Introducing TalentHub
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
            Connect with exceptional talent using natural language
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mx-auto max-w-3xl mb-8 md:mb-10 animate-fade-up" style={{ animationDelay: "200ms" }}>
            Discover skilled professionals through an intuitive search experience. Simply describe what you're looking for and let our platform do the rest.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "300ms" }}>
            <Button asChild size="lg" className="px-6 font-medium shadow-md transition-all group">
              <Link to="/search">
                <span>Find Talent</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-6 font-medium">
              <Link to="/create-profile">
                Create Profile
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Abstract design elements */}
        <div className="relative mt-12 md:mt-20 rounded-xl overflow-hidden w-full max-w-5xl mx-auto shadow-2xl animate-fade-up" style={{ animationDelay: "400ms" }}>
          <div className="bg-gradient-to-br from-primary/90 via-primary to-accent rounded-t-xl p-8 md:p-12 text-white">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-white/20"></div>
              <div className="w-3 h-3 rounded-full bg-white/20"></div>
              <div className="w-3 h-3 rounded-full bg-white/20"></div>
            </div>
            <h3 className="text-xl md:text-2xl font-medium mb-4">Find talent that matches your exact needs</h3>
            <div className="relative bg-white/10 rounded-lg p-4 mb-6">
              <p className="text-white/90 text-sm md:text-base">
                <span className="opacity-70">Try searching: </span> 
                "Frontend developer with 5+ years of React experience in fintech"
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['React', 'Machine Learning', 'Product Design', 'DevOps'].map((skill) => (
                <div key={skill} className="bg-white/10 rounded-lg px-3 py-2 text-sm text-center">
                  {skill}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card p-8 md:p-12 rounded-b-xl grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Natural Language Search",
                description: "Search for candidates using conversational language instead of complex filters"
              },
              {
                title: "Talent Profiles",
                description: "Browse detailed profiles highlighting skills, projects, and experience"
              },
              {
                title: "Direct Connection",
                description: "Connect directly with candidates that match your requirements"
              }
            ].map((feature, index) => (
              <div key={index} className="space-y-2">
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl -z-10"></div>
    </section>
  );
};

export default Hero;
