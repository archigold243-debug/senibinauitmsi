import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ModelViewer from '@/components/ModelViewer';
import { useVisitorTracker } from '@/hooks/useVisitorTracker'; // ✅ Hook for tracking visitors

const floors = [
  { name: 'Ground Floor', path: '/ground-floor', description: 'Entrance, Master Studios, Studios, Classroom, Lab and Lecturer Offices' },
  { name: '1st Floor', path: '/first-floor', description: 'Studios, Lecturers Offices, Foyer and collaborative spaces' },
  { name: '2nd Floor', path: '/second-floor', description: 'Staff Lounge, Studios, Crit Room and Lecturer Offices' },
  { name: '3rd Floor', path: '/third-floor', description: 'Classrooms, Studios fitted with Fixed Workstations' },
  { name: '4th Floor', path: '/fourth-floor', description: 'Surau, Studio, Classroom and Lecturers Offices' },
];

const Index = () => {
  useVisitorTracker(); // ✅ Fire visitor tracking
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    // 👇 Replace this URL with your deployed Google Apps Script if different
    fetch('https://script.google.com/macros/s/AKfycbwVOVFDDjd1S4eCuxGKyXt3sZ5pJMkgHOPBN8C0-g7SzMV3sWx-a3gG5MRrJQAYlwYM/exec?action=count')
      .then(res => res.json())
      .then(data => {
        if (typeof data.count === 'number') {
          setVisitorCount(data.count);
        }
      })
      .catch(err => {
        console.error('Failed to fetch visitor count:', err);
      });
  }, []);

  return (
    <Layout>
      {/* Hero section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-24 pb-48 md:pt-36 md:pb-64">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-3 py-1 mb-6 text-xs font-medium uppercase tracking-wider text-primary bg-primary/5 rounded-full animate-fade-in">
              Interactive Annex 1 Explorer
            </div>
            <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
              Welcome to Architecture School <br />
              <span className="font-normal">Annex 1</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
              Explore our building floor by floor with interactive 3D models.&nbsp;
              Discover spaces and details through an immersive digital experience.
            </p>

            {/* Deep-link buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '300ms' }}>
              <Link to="/second-floor?room=crit-main" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors">
                Bilik Krit Utama
              </Link>
              <Link to="/first-floor?room=crit-small" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors">
                Bilik Krit Kecil
              </Link>
              <Link to="/first-floor?room=crit-tec" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors">
                Bilik Krit TEC
              </Link>
            </div>

            {/* Google Maps */}
            <div className="flex justify-center mt-6">
              <a
                href="https://maps.app.goo.gl/8nYXVnFebumsi5FLA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Location of Annex 1
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Model Viewer */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">Building Overview</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our interactive 3D model of the building. Use your mouse to rotate and zoom.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <ModelViewer modelSrc="Annex1.glb" />
          </div>
          <div className="mt-6 text-center text-sm text-gray-500">
            Click and drag to rotate. Use scroll wheel to zoom in and out.
          </div>

          {/* 👇 Visitor Count Display */}
          <div className="text-center mt-2 text-sm text-muted-foreground">
            {visitorCount !== null
              ? `${visitorCount} visitors have explored Annex 1 so far.`
              : 'Loading visitor count...'}
          </div>
        </div>
      </section>

      {/* Floor grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {floors.map(floor => (
              <div key={floor.name} className="bg-white rounded-lg p-6 shadow">
                <h3 className="text-lg font-medium mb-2">{floor.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{floor.description}</p>
                <Link
                  to={floor.path}
                  className="inline-flex items-center text-primary hover:underline"
                >
                  Explore {floor.name}
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lecturers button */}
      <div className="flex flex-col items-center gap-4 my-8">
        <Button asChild variant="secondary" size="lg">
          <Link to="/lecturers">The Lecturers</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default Index;
