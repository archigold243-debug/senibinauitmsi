import React, { useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import ModelViewer from '@/components/ModelViewer';
import FirstFloorHotspots from './FirstFloorHotspots';
import FirstFloorSpecsCard from './FirstFloorSpecsCard';
import FirstFloorFeaturesCard from './FirstFloorFeaturesCard';
import { useSearchParams } from "react-router-dom";

// Room ID to position mapping for First Floor
const roomIdToPosition: Record<string, [number, number, number]> = {
  "ap1-113": [-10, 6, -15],     // En MOHD ZIKRI
  "ap1-118": [10, 6, -15],      // Pn FARAH HANNA
  "ap1-117": [6, 6, -16],       // Cik NOOR AINSYAH
  "studio-01a": [24, 6, 2],
  "studio-03a-extended": [24, 6, -10],
  "studio-03a": [24, 6, -20],
  "crit-tec": [11, 6, 15],
  "studio-07a": [-12, 6, 15],
  "crit-small": [-23, 6, 0]
};

const FirstFloor = () => {
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
              <FirstFloorHotspots
                roomIdToPosition={roomIdToPosition}
                targetRoomId={targetRoomId}
              />
            </ModelViewer>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <FirstFloorSpecsCard />
            <FirstFloorFeaturesCard />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FirstFloor;
