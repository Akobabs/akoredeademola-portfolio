
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, GraduationCap, FolderOpen, Star, FileText, Contact, Menu, X, BookOpen } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ThemeToggle } from '@/components/ThemeToggle';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: User },
    { name: 'Blog', path: '/blog', icon: BookOpen },
    { name: 'Projects', path: '/projects', icon: FolderOpen },
    { name: 'Skills', path: '/skills', icon: Star },
    { name: 'Publications', path: '/publications', icon: FileText },
    { name: 'Contact', path: '/contact', icon: Contact },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
        <Link to="/" className="flex flex-col items-center text-foreground hover:text-primary transition-colors">
          <span className="text-lg sm:text-2xl font-bold">ADEMOLA</span>
          <span className="text-sm sm:text-base font-medium">Akorede Adejare</span>
        </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-1 px-2 xl:px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-primary hover:bg-accent'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden xl:block">{item.name}</span>
                </Link>
              );
            })}
            <ThemeToggle />
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-accent transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-3 border-t border-border bg-background/95 backdrop-blur-md">
            <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? 'text-primary bg-primary/10 border border-primary/20'
                        : 'text-muted-foreground hover:text-primary hover:bg-accent border border-transparent'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
