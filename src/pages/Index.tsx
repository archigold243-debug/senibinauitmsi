import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ModelViewer from '@/components/ModelViewer';
import { useVisitorTracker } from '@/hooks/useVisitorTracker';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRoomContext } from '@/contexts/RoomContext';
import { ExternalLink, Users, Building2 } from 'lucide-react';

const floors = [
  { name: 'Ground Floor', path: '/ground-floor', description: 'Entrance, Master Studios, Studios, Classroom, Lab and Lecturer Offices' },
  { name: '1st Floor', path: '/first-floor', description: 'Studios, Lecturers Offices, Foyer and collaborative spaces' },
  { name: '2nd Floor', path: '/second-floor', description: 'Staff Lounge, Studios, Crit Room and Lecturer Offices' },
  { name: '3rd Floor', path: '/third-floor', description: 'Classrooms, Studios fitted with Fixed Workstations' },
  { name: '4th Floor', path: '/fourth-floor', description: 'Surau, Studio, Classroom and Lecturers Offices' },
];

const Index = () => {
  const { visitorCount } = useVisitorTracker();
  const { namedRooms } = useRoomContext();

  const getRoomLink = (roomName: string, defaultRoomId: string) => {
    const room = namedRooms.find(r => r.currentName === roomName || r.id === defaultRoomId);
    console.log(`Attempting to get link for roomName: ${roomName}, defaultRoomId: ${defaultRoomId}`);
    console.log('Found room:', room);

    if (room) {
      const matchedFloor = floors.find(floor => 
        floor.name.toLowerCase() === room.floor?.toLowerCase()
      );
      
      let floorPath = '/ground-floor';
      if (matchedFloor) {
        floorPath = matchedFloor.path;
      } else if (room.floor) {
        const simpleFloorName = room.floor.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (simpleFloorName.includes('ground')) floorPath = '/ground-floor';
        else if (simpleFloorName.includes('1st') || simpleFloorName.includes('first')) floorPath = '/first-floor';
        else if (simpleFloorName.includes('2nd') || simpleFloorName.includes('second')) floorPath = '/second-floor';
        else if (simpleFloorName.includes('3rd') || simpleFloorName.includes('third')) floorPath = '/third-floor';
        else if (simpleFloorName.includes('4th') || simpleFloorName.includes('fourth')) floorPath = '/fourth-floor';
      }
      console.log(`Generated floorPath: ${floorPath} for room ID: ${room.id}`);
      return `${floorPath}?room=${room.id}`;
    }
    console.log(`Room not found for ${roomName} or ${defaultRoomId}. Using fallback link.`);
    return `/second-floor?room=${defaultRoomId}`;
  };

  return (
    <Layout>
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Hero Section */}
          <section className="relative min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 overflow-hidden">
            
            <div className="relative container mx-auto px-4 py-20 text-center">
              <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-5xl md:text-7xl font-normal tracking-tight">
                  Welcome to School of Architecture
                  <span className="block text-3xl font-light">UiTM</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Explore our activities, facilities, students work and roam around our building in 3D.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '300ms' }}>
                    <Link to={getRoomLink('Bilik Krit Utama', 'ap1-234')} className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors">
                      Bilik Krit Utama
                    </Link>
                    <Link to={getRoomLink('Bilik Krit Kecil', 'ap1-104')} className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors">
                      Bilik Krit Kecil
                    </Link>
                    <Link to={getRoomLink('Bilik Krit TEC', 'ap1-132')} className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors">
                      Bilik Krit TEC
                    </Link>
                  </div>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                    <a
                      href="https://maps.google.com/?q=Architecture+School+Annex+1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Our location 
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Visitor Count */}
          <section className="py-8">
            <div className="container mx-auto px-4 text-center">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-4 rounded-full border">
                <div className="text-lg font-semibold">Total Visitors Today:</div>
                <div className="text-2xl font-bold text-primary">{visitorCount === null ? '...' : visitorCount}</div>
              </div>
            </div>
          </section>

          {/* 3D Model Overview */}
          <section className="py-16 bg-secondary/5">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">Building Overview</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Explore our interactive 3D model of the building. Use your mouse to rotate and zoom.
                </p>
              </div>
              <div className="bg-card rounded-lg shadow-lg p-4">
                <ModelViewer modelSrc="Annex1.glb" />
              </div>
              <div className="mt-6 text-center text-sm text-muted-foreground">
                Click and drag to rotate. Use scroll wheel to zoom in and out.
              </div>
            </div>
          </section>

          {/* Secondary Navigation */}
          <section className="py-16 bg-secondary/5">
            <div className="container mx-auto px-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="secondary" size="lg" className="text-lg px-8 py-6">
                  <Link to="/lecturers">
                    <Users className="w-5 h-5 mr-2" />
                    The Lecturers
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg" className="text-lg px-8 py-6">
                  <Link to="/studio-plan">
                    <Building2 className="w-5 h-5 mr-2" />
                    Studio Plan Overview
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>

        {/* Instagram Feed Sidebar */}
        <div className="lg:col-span-1">
          <div className="p-6 bg-card border rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-center">Follow Our Journey</h3>
            <div className="elfsight-app-a590ee74-19ef-423f-932e-b9b0dcfab450" data-elfsight-app-lazy></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;