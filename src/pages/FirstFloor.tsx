import React, { useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import ModelViewer from '@/components/ModelViewer';
import HoverDetails from '@/components/HoverDetails';
import { useSearchParams } from "react-router-dom";
import { useRoomContext } from '@/contexts/RoomContext';

// Room ID to position mapping for First Floor
const roomIdToPosition: Record<string, [number, number, number]> = {
  "studio-01a": [24, 6, 2],
  "studio-03a-extended": [24, 6, -10],
  "studio-03a": [24, 6, -20],
  "crit-tec": [11, 6, 15],
  "studio-07a": [-12, 6, 15],
  "crit-small": [-23, 6, 0],
  "zikri": [-10, 6, -15],
  "farah": [10, 6, -15],
  "ainsyah": [6, 6, -16],
  // Add more if needed (lecturers etc.)
};

const getPersonId = (name: string) => name?.toLowerCase().replace(/\s|[^\w]/g, '');

const FirstFloor = () => {
  const { studios, namedRooms, lecturers } = useRoomContext();
  const [params] = useSearchParams();
  const targetRoomId = params.get("room")?.toLowerCase() ?? undefined;
  const targetRoomPosition = targetRoomId && roomIdToPosition[targetRoomId] ? roomIdToPosition[targetRoomId] : undefined;

  const getRoomName = (id: string) => {
    const room = namedRooms.find(r => r.id === id);
    return room ? room.currentName : '';
  };

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
            <h1 className="text-3xl md:text-4xl font-light mb-4">First Floor</h1>
            <p className="text-lg text-muted-foreground">
              This floor have Studios, Crit Rooms, Toilets (Purple, pink), Archi. Lecturer's Office (yellow), and Open Galery/Stage.
              Hover over the highlighted areas to learn more about each space.
            </p>
          </div>
          
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 animate-scale-up"
            ref={modelViewerRef}
          >
            <ModelViewer modelSrc="Annex11F.gltf" targetRoomPosition={targetRoomPosition}>
              <HoverDetails
                title={getStudioName('studio-01a')}
                roomId="studio-01a"
                description="Max Pax =30, 2 AC split unit, Projector"
                position="right"
                modelPosition={[24, 6, 2]}
                isHighlighted={targetRoomId === "studio-01a"}
                autoOpen={targetRoomId === "studio-01a"}
              />
              <HoverDetails
                title={getStudioName('studio-03a-extended')}
                roomId="studio-03a-extended"
                description="Max Pax =30, 2 AC split unit, Non projector"
                position="right"
                modelPosition={[24, 6, -10]}
                isHighlighted={targetRoomId === "studio-03a-extended"}
                autoOpen={targetRoomId === "studio-03a-extended"}
              />
              <HoverDetails
                title={getStudioName('studio-03a')}
                roomId="studio-03a"
                description="Max Pax =30, 2 AC split unit, Projector"
                position="right"
                modelPosition={[24, 6, -20]}
                isHighlighted={targetRoomId === "studio-03a"}
                autoOpen={targetRoomId === "studio-03a"}
              />
              <HoverDetails
                title={getRoomName('crit-tec')}
                roomId="crit-tec"
                description="Use for Crtique Sessions, Wrap up, Lectures, Projector, AP1 132"
                position="bottom"
                modelPosition={[11, 6, 15]}
                isHighlighted={targetRoomId === "crit-tec"}
                autoOpen={targetRoomId === "crit-tec"}
              />
              <HoverDetails
                title={getStudioName('studio-07a')}
                roomId="studio-07a"
                description="Max Pax =30, Fixed Work Station 3 AC split unit, Projector."
                position="right"
                modelPosition={[-12, 6, 15]}
                isHighlighted={targetRoomId === "studio-07a"}
                autoOpen={targetRoomId === "studio-07a"}
              />
              <HoverDetails
                title={getRoomName('crit-small')}
                roomId="crit-small"
                description="Use for Crtique Sessions, Wrap up, Lectures, Projector, AP1 104"
                position="bottom"
                modelPosition={[-23, 6, 0]}
                isHighlighted={targetRoomId === "crit-small"}
                autoOpen={targetRoomId === "crit-small"}
              />
              {/* Dynamic Lecturer Details */}
              {["zikri", "farah", "ainsyah"].map((id) => {
                const lect = getLecturerByRoomId(id);
                if (!lect) return null;
                return (
                  <HoverDetails
                    key={id}
                    title={lect.displayName}
                    surname={lect.surname}
                    description={lect.role}
                    position="right"
                    modelPosition={roomIdToPosition[id]}
                    imageSrc={lect.photo}
                    roomId={id}
                    isHighlighted={targetRoomId === id}
                    autoOpen={targetRoomId === id}
                  />
                );
              })}
            </ModelViewer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg p-6 shadow animate-slide-in-from-left">
              <h3 className="text-lg font-medium mb-2">First Floor Specifications</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Lecturer Office: 3</span>
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
                  <span>Other Amenities: 2 crit rooms, Open stage/Gallery</span>
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
                The first floor is optimized for meetings and collaborative work, with a focus on technology integration and flexibility.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Integrated room booking system</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Smart glass walls with privacy control</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Wireless charging stations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Adjustable lighting for different meeting types</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FirstFloor;
