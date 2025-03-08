
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import NotificationBell from "@/components/NotificationBell";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <NavLink to="/sign-in">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </NavLink>
              <NavLink to="/sign-up">
                <Button size="sm">Sign Up</Button>
              </NavLink>
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
              <NavLink to="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </NavLink>
              <NavLink to="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Sign Up</Button>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
