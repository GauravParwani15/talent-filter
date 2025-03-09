
import { Menu, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import NotificationBell from "@/components/NotificationBell";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message || "An error occurred while signing out.",
      });
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-blur">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <NavLink to="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                TalentHub
              </span>
            </NavLink>
            <nav className="hidden md:flex items-center gap-6 ml-10">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-foreground/80"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-foreground/80"
                  }`
                }
              >
                Search
              </NavLink>
              <NavLink
                to="/profiles"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-foreground/80"
                  }`
                }
              >
                Profiles
              </NavLink>
              <NavLink
                to="/analytics"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-foreground/80"
                  }`
                }
              >
                Analytics
              </NavLink>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <NotificationBell />
              <ThemeToggle />
              {session ? (
                <>
                  <NavLink to="/profile">
                    <Button variant="outline" size="sm">
                      My Profile
                    </Button>
                  </NavLink>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleSignOut}
                    className="flex items-center gap-1"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <NavLink to="/sign-in">
                    <Button variant="outline" size="sm">
                      Sign In
                    </Button>
                  </NavLink>
                  <NavLink to="/sign-up">
                    <Button size="sm">Sign Up</Button>
                  </NavLink>
                </>
              )}
            </div>
            <button
              className="flex md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container px-4 py-4 flex flex-col gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `py-2 text-base font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-foreground/80"
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                `py-2 text-base font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-foreground/80"
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Search
            </NavLink>
            <NavLink
              to="/profiles"
              className={({ isActive }) =>
                `py-2 text-base font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-foreground/80"
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Profiles
            </NavLink>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `py-2 text-base font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-foreground/80"
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Analytics
            </NavLink>
            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                `py-2 text-base font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-foreground/80"
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Notifications
            </NavLink>
            <div className="flex flex-col gap-2 pt-2 border-t">
              {session ? (
                <>
                  <NavLink to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      My Profile
                    </Button>
                  </NavLink>
                  <Button 
                    variant="ghost" 
                    className="w-full flex items-center justify-center gap-1"
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <NavLink to="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </NavLink>
                  <NavLink to="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">Sign Up</Button>
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
