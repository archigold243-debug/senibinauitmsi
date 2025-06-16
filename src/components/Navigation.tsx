
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const routes = [
    { name: 'Overview', path: '/' },
    { name: 'Ground Floor', path: '/ground-floor' },
    { name: '1st Floor', path: '/first-floor' },
    { name: '2nd Floor', path: '/second-floor' },
    { name: '3rd Floor', path: '/third-floor' },
    { name: '4th Floor', path: '/fourth-floor' },
    { name: 'The Lecturers', path: '/lecturers' }, // Added new menu item here
    { name: 'Admin', path: '/admin' },
  ];
  
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        {routes.map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className={cn(
              "relative text-sm font-medium transition-colors hover:text-foreground/80",
              "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-foreground/70 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
              location.pathname === route.path 
                ? "text-foreground after:scale-x-100 after:origin-bottom-left" 
                : "text-foreground/60"
            )}
          >
            {route.name}
          </Link>
        ))}
      </nav>
      
      {/* Mobile Navigation Button */}
      <button 
        className="md:hidden flex items-center p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          {isOpen ? (
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          ) : (
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          )}
        </svg>
      </button>
      
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 right-0 left-0 z-50 bg-background/95 backdrop-blur-md border-b animate-slide-down">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className={cn(
                    "py-2 text-sm font-medium transition-colors",
                    location.pathname === route.path 
                      ? "text-foreground" 
                      : "text-foreground/60 hover:text-foreground/80"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {route.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
