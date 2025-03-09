import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div>
      <main>
        <Hero />
        <Features />
        
        {/* How It Works Section */}
        <section className="section-padding">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform makes finding the right talent or opportunity easier than ever before
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Create Your Profile",
                  description: "Talent users create detailed profiles highlighting skills, projects, and experience.",
                  for: "Talent"
                },
                {
                  step: "02",
                  title: "Natural Language Search",
                  description: "Recruiters search using plain language to find the perfect match for their needs.",
                  for: "Recruiters"
                },
                {
                  step: "03",
                  title: "Connect Directly",
                  description: "Once you find a match, connect directly to discuss opportunities.",
                  for: "Both"
                }
              ].map((item, index) => (
                <div key={index} className="relative text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary font-bold text-lg mb-5">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                  <div className="mt-3 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    For {item.for}
                  </div>
                  
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 right-0 translate-x-1/2 w-24 border-t border-dashed border-muted-foreground/30"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-br from-primary to-accent text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Connect with Top Talent?</h2>
              <p className="text-white/80 text-lg mb-8">
                Join our platform today and discover the perfect match for your team or showcase your skills to potential employers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  <Link to="/profiles">
                    <span>Find Talent</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/create-profile">
                    Create Profile
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-12 border-t">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  TalentHub
                </span>
                <p className="text-sm text-muted-foreground mt-2">
                  Connecting exceptional talent with opportunities
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12">
                <div>
                  <h4 className="font-medium mb-3">Platform</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                    <li><Link to="/profiles" className="hover:text-primary transition-colors">Profiles</Link></li>
                    <li><Link to="/analytics" className="hover:text-primary transition-colors">Analytics</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Account</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link to="/sign-in" className="hover:text-primary transition-colors">Sign In</Link></li>
                    <li><Link to="/sign-up" className="hover:text-primary transition-colors">Sign Up</Link></li>
                    <li><Link to="/profile" className="hover:text-primary transition-colors">My Profile</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Legal</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} TalentHub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
