
import React, { useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import ModelViewer from '@/components/ModelViewer';
import ThirdFloorHotspots from './ThirdFloorHotspots';
import ThirdFloorSpecsCard from './ThirdFloorSpecsCard';
import ThirdFloorFeaturesCard from './ThirdFloorFeaturesCard';
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
  const [params] = useSearchParams();
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
              <ThirdFloorHotspots
                roomIdToPosition={roomIdToPosition}
                targetRoomId={targetRoomId}
              />
            </ModelViewer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <ThirdFloorSpecsCard />
            <ThirdFloorFeaturesCard />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThirdFloor;
