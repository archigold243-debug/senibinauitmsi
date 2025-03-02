
import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Index = () => {
  const floors = [
    { name: 'Ground Floor', path: '/ground-floor', description: 'Entrance, reception area, and public spaces' },
    { name: '1st Floor', path: '/first-floor', description: 'Meeting rooms and collaborative spaces' },
    { name: '2nd Floor', path: '/second-floor', description: 'Open workspaces and break areas' },
    { name: '3rd Floor', path: '/third-floor', description: 'Executive offices and premium suites' },
    { name: '4th Floor', path: '/fourth-floor', description: 'Recreational area and rooftop garden' },
  ];
  
  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 pt-24 pb-48 md:pt-36 md:pb-64">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-3 py-1 mb-6 text-xs font-medium uppercase tracking-wider text-primary bg-primary/5 rounded-full animate-fade-in">
              Interactive Building Explorer
            </div>
            <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6 animate-slide-up" style={{animationDelay: '100ms'}}>
              Experience Architecture <br /> 
              <span className="font-normal">In A New Dimension</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-slide-up" style={{animationDelay: '200ms'}}>
              Explore our building floor by floor with interactive 3D models. 
              Discover spaces and details through an immersive digital experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay: '300ms'}}>
              <Link 
                to="/ground-floor" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                Start Exploring
              </Link>
              <a 
                href="#floors" 
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                View All Floors
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <section id="floors" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">Building Floors</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select a floor to explore the detailed 3D model with interactive elements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {floors.map((floor, index) => (
              <Link 
                key={floor.path} 
                to={floor.path}
                className={cn(
                  "group relative overflow-hidden rounded-lg shadow-lg h-64 flex flex-col items-center justify-center p-8 bg-white hover:shadow-xl transition-all duration-300",
                  "animate-scale-up"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white opacity-50 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                <div className="relative z-10 text-center">
                  <h3 className="text-xl font-medium mb-2 group-hover:translate-y-[-4px] transition-transform">
                    {floor.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {floor.description}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium text-primary">
                    Explore Floor
                    <svg 
                      className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-6">How to Use This Interactive Explorer</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Select a Floor</h3>
                    <p className="text-muted-foreground">
                      Navigate through different levels using the menu at the top or floor cards.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Explore the 3D Model</h3>
                    <p className="text-muted-foreground">
                      Use your mouse to rotate, zoom, and pan around the 3D model.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-1">Discover Interactive Elements</h3>
                    <p className="text-muted-foreground">
                      Hover over hotspots within the model to reveal detailed information about specific areas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass rounded-lg p-6 md:p-8">
              <div className="aspect-video bg-gray-100 rounded mb-6 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p>Tutorial Video</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Watch this quick tutorial to get the most out of your interactive building exploration experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
