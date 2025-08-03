import React, { useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import ModelViewer from '@/components/ModelViewer';
import SecondFloorHotspots from './SecondFloorHotspots';
import SecondFloorSpecsCard from './SecondFloorSpecsCard';
import SecondFloorFeaturesCard from './SecondFloorFeaturesCard';
import { useRoomContext } from '@/contexts/RoomContext';
import { useSearchParams } from "react-router-dom";

// RoomId to position mapping for Second Floor
// Dynamic mapping from backend
const useRoomIdToPosition = () => {
  const { rooms } = useRoomContext();
  return React.useMemo(() => {
    const map: Record<string, [number, number, number]> = {};
    rooms.forEach(room => {
      if (room.position) map[room.roomID.toLowerCase()] = room.position;
    });
    return map;
  }, [rooms]);
};

const SecondFloor = () => {
  const [params] = useSearchParams();
  const roomIdToPosition = useRoomIdToPosition();
  const targetRoomId = params.get("room")?.toLowerCase() ?? undefined;
  const targetRoomPosition = targetRoomId && roomIdToPosition[targetRoomId] ? roomIdToPosition[targetRoomId] : undefined;

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
            <h1 className="text-3xl md:text-4xl font-light mb-4">Second Floor</h1>
            <p className="text-lg text-muted-foreground">
              This floor have Studios, Crit Rooms, Toilets (Purple, pink), Archi. Lecturer's Office (yellow), and Staff Lounge.
              Hover over the highlighted areas to learn more about each space.
            </p>
          </div>
          
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 animate-scale-up"
            ref={modelViewerRef}
          >
            <ModelViewer modelSrc="Annex12F.gltf" targetRoomPosition={targetRoomPosition}>
              <SecondFloorHotspots
                roomIdToPosition={roomIdToPosition}
                targetRoomId={targetRoomId}
              />
            </ModelViewer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <SecondFloorSpecsCard />
            <SecondFloorFeaturesCard />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SecondFloor;
