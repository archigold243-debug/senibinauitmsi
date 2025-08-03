import React, { useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import ModelViewer from '@/components/ModelViewer';
import GroundFloorHotspots from './GroundFloorHotspots';
import GroundFloorSpecsCard from './GroundFloorSpecsCard';
import GroundFloorFeaturesCard from './GroundFloorFeaturesCard';
import { useRoomContext } from '@/contexts/RoomContext';
import { useSearchParams } from "react-router-dom";

// Room position mapping for Ground Floor
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

const GroundFloor = () => {
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
            <h1 className="text-3xl md:text-4xl font-light mb-4">Ground Floor</h1>
            <p className="text-lg text-muted-foreground">
              The ground floor features the Studios, Toilets (Purple, pink), Archi. Lecturer's Office (yellow), Courtyard, and public spaces.
              Hover over the highlighted areas to learn more about each space.
            </p>
          </div>
          
          <div
            className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 animate-scale-up"
            ref={modelViewerRef}
          >
            <ModelViewer modelSrc="Annex1GF.gltf" targetRoomPosition={targetRoomPosition}>
              <GroundFloorHotspots
                roomIdToPosition={roomIdToPosition}
                targetRoomId={targetRoomId}
              />
            </ModelViewer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <GroundFloorSpecsCard />
            <GroundFloorFeaturesCard />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GroundFloor;
