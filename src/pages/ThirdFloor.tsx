import React, { useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import ModelViewer from '@/components/ModelViewer';
import HoverDetails from '@/components/HoverDetails';
import { useRoomContext } from '@/contexts/RoomContext';
import { useSearchParams } from "react-router-dom";

// RoomId to position mapping for Third Floor
const roomIdToPosition: Record<string, [number, number, number]> = {
  "classroom-0303": [24, 12, 2],
  "studio-3a": [-8, 12, 13],
  "studio-3b": [11, 12, 13],
  "floating-studio-05": [-15, 12, -10],
  "classroom-0313": [-24, 12, 2],
  "studio-05b": [-24, 12, -10],
  "studio-04b": [24, 12, -10],
  "floating-studio-04": [13, 12, -10],
};

const ThirdFloor = () => {
  const { studios, lecturers } = useRoomContext();
  const [params] = useSearchParams();
  const targetRoomId = params.get("room")?.toLowerCase() ?? undefined;
  const targetRoomPosition = targetRoomId && roomIdToPosition[targetRoomId] ? roomIdToPosition[targetRoomId] : undefined;

  const getStudioName = (id: string) => {
    const studio = studios.find(s => s.id === id);
    return studio ? studio.currentName : '';
  };

  const getLecturerByRoomId = (roomId: string) => 
    lecturers.find((lect) => lect.roomId?.toLowerCase() === roomId);

  // --- ModelViewer auto-scroll-to-view logic ---
  const modelViewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (targetRoomId && modelViewerRef.current) {
      setTimeout(() => {
        modelViewerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  }, [targetRoomId]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="inline-block px-3 py-1 mb-2 text-xs font-medium uppercase tracking-wider text-primary bg-primary/5 rounded-full">
              Floor Plan
            </div>
            <h1 className="text-3xl md:text-4xl font-light mb-4">Third Floor</h1>
            <p className="text-lg text-muted-foreground">
              This floor have Studios, Toilets (Purple, pink) and Classrooms.
              Hover over the highlighted areas to learn more about each space.
            </p>
          </div>
          
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 animate-scale-up"
            ref={modelViewerRef}
          >
            <ModelViewer modelSrc="Annex13F.gltf" targetRoomPosition={targetRoomPosition}>
              <HoverDetails
                title="Classroom"
                roomId="classroom-0303"
                description="Max pax= 40, AC split unit, AP1 0303"
                position="right"
                modelPosition={[24, 12, 2]}
                isHighlighted={targetRoomId === "classroom-0303"}
                autoOpen={targetRoomId === "classroom-0303"}
              />
              <HoverDetails
                title={getStudioName('studio-3a')}
                roomId="studio-3a"
                description="Fixed Work Station 3 AC split unit, Projector"
                position="top"
                modelPosition={[-8, 12, 13]}
                isHighlighted={targetRoomId === "studio-3a"}
                autoOpen={targetRoomId === "studio-3a"}
              />
              <HoverDetails
                title={getStudioName('studio-3b')}
                roomId="studio-3b"
                description="Fixed Work Station 3 AC split unit, Projector"
                position="top"
                modelPosition={[11, 12, 13]}
                isHighlighted={targetRoomId === "studio-3b"}
                autoOpen={targetRoomId === "studio-3b"}
              />
              <HoverDetails
                title="Floating Studio 05"
                roomId="floating-studio-05"
                description="Open Layout, 2 AC Split Unit"
                position="right"
                modelPosition={[-15, 12, -10]}
                isHighlighted={targetRoomId === "floating-studio-05"}
                autoOpen={targetRoomId === "floating-studio-05"}
              />
              <HoverDetails
                title="Classroom"
                roomId="classroom-0313"
                description="Max pax= 40, AC split unit, AP1 0313"
                position="left"
                modelPosition={[-24, 12, 2]}
                isHighlighted={targetRoomId === "classroom-0313"}
                autoOpen={targetRoomId === "classroom-0313"}
              />
              <HoverDetails
                title="Studio 05B"
                roomId="studio-05b"
                description="Max Pax= 25, Fixed Work Station 3 AC split unit, Projector"
                position="bottom"
                modelPosition={[-24, 12, -10]}
                isHighlighted={targetRoomId === "studio-05b"}
                autoOpen={targetRoomId === "studio-05b"}
              />
              <HoverDetails
                title="Studio 04B"
                roomId="studio-04b"
                description="Max Pax =30, Fixed Work Station 3 AC split unit, Projector"
                position="right"
                modelPosition={[24, 12, -10]}
                isHighlighted={targetRoomId === "studio-04b"}
                autoOpen={targetRoomId === "studio-04b"}
              />
               <HoverDetails
                title="Floating Studio 04"
                roomId="floating-studio-04"
                description="Open Layout, 2 AC Split Unit"
                position="right"
                modelPosition={[13, 12, -10]}
                isHighlighted={targetRoomId === "floating-studio-04"}
                autoOpen={targetRoomId === "floating-studio-04"}
              />
              {/* No lecturer offices currently on this floor in this map, placeholder for future */}
            </ModelViewer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg p-6 shadow animate-slide-in-from-left">
              <h3 className="text-lg font-medium mb-2">Third Floor Specifications</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Lecture Office: 0t</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Studio: 4</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Other Amenities: 2 Floating Studio, 2 Classroom</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Toilet: 2</span>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 shadow animate-slide-in-from-right">
              <h3 className="text-lg font-medium mb-2">Key Features</h3>
              <p className="text-sm text-gray-600 mb-4">
                The transitional floor. where junior senior knowledge is being tested to see whether you are fit to go up the semester ladder.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Workstation studios</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Come up meet your friendly 'seniors'</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>---</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>---</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThirdFloor;
