
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const mainRoutes = [
    { name: 'Overview', path: '/' },
    { name: 'Lecturers', path: '/lecturers' },
    { name: 'Admin', path: '/admin' },
  ];

  const floorRoutes = [
    { name: 'Ground Floor', path: '/ground-floor' },
    { name: '1st Floor', path: '/first-floor' },
    { name: '2nd Floor', path: '/second-floor' },
    { name: '3rd Floor', path: '/third-floor' },
    { name: '4th Floor', path: '/fourth-floor' },
  ];

  // Check if current path is a floor page
  const isFloorPage = floorRoutes.some(route => location.pathname === route.path);
  const currentFloor = floorRoutes.find(route => location.pathname === route.path);
  
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-2">
        {mainRoutes.slice(0, 1).map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className={cn(
              "relative text-sm font-medium transition-colors hover:text-foreground/80 px-2",
              "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-foreground/70 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
              location.pathname === route.path 
                ? "text-foreground after:scale-x-100 after:origin-bottom-left" 
                : "text-foreground/60"
            )}
          >
            {route.name}
          </Link>
        ))}
        
        {/* Floors Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className={cn(
            "relative flex items-center space-x-1 text-sm font-medium transition-colors hover:text-foreground/80 focus:outline-none px-2",
            "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-foreground/70 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
            isFloorPage 
              ? "text-foreground after:scale-x-100 after:origin-bottom-left" 
              : "text-foreground/60"
          )}>
            <span>Floors</span>
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 bg-background border shadow-md">
            {floorRoutes.map((route) => (
              <DropdownMenuItem key={route.path} asChild>
                <Link
                  to={route.path}
                  className={cn(
                    "w-full cursor-pointer",
                    location.pathname === route.path 
                      ? "bg-accent text-accent-foreground" 
                      : ""
                  )}
                >
                  {route.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {mainRoutes.slice(1).map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className={cn(
              "relative text-sm font-medium transition-colors hover:text-foreground/80 px-2",
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
        className="lg:hidden flex items-center p-2 rounded-md"
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
        <div className="lg:hidden absolute top-16 right-0 left-0 z-50 bg-background/95 backdrop-blur-md border-b animate-slide-down">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {mainRoutes.slice(0, 1).map((route) => (
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
              
              {/* Mobile Floor Links */}
              <div className="pl-4 border-l border-border">
                <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                  Floors
                </div>
                {floorRoutes.map((route) => (
                  <Link
                    key={route.path}
                    to={route.path}
                    className={cn(
                      "block py-2 text-sm font-medium transition-colors",
                      location.pathname === route.path 
                        ? "text-foreground" 
                        : "text-foreground/60 hover:text-foreground/80"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {route.name}
                  </Link>
                ))}
              </div>

              {mainRoutes.slice(1).map((route) => (
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
