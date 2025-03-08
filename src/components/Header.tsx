
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Search, BookmarkIcon, UserPlus } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Search', path: '/search', icon: Search },
    { name: 'Profiles', path: '/profiles' },
    { name: 'Create Profile', path: '/create-profile', icon: UserPlus }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'py-2 bg-blur border-b' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <span className="font-bold text-xl md:text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TalentHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-secondary ${
                  location.pathname === link.path 
                    ? 'text-primary' 
                    : 'text-foreground/80 hover:text-foreground'
                }`}
              >
                <div className="flex items-center space-x-1">
                  {link.icon && <link.icon className="w-4 h-4" />}
                  <span>{link.name}</span>
                </div>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" className="border-primary/20 transition-all hover:border-primary/80">
              Sign In
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 transition-all">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`block px-4 py-3 rounded-lg font-medium ${
                  location.pathname === link.path 
                    ? 'bg-secondary text-primary' 
                    : 'text-foreground'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {link.icon && <link.icon className="w-5 h-5" />}
                  <span>{link.name}</span>
                </div>
              </Link>
            ))}
            <div className="pt-2 space-y-3">
              <Button variant="outline" className="w-full border-primary/20 transition-all hover:border-primary/80">
                Sign In
              </Button>
              <Button className="w-full bg-primary hover:bg-primary/90 transition-all">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
